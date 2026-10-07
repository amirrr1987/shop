import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CouponCampaigns1791072500000 implements MigrationInterface {
  name = 'CouponCampaigns1791072500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "coupons"
      ADD COLUMN IF NOT EXISTS "starts_at" TIMESTAMPTZ
    `);
    await queryRunner.query(`
      ALTER TABLE "coupons"
      ADD COLUMN IF NOT EXISTS "is_automatic" boolean NOT NULL DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coupons" DROP COLUMN IF EXISTS "is_automatic"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupons" DROP COLUMN IF EXISTS "starts_at"`,
    );
  }
}
