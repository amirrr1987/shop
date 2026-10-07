import type {
  CatalogFilterPosition,
  CatalogGridColumns,
  CurrencyUnit,
  StoreBranch,
} from '@shop/shared';
import { Check, Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/** The one row this table is allowed to hold. */
export const STORE_SETTINGS_ID = 1;

@Entity('store_settings')
@Check('CHK_store_settings_singleton', '"id" = 1')
export class StoreSettingsEntity {
  @PrimaryColumn({ type: 'smallint', default: STORE_SETTINGS_ID })
  id!: number;

  @Column({
    name: 'currency_display_unit',
    type: 'varchar',
    length: 16,
    default: 'toman',
  })
  currencyDisplayUnit!: CurrencyUnit;

  @Column({
    name: 'allow_customer_currency_unit',
    type: 'boolean',
    default: true,
  })
  allowCustomerCurrencyUnit!: boolean;

  @Column({ name: 'shop_name', type: 'varchar', length: 80, default: 'فروشگاه' })
  shopName!: string;

  @Column({ name: 'support_email', type: 'varchar', length: 120, default: '' })
  supportEmail!: string;

  @Column({ name: 'support_phone', type: 'varchar', length: 32, default: '' })
  supportPhone!: string;

  @Column({ name: 'logo_url', type: 'varchar', length: 500, default: '' })
  logoUrl!: string;

  @Column({
    name: 'tax_percent',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number | null) =>
        value == null ? 0 : Number(value),
    },
  })
  taxPercent!: number;

  @Column({
    name: 'meta_description',
    type: 'varchar',
    length: 300,
    default: '',
  })
  metaDescription!: string;

  @Column({
    name: 'default_og_image',
    type: 'varchar',
    length: 500,
    default: '',
  })
  defaultOgImage!: string;

  @Column({ name: 'legal_name', type: 'varchar', length: 120, default: '' })
  legalName!: string;

  @Column({ name: 'national_id', type: 'varchar', length: 20, default: '' })
  nationalId!: string;

  @Column({ name: 'economic_code', type: 'varchar', length: 20, default: '' })
  economicCode!: string;

  @Column({
    name: 'registration_number',
    type: 'varchar',
    length: 40,
    default: '',
  })
  registrationNumber!: string;

  @Column({ name: 'legal_address', type: 'varchar', length: 400, default: '' })
  legalAddress!: string;

  @Column({ name: 'enamad_code', type: 'varchar', length: 200, default: '' })
  enamadCode!: string;

  @Column({ name: 'store_branches', type: 'jsonb', default: [] })
  storeBranches!: StoreBranch[];

  @Column({
    name: 'catalog_filter_position',
    type: 'varchar',
    length: 16,
    default: 'end',
  })
  catalogFilterPosition!: CatalogFilterPosition;

  @Column({
    name: 'catalog_grid_columns',
    type: 'smallint',
    default: 4,
  })
  catalogGridColumns!: CatalogGridColumns;

  @Column({ name: 'loyalty_enabled', type: 'boolean', default: false })
  loyaltyEnabled!: boolean;

  @Column({
    name: 'loyalty_earn_rials_per_point',
    type: 'int',
    default: 100_000,
  })
  loyaltyEarnRialsPerPoint!: number;

  @Column({
    name: 'loyalty_redeem_rials_per_point',
    type: 'int',
    default: 10_000,
  })
  loyaltyRedeemRialsPerPoint!: number;

  @Column({
    name: 'loyalty_max_redeem_percent',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 20,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number | null) =>
        value == null ? 20 : Number(value),
    },
  })
  loyaltyMaxRedeemPercent!: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
