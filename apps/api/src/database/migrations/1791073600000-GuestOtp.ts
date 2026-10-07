import type { MigrationInterface, QueryRunner } from 'typeorm';

export class GuestOtp1791073600000 implements MigrationInterface {
  name = 'GuestOtp1791073600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "otp_challenges" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "phone" character varying(15) NOT NULL,
        "purpose" character varying(32) NOT NULL,
        "code_hash" character varying(64) NOT NULL,
        "session_token_hash" character varying(64),
        "attempts" integer NOT NULL DEFAULT 0,
        "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "verified_at" TIMESTAMP WITH TIME ZONE,
        "consumed_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_otp_challenges" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_otp_challenges_phone_purpose"
      ON "otp_challenges" ("phone", "purpose")
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "guest_phone" character varying(15)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders"
      DROP COLUMN IF EXISTS "guest_phone"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_otp_challenges_phone_purpose"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "otp_challenges"`);
  }
}
