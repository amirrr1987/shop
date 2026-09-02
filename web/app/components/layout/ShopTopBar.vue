<script setup lang="ts">
import { settingMenuItems } from '~/data/navigation'
</script>

<template>
  <UBanner
    id="rozer-promo"
    icon="i-lucide-truck"
    title="ارسال ۱ تا ۳ روز کاری — ضمانت اصالت — پشتیبانی (+800) 345678"
    color="primary"
    close
    :ui="{
      root: 'border-b border-primary/20',
      container: 'h-10 gap-2 sm:h-11',
      center: 'min-w-0 flex-1 justify-center lg:justify-start',
      icon: 'size-4 shrink-0 sm:size-5',
      title: 'truncate text-xs font-medium sm:text-sm',
      actions: 'hidden shrink-0 sm:flex',
      close: 'shrink-0 text-inverted hover:bg-default/10 focus-visible:bg-default/10'
    }"
  >
    <template #actions>
      <UButton
        label="فروشگاه"
        to="/shop"
        icon="i-lucide-store"
        color="neutral"
        variant="ghost"
        size="xs"
        :ui="{ base: 'text-inverted hover:bg-default/10' }"
      />

      <UDropdownMenu :items="settingMenuItems">
        <UButton
          label="حساب"
          color="neutral"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-down"
          :ui="{ base: 'text-inverted hover:bg-default/10' }"
        />
      </UDropdownMenu>
    </template>
  </UBanner>
</template>
