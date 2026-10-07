import { z } from 'zod';

export const loyaltyQuoteRequestSchema = z.object({
  subtotal: z.number().int().nonnegative(),
  couponDiscount: z.number().int().nonnegative().default(0),
  pointsToRedeem: z.number().int().nonnegative().optional(),
});

export type LoyaltyQuoteRequest = z.infer<typeof loyaltyQuoteRequestSchema>;

export const loyaltyQuoteSchema = z.object({
  enabled: z.boolean(),
  balance: z.number().int().nonnegative(),
  earnRialsPerPoint: z.number().int().positive(),
  redeemRialsPerPoint: z.number().int().positive(),
  maxRedeemPercent: z.number().min(0).max(100),
  maxRedeemablePoints: z.number().int().nonnegative(),
  discount: z.number().int().nonnegative(),
  pointsUsed: z.number().int().nonnegative(),
});

export type LoyaltyQuote = z.infer<typeof loyaltyQuoteSchema>;
