import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MailTrackingReset1738800000000 implements MigrationInterface {
  name = 'MailTrackingReset1738800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "tracking_code" character varying(80)
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "token_hash" character varying(64) NOT NULL,
        "expires_at" TIMESTAMPTZ NOT NULL,
        "used_at" TIMESTAMPTZ,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_password_reset_tokens" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_password_reset_tokens_user_id" ON "password_reset_tokens" ("user_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_password_reset_tokens_token_hash" ON "password_reset_tokens" ("token_hash")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "password_reset_tokens"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN IF EXISTS "tracking_code"`,
    );
  }
}
