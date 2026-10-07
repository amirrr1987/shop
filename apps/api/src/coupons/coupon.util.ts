import { BadRequestException } from '@nestjs/common';
import type { CouponType } from '@shop/shared';

export type CouponDiscountInput = {
  type: CouponType;
  value: number;
};

export type CouponUsabilityInput = {
  isActive: boolean;
  startsAt: Date | null;
  expiresAt: Date | null;
  maxUses: number | null;
  usedCount: number;
  minOrderAmount: number;
};

/** Rial discount capped at subtotal. */
export function computeCouponDiscount(
  coupon: CouponDiscountInput,
  subtotal: number,
): number {
  const base = Math.max(0, Math.floor(subtotal));
  if (coupon.type === 'percent') {
    return Math.min(base, Math.floor((base * coupon.value) / 100));
  }
  return Math.min(base, Math.max(0, Math.floor(coupon.value)));
}

export function assertPercentCouponValue(type: CouponType, value: number) {
  if (type === 'percent' && value > 100) {
    throw new BadRequestException('درصد تخفیف حداکثر ۱۰۰ است');
  }
}

/**
 * Sync usability checks (no currency formatting).
 * Throws BadRequestException with Persian messages.
 */
export function assertCouponUsable(
  coupon: CouponUsabilityInput,
  subtotal: number,
  now = Date.now(),
): void {
  if (!coupon.isActive) {
    throw new BadRequestException('این کد تخفیف غیرفعال است');
  }
  if (coupon.startsAt && coupon.startsAt.getTime() > now) {
    throw new BadRequestException('این کمپین هنوز شروع نشده است');
  }
  if (coupon.expiresAt && coupon.expiresAt.getTime() < now) {
    throw new BadRequestException('مهلت این کد تخفیف تمام شده است');
  }
  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    throw new BadRequestException('ظرفیت استفاده از این کد تمام شده است');
  }
  if (subtotal < coupon.minOrderAmount) {
    throw new BadRequestException('مبلغ سفارش کمتر از حداقل این کد تخفیف است');
  }
}

/** Tax on (subtotal − discount), integer rials. */
export function computeOrderTax(
  subtotal: number,
  discount: number,
  taxPercent: number,
): number {
  if (taxPercent <= 0) {
    return 0;
  }
  const taxable = Math.max(0, subtotal - discount);
  return Math.round((taxable * taxPercent) / 100);
}
