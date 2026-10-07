import { auditLogListQuerySchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class AuditLogListQueryDto extends createZodDto(
  auditLogListQuerySchema,
) {}
