import { formatMoney as formatMoneyShared, formatNumber as formatNumberShared } from '@shop/shared'
import { useSettingsStore } from '@/stores/settings'

export function formatMoney(amount: number) {
  const settings = useSettingsStore()
  return formatMoneyShared(amount, settings.unit)
}

export function formatNumber(value: number) {
  return formatNumberShared(value)
}
