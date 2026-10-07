<script setup lang="ts">
import type { RecentProduct } from '~/composables/useRecentlyViewed'

defineProps<{
  item: RecentProduct
}>()

const { formatPrice } = useCurrency()
</script>

<template>
  <NuxtLink
    :to="`/products/${item.slug}`"
    class="group block space-y-3"
  >
    <div class="bg-elevated aspect-square overflow-hidden rounded-lg">
      <ShopImage
        :src="item.image"
        :alt="item.name"
        :width="480"
        :height="480"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        img-class="size-full object-cover transition group-hover:scale-[1.02]"
      />
    </div>

    <div class="space-y-1">
      <h2 class="text-highlighted font-medium group-hover:underline">
        {{ item.name }}
      </h2>
      <div class="flex flex-wrap items-center gap-2">
        <p class="text-default">
          {{ formatPrice(item.price) }}
        </p>
        <UBadge
          v-if="item.isFeatured"
          label="ویژه"
          color="primary"
          variant="subtle"
          size="sm"
        />
      </div>
    </div>
  </NuxtLink>
</template>
