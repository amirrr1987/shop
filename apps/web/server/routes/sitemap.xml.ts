import { renderSitemapIndex, siteOrigin } from '../utils/sitemap'

export default defineEventHandler((event) => {
  const origin = siteOrigin(event)
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return renderSitemapIndex([
    `${origin}/sitemap-pages.xml`,
    `${origin}/sitemap-products.xml`,
    `${origin}/sitemap-categories.xml`,
    `${origin}/sitemap-brands.xml`,
    `${origin}/sitemap-magazine.xml`,
    `${origin}/sitemap-images.xml`,
  ])
})
