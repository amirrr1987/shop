import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { bigintToNumber } from '../common/database/numeric.transformer.js';
import { Product } from './product.entity.js';

@Entity('product_variants')
export class ProductVariantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64 })
  sku!: string;

  @Column({ type: 'varchar', length: 120 })
  label!: string;

  @Column({ type: 'jsonb', default: {} })
  options!: Record<string, string>;

  /** Null = inherit product.price. */
  @Column({
    type: 'bigint',
    nullable: true,
    transformer: bigintToNumber,
  })
  price!: number | null;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;
}
