import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart.store'

export function useCart() {
  const store = useCartStore()
  const { items, totalItems, totalPrice } = storeToRefs(store)
  const { add, remove, updateQuantity, clear } = store
  return { items, totalItems, totalPrice, add, remove, updateQuantity, clear }
}
