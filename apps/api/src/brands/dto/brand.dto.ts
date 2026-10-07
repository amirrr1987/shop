import { createBrandSchema, updateBrandSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateBrandDto extends createZodDto(createBrandSchema) {}
export class UpdateBrandDto extends createZodDto(updateBrandSchema) {}
