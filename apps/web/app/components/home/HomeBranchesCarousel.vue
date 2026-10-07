<script setup lang="ts">
import type { StoreBranch } from '@shop/shared'

const props = defineProps<{
  branches: StoreBranch[]
}>()

const items = computed(() => props.branches)
const multi = computed(() => items.value.length > 1)
</script>

<template>
  <section
    v-if="items.length"
    class="space-y-4"
  >
    <h2 class="text-highlighted text-xl font-semibold">
      شعب حضوری
    </h2>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="multi"
      :autoplay="multi ? { delay: 5500, stopOnInteraction: true } : false"
      :ui="{
        item: 'basis-[85%] ps-3 sm:basis-1/2 lg:basis-1/3',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <div class="border-default h-full space-y-2 rounded-lg border p-4">
        <h3 class="text-highlighted font-medium">
          {{ item.name }}
        </h3>
        <p class="text-muted text-sm">
          {{ item.address }}
        </p>
        <p
          v-if="item.phone"
          class="text-sm"
        >
          <a
            :href="`tel:${item.phone}`"
            class="text-highlighted hover:underline"
          >{{ item.phone }}</a>
        </p>
        <p
          v-if="item.hours"
          class="text-muted text-sm"
        >
          {{ item.hours }}
        </p>
        <UButton
          v-if="item.mapUrl"
          :to="item.mapUrl"
          label="مشاهده روی نقشه"
          color="neutral"
          variant="ghost"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </UCarousel>
  </section>
</template>
