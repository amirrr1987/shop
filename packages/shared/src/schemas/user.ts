import { z } from 'zod';
import { PANEL_ROLES, USER_ROLES } from '../constants.js';
import { publicUserSchema } from './auth.js';

export const adminUserSchema = publicUserSchema.extend({
  createdAt: z.iso.datetime(),
  orderCount: z.number().int().nonnegative(),
  orderTotal: z.number().int().nonnegative(),
  isActive: z.boolean(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;

export const createAdminUserSchema = z.object({
  email: z.email(),
  fullName: z.string().trim().min(1),
  password: z.string().min(8),
  role: z.enum(PANEL_ROLES),
});

export type CreateAdminUserInput = z.infer<typeof createAdminUserSchema>;

export const updateAdminUserSchema = z.object({
  email: z.email().optional(),
  fullName: z.string().trim().min(1).optional(),
  password: z.string().min(8).optional(),
  role: z.enum(PANEL_ROLES).optional(),
});

export type UpdateAdminUserInput = z.infer<typeof updateAdminUserSchema>;

export const updateUserRoleSchema = z.object({
  role: z.enum(USER_ROLES),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

export const setUserActiveSchema = z.object({
  isActive: z.boolean(),
});

export type SetUserActiveInput = z.infer<typeof setUserActiveSchema>;

export const adminUsersQuerySchema = z.object({
  scope: z.enum(['customers', 'staff']).optional(),
});

export type AdminUsersQuery = z.infer<typeof adminUsersQuerySchema>;
