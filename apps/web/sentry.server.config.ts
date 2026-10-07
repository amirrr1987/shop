import * as Sentry from '@sentry/nuxt'

const dsn = process.env.NUXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
if (dsn) {
  Sentry.init({
    dsn,
    environment:
      process.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT ||
      process.env.NODE_ENV ||
      'development',
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
    sendDefaultPii: false,
  })
}
