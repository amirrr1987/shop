export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  price: number
  oldPrice?: number
  currency: string
  image: string
  hoverImage?: string
  rating: number
  badges?: Array<'new' | 'sale' | 'hot'>
  inStock: boolean
  description?: string
  sizes?: string[]
  colors?: string[]
  images?: string[]
  longDescription?: string
  specs?: Array<{ label: string, value: string }>
  features?: string[]
  variants?: Array<{
    id: string
    label: string
    price: number
    options: Record<string, string>
  }>
  groupItems?: string[]
  affiliateUrl?: string
  reviewCount?: number
}

export type ProductType = 'simple' | 'variable' | 'group' | 'affiliate'
export type ProductGallery = 'default' | 'left' | 'right' | 'slider'
export type ProductSticky = 'none' | 'left' | 'right'

export type ShopView = 'grid' | 'list'
export type ShopColumns = '3' | '4'
export type ShopSidebar = 'none' | 'left' | 'right'
export type ShopSort = 'new' | 'az' | 'za' | 'price-asc' | 'price-desc' | 'best' | 'sale'

export interface Category {
  id: string
  slug: string
  name: string
  image: string
  links: Array<{ label: string, to: string }>
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface SlideItem {
  id: string
  subtitle: string
  title: string
  highlight: string
  image: string
  to: string
}

export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface PromoBanner {
  id: string
  image: string
  to: string
  alt: string
}
