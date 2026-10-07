import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { CouponType } from '@shop/shared';
import { bigintToNumber } from '../common/database/numeric.transformer.js';

@Entity('coupons')
export class CouponEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 32 })
  code!: string;

  @Column({ type: 'varchar', length: 16 })
  type!: CouponType;

  /** A percentage when `type` is 'percent', otherwise an amount in rials. */
  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  value!: number;

  /** Rials. */
  @Column({
    name: 'min_order_amount',
    type: 'bigint',
    default: 0,
    transformer: bigintToNumber,
  })
  minOrderAmount!: number;

  @Column({ name: 'max_uses', type: 'int', nullable: true })
  maxUses!: number | null;

  @Column({ name: 'used_count', type: 'int', default: 0 })
  usedCount!: number;

  @Column({ name: 'starts_at', type: 'timestamptz', nullable: true })
  startsAt!: Date | null;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'is_automatic', type: 'boolean', default: false })
  isAutomatic!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
