import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { resolveRefundAmount } from './refund.util.js';

describe('resolveRefundAmount', () => {
  it('refunds full remaining when amount omitted', () => {
    expect(resolveRefundAmount(10_000, 0)).toBe(10_000);
    expect(resolveRefundAmount(10_000, 3_000)).toBe(7_000);
  });

  it('allows partial refund within remaining', () => {
    expect(resolveRefundAmount(10_000, 2_000, 4_000)).toBe(4_000);
  });

  it('rejects when nothing remains', () => {
    expect(() => resolveRefundAmount(10_000, 10_000)).toThrow(
      BadRequestException,
    );
  });

  it('rejects amount above remaining', () => {
    expect(() => resolveRefundAmount(10_000, 1_000, 9_500)).toThrow(
      BadRequestException,
    );
  });

  it('rejects non-positive requested amount', () => {
    expect(() => resolveRefundAmount(10_000, 0, 0)).toThrow(BadRequestException);
  });
});
