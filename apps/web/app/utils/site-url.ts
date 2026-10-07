/** Strip trailing slash from absolute origin. */
export function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, '')
}

/**
 * Resolve absolute URL for SEO (canonical, OG, JSON-LD).
 * Relative paths like `/uploads/x` become `${site}${path}`.
 */
export function toAbsoluteUrl(
  siteUrl: string,
  pathOrUrl: string | null | undefined,
): string | undefined {
  if (!pathOrUrl?.trim()) {
    return undefined
  }
  const value = pathOrUrl.trim()
  if (/^https?:\/\//i.test(value)) {
    return value
  }
  const path = value.startsWith('/') ? value : `/${value}`
  return `${normalizeSiteUrl(siteUrl)}${path}`
}

export function truncateMeta(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= max) {
    return cleaned
  }
  return `${cleaned.slice(0, max - 1).trimEnd()}…`
}
