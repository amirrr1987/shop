import { describe, expect, it } from 'vitest';
import { envSchema } from './env.schema.js';

const base = {
  JWT_SECRET: 'test-jwt-secret-16',
  COOKIE_SECRET: 'test-cookie-secret',
};

describe('envSchema payment provider', () => {
  it('allows mock without merchant id', () => {
    const parsed = envSchema.parse({
      ...base,
      PAYMENT_PROVIDER: 'mock',
      ZARINPAL_MERCHANT_ID: '',
    });
    expect(parsed.PAYMENT_PROVIDER).toBe('mock');
  });

  it('requires merchant id when provider is zarinpal', () => {
    const result = envSchema.safeParse({
      ...base,
      PAYMENT_PROVIDER: 'zarinpal',
      ZARINPAL_MERCHANT_ID: '   ',
    });
    expect(result.success).toBe(false);
  });

  it('accepts zarinpal with merchant id', () => {
    const parsed = envSchema.parse({
      ...base,
      PAYMENT_PROVIDER: 'zarinpal',
      ZARINPAL_MERCHANT_ID: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      ZARINPAL_SANDBOX: 'true',
    });
    expect(parsed.ZARINPAL_SANDBOX).toBe(true);
  });
});
