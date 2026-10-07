import { z } from 'zod';

export const salesReportQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(365).default(30),
});

export type SalesReportQuery = z.infer<typeof salesReportQuerySchema>;

export const salesDaySchema = z.object({
  date: z.string(),
  orders: z.number().int().nonnegative(),
  revenue: z.number().int().nonnegative(),
});

export const salesTopProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number().int().nonnegative(),
  revenue: z.number().int().nonnegative(),
});

export type SalesTopProduct = z.infer<typeof salesTopProductSchema>;

export const salesTopCategorySchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  quantity: z.number().int().nonnegative(),
  revenue: z.number().int().nonnegative(),
});

export type SalesTopCategory = z.infer<typeof salesTopCategorySchema>;

export const salesReportSchema = z.object({
  days: z.array(salesDaySchema),
  totals: z.object({
    orders: z.number().int().nonnegative(),
    paidOrders: z.number().int().nonnegative(),
    revenue: z.number().int().nonnegative(),
    pendingOrders: z.number().int().nonnegative(),
    unpaidOrders: z.number().int().nonnegative(),
    aov: z.number().int().nonnegative(),
  }),
  today: z.object({
    orders: z.number().int().nonnegative(),
    revenue: z.number().int().nonnegative(),
  }),
  topProducts: z.array(salesTopProductSchema),
  topCategories: z.array(salesTopCategorySchema),
});

export type SalesReport = z.infer<typeof salesReportSchema>;
