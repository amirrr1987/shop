import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AnalyticsLoyaltyCopurchase1791073900000
  implements MigrationInterface
{
  name = 'AnalyticsLoyaltyCopurchase1791073900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "loyalty_points" integer NOT NULL DEFAULT 0
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "loyalty_discount" bigint NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "loyalty_points_redeemed" integer NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "loyalty_points_earned" integer NOT NULL DEFAULT 0
    `);

    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "loyalty_enabled" boolean NOT NULL DEFAULT false
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "loyalty_earn_rials_per_point" integer NOT NULL DEFAULT 100000
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "loyalty_redeem_rials_per_point" integer NOT NULL DEFAULT 10000
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "loyalty_max_redeem_percent" numeric(5,2) NOT NULL DEFAULT 20
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "loyalty_ledger" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "order_id" uuid,
        "delta" integer NOT NULL,
        "balance_after" integer NOT NULL,
        "reason" character varying(32) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_loyalty_ledger" PRIMARY KEY ("id"),
        CONSTRAINT "FK_loyalty_ledger_user"
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_loyalty_ledger_order"
          FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_loyalty_ledger_user_id"
      ON "loyalty_ledger" ("user_id")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_loyalty_ledger_order_id"
      ON "loyalty_ledger" ("order_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "loyalty_ledger"`);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "loyalty_max_redeem_percent"
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "loyalty_redeem_rials_per_point"
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "loyalty_earn_rials_per_point"
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "loyalty_enabled"
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      DROP COLUMN IF EXISTS "loyalty_points_earned"
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      DROP COLUMN IF EXISTS "loyalty_points_redeemed"
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      DROP COLUMN IF EXISTS "loyalty_discount"
    `);
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "loyalty_points"
    `);
  }
}
