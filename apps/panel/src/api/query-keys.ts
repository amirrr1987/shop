export const queryKeys = {
  categories: ['categories'] as const,
  brands: ['brands'] as const,
  products: (page: number, perPage: number) =>
    ['products', { page, perPage }] as const,
  product: (id: string) => ['products', id] as const,
  orders: ['orders'] as const,
  customers: ['customers'] as const,
  staff: ['staff'] as const,
  productUnits: ['product-units'] as const,
  reviews: (
    page: number,
    perPage: number,
    productId?: string,
    rating?: number,
    status?: string,
  ) => ['reviews', { page, perPage, productId, rating, status }] as const,
  coupons: ['coupons'] as const,
  shippingMethods: ['shipping-methods'] as const,
  contactMessages: (
    page: number,
    perPage: number,
    status?: string,
  ) => ['contact-messages', { page, perPage, status }] as const,
  newsletterSubscribers: (page: number, perPage: number) =>
    ['newsletter-subscribers', { page, perPage }] as const,
  magazine: (page: number, perPage: number, status?: string) =>
    ['magazine', { page, perPage, status }] as const,
  magazinePost: (id: string) => ['magazine', id] as const,
  dashboard: ['dashboard'] as const,
  settings: ['settings'] as const,
  auditLogs: (page: number, action?: string) =>
    ['audit-logs', { page, action }] as const,
  salesReport: (days: number) => ['sales-report', { days }] as const,
}
