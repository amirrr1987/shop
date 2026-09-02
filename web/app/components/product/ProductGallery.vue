<script setup lang="ts">
import type { Product, ProductGallery } from '~/types/shop'

const props = defineProps<{
  product: Product
  gallery?: ProductGallery
}>()

const mode = computed(() => props.gallery ?? 'default')

const images = computed(() =>
  props.product.images?.length
    ? props.product.images
    : [props.product.image, props.product.hoverImage].filter(Boolean) as string[]
)

const selectedImage = ref(images.value[0])

watch(images, (value) => {
  selectedImage.value = value[0]
})

const isHorizontalThumbs = computed(() => mode.value === 'left' || mode.value === 'right')
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'ring-1 ring-default',
      body: 'space-y-4 p-4 sm:p-5'
    }"
  >
    <div
      class="gap-4"
      :class="[
        isHorizontalThumbs ? 'flex flex-col sm:flex-row' : 'flex flex-col',
        mode === 'right' && isHorizontalThumbs ? 'sm:flex-row-reverse' : undefined
      ]"
    >
      <div
        v-if="isHorizontalThumbs"
        class="flex shrink-0 gap-2 overflow-x-auto sm:max-w-24 sm:flex-col"
      >
        <UButton
          v-for="(image, index) in images"
          :key="index"
          color="neutral"
          :variant="selectedImage === image ? 'solid' : 'ghost'"
          square
          :aria-label="`تصویر ${index + 1}`"
          :ui="{ base: 'size-16 shrink-0 p-1 sm:size-20' }"
          @click="selectedImage = image"
        >
          <NuxtImg
            :src="image"
            :alt="`${product.name} — تصویر ${index + 1}`"
            width="80"
            height="80"
            loading="lazy"
            class="size-full rounded-md object-cover"
          />
        </UButton>
      </div>

      <div class="min-w-0 flex-1">
        <UCarousel
          v-if="mode === 'slider'"
          v-slot="{ item }"
          :items="images"
          arrows
          dots
          class="w-full"
        >
          <NuxtImg
            :src="item"
            :alt="product.name"
            width="600"
            height="600"
            loading="lazy"
            class="aspect-square w-full rounded-lg object-cover"
          />
        </UCarousel>

        <NuxtImg
          v-else
          :src="selectedImage"
          :alt="product.name"
          width="600"
          height="600"
          loading="lazy"
          class="aspect-square w-full rounded-lg object-cover"
        />
      </div>
    </div>

    <div
      v-if="mode === 'default' || mode === 'slider'"
      class="flex flex-wrap gap-2"
    >
      <UButton
        v-for="(image, index) in images"
        :key="index"
        color="neutral"
        :variant="selectedImage === image ? 'solid' : 'ghost'"
        square
        :aria-label="`تصویر ${index + 1}`"
        :ui="{ base: 'size-16 p-1 sm:size-20' }"
        @click="selectedImage = image"
      >
        <NuxtImg
          :src="image"
          :alt="`${product.name} — تصویر ${index + 1}`"
          width="80"
          height="80"
          loading="lazy"
          class="size-full rounded-md object-cover"
        />
      </UButton>
    </div>
  </UCard>
</template>
