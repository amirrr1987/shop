import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  ChangePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateProfileInput,
} from '@shop/shared';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'node:crypto';
import type { Request, Response } from 'express';
import { IsNull, type Repository } from 'typeorm';
import type { Env } from '../config/env.schema.js';
import { MailService } from '../mail/mail.service.js';
import type { User } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import {
  AUTH_CLIENT_HEADER,
  accessCookieName,
  refreshCookieName,
  resolveAuthClient,
  type AuthClient,
} from './auth.constants.js';
import { PasswordResetTokenEntity } from './password-reset-token.entity.js';
import { RefreshTokenEntity } from './refresh-token.entity.js';
import type { JwtPayload } from './strategies/jwt.strategy.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<Env, true>,
    private readonly mailService: MailService,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokens: Repository<RefreshTokenEntity>,
    @InjectRepository(PasswordResetTokenEntity)
    private readonly resetTokens: Repository<PasswordResetTokenEntity>,
  ) {}

  async register(input: RegisterInput, req: Request, res: Response) {
    const email = input.email.toLowerCase();
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('این ایمیل قبلاً ثبت شده است');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.usersService.create({
      email,
      passwordHash,
      fullName: input.fullName,
    });

    return this.issueSession(user, req, res);
  }

  async login(input: LoginInput, req: Request, res: Response) {
    const email = input.email.toLowerCase();
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('ایمیل یا رمز عبور نادرست است');
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('ایمیل یا رمز عبور نادرست است');
    }

    if (user.isActive === false) {
      throw new UnauthorizedException('حساب کاربری غیرفعال است');
    }

    return this.issueSession(user, req, res);
  }

  async refresh(req: Request, res: Response) {
    const client = this.clientFrom(req);
    const raw = this.readRefreshToken(req, client);
    if (!raw) {
      throw new UnauthorizedException('نشست منقضی شده است');
    }

    const row = await this.refreshTokens.findOne({
      where: { tokenHash: hashToken(raw), revokedAt: IsNull() },
    });
    if (!row || row.expiresAt.getTime() <= Date.now()) {
      this.clearAuthCookies(res, client);
      throw new UnauthorizedException('نشست منقضی شده است');
    }

    const user = await this.usersService.findById(row.userId);
    if (!user || user.isActive === false) {
      row.revokedAt = new Date();
      await this.refreshTokens.save(row);
      this.clearAuthCookies(res, client);
      throw new UnauthorizedException('نشست نامعتبر است');
    }

    // Rotate: revoke old refresh before issuing a new pair.
    row.revokedAt = new Date();
    await this.refreshTokens.save(row);

    return this.issueSession(user, req, res);
  }

  async logout(req: Request, res: Response) {
    const client = this.clientFrom(req);
    const raw = this.readRefreshToken(req, client);
    if (raw) {
      const row = await this.refreshTokens.findOne({
        where: { tokenHash: hashToken(raw), revokedAt: IsNull() },
      });
      if (row) {
        row.revokedAt = new Date();
        await this.refreshTokens.save(row);
      }
    }

    this.clearAuthCookies(res, client);
    return { ok: true as const };
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await this.usersService.updateFullName(
      userId,
      input.fullName,
    );
    if (!user) {
      throw new UnauthorizedException('نشست نامعتبر است');
    }
    return { user: this.usersService.toPublicUser(user) };
  }

  async changePassword(userId: string, input: ChangePasswordInput) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('نشست نامعتبر است');
    }

    const valid = await bcrypt.compare(
      input.currentPassword,
      user.passwordHash,
    );
    if (!valid) {
      throw new BadRequestException('رمز فعلی نادرست است');
    }

    if (input.currentPassword === input.newPassword) {
      throw new BadRequestException('رمز جدید باید با رمز فعلی متفاوت باشد');
    }

    const passwordHash = await bcrypt.hash(input.newPassword, 10);
    await this.usersService.updatePasswordHash(user.id, passwordHash);
    await this.revokeRefreshTokens(user.id);

    return { ok: true as const };
  }

  /**
   * Always returns the same shape to avoid email enumeration.
   */
  async forgotPassword(input: ForgotPasswordInput) {
    const email = input.email.toLowerCase();
    const user = await this.usersService.findByEmail(email);
    if (user) {
      await this.resetTokens
        .createQueryBuilder()
        .update(PasswordResetTokenEntity)
        .set({ usedAt: () => 'NOW()' })
        .where('user_id = :userId', { userId: user.id })
        .andWhere('used_at IS NULL')
        .execute();

      const raw = randomBytes(32).toString('base64url');
      await this.resetTokens.save(
        this.resetTokens.create({
          userId: user.id,
          tokenHash: hashToken(raw),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
          usedAt: null,
        }),
      );
      await this.mailService.sendPasswordReset(user.email, raw);
    }

    return {
      ok: true as const,
      message: 'اگر این ایمیل ثبت شده باشد، لینک بازیابی ارسال شد',
    };
  }

  async resetPassword(input: ResetPasswordInput) {
    const row = await this.resetTokens.findOne({
      where: { tokenHash: hashToken(input.token), usedAt: IsNull() },
    });
    if (!row || row.expiresAt.getTime() <= Date.now()) {
      throw new BadRequestException('لینک بازیابی نامعتبر یا منقضی است');
    }

    const user = await this.usersService.findById(row.userId);
    if (!user) {
      throw new BadRequestException('لینک بازیابی نامعتبر است');
    }

    const passwordHash = await bcrypt.hash(input.newPassword, 10);
    await this.usersService.updatePasswordHash(user.id, passwordHash);
    row.usedAt = new Date();
    await this.resetTokens.save(row);
    await this.revokeRefreshTokens(user.id);

    return { ok: true as const, message: 'رمز عبور با موفقیت تغییر کرد' };
  }

  private async revokeRefreshTokens(userId: string) {
    await this.refreshTokens
      .createQueryBuilder()
      .update(RefreshTokenEntity)
      .set({ revokedAt: () => 'NOW()' })
      .where('user_id = :userId', { userId })
      .andWhere('revoked_at IS NULL')
      .execute();
  }

  private async issueSession(user: User, req: Request, res: Response) {
    const client = this.clientFrom(req);
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const expiresIn = this.config.get('JWT_EXPIRES_IN', { infer: true });
    const refreshExpiresIn = this.config.get('JWT_REFRESH_EXPIRES_IN', {
      infer: true,
    });

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: expiresIn as `${number}m`,
    });

    const refreshRaw = randomBytes(32).toString('base64url');
    const refreshMs = expiresInToMs(refreshExpiresIn);
    await this.refreshTokens.save(
      this.refreshTokens.create({
        userId: user.id,
        tokenHash: hashToken(refreshRaw),
        expiresAt: new Date(Date.now() + refreshMs),
        revokedAt: null,
      }),
    );

    const cookieBase = this.cookieOptions();
    res.cookie(accessCookieName(client), accessToken, {
      ...cookieBase,
      maxAge: expiresInToMs(expiresIn),
    });
    res.cookie(refreshCookieName(client), refreshRaw, {
      ...cookieBase,
      maxAge: refreshMs,
    });

    return {
      user: this.usersService.toPublicUser(user),
      accessToken,
    };
  }

  private clientFrom(req: Request): AuthClient {
    return resolveAuthClient(req.headers[AUTH_CLIENT_HEADER]);
  }

  private readRefreshToken(req: Request, client: AuthClient): string | null {
    const fromCookie = req.cookies?.[refreshCookieName(client)];
    if (typeof fromCookie === 'string' && fromCookie.length > 0) {
      return fromCookie;
    }
    return null;
  }

  private clearAuthCookies(res: Response, client: AuthClient) {
    const base = this.cookieOptions();
    res.clearCookie(accessCookieName(client), base);
    res.clearCookie(refreshCookieName(client), base);
  }

  private cookieOptions() {
    const isProd =
      this.config.get('NODE_ENV', { infer: true }) === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      path: '/',
    };
  }
}

function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

function expiresInToMs(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) {
    return 15 * 60 * 1000;
  }

  const amount = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return amount * 1000;
    case 'm':
      return amount * 60 * 1000;
    case 'h':
      return amount * 60 * 60 * 1000;
    case 'd':
      return amount * 24 * 60 * 60 * 1000;
    default:
      return 15 * 60 * 1000;
  }
}
