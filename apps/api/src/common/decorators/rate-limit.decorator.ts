import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate_limit';

export type RateLimitOptions = {
  /** Max requests inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  ttlMs: number;
};

export const RateLimit = (limit: number, ttlMs = 60_000) =>
  SetMetadata(RATE_LIMIT_KEY, { limit, ttlMs } satisfies RateLimitOptions);
