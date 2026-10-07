<script setup lang="ts">
const settings = useStoreSettingsState()

useStaticPageSeo(() => ({
  title: 'شرایط مرجوعی',
  description: `مرجوعی کالا در ${settings.value.shopName}`,
  path: '/returns',
}))
</script>

<template>
  <UContainer class="prose prose-neutral dark:prose-invert max-w-3xl py-10">
    <UBreadcrumb
      :items="[
        { label: 'خانه', to: '/' },
        { label: 'شرایط مرجوعی' },
      ]"
      class="not-prose mb-6"
    />
    <h1>شرایط مرجوعی</h1>
    <p>
      کالای سالم و استفاده‌نشده معمولاً تا ۷ روز پس از تحویل با هماهنگی پشتیبانی قابل مرجوعی است.
      کالای آسیب‌دیده در حمل‌ونقل را حداکثر ۴۸ ساعت پس از دریافت گزارش کنید.
    </p>
    <ul>
      <li>بسته‌بندی اصلی و لوازم جانبی باید کامل باشد.</li>
      <li>کالای بهداشتی یا سفارشی ممکن است مشمول مرجوعی نباشد.</li>
      <li>پس از تأیید، مبلغ طبق سیاست درگاه/فروشگاه بازمی‌گردد.</li>
    </ul>
    <p>
      برای شروع مرجوعی از
      <NuxtLink to="/contact">تماس با ما</NuxtLink>
      اقدام کنید
      <template v-if="settings.supportPhone">
        یا با {{ settings.supportPhone }} تماس بگیرید.
      </template>
      جزئیات ارسال را در
      <NuxtLink to="/shipping">نحوه ارسال</NuxtLink>
      ببینید.
    </p>
  </UContainer>
</template>
