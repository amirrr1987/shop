/** Nest origin for Nitro-only routes (sitemap). */
export function getUpstreamBase(): string {
  const config = useRuntimeConfig()
  const base = (config.apiProxy as string) || 'http://127.0.0.1:3001'
  return base.replace(/\/$/, '')
}
