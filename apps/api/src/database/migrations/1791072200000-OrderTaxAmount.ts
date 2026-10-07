import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderTaxAmount1791072200000 implements MigrationInterface {
  name = 'OrderTaxAmount1791072200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "tax_amount" bigint NOT NULL DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN IF EXISTS "tax_amount"`,
    );
  }
}
