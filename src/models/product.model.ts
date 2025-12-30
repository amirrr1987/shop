import { z } from 'zod'
import { tagSchema, type Tag } from './tag.model'
import { categorySchema, type Category } from './category.model'

export const createProductSchema = z.object({
  name: z.string().min(1, 'نام محصول الزامی است'),
  slug: z.string().min(1, 'اسلاگ محصول الزامی است'),
  image: z.string().min(1, 'تصویر محصول الزامی است'),
  price: z.number().int('قیمت باید عدد صحیح باشد').positive('قیمت باید عددی مثبت باشد'),
  discountPrice: z
    .number()
    .int('قیمت تخفیف باید عدد صحیح باشد')
    .positive('قیمت تخفیف باید عددی مثبت باشد')
    .optional()
    .nullable(),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
  stock: z.number().int('موجودی باید عدد صحیح باشد').min(0, 'موجودی نمی‌تواند منفی باشد').default(0),
  isActive: z.boolean().default(true),
  tagIds: z.array(z.string().uuid()).optional().default([]),
  categoryIds: z.array(z.string().uuid()).optional().default([]),
})

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().uuid(),
})

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  stock: z.number(),
  isActive: z.boolean(),
  tags: z.array(tagSchema).optional(),
  categories: z.array(categorySchema).optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type Product = Omit<z.infer<typeof productSchema>, 'tags' | 'categories'> & {
  tags?: Tag[]
  categories?: Category[]
}
