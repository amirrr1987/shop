<script setup lang="ts">
import { products } from '~/data/products'

const ctaUi = {
  root: 'rounded-lg ring-1 ring-default',
  title: 'text-xl sm:text-2xl'
}
</script>

<template>
  <HomeHeroCarousel />

  <UContainer class="space-y-10 py-6 sm:space-y-12 sm:py-8">
    <HomeFeatureTabSection />
    <HomeSalesChart />
    <HomeCategoryTabSection />
    <HomePromoBanners />
    <HomeCategoriesCarousel />

    <HomeProductSection
      headline="پیشنهاد"
      title="محصولات پیشنهادی"
      shop-link="/shop"
      :products="products.slice(4, 10)"
    />

    <UPageCTA
      title="عضویت در خبرنامه"
      description="از تخفیف‌ها و محصولات جدید باخبر شوید"
      :links="[
        { label: 'تماس با ما', to: '/contact', icon: 'i-lucide-mail' },
        { label: 'درباره روزر', to: '/about', color: 'neutral', variant: 'outline', trailingIcon: 'i-lucide-arrow-left' }
      ]"
      :ui="ctaUi"
    />
  </UContainer>
</template>
