import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
@Index('IDX_addresses_user_id', ['userId'])
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', nullable: true })
  label!: string | null;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  phone!: string;

  @Column()
  province!: string;

  @Column()
  city!: string;

  @Column({ name: 'postal_code' })
  postalCode!: string;

  @Column({ type: 'text' })
  line!: string;

  @Column({ name: 'is_default', default: false })
  isDefault!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
