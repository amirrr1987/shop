<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import type { SwiperOptions } from 'swiper/types'

const props = withDefaults(defineProps<{
  items: unknown[]
  options?: SwiperOptions
  navigation?: boolean
  pagination?: boolean
  autoplay?: boolean | { delay: number }
  loop?: boolean
}>(), {
  navigation: true,
  pagination: true,
  autoplay: false,
  loop: false
})

const containerRef = ref<SwiperContainer | null>(null)

const swiperOptions = computed<SwiperOptions>(() => ({
  slidesPerView: 1,
  spaceBetween: 16,
  loop: props.loop && props.items.length > 3,
  observer: true,
  observeParents: true,
  resizeObserver: true,
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 }
  },
  pagination: props.pagination ? { clickable: true } : false,
  navigation: props.navigation,
  autoplay: props.autoplay === true
    ? { delay: 5000, disableOnInteraction: false }
    : props.autoplay || false,
  ...props.options
}))

if (import.meta.client) {
  const swiper = useSwiper(containerRef, swiperOptions.value)

  watch(swiperOptions, () => {
    swiper.reInitialize()
  }, { deep: true })

  watch(() => props.items.length, () => {
    nextTick(() => swiper.reInitialize())
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
        class="shop-swiper block w-full max-w-full pb-10"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="index"
          class="h-auto"
        >
          <slot
            :item="item"
            :index="index"
          />
        </swiper-slide>
      </swiper-container>

      <template #fallback>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="(item, index) in items"
            :key="index"
          >
            <slot
              :item="item"
              :index="index"
            />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
