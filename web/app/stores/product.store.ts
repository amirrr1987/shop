import { defineStore } from 'pinia'
import type { IProduct } from '~/models/product.model'
import { products as mockProducts, getProductBySlug as findBySlug, formatPrice as formatProductPrice } from '~/data/products'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useProductStore = defineStore('product', () => {
  const catalog = shallowRef(mockProducts)
  const recentlyViewed = useSessionStorage<string[]>(STORAGE_KEYS.recentlyViewed, [], ssrSafeStorage)

  const recentlyViewedProducts = computed(() =>
    recentlyViewed.value
      .map(slug => findBySlug(slug))
      .filter((product): product is IProduct => !!product)
  )

  function getBySlug(slug: string) {
    return findBySlug(slug)
  }

  function getByCategory(category: string) {
    return catalog.value.filter(product => product.category === category)
  }

  function trackView(product: IProduct) {
    const next = [product.slug, ...recentlyViewed.value.filter(slug => slug !== product.slug)]
    recentlyViewed.value = next.slice(0, 8)
  }

  function formatPrice(price: number, currency = 'IRT') {
    return formatProductPrice(price, currency)
  }

  return {
    catalog,
    recentlyViewed,
    recentlyViewedProducts,
    getBySlug,
    getByCategory,
    trackView,
    formatPrice
  }
})
