import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '~/stores/checkout.store'

export type { ICheckoutForm as CheckoutForm } from '~/models/checkout.model'

export function useCheckout() {
  const store = useCheckoutStore()
  const { form, lastOrder } = storeToRefs(store)
  const { placeOrder, resetForm } = store
  return { form, lastOrder, placeOrder, resetForm }
}
