import type { MigrationInterface, QueryRunner } from 'typeorm';

/** Every money column in the schema, as `table.column` pairs. */
const MONEY_COLUMNS: ReadonlyArray<readonly [table: string, column: string]> = [
  ['products', 'price'],
  ['orders', 'subtotal'],
  ['orders', 'discount'],
  ['orders', 'shipping_cost'],
  ['orders', 'total'],
  ['order_items', 'unit_price'],
  ['coupons', 'min_order_amount'],
  ['shipping_methods', 'price'],
  ['shipping_methods', 'free_above'],
];

/**
 * Switches the stored currency unit from toman to rial (1 toman = 10 rials) and
 * adds the store-wide display-unit setting.
 *
 * Two things this migration must get right:
 *  - Columns are widened to bigint *before* the multiply. At integer width the
 *    ceiling after conversion would be ~214 million toman per value, which real
 *    orders can exceed.
 *  - `coupons.value` holds a percentage for percent coupons and an amount for
 *    fixed ones, so only the fixed rows are converted.
 */
export class RialBaseCurrency1791072000000 implements MigrationInterface {
  name = 'RialBaseCurrency1791072000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const [table, column] of [
      ...MONEY_COLUMNS,
      ['coupons', 'value'] as const,
    ]) {
      await queryRunner.query(
        `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE bigint`,
      );
    }

    for (const [table, column] of MONEY_COLUMNS) {
      await queryRunner.query(
        `UPDATE "${table}" SET "${column}" = "${column}" * 10 WHERE "${column}" IS NOT NULL`,
      );
    }

    await queryRunner.query(
      `UPDATE "coupons" SET "value" = "value" * 10 WHERE "type" = 'fixed'`,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "store_settings" (
        "id" smallint NOT NULL DEFAULT 1,
        "currency_display_unit" character varying(16) NOT NULL DEFAULT 'toman',
        "allow_customer_currency_unit" boolean NOT NULL DEFAULT true,
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_store_settings" PRIMARY KEY ("id"),
        CONSTRAINT "CHK_store_settings_singleton" CHECK ("id" = 1)
      )
    `);
    await queryRunner.query(
      `INSERT INTO "store_settings" ("id") VALUES (1) ON CONFLICT ("id") DO NOTHING`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "store_settings"`);

    await queryRunner.query(
      `UPDATE "coupons" SET "value" = "value" / 10 WHERE "type" = 'fixed'`,
    );

    for (const [table, column] of MONEY_COLUMNS) {
      await queryRunner.query(
        `UPDATE "${table}" SET "${column}" = "${column}" / 10 WHERE "${column}" IS NOT NULL`,
      );
    }

    for (const [table, column] of [
      ...MONEY_COLUMNS,
      ['coupons', 'value'] as const,
    ]) {
      await queryRunner.query(
        `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE integer`,
      );
    }
  }
}
