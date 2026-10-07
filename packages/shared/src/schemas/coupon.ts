import { z } from 'zod';
import { COUPON_TYPES } from '../constants.js';

export const couponSchema = z.object({
  id: z.string(),
  code: z.string(),
  type: z.enum(COUPON_TYPES),
  value: z.number().nonnegative(),
  minOrderAmount: z.number().int().nonnegative(),
  maxUses: z.number().int().positive().nullable(),
  usedCount: z.number().int().nonnegative(),
  startsAt: z.iso.datetime().nullable(),
  expiresAt: z.iso.datetime().nullable(),
  isActive: z.boolean(),
  isAutomatic: z.boolean(),
  createdAt: z.iso.datetime(),
});

export type Coupon = z.infer<typeof couponSchema>;

export const createCouponSchema = z.object({
  code: z.string().trim().min(1).max(32),
  type: z.enum(COUPON_TYPES),
  value: z.number().nonnegative(),
  minOrderAmount: z.number().int().nonnegative().optional().default(0),
  maxUses: z.number().int().positive().nullable().optional().default(null),
  startsAt: z.iso.datetime().nullable().optional().default(null),
  expiresAt: z.iso.datetime().nullable().optional().default(null),
  isActive: z.boolean().optional().default(true),
  isAutomatic: z.boolean().optional().default(false),
});

export type CreateCouponInput = z.infer<typeof createCouponSchema>;

export const updateCouponSchema = createCouponSchema.partial();

export type UpdateCouponInput = z.infer<typeof updateCouponSchema>;

export const validateCouponSchema = z.object({
  code: z.string().trim().min(1),
  subtotal: z.number().int().nonnegative(),
});

export type ValidateCouponInput = z.infer<typeof validateCouponSchema>;

export const validateCouponResultSchema = z.object({
  code: z.string(),
  type: z.enum(COUPON_TYPES),
  value: z.number().nonnegative(),
  discount: z.number().int().nonnegative(),
  subtotal: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  automatic: z.boolean(),
});

export type ValidateCouponResult = z.infer<typeof validateCouponResultSchema>;
