import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductVariants1791072700000 implements MigrationInterface {
  name = 'ProductVariants1791072700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "product_variants" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "product_id" uuid NOT NULL,
        "sku" character varying(64) NOT NULL,
        "label" character varying(120) NOT NULL,
        "options" jsonb NOT NULL DEFAULT '{}',
        "price" bigint,
        "stock" integer NOT NULL DEFAULT 0,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_product_variants" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_product_variants_sku" UNIQUE ("sku")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_product_variants_product_id"
      ON "product_variants" ("product_id")
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "product_variants"
          ADD CONSTRAINT "FK_product_variants_product_id"
          FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);
    await queryRunner.query(`
      ALTER TABLE "order_items"
      ADD COLUMN IF NOT EXISTS "variant_id" uuid
    `);
    await queryRunner.query(`
      ALTER TABLE "order_items"
      ADD COLUMN IF NOT EXISTS "sku" character varying(64)
    `);
    await queryRunner.query(`
      ALTER TABLE "order_items"
      ADD COLUMN IF NOT EXISTS "variant_label" character varying(120)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN IF EXISTS "variant_label"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN IF EXISTS "sku"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN IF EXISTS "variant_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "product_variants"
      DROP CONSTRAINT IF EXISTS "FK_product_variants_product_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "product_variants"`);
  }
}
