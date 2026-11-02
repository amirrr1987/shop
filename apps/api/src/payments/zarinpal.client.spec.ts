import { BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Env } from '../config/env.schema.js';
import { ZarinpalClient } from './zarinpal.client.js';

function createClient(overrides: Partial<Env> = {}) {
  const values: Partial<Env> = {
    ZARINPAL_MERCHANT_ID: '00000000-0000-0000-0000-000000000000',
    ZARINPAL_SANDBOX: true,
    ...overrides,
  };
  const config = {
    get: (key: keyof Env) => values[key],
  } as ConfigService<Env, true>;
  return new ZarinpalClient(config);
}

describe('ZarinpalClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('builds sandbox StartPay URL', () => {
    const client = createClient({ ZARINPAL_SANDBOX: true });
    expect(client.paymentUrl('A1')).toBe(
      'https://sandbox.zarinpal.com/pg/StartPay/A1',
    );
  });

  it('builds production StartPay URL', () => {
    const client = createClient({ ZARINPAL_SANDBOX: false });
    expect(client.paymentUrl('A1')).toBe(
      'https://www.zarinpal.com/pg/StartPay/A1',
    );
  });

  it('rejects request when merchant id is missing', async () => {
    const client = createClient({ ZARINPAL_MERCHANT_ID: '' });
    await expect(
      client.requestPayment({
        amountRial: 10_000,
        description: 'test',
        callbackUrl: 'http://localhost:4001/payments/callback',
        orderId: 'order-1',
      }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('requests payment against sandbox API and returns authority', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { code: 100, authority: 'SBOX-AUTH', message: 'Success' },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const client = createClient({ ZARINPAL_SANDBOX: true });
    const result = await client.requestPayment({
      amountRial: 50_000,
      description: 'سفارش تست',
      callbackUrl: 'http://localhost:4001/payments/callback',
      orderId: 'order-42',
    });

    expect(result.authority).toBe('SBOX-AUTH');
    expect(result.paymentUrl).toContain('sandbox.zarinpal.com');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://sandbox.zarinpal.com/pg/v4/payment/request.json',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('treats verify code 101 as already verified', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { code: 101, ref_id: 123, message: 'Verified' },
        }),
      }),
    );

    const client = createClient();
    const result = await client.verifyPayment({
      authority: 'AUTH',
      amountRial: 10_000,
    });

    expect(result.alreadyVerified).toBe(true);
    expect(result.refId).toBe('123');
  });

  it('rejects failed verify responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { code: -51, message: 'Failed' },
        }),
      }),
    );

    const client = createClient();
    await expect(
      client.verifyPayment({ authority: 'AUTH', amountRial: 10_000 }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
