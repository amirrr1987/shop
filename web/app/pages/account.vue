<script setup lang="ts">
useSeoMeta({ title: 'حساب من — روزر' })
</script>

<template>
  <UPage>
    <UPageBody>
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'حساب من', to: '/account' }
        ]"
      />

      <UPageHeader
        title="حساب کاربری"
        description="مدیریت اطلاعات و سفارشات"
      />

      <AccountPanel />
    </UPageBody>
  </UPage>
</template>
