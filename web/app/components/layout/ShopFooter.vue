<script setup lang="ts">
import { footerColumns } from '~/data/navigation'

const trustFeatures = [
  {
    icon: 'i-lucide-truck',
    title: 'ارسال سریع',
    description: 'تحویل ۱ تا ۳ روز کاری'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'پرداخت امن',
    description: 'درگاه معتبر بانکی'
  },
  {
    icon: 'i-lucide-rotate-ccw',
    title: '۷ روز ضمانت',
    description: 'بازگشت بدون دردسر'
  }
]

const socialLinks = [
  { icon: 'i-simple-icons-instagram', label: 'اینستاگرام', to: '#' },
  { icon: 'i-simple-icons-telegram', label: 'تلگرام', to: '#' },
  { icon: 'i-simple-icons-x', label: 'ایکس', to: '#' },
  { icon: 'i-simple-icons-aparat', label: 'آپارات', to: '#' }
]

const paymentBadges = [
  { icon: 'i-lucide-credit-card', label: 'کارت بانکی' },
  { icon: 'i-lucide-wallet', label: 'کیف پول' },
  { icon: 'i-lucide-banknote', label: 'پرداخت در محل' }
]

function onNewsletterSubmit() {
  useToast().add({
    title: 'عضویت در خبرنامه',
    description: 'به‌زودی ایمیل تأیید برایتان ارسال می‌شود.',
    icon: 'i-lucide-mail-check',
    color: 'success'
  })
}
</script>

<template>
  <UFooter
    :ui="{
      root: 'border-t border-default bg-elevated/50',
      top: 'py-10 lg:py-14',
      container: 'gap-4 border-t border-default py-6 lg:flex lg:items-center lg:justify-between',
      left: 'flex flex-1 items-center justify-center lg:justify-start',
      right: 'flex flex-wrap items-center justify-center gap-2 lg:justify-end'
    }"
  >
    <template #top>
      <UContainer>
        <UFooterColumns
          :columns="footerColumns"
          :ui="{
            root: 'grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10',
            left: 'space-y-6 lg:col-span-12 xl:col-span-3',
            center: 'grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-12 lg:col-span-7 xl:col-span-5',
            right: 'space-y-6 lg:col-span-5 xl:col-span-4',
            label: 'text-sm font-semibold tracking-tight text-highlighted',
            list: 'mt-4 space-y-2',
            link: 'text-sm text-muted transition-colors hover:text-default'
          }"
        >
          <template #left>
            <div class="space-y-4">
              <ULink
                to="/"
                class="inline-flex items-center gap-2.5 text-xl font-bold text-highlighted transition-colors hover:text-primary"
              >
                <span class="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                  <UIcon
                    name="i-lucide-shopping-bag"
                    class="size-5 text-primary"
                  />
                </span>
                روزر
              </ULink>

              <p class="max-w-xs text-sm leading-relaxed text-muted">
                فروشگاه تخصصی لوازم الکترونیک؛ اصل بودن کالا، قیمت شفاف و پشتیبانی واقعی.
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <UPageFeature
                v-for="feature in trustFeatures"
                :key="feature.title"
                :icon="feature.icon"
                :title="feature.title"
                :description="feature.description"
                orientation="horizontal"
                :ui="{
                  root: 'gap-3 rounded-lg bg-default/60 p-3 ring-1 ring-default',
                  leadingIcon: 'size-4 text-primary',
                  title: 'text-xs font-semibold text-highlighted',
                  description: 'text-[11px] leading-snug text-muted'
                }"
              />
            </div>

            <UAlert
              color="primary"
              variant="soft"
              icon="i-lucide-headset"
              title="پشتیبانی خرید"
              description="(+800) 345678 — هر روز ۹ تا ۱۸"
              :ui="{
                root: 'max-w-sm ring-1 ring-primary/15',
                title: 'text-sm font-semibold',
                description: 'text-xs text-muted'
              }"
            />
          </template>

          <template #right>
            <div class="space-y-1">
              <h3 class="text-sm font-semibold tracking-tight text-highlighted">
                خبرنامه روزر
              </h3>
              <p class="text-sm leading-relaxed text-muted">
                اولین نفری باشید که از تخفیف‌ها و محصولات جدید باخبر می‌شوید.
              </p>
            </div>

            <UForm @submit.prevent="onNewsletterSubmit">
              <UFormField
                name="email"
                label="ایمیل"
                size="lg"
                :ui="{ label: 'text-sm font-medium text-default' }"
              >
                <UInput
                  type="email"
                  placeholder="email@example.com"
                  icon="i-lucide-mail"
                  class="w-full"
                  :ui="{ base: 'min-w-0' }"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      label="عضویت"
                      icon="i-lucide-send"
                      color="primary"
                      size="sm"
                    />
                  </template>
                </UInput>
              </UFormField>
            </UForm>

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
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-center text-sm text-muted lg:text-start">
        © ۱۴۰۵ روزر — ساخته شده با Nuxt UI
      </p>
    </template>

    <template #right>
      <div class="flex flex-wrap items-center justify-center gap-2">
        <UBadge
          v-for="badge in paymentBadges"
          :key="badge.label"
          color="neutral"
          variant="subtle"
          size="sm"
          :icon="badge.icon"
          :label="badge.label"
        />
      </div>
    </template>
  </UFooter>
</template>
