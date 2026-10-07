export type AnalyticsPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: AnalyticsPayload) => void
    }
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function useAnalytics() {
  const config = useRuntimeConfig()

  const enabled = computed(
    () =>
      Boolean(config.public.umamiHost && config.public.umamiWebsiteId)
      || Boolean(config.public.ga4Id),
  )

  function track(event: string, payload: AnalyticsPayload = {}) {
    if (!import.meta.client || !enabled.value) {
      return
    }

    const clean = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    ) as AnalyticsPayload

    try {
      window.umami?.track(event, clean)
    } catch {
      // ignore tracker errors
    }

    try {
      window.gtag?.('event', event, clean)
    } catch {
      // ignore tracker errors
    }
  }

  function pageview(path: string, title?: string) {
    if (!import.meta.client || !enabled.value) {
      return
    }

    try {
      window.umami?.track('pageview', { path, title })
    } catch {
      // ignore
    }

    try {
      window.gtag?.('event', 'page_view', {
        page_path: path,
        page_title: title,
      })
    } catch {
      // ignore
    }
  }

  return { enabled, track, pageview }
}
