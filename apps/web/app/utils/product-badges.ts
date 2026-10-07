import type { Product } from '@shop/shared'
import { productDisplayPrice } from './product-price'

export type ProductCardBadge = {
  key: 'sale' | 'new' | 'hot'
  label: string
  color: 'error' | 'success' | 'warning'
}

const NEW_WINDOW_MS = 14 * 24 * 60 * 60 * 1000
const HOT_VIEW_THRESHOLD = 25

export function productCardBadges(product: Product): ProductCardBadge[] {
  const badges: ProductCardBadge[] = []
  const pricing = productDisplayPrice(product)

  if (pricing.onSale) {
    badges.push({ key: 'sale', label: 'تخفیف', color: 'error' })
  }

  const updatedAt = Date.parse(product.updatedAt)
  if (Number.isFinite(updatedAt) && Date.now() - updatedAt <= NEW_WINDOW_MS) {
    badges.push({ key: 'new', label: 'جدید', color: 'success' })
  }

  if (product.viewCount >= HOT_VIEW_THRESHOLD) {
    badges.push({ key: 'hot', label: 'داغ', color: 'warning' })
  }

  return badges
}
