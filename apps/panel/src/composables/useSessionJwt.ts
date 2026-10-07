import { computed } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from '@/stores/auth'

type SessionPayload = {
  sub?: string
  email?: string
  exp?: number
}

/** Decodes the in-memory access token returned by login (cookie remains httpOnly). */
export function useSessionJwt() {
  const auth = useAuthStore()
  const encoded = computed(() => auth.accessToken ?? '')
  const { payload } = useJwt<SessionPayload>(encoded)

  const expiresAt = computed(() =>
    payload.value?.exp ? new Date(payload.value.exp * 1000) : null,
  )

  const isExpired = computed(() => {
    if (!payload.value?.exp) {
      return false
    }
    return Date.now() >= payload.value.exp * 1000
  })

  return {
    payload,
    expiresAt,
    isExpired,
  }
}
