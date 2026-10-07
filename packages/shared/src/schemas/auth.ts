import { z } from 'zod';
import { USER_ROLES } from '../constants.js';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  fullName: z.string().trim().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const publicUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  role: z.enum(USER_ROLES),
  loyaltyPoints: z.number().int().nonnegative(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
