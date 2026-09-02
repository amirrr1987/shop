<script setup lang="ts">
import ShopSwiper from '~/components/ShopSwiper.vue'
import type { Product } from '~/types/shop'
import { products } from '~/data/products'

const props = defineProps<{
  product: Product
}>()

const related = computed(() =>
  products
    .filter(p => p.id !== props.product.id && p.category === props.product.category)
    .slice(0, 6)
)
</script>

<template>
  <UPageSection
    v-if="related.length"
    headline="محصولات"
    title="محصولات مرتبط"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl'
    }"
  >
    <ShopSwiper
      :items="related"
      autoplay
    >
      <template #default="{ item }: { item: Product }">
        <ProductCard :product="item" />
      </template>
    </ShopSwiper>
  </UPageSection>
</template>
