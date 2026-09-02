import { defineStore } from 'pinia'
import type { ICartItem } from '~/models/cart.model'
import type { IProduct } from '~/models/product.model'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<ICartItem[]>(STORAGE_KEYS.cart, [], ssrSafeStorage)

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function add(product: IProduct, quantity = 1) {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
    useToast().add({
      title: 'به سبد خرید اضافه شد',
      description: product.name,
      icon: 'i-lucide-shopping-cart',
      color: 'success'
    })
  }

  function remove(productId: string) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(entry => entry.product.id === productId)
    if (!item) return
    if (quantity <= 0) {
      remove(productId)
    } else {
      item.quantity = quantity
    }
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    add,
    remove,
    updateQuantity,
    clear
  }
})
