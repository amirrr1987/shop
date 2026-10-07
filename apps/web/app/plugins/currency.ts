import type { StoreSettings } from '@shop/shared'
import {
  FALLBACK_STORE_SETTINGS,
  STORE_SETTINGS_KEY,
  useStoreSettingsState,
} from '~/composables/useCurrency'

export default defineNuxtPlugin(async () => {
  const settings = useStoreSettingsState()

  // Key must differ from useState(STORE_SETTINGS_KEY) to avoid payload clash.
  const { data } = await useAsyncData(`${STORE_SETTINGS_KEY}-fetch`, async () => {
    const api = useApi()
    try {
      return {
        ...FALLBACK_STORE_SETTINGS,
        ...(await api<StoreSettings>('/settings')),
      }
    } catch {
      return { ...FALLBACK_STORE_SETTINGS }
    }
  })

  if (data.value) {
    settings.value = data.value
  }
})
