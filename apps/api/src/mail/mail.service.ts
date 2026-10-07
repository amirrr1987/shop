import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { formatMoney } from '@shop/shared';
import nodemailer, { type Transporter } from 'nodemailer';
import type { Env } from '../config/env.schema.js';
import type { OrderEntity } from '../orders/order.entity.js';
import { SettingsService } from '../settings/settings.service.js';

export type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly driver: 'log' | 'smtp';
  private readonly from: string;
  private readonly webAppUrl: string;
  private transporter: Transporter | null = null;

  constructor(
    private readonly config: ConfigService<Env, true>,
    private readonly settings: SettingsService,
  ) {
    this.driver = this.config.get('MAIL_DRIVER', { infer: true });
    this.from = this.config.get('MAIL_FROM', { infer: true });
    this.webAppUrl = this.config
      .get('WEB_APP_URL', { infer: true })
      .replace(/\/$/, '');

    if (this.driver === 'smtp') {
      const host = this.config.get('SMTP_HOST', { infer: true });
      const user = this.config.get('SMTP_USER', { infer: true });
      const pass = this.config.get('SMTP_PASS', { infer: true });
      if (!host) {
        throw new Error('MAIL_DRIVER=smtp requires SMTP_HOST');
      }
      this.transporter = nodemailer.createTransport({
        host,
        port: this.config.get('SMTP_PORT', { infer: true }),
        secure: this.config.get('SMTP_SECURE', { infer: true }),
        auth: user ? { user, pass } : undefined,
      });
      this.logger.log(`Mail driver=smtp host=${host}`);
    } else {
      this.logger.log('Mail driver=log (emails printed to logger)');
    }
  }

  async send(payload: MailPayload): Promise<void> {
    if (this.driver === 'log' || !this.transporter) {
      this.logger.log(
        `MAIL to=${payload.to} subject=${payload.subject}\n${payload.text}`,
      );
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html ?? `<pre>${escapeHtml(payload.text)}</pre>`,
      });
    } catch (err) {
      this.logger.error(`Failed to send mail to ${payload.to}`, err as Error);
    }
  }

  orderUrl(orderId: string) {
    return `${this.webAppUrl}/account/orders/${orderId}`;
  }

  resetPasswordUrl(token: string) {
    return `${this.webAppUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;
  }

  async sendOrderCreated(to: string, order: OrderEntity) {
    const url = this.orderUrl(order.id);
    await this.send({
      to,
      subject: `ثبت سفارش ${shortId(order.id)}`,
      text: [
        'سفارش شما ثبت شد و در انتظار پرداخت است.',
        `مبلغ: ${await this.formatAmount(order.total)}`,
        `پیگیری: ${url}`,
      ].join('\n'),
    });
  }

  async sendOrderPaid(to: string, order: OrderEntity) {
    const url = this.orderUrl(order.id);
    await this.send({
      to,
      subject: `پرداخت موفق سفارش ${shortId(order.id)}`,
      text: [
        'پرداخت سفارش شما با موفقیت انجام شد.',
        `مبلغ: ${await this.formatAmount(order.total)}`,
        order.paymentRefId ? `کد پیگیری پرداخت: ${order.paymentRefId}` : '',
        `جزئیات: ${url}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }

  async sendOrderShipped(to: string, order: OrderEntity) {
    const url = this.orderUrl(order.id);
    await this.send({
      to,
      subject: `ارسال سفارش ${shortId(order.id)}`,
      text: [
        'سفارش شما ارسال شد.',
        order.trackingCode
          ? `کد رهگیری ارسال: ${order.trackingCode}`
          : 'کد رهگیری به‌زودی اعلام می‌شود.',
        order.shippingMethodName
          ? `روش ارسال: ${order.shippingMethodName}`
          : '',
        `جزئیات: ${url}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }

  async sendPasswordReset(to: string, token: string) {
    const url = this.resetPasswordUrl(token);
    await this.send({
      to,
      subject: 'بازیابی رمز عبور',
      text: [
        'برای تنظیم رمز جدید روی لینک زیر کلیک کنید (۱ ساعت اعتبار):',
        url,
        '',
        'اگر این درخواست از سمت شما نبود، این پیام را نادیده بگیرید.',
      ].join('\n'),
    });
  }

  private async formatAmount(amountRial: number) {
    const { currencyDisplayUnit } = await this.settings.get();
    return formatMoney(amountRial, currencyDisplayUnit);
  }
}

function shortId(id: string) {
  return id.slice(0, 8);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
