import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Address, OrderStatus, PaymentStatus } from '@shop/shared';
import { bigintToNumber } from '../common/database/numeric.transformer.js';
import { OrderItemEntity } from './order-item.entity.js';

@Entity('orders')
@Index('IDX_orders_user_id', ['userId'])
@Index('UQ_orders_payment_authority', ['paymentAuthority'], {
  unique: true,
  where: '"payment_authority" IS NOT NULL',
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Null for guest checkout orders. */
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;

  @Column({ name: 'guest_email', type: 'varchar', length: 255, nullable: true })
  guestEmail!: string | null;

  @Column({ name: 'guest_phone', type: 'varchar', length: 15, nullable: true })
  guestPhone!: string | null;

  /** Secret for guest order/payment access; never listed in admin payloads. */
  @Column({ name: 'guest_token', type: 'varchar', length: 64, nullable: true })
  guestToken!: string | null;

  @Column({ type: 'varchar', default: 'pending' })
  status!: OrderStatus;

  @Column({ name: 'payment_status', type: 'varchar', default: 'pending' })
  paymentStatus!: PaymentStatus;

  /** All money on an order is stored in rials. */
  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  subtotal!: number;

  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  discount!: number;

  @Column({
    name: 'loyalty_discount',
    type: 'bigint',
    default: 0,
    transformer: bigintToNumber,
  })
  loyaltyDiscount!: number;

  @Column({ name: 'loyalty_points_redeemed', type: 'int', default: 0 })
  loyaltyPointsRedeemed!: number;

  @Column({ name: 'loyalty_points_earned', type: 'int', default: 0 })
  loyaltyPointsEarned!: number;

  @Column({ name: 'coupon_code', type: 'varchar', length: 32, nullable: true })
  couponCode!: string | null;

  @Column({ name: 'shipping_method_id', type: 'uuid', nullable: true })
  shippingMethodId!: string | null;

  @Column({ name: 'shipping_method_name', type: 'varchar', length: 80, nullable: true })
  shippingMethodName!: string | null;

  @Column({
    name: 'shipping_cost',
    type: 'bigint',
    default: 0,
    transformer: bigintToNumber,
  })
  shippingCost!: number;

  @Column({
    name: 'tax_amount',
    type: 'bigint',
    default: 0,
    transformer: bigintToNumber,
  })
  taxAmount!: number;

  @Column({
    name: 'refunded_amount',
    type: 'bigint',
    default: 0,
    transformer: bigintToNumber,
  })
  refundedAmount!: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note!: string | null;

  /** Staff-only note; never exposed on customer order payloads. */
  @Column({ name: 'admin_note', type: 'varchar', length: 2000, nullable: true })
  adminNote!: string | null;

  @Column({ name: 'tracking_code', type: 'varchar', length: 80, nullable: true })
  trackingCode!: string | null;

  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  total!: number;

  @Column({ name: 'payment_authority', type: 'varchar', nullable: true })
  paymentAuthority!: string | null;

  @Column({ name: 'payment_ref_id', type: 'varchar', nullable: true })
  paymentRefId!: string | null;

  @Column({ type: 'jsonb' })
  address!: Address;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
