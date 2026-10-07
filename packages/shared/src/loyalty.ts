export function computeLoyaltyEarn(
  net: number,
  earnRialsPerPoint: number,
): number {
  return earnRialsPerPoint > 0 ? Math.floor(net / earnRialsPerPoint) : 0;
}

function caps(input: {
  balance: number;
  redeemRialsPerPoint: number;
  subtotal: number;
  couponDiscount: number;
  maxRedeemPercent: number;
}): number {
  const remaining = Math.max(0, input.subtotal - input.couponDiscount);
  const maxByPercent = Math.floor(
    (input.subtotal * input.maxRedeemPercent) / 100,
  );
  const maxDiscount = Math.min(remaining, maxByPercent);
  const maxPoints =
    input.redeemRialsPerPoint > 0
      ? Math.min(
          input.balance,
          Math.floor(maxDiscount / input.redeemRialsPerPoint),
        )
      : 0;
  return maxPoints;
}

export function maxRedeemablePoints(input: {
  balance: number;
  redeemRialsPerPoint: number;
  subtotal: number;
  couponDiscount: number;
  maxRedeemPercent: number;
}): number {
  return caps(input);
}

export function computeLoyaltyRedeem(input: {
  pointsRequested: number;
  balance: number;
  redeemRialsPerPoint: number;
  subtotal: number;
  couponDiscount: number;
  maxRedeemPercent: number;
}): { pointsUsed: number; discount: number } {
  const maxPoints = caps(input);
  const pointsUsed = Math.max(0, Math.min(input.pointsRequested, maxPoints));
  return {
    pointsUsed,
    discount: pointsUsed * input.redeemRialsPerPoint,
  };
}
