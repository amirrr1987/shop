<script setup lang="ts">
import type { Product } from '~/types/shop'

const props = defineProps<{
  products: Product[]
  columns?: '3' | '4'
}>()

const { sidebar } = useShopCatalog()

const gridUi = computed(() => {
  const hasSidebar = sidebar.value !== 'none'
  const isThreeCol = props.columns === '3'

  if (isThreeCol) {
    return {
      base: hasSidebar
        ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
        : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  return {
    base: hasSidebar
      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
      : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
})
</script>

<template>
  <UPageGrid :ui="gridUi">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </UPageGrid>
</template>
