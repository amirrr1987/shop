import { defineStore } from 'pinia'
import type { IProduct } from '~/models/product.model'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = useLocalStorage<IProduct[]>(STORAGE_KEYS.wishlist, [], ssrSafeStorage)

  const count = computed(() => items.value.length)

  function toggle(product: IProduct) {
    const index = items.value.findIndex(item => item.id === product.id)
    if (index >= 0) {
      items.value.splice(index, 1)
      useToast().add({
        title: 'از علاقه‌مندی‌ها حذف شد',
        icon: 'i-lucide-heart-off',
        color: 'neutral'
      })
    } else {
      items.value.push(product)
      useToast().add({
        title: 'به علاقه‌مندی‌ها اضافه شد',
        icon: 'i-lucide-heart',
        color: 'success'
      })
    }
  }

  function has(productId: string) {
    return items.value.some(item => item.id === productId)
  }

  function remove(productId: string) {
    items.value = items.value.filter(item => item.id !== productId)
  }

  return { items, count, toggle, has, remove }
})
