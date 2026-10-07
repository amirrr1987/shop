import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CartItems1791073400000 implements MigrationInterface {
  name = 'CartItems1791073400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "cart_items" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "variant_id" uuid,
        "quantity" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cart_items" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_cart_items_user_id"
      ON "cart_items" ("user_id")
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_cart_user_product_variant"
      ON "cart_items" (
        "user_id",
        "product_id",
        (COALESCE("variant_id", '00000000-0000-0000-0000-000000000000'::uuid))
      )
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "cart_items"
          ADD CONSTRAINT "FK_cart_items_product_id"
          FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "cart_items"
      DROP CONSTRAINT IF EXISTS "FK_cart_items_product_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "UQ_cart_user_product_variant"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "cart_items"`);
  }
}
