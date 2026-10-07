import {
  fetchAllProducts,
  renderUrlSet,
  siteOrigin,
} from '../utils/sitemap'

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event)
  const upstream = getUpstreamBase()
  let entries: Array<{ loc: string; lastmod?: string; changefreq: 'daily' }> =
    []
  try {
    const products = await fetchAllProducts(upstream)
    entries = products.map((product) => ({
      loc: `${origin}/products/${product.slug}`,
      lastmod: product.updatedAt,
      changefreq: 'daily' as const,
    }))
  } catch {
    // empty set if API down
  }
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderUrlSet(entries)
})
