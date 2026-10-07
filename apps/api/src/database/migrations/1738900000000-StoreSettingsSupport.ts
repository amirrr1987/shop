import type { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreSettingsSupport1738900000000 implements MigrationInterface {
  name = 'StoreSettingsSupport1738900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Table may not exist yet on a fresh DB (created later by RialBaseCurrency).
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'store_settings'
        ) THEN
          ALTER TABLE "store_settings"
            ADD COLUMN IF NOT EXISTS "shop_name" character varying(80) NOT NULL DEFAULT 'فروشگاه';
          ALTER TABLE "store_settings"
            ADD COLUMN IF NOT EXISTS "support_email" character varying(120) NOT NULL DEFAULT '';
          ALTER TABLE "store_settings"
            ADD COLUMN IF NOT EXISTS "support_phone" character varying(32) NOT NULL DEFAULT '';
        END IF;
      END $$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'store_settings'
        ) THEN
          ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "support_phone";
          ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "support_email";
          ALTER TABLE "store_settings" DROP COLUMN IF EXISTS "shop_name";
        END IF;
      END $$
    `);
  }
}
