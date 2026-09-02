import type { ICartItem } from '~/models/cart.model'

export interface ICheckoutForm {
  firstName: string
  lastName: string
  company: string
  country: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  notes: string
  createAccount: boolean
  shipDifferent: boolean
  payment: string
  shipping: string
  coupon: string
}

export interface ILastOrder {
  items: ICartItem[]
  total: number
  orderId: string
}

export function createDefaultCheckoutForm(): ICheckoutForm {
  return {
    firstName: '',
    lastName: '',
    company: '',
    country: 'IR',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    createAccount: false,
    shipDifferent: false,
    payment: 'online',
    shipping: 'express',
    coupon: ''
  }
}
