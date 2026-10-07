import { z } from 'zod';
import { OTP_PURPOSES } from '../constants.js';

export const sendOtpSchema = z.object({
  phone: z.string().min(1),
  purpose: z.enum(OTP_PURPOSES),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;

export const sendOtpResultSchema = z.object({
  ok: z.literal(true),
  expiresInSec: z.number().int().positive(),
  debugCode: z.string().optional(),
});

export type SendOtpResult = z.infer<typeof sendOtpResultSchema>;

export const verifyOtpSchema = z.object({
  phone: z.string().min(1),
  purpose: z.enum(OTP_PURPOSES),
  code: z.string().trim().min(4).max(8),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const verifyOtpResultSchema = z.object({
  token: z.string(),
  expiresInSec: z.number().int().positive(),
});

export type VerifyOtpResult = z.infer<typeof verifyOtpResultSchema>;
