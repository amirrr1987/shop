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
    <HomeServiceFeatures />
    <HomeSalesChart />
    <HomeCategoriesCarousel />
    <HomeCategoryTabSection />
    <HomePromoBanners />

    <HomeProductSection
      headline="محصولات"
      title="محصولات ویژه"
      shop-link="/shop"
      :products="products.slice(0, 6)"
    />

    <HomeProductSection
      headline="جدید"
      title="جدیدترین محصولات"
      shop-link="/shop?sort=new"
      :products="products.slice(2, 8)"
    />

    <UPageCTA
      title="پیشنهاد ویژه امروز"
      description="تخفیف‌های محدود روی محصولات منتخب"
      :links="[
        { label: 'مشاهده فروشگاه', to: '/shop', icon: 'i-lucide-store' },
        { label: 'وبلاگ', to: '/blog', color: 'neutral', variant: 'outline', trailingIcon: 'i-lucide-arrow-left' }
      ]"
      :ui="ctaUi"
    />
  </UContainer>
</template>
