import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ReviewImages1791073500000 implements MigrationInterface {
  name = 'ReviewImages1791073500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "reviews"
      ADD COLUMN IF NOT EXISTS "images" jsonb NOT NULL DEFAULT '[]'::jsonb
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "reviews"
      DROP COLUMN IF EXISTS "images"
    `);
  }
}
