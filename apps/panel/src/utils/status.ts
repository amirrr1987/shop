import type {
  ContactStatus,
  OrderStatus,
  PaymentStatus,
  ReviewStatus,
  UserRole,
} from '@shop/shared'

export type AntTagColor =
  | 'success'
  | 'processing'
  | 'error'
  | 'default'
  | 'warning'
  | 'blue'
  | 'cyan'
  | 'geekblue'
  | 'gold'
  | 'green'
  | 'magenta'
  | 'orange'
  | 'purple'
  | 'red'
  | 'volcano'

export const ORDER_STATUS_COLOR: Record<OrderStatus, AntTagColor> = {
  pending: 'gold',
  paid: 'blue',
  shipped: 'cyan',
  delivered: 'success',
  cancelled: 'error',
}

export const PAYMENT_STATUS_COLOR: Record<PaymentStatus, AntTagColor> = {
  pending: 'warning',
  paid: 'success',
  failed: 'error',
  refunded: 'purple',
}

export const ROLE_COLOR: Record<UserRole, AntTagColor> = {
  owner: 'purple',
  admin: 'geekblue',
  editor: 'blue',
  viewer: 'cyan',
  customer: 'green',
}

export const REVIEW_STATUS_COLOR: Record<ReviewStatus, AntTagColor> = {
  pending: 'gold',
  approved: 'success',
  rejected: 'error',
}

export const CONTACT_STATUS_COLOR: Record<ContactStatus, AntTagColor> = {
  new: 'gold',
  read: 'blue',
  archived: 'default',
}

const LOW_STOCK_THRESHOLD = 5

export function stockTag(stock: number): { color: AntTagColor; label: string } {
  if (stock < 1) return { color: 'error', label: 'ناموجود' }
  if (stock <= LOW_STOCK_THRESHOLD) return { color: 'warning', label: 'کم' }
  return { color: 'success', label: 'موجود' }
}

export { LOW_STOCK_THRESHOLD }
