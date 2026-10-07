import { z } from 'zod';

/** Optional per-entity SEO overrides (null = use fallbacks). */
export const seoFieldsSchema = z.object({
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
});

export type SeoFields = z.infer<typeof seoFieldsSchema>;

export const seoFieldsInputSchema = z.object({
  seoTitle: z.string().trim().max(70).nullable().optional(),
  seoDescription: z.string().trim().max(320).nullable().optional(),
  ogImage: z.string().trim().max(500).nullable().optional(),
});

export type SeoFieldsInput = z.infer<typeof seoFieldsInputSchema>;
