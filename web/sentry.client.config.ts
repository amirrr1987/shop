import * as Sentry from '@sentry/nuxt'

const config = useRuntimeConfig()
const hasDsn = Boolean(config.public.sentry.dsn)

Sentry.init({
  dsn: config.public.sentry.dsn || undefined,
  enabled: hasDsn,
  environment: config.public.sentry.environment,
  tracesSampleRate: config.public.sentry.tracesSampleRate
})
