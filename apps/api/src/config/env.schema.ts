import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // 3001 is in Windows Hyper-V excluded range 3005–3104
  PORT: z.coerce.number().int().positive().default(4001),

  DATABASE_HOST: z.string().min(1).default('localhost'),
  DATABASE_PORT: z.coerce.number().int().positive().default(5432),
  DATABASE_USER: z.string().min(1).default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_NAME: z.string().min(1).default('shop'),

  JWT_SECRET: z.string().min(16),
  /** Short-lived access JWT (cookie + Bearer). */
  JWT_EXPIRES_IN: z.string().default('15m'),
  /** Opaque refresh token lifetime (httpOnly cookie). */
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  COOKIE_SECRET: z.string().min(16).optional(),
  UPLOAD_DIR: z.string().min(1).default('uploads'),

  /** local disk (dev) or s3-compatible (MinIO / AWS / CDN origin). */
  STORAGE_DRIVER: z.enum(['local', 's3']).default('local'),
  S3_ENDPOINT: z.string().optional().default(''),
  S3_REGION: z.string().default('us-east-1'),
  S3_BUCKET: z.string().optional().default('shop'),
  S3_ACCESS_KEY_ID: z.string().optional().default(''),
  S3_SECRET_ACCESS_KEY: z.string().optional().default(''),
  /** Public base URL for objects, e.g. https://cdn.example.com or http://localhost:9000/shop */
  S3_PUBLIC_URL: z.string().optional().default(''),
  S3_FORCE_PATH_STYLE: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .default('true')
    .transform((value) =>
      typeof value === 'boolean' ? value : value === 'true',
    ),

  /**
   * TypeORM schema sync. Default: on outside production.
   * Keep false in staging/prod; use migrations instead.
   */
  TYPEORM_SYNCHRONIZE: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return typeof value === 'boolean' ? value : value === 'true';
    }),

  /** Run pending migrations on API boot (recommended in staging/prod). */
  TYPEORM_RUN_MIGRATIONS: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return typeof value === 'boolean' ? value : value === 'true';
    }),

  /** Comma-separated browser origins allowed for CORS (credentials). */
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:4000,http://localhost:5600')
    .transform((value) =>
      value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),

  /** When unset: enabled outside production. */
  SWAGGER_ENABLED: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return typeof value === 'boolean' ? value : value === 'true';
    }),

  /** mock = local fake gateway; zarinpal = real/sandbox Zarinpal */
  PAYMENT_PROVIDER: z.enum(['mock', 'zarinpal']).default('mock'),
  ZARINPAL_MERCHANT_ID: z.string().optional().default(''),
  ZARINPAL_SANDBOX: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .default('true')
    .transform((value) =>
      typeof value === 'boolean' ? value : value === 'true',
    ),
  /**
   * Gateway return / IPN hit (API). Zarinpal redirects here with Authority+Status.
   * Server verifies, then redirects the browser to PAYMENT_RETURN_URL.
   */
  PAYMENT_CALLBACK_URL: z
    .string()
    .url()
    .default('http://localhost:4001/payments/callback'),

  /** Final browser page after server-side verify (Nuxt checkout callback). */
  PAYMENT_RETURN_URL: z
    .string()
    .url()
    .default('http://localhost:4000/checkout/callback'),

  /**
   * Auto-cancel pending unpaid orders after this many minutes (restores stock).
   * Set 0 to disable.
   */
  ORDER_UNPAID_TTL_MINUTES: z.coerce.number().int().min(0).default(120),

  /** Password used when seeding a new admin user. */
  ADMIN_SEED_PASSWORD: z.string().min(8).default('password123'),

  /** Optional Sentry DSN; empty = disabled. */
  SENTRY_DSN: z.string().optional().default(''),
  SENTRY_ENVIRONMENT: z.string().optional(),
  SENTRY_RELEASE: z.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.coerce.number().min(0).max(1).default(0.1),

  /** json | pretty — default json in production. */
  LOG_FORMAT: z.enum(['json', 'pretty']).optional(),

  /** log = print to logger; smtp = nodemailer */
  MAIL_DRIVER: z.enum(['log', 'smtp']).default('log'),
  MAIL_FROM: z.string().default('Shop <noreply@shop.local>'),
  SMTP_HOST: z.string().optional().default(''),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .default('false')
    .transform((value) =>
      typeof value === 'boolean' ? value : value === 'true',
    ),
  SMTP_USER: z.string().optional().default(''),
  SMTP_PASS: z.string().optional().default(''),
  /** Public storefront URL for email links. */
  WEB_APP_URL: z.string().url().default('http://localhost:4000'),

  /** log = print OTP to API logger (dev); later providers can be added. */
  SMS_DRIVER: z.enum(['log']).default('log'),
  /** OTP validity in seconds. */
  OTP_TTL_SECONDS: z.coerce.number().int().min(60).max(900).default(300),

  /** Catalog/settings cache. When Redis is down, falls back to in-memory. */
  REDIS_ENABLED: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .default('true')
    .transform((value) =>
      typeof value === 'boolean' ? value : value === 'true',
    ),
  REDIS_URL: z.string().default('redis://127.0.0.1:6379'),
}).superRefine((env, ctx) => {
  if (env.PAYMENT_PROVIDER === 'zarinpal' && !env.ZARINPAL_MERCHANT_ID.trim()) {
    ctx.addIssue({
      code: 'custom',
      path: ['ZARINPAL_MERCHANT_ID'],
      message:
        'وقتی PAYMENT_PROVIDER=zarinpal است، ZARINPAL_MERCHANT_ID الزامی است',
    });
  }
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}
