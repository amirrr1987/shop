import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth.store'

export type { IUserProfile as UserProfile } from '~/models/auth.model'

export function useAuth() {
  const store = useAuthStore()
  const { user, rememberedEmail, isLoggedIn } = storeToRefs(store)
  const { login, register, logout, updateProfile, setRememberedEmail, clearRememberedEmail } = store
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
}
