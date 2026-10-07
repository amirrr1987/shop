import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { bigintToNumber } from '../common/database/numeric.transformer.js';

@Entity('shipping_methods')
export class ShippingMethodEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 80 })
  name!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description!: string | null;

  /** Rials. */
  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  price!: number;

  @Column({ name: 'estimated_days', type: 'int', default: 3 })
  estimatedDays!: number;

  @Column({
    name: 'free_above',
    type: 'bigint',
    nullable: true,
    transformer: bigintToNumber,
  })
  freeAbove!: number | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
