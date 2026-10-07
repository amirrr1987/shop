import * as Sentry from '@sentry/nuxt'

const dsn = import.meta.env.NUXT_PUBLIC_SENTRY_DSN
if (dsn) {
  Sentry.init({
    dsn,
    environment:
      import.meta.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT ||
      import.meta.env.MODE ||
      'development',
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
  })
}
