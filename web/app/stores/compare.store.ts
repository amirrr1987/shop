import { defineStore } from 'pinia'
import type { IProduct } from '~/models/product.model'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useCompareStore = defineStore('compare', () => {
  const items = useLocalStorage<IProduct[]>(STORAGE_KEYS.compare, [], ssrSafeStorage)
  const maxItems = 4

  const count = computed(() => items.value.length)

  function toggle(product: IProduct) {
    const index = items.value.findIndex(item => item.id === product.id)
    if (index >= 0) {
      items.value.splice(index, 1)
      useToast().add({
        title: 'از مقایسه حذف شد',
        icon: 'i-lucide-git-compare',
        color: 'neutral'
      })
    } else if (items.value.length >= maxItems) {
      useToast().add({
        title: 'حداکثر ۴ محصول',
        description: 'برای افزودن، یکی از محصولات را حذف کنید',
        icon: 'i-lucide-alert-circle',
        color: 'warning'
      })
    } else {
      items.value.push(product)
      useToast().add({
        title: 'به مقایسه اضافه شد',
        icon: 'i-lucide-git-compare',
        color: 'success'
      })
    }
  }

  function has(productId: string) {
    return items.value.some(item => item.id === productId)
  }

  function remove(productId: string) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index < 0) return
    items.value.splice(index, 1)
    useToast().add({
      title: 'از مقایسه حذف شد',
      icon: 'i-lucide-git-compare',
      color: 'neutral'
    })
  }

  function clear() {
    items.value = []
  }

  return { items, count, maxItems, toggle, has, remove, clear }
})
