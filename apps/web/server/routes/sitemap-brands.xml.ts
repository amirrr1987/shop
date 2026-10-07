import { fetchBrands, renderUrlSet, siteOrigin } from '../utils/sitemap'

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event)
  const upstream = getUpstreamBase()
  let entries: Array<{ loc: string; lastmod?: string; changefreq: 'weekly' }> =
    []
  try {
    const brands = await fetchBrands(upstream)
    entries = brands.map((brand) => ({
      loc: `${origin}/brands/${brand.slug}`,
      lastmod: brand.updatedAt,
      changefreq: 'weekly' as const,
    }))
  } catch {
    // ignore
  }
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderUrlSet(entries)
})
