import {
  absolutizeUpload,
  fetchAllProducts,
  fetchMagazine,
  renderUrlSet,
  siteOrigin,
} from '../utils/sitemap'

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event)
  const upstream = getUpstreamBase()
  const entries: Array<{
    loc: string
    lastmod?: string
    images: string[]
  }> = []

  try {
    const products = await fetchAllProducts(upstream)
    for (const product of products) {
      const images = (product.images ?? [])
        .map((img) => absolutizeUpload(origin, img))
        .filter((img): img is string => Boolean(img))
      if (!images.length) continue
      entries.push({
        loc: `${origin}/products/${product.slug}`,
        lastmod: product.updatedAt,
        images,
      })
    }
  } catch {
    // ignore
  }

  try {
    const posts = await fetchMagazine(upstream)
    for (const post of posts) {
      const cover = absolutizeUpload(origin, post.coverImage || post.ogImage)
      if (!cover) continue
      entries.push({
        loc: `${origin}/mag/${post.slug}`,
        lastmod: post.updatedAt || post.publishedAt || undefined,
        images: [cover],
      })
    }
  } catch {
    // ignore
  }

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderUrlSet(entries)
})
