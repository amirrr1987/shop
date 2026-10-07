import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CatalogGrowth1791073100000 implements MigrationInterface {
  name = 'CatalogGrowth1791073100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "brands" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(80) NOT NULL,
        "slug" character varying(80) NOT NULL,
        CONSTRAINT "PK_brands" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_brands_slug" UNIQUE ("slug")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "store_settings"
        ADD COLUMN IF NOT EXISTS "enamad_code" character varying(200) NOT NULL DEFAULT '',
        ADD COLUMN IF NOT EXISTS "store_branches" jsonb NOT NULL DEFAULT '[]'::jsonb
    `);

    await queryRunner.query(`
      ALTER TABLE "products"
        ADD COLUMN IF NOT EXISTS "brand_id" uuid NULL,
        ADD COLUMN IF NOT EXISTS "price_mode" character varying(16) NOT NULL DEFAULT 'fixed',
        ADD COLUMN IF NOT EXISTS "condition" character varying(16) NOT NULL DEFAULT 'new',
        ADD COLUMN IF NOT EXISTS "sale_price" bigint NULL,
        ADD COLUMN IF NOT EXISTS "sale_ends_at" TIMESTAMP NULL
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_products_brand_id" ON "products" ("brand_id")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_products_condition" ON "products" ("condition")
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "products"
          ADD CONSTRAINT "FK_products_brand_id"
          FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "FK_products_brand_id"
    `);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_products_condition"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_products_brand_id"`);
    await queryRunner.query(`
      ALTER TABLE "products"
        DROP COLUMN IF EXISTS "sale_ends_at",
        DROP COLUMN IF EXISTS "sale_price",
        DROP COLUMN IF EXISTS "condition",
        DROP COLUMN IF EXISTS "price_mode",
        DROP COLUMN IF EXISTS "brand_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "store_settings"
        DROP COLUMN IF EXISTS "store_branches",
        DROP COLUMN IF EXISTS "enamad_code"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "brands"`);
  }
}
