import type { Setting, UpdateSetting } from '@/models/setting.model'
import { axiosInstance } from './useAxios'

export const useSettingService = () => {
  const getSetting = async (): Promise<Setting | null> => {
    const response = await axiosInstance.get('/settings')
    return response.data
  }

  const updateSetting = async (setting: UpdateSetting): Promise<Setting> => {
    const response = await axiosInstance.patch('/settings', setting)
    return response.data
  }

  const upsertSetting = async (setting: Partial<Setting>): Promise<Setting> => {
    const response = await axiosInstance.patch('/settings', setting)
    return response.data
  }

  return { getSetting, updateSetting, upsertSetting }
}
