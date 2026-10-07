import type { CurrencyUnit, StoreSettings } from '@shop/shared'
import {
  CURRENCY_UNIT_LABELS_FA,
  CURRENCY_UNITS,
  formatMoney,
  toRial,
} from '@shop/shared'

export const STORE_SETTINGS_KEY = 'store-settings'
const CUSTOMER_UNIT_COOKIE = 'currency-unit'

export const FALLBACK_STORE_SETTINGS: StoreSettings = {
  currencyDisplayUnit: 'toman',
  allowCustomerCurrencyUnit: true,
  shopName: 'فروشگاه',
  supportEmail: '',
  supportPhone: '',
  logoUrl: '',
  taxPercent: 0,
  metaDescription: '',
  defaultOgImage: '',
  legalName: '',
  nationalId: '',
  economicCode: '',
  registrationNumber: '',
  legalAddress: '',
  enamadCode: '',
  storeBranches: [],
  catalogFilterPosition: 'end',
  catalogGridColumns: 4,
  loyaltyEnabled: false,
  loyaltyEarnRialsPerPoint: 100_000,
  loyaltyRedeemRialsPerPoint: 10_000,
  loyaltyMaxRedeemPercent: 20,
}

function isCurrencyUnit(value: unknown): value is CurrencyUnit {
  return (
    typeof value === 'string' &&
    (CURRENCY_UNITS as readonly string[]).includes(value)
  )
}

export function useStoreSettingsState() {
  return useState<StoreSettings>(STORE_SETTINGS_KEY, () => ({
    ...FALLBACK_STORE_SETTINGS,
  }))
}

export function useCurrency() {
  const settings = useStoreSettingsState()

  const customerUnit = useCookie<string | null>(CUSTOMER_UNIT_COOKIE, {
    default: () => null,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const unit = computed<CurrencyUnit>(() => {
    const storeUnit = settings.value?.currencyDisplayUnit ?? 'toman'
    if (
      settings.value?.allowCustomerCurrencyUnit &&
      isCurrencyUnit(customerUnit.value)
    ) {
      return customerUnit.value
    }
    return storeUnit
  })

  const selectedUnit = computed<CurrencyUnit>({
    get: () => unit.value,
    set: (value) => {
      if (isCurrencyUnit(value)) {
        customerUnit.value = value
      }
    },
  })

  const allowCustomerChoice = computed(
    () => settings.value?.allowCustomerCurrencyUnit ?? true,
  )

  const unitLabel = computed(() => CURRENCY_UNIT_LABELS_FA[unit.value])

  const unitItems = CURRENCY_UNITS.map((value) => ({
    label: CURRENCY_UNIT_LABELS_FA[value],
    value,
  }))

  function formatPrice(amountRial: number) {
    return formatMoney(amountRial, unit.value)
  }

  function toRialQuery(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) {
      return undefined
    }
    const amount = Number(trimmed)
    if (!Number.isFinite(amount) || amount < 0) {
      return undefined
    }
    return toRial(amount, unit.value)
  }

  return {
    unit,
    selectedUnit,
    unitLabel,
    unitItems,
    allowCustomerChoice,
    settings,
    formatPrice,
    toRialQuery,
  }
}
