import { z } from 'zod';
import { CATALOG_FILTER_POSITIONS } from '../constants.js';
import { CURRENCY_UNITS } from '../money.js';

export const storeBranchSchema = z.object({
  name: z.string().trim().min(1),
  address: z.string().trim().min(1),
  phone: z.string().trim().optional().default(''),
  hours: z.string().trim().optional().default(''),
  mapUrl: z.string().trim().optional().default(''),
});

export type StoreBranch = z.infer<typeof storeBranchSchema>;

export const storeSettingsSchema = z.object({
  currencyDisplayUnit: z.enum(CURRENCY_UNITS),
  allowCustomerCurrencyUnit: z.boolean(),
  shopName: z.string(),
  supportEmail: z.string(),
  supportPhone: z.string(),
  logoUrl: z.string(),
  taxPercent: z.number().nonnegative(),
  metaDescription: z.string(),
  defaultOgImage: z.string(),
  legalName: z.string(),
  nationalId: z.string(),
  economicCode: z.string(),
  registrationNumber: z.string(),
  legalAddress: z.string(),
  enamadCode: z.string(),
  storeBranches: z.array(storeBranchSchema),
  catalogFilterPosition: z.enum(CATALOG_FILTER_POSITIONS),
  catalogGridColumns: z.union([
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  loyaltyEnabled: z.boolean(),
  loyaltyEarnRialsPerPoint: z.number().int().positive(),
  loyaltyRedeemRialsPerPoint: z.number().int().positive(),
  loyaltyMaxRedeemPercent: z.number().min(0).max(100),
});

export type StoreSettings = z.infer<typeof storeSettingsSchema>;

export const updateStoreSettingsSchema = z.object({
  currencyDisplayUnit: z.enum(CURRENCY_UNITS).optional(),
  allowCustomerCurrencyUnit: z.boolean().optional(),
  shopName: z.string().trim().min(1).max(80).optional(),
  supportEmail: z.string().max(120).optional(),
  supportPhone: z.string().max(32).optional(),
  logoUrl: z.string().max(500).optional(),
  taxPercent: z.number().min(0).max(100).optional(),
  metaDescription: z.string().max(300).optional(),
  defaultOgImage: z.string().max(500).optional(),
  legalName: z.string().max(120).optional(),
  nationalId: z.string().max(20).optional(),
  economicCode: z.string().max(20).optional(),
  registrationNumber: z.string().max(40).optional(),
  legalAddress: z.string().max(400).optional(),
  enamadCode: z.string().max(200).optional(),
  storeBranches: z.array(storeBranchSchema).max(12).optional(),
  catalogFilterPosition: z.enum(CATALOG_FILTER_POSITIONS).optional(),
  catalogGridColumns: z
    .union([z.literal(3), z.literal(4), z.literal(5)])
    .optional(),
  loyaltyEnabled: z.boolean().optional(),
  loyaltyEarnRialsPerPoint: z.number().int().positive().optional(),
  loyaltyRedeemRialsPerPoint: z.number().int().positive().optional(),
  loyaltyMaxRedeemPercent: z.number().min(0).max(100).optional(),
});

export type UpdateStoreSettingsInput = z.infer<
  typeof updateStoreSettingsSchema
>;
