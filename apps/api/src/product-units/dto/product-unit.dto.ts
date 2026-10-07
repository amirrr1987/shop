import {
  createProductUnitSchema,
  updateProductUnitSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateProductUnitDto extends createZodDto(
  createProductUnitSchema,
) {}

export class UpdateProductUnitDto extends createZodDto(
  updateProductUnitSchema,
) {}
