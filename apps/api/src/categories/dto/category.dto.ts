import {
  createCategorySchema,
  updateCategorySchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}

export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
