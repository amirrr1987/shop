import { z } from 'zod'

export const createMenuSchema = z.object({
  title: z.string().min(1, 'عنوان منو الزامی است'),
  location: z.string().min(1, 'موقعیت منو الزامی است'),
  link: z.string().nullable().optional(),
  linkType: z.enum(['internal', 'external', 'category', 'product']).default('internal'),
  icon: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  openInNewTab: z.boolean().default(false),
  parentId: z.string().uuid().nullable().optional(),
})

export const updateMenuSchema = createMenuSchema.partial().extend({
  id: z.string().uuid(),
})

// Base menu schema
const baseMenuSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  location: z.string(),
  link: z.string().nullable().optional(),
  linkType: z.string(),
  icon: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  sortOrder: z.number(),
  isActive: z.boolean(),
  openInNewTab: z.boolean(),
  parentId: z.string().uuid().nullable().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateMenu = z.infer<typeof createMenuSchema>
export type UpdateMenu = z.infer<typeof updateMenuSchema>
export type Menu = z.infer<typeof baseMenuSchema> & {
  parent?: Menu | null
  children?: Menu[]
}
