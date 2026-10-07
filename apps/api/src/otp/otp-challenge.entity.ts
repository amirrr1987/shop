import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { OtpPurpose } from '@shop/shared';

@Entity('otp_challenges')
@Index('IDX_otp_challenges_phone_purpose', ['phone', 'purpose'])
export class OtpChallengeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 15 })
  phone!: string;

  @Column({ type: 'varchar', length: 32 })
  purpose!: OtpPurpose;

  @Column({ name: 'code_hash', type: 'varchar', length: 64 })
  codeHash!: string;

  @Column({ name: 'session_token_hash', type: 'varchar', length: 64, nullable: true })
  sessionTokenHash!: string | null;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ name: 'verified_at', type: 'timestamptz', nullable: true })
  verifiedAt!: Date | null;

  @Column({ name: 'consumed_at', type: 'timestamptz', nullable: true })
  consumedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
