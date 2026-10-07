import { z } from 'zod';
import { seoFieldsInputSchema } from './seo.js';

export const brandSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  description: z.string(),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
  updatedAt: z.iso.datetime(),
});

export type Brand = z.infer<typeof brandSchema>;

export const createBrandSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  description: z.string().optional().default(''),
  ...seoFieldsInputSchema.shape,
});

export type CreateBrandInput = z.infer<typeof createBrandSchema>;

export const updateBrandSchema = createBrandSchema.partial();

export type UpdateBrandInput = z.infer<typeof updateBrandSchema>;
