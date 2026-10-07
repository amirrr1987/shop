import type { CategorySpecKey } from '@shop/shared';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Index({ unique: true })
  @Column()
  slug!: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId!: string | null;

  @Column({ type: 'text', default: '' })
  description!: string;

  @Column({ name: 'spec_keys', type: 'jsonb', default: [] })
  specKeys!: CategorySpecKey[];

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
