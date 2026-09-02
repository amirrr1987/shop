<script setup lang="ts">
import ShopSwiper from '~/components/ShopSwiper.vue'
import type { Product } from '~/types/shop'
import { getFeatureTabProducts, homeFeatureTabs } from '~/data/home-tabs'

const tabItems = homeFeatureTabs.map(t => ({
  label: t.label,
  icon: t.icon,
  slot: t.slot
}))
</script>

<template>
  <UPageSection
    headline="محصولات"
    title="جدید / پرفروش / ویژه"
    :links="[{ label: 'فروشگاه', to: '/shop', trailingIcon: 'i-lucide-arrow-left' }]"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl'
    }"
  >
    <UTabs :items="tabItems">
      <template #new>
        <ShopSwiper
          :items="getFeatureTabProducts('new')"
          autoplay
        >
          <template #default="{ item }: { item: Product }">
            <ProductCard :product="item" />
          </template>
        </ShopSwiper>
      </template>

      <template #best>
        <ShopSwiper :items="getFeatureTabProducts('best')">
          <template #default="{ item }: { item: Product }">
            <ProductCard :product="item" />
          </template>
        </ShopSwiper>
      </template>

      <template #featured>
        <ShopSwiper :items="getFeatureTabProducts('featured')">
          <template #default="{ item }: { item: Product }">
            <ProductCard :product="item" />
          </template>
        </ShopSwiper>
      </template>
    </UTabs>
  </UPageSection>
</template>
