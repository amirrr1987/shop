import { salesReportQuerySchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class SalesReportQueryDto extends createZodDto(salesReportQuerySchema) {}
