import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import {
  assertCouponUsable,
  assertPercentCouponValue,
  computeCouponDiscount,
  computeOrderTax,
} from './coupon.util.js';

describe('computeCouponDiscount', () => {
  it('applies percent and floors', () => {
    expect(
      computeCouponDiscount({ type: 'percent', value: 10 }, 10_005),
    ).toBe(1_000);
  });

  it('caps percent at subtotal', () => {
    expect(
      computeCouponDiscount({ type: 'percent', value: 100 }, 8_000),
    ).toBe(8_000);
  });

  it('applies fixed amount capped at subtotal', () => {
    expect(
      computeCouponDiscount({ type: 'fixed', value: 50_000 }, 12_000),
    ).toBe(12_000);
    expect(
      computeCouponDiscount({ type: 'fixed', value: 3_000 }, 12_000),
    ).toBe(3_000);
  });
});

describe('assertPercentCouponValue', () => {
  it('rejects percent above 100', () => {
    expect(() => assertPercentCouponValue('percent', 101)).toThrow(
      BadRequestException,
    );
  });

  it('allows fixed above 100', () => {
    expect(() => assertPercentCouponValue('fixed', 500)).not.toThrow();
  });
});

describe('assertCouponUsable', () => {
  const base = {
    isActive: true,
    startsAt: null as Date | null,
    expiresAt: null as Date | null,
    maxUses: null as number | null,
    usedCount: 0,
    minOrderAmount: 0,
  };

  it('rejects inactive', () => {
    expect(() =>
      assertCouponUsable({ ...base, isActive: false }, 10_000),
    ).toThrow(BadRequestException);
  });

  it('rejects before startsAt', () => {
    expect(() =>
      assertCouponUsable(
        { ...base, startsAt: new Date('2030-01-01T00:00:00.000Z') },
        10_000,
        Date.parse('2026-01-01T00:00:00.000Z'),
      ),
    ).toThrow(BadRequestException);
  });

  it('rejects after expiresAt', () => {
    expect(() =>
      assertCouponUsable(
        { ...base, expiresAt: new Date('2020-01-01T00:00:00.000Z') },
        10_000,
        Date.parse('2026-01-01T00:00:00.000Z'),
      ),
    ).toThrow(BadRequestException);
  });

  it('rejects when max uses reached', () => {
    expect(() =>
      assertCouponUsable({ ...base, maxUses: 2, usedCount: 2 }, 10_000),
    ).toThrow(BadRequestException);
  });

  it('rejects below min order', () => {
    expect(() =>
      assertCouponUsable({ ...base, minOrderAmount: 50_000 }, 10_000),
    ).toThrow(BadRequestException);
  });

  it('accepts a valid coupon', () => {
    expect(() => assertCouponUsable(base, 10_000)).not.toThrow();
  });
});

describe('computeOrderTax', () => {
  it('returns 0 when tax percent is 0', () => {
    expect(computeOrderTax(100_000, 10_000, 0)).toBe(0);
  });

  it('taxes after discount', () => {
    expect(computeOrderTax(100_000, 20_000, 9)).toBe(7_200);
  });

  it('does not tax negative taxable base', () => {
    expect(computeOrderTax(10_000, 50_000, 9)).toBe(0);
  });
});
