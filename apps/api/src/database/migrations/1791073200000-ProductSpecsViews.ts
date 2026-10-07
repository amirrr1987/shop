import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductSpecsViews1791073200000 implements MigrationInterface {
  name = 'ProductSpecsViews1791073200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products"
        ADD COLUMN IF NOT EXISTS "specs" jsonb NOT NULL DEFAULT '[]'::jsonb,
        ADD COLUMN IF NOT EXISTS "video_url" character varying(500) NOT NULL DEFAULT '',
        ADD COLUMN IF NOT EXISTS "view_count" integer NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_products_view_count"
        ON "products" ("view_count")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_products_view_count"`);
    await queryRunner.query(`
      ALTER TABLE "products"
        DROP COLUMN IF EXISTS "view_count",
        DROP COLUMN IF EXISTS "video_url",
        DROP COLUMN IF EXISTS "specs"
    `);
  }
}
