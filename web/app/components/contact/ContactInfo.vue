<script setup lang="ts">
const contacts = [
  {
    icon: 'i-lucide-phone',
    title: 'تلفن',
    description: '(+800) 345678',
    to: 'tel:+800345678'
  },
  {
    icon: 'i-lucide-mail',
    title: 'ایمیل',
    description: 'support@rozer.ir',
    to: 'mailto:support@rozer.ir'
  },
  {
    icon: 'i-lucide-map-pin',
    title: 'آدرس',
    description: 'تهران، خیابان ولیعصر، پلاک ۱۲۱'
  },
  {
    icon: 'i-lucide-clock',
    title: 'ساعات پاسخگویی',
    description: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸'
  }
]

const socialLinks = [
  { icon: 'i-simple-icons-instagram', label: 'اینستاگرام', to: '#' },
  { icon: 'i-simple-icons-telegram', label: 'تلگرام', to: '#' },
  { icon: 'i-simple-icons-x', label: 'ایکس', to: '#' },
  { icon: 'i-simple-icons-aparat', label: 'آپارات', to: '#' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold tracking-tight text-highlighted">
        راه‌های ارتباطی
      </h2>
      <p class="text-sm leading-relaxed text-muted">
        از طریق تلفن، ایمیل یا شبکه‌های اجتماعی با ما در تماس باشید.
      </p>
    </div>

    <UPageGrid
      :ui="{
        base: 'grid grid-cols-2! gap-4'
      }"
    >
      <UPageCard
        v-for="item in contacts"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :to="item.to"
        variant="subtle"
        :ui="{
          root: 'transition-colors hover:bg-elevated',
          container: 'p-4 sm:p-5',
          leadingIcon: 'size-5 text-primary',
          title: 'text-sm font-semibold',
          description: 'text-sm text-muted'
        }"
      />
    </UPageGrid>

    <UAlert
      color="primary"
      variant="soft"
      icon="i-lucide-headset"
      title="پشتیبانی خرید"
      description="برای پیگیری سفارش یا مشکل فنی، مستقیم تماس بگیرید."
      :ui="{
        root: 'ring-1 ring-primary/15',
        title: 'text-sm font-semibold',
        description: 'text-xs text-muted'
      }"
    />
    <USeparator />

    <div class="space-y-3">
      <p class="text-xs font-medium uppercase tracking-wide text-muted">
        شبکه‌های اجتماعی
      </p>
      <div class="flex flex-wrap gap-1">
        <UButton
          v-for="link in socialLinks"
          :key="link.label"
          :to="link.to"
          :icon="link.icon"
          :aria-label="link.label"
          color="neutral"
          variant="ghost"
          square
          :ui="{ base: 'size-9' }"
        />
      </div>
    </div>
  </div>
</template>
