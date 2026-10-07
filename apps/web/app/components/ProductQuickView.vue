<script setup lang="ts">
import type { Product } from '@shop/shared'
import { addProductToCart } from '~/utils/add-product-to-cart'
import { productCardBadges } from '~/utils/product-badges'
import {
  productDisplayPrice,
  saleCountdownLabel,
} from '../utils/product-price'

const props = defineProps<{
  product: Product
}>()

const open = defineModel<boolean>('open', { default: false })

const toast = useToast()
const { add } = useCart()
const { formatPrice } = useCurrency()

const pricing = computed(() => productDisplayPrice(props.product))
const countdown = computed(() =>
  pricing.value.onSale ? saleCountdownLabel(pricing.value.endsAt) : '',
)
const hasVariants = computed(() => (props.product.variants?.length ?? 0) > 0)
const isCallPrice = computed(() => pricing.value.mode === 'call')
const outOfStock = computed(() => props.product.stock < 1)
const imageBadges = computed(() => productCardBadges(props.product))

const descriptionPreview = computed(() => {
  const raw = props.product.description?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!raw) return ''
  return raw.length > 180 ? `${raw.slice(0, 180)}…` : raw
})

async function addToCart() {
  const result = addProductToCart(props.product, { add, toast })
  if (result === 'pdp') {
    open.value = false
    await navigateTo(`/products/${props.product.slug}`)
    return
  }
  if (result === 'ok') {
    open.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="product.name"
    :description="product.brandName || undefined"
    :ui="{ content: 'sm:max-w-2xl' }"
  >
    <template #body>
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="bg-elevated aspect-square overflow-hidden rounded-lg">
          <ShopImage
            :src="product.images[0]"
            :alt="product.name"
            :width="560"
            :height="560"
            sizes="(max-width: 640px) 90vw, 280px"
            img-class="size-full object-cover"
          />
        </div>

        <div class="flex flex-col gap-4">
          <div class="space-y-2">
            <p
              v-if="product.brandName"
              class="text-muted text-sm"
            >
              {{ product.brandName }}
            </p>

            <div class="flex flex-wrap items-center gap-2">
              <template v-if="pricing.mode === 'call'">
                <p class="text-highlighted text-lg font-semibold">
                  تماس بگیرید
                </p>
              </template>
              <template v-else>
                <p class="text-highlighted text-lg font-semibold">
                  {{ formatPrice(pricing.price ?? 0) }}
                </p>
                <p
                  v-if="pricing.compareAt != null"
                  class="text-muted text-sm line-through"
                >
                  {{ formatPrice(pricing.compareAt) }}
                </p>
              </template>

              <UBadge
                v-for="badge in imageBadges"
                :key="badge.key"
                :label="badge.label"
                :color="badge.color"
                variant="subtle"
                size="sm"
              />
              <UBadge
                v-if="product.isFeatured"
                label="ویژه"
                color="primary"
                variant="subtle"
                size="sm"
              />
              <UBadge
                v-if="hasVariants"
                :label="`${product.variants!.length} واریانت`"
                color="neutral"
                variant="subtle"
                size="sm"
              />
              <UBadge
                v-if="outOfStock"
                label="ناموجود"
                color="error"
                variant="subtle"
                size="sm"
              />
            </div>

            <p
              v-if="countdown"
              class="text-error text-xs"
            >
              پایان تخفیف: {{ countdown }}
            </p>

            <p
              v-if="descriptionPreview"
              class="text-muted text-sm leading-relaxed"
            >
              {{ descriptionPreview }}
            </p>

            <p
              v-if="hasVariants"
              class="text-muted text-sm"
            >
              این محصول واریانت دارد؛ برای انتخاب گزینه به صفحهٔ محصول بروید.
            </p>
          </div>

          <div class="mt-auto flex flex-col gap-2 sm:flex-row">
            <UButton
              label="مشاهده جزئیات"
              icon="i-lucide-arrow-left"
              color="neutral"
              variant="soft"
              :to="`/products/${product.slug}`"
              @click="open = false"
            />
            <UButton
              :label="hasVariants ? 'انتخاب واریانت' : 'افزودن به سبد'"
              icon="i-lucide-shopping-cart"
              :disabled="!hasVariants && (isCallPrice || outOfStock)"
              @click="addToCart"
            />
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
