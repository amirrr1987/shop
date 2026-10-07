import { breadcrumbJsonLd, webPageJsonLd } from '~/utils/json-ld'

type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage'

/**
 * Title/description/canonical + Home › Page breadcrumb + WebPage JSON-LD.
 */
export function useStaticPageSeo(input: MaybeRefOrGetter<{
  title: string
  description: string
  path: string
  type?: WebPageType
  extraJsonLd?: Record<string, unknown> | Array<Record<string, unknown>> | null
}>) {
  const siteUrl = useSiteUrl()

  useShopSeo(() => {
    const value = toValue(input)
    const crumbs = breadcrumbJsonLd(siteUrl, [
      { name: 'خانه', path: '/' },
      { name: value.title, path: value.path },
    ])
    const page = webPageJsonLd({
      siteUrl,
      name: value.title,
      description: value.description,
      path: value.path,
      type: value.type,
    })
    const extra = value.extraJsonLd
    const extraBlocks = extra
      ? Array.isArray(extra)
        ? extra
        : [extra]
      : []
    return {
      title: value.title,
      description: value.description,
      path: value.path,
      jsonLd: [crumbs, page, ...extraBlocks],
    }
  })
}
