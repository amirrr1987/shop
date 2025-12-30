import { z } from 'zod'

export const createTagSchema = z.object({
  title: z.string().min(1, 'عنوان تگ الزامی است'),
  slug: z.string().min(1, 'اسلاگ تگ الزامی است'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
})

export const updateTagSchema = createTagSchema.partial().extend({
  id: z.string().uuid(),
})

export const tagSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateTag = z.infer<typeof createTagSchema>
export type UpdateTag = z.infer<typeof updateTagSchema>
export type Tag = z.infer<typeof tagSchema>
