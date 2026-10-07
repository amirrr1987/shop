import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AuditLogs1791072300000 implements MigrationInterface {
  name = 'AuditLogs1791072300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "audit_logs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "actor_user_id" uuid,
        "actor_email" character varying(160),
        "action" character varying(80) NOT NULL,
        "entity_type" character varying(64) NOT NULL,
        "entity_id" character varying(80),
        "meta" jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_audit_logs_created_at"
      ON "audit_logs" ("created_at" DESC)
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_audit_logs_action"
      ON "audit_logs" ("action")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "audit_logs"`);
  }
}
