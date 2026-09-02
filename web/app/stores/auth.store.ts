import { defineStore } from 'pinia'
import type { IUserProfile } from '~/models/auth.model'
import { STORAGE_KEYS } from '~/constants/storage-keys'
import { ssrSafeStorage } from '~/utils/storage'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<IUserProfile | null>(
    STORAGE_KEYS.authUser,
    null,
    ssrSafeStorage
  )
  const rememberedEmail = useLocalStorage(STORAGE_KEYS.rememberEmail, '', ssrSafeStorage)

  const isLoggedIn = computed(() => !!user.value)

  function login(email: string, _password: string) {
    user.value = {
      firstName: 'کاربر',
      lastName: 'روزر',
      email,
      phone: '09123456789'
    }
    useToast().add({
      title: 'ورود موفق',
      icon: 'i-lucide-log-in',
      color: 'success'
    })
  }

  function register(payload: { email: string, firstName?: string, lastName?: string }) {
    user.value = {
      firstName: payload.firstName || 'کاربر',
      lastName: payload.lastName || 'جدید',
      email: payload.email,
      phone: ''
    }
    useToast().add({
      title: 'ثبت‌نام موفق',
      icon: 'i-lucide-user-plus',
      color: 'success'
    })
  }

  function logout() {
    user.value = null
    useToast().add({
      title: 'خروج از حساب',
      icon: 'i-lucide-log-out',
      color: 'neutral'
    })
  }

  function updateProfile(profile: Partial<IUserProfile>) {
    if (!user.value) return
    user.value = { ...user.value, ...profile }
    useToast().add({
      title: 'اطلاعات ذخیره شد',
      icon: 'i-lucide-save',
      color: 'success'
    })
  }

  function setRememberedEmail(email: string) {
    rememberedEmail.value = email
  }

  function clearRememberedEmail() {
    rememberedEmail.value = ''
  }

  return {
    user,
    rememberedEmail,
    isLoggedIn,
    login,
    register,
    logout,
    updateProfile,
    setRememberedEmail,
    clearRememberedEmail
  }
})
