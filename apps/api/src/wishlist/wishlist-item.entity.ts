import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('wishlist_items')
@Unique('UQ_wishlist_user_product', ['userId', 'productId'])
@Index('IDX_wishlist_items_user_id', ['userId'])
export class WishlistItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
