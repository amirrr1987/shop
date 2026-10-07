<script setup lang="ts">
const settings = useStoreSettingsState()

useStaticPageSeo(() => ({
  title: 'حریم خصوصی',
  description: `سیاست حریم خصوصی ${settings.value.shopName}`,
  path: '/privacy',
}))
</script>

<template>
  <UContainer class="prose prose-neutral dark:prose-invert max-w-3xl py-10">
    <UBreadcrumb
      :items="[
        { label: 'خانه', to: '/' },
        { label: 'حریم خصوصی' },
      ]"
      class="not-prose mb-6"
    />
    <h1>حریم خصوصی</h1>
    <p>
      اطلاعات حساب، آدرس و سفارش‌های شما فقط برای پردازش خرید و پشتیبانی استفاده می‌شود
      و بدون اجازهٔ شما در اختیار شخص ثالث قرار نمی‌گیرد؛ مگر در موارد الزام قانونی.
    </p>
    <ul>
      <li>رمز عبور به‌صورت درهم‌سازی‌شده ذخیره می‌شود.</li>
      <li>پرداخت از طریق درگاه امن انجام می‌شود.</li>
      <li>می‌توانید درخواست اصلاح یا حذف داده‌های حساب را از پشتیبانی بخواهید.</li>
    </ul>
    <p v-if="settings.supportEmail">
      تماس حریم خصوصی:
      <a :href="`mailto:${settings.supportEmail}`">{{ settings.supportEmail }}</a>
    </p>
  </UContainer>
</template>
