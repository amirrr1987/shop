import {
  fetchCategories,
  renderUrlSet,
  siteOrigin,
} from '../utils/sitemap'

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event)
  const upstream = getUpstreamBase()
  let entries: Array<{ loc: string; lastmod?: string; changefreq: 'weekly' }> =
    []
  try {
    const categories = await fetchCategories(upstream)
    entries = categories.map((category) => ({
      loc: `${origin}/categories/${category.slug}`,
      lastmod: category.updatedAt,
      changefreq: 'weekly' as const,
    }))
  } catch {
    // ignore
  }
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderUrlSet(entries)
})
