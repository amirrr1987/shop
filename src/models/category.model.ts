import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1, 'نام دسته‌بندی الزامی است'),
  slug: z.string().min(1, 'اسلاگ دسته‌بندی الزامی است'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional(),
  image: z.string().max(500).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  parentId: z.string().uuid().optional(),
})

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().uuid(),
})

// Base category schema without recursive relations
const baseCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number(),
  parentId: z.string().uuid().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

// Category with optional parent and children (lazy evaluation for recursion)
export const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  parent: z.lazy(() => categorySchema).optional(),
  children: z.lazy(() => z.array(categorySchema)).optional(),
})

export type CreateCategory = z.infer<typeof createCategorySchema>
export type UpdateCategory = z.infer<typeof updateCategorySchema>
export type Category = z.infer<typeof baseCategorySchema> & {
  parent?: Category | null
  children?: Category[]
}
