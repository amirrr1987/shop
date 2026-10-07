export default defineNuxtPlugin(() => {
  const { hydrate, mergeForUser } = useCart()
  const ready = useState('cart-storage-ready', () => false)
  const user = useState('auth-user')

  // After Vue hydration — localStorage must not change SSR HTML mid-hydrate.
  onNuxtReady(() => {
    hydrate()
    ready.value = true
    if (user.value) {
      void mergeForUser().catch(() => {
        // Keep local cart if server merge fails.
      })
    }
  })
})
