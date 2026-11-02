import { normalizeSiteUrl } from '~/utils/site-url'

/**
 * Canonical site origin. Prefer NUXT_PUBLIC_SITE_URL in production.
 * Falls back to request origin (SSR) or window (client).
 */
export function useSiteUrl(): string {
  const config = useRuntimeConfig()
  const configured = String(config.public.siteUrl || '').trim()
  if (configured) {
    return normalizeSiteUrl(configured)
  }

  if (import.meta.server) {
    try {
      const event = useRequestEvent()
      if (event) {
        return normalizeSiteUrl(getRequestURL(event).origin)
      }
    } catch {
      // ignore
    }
  }

  if (import.meta.client && typeof window !== 'undefined') {
    return normalizeSiteUrl(window.location.origin)
  }

  return 'http://localhost:4000'
}
