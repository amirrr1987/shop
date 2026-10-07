import { z } from 'zod';
import { ORDER_STATUSES, PAYMENT_STATUSES } from '../constants.js';
import { addressSchema } from './address.js';

export const orderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().nullable(),
  sku: z.string().nullable(),
  variantLabel: z.string().nullable(),
  name: z.string(),
  unitPrice: z.number().int().nonnegative(),
  quantity: z.number().int().min(1),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  status: z.enum(ORDER_STATUSES),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  subtotal: z.number().int().nonnegative(),
  discount: z.number().int().nonnegative(),
  loyaltyDiscount: z.number().int().nonnegative(),
  loyaltyPointsRedeemed: z.number().int().nonnegative(),
  loyaltyPointsEarned: z.number().int().nonnegative(),
  couponCode: z.string().nullable(),
  shippingMethodId: z.string().nullable(),
  shippingMethodName: z.string().nullable(),
  shippingCost: z.number().int().nonnegative(),
  taxAmount: z.number().int().nonnegative(),
  refundedAmount: z.number().int().nonnegative(),
  note: z.string().nullable(),
  trackingCode: z.string().nullable(),
  total: z.number().int().nonnegative(),
  paymentAuthority: z.string().nullable(),
  paymentRefId: z.string().nullable(),
  address: addressSchema,
  items: z.array(orderItemSchema),
  createdAt: z.iso.datetime(),
});

export type Order = z.infer<typeof orderSchema>;

export const adminOrderSchema = orderSchema.extend({
  userId: z.string().nullable(),
  userEmail: z.string().nullable(),
  userFullName: z.string().nullable(),
  guestPhone: z.string().nullable(),
  adminNote: z.string().nullable(),
});

export type AdminOrder = z.infer<typeof adminOrderSchema>;

export const createOrderItemInputSchema = z.object({
  productId: z.string(),
  variantId: z.string().nullable().optional(),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  items: z.array(createOrderItemInputSchema).min(1),
  address: addressSchema,
  shippingMethodId: z.string().min(1),
  guestEmail: z.email().nullable().optional(),
  guestPhone: z.string().nullable().optional(),
  otpToken: z.string().nullable().optional(),
  couponCode: z.string().nullable().optional(),
  loyaltyPointsToRedeem: z.number().int().nonnegative().nullable().optional(),
  note: z.string().nullable().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const createOrderResultSchema = orderSchema.extend({
  guestToken: z.string().nullable(),
});

export type CreateOrderResult = z.infer<typeof createOrderResultSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES),
  trackingCode: z.string().trim().nullable().optional(),
  adminNote: z.string().trim().nullable().optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
