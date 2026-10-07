import type { Product } from '@shop/shared'

export type RecentProduct = {
  productId: string
  name: string
  slug: string
  price: number
  image: string | null
  isFeatured: boolean
  viewedAt: number
}

const STORAGE_KEY = 'shop-recently-viewed'
const MAX_ITEMS = 12

export function useRecentlyViewed() {
  const items = useState<RecentProduct[]>('recently-viewed-items', () => [])

  const count = computed(() => items.value.length)

  function persist() {
    if (!import.meta.client) {
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function hydrate() {
    if (!import.meta.client) {
      return
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as RecentProduct[]
      if (Array.isArray(parsed)) {
        items.value = parsed.slice(0, MAX_ITEMS)
      }
    } catch {
      items.value = []
    }
  }

  function track(product: Product) {
    if (!import.meta.client) {
      return
    }
    if (!items.value.length) {
      hydrate()
    }
    const next: RecentProduct = {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] ?? null,
      isFeatured: product.isFeatured,
      viewedAt: Date.now(),
    }
    items.value = [
      next,
      ...items.value.filter((item) => item.productId !== product.id),
    ].slice(0, MAX_ITEMS)
    persist()
  }

  function remove(productId: string) {
    items.value = items.value.filter((item) => item.productId !== productId)
    persist()
  }

  function clear() {
    items.value = []
    persist()
  }

  function others(excludeProductId?: string) {
    if (!excludeProductId) {
      return items.value
    }
    return items.value.filter((item) => item.productId !== excludeProductId)
  }

  return {
    items,
    count,
    hydrate,
    track,
    remove,
    clear,
    others,
  }
}
