import { z } from 'zod';

export const cartLineInputSchema = z.object({
  productId: z.string(),
  variantId: z.string().nullable().optional(),
  quantity: z.number().int().min(1),
});

export type CartLineInput = z.infer<typeof cartLineInputSchema>;

/** @deprecated Prefer cartLineInputSchema — kept for early seed compatibility. */
export const cartItemSchema = cartLineInputSchema;

export type CartItem = CartLineInput;

export const serverCartLineSchema = z.object({
  productId: z.string(),
  variantId: z.string().nullable(),
  quantity: z.number().int().min(1),
  name: z.string(),
  slug: z.string(),
  price: z.number().int().nonnegative(),
  image: z.string().nullable(),
  stock: z.number().int().nonnegative(),
  variantLabel: z.string().nullable(),
  sku: z.string().nullable(),
});

export type ServerCartLine = z.infer<typeof serverCartLineSchema>;

export const serverCartSchema = z.object({
  items: z.array(serverCartLineSchema),
});

export type ServerCart = z.infer<typeof serverCartSchema>;

export const replaceCartSchema = z.object({
  items: z.array(cartLineInputSchema),
});

export type ReplaceCartInput = z.infer<typeof replaceCartSchema>;

export const mergeCartSchema = z.object({
  items: z.array(cartLineInputSchema),
});

export type MergeCartInput = z.infer<typeof mergeCartSchema>;

export const cartSchema = z.object({
  items: z.array(cartLineInputSchema),
});

export type Cart = z.infer<typeof cartSchema>;
