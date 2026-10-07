import { z } from 'zod';
import { seoFieldsInputSchema } from './seo.js';

export const categorySpecKeySchema = z.object({
  key: z.string().trim().min(1),
  sortOrder: z.number().int().nonnegative(),
  required: z.boolean(),
});

export type CategorySpecKey = z.infer<typeof categorySpecKeySchema>;

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  parentId: z.string().nullable(),
  description: z.string(),
  specKeys: z.array(categorySpecKeySchema),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
  updatedAt: z.iso.datetime(),
});

export type Category = z.infer<typeof categorySchema>;

export const createCategorySchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  parentId: z.string().nullable().optional().default(null),
  description: z.string().optional().default(''),
  specKeys: z.array(categorySpecKeySchema).optional().default([]),
  ...seoFieldsInputSchema.shape,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
