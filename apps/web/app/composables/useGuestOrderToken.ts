const STORAGE_PREFIX = 'guest-order-token:'

export function useGuestOrderToken() {
  function save(orderId: string, token: string) {
    if (!import.meta.client || !orderId || !token) {
      return
    }
    try {
      sessionStorage.setItem(`${STORAGE_PREFIX}${orderId}`, token)
    } catch {
      // ignore quota / private mode
    }
  }

  function read(orderId: string): string | null {
    if (!import.meta.client || !orderId) {
      return null
    }
    try {
      return sessionStorage.getItem(`${STORAGE_PREFIX}${orderId}`)
    } catch {
      return null
    }
  }

  function clear(orderId: string) {
    if (!import.meta.client || !orderId) {
      return
    }
    try {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${orderId}`)
    } catch {
      // ignore
    }
  }

  return { save, read, clear }
}
