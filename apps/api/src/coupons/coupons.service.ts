import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  Coupon,
  CreateCouponInput,
  UpdateCouponInput,
  ValidateCouponResult,
} from '@shop/shared';
import { formatMoney } from '@shop/shared';
import type { EntityManager, Repository } from 'typeorm';
import { SettingsService } from '../settings/settings.service.js';
import { CouponEntity } from './coupon.entity.js';
import {
  assertCouponUsable,
  assertPercentCouponValue,
  computeCouponDiscount,
} from './coupon.util.js';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(CouponEntity)
    private readonly coupons: Repository<CouponEntity>,
    private readonly settings: SettingsService,
  ) {}

  findAll(): Promise<Coupon[]> {
    return this.coupons
      .find({ order: { createdAt: 'DESC' } })
      .then((rows) => rows.map((row) => this.toCoupon(row)));
  }

  async create(input: CreateCouponInput): Promise<Coupon> {
    assertPercentCouponValue(input.type, input.value);
    const code = input.code.trim().toUpperCase();
    await this.ensureUniqueCode(code);

    const saved = await this.coupons.save(
      this.coupons.create({
        code,
        type: input.type,
        value: input.value,
        minOrderAmount: input.minOrderAmount ?? 0,
        maxUses: input.maxUses ?? null,
        usedCount: 0,
        startsAt: input.startsAt ? new Date(input.startsAt) : null,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
        isActive: input.isActive ?? true,
        isAutomatic: input.isAutomatic ?? false,
      }),
    );

    return this.toCoupon(saved);
  }

  async update(id: string, input: UpdateCouponInput): Promise<Coupon> {
    const row = await this.findEntity(id);

    if (input.code !== undefined) {
      const code = input.code.trim().toUpperCase();
      if (code !== row.code) {
        await this.ensureUniqueCode(code);
      }
      row.code = code;
    }
    if (input.type !== undefined) row.type = input.type;
    if (input.value !== undefined) row.value = input.value;
    if (input.minOrderAmount !== undefined) {
      row.minOrderAmount = input.minOrderAmount;
    }
    if (input.maxUses !== undefined) row.maxUses = input.maxUses;
    if (input.startsAt !== undefined) {
      row.startsAt = input.startsAt ? new Date(input.startsAt) : null;
    }
    if (input.expiresAt !== undefined) {
      row.expiresAt = input.expiresAt ? new Date(input.expiresAt) : null;
    }
    if (input.isActive !== undefined) row.isActive = input.isActive;
    if (input.isAutomatic !== undefined) row.isAutomatic = input.isAutomatic;

    assertPercentCouponValue(row.type, row.value);

    return this.toCoupon(await this.coupons.save(row));
  }

  async remove(id: string) {
    const row = await this.findEntity(id);
    await this.coupons.remove(row);
    return { id };
  }

  async validate(
    code: string,
    subtotal: number,
  ): Promise<ValidateCouponResult> {
    const coupon = await this.findUsable(code.trim().toUpperCase(), subtotal);
    const discount = computeCouponDiscount(coupon, subtotal);
    return {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount,
      subtotal,
      total: Math.max(0, subtotal - discount),
      automatic: false,
    };
  }

  /** Best active automatic campaign for this subtotal, or null. */
  async previewAutomatic(
    subtotal: number,
  ): Promise<ValidateCouponResult | null> {
    const coupon = await this.findBestAutomatic(subtotal);
    if (!coupon) {
      return null;
    }
    const discount = computeCouponDiscount(coupon, subtotal);
    return {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount,
      subtotal,
      total: Math.max(0, subtotal - discount),
      automatic: true,
    };
  }

  async applyInTransaction(
    manager: EntityManager,
    code: string | null | undefined,
    subtotal: number,
  ): Promise<{ couponCode: string | null; discount: number }> {
    const repo = manager.getRepository(CouponEntity);
    let coupon: CouponEntity | null = null;

    if (code?.trim()) {
      coupon = await repo.findOne({
        where: { code: code.trim().toUpperCase() },
      });
      if (!coupon) {
        throw new BadRequestException('کد تخفیف معتبر نیست');
      }
      await this.assertUsable(coupon, subtotal);
    } else {
      coupon = await this.findBestAutomatic(subtotal, repo);
      if (!coupon) {
        return { couponCode: null, discount: 0 };
      }
    }

    const discount = computeCouponDiscount(coupon, subtotal);
    coupon.usedCount += 1;
    await repo.save(coupon);

    return { couponCode: coupon.code, discount };
  }

  async releaseInTransaction(
    manager: EntityManager,
    code: string | null | undefined,
  ) {
    if (!code) return;
    const repo = manager.getRepository(CouponEntity);
    const coupon = await repo.findOne({ where: { code } });
    if (!coupon || coupon.usedCount < 1) return;
    coupon.usedCount -= 1;
    await repo.save(coupon);
  }

  private async findBestAutomatic(
    subtotal: number,
    repo: Repository<CouponEntity> = this.coupons,
  ): Promise<CouponEntity | null> {
    const rows = await repo.find({
      where: { isActive: true, isAutomatic: true },
    });

    let best: CouponEntity | null = null;
    let bestDiscount = 0;

    for (const coupon of rows) {
      try {
        await this.assertUsable(coupon, subtotal);
      } catch {
        continue;
      }
      const discount = computeCouponDiscount(coupon, subtotal);
      if (discount > bestDiscount) {
        best = coupon;
        bestDiscount = discount;
      }
    }

    return best;
  }

  private async findUsable(code: string, subtotal: number) {
    const coupon = await this.coupons.findOne({ where: { code } });
    if (!coupon) {
      throw new BadRequestException('کد تخفیف معتبر نیست');
    }
    await this.assertUsable(coupon, subtotal);
    return coupon;
  }

  private async assertUsable(coupon: CouponEntity, subtotal: number) {
    // Run non-amount rules first so inactive/expired win over min-order messaging.
    assertCouponUsable({ ...coupon, minOrderAmount: 0 }, subtotal);
    if (subtotal < coupon.minOrderAmount) {
      const { currencyDisplayUnit } = await this.settings.get();
      throw new BadRequestException(
        `حداقل مبلغ سفارش برای این کد ${formatMoney(coupon.minOrderAmount, currencyDisplayUnit)} است`,
      );
    }
  }

  private async findEntity(id: string) {
    const row = await this.coupons.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('کد تخفیف پیدا نشد');
    }
    return row;
  }

  private async ensureUniqueCode(code: string) {
    const exists = await this.coupons.existsBy({ code });
    if (exists) {
      throw new ConflictException(`کد «${code}» تکراری است`);
    }
  }

  private toCoupon(row: CouponEntity): Coupon {
    return {
      id: row.id,
      code: row.code,
      type: row.type,
      value: row.value,
      minOrderAmount: row.minOrderAmount,
      maxUses: row.maxUses,
      usedCount: row.usedCount,
      startsAt: row.startsAt ? row.startsAt.toISOString() : null,
      expiresAt: row.expiresAt ? row.expiresAt.toISOString() : null,
      isActive: row.isActive,
      isAutomatic: row.isAutomatic,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
