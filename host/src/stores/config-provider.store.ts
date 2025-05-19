import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'
import type { ConfigProvider } from '@/models/config-provider.model'

export const useConfigProviderStore = defineStore('ConfigProvider', () => {
  const configProvider = useStorage<ConfigProvider>('', {} as ConfigProvider)

  return { configProvider }
})
