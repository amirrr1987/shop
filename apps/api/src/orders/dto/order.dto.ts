import { createOrderSchema, updateOrderStatusSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateOrderDto extends createZodDto(createOrderSchema) {}

export class UpdateOrderStatusDto extends createZodDto(
  updateOrderStatusSchema,
) {}
