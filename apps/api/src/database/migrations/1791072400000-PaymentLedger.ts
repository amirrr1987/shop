import type { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentLedger1791072400000 implements MigrationInterface {
  name = 'PaymentLedger1791072400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "refunded_amount" bigint NOT NULL DEFAULT 0
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "payment_transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "order_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "provider" character varying(16) NOT NULL,
        "type" character varying(16) NOT NULL,
        "status" character varying(16) NOT NULL DEFAULT 'pending',
        "amount" bigint NOT NULL DEFAULT 0,
        "authority" character varying(80),
        "ref_id" character varying(80),
        "provider_code" character varying(32),
        "reason" character varying(200),
        "meta" jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_payment_transactions" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_payment_transactions_order_id"
      ON "payment_transactions" ("order_id")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_payment_transactions_authority"
      ON "payment_transactions" ("authority")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "payment_transactions"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN IF EXISTS "refunded_amount"`,
    );
  }
}
