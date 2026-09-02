import type { IProduct } from '~/models/product.model'

export interface ICartItem {
  product: IProduct
  quantity: number
}
