import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { LoginInput, PublicUser } from '@shop/shared'
import { isPanelRole } from '@shop/shared'
import { updateAbility } from '@/ability'
import { api, setAccessToken, setAccessTokenListener } from '@/api/client'

const TOKEN_KEY = 'shop-panel-token'

type AuthUserResponse = {
  user: PublicUser
  accessToken?: string
}

function readStoredToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<PublicUser | null>(null)
  const accessToken = ref<string | null>(readStoredToken())
  const ready = ref(false)

  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(
    () => user.value?.role === 'admin' || user.value?.role === 'owner',
  )
  const canAccessPanel = computed(
    () => user.value != null && isPanelRole(user.value.role),
  )

  setAccessToken(accessToken.value)
  setAccessTokenListener((token) => {
    accessToken.value = token
    if (!token) {
      user.value = null
      updateAbility(null)
    }
  })

  watch(accessToken, (token) => {
    setAccessToken(token)
    try {
      if (token) {
        sessionStorage.setItem(TOKEN_KEY, token)
      } else {
        sessionStorage.removeItem(TOKEN_KEY)
      }
    } catch {
      // ignore storage errors
    }
  })

  function applyUser(next: PublicUser | null, token?: string | null) {
    user.value = next
    if (token !== undefined) {
      accessToken.value = token
    }
    updateAbility(next)
  }

  async function fetchMe() {
    try {
      const response = await api<AuthUserResponse>('/auth/me')
      applyUser(response.user)
    } catch {
      applyUser(null, null)
    } finally {
      ready.value = true
    }
  }

  async function login(input: LoginInput) {
    const response = await api<AuthUserResponse>('/auth/login', {
      method: 'POST',
      body: input,
    })
    applyUser(response.user, response.accessToken ?? null)
    ready.value = true
    return response.user
  }

  async function logout() {
    try {
      await api('/auth/logout', { method: 'POST' })
    } finally {
      applyUser(null, null)
    }
  }

  return {
    user,
    accessToken,
    ready,
    isAuthenticated,
    isAdmin,
    canAccessPanel,
    fetchMe,
    login,
    logout,
  }
})
