<script setup lang="ts">
import type { ShippingMethod } from '@shop/shared'
import { howToJsonLd } from '~/utils/json-ld'

const api = useApi()
const settings = useStoreSettingsState()
const { formatPrice } = useCurrency()

const { data: methods } = await useAsyncData('shipping-methods-public', () =>
  api<ShippingMethod[]>('/shipping-methods'),
)

const shop = computed(() => settings.value.shopName || 'فروشگاه')

const steps = [
  {
    name: 'ثبت سفارش',
    text: 'محصولات را به سبد اضافه کنید و وارد تسویه حساب شوید.',
  },
  {
    name: 'انتخاب روش ارسال',
    text: 'در چک‌اوت یکی از روش‌های فعال را انتخاب کنید؛ هزینه و زمان تقریبی همان‌جا نمایش داده می‌شود.',
  },
  {
    name: 'پرداخت و آماده‌سازی',
    text: 'پس از پرداخت موفق، سفارش وارد آماده‌سازی می‌شود و سپس به پیک یا پست تحویل داده می‌شود.',
  },
  {
    name: 'پیگیری',
    text: 'کد رهگیری در جزئیات سفارش ثبت می‌شود؛ در صورت نیاز با پشتیبانی تماس بگیرید.',
  },
]

const description = computed(
  () =>
    `روش‌های ارسال و زمان تحویل در ${shop.value}. هزینه نهایی قبل از پرداخت در چک‌اوت مشخص می‌شود.`,
)

useStaticPageSeo(() => ({
  title: 'نحوه ارسال',
  description: description.value,
  path: '/shipping',
  extraJsonLd: howToJsonLd({
    name: `ارسال سفارش از ${shop.value}`,
    description: description.value,
    steps,
  }),
}))

function methodMeta(method: ShippingMethod) {
  const days =
    method.estimatedDays <= 0
      ? 'ارسال در همان روز کاری (در صورت امکان)'
      : `حدود ${method.estimatedDays} روز کاری`
  const price =
    method.price === 0 ? 'رایگان' : formatPrice(method.price)
  const free =
    method.freeAbove != null && method.freeAbove > 0
      ? ` — ارسال رایگان بالای ${formatPrice(method.freeAbove)}`
      : ''
  return { days, price, free }
}
</script>

<template>
  <UContainer class="mx-auto max-w-3xl space-y-10 py-10">
    <div class="space-y-2">
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'نحوه ارسال' },
        ]"
      />
      <h1 class="text-2xl font-semibold text-highlighted">
        نحوه ارسال
      </h1>
      <p class="text-muted text-sm leading-relaxed">
        {{ description }}
      </p>
    </div>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-highlighted">
        مراحل ارسال
      </h2>
      <ol class="space-y-3">
        <li
          v-for="(step, index) in steps"
          :key="step.name"
          class="border-default bg-elevated rounded-lg border p-4"
        >
          <p class="text-highlighted font-medium">
            {{ index + 1 }}. {{ step.name }}
          </p>
          <p class="text-muted mt-1 text-sm leading-relaxed">
            {{ step.text }}
          </p>
        </li>
      </ol>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-highlighted">
        روش‌های فعال
      </h2>
      <div
        v-if="methods?.length"
        class="space-y-3"
      >
        <article
          v-for="method in methods"
          :key="method.id"
          class="border-default rounded-lg border p-4"
        >
          <h3 class="text-highlighted font-medium">
            {{ method.name }}
          </h3>
          <p
            v-if="method.description"
            class="text-muted mt-1 text-sm leading-relaxed"
          >
            {{ method.description }}
          </p>
          <p class="text-muted mt-2 text-sm">
            {{ methodMeta(method).days }}
            ·
            هزینه پایه: {{ methodMeta(method).price }}{{ methodMeta(method).free }}
          </p>
        </article>
      </div>
      <p
        v-else
        class="text-muted text-sm"
      >
        فعلاً روش ارسال فعالی ثبت نشده است. در چک‌اوت گزینه‌های موجود نمایش داده می‌شود.
      </p>
    </section>

    <div class="flex flex-wrap gap-2">
      <UButton
        to="/faq"
        label="سوالات متداول"
        color="neutral"
        variant="soft"
      />
      <UButton
        to="/returns"
        label="شرایط مرجوعی"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="/contact"
        label="تماس با ما"
        color="neutral"
        variant="ghost"
      />
    </div>
  </UContainer>
</template>
