<script setup lang="ts">
const { isLoggedIn } = useAuth()

useSeoMeta({ title: 'ورود / ثبت‌نام — روزر' })

watch(isLoggedIn, (value) => {
  if (value) navigateTo('/account')
}, { immediate: true })
</script>

<template>
  <UPage>
    <UPageBody>
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'ورود', to: '/login' }
        ]"
      />

      <LoginRegisterForm />
    </UPageBody>
  </UPage>
</template>
