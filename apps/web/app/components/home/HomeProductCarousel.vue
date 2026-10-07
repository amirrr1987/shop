<script setup lang="ts">
import type { Product } from '@shop/shared'

const props = defineProps<{
  title: string
  to?: string
  products: Product[]
  pending?: boolean
}>()

const items = computed(() => props.products)
const multi = computed(() => items.value.length > 2)
</script>

<template>
  <section
    v-if="pending || items.length"
    class="space-y-4"
  >
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-highlighted text-xl font-semibold">
        {{ title }}
      </h2>
      <UButton
        v-if="to"
        :to="to"
        label="همه"
        color="neutral"
        variant="ghost"
      />
    </div>

    <div
      v-if="pending"
      class="flex gap-4 overflow-hidden"
    >
      <USkeleton
        v-for="n in 4"
        :key="n"
        class="aspect-square w-44 shrink-0 rounded-lg sm:w-52"
      />
    </div>

    <UCarousel
      v-else
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="false"
      :autoplay="multi ? { delay: 5000, stopOnInteraction: true } : false"
      :ui="{
        item: 'basis-[75%] ps-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <div class="h-full pe-1">
        <ProductCard :product="item" />
      </div>
    </UCarousel>
  </section>
</template>
