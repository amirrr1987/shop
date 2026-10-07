<script setup lang="ts">
import { faqPageJsonLd } from '~/utils/json-ld'

const settings = useStoreSettingsState()

const items = [
  {
    label: 'چطور سفارش ثبت کنم؟',
    content:
      'محصول را به سبد اضافه کنید، در چک‌اوت آدرس و روش ارسال را انتخاب کنید و پرداخت را تکمیل کنید. پس از پرداخت موفق، وضعیت سفارش در حساب کاربری به‌روز می‌شود.',
  },
  {
    label: 'هزینه و زمان ارسال چقدر است؟',
    content:
      'هزینه ارسال قبل از پرداخت در چک‌اوت نمایش داده می‌شود و بسته به روش ارسال و مقصد متفاوت است. جزئیات روش‌ها در صفحهٔ نحوه ارسال آمده است؛ پس از آماده‌سازی، کد رهگیری در جزئیات سفارش ثبت می‌شود.',
  },
  {
    label: 'آیا می‌توانم سفارش را لغو یا مرجوع کنم؟',
    content:
      'سفارش پرداخت‌نشده معمولاً قابل لغو است. برای کالای تحویل‌شده، شرایط مرجوعی را در صفحهٔ مربوط ببینید و در صورت نیاز از تماس با ما اقدام کنید.',
  },
  {
    label: 'چطور اصالت کالا تضمین می‌شود؟',
    content:
      'کالاها از مسیر تأمین فروشگاه عرضه می‌شوند. جزئیات گارانتی یا شرایط هر محصول در صفحهٔ همان کالا یا فاکتور سفارش درج می‌شود.',
  },
  {
    label: 'چطور وضعیت سفارشم را پیگیری کنم؟',
    content:
      'پس از ورود به حساب کاربری، از بخش سفارش‌ها وضعیت و کد رهگیری را ببینید. اگر مهمان خرید کرده‌اید، لینک پیگیری ایمیل سفارش را استفاده کنید.',
  },
  {
    label: 'روش‌های پرداخت چیست؟',
    content:
      'پرداخت آنلاین از طریق درگاه امن انجام می‌شود. در محیط توسعه ممکن است درگاه آزمایشی فعال باشد؛ در تولید فقط درگاه واقعی استفاده می‌شود.',
  },
]

useStaticPageSeo(() => ({
  title: 'سوالات متداول',
  description: `پاسخ پرسش‌های رایج درباره خرید از ${settings.value.shopName}`,
  path: '/faq',
  type: 'FAQPage',
  extraJsonLd: faqPageJsonLd(items),
}))
</script>

<template>
  <UContainer class="mx-auto max-w-3xl space-y-8 py-10">
    <div class="space-y-2">
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'سوالات متداول' },
        ]"
      />
      <h1 class="text-2xl font-semibold text-highlighted">
        سوالات متداول
      </h1>
      <p class="text-muted text-sm">
        اگر پاسخ را پیدا نکردید، از صفحهٔ
        <NuxtLink
          to="/contact"
          class="text-highlighted underline"
        >
          تماس با ما
        </NuxtLink>
        پیام بگذارید.
      </p>
    </div>

    <UAccordion
      :items="items"
      type="multiple"
      trailing-icon="i-lucide-chevron-down"
    />

    <div class="flex flex-wrap gap-2">
      <UButton
        to="/shipping"
        label="نحوه ارسال"
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
        to="/terms"
        label="قوانین"
        color="neutral"
        variant="soft"
      />
      <UButton
        to="/account/orders"
        label="پیگیری سفارش"
        color="neutral"
        variant="soft"
      />
    </div>
  </UContainer>
</template>
