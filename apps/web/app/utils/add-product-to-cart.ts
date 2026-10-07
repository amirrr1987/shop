import type { Product } from '@shop/shared'

type ToastLike = {
  add: (input: {
    title: string
    description?: string
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'primary' | 'secondary' | 'info'
  }) => void
}

/**
 * Shared add-to-cart for cards / list / quick view.
 * Returns `'pdp'` when the shopper should open the product page (variants).
 */
export function addProductToCart(
  product: Product,
  options: {
    add: (product: Product, quantity?: number) => void
    toast: ToastLike
    quantity?: number
  },
): 'ok' | 'pdp' | 'blocked' {
  const quantity = options.quantity ?? 1

  if (product.priceMode === 'call') {
    options.toast.add({
      title: 'خرید آنلاین ممکن نیست',
      description: 'برای این کالا با پشتیبانی تماس بگیرید.',
      color: 'warning',
    })
    return 'blocked'
  }

  if ((product.variants?.length ?? 0) > 0) {
    return 'pdp'
  }

  if (product.stock < 1) {
    options.toast.add({
      title: 'ناموجود',
      color: 'error',
    })
    return 'blocked'
  }

  try {
    options.add(product, quantity)
    options.toast.add({
      title: 'به سبد اضافه شد',
      description: product.name,
      color: 'success',
    })
    return 'ok'
  } catch {
    options.toast.add({
      title: 'افزودن به سبد ممکن نشد',
      color: 'error',
    })
    return 'blocked'
  }
}
