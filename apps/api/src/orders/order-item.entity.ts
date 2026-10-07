import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { bigintToNumber } from '../common/database/numeric.transformer.js';
import type { OrderEntity } from './order.entity.js';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string;

  /** String target avoids ESM circular init with OrderEntity. */
  @ManyToOne('OrderEntity', (order: OrderEntity) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order!: Relation<OrderEntity>;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  variantId!: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  sku!: string | null;

  @Column({ name: 'variant_label', type: 'varchar', length: 120, nullable: true })
  variantLabel!: string | null;

  @Column()
  name!: string;

  /** Rials. */
  @Column({
    name: 'unit_price',
    type: 'bigint',
    default: 0,
    transformer: bigintToNumber,
  })
  unitPrice!: number;

  @Column({ type: 'int' })
  quantity!: number;
}
