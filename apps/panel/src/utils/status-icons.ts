import type { Component } from 'vue'
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  RollbackOutlined,
  SmileOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import type { OrderStatus, PaymentStatus } from '@shop/shared'

export const ORDER_STATUS_ICON: Record<OrderStatus, Component> = {
  pending: ClockCircleOutlined,
  paid: WalletOutlined,
  shipped: CarOutlined,
  delivered: SmileOutlined,
  cancelled: CloseCircleOutlined,
}

export const PAYMENT_STATUS_ICON: Record<PaymentStatus, Component> = {
  pending: ClockCircleOutlined,
  paid: CheckCircleOutlined,
  failed: CloseCircleOutlined,
  refunded: RollbackOutlined,
}
