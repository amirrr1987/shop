import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CatalogUxUnits1791073800000 implements MigrationInterface {
  name = 'CatalogUxUnits1791073800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "product_units" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(40) NOT NULL,
        "slug" character varying(40) NOT NULL,
        "symbol" character varying(20) NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_product_units" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_product_units_slug" UNIQUE ("slug")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "product_units" ("name", "slug", "symbol", "sort_order", "is_active")
      VALUES
        ('عدد', 'piece', 'عدد', 0, true),
        ('کیلوگرم', 'kg', 'کیلو', 10, true),
        ('گرم', 'gram', 'گرم', 20, true),
        ('متر', 'meter', 'متر', 30, true),
        ('بسته', 'pack', 'بسته', 40, true)
      ON CONFLICT ("slug") DO NOTHING
    `);

    await queryRunner.query(`
      ALTER TABLE "products"
      ADD COLUMN IF NOT EXISTS "unit_id" uuid
    `);

    await queryRunner.query(`
      UPDATE "products" p
      SET "unit_id" = u."id"
      FROM "product_units" u
      WHERE u."slug" = 'piece' AND p."unit_id" IS NULL
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "products"
        ADD CONSTRAINT "FK_products_unit"
        FOREIGN KEY ("unit_id") REFERENCES "product_units"("id")
        ON DELETE SET NULL;
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$
    `);

    await queryRunner.query(`
      ALTER TABLE "categories"
      ADD COLUMN IF NOT EXISTS "spec_keys" jsonb NOT NULL DEFAULT '[]'::jsonb
    `);

    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "catalog_filter_position" character varying(16) NOT NULL DEFAULT 'end'
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "catalog_grid_columns" smallint NOT NULL DEFAULT 4
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "catalog_grid_columns"
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "catalog_filter_position"
    `);
    await queryRunner.query(`
      ALTER TABLE "categories"
      DROP COLUMN IF EXISTS "spec_keys"
    `);
    await queryRunner.query(`
      ALTER TABLE "products"
      DROP CONSTRAINT IF EXISTS "FK_products_unit"
    `);
    await queryRunner.query(`
      ALTER TABLE "products"
      DROP COLUMN IF EXISTS "unit_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "product_units"`);
  }
}
