<script setup lang="ts">
import type { HomeHeroSlide } from '~/types/home'

const props = defineProps<{
  slides: HomeHeroSlide[]
}>()

const items = computed(() => props.slides)
const multi = computed(() => items.value.length > 1)
</script>

<template>
  <section
    class="relative w-full overflow-hidden"
    aria-roledescription="carousel"
    aria-label="اسلایدر صفحه اصلی"
  >
    <UCarousel
      v-if="items.length"
      v-slot="{ item, index }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="multi"
      :autoplay="multi ? { delay: 5500, stopOnInteraction: false } : false"
      fade
      :prev="{
        color: 'neutral',
        variant: 'solid',
        size: 'md',
        class: 'bg-default/80 backdrop-blur-sm',
      }"
      :next="{
        color: 'neutral',
        variant: 'solid',
        size: 'md',
        class: 'bg-default/80 backdrop-blur-sm',
      }"
      :ui="{
        root: 'w-full',
        viewport: 'w-full',
        container: 'ms-0',
        item: 'basis-full ps-0',
        controls: 'absolute inset-x-0 bottom-4 z-10 flex justify-center',
        arrows: 'absolute inset-y-0 inset-x-2 z-10 flex items-center justify-between pointer-events-none *:pointer-events-auto',
        dots: 'relative',
      }"
      class="w-full"
    >
      <div
        class="relative min-h-72 w-full overflow-hidden sm:min-h-80 lg:min-h-96"
      >
        <ShopImage
          v-if="item.image"
          :src="item.image"
          :alt="`${item.title}${item.highlight ? ` ${item.highlight}` : ''}`"
          :width="1400"
          :height="560"
          :priority="index === 0"
          sizes="100vw"
          img-class="absolute inset-0 size-full object-cover"
        />
        <div
          v-else
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--ui-primary)_0%,transparent_55%),linear-gradient(160deg,var(--ui-bg-elevated)_0%,var(--ui-bg)_55%,color-mix(in_oklab,var(--ui-primary)_18%,var(--ui-bg))_100%)]"
          aria-hidden="true"
        />

        <div
          class="absolute inset-0 bg-linear-to-t from-default/95 via-default/55 to-default/15"
        />

        <div
          class="absolute inset-x-0 bottom-0 z-[1] px-6 pb-14 pt-16 sm:px-10 sm:pb-16 lg:px-16"
        >
          <p class="text-muted text-sm font-medium sm:text-base">
            {{ item.subtitle }}
          </p>
          <component
            :is="index === 0 ? 'h1' : 'h2'"
            class="text-highlighted mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {{ item.title }}
            <span
              v-if="item.highlight"
              class="text-primary"
            >{{ item.highlight }}</span>
          </component>
          <UButton
            :label="item.ctaLabel"
            :to="item.to"
            icon="i-lucide-shopping-bag"
            size="lg"
            class="mt-5"
          />
        </div>
      </div>
    </UCarousel>
  </section>
</template>
