<script setup lang="ts">
import type { Product } from '~/types/shop'
import { productPolicies, productReviews } from '~/data/product-details'

defineProps<{
  product: Product
}>()

const tabItems = [
  { label: 'توضیحات', icon: 'i-lucide-file-text', slot: 'description' as const },
  { label: 'جزئیات', icon: 'i-lucide-list', slot: 'details' as const },
  { label: `نظرات (${productReviews.length})`, icon: 'i-lucide-message-square', slot: 'reviews' as const }
]
</script>

<template>
  <UPageSection title="اطلاعات محصول">
    <UTabs :items="tabItems">
      <template #description>
        <UCard>
          <UPageHeader
            title="توضیحات محصول"
            :description="product.longDescription || product.description"
          />
          <UPageList v-if="product.features?.length">
            <UAlert
              v-for="(feature, index) in product.features"
              :key="index"
              color="neutral"
              variant="subtle"
              icon="i-lucide-check"
              :title="feature"
            />
          </UPageList>
        </UCard>
      </template>

      <template #details>
        <UCard>
          <UPageList v-if="product.specs?.length">
            <UAlert
              v-for="spec in product.specs"
              :key="spec.label"
              color="neutral"
              variant="subtle"
              icon="i-lucide-info"
              :title="spec.label"
              :description="spec.value"
            />
          </UPageList>
          <UEmpty
            v-else
            icon="i-lucide-list"
            title="جزئیات فنی ثبت نشده"
          />
        </UCard>
      </template>

      <template #reviews>
        <UPageList>
          <UCard
            v-for="review in productReviews"
            :key="review.id"
          >
            <UUser
              :name="review.author"
              :description="review.date"
              icon="i-lucide-user"
            />
            <UFieldGroup orientation="horizontal">
              <UIcon
                v-for="star in review.rating"
                :key="star"
                name="i-lucide-star"
                color="warning"
              />
            </UFieldGroup>
            <UAlert
              color="neutral"
              variant="subtle"
              :title="review.content"
            />
          </UCard>
        </UPageList>
      </template>
    </UTabs>

    <UPageGrid>
      <UPageCard
        v-for="policy in productPolicies"
        :key="policy.title"
        :title="policy.title"
        :description="policy.description"
        :icon="policy.icon"
        variant="subtle"
      />
    </UPageGrid>
  </UPageSection>
</template>
