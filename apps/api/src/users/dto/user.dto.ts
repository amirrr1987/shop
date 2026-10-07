import {
  adminUsersQuerySchema,
  createAdminUserSchema,
  setUserActiveSchema,
  updateAdminUserSchema,
  updateUserRoleSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class UpdateUserRoleDto extends createZodDto(updateUserRoleSchema) {}

export class CreateAdminUserDto extends createZodDto(createAdminUserSchema) {}

export class UpdateAdminUserDto extends createZodDto(updateAdminUserSchema) {}

export class SetUserActiveDto extends createZodDto(setUserActiveSchema) {}

export class AdminUsersQueryDto extends createZodDto(adminUsersQuerySchema) {}
