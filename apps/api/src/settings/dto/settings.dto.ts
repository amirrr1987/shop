import { updateStoreSettingsSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class UpdateStoreSettingsDto extends createZodDto(
  updateStoreSettingsSchema,
) {}
