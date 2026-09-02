export default defineNuxtPlugin(() => {
  const { user } = storeToRefs(useAuthStore())
  const { setUser } = useMonitoring()

  watch(user, (profile) => {
    if (profile?.email) {
      setUser({
        id: profile.email,
        email: profile.email,
        username: [profile.firstName, profile.lastName].filter(Boolean).join(' ') || undefined
      })
      return
    }

    setUser(null)
  }, { immediate: true })
})
