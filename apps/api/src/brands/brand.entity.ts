import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brands')
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 80 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 80 })
  slug!: string;

  @Column({ type: 'text', default: '' })
  description!: string;

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
