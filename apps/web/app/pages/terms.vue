<script setup lang="ts">
const settings = useStoreSettingsState()

useStaticPageSeo(() => ({
  title: 'قوانین و شرایط',
  description: `قوانین استفاده از ${settings.value.shopName}`,
  path: '/terms',
}))
</script>

<template>
  <UContainer class="prose prose-neutral dark:prose-invert max-w-3xl py-10">
    <UBreadcrumb
      :items="[
        { label: 'خانه', to: '/' },
        { label: 'قوانین و شرایط' },
      ]"
      class="not-prose mb-6"
    />
    <h1>قوانین و شرایط</h1>
    <p>
      با ثبت‌نام و ثبت سفارش در {{ settings.shopName }} می‌پذیرید که اطلاعات صحیح وارد کنید،
      موجودی و قیمت نهایی در لحظهٔ پرداخت ملاک است، و سفارش پس از تأیید پرداخت وارد فرایند ارسال می‌شود.
    </p>
    <ul>
      <li>کاربر مسئول حفظ امنیت حساب خود است.</li>
      <li>استفادهٔ سوء از کوپن یا درگاه پرداخت منجر به لغو سفارش می‌شود.</li>
      <li>قوانین مرجوعی در صفحهٔ جداگانه توضیح داده شده است.</li>
    </ul>
    <p>
      <NuxtLink to="/returns">شرایط مرجوعی</NuxtLink>
    </p>
  </UContainer>
</template>
