<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
    <AppProductModal />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'no-js',
    lang: 'fa',
    dir: 'rtl',
  },
  title: 'روزر – فروشگاه اینترنتی',
  link: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: '/assets/images/favicon/favicon.png',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap',
    },
    { rel: 'stylesheet', href: '/assets/css/vendor/vendor.min.css' },
    { rel: 'stylesheet', href: '/assets/css/plugins/plugins.min.css' },
    { rel: 'stylesheet', href: '/assets/css/style.min.css' },
  ],
  script: [
    { src: '/assets/js/vendor/vendor.min.js', tagPosition: 'bodyClose' },
    { src: '/assets/js/plugins/plugins.min.js', tagPosition: 'bodyClose' },
    { src: '/assets/js/main.js', tagPosition: 'bodyClose' },
  ],
})
</script>

<style>
body,
button,
input,
select,
textarea {
  font-family: "Vazirmatn", "Open Sans", Tahoma, sans-serif;
}
</style>
