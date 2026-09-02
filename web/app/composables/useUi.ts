import { storeToRefs } from 'pinia'
import { useUiStore } from '~/stores/ui.store'

export function useUi() {
  const store = useUiStore()
  const { cartOpen, wishlistOpen, searchCategory } = storeToRefs(store)
  const { openCart, closeCart, openWishlist, closeWishlist } = store
  return {
    cartOpen,
    wishlistOpen,
    searchCategory,
    openCart,
    closeCart,
    openWishlist,
    closeWishlist
  }
}
