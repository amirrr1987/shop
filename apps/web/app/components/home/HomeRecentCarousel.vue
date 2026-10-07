<script setup lang="ts">
import type { RecentProduct } from '~/composables/useRecentlyViewed'

const props = defineProps<{
  items: RecentProduct[]
}>()

const multi = computed(() => props.items.length > 2)
</script>

<template>
  <section
    v-if="items.length"
    class="space-y-4"
  >
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-highlighted text-xl font-semibold">
        اخیراً دیده‌اید
      </h2>
      <UButton
        to="/recent"
        label="همه"
        color="neutral"
        variant="ghost"
      />
    </div>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="false"
      :autoplay="multi ? { delay: 5200, stopOnInteraction: true } : false"
      :ui="{
        item: 'basis-[75%] ps-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <div class="h-full pe-1">
        <RecentProductCard :item="item" />
      </div>
    </UCarousel>
  </section>
</template>
