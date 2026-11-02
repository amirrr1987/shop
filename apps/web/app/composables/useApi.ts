type ApiOptions = Parameters<typeof $fetch>[1] & { _retry?: boolean }

/** Merge Nest Set-Cookie into the Cookie header used for the rest of this SSR request. */
function applySetCookies(
  current: string | undefined,
  setCookies: string[],
): string {
  const map = new Map<string, string>()
  if (current) {
    for (const part of current.split(';')) {
      const trimmed = part.trim()
      if (!trimmed) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      map.set(trimmed.slice(0, eq), trimmed.slice(eq + 1))
    }
  }

  for (const sc of setCookies) {
    const first = sc.split(';')[0]?.trim()
    if (!first) continue
    const eq = first.indexOf('=')
    if (eq === -1) continue
    const name = first.slice(0, eq)
    const value = first.slice(eq + 1)
    const cleared =
      value === '' ||
      /(?:^|;\s*)Max-Age=0(?:;|$)/i.test(sc) ||
      /(?:^|;\s*)Expires=Thu, 01 Jan 1970/i.test(sc)
    if (cleared) {
      map.delete(name)
    } else {
      map.set(name, value)
    }
  }

  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join('; ')
}

function readSetCookies(headers: Headers): string[] {
  const anyHeaders = headers as Headers & { getSetCookie?: () => string[] }
  if (typeof anyHeaders.getSetCookie === 'function') {
    return anyHeaders.getSetCookie()
  }
  const single = headers.get('set-cookie')
  return single ? [single] : []
}

export function useApi() {
  const config = useRuntimeConfig()

  /**
   * Browser: same-origin `/api` (routeRules → Nest) so httpOnly cookies stick to the web host.
   * SSR: call Nest directly — avoids a brittle Nitro self-proxy hop that was 500ing.
   */
  const baseURL = import.meta.server
    ? String(config.apiProxy || 'http://127.0.0.1:4001').replace(/\/$/, '')
    : (config.public.apiBase as string)

  // Per-request jar (must not be module-scoped — concurrent SSR).
  let cookieHeader = import.meta.server
    ? useRequestHeaders(['cookie']).cookie
    : undefined
  let refreshPromise: Promise<boolean> | null = null

  const raw = $fetch.create({
    baseURL,
    credentials: 'include',
    headers: {
      'X-Shop-Client': 'web',
    },
    onRequest({ options }) {
      if (!import.meta.server || !cookieHeader) return
      const headers = new Headers(options.headers as HeadersInit)
      headers.set('cookie', cookieHeader)
      headers.set('X-Shop-Client', 'web')
      options.headers = headers
    },
  })

  function forwardSetCookiesToClient(setCookies: string[]) {
    if (!import.meta.server || !setCookies.length) return
    const event = useRequestEvent()
    if (!event) return
    for (const cookie of setCookies) {
      appendResponseHeader(event, 'set-cookie', cookie)
    }
    cookieHeader = applySetCookies(cookieHeader, setCookies)
  }

  async function tryRefresh(): Promise<boolean> {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const res = await raw.raw('/auth/refresh', { method: 'POST' })
          forwardSetCookiesToClient(readSetCookies(res.headers))
          return true
        } catch {
          return false
        } finally {
          refreshPromise = null
        }
      })()
    }
    return refreshPromise
  }

  async function api<T = unknown>(
    url: string,
    opts: ApiOptions = {},
  ): Promise<T> {
    try {
      return await raw<T>(url, opts)
    } catch (error: unknown) {
      const status =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof (error as { status: unknown }).status === 'number'
          ? (error as { status: number }).status
          : 0

      const skip =
        opts._retry ||
        url.includes('/auth/login') ||
        url.includes('/auth/register') ||
        url.includes('/auth/refresh')

      if (status === 401 && !skip) {
        const ok = await tryRefresh()
        if (ok) {
          return api<T>(url, { ...opts, _retry: true })
        }
      }

      throw error
    }
  }

  return api
}
