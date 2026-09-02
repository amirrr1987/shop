<script setup lang="ts">
import ShopSwiper from '~/components/ShopSwiper.vue'
import type { Product } from '~/types/shop'

defineProps<{
  title: string
  products: Product[]
  headline?: string
  shopLink?: string
}>()
</script>

<template>
  <UPageSection
    :headline="headline"
    :title="title"
    :links="shopLink ? [{ label: 'مشاهده همه', to: shopLink, trailingIcon: 'i-lucide-arrow-left' }] : undefined"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl'
    }"
  >
    <ShopSwiper
      :items="products"
      autoplay
    >
      <template #default="{ item }: { item: Product }">
        <ProductCard :product="item" />
      </template>
    </ShopSwiper>
  </UPageSection>
</template>
