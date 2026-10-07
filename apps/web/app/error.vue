<script setup lang="ts">
import type { NuxtError } from '#app'
import { fa_ir } from '@nuxt/ui/locale'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

const title = computed(() =>
  isNotFound.value ? 'صفحه پیدا نشد' : `خطا ${props.error.statusCode}`,
)

useSeoMeta({
  title: () => title.value,
  description: () =>
    isNotFound.value
      ? 'این صفحه وجود ندارد یا حذف شده است.'
      : 'خطایی رخ داد. به صفحه اصلی برگردید.',
  robots: 'noindex, nofollow',
})

useHead({
  htmlAttrs: { lang: 'fa-IR', dir: 'rtl' },
})
</script>

<template>
  <UApp :locale="fa_ir" dir="rtl">
    <UContainer class="py-20 text-center">
      <h1 class="text-2xl font-semibold text-highlighted">
        {{ isNotFound ? '۴۰۴' : error.statusCode }}
      </h1>
      <p class="mt-2 text-muted">
        {{ isNotFound ? 'صفحه پیدا نشد' : error.message }}
      </p>
      <UButton
        class="mt-6"
        to="/"
        label="بازگشت به خانه"
      />
    </UContainer>
  </UApp>
</template>
