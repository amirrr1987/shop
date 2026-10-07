import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  SendOtpInput,
  SendOtpResult,
  VerifyOtpInput,
  VerifyOtpResult,
} from '@shop/shared';
import { createHash, randomBytes, randomInt } from 'node:crypto';
import { IsNull, MoreThan, type Repository } from 'typeorm';
import type { Env } from '../config/env.schema.js';
import { OtpChallengeEntity } from './otp-challenge.entity.js';

const MAX_ATTEMPTS = 5;
const SESSION_TTL_SEC = 15 * 60;

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    @InjectRepository(OtpChallengeEntity)
    private readonly challenges: Repository<OtpChallengeEntity>,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async send(input: SendOtpInput): Promise<SendOtpResult> {
    const ttl = this.config.get('OTP_TTL_SECONDS', { infer: true });
    const recent = await this.challenges.count({
      where: {
        phone: input.phone,
        purpose: input.purpose,
        createdAt: MoreThan(new Date(Date.now() - 60_000)),
      },
    });
    if (recent >= 3) {
      throw new HttpException(
        'ارسال کد زیاد تکرار شده؛ یک دقیقه صبر کنید',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.challenges
      .createQueryBuilder()
      .delete()
      .where('phone = :phone', { phone: input.phone })
      .andWhere('purpose = :purpose', { purpose: input.purpose })
      .andWhere('consumed_at IS NULL')
      .execute();

    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    const expiresAt = new Date(Date.now() + ttl * 1000);
    await this.challenges.save(
      this.challenges.create({
        phone: input.phone,
        purpose: input.purpose,
        codeHash: this.hash(input.phone, code),
        sessionTokenHash: null,
        attempts: 0,
        expiresAt,
        verifiedAt: null,
        consumedAt: null,
      }),
    );

    await this.dispatchSms(input.phone, code);

    const driver = this.config.get('SMS_DRIVER', { infer: true });
    return {
      ok: true,
      expiresInSec: ttl,
      ...(driver === 'log' ? { debugCode: code } : {}),
    };
  }

  async verify(input: VerifyOtpInput): Promise<VerifyOtpResult> {
    const row = await this.challenges.findOne({
      where: {
        phone: input.phone,
        purpose: input.purpose,
        consumedAt: IsNull(),
      },
      order: { createdAt: 'DESC' },
    });

    if (!row || row.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException('کد منقضی شده یا یافت نشد؛ دوباره ارسال کنید');
    }
    if (row.verifiedAt && row.sessionTokenHash) {
      throw new BadRequestException('این کد قبلاً تایید شده؛ دوباره ارسال کنید');
    }
    if (row.attempts >= MAX_ATTEMPTS) {
      throw new HttpException(
        'تعداد تلاش بیش از حد؛ کد جدید درخواست کنید',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    row.attempts += 1;
    if (row.codeHash !== this.hash(input.phone, input.code)) {
      await this.challenges.save(row);
      throw new BadRequestException('کد نادرست است');
    }

    const token = randomBytes(24).toString('hex');
    row.sessionTokenHash = this.hashToken(token);
    row.verifiedAt = new Date();
    row.expiresAt = new Date(Date.now() + SESSION_TTL_SEC * 1000);
    await this.challenges.save(row);

    return { token, expiresInSec: SESSION_TTL_SEC };
  }

  /** Consume a verified guest-checkout OTP session (once). */
  async consumeGuestCheckout(phone: string, token: string): Promise<void> {
    const row = await this.challenges.findOne({
      where: {
        phone,
        purpose: 'guest_checkout',
        sessionTokenHash: this.hashToken(token),
        consumedAt: IsNull(),
      },
      order: { createdAt: 'DESC' },
    });

    if (!row?.verifiedAt || row.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException(
        'تایید موبایل معتبر نیست؛ کد را دوباره بگیرید',
      );
    }

    row.consumedAt = new Date();
    await this.challenges.save(row);
  }

  private hash(phone: string, code: string) {
    const secret = this.config.get('JWT_SECRET', { infer: true });
    return createHash('sha256')
      .update(`${secret}:otp:${phone}:${code}`)
      .digest('hex');
  }

  private hashToken(token: string) {
    const secret = this.config.get('JWT_SECRET', { infer: true });
    return createHash('sha256')
      .update(`${secret}:otp-session:${token}`)
      .digest('hex');
  }

  private async dispatchSms(phone: string, code: string) {
    const driver = this.config.get('SMS_DRIVER', { infer: true });
    if (driver === 'log') {
      this.logger.log(`SMS OTP → ${phone}: ${code}`);
      return;
    }
    throw new BadRequestException('ارسال پیامک پیکربندی نشده است');
  }
}
