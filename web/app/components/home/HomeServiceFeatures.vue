<script setup lang="ts">
import { serviceFeatures } from '~/data/home'
</script>

<template>
  <UPageSection
    headline="خدمات"
    title="چرا روزر؟"
    description="خرید مطمئن با ارسال سریع، پشتیبانی واقعی و ضمانت اصالت کالا."
    :features="serviceFeatures.map(f => ({
      title: f.title,
      description: f.description,
      icon: f.icon
    }))"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl',
      description: 'text-base text-muted'
    }"
  />
</template>
