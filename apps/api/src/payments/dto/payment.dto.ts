import { refundPaymentSchema, verifyPaymentSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class VerifyPaymentDto extends createZodDto(verifyPaymentSchema) {}

export class RefundPaymentDto extends createZodDto(refundPaymentSchema) {}
