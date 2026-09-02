import * as Sentry from '@sentry/nuxt'

export function useMonitoring() {
  const config = useRuntimeConfig()

  const isEnabled = computed(() => Boolean(config.public.sentry.dsn))

  function captureError(error: unknown, context?: Record<string, unknown>) {
    if (!isEnabled.value) {
      console.error(error, context)
      return
    }

    if (context) {
      Sentry.withScope((scope) => {
        for (const [key, value] of Object.entries(context)) {
          scope.setExtra(key, value)
        }
        Sentry.captureException(error)
      })
      return
    }

    Sentry.captureException(error)
  }

  function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
    if (!isEnabled.value) return
    Sentry.captureMessage(message, level)
  }

  function setUser(user: { id: string, email?: string, username?: string } | null) {
    if (!isEnabled.value) return
    Sentry.setUser(user)
  }

  return {
    isEnabled,
    captureError,
    captureMessage,
    setUser
  }
}
