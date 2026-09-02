import { storeToRefs } from 'pinia'
import { useWishlistStore } from '~/stores/wishlist.store'

export function useWishlist() {
  const store = useWishlistStore()
  const { items, count } = storeToRefs(store)
  const { toggle, has, remove } = store
  return { items, count, toggle, has, remove }
}
