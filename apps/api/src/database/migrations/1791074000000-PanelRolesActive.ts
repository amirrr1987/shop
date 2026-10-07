import type { MigrationInterface, QueryRunner } from 'typeorm';

export class PanelRolesActive1791074000000 implements MigrationInterface {
  name = 'PanelRolesActive1791074000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "is_active" boolean NOT NULL DEFAULT true
    `);

    // Legacy staff → editor, legacy admin → owner (مدیر کل).
    await queryRunner.query(`
      UPDATE "users" SET "role" = 'editor' WHERE "role" = 'staff'
    `);
    await queryRunner.query(`
      UPDATE "users" SET "role" = 'owner' WHERE "role" = 'admin'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "users" SET "role" = 'admin' WHERE "role" = 'owner'
    `);
    await queryRunner.query(`
      UPDATE "users" SET "role" = 'staff' WHERE "role" IN ('editor', 'viewer', 'admin')
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "is_active"
    `);
  }
}
