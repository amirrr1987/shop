import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_units')
export class ProductUnitEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 40 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 40 })
  slug!: string;

  @Column({ type: 'varchar', length: 20 })
  symbol!: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;
}
