import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  CatalogFilterPosition,
  CatalogGridColumns,
  CurrencyUnit,
  StoreBranch,
  StoreSettings,
  UpdateStoreSettingsInput,
} from '@shop/shared'
import { CURRENCY_UNIT_LABELS_FA } from '@shop/shared'
import { api } from '@/api/client'

export const useSettingsStore = defineStore('settings', () => {
  const currencyDisplayUnit = ref<CurrencyUnit>('toman')
  const allowCustomerCurrencyUnit = ref(true)
  const shopName = ref('فروشگاه')
  const supportEmail = ref('')
  const supportPhone = ref('')
  const logoUrl = ref('')
  const taxPercent = ref(0)
  const metaDescription = ref('')
  const defaultOgImage = ref('')
  const legalName = ref('')
  const nationalId = ref('')
  const economicCode = ref('')
  const registrationNumber = ref('')
  const legalAddress = ref('')
  const enamadCode = ref('')
  const storeBranches = ref<StoreBranch[]>([])
  const catalogFilterPosition = ref<CatalogFilterPosition>('end')
  const catalogGridColumns = ref<CatalogGridColumns>(4)
  const loyaltyEnabled = ref(false)
  const loyaltyEarnRialsPerPoint = ref(100_000)
  const loyaltyRedeemRialsPerPoint = ref(10_000)
  const loyaltyMaxRedeemPercent = ref(20)
  const loaded = ref(false)


  const unit = computed(() => currencyDisplayUnit.value)
  const unitLabel = computed(() => CURRENCY_UNIT_LABELS_FA[unit.value])

  function apply(next: StoreSettings) {
    currencyDisplayUnit.value = next.currencyDisplayUnit
    allowCustomerCurrencyUnit.value = next.allowCustomerCurrencyUnit
    shopName.value = next.shopName
    supportEmail.value = next.supportEmail || ''
    supportPhone.value = next.supportPhone || ''
    logoUrl.value = next.logoUrl || ''
    taxPercent.value = next.taxPercent ?? 0
    metaDescription.value = next.metaDescription || ''
    defaultOgImage.value = next.defaultOgImage || ''
    legalName.value = next.legalName || ''
    nationalId.value = next.nationalId || ''
    economicCode.value = next.economicCode || ''
    registrationNumber.value = next.registrationNumber || ''
    legalAddress.value = next.legalAddress || ''
    enamadCode.value = next.enamadCode || ''
    storeBranches.value = Array.isArray(next.storeBranches)
      ? next.storeBranches.map((branch) => ({ ...branch }))
      : []
    catalogFilterPosition.value = next.catalogFilterPosition ?? 'end'
    catalogGridColumns.value = next.catalogGridColumns ?? 4
    loyaltyEnabled.value = next.loyaltyEnabled ?? false
    loyaltyEarnRialsPerPoint.value = next.loyaltyEarnRialsPerPoint ?? 100_000
    loyaltyRedeemRialsPerPoint.value =
      next.loyaltyRedeemRialsPerPoint ?? 10_000
    loyaltyMaxRedeemPercent.value = next.loyaltyMaxRedeemPercent ?? 20
    loaded.value = true
  }

  async function fetch() {
    apply(await api<StoreSettings>('/settings'))
  }

  async function update(input: UpdateStoreSettingsInput) {
    apply(await api<StoreSettings>('/settings', { method: 'PATCH', body: input }))
  }

  return {
    currencyDisplayUnit,
    allowCustomerCurrencyUnit,
    shopName,
    supportEmail,
    supportPhone,
    logoUrl,
    taxPercent,
    metaDescription,
    defaultOgImage,
    legalName,
    nationalId,
    economicCode,
    registrationNumber,
    legalAddress,
    enamadCode,
    storeBranches,
    catalogFilterPosition,
    catalogGridColumns,
    loyaltyEnabled,
    loyaltyEarnRialsPerPoint,
    loyaltyRedeemRialsPerPoint,
    loyaltyMaxRedeemPercent,
    loaded,
    unit,
    unitLabel,
    fetch,
    update,
  }
})

