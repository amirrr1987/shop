import { siteOrigin } from '../utils/sitemap'

export default defineEventHandler((event) => {
  const site = siteOrigin(event)
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /account',
    'Disallow: /account/',
    'Disallow: /checkout',
    'Disallow: /checkout/',
    'Disallow: /cart',
    'Disallow: /wishlist',
    'Disallow: /compare',
    'Disallow: /recent',
    'Disallow: /auth/',
    'Disallow: /api/',
    `Sitemap: ${site}/sitemap.xml`,
    '',
  ].join('\n')
})
