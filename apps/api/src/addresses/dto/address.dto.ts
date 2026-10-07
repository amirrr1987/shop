import { createAddressSchema, updateAddressSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateAddressDto extends createZodDto(createAddressSchema) {}

export class UpdateAddressDto extends createZodDto(updateAddressSchema) {}
