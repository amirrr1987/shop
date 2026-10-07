import type { MigrationInterface, QueryRunner } from 'typeorm';

export class NewsletterSubscribers1791073000000 implements MigrationInterface {
  name = 'NewsletterSubscribers1791073000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "email" character varying(120) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_newsletter_subscribers" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_newsletter_subscribers_email" UNIQUE ("email")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "newsletter_subscribers"`);
  }
}
