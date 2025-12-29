import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'نام محصول الزامی است'),
  price: z.number().int('قیمت باید عدد صحیح باشد').positive('قیمت باید عددی مثبت باشد'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional(),
  image: z.string().min(1, 'تصویر محصول الزامی است'),
})

export const updateProductSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'نام محصول الزامی است'),
  price: z.number().int('قیمت باید عدد صحیح باشد').positive('قیمت باید عددی مثبت باشد'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional(),
  image: z.string().min(1, 'تصویر محصول الزامی است'),
})

export const productSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'نام محصول الزامی است'),
  price: z.number().int('قیمت باید عدد صحیح باشد').positive('قیمت باید عددی مثبت باشد'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional(),
  image: z.string().min(1, 'تصویر محصول الزامی است'),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type Product = z.infer<typeof productSchema>
