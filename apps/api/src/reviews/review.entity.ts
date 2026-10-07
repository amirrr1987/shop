import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import type { ReviewStatus } from '@shop/shared';

@Entity('reviews')
@Unique(['productId', 'userId'])
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'text' })
  comment!: string;

  @Column({ type: 'jsonb', default: [] })
  images!: string[];

  @Index()
  @Column({ type: 'varchar', length: 20, default: 'approved' })
  status!: ReviewStatus;

  @Column({ type: 'text', nullable: true })
  reply!: string | null;

  @Column({ name: 'replied_at', type: 'timestamptz', nullable: true })
  repliedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
