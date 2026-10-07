import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  PaymentTransaction,
  RefundPaymentInput,
  RefundPaymentResult,
  StartPaymentResult,
  VerifyPaymentResult,
} from '@shop/shared';
import { randomUUID } from 'node:crypto';
import type { Repository } from 'typeorm';
import type { Env } from '../config/env.schema.js';
import { OrderEntity } from '../orders/order.entity.js';
import { OrdersService } from '../orders/orders.service.js';
import { PaymentTransactionEntity } from './payment-transaction.entity.js';
import { resolveRefundAmount } from './refund.util.js';
import { ZarinpalClient } from './zarinpal.client.js';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @InjectRepository(PaymentTransactionEntity)
    private readonly transactions: Repository<PaymentTransactionEntity>,
    private readonly ordersService: OrdersService,
    private readonly zarinpal: ZarinpalClient,
    private readonly config: ConfigService<Env, true>,
  ) {}

  private get provider() {
    return this.config.get('PAYMENT_PROVIDER', { infer: true });
  }

  private get callbackUrl() {
    return this.config.get('PAYMENT_CALLBACK_URL', { infer: true });
  }

  private get returnUrl() {
    return this.config.get('PAYMENT_RETURN_URL', { infer: true });
  }

  async startForAccess(
    orderId: string,
    userId: string | null | undefined,
    guestToken?: string | null,
  ): Promise<StartPaymentResult> {
    const order = await this.ordersService.getEntityForAccess(
      orderId,
      userId,
      guestToken,
    );
    if (order.paymentStatus === 'paid') {
      throw new BadRequestException('این سفارش قبلاً پرداخت شده است');
    }
    if (order.status === 'cancelled') {
      throw new BadRequestException('سفارش لغو شده قابل پرداخت نیست');
    }
    if (order.total < 1) {
      throw new BadRequestException('مبلغ سفارش نامعتبر است');
    }

    // Idempotent retry: reuse open authority when still pending.
    if (
      order.paymentAuthority &&
      order.paymentStatus === 'pending' &&
      order.status === 'pending'
    ) {
      this.logger.log(
        `payment.start reuse order=${order.id} provider=${this.provider} authority=${order.paymentAuthority}`,
      );
      await this.ensurePendingCharge(order);
      return {
        orderId: order.id,
        authority: order.paymentAuthority,
        paymentUrl:
          this.provider === 'zarinpal'
            ? this.zarinpal.paymentUrl(order.paymentAuthority)
            : this.mockCallbackUrl(order.paymentAuthority),
        provider: this.provider,
      };
    }

    if (this.provider === 'zarinpal') {
      const result = await this.zarinpal.requestPayment({
        amountRial: order.total,
        description: `پرداخت سفارش ${order.id}`,
        callbackUrl: this.callbackUrl,
        orderId: order.id,
      });
      order.paymentAuthority = result.authority;
      await this.orders.save(order);
      await this.createChargePending(order, result.authority);
      this.logger.log(
        `payment.start order=${order.id} provider=zarinpal authority=${result.authority} amount=${order.total}`,
      );
      return {
        orderId: order.id,
        authority: result.authority,
        paymentUrl: result.paymentUrl,
        provider: 'zarinpal',
      };
    }

    const authority = `MOCK-${randomUUID()}`;
    order.paymentAuthority = authority;
    await this.orders.save(order);
    await this.createChargePending(order, authority);
    this.logger.log(
      `payment.start order=${order.id} provider=mock authority=${authority} amount=${order.total}`,
    );

    return {
      orderId: order.id,
      authority,
      paymentUrl: this.mockCallbackUrl(authority),
      provider: 'mock',
    };
  }

  private mockCallbackUrl(authority: string) {
    const url = new URL(this.callbackUrl);
    url.searchParams.set('Authority', authority);
    url.searchParams.set('Status', 'OK');
    return url.toString();
  }

  async verifyForAccess(
    userId: string | null | undefined,
    input: {
      authority: string;
      status: string;
      guestToken?: string | null;
    },
  ): Promise<VerifyPaymentResult> {
    const authority = input.authority.trim();
    const order = await this.orders.findOne({
      where: { paymentAuthority: authority },
    });
    if (!order) {
      throw new NotFoundException('سفارش متناظر با این پرداخت پیدا نشد');
    }
    this.ordersService.assertOrderAccess(order, userId, input.guestToken);
    return this.verifyOrderPayment(order, authority, input.status);
  }

  /**
   * Public gateway return / IPN: verify by authority alone, then send the
   * shopper to the storefront return URL.
   */
  async handleGatewayCallback(input: {
    authority?: string;
    status?: string;
  }): Promise<{ redirectUrl: string; result: VerifyPaymentResult | null }> {
    const authority = (input.authority || '').trim();
    const status = (input.status || '').trim();

    if (!authority) {
      return {
        redirectUrl: this.buildReturnUrl({
          ok: false,
          message: 'authority پرداخت دریافت نشد',
        }),
        result: null,
      };
    }

    const order = await this.orders.findOne({
      where: { paymentAuthority: authority },
    });
    if (!order) {
      return {
        redirectUrl: this.buildReturnUrl({
          authority,
          status,
          ok: false,
          message: 'سفارش متناظر با این پرداخت پیدا نشد',
        }),
        result: null,
      };
    }

    try {
      const result = await this.verifyOrderPayment(order, authority, status);
      return {
        redirectUrl: this.buildReturnUrl({
          orderId: result.order.id,
          authority,
          status: status || (result.ok ? 'OK' : 'NOK'),
          ok: result.ok,
          message: result.message,
          serverVerified: true,
          guestToken: order.guestToken,
        }),
        result,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'تایید پرداخت ناموفق بود';
      this.logger.warn(
        `payment.callback error authority=${authority}: ${message}`,
      );
      return {
        redirectUrl: this.buildReturnUrl({
          orderId: order.id,
          authority,
          status,
          ok: false,
          message,
          serverVerified: true,
          guestToken: order.guestToken,
        }),
        result: null,
      };
    }
  }

  private buildReturnUrl(input: {
    orderId?: string;
    authority?: string;
    status?: string;
    ok: boolean;
    message: string;
    serverVerified?: boolean;
    guestToken?: string | null;
  }) {
    const url = new URL(this.returnUrl);
    if (input.orderId) url.searchParams.set('orderId', input.orderId);
    if (input.authority) url.searchParams.set('Authority', input.authority);
    if (input.status) url.searchParams.set('Status', input.status);
    url.searchParams.set('ok', input.ok ? '1' : '0');
    url.searchParams.set('message', input.message);
    if (input.serverVerified) {
      url.searchParams.set('serverVerified', '1');
    }
    if (input.guestToken) {
      url.searchParams.set('token', input.guestToken);
    }
    return url.toString();
  }

  private async verifyOrderPayment(
    order: OrderEntity,
    authority: string,
    rawStatus: string,
  ): Promise<VerifyPaymentResult> {
    const status = rawStatus.trim().toUpperCase();

    if (order.status === 'cancelled') {
      throw new BadRequestException('سفارش لغو شده قابل تایید پرداخت نیست');
    }

    if (order.paymentStatus === 'paid') {
      this.logger.log(
        `payment.verify already-paid order=${order.id} authority=${authority}`,
      );
      return {
        order: this.ordersService.toPublicOrder(order),
        ok: true,
        message: 'پرداخت قبلاً تایید شده است',
      };
    }

    if (status !== 'OK') {
      order.paymentStatus = 'failed';
      await this.orders.save(order);
      await this.markCharge(order, authority, 'failed');
      this.logger.warn(
        `payment.verify failed/cancelled order=${order.id} authority=${authority} status=${status}`,
      );
      return {
        order: this.ordersService.toPublicOrder(order),
        ok: false,
        message: 'پرداخت توسط کاربر لغو شد یا ناموفق بود',
      };
    }

    if (this.provider === 'zarinpal') {
      const verified = await this.zarinpal.verifyPayment({
        authority,
        amountRial: order.total,
      });
      const paid = await this.ordersService.markPaid(order.id, {
        paymentRefId: verified.refId || null,
      });
      await this.markCharge(order, authority, 'succeeded', {
        refId: verified.refId || null,
        providerCode: verified.alreadyVerified ? '101' : '100',
      });
      this.logger.log(
        `payment.verify ok order=${order.id} provider=zarinpal authority=${authority} refId=${verified.refId || ''} already=${verified.alreadyVerified}`,
      );
      return {
        order: paid,
        ok: true,
        message: verified.alreadyVerified
          ? 'پرداخت قبلاً تایید شده بود'
          : 'پرداخت با موفقیت تایید شد',
      };
    }

    const paid = await this.ordersService.markPaid(order.id, {
      paymentRefId: `MOCK-REF-${Date.now()}`,
    });
    await this.markCharge(order, authority, 'succeeded', {
      refId: paid.paymentRefId,
      providerCode: 'mock',
    });
    this.logger.log(
      `payment.verify ok order=${order.id} provider=mock authority=${authority} refId=${paid.paymentRefId || ''}`,
    );
    return {
      order: paid,
      ok: true,
      message: 'پرداخت آزمایشی با موفقیت انجام شد',
    };
  }

  async refundForAdmin(
    orderId: string,
    input: RefundPaymentInput,
  ): Promise<RefundPaymentResult> {
    const order = await this.orders.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('سفارش پیدا نشد');
    }
    if (order.paymentStatus !== 'paid' && order.paymentStatus !== 'refunded') {
      throw new BadRequestException('فقط سفارش پرداخت‌شده قابل استرداد است');
    }

    const refundedSoFar = order.refundedAmount ?? 0;
    const amount = resolveRefundAmount(order.total, refundedSoFar, input.amount);
    if (!order.paymentAuthority) {
      throw new BadRequestException('authority پرداخت برای استرداد موجود نیست');
    }

    const tx = this.transactions.create({
      orderId: order.id,
      userId: order.userId,
      provider: this.provider,
      type: 'refund',
      status: 'pending',
      amount,
      authority: order.paymentAuthority,
      reason: input.reason ?? null,
      meta: null,
    });
    await this.transactions.save(tx);

    try {
      if (this.provider === 'zarinpal') {
        const result = await this.zarinpal.refundPayment({
          authority: order.paymentAuthority,
          amountRial: amount,
        });
        tx.status = 'succeeded';
        tx.refId = result.refId || null;
        tx.providerCode = result.code;
        tx.meta = { alreadyRefunded: result.alreadyRefunded };
      } else {
        tx.status = 'succeeded';
        tx.refId = `MOCK-REFUND-${Date.now()}`;
        tx.providerCode = 'mock';
      }
      await this.transactions.save(tx);
    } catch (err) {
      tx.status = 'failed';
      tx.meta = {
        error: err instanceof Error ? err.message : String(err),
      };
      await this.transactions.save(tx);
      throw err;
    }

    order.refundedAmount = refundedSoFar + amount;
    await this.orders.save(order);

    const publicOrder =
      order.refundedAmount >= order.total
        ? await this.ordersService.finalizeRefundedOrder(order.id)
        : this.ordersService.toPublicOrder(order);

    this.logger.log(
      `payment.refund ok order=${order.id} amount=${amount} provider=${this.provider} refundedTotal=${order.refundedAmount}`,
    );

    return {
      order: publicOrder,
      transaction: this.toTransaction(tx),
      message:
        publicOrder.paymentStatus === 'refunded'
          ? 'استرداد کامل انجام شد'
          : 'استرداد جزئی انجام شد',
    };
  }

  async listForOrder(orderId: string): Promise<PaymentTransaction[]> {
    const rows = await this.transactions.find({
      where: { orderId },
      order: { createdAt: 'ASC' },
    });
    return rows.map((row) => this.toTransaction(row));
  }

  private async createChargePending(order: OrderEntity, authority: string) {
    const existing = await this.transactions.findOne({
      where: {
        orderId: order.id,
        type: 'charge',
        authority,
      },
    });
    if (existing) {
      return existing;
    }
    return this.transactions.save(
      this.transactions.create({
        orderId: order.id,
        userId: order.userId,
        provider: this.provider,
        type: 'charge',
        status: 'pending',
        amount: order.total,
        authority,
      }),
    );
  }

  private async ensurePendingCharge(order: OrderEntity) {
    if (!order.paymentAuthority) return;
    await this.createChargePending(order, order.paymentAuthority);
  }

  private async markCharge(
    order: OrderEntity,
    authority: string,
    status: 'succeeded' | 'failed',
    extras?: { refId?: string | null; providerCode?: string | null },
  ) {
    let row = await this.transactions.findOne({
      where: { orderId: order.id, type: 'charge', authority },
    });
    if (!row) {
      row = this.transactions.create({
        orderId: order.id,
        userId: order.userId,
        provider: this.provider,
        type: 'charge',
        amount: order.total,
        authority,
      });
    }
    row.status = status;
    if (extras?.refId !== undefined) row.refId = extras.refId;
    if (extras?.providerCode !== undefined) {
      row.providerCode = extras.providerCode;
    }
    await this.transactions.save(row);
  }

  private toTransaction(row: PaymentTransactionEntity): PaymentTransaction {
    return {
      id: row.id,
      orderId: row.orderId,
      userId: row.userId,
      provider: row.provider,
      type: row.type,
      status: row.status,
      amount: row.amount,
      authority: row.authority,
      refId: row.refId,
      providerCode: row.providerCode,
      reason: row.reason,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
