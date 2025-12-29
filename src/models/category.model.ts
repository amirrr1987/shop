import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1, 'نام دسته‌بندی الزامی است'),
  slug: z.string().min(1, 'اسلاگ دسته‌بندی الزامی است'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
})

export const updateCategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'نام دسته‌بندی الزامی است').optional(),
  slug: z.string().min(1, 'اسلاگ دسته‌بندی الزامی است').optional(),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
})

export const categorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'نام دسته‌بندی الزامی است'),
  slug: z.string().min(1, 'اسلاگ دسته‌بندی الزامی است'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateCategory = z.infer<typeof createCategorySchema>
export type UpdateCategory = z.infer<typeof updateCategorySchema>
export type Category = z.infer<typeof categorySchema>

