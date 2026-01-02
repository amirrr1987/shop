import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string().min(1, 'نام مشتری الزامی است'),
  email: z.string().email('ایمیل مشتری الزامی است'),
  phone: z.string().min(1, 'شماره تلفن مشتری الزامی است'),
  address: z.string().min(1, 'آدرس مشتری الزامی است'),
  isActive: z.boolean().default(true),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
})

export const updateCustomerSchema = createCustomerSchema.partial().extend({
  id: z.uuid(),
})

export const customerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  description: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateCustomer = z.infer<typeof createCustomerSchema>
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>
export type Customer = z.infer<typeof customerSchema>
