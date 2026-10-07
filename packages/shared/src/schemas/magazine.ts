import { z } from 'zod';
import { MAGAZINE_POST_STATUSES } from '../constants.js';
import { paginationQuerySchema } from './pagination.js';
import { productSchema } from './product.js';
import { seoFieldsInputSchema } from './seo.js';

export const magazinePostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  coverImage: z.string().nullable(),
  bodyMarkdown: z.string(),
  status: z.enum(MAGAZINE_POST_STATUSES),
  publishedAt: z.iso.datetime().nullable(),
  relatedProductIds: z.array(z.string()),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type MagazinePost = z.infer<typeof magazinePostSchema>;

export const magazinePostSummarySchema = magazinePostSchema.omit({
  bodyMarkdown: true,
});

export type MagazinePostSummary = z.infer<typeof magazinePostSummarySchema>;

export const magazinePostDetailSchema = magazinePostSchema.extend({
  relatedProducts: z.array(productSchema),
});

export type MagazinePostDetail = z.infer<typeof magazinePostDetailSchema>;

export const magazinePublicListSchema = z.object({
  items: z.array(magazinePostSummarySchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1),
});

export type MagazinePublicList = z.infer<typeof magazinePublicListSchema>;

export const magazineAdminListSchema = z.object({
  items: z.array(magazinePostSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1),
});

export type MagazineAdminList = z.infer<typeof magazineAdminListSchema>;

export const createMagazinePostSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  excerpt: z.string().trim().optional().default(''),
  coverImage: z.string().trim().nullable().optional(),
  bodyMarkdown: z.string().optional().default(''),
  status: z.enum(MAGAZINE_POST_STATUSES).optional().default('draft'),
  relatedProductIds: z.array(z.string()).optional().default([]),
  ...seoFieldsInputSchema.shape,
});

export type CreateMagazinePostInput = z.infer<typeof createMagazinePostSchema>;

export const updateMagazinePostSchema = createMagazinePostSchema.partial();

export type UpdateMagazinePostInput = z.infer<typeof updateMagazinePostSchema>;

export const magazineListQuerySchema = paginationQuerySchema.extend({
  status: z.enum(MAGAZINE_POST_STATUSES).optional(),
});

export type MagazineListQuery = z.infer<typeof magazineListQuerySchema>;
