import { z } from 'zod';

export const wishlistItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number().int().nonnegative(),
  image: z.string().nullable(),
  stock: z.number().int().nonnegative(),
});

export type WishlistItem = z.infer<typeof wishlistItemSchema>;

export const mergeWishlistSchema = z.object({
  productIds: z.array(z.string()),
});

export type MergeWishlistInput = z.infer<typeof mergeWishlistSchema>;
