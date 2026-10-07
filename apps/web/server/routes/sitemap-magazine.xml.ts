import { fetchMagazine, renderUrlSet, siteOrigin } from '../utils/sitemap'

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event)
  const upstream = getUpstreamBase()
  let entries: Array<{ loc: string; lastmod?: string; changefreq: 'weekly' }> =
    []
  try {
    const posts = await fetchMagazine(upstream)
    entries = posts.map((post) => ({
      loc: `${origin}/mag/${post.slug}`,
      lastmod: post.updatedAt || post.publishedAt || undefined,
      changefreq: 'weekly' as const,
    }))
  } catch {
    // ignore
  }
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderUrlSet(entries)
})
