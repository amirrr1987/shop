import type { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreLegalInvoice1791072800000 implements MigrationInterface {
  name = 'StoreLegalInvoice1791072800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "legal_name" character varying(120) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "national_id" character varying(20) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "economic_code" character varying(20) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "registration_number" character varying(40) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "legal_address" character varying(400) NOT NULL DEFAULT ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "legal_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "registration_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "economic_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "national_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "legal_name"`,
    );
  }
}
