import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { fromRial, toRial } from '@shop/shared'
import { useSettingsStore } from '@/stores/settings'

export function useMoneyAmount() {
  const settings = useSettingsStore()
  const { unit, unitLabel } = storeToRefs(settings)

  function display(rial: number): number
  function display(rial: number | null | undefined): number | null
  function display(rial: number | null | undefined) {
    if (rial == null) {
      return null
    }
    return fromRial(rial, unit.value)
  }

  function storage(amount: number): number
  function storage(amount: number | null | undefined): number | null
  function storage(amount: number | null | undefined) {
    if (amount == null) {
      return null
    }
    return toRial(amount, unit.value)
  }

  const inputStep = computed(() => (unit.value === 'k-toman' ? 0.1 : 1))
  const inputPrecision = computed(() => (unit.value === 'k-toman' ? 1 : 0))

  return { unit, unitLabel, display, storage, inputStep, inputPrecision }
}
