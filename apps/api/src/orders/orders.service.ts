import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  AdminOrder,
  CreateOrderInput,
  CreateOrderResult,
  Order,
  OrderStatus,
  UpdateOrderStatusInput,
} from '@shop/shared';
import { resolveUnitPrice } from '@shop/shared';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { DataSource, LessThan, type Repository } from 'typeorm';
import { computeOrderTax } from '../coupons/coupon.util.js';
import { CouponsService } from '../coupons/coupons.service.js';
import { LoyaltyService } from '../loyalty/loyalty.service.js';
import { MailService } from '../mail/mail.service.js';
import { OtpService } from '../otp/otp.service.js';
import { ProductVariantEntity } from '../products/product-variant.entity.js';
import { Product } from '../products/product.entity.js';
import { SettingsService } from '../settings/settings.service.js';
import { ShippingService } from '../shipping/shipping.service.js';
import { User } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { OrderItemEntity } from './order-item.entity.js';
import { OrderEntity } from './order.entity.js';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly couponsService: CouponsService,
    private readonly shippingService: ShippingService,
    private readonly settingsService: SettingsService,
    private readonly loyaltyService: LoyaltyService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}


  async create(
    userId: string | null,
    input: CreateOrderInput,
  ): Promise<CreateOrderResult> {
    const guestEmail = input.guestEmail?.trim().toLowerCase() || null;
    const guestPhone = input.guestPhone || null;
    const otpToken = input.otpToken || null;
    if (!userId && !guestEmail) {
      throw new BadRequestException('برای خرید مهمان ایمیل لازم است');
    }
    if (!userId) {
      if (!guestPhone || !otpToken) {
        throw new BadRequestException(
          'برای خرید مهمان موبایل و تایید OTP لازم است',
        );
      }
      await this.otpService.consumeGuestCheckout(guestPhone, otpToken);
    }

    const guestToken = userId ? null : randomBytes(24).toString('hex');

    const order = await this.dataSource.transaction(async (manager) => {
      const productRepo = manager.getRepository(Product);
      const variantRepo = manager.getRepository(ProductVariantEntity);
      const orderRepo = manager.getRepository(OrderEntity);

      // Stable lock order avoids deadlocks under concurrent checkouts.
      const cartItems = [...input.items].sort((a, b) => {
        const byProduct = a.productId.localeCompare(b.productId);
        if (byProduct !== 0) return byProduct;
        return (a.variantId ?? '').localeCompare(b.variantId ?? '');
      });

      const lines: Array<{
        product: Product;
        quantity: number;
        unitPrice: number;
        variantId: string | null;
        sku: string | null;
        variantLabel: string | null;
      }> = [];

      for (const item of cartItems) {
        const product = await productRepo
          .createQueryBuilder('product')
          .setLock('pessimistic_write')
          .where('product.id = :id', { id: item.productId })
          .getOne();
        if (!product || !product.isActive) {
          throw new BadRequestException('یکی از محصولات سبد موجود نیست');
        }

        const activeVariantCount = await variantRepo.count({
          where: { productId: product.id, isActive: true },
        });

        if (activeVariantCount > 0) {
          if (!item.variantId) {
            throw new BadRequestException(
              `برای «${product.name}» انتخاب واریانت لازم است`,
            );
          }
          const variant = await variantRepo
            .createQueryBuilder('variant')
            .setLock('pessimistic_write')
            .where('variant.id = :id', { id: item.variantId })
            .andWhere('variant.product_id = :productId', {
              productId: product.id,
            })
            .getOne();
          if (!variant || !variant.isActive) {
            throw new BadRequestException(
              `واریانت «${product.name}» موجود نیست`,
            );
          }
          if (variant.stock < item.quantity) {
            throw new BadRequestException(
              `موجودی «${product.name} / ${variant.label}» کافی نیست`,
            );
          }
          variant.stock -= item.quantity;
          await variantRepo.save(variant);
          product.stock = Math.max(0, product.stock - item.quantity);
          await productRepo.save(product);
          const priced = resolveUnitPrice({
            price: Number(product.price) || 0,
            priceMode: product.priceMode,
            salePrice: product.salePrice,
            saleEndsAt: product.saleEndsAt,
            variantPrice:
              variant.price === null || variant.price === undefined
                ? null
                : Number(variant.price) || 0,
          });
          if (!priced.ok) {
            throw new BadRequestException(
              `«${product.name}» فقط با تماس قابل سفارش است`,
            );
          }
          lines.push({
            product,
            quantity: item.quantity,
            unitPrice: priced.unitPrice,
            variantId: variant.id,
            sku: variant.sku,
            variantLabel: variant.label,
          });
          continue;
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `موجودی «${product.name}» کافی نیست`,
          );
        }
        product.stock -= item.quantity;
        await productRepo.save(product);
        const priced = resolveUnitPrice({
          price: Number(product.price) || 0,
          priceMode: product.priceMode,
          salePrice: product.salePrice,
          saleEndsAt: product.saleEndsAt,
        });
        if (!priced.ok) {
          throw new BadRequestException(
            `«${product.name}» فقط با تماس قابل سفارش است`,
          );
        }
        lines.push({
          product,
          quantity: item.quantity,
          unitPrice: priced.unitPrice,
          variantId: null,
          sku: null,
          variantLabel: null,
        });
      }

      const subtotal = lines.reduce(
        (sum, line) => sum + line.unitPrice * line.quantity,
        0,
      );

      const { couponCode, discount: couponDiscount } =
        await this.couponsService.applyInTransaction(
          manager,
          input.couponCode,
          subtotal,
        );

      const { method, shippingCost } =
        await this.shippingService.resolveForOrder(
          input.shippingMethodId,
          subtotal,
        );

      const settings = await this.settingsService.get();

      let loyaltyUser: User | null = null;
      if (
        userId &&
        settings.loyaltyEnabled &&
        (input.loyaltyPointsToRedeem ?? 0) > 0
      ) {
        loyaltyUser = await this.loyaltyService.lockUser(manager, userId);
      }

      const { loyaltyDiscount, loyaltyPointsRedeemed } =
        this.loyaltyService.previewRedeem(
          loyaltyUser?.loyaltyPoints ?? 0,
          userId ? input.loyaltyPointsToRedeem : null,
          subtotal,
          couponDiscount,
          settings,
        );

      const discount = couponDiscount + loyaltyDiscount;
      const taxPercent = Number(settings.taxPercent) || 0;
      const taxAmount = computeOrderTax(subtotal, discount, taxPercent);
      const taxable = Math.max(0, subtotal - discount);
      const total = taxable + shippingCost + taxAmount;

      const created = orderRepo.create({
        userId,
        guestEmail: userId ? null : guestEmail,
        guestPhone: userId ? null : guestPhone,
        guestToken,
        status: 'pending',
        paymentStatus: 'pending',
        subtotal,
        discount,
        loyaltyDiscount,
        loyaltyPointsRedeemed,
        loyaltyPointsEarned: 0,
        couponCode,
        shippingMethodId: method.id,
        shippingMethodName: method.name,
        shippingCost,
        taxAmount,
        refundedAmount: 0,
        note: input.note?.trim() || null,
        trackingCode: null,
        total,
        address: input.address,
        items: lines.map((line) =>
          manager.getRepository(OrderItemEntity).create({
            productId: line.product.id,
            variantId: line.variantId,
            sku: line.sku,
            variantLabel: line.variantLabel,
            name: line.product.name,
            unitPrice: line.unitPrice,
            quantity: line.quantity,
          }),
        ),
      });

      const saved = await orderRepo.save(created);
      if (loyaltyUser && loyaltyPointsRedeemed > 0) {
        await this.loyaltyService.commitRedeem(
          manager,
          loyaltyUser,
          saved.id,
          loyaltyPointsRedeemed,
        );
      }
      return saved;
    });


    void this.notifyOrderCreated(order);
    return {
      ...this.toOrder(order),
      guestToken: order.guestToken,
    };
  }

  /** Owner JWT or matching guest token. */
  assertOrderAccess(
    order: OrderEntity,
    userId: string | null | undefined,
    guestToken?: string | null,
  ): void {
    if (userId && order.userId && order.userId === userId) {
      return;
    }
    if (
      order.guestToken &&
      guestToken &&
      this.tokensMatch(order.guestToken, guestToken)
    ) {
      return;
    }
    throw new NotFoundException('سفارش پیدا نشد');
  }

  private tokensMatch(stored: string, provided: string): boolean {
    const a = Buffer.from(stored);
    const b = Buffer.from(provided);
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  }

  async findOneForAccess(
    id: string,
    userId: string | null | undefined,
    guestToken?: string | null,
  ): Promise<Order> {
    const row = await this.orders.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('سفارش پیدا نشد');
    }
    this.assertOrderAccess(row, userId, guestToken);
    return this.toOrder(row);
  }

  async getEntityForAccess(
    id: string,
    userId: string | null | undefined,
    guestToken?: string | null,
  ): Promise<OrderEntity> {
    const row = await this.orders.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('سفارش پیدا نشد');
    }
    this.assertOrderAccess(row, userId, guestToken);
    return row;
  }

  async findAllForUser(userId: string): Promise<Order[]> {
    const rows = await this.orders.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return rows.map((row) => this.toOrder(row));
  }

  async findOneForUser(userId: string, id: string): Promise<Order> {
    const row = await this.orders.findOne({ where: { id, userId } });
    if (!row) {
      throw new NotFoundException('سفارش پیدا نشد');
    }
    return this.toOrder(row);
  }

  async markPaid(
    id: string,
    options?: { paymentRefId?: string | null },
  ): Promise<Order> {
    const row = await this.orders.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('سفارش پیدا نشد');
    }
    if (row.status === 'cancelled') {
      throw new BadRequestException('سفارش لغو شده قابل پرداخت نیست');
    }
    if (row.paymentStatus === 'paid') {
      return this.toOrder(row);
    }

    row.paymentStatus = 'paid';
    row.status = 'paid';
    if (options?.paymentRefId !== undefined) {
      row.paymentRefId = options.paymentRefId;
    }
    await this.orders.save(row);
    void this.loyaltyService.awardForPaidOrder(row);
    void this.notifyOrderPaid(row);
    return this.toOrder(row);
  }

  /** Public mapper for other modules (payments). */
  toPublicOrder(row: OrderEntity): Order {
    return this.toOrder(row);
  }

  /**
   * After a full gateway refund: restock + release coupon + mark cancelled/refunded.
   */
  async finalizeRefundedOrder(id: string): Promise<Order> {
    const cancelled = await this.cancelOrder(id);
    if (cancelled.paymentStatus !== 'refunded') {
      cancelled.paymentStatus = 'refunded';
      await this.orders.save(cancelled);
    }
    return this.toOrder(cancelled);
  }

  async findAllAdmin(): Promise<AdminOrder[]> {
    const rows = await this.orders.find({
      order: { createdAt: 'DESC' },
    });
    const users = await this.usersService.findByIds(
      rows.map((row) => row.userId).filter((id): id is string => Boolean(id)),
    );
    const byId = new Map(users.map((user) => [user.id, user]));

    return rows.map((row) => {
      const user = row.userId ? byId.get(row.userId) : undefined;
      return this.toAdminOrder(
        row,
        user?.email ?? row.guestEmail,
        user?.fullName ?? row.address?.fullName ?? null,
      );
    });
  }

  async cancelForUser(userId: string, id: string): Promise<Order> {
    const row = await this.orders.findOne({ where: { id, userId } });
    if (!row) {
      throw new NotFoundException('سفارش پیدا نشد');
    }

    if (row.status !== 'pending' || row.paymentStatus !== 'pending') {
      throw new BadRequestException(
        'فقط سفارش‌های پرداخت‌نشدهٔ در انتظار قابل لغو هستند',
      );
    }

    const cancelled = await this.cancelOrder(row.id);
    return this.toOrder(cancelled);
  }

  /** Cancel pending unpaid orders older than ttlMinutes; restores stock. */
  async cancelExpiredUnpaid(ttlMinutes: number): Promise<number> {
    if (ttlMinutes < 1) {
      return 0;
    }
    const cutoff = new Date(Date.now() - ttlMinutes * 60_000);
    const expired = await this.orders.find({
      where: {
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: LessThan(cutoff),
      },
      select: ['id'],
      take: 50,
    });

    let count = 0;
    for (const row of expired) {
      await this.cancelOrder(row.id);
      count += 1;
      this.logger.log(`Expired unpaid order cancelled id=${row.id}`);
    }
    return count;
  }

  async updateStatus(
    id: string,
    input: UpdateOrderStatusInput,
  ): Promise<AdminOrder> {
    const { status } = input;
    const row = await this.orders.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('سفارش پیدا نشد');
    }

    if (input.trackingCode !== undefined) {
      row.trackingCode = input.trackingCode;
    }
    if (input.adminNote !== undefined) {
      row.adminNote = input.adminNote;
    }

    if (status === row.status) {
      await this.orders.save(row);
      return this.toAdminOrderWithUser(row);
    }

    if (status === 'cancelled') {
      if (row.status === 'delivered') {
        throw new BadRequestException('سفارش تحویل‌شده قابل لغو نیست');
      }
      const cancelled = await this.cancelOrder(id);
      if (input.adminNote !== undefined) {
        cancelled.adminNote = input.adminNote;
        await this.orders.save(cancelled);
      }
      return this.toAdminOrderWithUser(cancelled);
    }

    if (row.status === 'cancelled') {
      throw new BadRequestException('سفارش لغو‌شده قابل تغییر نیست');
    }

    const previous = row.status;
    row.status = status;
    if (status === 'paid' && row.paymentStatus === 'pending') {
      row.paymentStatus = 'paid';
    }

    await this.orders.save(row);

    if (status === 'paid' && previous !== 'paid') {
      void this.loyaltyService.awardForPaidOrder(row);
      void this.notifyOrderPaid(row);
    }
    if (status === 'shipped' && previous !== 'shipped') {
      void this.notifyOrderShipped(row);
    }

    return this.toAdminOrderWithUser(row);
  }

  private async resolveNotifyEmail(order: OrderEntity): Promise<string | null> {
    if (order.guestEmail) {
      return order.guestEmail;
    }
    if (!order.userId) {
      return null;
    }
    const user = await this.usersService.findById(order.userId);
    return user?.email ?? null;
  }

  private async notifyOrderCreated(order: OrderEntity) {
    const email = await this.resolveNotifyEmail(order);
    if (!email) return;
    await this.mailService.sendOrderCreated(email, order);
  }

  private async notifyOrderPaid(order: OrderEntity) {
    const email = await this.resolveNotifyEmail(order);
    if (!email) return;
    await this.mailService.sendOrderPaid(email, order);
  }

  private async notifyOrderShipped(order: OrderEntity) {
    const email = await this.resolveNotifyEmail(order);
    if (!email) return;
    await this.mailService.sendOrderShipped(email, order);
  }

  private async cancelOrder(id: string): Promise<OrderEntity> {
    return this.dataSource.transaction(async (manager) => {
      const orderRepo = manager.getRepository(OrderEntity);
      const productRepo = manager.getRepository(Product);
      const variantRepo = manager.getRepository(ProductVariantEntity);

      const row = await orderRepo.findOne({ where: { id } });
      if (!row) {
        throw new NotFoundException('سفارش پیدا نشد');
      }

      if (row.status === 'cancelled') {
        return row;
      }

      const restockItems = [...(row.items ?? [])].sort((a, b) => {
        const byProduct = a.productId.localeCompare(b.productId);
        if (byProduct !== 0) return byProduct;
        return (a.variantId ?? '').localeCompare(b.variantId ?? '');
      });
      for (const item of restockItems) {
        const product = await productRepo
          .createQueryBuilder('product')
          .setLock('pessimistic_write')
          .where('product.id = :id', { id: item.productId })
          .getOne();
        if (!product) {
          continue;
        }
        if (item.variantId) {
          const variant = await variantRepo
            .createQueryBuilder('variant')
            .setLock('pessimistic_write')
            .where('variant.id = :id', { id: item.variantId })
            .getOne();
          if (variant) {
            variant.stock += item.quantity;
            await variantRepo.save(variant);
          }
        }
        product.stock += item.quantity;
        await productRepo.save(product);
      }

      await this.couponsService.releaseInTransaction(manager, row.couponCode);
      await this.loyaltyService.settleOnCancel(manager, row);

      row.status = 'cancelled';
      if (row.paymentStatus === 'pending') {
        row.paymentStatus = 'failed';
      } else if (row.paymentStatus === 'paid') {
        row.paymentStatus = 'refunded';
      }

      return orderRepo.save(row);
    });
  }

  private toOrder(row: OrderEntity): Order {
    const subtotal =
      row.subtotal ??
      (row.items ?? []).reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
    const discount = row.discount ?? 0;

    return {
      id: row.id,
      status: row.status,
      paymentStatus: row.paymentStatus,
      subtotal,
      discount,
      loyaltyDiscount: row.loyaltyDiscount ?? 0,
      loyaltyPointsRedeemed: row.loyaltyPointsRedeemed ?? 0,
      loyaltyPointsEarned: row.loyaltyPointsEarned ?? 0,
      couponCode: row.couponCode ?? null,
      shippingMethodId: row.shippingMethodId ?? null,
      shippingMethodName: row.shippingMethodName ?? null,
      shippingCost: row.shippingCost ?? 0,
      taxAmount: row.taxAmount ?? 0,
      refundedAmount: row.refundedAmount ?? 0,
      note: row.note ?? null,
      trackingCode: row.trackingCode ?? null,
      total: row.total,
      paymentAuthority: row.paymentAuthority ?? null,
      paymentRefId: row.paymentRefId ?? null,
      address: row.address,
      createdAt: row.createdAt.toISOString(),
      items: (row.items ?? []).map((item) => ({
        productId: item.productId,
        variantId: item.variantId ?? null,
        sku: item.sku ?? null,
        variantLabel: item.variantLabel ?? null,
        name: item.name,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      })),
    };
  }

  private async toAdminOrderWithUser(row: OrderEntity): Promise<AdminOrder> {
    const user = row.userId
      ? await this.usersService.findById(row.userId)
      : null;
    return this.toAdminOrder(
      row,
      user?.email ?? row.guestEmail,
      user?.fullName ?? row.address?.fullName ?? null,
    );
  }

  private toAdminOrder(
    row: OrderEntity,
    userEmail?: string | null,
    userFullName?: string | null,
  ): AdminOrder {
    return {
      ...this.toOrder(row),
      userId: row.userId,
      userEmail: userEmail ?? null,
      userFullName: userFullName ?? null,
      guestPhone: row.guestPhone ?? null,
      adminNote: row.adminNote ?? null,
    };
  }
}
