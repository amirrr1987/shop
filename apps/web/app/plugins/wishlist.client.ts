export default defineNuxtPlugin(() => {
  const { hydrate, mergeForUser } = useWishlist()
  const ready = useState('wishlist-storage-ready', () => false)
  const user = useState<{ id: string } | null>('auth-user')

  onNuxtReady(async () => {
    hydrate()
    ready.value = true
    if (!user.value) {
      return
    }
    try {
      await mergeForUser()
    } catch {
      // Keep local wishlist if server sync fails.
    }
  })
})
