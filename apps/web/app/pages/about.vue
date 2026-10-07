<script setup lang="ts">
const settings = useStoreSettingsState()

useStaticPageSeo(() => {
  const name = settings.value.shopName || 'فروشگاه'
  return {
    title: `درباره ${name}`,
    description: `آشنایی با ${name}`,
    path: '/about',
    type: 'AboutPage',
  }
})
</script>

<template>
  <UContainer class="prose prose-neutral dark:prose-invert max-w-3xl py-10">
    <UBreadcrumb
      :items="[
        { label: 'خانه', to: '/' },
        { label: 'درباره ما' },
      ]"
      class="not-prose mb-6"
    />
    <h1>درباره ما</h1>
    <p>
      {{ settings.shopName }} یک فروشگاه آنلاین برای خرید آسان و مطمئن است.
      هدف ما ارائهٔ کالای باکیفیت، ارسال به‌موقع و پشتیبانی پاسخ‌گوست.
    </p>
    <p>
      اگر پرسشی دارید از صفحهٔ
      <NuxtLink to="/contact">تماس با ما</NuxtLink>
      پیام بفرستید.
    </p>
  </UContainer>
</template>
