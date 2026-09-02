<script setup lang="ts">
import type { Product } from '~/types/shop'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <UPageList
    :ui="{
      base: 'divide-y divide-default rounded-lg ring-1 ring-default'
    }"
  >
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </UPageList>
</template>
