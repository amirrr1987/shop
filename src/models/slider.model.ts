import { z } from 'zod'

export const createSliderSchema = z.object({
  title: z.string().min(1, 'عنوان اسلایدر الزامی است'),
  position: z.string().default('home'),
  image: z.string().min(1, 'تصویر اسلایدر الزامی است'),
  imageMobile: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  buttonText: z.string().nullable().optional(),
  buttonColor: z.string().nullable().optional(),
  textColor: z.string().nullable().optional(),
  textAlign: z.enum(['left', 'center', 'right']).default('center'),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
})

export const updateSliderSchema = createSliderSchema.partial().extend({
  id: z.string().uuid(),
})

export const sliderSchema = createSliderSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export type CreateSlider = z.infer<typeof createSliderSchema>
export type UpdateSlider = z.infer<typeof updateSliderSchema>
export type Slider = z.infer<typeof sliderSchema>
