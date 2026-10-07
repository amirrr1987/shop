import {
  createCouponSchema,
  updateCouponSchema,
  validateCouponSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateCouponDto extends createZodDto(createCouponSchema) {}

export class UpdateCouponDto extends createZodDto(updateCouponSchema) {}

export class ValidateCouponDto extends createZodDto(validateCouponSchema) {}
