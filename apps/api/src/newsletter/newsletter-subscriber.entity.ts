import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('newsletter_subscribers')
export class NewsletterSubscriberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 120 })
  email!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
