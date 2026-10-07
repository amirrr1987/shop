import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type LoyaltyLedgerReason =
  | 'earn'
  | 'redeem'
  | 'release'
  | 'clawback'
  | 'adjust';

@Entity('loyalty_ledger')
export class LoyaltyLedgerEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('IDX_loyalty_ledger_user_id')
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Index('IDX_loyalty_ledger_order_id')
  @Column({ name: 'order_id', type: 'uuid', nullable: true })
  orderId!: string | null;

  @Column({ type: 'int' })
  delta!: number;

  @Column({ name: 'balance_after', type: 'int' })
  balanceAfter!: number;

  @Column({ type: 'varchar', length: 32 })
  reason!: LoyaltyLedgerReason;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
