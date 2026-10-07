<script setup lang="ts">
import type { Brand } from '@shop/shared'

const props = defineProps<{
  brands: Brand[]
  pending?: boolean
}>()

const items = computed(() => props.brands)
const multi = computed(() => items.value.length > 3)
</script>

<template>
  <section
    v-if="pending || items.length"
    class="space-y-4"
  >
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-highlighted text-xl font-semibold">
        برندها
      </h2>
      <UButton
        to="/brands"
        label="همه"
        color="neutral"
        variant="ghost"
      />
    </div>

    <div
      v-if="pending"
      class="flex gap-3 overflow-hidden"
    >
      <USkeleton
        v-for="n in 5"
        :key="n"
        class="h-24 w-36 shrink-0 rounded-lg"
      />
    </div>

    <UCarousel
      v-else
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="false"
      :autoplay="multi ? { delay: 4200, stopOnInteraction: true } : false"
      :ui="{
        item: 'basis-[45%] ps-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <NuxtLink
        :to="`/brands/${item.slug}`"
        class="border-default bg-elevated hover:bg-accented flex h-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center transition"
      >
        <div
          v-if="item.ogImage"
          class="size-12 overflow-hidden rounded-md"
        >
          <ShopImage
            :src="item.ogImage"
            :alt="item.name"
            :width="48"
            :height="48"
            sizes="48px"
          />
        </div>
        <UIcon
          v-else
          name="i-lucide-tag"
          class="text-muted size-6"
        />
        <span class="text-highlighted text-sm font-medium">
          {{ item.name }}
        </span>
      </NuxtLink>
    </UCarousel>
  </section>
</template>
