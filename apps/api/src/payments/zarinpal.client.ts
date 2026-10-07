import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env.schema.js';

type ZarinpalRequestResponse = {
  data?: {
    code?: number;
    message?: string;
    authority?: string;
    fee_type?: string;
    fee?: number;
  };
  errors?: unknown;
};

type ZarinpalVerifyResponse = {
  data?: {
    code?: number;
    message?: string;
    ref_id?: number;
    card_pan?: string;
  };
  errors?: unknown;
};

type ZarinpalRefundResponse = {
  data?: {
    code?: number;
    message?: string;
    ref_id?: number;
  };
  errors?: unknown;
};

@Injectable()
export class ZarinpalClient {
  constructor(private readonly config: ConfigService<Env, true>) {}

  private get sandbox() {
    return this.config.get('ZARINPAL_SANDBOX', { infer: true });
  }

  private get merchantId() {
    return this.config.get('ZARINPAL_MERCHANT_ID', { infer: true });
  }

  private get apiBase() {
    return this.sandbox
      ? 'https://sandbox.zarinpal.com/pg/v4/payment'
      : 'https://payment.zarinpal.com/pg/v4/payment';
  }

  private get startPayBase() {
    return this.sandbox
      ? 'https://sandbox.zarinpal.com/pg/StartPay'
      : 'https://www.zarinpal.com/pg/StartPay';
  }

  paymentUrl(authority: string) {
    return `${this.startPayBase}/${authority}`;
  }

  async requestPayment(input: {
    /** Rials — the unit Zarinpal's `amount` field expects by default. */
    amountRial: number;
    description: string;
    callbackUrl: string;
    orderId: string;
  }) {
    const merchantId = this.merchantId;
    if (!merchantId) {
      throw new ServiceUnavailableException(
        'ZARINPAL_MERCHANT_ID تنظیم نشده است',
      );
    }

    const response = await fetch(`${this.apiBase}/request.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: input.amountRial,
        description: input.description,
        callback_url: input.callbackUrl,
        metadata: { order_id: input.orderId },
      }),
    });

    const payload = (await response.json()) as ZarinpalRequestResponse;
    const code = payload.data?.code;
    const authority = payload.data?.authority;

    if (!response.ok || code !== 100 || !authority) {
      throw new BadRequestException(
        payload.data?.message || 'درخواست پرداخت زرین‌پال ناموفق بود',
      );
    }

    return {
      authority,
      paymentUrl: this.paymentUrl(authority),
    };
  }

  async verifyPayment(input: { authority: string; amountRial: number }) {
    const merchantId = this.merchantId;
    if (!merchantId) {
      throw new ServiceUnavailableException(
        'ZARINPAL_MERCHANT_ID تنظیم نشده است',
      );
    }

    const response = await fetch(`${this.apiBase}/verify.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: input.amountRial,
        authority: input.authority,
      }),
    });

    const payload = (await response.json()) as ZarinpalVerifyResponse;
    const code = payload.data?.code;

    // 100 = success, 101 = already verified
    if (!response.ok || (code !== 100 && code !== 101)) {
      throw new BadRequestException(
        payload.data?.message || 'تایید پرداخت زرین‌پال ناموفق بود',
      );
    }

    return {
      refId: String(payload.data?.ref_id ?? ''),
      alreadyVerified: code === 101,
    };
  }

  async refundPayment(input: {
    authority: string;
    amountRial: number;
  }) {
    const merchantId = this.merchantId;
    if (!merchantId) {
      throw new ServiceUnavailableException(
        'ZARINPAL_MERCHANT_ID تنظیم نشده است',
      );
    }

    const response = await fetch(`${this.apiBase}/refund.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: merchantId,
        authority: input.authority,
        amount: input.amountRial,
      }),
    });

    const payload = (await response.json()) as ZarinpalRefundResponse;
    const code = payload.data?.code;

    if (!response.ok || (code !== 100 && code !== 101)) {
      throw new BadRequestException(
        payload.data?.message || 'استرداد زرین‌پال ناموفق بود',
      );
    }

    return {
      refId: String(payload.data?.ref_id ?? ''),
      alreadyRefunded: code === 101,
      code: String(code ?? ''),
    };
  }
}
