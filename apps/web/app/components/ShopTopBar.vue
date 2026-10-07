<script setup lang="ts">
const settings = useStoreSettingsState()

const title = computed(() => {
  const phone = settings.value.supportPhone?.trim()
  const parts = [
    'ارسال مطمئن',
    'ضمانت اصالت',
    'پرداخت امن',
    phone ? `پشتیبانی ${phone}` : 'پشتیبانی پاسخ‌گو',
  ]
  return parts.join(' — ')
})
</script>

<template>
  <UBanner
    id="shop-promo-topbar"
    icon="i-lucide-truck"
    :title="title"
    color="primary"
    close
    :actions="[
      {
        label: 'نحوه ارسال',
        to: '/shipping',
        icon: 'i-lucide-package',
        color: 'neutral',
        variant: 'ghost',
        size: 'xs',
        class: 'text-inverted hover:bg-default/10',
      },
      {
        label: 'محصولات',
        to: '/products',
        icon: 'i-lucide-store',
        color: 'neutral',
        variant: 'ghost',
        size: 'xs',
        class: 'text-inverted hover:bg-default/10',
      },
    ]"
    :ui="{
      root: 'border-b border-primary/20',
      container: 'h-10 gap-2 sm:h-11',
      center: 'min-w-0 flex-1 justify-center lg:justify-start',
      icon: 'size-4 shrink-0 sm:size-5',
      title: 'truncate text-xs font-medium sm:text-sm',
      actions: 'hidden shrink-0 sm:flex',
      close: 'shrink-0',
    }"
  />
</template>
