import type { OrderStatus, PaymentStatus } from '@shop/shared'
import {
  ORDER_STATUS_LABELS_FA,
  PAYMENT_STATUS_LABELS_FA,
} from '@shop/shared'

export function orderStatusLabel(status: OrderStatus) {
  return ORDER_STATUS_LABELS_FA[status] ?? status
}

export function paymentStatusLabel(status: PaymentStatus) {
  return PAYMENT_STATUS_LABELS_FA[status] ?? status
}
