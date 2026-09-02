import * as Sentry from '@sentry/nuxt'

const config = useRuntimeConfig()

Sentry.init({
  dsn: config.public.sentry.dsn || undefined,
  enabled: Boolean(config.public.sentry.dsn),
  environment: config.public.sentry.environment,
  tracesSampleRate: config.public.sentry.tracesSampleRate
})
