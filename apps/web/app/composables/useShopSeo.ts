import { toAbsoluteUrl, truncateMeta } from '~/utils/site-url'

export type ShopSeoInput = {
  title?: string | null
  description?: string | null
  path?: string | null
  image?: string | null
  /** Open Graph type — default website */
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>> | null
}

/**
 * Standard storefront SEO: title, description, canonical, OG/Twitter, JSON-LD.
 * Pass path like `/products/foo` (leading slash).
 */
export function useShopSeo(input: MaybeRefOrGetter<ShopSeoInput>) {
  const siteUrl = useSiteUrl()
  const settings = useStoreSettingsState()
  const route = useRoute()

  const resolved = computed(() => {
    const value = toValue(input)
    const shop = settings.value.shopName || 'فروشگاه'
    const title = (value.title || shop).trim() || shop
    const description = truncateMeta(
      value.description?.trim()
        || settings.value.metaDescription?.trim()
        || `خرید آنلاین از ${shop}`,
      160,
    )
    const path = value.path ?? route.path
    const canonical = toAbsoluteUrl(siteUrl, path) || siteUrl
    const image =
      toAbsoluteUrl(siteUrl, value.image)
      || toAbsoluteUrl(siteUrl, settings.value.defaultOgImage)
      || toAbsoluteUrl(siteUrl, settings.value.logoUrl)

    return {
      title,
      description,
      canonical,
      image,
      type: value.type ?? 'website',
      noindex: Boolean(value.noindex),
      jsonLd: value.jsonLd ?? null,
    }
  })

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogType: () => resolved.value.type,
    ogUrl: () => resolved.value.canonical,
    ogLocale: 'fa_IR',
    ogImage: () => resolved.value.image,
    twitterCard: 'summary_large_image',
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => resolved.value.image,
    robots: () =>
      resolved.value.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead(() => {
    const scripts: Array<{ type: string; children: string }> = []
    const jsonLd = resolved.value.jsonLd
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      for (const block of blocks) {
        scripts.push({
          type: 'application/ld+json',
          children: JSON.stringify(block),
        })
      }
    }
    return {
      link: [
        {
          rel: 'canonical',
          href: resolved.value.canonical,
        },
      ],
      script: scripts,
    }
  })

  return { siteUrl, resolved }
}
