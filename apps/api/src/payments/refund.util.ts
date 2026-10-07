import { BadRequestException } from '@nestjs/common';

/** Resolve how many rials to refund; throws when nothing remains or request is over remaining. */
export function resolveRefundAmount(
  orderTotal: number,
  refundedAmount: number,
  requested?: number,
): number {
  const remaining = Math.max(0, orderTotal - (refundedAmount || 0));
  if (remaining < 1) {
    throw new BadRequestException('مبلغ قابل استرداد باقی نمانده است');
  }

  const amount = requested ?? remaining;
  if (!Number.isFinite(amount) || amount < 1) {
    throw new BadRequestException('مبلغ استرداد نامعتبر است');
  }
  if (amount > remaining) {
    throw new BadRequestException(
      `حداکثر مبلغ قابل استرداد ${remaining} ریال است`,
    );
  }
  return amount;
}
