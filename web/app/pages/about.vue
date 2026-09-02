<script setup lang="ts">
useSeoMeta({ title: 'درباره ما — روزر' })
</script>

<template>
  <UPage>
    <UPageBody>
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'درباره ما', to: '/about' }
        ]"
      />

      <AboutContent />

      <UPageCTA
        title="آماده خرید هستید؟"
        description="بهترین محصولات الکترونیک را از روزر بخرید"
        :links="[
          { label: 'مشاهده فروشگاه', to: '/shop', icon: 'i-lucide-store' },
          { label: 'تماس', to: '/contact', color: 'neutral', variant: 'subtle', trailingIcon: 'i-lucide-arrow-left' }
        ]"
      />
    </UPageBody>
  </UPage>
</template>
