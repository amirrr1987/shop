<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import { heroSlides } from '~/data/home'

const containerRef = ref<SwiperContainer | null>(null)
const firstSlide = heroSlides[0]

if (import.meta.client) {
  useSwiper(containerRef, {
    loop: false,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    resizeObserver: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    },
    navigation: true
  })
}
</script>

<template>
  <div class="w-full min-w-0 overflow-hidden">
    <ClientOnly>
      <swiper-container
        ref="containerRef"
        dir="rtl"
        :init="false"
        class="hero-swiper block w-full max-w-full"
      >
        <swiper-slide
          v-for="item in heroSlides"
          :key="item.id"
        >
          <div class="relative aspect-21/9 max-h-96 min-h-64 w-full overflow-hidden bg-elevated sm:min-h-72 lg:min-h-80">
            <NuxtImg
              :src="item.image"
              :alt="`${item.title} ${item.highlight}`"
              width="1400"
              height="500"
              loading="eager"
              class="absolute inset-0 size-full object-cover"
            />

            <div class="absolute inset-0 bg-linear-to-t from-default/95 via-default/50 to-default/10" />

            <div class="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <p class="text-sm font-medium text-muted">
                {{ item.subtitle }}
              </p>
              <h2 class="mt-1 max-w-2xl text-2xl font-bold text-default sm:text-3xl lg:text-4xl">
                {{ item.title }}
                <span class="text-primary">{{ item.highlight }}</span>
              </h2>
              <UButton
                label="خرید کنید"
                icon="i-lucide-shopping-bag"
                size="lg"
                class="mt-4"
                :to="item.to"
              />
            </div>
          </div>
        </swiper-slide>
      </swiper-container>

      <template #fallback>
        <div
          v-if="firstSlide"
          class="relative aspect-21/9 max-h-96 min-h-64 w-full overflow-hidden bg-elevated sm:min-h-72 lg:min-h-80"
        >
          <NuxtImg
            :src="firstSlide.image"
            :alt="`${firstSlide.title} ${firstSlide.highlight}`"
            width="1400"
            height="500"
            loading="eager"
            class="absolute inset-0 size-full object-cover"
          />
          <div class="absolute inset-0 bg-linear-to-t from-default/95 via-default/50 to-default/10" />
          <div class="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
            <p class="text-sm font-medium text-muted">
              {{ firstSlide.subtitle }}
            </p>
            <h2 class="mt-1 max-w-2xl text-2xl font-bold text-default sm:text-3xl lg:text-4xl">
              {{ firstSlide.title }}
              <span class="text-primary">{{ firstSlide.highlight }}</span>
            </h2>
            <UButton
              label="خرید کنید"
              icon="i-lucide-shopping-bag"
              size="lg"
              class="mt-4"
              :to="firstSlide.to"
            />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
