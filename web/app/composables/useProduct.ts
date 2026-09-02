import { storeToRefs } from 'pinia'
import { useProductStore } from '~/stores/product.store'

export function useProduct() {
  const store = useProductStore()
  const { catalog, recentlyViewed, recentlyViewedProducts } = storeToRefs(store)
  const { getBySlug, getByCategory, trackView, formatPrice } = store
  return {
    catalog,
    recentlyViewed,
    recentlyViewedProducts,
    getBySlug,
    getByCategory,
    trackView,
    formatPrice
  }
}
