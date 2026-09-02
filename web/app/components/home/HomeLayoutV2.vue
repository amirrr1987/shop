<script setup lang="ts">
import { products } from '~/data/products'
import { promoBanners } from '~/data/home'

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

    <UPageSection
      headline="پیشنهاد"
      title="بنر ویژه"
      :ui="{ root: 'space-y-6', title: 'text-xl sm:text-2xl' }"
    >
      <ULink
        :to="promoBanners[0].to"
        class="group block overflow-hidden rounded-lg ring-1 ring-default transition-shadow hover:ring-primary/40"
      >
        <NuxtImg
          :src="promoBanners[0].image"
          :alt="promoBanners[0].alt"
          width="1200"
          height="400"
          loading="lazy"
          class="aspect-21/9 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </ULink>
    </UPageSection>

    <HomeCategoryTabSection />

    <HomeProductSection
      headline="محصولات"
      title="محصولات برتر"
      shop-link="/shop?sort=best"
      :products="products.slice(0, 6)"
    />

    <UPageCTA
      title="فروش ویژه آخر هفته"
      description="تخفیف تا ۳۰٪ روی محصولات منتخب"
      :links="[
        { label: 'خرید کنید', to: '/shop?sort=sale', icon: 'i-lucide-shopping-bag' },
        { label: 'مقایسه محصولات', to: '/compare', color: 'neutral', variant: 'outline', trailingIcon: 'i-lucide-git-compare' }
      ]"
      :ui="ctaUi"
    />
  </UContainer>
</template>
