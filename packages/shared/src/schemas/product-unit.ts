import { z } from 'zod';

export const productUnitSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  symbol: z.string().trim().min(1),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export type ProductUnit = z.infer<typeof productUnitSchema>;

export const createProductUnitSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  symbol: z.string().trim().min(1),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export type CreateProductUnitInput = z.infer<typeof createProductUnitSchema>;

export const updateProductUnitSchema = createProductUnitSchema.partial();

export type UpdateProductUnitInput = z.infer<typeof updateProductUnitSchema>;
