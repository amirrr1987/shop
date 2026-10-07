import type {
  PaymentProvider,
  PaymentTxStatus,
  PaymentTxType,
} from '@shop/shared';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { bigintToNumber } from '../common/database/numeric.transformer.js';

@Entity('payment_transactions')
@Index('IDX_payment_transactions_order_id', ['orderId'])
@Index('IDX_payment_transactions_authority', ['authority'])
export class PaymentTransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;

  @Column({ type: 'varchar', length: 16 })
  provider!: PaymentProvider;

  @Column({ type: 'varchar', length: 16 })
  type!: PaymentTxType;

  @Column({ type: 'varchar', length: 16, default: 'pending' })
  status!: PaymentTxStatus;

  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  amount!: number;

  @Column({ type: 'varchar', length: 80, nullable: true })
  authority!: string | null;

  @Column({ name: 'ref_id', type: 'varchar', length: 80, nullable: true })
  refId!: string | null;

  @Column({ name: 'provider_code', type: 'varchar', length: 32, nullable: true })
  providerCode!: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  reason!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  meta!: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
