import { z } from 'zod';

export const shippingMethodSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().int().nonnegative(),
  estimatedDays: z.number().int().nonnegative(),
  freeAbove: z.number().int().nonnegative().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.iso.datetime(),
});

export type ShippingMethod = z.infer<typeof shippingMethodSchema>;

export const createShippingMethodSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().nullable().optional(),
  price: z.number().int().nonnegative(),
  estimatedDays: z.number().int().nonnegative(),
  freeAbove: z.number().int().nonnegative().nullable().optional().default(null),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export type CreateShippingMethodInput = z.infer<
  typeof createShippingMethodSchema
>;

export const updateShippingMethodSchema = createShippingMethodSchema.partial();

export type UpdateShippingMethodInput = z.infer<
  typeof updateShippingMethodSchema
>;
