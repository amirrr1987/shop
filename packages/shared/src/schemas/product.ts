import { z } from 'zod';
import {
  PRODUCT_CONDITIONS,
  PRODUCT_PRICE_MODES,
  PRODUCT_SORTS,
} from '../constants.js';
import {
  optionalQueryBooleanSchema,
  paginationQuerySchema,
} from './pagination.js';
import { seoFieldsInputSchema } from './seo.js';

export const productSpecSchema = z.object({
  key: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

export type ProductSpec = z.infer<typeof productSpecSchema>;

export const productVariantSchema = z.object({
  id: z.string(),
  productId: z.string(),
  sku: z.string(),
  label: z.string(),
  options: z.record(z.string(), z.string()),
  price: z.number().int().nonnegative().nullable(),
  stock: z.number().int().nonnegative(),
  isActive: z.boolean(),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;

export const upsertProductVariantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().trim().min(1),
  label: z.string().trim().min(1),
  options: z.record(z.string(), z.string()).optional().default({}),
  price: z.number().int().nonnegative().nullable(),
  stock: z.number().int().nonnegative(),
  isActive: z.boolean(),
});

export type UpsertProductVariantInput = z.infer<
  typeof upsertProductVariantSchema
>;

export const productSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  description: z.string(),
  price: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().nullable(),
  brandId: z.string().nullable(),
  brandName: z.string().nullable(),
  brandSlug: z.string().nullable(),
  unitId: z.string().nullable(),
  unitName: z.string().nullable(),
  unitSymbol: z.string().nullable(),
  images: z.array(z.string()),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  priceMode: z.enum(PRODUCT_PRICE_MODES),
  condition: z.enum(PRODUCT_CONDITIONS),
  salePrice: z.number().int().nonnegative().nullable(),
  saleEndsAt: z.iso.datetime().nullable(),
  specs: z.array(productSpecSchema),
  videoUrl: z.string().nullable(),
  viewCount: z.number().int().nonnegative(),
  variants: z.array(productVariantSchema),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
  updatedAt: z.iso.datetime(),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  description: z.string().default(''),
  price: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative().default(0),
  categoryId: z.string().nullable().optional().default(null),
  brandId: z.string().nullable().optional().default(null),
  unitId: z.string().nullable().optional().default(null),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  priceMode: z.enum(PRODUCT_PRICE_MODES).optional().default('fixed'),
  condition: z.enum(PRODUCT_CONDITIONS).optional().default('new'),
  salePrice: z.number().int().nonnegative().nullable().optional().default(null),
  saleEndsAt: z.iso.datetime().nullable().optional().default(null),
  specs: z.array(productSpecSchema).optional().default([]),
  videoUrl: z.string().optional().default(''),
  variants: z.array(upsertProductVariantSchema).optional().default([]),
  ...seoFieldsInputSchema.shape,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const productListQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().min(1).optional(),
  category: z.string().trim().min(1).optional(),
  brand: z.string().trim().min(1).optional(),
  condition: z.enum(PRODUCT_CONDITIONS).optional(),
  option: z.string().trim().min(1).optional(),
  sort: z.enum(PRODUCT_SORTS).default('newest'),
  minPrice: z.coerce.number().int().nonnegative().optional(),
  maxPrice: z.coerce.number().int().nonnegative().optional(),
  inStock: optionalQueryBooleanSchema,
  featured: optionalQueryBooleanSchema,
  onSale: optionalQueryBooleanSchema,
});

export type ProductListQuery = z.infer<typeof productListQuerySchema>;

export const productFacetValueSchema = z.object({
  value: z.string(),
  count: z.number().int().nonnegative(),
});

export const productFacetOptionSchema = z.object({
  key: z.string(),
  values: z.array(productFacetValueSchema),
});

export const productFacetBucketSchema = z.object({
  slug: z.string(),
  name: z.string(),
  count: z.number().int().nonnegative(),
});

export const productFacetsSchema = z.object({
  brands: z.array(productFacetBucketSchema),
  categories: z.array(productFacetBucketSchema),
  options: z.array(productFacetOptionSchema),
});

export type ProductFacets = z.infer<typeof productFacetsSchema>;

export const productAvailabilityLineSchema = z.object({
  productId: z.string(),
  variantId: z.string().nullable().optional(),
});

export const productAvailabilityRequestSchema = z.object({
  items: z.array(productAvailabilityLineSchema).optional(),
  productIds: z.array(z.string()).optional(),
});

export type ProductAvailabilityRequest = z.infer<
  typeof productAvailabilityRequestSchema
>;

export const productAvailabilityItemSchema = z.object({
  id: z.string(),
  variantId: z.string().nullable(),
  name: z.string(),
  slug: z.string(),
  price: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  image: z.string().nullable(),
  variantLabel: z.string().nullable(),
  sku: z.string().nullable(),
});

export type ProductAvailabilityItem = z.infer<
  typeof productAvailabilityItemSchema
>;

export const cartUpsellRequestSchema = z.object({
  productIds: z.array(z.string()).min(1),
  limit: z.number().int().min(1).max(20).optional(),
});

export type CartUpsellRequest = z.infer<typeof cartUpsellRequestSchema>;
