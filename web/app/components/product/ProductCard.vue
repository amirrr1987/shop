<script setup lang="ts">
import type { Product } from '~/types/shop'
import { formatPrice } from '~/data/products'

const props = defineProps<{
  product: Product
}>()

const { add } = useCart()
const { toggle, has } = useWishlist()
const { toggle: toggleCompare, has: inCompare } = useCompare()

const quickViewOpen = ref(false)

const badgeColor = computed(() => {
  if (props.product.badges?.includes('sale')) return 'error'
  if (props.product.badges?.includes('hot')) return 'warning'
  return 'primary'
})

const badgeLabel = computed(() => {
  if (props.product.badges?.includes('sale')) return 'حراج'
  if (props.product.badges?.includes('hot')) return 'داغ'
  if (props.product.badges?.includes('new')) return 'جدید'
  return undefined
})
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'h-full ring-1 ring-default',
      header: 'flex items-start justify-between gap-2 p-4 pb-0',
      body: 'space-y-3 p-4 pt-3',
      footer: 'p-4 pt-0'
    }"
  >
    <template #header>
      <UBadge
        v-if="badgeLabel"
        :color="badgeColor"
        :label="badgeLabel"
        size="sm"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-search"
        size="sm"
        aria-label="نمایش سریع"
        @click="quickViewOpen = true"
      />
    </template>

    <ULink :to="`/product/${product.slug}`">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        width="400"
        height="400"
        loading="lazy"
        class="aspect-square w-full rounded-md object-cover ring-1 ring-default"
      />
    </ULink>

    <UBadge
      color="neutral"
      variant="subtle"
      size="sm"
      :label="product.brand"
    />

    <ULink
      :to="`/product/${product.slug}`"
      class="block space-y-1"
    >
      <p class="line-clamp-2 text-sm font-semibold text-default hover:text-primary">
        {{ product.name }}
      </p>
      <p class="text-sm font-medium text-primary">
        {{ formatPrice(product.price) }}
      </p>
    </ULink>

    <div class="flex items-center gap-0.5">
      <UIcon
        v-for="star in product.rating"
        :key="star"
        name="i-lucide-star"
        class="size-3.5 text-warning"
      />
    </div>

    <UAlert
      v-if="product.oldPrice"
      color="error"
      variant="subtle"
      icon="i-lucide-tag"
      :title="formatPrice(product.oldPrice)"
      description="قیمت قبلی"
    />

    <template #footer>
      <UFieldGroup orientation="horizontal">
        <UButton
          label="افزودن به سبد"
          icon="i-lucide-shopping-cart"
          size="sm"
          block
          class="flex-1"
          @click="add(product)"
        />
        <UButton
          :color="has(product.id) ? 'error' : 'neutral'"
          :variant="has(product.id) ? 'solid' : 'ghost'"
          icon="i-lucide-heart"
          size="sm"
          aria-label="علاقه‌مندی"
          @click="toggle(product)"
        />
        <UButton
          :color="inCompare(product.id) ? 'primary' : 'neutral'"
          :variant="inCompare(product.id) ? 'solid' : 'ghost'"
          icon="i-lucide-git-compare"
          size="sm"
          aria-label="مقایسه"
          @click="toggleCompare(product)"
        />
      </UFieldGroup>
    </template>
  </UCard>

  <UModal
    v-model:open="quickViewOpen"
    :title="product.name"
    :description="product.brand"
  >
    <template #body>
      <div class="grid gap-6 sm:grid-cols-2">
        <NuxtImg
          :src="product.image"
          :alt="product.name"
          width="400"
          height="400"
          loading="lazy"
          class="aspect-square w-full rounded-lg object-cover ring-1 ring-default"
        />
        <div class="space-y-4">
          <div class="space-y-1">
            <p class="text-lg font-semibold text-default">
              {{ product.name }}
            </p>
            <p class="text-sm text-muted">
              {{ product.brand }}
            </p>
            <p class="text-base font-medium text-primary">
              {{ formatPrice(product.price) }}
            </p>
          </div>
          <UProgressGroup
            :max="5"
            :items="[{ value: product.rating, color: 'warning' }]"
          />
          <div class="flex flex-col gap-2 sm:flex-row">
            <UButton
              label="مشاهده جزئیات"
              icon="i-lucide-arrow-left"
              :to="`/product/${product.slug}`"
            />
            <UButton
              label="افزودن به سبد"
              icon="i-lucide-shopping-cart"
              @click="add(product)"
            />
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
