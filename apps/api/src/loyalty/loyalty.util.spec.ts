import { describe, expect, it } from 'vitest';
import {
  computeLoyaltyEarn,
  computeLoyaltyRedeem,
  maxRedeemablePoints,
} from '@shop/shared';

describe('loyalty math', () => {
  it('earns floor points from net merchandise', () => {
    expect(computeLoyaltyEarn(250_000, 100_000)).toBe(2);
    expect(computeLoyaltyEarn(99_999, 100_000)).toBe(0);
  });

  it('caps redeem by balance, percent, and remaining after coupon', () => {
    const result = computeLoyaltyRedeem({
      pointsRequested: 50,
      balance: 40,
      redeemRialsPerPoint: 10_000,
      subtotal: 1_000_000,
      couponDiscount: 200_000,
      maxRedeemPercent: 20,
    });
    // max by percent = 200_000 → 20 points; remaining after coupon = 800_000
    expect(result.pointsUsed).toBe(20);
    expect(result.discount).toBe(200_000);
  });

  it('maxRedeemablePoints uses full balance request', () => {
    expect(
      maxRedeemablePoints({
        balance: 5,
        redeemRialsPerPoint: 10_000,
        subtotal: 100_000,
        couponDiscount: 0,
        maxRedeemPercent: 50,
      }),
    ).toBe(5);
  });
});
