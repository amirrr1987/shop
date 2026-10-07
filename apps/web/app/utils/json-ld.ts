import { toAbsoluteUrl } from '~/utils/site-url'

export function breadcrumbJsonLd(
  siteUrl: string,
  items: Array<{ name: string; path?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: toAbsoluteUrl(siteUrl, item.path) }
        : {}),
    })),
  }
}

export function organizationJsonLd(input: {
  siteUrl: string
  name: string
  logoUrl?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
}) {
  const logo = toAbsoluteUrl(input.siteUrl, input.logoUrl)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: input.name,
    url: input.siteUrl,
    ...(logo ? { logo } : {}),
    ...(input.email ? { email: input.email } : {}),
    ...(input.phone ? { telephone: input.phone } : {}),
    ...(input.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: input.address,
            addressCountry: 'IR',
          },
        }
      : {}),
  }
}

/** Brick-and-mortar / storefront signal when address or phone is set. */
export function localBusinessJsonLd(input: {
  siteUrl: string
  name: string
  logoUrl?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  branches?: Array<{
    name: string
    address: string
    phone?: string
  }>
}) {
  const logo = toAbsoluteUrl(input.siteUrl, input.logoUrl)
  const departments = (input.branches ?? [])
    .filter((b) => b.name && b.address)
    .map((branch) => ({
      '@type': 'LocalBusiness' as const,
      name: branch.name,
      address: {
        '@type': 'PostalAddress' as const,
        streetAddress: branch.address,
        addressCountry: 'IR',
      },
      ...(branch.phone ? { telephone: branch.phone } : {}),
    }))

  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: input.name,
    url: input.siteUrl,
    ...(logo ? { logo, image: logo } : {}),
    ...(input.email ? { email: input.email } : {}),
    ...(input.phone ? { telephone: input.phone } : {}),
    ...(input.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: input.address,
            addressCountry: 'IR',
          },
        }
      : {}),
    ...(departments.length ? { department: departments } : {}),
    areaServed: {
      '@type': 'Country',
      name: 'IR',
    },
  }
}

export function faqPageJsonLd(
  items: Array<{ label: string; content: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.label,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.content,
      },
    })),
  }
}

export function websiteJsonLd(siteUrl: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: siteUrl,
    inLanguage: 'fa-IR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function productJsonLd(input: {
  siteUrl: string
  name: string
  description: string
  path: string
  images: string[]
  price: number
  currency?: string
  inStock: boolean
  brandName?: string | null
  sku?: string | null
  /** Active variants — drives AggregateOffer when more than one priced option. */
  variants?: Array<{
    price: number | null
    stock: number
    isActive: boolean
  }>
  aggregateRating?: { ratingValue: number; reviewCount: number } | null
}) {
  const images = input.images
    .map((img) => toAbsoluteUrl(input.siteUrl, img))
    .filter((img): img is string => Boolean(img))
  const currency = input.currency ?? 'IRR'
  const url = toAbsoluteUrl(input.siteUrl, input.path)
  const activeVariants = (input.variants ?? []).filter((v) => v.isActive)
  const variantPrices = activeVariants.map((v) =>
    v.price != null ? v.price : input.price,
  )
  const anyVariantInStock = activeVariants.some((v) => v.stock > 0)
  const offers =
    variantPrices.length > 1
      ? {
          '@type': 'AggregateOffer' as const,
          url,
          priceCurrency: currency,
          lowPrice: Math.min(...variantPrices),
          highPrice: Math.max(...variantPrices),
          offerCount: variantPrices.length,
          availability: anyVariantInStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        }
      : {
          '@type': 'Offer' as const,
          url,
          priceCurrency: currency,
          price:
            variantPrices.length === 1 ? variantPrices[0]! : input.price,
          availability: (
            variantPrices.length === 1 ? anyVariantInStock : input.inStock
          )
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url,
    inLanguage: 'fa-IR',
    ...(images.length ? { image: images } : {}),
    ...(input.sku ? { sku: input.sku } : {}),
    ...(input.brandName
      ? { brand: { '@type': 'Brand', name: input.brandName } }
      : {}),
    offers,
    ...(input.aggregateRating && input.aggregateRating.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: input.aggregateRating.ratingValue,
            reviewCount: input.aggregateRating.reviewCount,
          },
        }
      : {}),
  }
}

/** Category / brand hub listing for Google. */
export function collectionPageJsonLd(input: {
  siteUrl: string
  name: string
  path: string
  description?: string | null
  items: Array<{ name: string; path: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    url: toAbsoluteUrl(input.siteUrl, input.path),
    inLanguage: 'fa-IR',
    ...(input.description ? { description: input.description } : {}),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: toAbsoluteUrl(input.siteUrl, item.path),
        name: item.name,
      })),
    },
  }
}

export function webPageJsonLd(input: {
  siteUrl: string
  name: string
  description: string
  path: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'WebPage',
    name: input.name,
    description: input.description,
    url: toAbsoluteUrl(input.siteUrl, input.path),
    inLanguage: 'fa-IR',
    isPartOf: {
      '@type': 'WebSite',
      url: input.siteUrl,
    },
  }
}

export function howToJsonLd(input: {
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    inLanguage: 'fa-IR',
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export function articleJsonLd(input: {
  siteUrl: string
  title: string
  description: string
  path: string
  image?: string | null
  datePublished?: string | null
  dateModified?: string | null
  publisherName: string
  publisherLogo?: string | null
}) {
  const image = toAbsoluteUrl(input.siteUrl, input.image)
  const logo = toAbsoluteUrl(input.siteUrl, input.publisherLogo)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: toAbsoluteUrl(input.siteUrl, input.path),
    inLanguage: 'fa-IR',
    ...(image ? { image } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    publisher: {
      '@type': 'Organization',
      name: input.publisherName,
      ...(logo ? { logo: { '@type': 'ImageObject', url: logo } } : {}),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(input.siteUrl, input.path),
    },
  }
}
