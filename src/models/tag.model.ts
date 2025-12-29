import { z } from 'zod'

export const createTagSchema = z.object({
  title: z.string().min(1, 'عنوان تگ الزامی است'),
  slug: z.string().min(1, 'اسلاگ تگ الزامی است'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
})

export const updateTagSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'عنوان تگ الزامی است').optional(),
  slug: z.string().min(1, 'اسلاگ تگ الزامی است').optional(),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
})

export const tagSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'عنوان تگ الزامی است'),
  slug: z.string().min(1, 'اسلاگ تگ الزامی است'),
  description: z.string().min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد').optional().nullable(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateTag = z.infer<typeof createTagSchema>
export type UpdateTag = z.infer<typeof updateTagSchema>
export type Tag = z.infer<typeof tagSchema>

