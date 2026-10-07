import {
  createMagazinePostSchema,
  magazineListQuerySchema,
  updateMagazinePostSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateMagazinePostDto extends createZodDto(
  createMagazinePostSchema,
) {}

export class UpdateMagazinePostDto extends createZodDto(
  updateMagazinePostSchema,
) {}

export class MagazineListQueryDto extends createZodDto(
  magazineListQuerySchema,
) {}
