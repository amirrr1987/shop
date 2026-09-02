import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useUiStore = defineStore('ui', () => {
  const cartOpen = useSessionStorage('rozer-ui-cart-open', false, ssrSafeStorage)
  const wishlistOpen = useSessionStorage('rozer-ui-wishlist-open', false, ssrSafeStorage)
  const searchCategory = useLocalStorage(STORAGE_KEYS.searchCategory, 'all', ssrSafeStorage)

  function openCart() {
    cartOpen.value = true
  }

  function closeCart() {
    cartOpen.value = false
  }

  function openWishlist() {
    wishlistOpen.value = true
  }

  function closeWishlist() {
    wishlistOpen.value = false
  }

  return {
    cartOpen,
    wishlistOpen,
    searchCategory,
    openCart,
    closeCart,
    openWishlist,
    closeWishlist
  }
})
