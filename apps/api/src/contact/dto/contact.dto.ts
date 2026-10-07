import {
  contactListQuerySchema,
  createContactMessageSchema,
  updateContactStatusSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateContactMessageDto extends createZodDto(
  createContactMessageSchema,
) {}

export class UpdateContactStatusDto extends createZodDto(
  updateContactStatusSchema,
) {}

export class ContactListQueryDto extends createZodDto(contactListQuerySchema) {}
