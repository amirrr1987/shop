import type { OrderStatus, PaymentStatus } from '@shop/shared'

type UiColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'neutral'

export const ORDER_STATUS_COLOR: Record<OrderStatus, UiColor> = {
  pending: 'warning',
  paid: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
}

export const PAYMENT_STATUS_COLOR: Record<PaymentStatus, UiColor> = {
  pending: 'warning',
  paid: 'success',
  failed: 'error',
  refunded: 'secondary',
}

export function orderStatusColor(status: OrderStatus): UiColor {
  return ORDER_STATUS_COLOR[status] ?? 'neutral'
}

export function paymentStatusColor(status: PaymentStatus): UiColor {
  return PAYMENT_STATUS_COLOR[status] ?? 'neutral'
}
