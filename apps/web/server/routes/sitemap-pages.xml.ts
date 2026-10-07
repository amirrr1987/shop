import { renderUrlSet, siteOrigin } from '../utils/sitemap'

const STATIC_PAGES = [
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/returns',
  '/faq',
  '/shipping',
] as const

const CATALOG_PAGES = ['/', '/products', '/categories', '/brands', '/mag'] as const

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event)
  const upstream = getUpstreamBase()

  let catalogLastmod: string | undefined
  try {
    // Newest product update ≈ catalog freshness (avoid full product crawl).
    const batch = await $fetch<{
      items: Array<{ updatedAt?: string }>
    }>(`${upstream}/products`, {
      query: { page: 1, perPage: 1, sort: 'newest' },
    })
    catalogLastmod = batch.items?.[0]?.updatedAt
  } catch {
    // keep pages without lastmod if API down
  }

  const entries = [
    ...CATALOG_PAGES.map((path) => ({
      loc: path === '/' ? origin : `${origin}${path}`,
      lastmod: catalogLastmod,
      changefreq: (path === '/' || path === '/products' ? 'daily' : 'weekly') as
        | 'daily'
        | 'weekly',
    })),
    ...STATIC_PAGES.map((path) => ({
      loc: `${origin}${path}`,
      changefreq: 'monthly' as const,
    })),
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderUrlSet(entries)
})
