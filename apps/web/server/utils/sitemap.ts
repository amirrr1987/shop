import type { Brand, Category, MagazinePublicList, Product } from '@shop/shared'

export type SitemapEntry = {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  images?: string[]
}

export function siteOrigin(event: Parameters<typeof getRequestURL>[0]): string {
  const config = useRuntimeConfig(event)
  const configured = String(config.public.siteUrl || '').trim()
  if (configured) {
    return configured.replace(/\/+$/, '')
  }
  return getRequestURL(event).origin
}

export function renderUrlSet(entries: SitemapEntry[]): string {
  const withImages = entries.some((entry) => entry.images?.length)
  const ns = withImages
    ? ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
  const body = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `<lastmod>${entry.lastmod.slice(0, 10)}</lastmod>`
        : ''
      const changefreq = entry.changefreq
        ? `<changefreq>${entry.changefreq}</changefreq>`
        : ''
      const images = (entry.images ?? [])
        .slice(0, 10)
        .map(
          (img) =>
            `<image:image><image:loc>${escapeXml(img)}</image:loc></image:image>`,
        )
        .join('')
      return `<url><loc>${escapeXml(entry.loc)}</loc>${lastmod}${changefreq}${images}</url>`
    })
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset${ns}>${body}</urlset>`
}

export function renderSitemapIndex(locs: string[]): string {
  const body = locs
    .map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`)
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function fetchAllProducts(
  upstream: string,
): Promise<Array<Pick<Product, 'slug' | 'updatedAt' | 'images' | 'name'>>> {
  const items: Array<
    Pick<Product, 'slug' | 'updatedAt' | 'images' | 'name'>
  > = []
  let page = 1
  const perPage = 100
  for (;;) {
    const batch = await $fetch<{
      items: Array<Pick<Product, 'slug' | 'updatedAt' | 'images' | 'name'>>
      total: number
    }>(`${upstream}/products`, {
      query: { page, perPage, sort: 'newest' },
    })
    items.push(...(batch.items ?? []))
    if (!batch.items?.length || items.length >= (batch.total ?? 0)) {
      break
    }
    page += 1
    if (page > 200) break
  }
  return items
}

export function absolutizeUpload(
  origin: string,
  pathOrUrl: string | null | undefined,
): string | undefined {
  if (!pathOrUrl?.trim()) return undefined
  const value = pathOrUrl.trim()
  if (/^https?:\/\//i.test(value)) return value
  const path = value.startsWith('/') ? value : `/${value}`
  return `${origin.replace(/\/+$/, '')}${path}`
}

export async function fetchCategories(upstream: string): Promise<Category[]> {
  return $fetch<Category[]>(`${upstream}/categories`)
}

export async function fetchBrands(upstream: string): Promise<Brand[]> {
  return $fetch<Brand[]>(`${upstream}/brands`)
}

export async function fetchMagazine(
  upstream: string,
): Promise<MagazinePublicList['items']> {
  const items: MagazinePublicList['items'] = []
  let page = 1
  const perPage = 100
  for (;;) {
    const batch = await $fetch<MagazinePublicList>(`${upstream}/magazine`, {
      query: { page, perPage },
    })
    items.push(...(batch.items ?? []))
    if (!batch.items?.length || items.length >= (batch.total ?? 0)) {
      break
    }
    page += 1
    if (page > 50) break
  }
  return items
}
