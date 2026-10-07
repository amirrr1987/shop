import { sendOtpSchema, verifyOtpSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class SendOtpDto extends createZodDto(sendOtpSchema) {}

export class VerifyOtpDto extends createZodDto(verifyOtpSchema) {}
