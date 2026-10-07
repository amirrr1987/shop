import type { Product } from '@shop/shared'
import { isSaleActive, resolveUnitPrice } from '@shop/shared'

export function productDisplayPrice(product: Product) {
  const resolved = resolveUnitPrice({
    price: product.price,
    priceMode: product.priceMode,
    salePrice: product.salePrice,
    saleEndsAt: product.saleEndsAt,
  })

  if (!resolved.ok) {
    return {
      mode: 'call' as const,
      price: null as number | null,
      compareAt: null as number | null,
      onSale: false,
      endsAt: null as string | null,
    }
  }

  const onSale = isSaleActive(
    product.salePrice,
    product.saleEndsAt,
    product.price,
  )

  return {
    mode: 'fixed' as const,
    price: resolved.unitPrice,
    compareAt: onSale ? product.price : null,
    onSale,
    endsAt: onSale ? product.saleEndsAt : null,
  }
}

export function saleCountdownLabel(endsAt: string | null | undefined): string {
  if (!endsAt) return ''
  const ms = Date.parse(endsAt) - Date.now()
  if (!Number.isFinite(ms) || ms <= 0) return 'پایان یافته'
  const totalMin = Math.floor(ms / 60_000)
  const days = Math.floor(totalMin / (60 * 24))
  const hours = Math.floor((totalMin % (60 * 24)) / 60)
  const mins = totalMin % 60
  if (days > 0) return `${days} روز و ${hours} ساعت`
  if (hours > 0) return `${hours} ساعت و ${mins} دقیقه`
  return `${Math.max(1, mins)} دقیقه`
}
