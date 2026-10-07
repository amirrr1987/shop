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

const toast = useToast()
const { add } = useCart()
const { has, toggle } = useWishlist()
const {
  has: inCompare,
  toggle: toggleCompare,
} = useCompare()
const { track } = useAnalytics()
const { formatPrice } = useCurrency()

const quickViewOpen = ref(false)
const wished = computed(() => has(props.product.id))
const compared = computed(() => inCompare(props.product.id))
const pricing = computed(() => productDisplayPrice(props.product))
const countdown = computed(() =>
  pricing.value.onSale ? saleCountdownLabel(pricing.value.endsAt) : '',
)
const hasVariants = computed(() => (props.product.variants?.length ?? 0) > 0)
const imageBadges = computed(() => productCardBadges(props.product))
const descriptionPreview = computed(() => {
  const raw = props.product.description
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!raw) return ''
  return raw.length > 140 ? `${raw.slice(0, 140)}…` : raw
})

async function onAddToCart() {
  const result = addProductToCart(props.product, { add, toast })
  if (result === 'pdp') {
    await navigateTo(`/products/${props.product.slug}`)
  }
}

async function onToggleWishlist() {
  try {
    const added = await toggle(props.product)
    toast.add({
      title: added ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد',
      description: props.product.name,
      color: added ? 'success' : 'neutral',
    })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'به‌روزرسانی علاقه‌مندی‌ها ممکن نشد'),
      color: 'error',
    })
  }
}

function onCompare() {
  const result = toggleCompare(props.product)
  if (result.noCategory) {
    toast.add({
      title: 'مقایسه ممکن نیست',
      description: 'فقط محصولات دارای دسته قابل مقایسه‌اند.',
      color: 'warning',
    })
    return
  }
  if (result.categoryMismatch) {
    toast.add({
      title: 'فقط هم‌دسته',
      description: 'محصولات مقایسه باید از یک دسته باشند.',
      color: 'warning',
    })
    return
  }
  if (result.full) {
    toast.add({
      title: 'حداکثر ۵ محصول برای مقایسه',
      color: 'warning',
    })
    return
  }
  if (result.added) {
    track('add_to_compare', {
      product_id: props.product.id,
      product_name: props.product.name,
      category_id: props.product.categoryId || undefined,
    })
  }
  toast.add({
    title: result.added ? 'به مقایسه اضافه شد' : 'از مقایسه حذف شد',
    description: props.product.name,
    color: result.added ? 'success' : 'neutral',
  })
}
</script>

<template>
  <div class="border-default flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-stretch">
    <NuxtLink
      :to="`/products/${product.slug}`"
      class="bg-elevated relative aspect-square w-full shrink-0 overflow-hidden rounded-lg sm:w-40"
    >
      <ShopImage
        :src="product.images[0]"
        :alt="product.name"
        :width="320"
        :height="320"
        sizes="(max-width: 640px) 100vw, 160px"
        img-class="size-full object-cover"
      />
      <div class="absolute start-2 top-2 flex flex-col gap-1">
        <UBadge
          v-for="badge in imageBadges"
          :key="badge.key"
          :label="badge.label"
          :color="badge.color"
          variant="solid"
          size="sm"
        />
      </div>
    </NuxtLink>

    <div class="flex min-w-0 flex-1 flex-col gap-3">
      <div class="space-y-1">
        <p
          v-if="product.brandName"
          class="text-muted text-xs"
        >
          {{ product.brandName }}
        </p>
        <NuxtLink
          :to="`/products/${product.slug}`"
          class="text-highlighted text-lg font-medium hover:underline"
        >
          {{ product.name }}
        </NuxtLink>
        <p
          v-if="descriptionPreview"
          class="text-muted text-sm leading-relaxed"
        >
          {{ descriptionPreview }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <template v-if="pricing.mode === 'call'">
          <p class="text-default font-medium">
            تماس بگیرید
          </p>
        </template>
        <template v-else>
          <p class="text-default font-medium">
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
          v-if="product.stock < 1"
          label="ناموجود"
          color="error"
          variant="subtle"
          size="sm"
        />
        <UBadge
          v-else-if="hasVariants"
          :label="`${product.variants!.length} واریانت`"
          color="neutral"
          variant="subtle"
          size="sm"
        />
        <p
          v-if="countdown"
          class="text-error text-xs"
        >
          پایان تخفیف: {{ countdown }}
        </p>
      </div>

      <div class="mt-auto flex flex-wrap gap-2">
        <UButton
          :label="hasVariants ? 'انتخاب واریانت' : 'افزودن به سبد'"
          icon="i-lucide-shopping-cart"
          size="sm"
          :disabled="!hasVariants && (pricing.mode === 'call' || product.stock < 1)"
          @click="onAddToCart"
        />
        <UButton
          label="نمایش سریع"
          icon="i-lucide-eye"
          color="neutral"
          variant="soft"
          size="sm"
          @click="quickViewOpen = true"
        />
        <UButton
          icon="i-lucide-heart"
          :color="wished ? 'error' : 'neutral'"
          variant="soft"
          size="sm"
          :aria-label="wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
          @click="onToggleWishlist"
        />
        <UButton
          icon="i-lucide-columns-3"
          :color="compared ? 'primary' : 'neutral'"
          variant="soft"
          size="sm"
          :aria-label="compared ? 'حذف از مقایسه' : 'افزودن به مقایسه'"
          @click="onCompare"
        />
      </div>
    </div>

    <ProductQuickView
      v-model:open="quickViewOpen"
      :product="product"
    />
  </div>
</template>
