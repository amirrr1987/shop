import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audit_logs')
@Index('IDX_audit_logs_created_at', ['createdAt'])
@Index('IDX_audit_logs_action', ['action'])
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'actor_user_id', type: 'uuid', nullable: true })
  actorUserId!: string | null;

  @Column({ name: 'actor_email', type: 'varchar', length: 160, nullable: true })
  actorEmail!: string | null;

  @Column({ type: 'varchar', length: 80 })
  action!: string;

  @Column({ name: 'entity_type', type: 'varchar', length: 64 })
  entityType!: string;

  @Column({ name: 'entity_id', type: 'varchar', length: 80, nullable: true })
  entityId!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  meta!: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
