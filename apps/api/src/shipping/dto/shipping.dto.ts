import {
  createShippingMethodSchema,
  updateShippingMethodSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateShippingMethodDto extends createZodDto(
  createShippingMethodSchema,
) {}

export class UpdateShippingMethodDto extends createZodDto(
  updateShippingMethodSchema,
) {}
