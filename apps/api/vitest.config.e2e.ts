import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    fileParallelism: false,
    hookTimeout: 60_000,
    testTimeout: 60_000,
    env: {
      NODE_ENV: 'test',
      JWT_SECRET: 'test-jwt-secret-key',
      COOKIE_SECRET: 'test-cookie-secret',
      DATABASE_HOST: 'localhost',
      DATABASE_PORT: '5432',
      DATABASE_USER: 'postgres',
      DATABASE_PASSWORD: 'postgres',
      DATABASE_NAME: 'shop_test',
      TYPEORM_SYNCHRONIZE: 'true',
      TYPEORM_RUN_MIGRATIONS: 'false',
      PAYMENT_PROVIDER: 'mock',
      PAYMENT_CALLBACK_URL: 'http://localhost:3001/payments/callback',
      PAYMENT_RETURN_URL: 'http://localhost:3000/checkout/callback',
      ORDER_UNPAID_TTL_MINUTES: '0',
      MAIL_DRIVER: 'log',
      WEB_APP_URL: 'http://localhost:3000',
      CORS_ORIGINS: 'http://localhost:3000',
      SENTRY_DSN: '',
    },
  },
});
