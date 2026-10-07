import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MagazinePosts1791073700000 implements MigrationInterface {
  name = 'MagazinePosts1791073700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "magazine_posts" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(160) NOT NULL,
        "slug" character varying(160) NOT NULL,
        "excerpt" character varying(500) NOT NULL DEFAULT '',
        "cover_image" character varying(500),
        "body_markdown" text NOT NULL DEFAULT '',
        "status" character varying(20) NOT NULL DEFAULT 'draft',
        "published_at" TIMESTAMP WITH TIME ZONE,
        "related_product_ids" jsonb NOT NULL DEFAULT '[]'::jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_magazine_posts" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_magazine_posts_slug" UNIQUE ("slug")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_magazine_posts_status_published"
      ON "magazine_posts" ("status", "published_at")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_magazine_posts_status_published"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "magazine_posts"`);
  }
}
