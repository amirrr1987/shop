import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { StoreSettings, UpdateStoreSettingsInput } from '@shop/shared';
import type { Repository } from 'typeorm';
import { CacheKeys, CacheTTL } from '../cache/cache.keys.js';
import { CacheService } from '../cache/cache.service.js';
import {
  STORE_SETTINGS_ID,
  StoreSettingsEntity,
} from './store-settings.entity.js';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(StoreSettingsEntity)
    private readonly settings: Repository<StoreSettingsEntity>,
    private readonly cache: CacheService,
  ) {}

  async get(): Promise<StoreSettings> {
    return this.cache.getOrSet(CacheKeys.settings(), CacheTTL.SETTINGS, async () =>
      this.toSettings(await this.load()),
    );
  }

  async update(input: UpdateStoreSettingsInput): Promise<StoreSettings> {
    const row = await this.load();

    if (input.currencyDisplayUnit !== undefined) {
      row.currencyDisplayUnit = input.currencyDisplayUnit;
    }
    if (input.allowCustomerCurrencyUnit !== undefined) {
      row.allowCustomerCurrencyUnit = input.allowCustomerCurrencyUnit;
    }
    if (input.shopName !== undefined) {
      row.shopName = input.shopName.trim() || 'فروشگاه';
    }
    if (input.supportEmail !== undefined) {
      row.supportEmail = input.supportEmail.trim();
    }
    if (input.supportPhone !== undefined) {
      row.supportPhone = input.supportPhone.trim();
    }
    if (input.logoUrl !== undefined) {
      row.logoUrl = input.logoUrl.trim();
    }
    if (input.taxPercent !== undefined) {
      row.taxPercent = Math.min(100, Math.max(0, input.taxPercent));
    }
    if (input.metaDescription !== undefined) {
      row.metaDescription = input.metaDescription.trim().slice(0, 300);
    }
    if (input.defaultOgImage !== undefined) {
      row.defaultOgImage = input.defaultOgImage.trim().slice(0, 500);
    }
    if (input.legalName !== undefined) {
      row.legalName = input.legalName.trim().slice(0, 120);
    }
    if (input.nationalId !== undefined) {
      row.nationalId = input.nationalId.trim().slice(0, 20);
    }
    if (input.economicCode !== undefined) {
      row.economicCode = input.economicCode.trim().slice(0, 20);
    }
    if (input.registrationNumber !== undefined) {
      row.registrationNumber = input.registrationNumber.trim().slice(0, 40);
    }
    if (input.legalAddress !== undefined) {
      row.legalAddress = input.legalAddress.trim().slice(0, 400);
    }
    if (input.enamadCode !== undefined) {
      row.enamadCode = input.enamadCode.trim().slice(0, 200);
    }
    if (input.storeBranches !== undefined) {
      row.storeBranches = input.storeBranches.map((branch) => ({
        name: branch.name.trim(),
        address: branch.address.trim(),
        phone: (branch.phone ?? '').trim().slice(0, 32),
        hours: (branch.hours ?? '').trim().slice(0, 120),
        mapUrl: (branch.mapUrl ?? '').trim().slice(0, 500),
      }));
    }
    if (input.catalogFilterPosition !== undefined) {
      row.catalogFilterPosition = input.catalogFilterPosition;
    }
    if (input.catalogGridColumns !== undefined) {
      row.catalogGridColumns = input.catalogGridColumns;
    }
    if (input.loyaltyEnabled !== undefined) {
      row.loyaltyEnabled = input.loyaltyEnabled;
    }
    if (input.loyaltyEarnRialsPerPoint !== undefined) {
      row.loyaltyEarnRialsPerPoint = Math.max(
        1,
        Math.floor(input.loyaltyEarnRialsPerPoint),
      );
    }
    if (input.loyaltyRedeemRialsPerPoint !== undefined) {
      row.loyaltyRedeemRialsPerPoint = Math.max(
        1,
        Math.floor(input.loyaltyRedeemRialsPerPoint),
      );
    }
    if (input.loyaltyMaxRedeemPercent !== undefined) {
      row.loyaltyMaxRedeemPercent = Math.min(
        100,
        Math.max(0, input.loyaltyMaxRedeemPercent),
      );
    }

    const next = this.toSettings(await this.settings.save(row));

    await this.cache.del(CacheKeys.settings());
    return next;
  }

  /** Created on first read so a fresh database needs no seed step. */
  private async load() {
    const existing = await this.settings.findOne({
      where: { id: STORE_SETTINGS_ID },
    });
    if (existing) {
      return existing;
    }
    return this.settings.save(
      this.settings.create({ id: STORE_SETTINGS_ID }),
    );
  }

  private toSettings(row: StoreSettingsEntity): StoreSettings {
    return {
      currencyDisplayUnit: row.currencyDisplayUnit,
      allowCustomerCurrencyUnit: row.allowCustomerCurrencyUnit,
      shopName: row.shopName || 'فروشگاه',
      supportEmail: row.supportEmail || '',
      supportPhone: row.supportPhone || '',
      logoUrl: row.logoUrl || '',
      taxPercent: Number(row.taxPercent) || 0,
      metaDescription: row.metaDescription || '',
      defaultOgImage: row.defaultOgImage || '',
      legalName: row.legalName || '',
      nationalId: row.nationalId || '',
      economicCode: row.economicCode || '',
      registrationNumber: row.registrationNumber || '',
      legalAddress: row.legalAddress || '',
      enamadCode: row.enamadCode || '',
      storeBranches: Array.isArray(row.storeBranches) ? row.storeBranches : [],
      catalogFilterPosition: row.catalogFilterPosition || 'end',
      catalogGridColumns: ([3, 4, 5] as const).includes(
        Number(row.catalogGridColumns) as 3 | 4 | 5,
      )
        ? (Number(row.catalogGridColumns) as 3 | 4 | 5)
        : 4,
      loyaltyEnabled: Boolean(row.loyaltyEnabled),
      loyaltyEarnRialsPerPoint: Math.max(
        1,
        Number(row.loyaltyEarnRialsPerPoint) || 100_000,
      ),
      loyaltyRedeemRialsPerPoint: Math.max(
        1,
        Number(row.loyaltyRedeemRialsPerPoint) || 10_000,
      ),
      loyaltyMaxRedeemPercent: Math.min(
        100,
        Math.max(0, Number(row.loyaltyMaxRedeemPercent) || 20),
      ),
    };
  }
}
