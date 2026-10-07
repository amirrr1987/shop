import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class LoginDto extends createZodDto(loginSchema) {}

export class RegisterDto extends createZodDto(registerSchema) {}

export class UpdateProfileDto extends createZodDto(updateProfileSchema) {}

export class ChangePasswordDto extends createZodDto(changePasswordSchema) {}

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
