import { defineStore } from 'pinia'
import type { ICartItem } from '~/models/cart.model'
import { createDefaultCheckoutForm, type ICheckoutForm, type ILastOrder } from '~/models/checkout.model'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useCheckoutStore = defineStore('checkout', () => {
  const form = useLocalStorage<ICheckoutForm>(STORAGE_KEYS.checkoutForm, createDefaultCheckoutForm(), ssrSafeStorage)
  const lastOrder = useSessionStorage<ILastOrder | null>(STORAGE_KEYS.lastOrder, null, ssrSafeStorage)

  function placeOrder(items: ICartItem[], total: number) {
    const orderId = `RZ-${Date.now().toString().slice(-6)}`
    lastOrder.value = { items: [...items], total, orderId }
    return orderId
  }

  function resetForm() {
    form.value = createDefaultCheckoutForm()
  }

  return { form, lastOrder, placeOrder, resetForm }
})
