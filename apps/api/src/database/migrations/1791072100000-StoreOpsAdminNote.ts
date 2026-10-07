import type { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreOpsAdminNote1791072100000 implements MigrationInterface {
  name = 'StoreOpsAdminNote1791072100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "shop_name" character varying(80) NOT NULL DEFAULT 'فروشگاه'
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "support_email" character varying(120) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "support_phone" character varying(32) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "logo_url" character varying(500) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "tax_percent" numeric(5,2) NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "meta_description" character varying(300) NOT NULL DEFAULT ''
    `);
    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD COLUMN IF NOT EXISTS "admin_note" character varying(2000)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN IF EXISTS "admin_note"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "meta_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "tax_percent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "logo_url"`,
    );
  }
}
