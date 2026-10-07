import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SeoFields1791074100000 implements MigrationInterface {
  name = 'SeoFields1791074100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products"
      ADD COLUMN IF NOT EXISTS "seo_title" varchar(70),
      ADD COLUMN IF NOT EXISTS "seo_description" varchar(320),
      ADD COLUMN IF NOT EXISTS "og_image" varchar(500)
    `);

    await queryRunner.query(`
      ALTER TABLE "categories"
      ADD COLUMN IF NOT EXISTS "description" text NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS "seo_title" varchar(70),
      ADD COLUMN IF NOT EXISTS "seo_description" varchar(320),
      ADD COLUMN IF NOT EXISTS "og_image" varchar(500)
    `);

    await queryRunner.query(`
      ALTER TABLE "brands"
      ADD COLUMN IF NOT EXISTS "description" text NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS "seo_title" varchar(70),
      ADD COLUMN IF NOT EXISTS "seo_description" varchar(320),
      ADD COLUMN IF NOT EXISTS "og_image" varchar(500),
      ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
      ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
    `);

    await queryRunner.query(`
      ALTER TABLE "magazine_posts"
      ADD COLUMN IF NOT EXISTS "seo_title" varchar(70),
      ADD COLUMN IF NOT EXISTS "seo_description" varchar(320),
      ADD COLUMN IF NOT EXISTS "og_image" varchar(500)
    `);

    await queryRunner.query(`
      ALTER TABLE "store_settings"
      ADD COLUMN IF NOT EXISTS "default_og_image" varchar(500) NOT NULL DEFAULT ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store_settings"
      DROP COLUMN IF EXISTS "default_og_image"
    `);
    await queryRunner.query(`
      ALTER TABLE "magazine_posts"
      DROP COLUMN IF EXISTS "seo_title",
      DROP COLUMN IF EXISTS "seo_description",
      DROP COLUMN IF EXISTS "og_image"
    `);
    await queryRunner.query(`
      ALTER TABLE "brands"
      DROP COLUMN IF EXISTS "description",
      DROP COLUMN IF EXISTS "seo_title",
      DROP COLUMN IF EXISTS "seo_description",
      DROP COLUMN IF EXISTS "og_image",
      DROP COLUMN IF EXISTS "created_at",
      DROP COLUMN IF EXISTS "updated_at"
    `);
    await queryRunner.query(`
      ALTER TABLE "categories"
      DROP COLUMN IF EXISTS "description",
      DROP COLUMN IF EXISTS "seo_title",
      DROP COLUMN IF EXISTS "seo_description",
      DROP COLUMN IF EXISTS "og_image"
    `);
    await queryRunner.query(`
      ALTER TABLE "products"
      DROP COLUMN IF EXISTS "seo_title",
      DROP COLUMN IF EXISTS "seo_description",
      DROP COLUMN IF EXISTS "og_image"
    `);
  }
}
