export type HomeHeroSlide = {
  id: string
  subtitle: string
  title: string
  highlight?: string
  ctaLabel: string
  to: string
  image?: string | null
}

export type HomePromoBanner = {
  id: string
  title: string
  subtitle: string
  to: string
  image?: string | null
  alt: string
}
