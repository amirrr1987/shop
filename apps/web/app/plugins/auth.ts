export default defineNuxtPlugin({
  name: 'auth',
  enforce: 'pre',
  async setup() {
    const { user, fetchMe } = useAuth()
    if (!user.value) {
      await fetchMe()
    }
  },
})
