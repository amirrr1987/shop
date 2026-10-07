import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  province: z.string().trim().min(1),
  city: z.string().trim().min(1),
  postalCode: z.string().trim().min(1),
  line: z.string().trim().min(1),
});

export type Address = z.infer<typeof addressSchema>;

export const createAddressSchema = addressSchema.extend({
  label: z.string().trim().nullable().optional(),
  isDefault: z.boolean().optional(),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;

export const updateAddressSchema = createAddressSchema.partial();

export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;

export const savedAddressSchema = addressSchema.extend({
  id: z.string(),
  label: z.string().nullable(),
  isDefault: z.boolean(),
});

export type SavedAddress = z.infer<typeof savedAddressSchema>;
