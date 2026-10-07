import type { MigrationInterface, QueryRunner } from 'typeorm';

export class WishlistItems1791072900000 implements MigrationInterface {
  name = 'WishlistItems1791072900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "wishlist_items" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_wishlist_items" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_wishlist_user_product" UNIQUE ("user_id", "product_id")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_wishlist_items_user_id"
      ON "wishlist_items" ("user_id")
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "wishlist_items"
          ADD CONSTRAINT "FK_wishlist_items_product_id"
          FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "wishlist_items"
      DROP CONSTRAINT IF EXISTS "FK_wishlist_items_product_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "wishlist_items"`);
  }
}
