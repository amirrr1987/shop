import type { Setting, UpdateSetting } from '@/models/setting.model'
import { useSettingService } from '@/services/setting.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
  const settingService = useSettingService()
  const setting = ref<Setting | null>(null)
  const loading = ref(false)

  const getSetting = async () => {
    loading.value = true
    try {
      setting.value = await settingService.getSetting()
    } finally {
      loading.value = false
    }
  }

  const updateSetting = async (data: UpdateSetting) => {
    loading.value = true
    try {
      setting.value = await settingService.updateSetting(data)
    } finally {
      loading.value = false
    }
  }

  const upsertSetting = async (data: Partial<Setting>) => {
    loading.value = true
    try {
      setting.value = await settingService.upsertSetting(data)
    } finally {
      loading.value = false
    }
  }

  return { setting, loading, getSetting, updateSetting, upsertSetting }
})
