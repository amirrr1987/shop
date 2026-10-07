import { createHash } from 'node:crypto';

export const CacheTTL = {
  PRODUCT: 300,
  RELATED: 300,
  LIST: 30,
  FACETS: 120,
  CATEGORY: 600,
  BRAND: 600,
  SETTINGS: 300,
  MAGAZINE: 120,
} as const;

export const CacheKeys = {
  productSlug: (slug: string) => `shop:product:slug:${slug}`,
  productRelated: (slug: string) => `shop:product:related:${slug}`,
  productAlsoBought: (slug: string) => `shop:product:also-bought:${slug}`,

  productList: (query: unknown) =>
    `shop:products:list:${hashPayload(query)}`,
  productFacets: (category?: string, brand?: string) =>
    `shop:products:facets:${category || '-'}:${brand || '-'}`,
  categoriesAll: () => 'shop:categories:all',
  categorySlug: (slug: string) => `shop:category:slug:${slug}`,
  brandsAll: () => 'shop:brands:all',
  brandSlug: (slug: string) => `shop:brand:slug:${slug}`,
  settings: () => 'shop:settings',
  magazineList: (query: unknown) =>
    `shop:magazine:list:${hashPayload(query)}`,
  magazineSlug: (slug: string) => `shop:magazine:slug:${slug}`,
  prefixMagazineList: () => 'shop:magazine:list:',
  prefixMagazineSlug: () => 'shop:magazine:slug:',
  prefixProductsList: () => 'shop:products:list:',
  prefixProductsFacets: () => 'shop:products:facets:',
  prefixProduct: () => 'shop:product:',
} as const;

function hashPayload(value: unknown): string {
  return createHash('sha1')
    .update(JSON.stringify(value ?? {}))
    .digest('hex')
    .slice(0, 16);
}
