<script setup lang="ts">
import type { Product } from '~/types/shop'
import { formatPrice } from '~/data/products'

defineProps<{
  product: Product
}>()

const { add } = useCart()
const { toggle, has } = useWishlist()
const { toggle: toggleCompare, has: inCompare } = useCompare()

const quickViewOpen = ref(false)
</script>

<template>
  <UCard>
    <UPageColumns>
    <ULink :to="`/product/${product.slug}`">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        width="300"
        height="300"
        loading="lazy"
      />
    </ULink>

    <UPageBody>
      <UBadge
        color="neutral"
        variant="subtle"
        :label="product.brand"
      />

      <ULink :to="`/product/${product.slug}`">
        <UPageHeader
          :title="product.name"
          :description="product.description"
        />
      </ULink>

      <UFieldGroup orientation="horizontal">
        <UIcon
          v-for="star in product.rating"
          :key="star"
          name="i-lucide-star"
          color="warning"
        />
      </UFieldGroup>

      <UAlert
        :color="product.inStock ? 'success' : 'warning'"
        variant="subtle"
        :icon="product.inStock ? 'i-lucide-check' : 'i-lucide-clock'"
        :title="product.inStock ? 'موجود در انبار' : 'ناموجود'"
        :description="formatPrice(product.price)"
      />

      <UFieldGroup orientation="horizontal">
        <UButton
          label="افزودن به سبد"
          icon="i-lucide-shopping-cart"
          @click="add(product)"
        />
        <UButton
          label="علاقه‌مندی"
          :color="has(product.id) ? 'error' : 'neutral'"
          :variant="has(product.id) ? 'solid' : 'outline'"
          icon="i-lucide-heart"
          @click="toggle(product)"
        />
        <UButton
          label="مقایسه"
          :color="inCompare(product.id) ? 'primary' : 'neutral'"
          :variant="inCompare(product.id) ? 'solid' : 'outline'"
          icon="i-lucide-git-compare"
          @click="toggleCompare(product)"
        />
        <UButton
          label="نمایش سریع"
          color="neutral"
          variant="ghost"
          icon="i-lucide-search"
          @click="quickViewOpen = true"
        />
      </UFieldGroup>
    </UPageBody>
    </UPageColumns>
  </UCard>

  <UModal
    v-model:open="quickViewOpen"
    :title="product.name"
    :description="product.brand"
  >
    <template #body>
      <UPageColumns>
        <NuxtImg
          :src="product.image"
          :alt="product.name"
          width="400"
          height="400"
          loading="lazy"
        />
        <UPageBody>
          <UPageHeader
            :title="product.name"
            :description="formatPrice(product.price)"
          />
          <UButton
            label="مشاهده جزئیات"
            icon="i-lucide-arrow-left"
            :to="`/product/${product.slug}`"
          />
        </UPageBody>
      </UPageColumns>
    </template>
  </UModal>
</template>
