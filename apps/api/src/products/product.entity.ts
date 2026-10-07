import type {
  ProductCondition,
  ProductPriceMode,
  ProductSpec,
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

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Index({ unique: true })
  @Column()
  slug!: string;

  @Column({ type: 'text', default: '' })
  description!: string;

  /** Rials. Display units (toman, thousand toman) are a presentation concern. */
  @Column({ type: 'bigint', default: 0, transformer: bigintToNumber })
  price!: number;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId!: string | null;

  @Index()
  @Column({ name: 'brand_id', type: 'uuid', nullable: true })
  brandId!: string | null;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId!: string | null;

  @Column({ type: 'jsonb', default: [] })
  images!: string[];

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'is_featured', default: false })
  isFeatured!: boolean;

  @Column({
    name: 'price_mode',
    type: 'varchar',
    length: 16,
    default: 'fixed',
  })
  priceMode!: ProductPriceMode;

  @Index()
  @Column({
    name: 'condition',
    type: 'varchar',
    length: 16,
    default: 'new',
  })
  condition!: ProductCondition;

  @Column({
    name: 'sale_price',
    type: 'bigint',
    nullable: true,
    transformer: bigintToNumber,
  })
  salePrice!: number | null;

  @Column({ name: 'sale_ends_at', type: 'timestamp', nullable: true })
  saleEndsAt!: Date | null;

  @Column({ type: 'jsonb', default: [] })
  specs!: ProductSpec[];

  @Column({ name: 'video_url', type: 'varchar', length: 500, default: '' })
  videoUrl!: string;

  @Index()
  @Column({ name: 'view_count', type: 'int', default: 0 })
  viewCount!: number;

  @Column({ name: 'seo_title', type: 'varchar', length: 70, nullable: true })
  seoTitle!: string | null;

  @Column({
    name: 'seo_description',
    type: 'varchar',
    length: 320,
    nullable: true,
  })
  seoDescription!: string | null;

  @Column({ name: 'og_image', type: 'varchar', length: 500, nullable: true })
  ogImage!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
