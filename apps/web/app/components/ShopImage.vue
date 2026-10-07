<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string | null
    alt: string
    /** Intrinsic size hint for CLS; CSS still controls display size. */
    width?: number
    height?: number
    /** Use for LCP hero / main product image. */
    priority?: boolean
    sizes?: string
    imgClass?: string
  }>(),
  {
    src: null,
    width: 600,
    height: 600,
    priority: false,
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px',
    imgClass: 'size-full object-cover',
  },
)

const hasSrc = computed(() => Boolean(props.src?.trim()))
</script>

<template>
  <img
    v-if="hasSrc"
    :src="src!"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    :loading="priority ? 'eager' : 'lazy'"
    :decoding="priority ? 'sync' : 'async'"
    :fetchpriority="priority ? 'high' : 'auto'"
    :class="imgClass"
  >
  <div
    v-else
    class="text-muted flex size-full items-center justify-center"
    role="img"
    :aria-label="alt || 'بدون تصویر'"
  >
    <UIcon
      name="i-lucide-image"
      class="size-10"
      aria-hidden="true"
    />
  </div>
</template>
