export default defineNuxtRouteMiddleware(async () => {
  const { user, fetchMe } = useAuth()

  if (!user.value) {
    await fetchMe()
  }

  if (user.value) {
    return navigateTo('/account')
  }
})
