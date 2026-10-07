import { z } from 'zod';
import {
  PAYMENT_PROVIDERS,
  PAYMENT_TX_STATUSES,
  PAYMENT_TX_TYPES,
} from '../constants.js';
import { orderSchema } from './order.js';

export const paymentTransactionSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  userId: z.string().nullable(),
  provider: z.enum(PAYMENT_PROVIDERS),
  type: z.enum(PAYMENT_TX_TYPES),
  status: z.enum(PAYMENT_TX_STATUSES),
  amount: z.number().int().nonnegative(),
  authority: z.string().nullable(),
  refId: z.string().nullable(),
  providerCode: z.string().nullable(),
  reason: z.string().nullable(),
  createdAt: z.iso.datetime(),
});

export type PaymentTransaction = z.infer<typeof paymentTransactionSchema>;

export const startPaymentResultSchema = z.object({
  orderId: z.string(),
  authority: z.string(),
  paymentUrl: z.url(),
  provider: z.enum(PAYMENT_PROVIDERS),
});

export type StartPaymentResult = z.infer<typeof startPaymentResultSchema>;

export const verifyPaymentSchema = z.object({
  authority: z.string().min(1),
  status: z.string().min(1),
  guestToken: z.string().nullable().optional(),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;

export const verifyPaymentResultSchema = z.object({
  order: orderSchema,
  ok: z.boolean(),
  message: z.string(),
});

export type VerifyPaymentResult = z.infer<typeof verifyPaymentResultSchema>;

export const refundPaymentSchema = z.object({
  amount: z.number().int().positive().optional(),
  reason: z.string().trim().nullable().optional(),
});

export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>;

export const refundPaymentResultSchema = z.object({
  order: orderSchema,
  transaction: paymentTransactionSchema,
  message: z.string(),
});

export type RefundPaymentResult = z.infer<typeof refundPaymentResultSchema>;
