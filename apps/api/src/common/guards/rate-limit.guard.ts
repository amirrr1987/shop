import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import {
  RATE_LIMIT_KEY,
  type RateLimitOptions,
} from '../decorators/rate-limit.decorator.js';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly hits = new Map<string, number[]>();

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.getAllAndOverride<RateLimitOptions | undefined>(
      RATE_LIMIT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const ip =
      request.ip ||
      request.socket.remoteAddress ||
      request.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
      'unknown';
    const route = `${request.method}:${request.route?.path ?? request.path}`;
    const key = `${ip}:${route}`;
    const now = Date.now();
    const windowStart = now - options.ttlMs;

    const recent = (this.hits.get(key) ?? []).filter((ts) => ts > windowStart);
    if (recent.length >= options.limit) {
      this.hits.set(key, recent);
      throw new HttpException(
        'تعداد درخواست‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    recent.push(now);
    this.hits.set(key, recent);

    // Occasional cleanup to avoid unbounded growth.
    if (this.hits.size > 5_000) {
      for (const [entryKey, stamps] of this.hits) {
        const kept = stamps.filter((ts) => ts > windowStart);
        if (kept.length) {
          this.hits.set(entryKey, kept);
        } else {
          this.hits.delete(entryKey);
        }
      }
    }

    return true;
  }
}
