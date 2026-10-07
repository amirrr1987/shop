import type { MagazinePostStatus } from '@shop/shared';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('magazine_posts')
export class MagazinePostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 160 })
  title!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 160 })
  slug!: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  excerpt!: string;

  @Column({ name: 'cover_image', type: 'varchar', length: 500, nullable: true })
  coverImage!: string | null;

  @Column({ name: 'body_markdown', type: 'text', default: '' })
  bodyMarkdown!: string;

  @Index()
  @Column({ type: 'varchar', length: 20, default: 'draft' })
  status!: MagazinePostStatus;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt!: Date | null;

  @Column({ name: 'related_product_ids', type: 'jsonb', default: [] })
  relatedProductIds!: string[];

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
