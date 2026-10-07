<script setup lang="ts">
import type { HomePromoBanner } from '~/types/home'

const props = defineProps<{
  banners: HomePromoBanner[]
}>()

const items = computed(() => props.banners)
const multi = computed(() => items.value.length > 1)
</script>

<template>
  <section
    v-if="items.length"
    class="space-y-4"
  >
    <div class="space-y-1">
      <h2 class="text-highlighted text-xl font-semibold">
        پیشنهادها
      </h2>
      <p class="text-muted max-w-xl text-sm">
        میان‌بر به تخفیف‌ها، دسته‌ها و برندها.
      </p>
    </div>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="multi"
      :autoplay="multi ? { delay: 4800, stopOnInteraction: true } : false"
      :ui="{
        item: 'basis-[85%] ps-3 sm:basis-1/2 lg:basis-1/3',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <NuxtLink
        :to="item.to"
        class="group border-default relative block overflow-hidden rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div class="bg-elevated relative aspect-2/1 overflow-hidden">
          <ShopImage
            v-if="item.image"
            :src="item.image"
            :alt="item.alt"
            :width="600"
            :height="300"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
            img-class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            v-else
            class="absolute inset-0 bg-[linear-gradient(135deg,var(--ui-bg-elevated),color-mix(in_oklab,var(--ui-primary)_22%,var(--ui-bg)))]"
            aria-hidden="true"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-default/90 via-default/40 to-transparent"
          />
          <div class="absolute inset-x-0 bottom-0 space-y-0.5 p-4">
            <p class="text-highlighted text-base font-semibold">
              {{ item.title }}
            </p>
            <p class="text-muted text-sm">
              {{ item.subtitle }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </UCarousel>
  </section>
</template>
