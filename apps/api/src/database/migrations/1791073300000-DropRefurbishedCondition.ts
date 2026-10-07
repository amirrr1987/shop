import type { MigrationInterface, QueryRunner } from 'typeorm';

export class DropRefurbishedCondition1791073300000
  implements MigrationInterface
{
  name = 'DropRefurbishedCondition1791073300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "products"
      SET "condition" = 'new'
      WHERE "condition" <> 'new'
    `);
  }

  public async down(): Promise<void> {
    // Irreversible: refurbished values were collapsed to new.
  }
}
