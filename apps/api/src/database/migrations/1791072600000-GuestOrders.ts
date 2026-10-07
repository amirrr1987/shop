import type { MigrationInterface, QueryRunner } from 'typeorm';

export class GuestOrders1791072600000 implements MigrationInterface {
  name = 'GuestOrders1791072600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders"
      ALTER COLUMN "user_id" DROP NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "guest_email" character varying(255)
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "guest_token" character varying(64)
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_orders_guest_token"
      ON "orders" ("guest_token")
      WHERE "guest_token" IS NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "payment_transactions"
      ALTER COLUMN "user_id" DROP NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "payment_transactions"
      ALTER COLUMN "user_id" SET NOT NULL
    `);
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_orders_guest_token"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN IF EXISTS "guest_token"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN IF EXISTS "guest_email"`,
    );
    await queryRunner.query(`
      ALTER TABLE "orders"
      ALTER COLUMN "user_id" SET NOT NULL
    `);
  }
}
