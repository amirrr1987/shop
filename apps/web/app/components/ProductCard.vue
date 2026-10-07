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
const canQuickAdd = computed(
  () =>
    !hasVariants.value
    && pricing.value.mode !== 'call'
    && props.product.stock > 0,
)
const imageBadges = computed(() => productCardBadges(props.product))

function onQuickView(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  quickViewOpen.value = true
}

async function onAddToCart(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  const result = addProductToCart(props.product, { add, toast })
  if (result === 'pdp') {
    await navigateTo(`/products/${props.product.slug}`)
  }
}

async function onToggle(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
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

function onCompare(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
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
      description: 'محصولات مقایسه باید از یک دسته باشند. لیست را خالی کنید یا محصول هم‌دسته اضافه کنید.',
      color: 'warning',
    })
    return
  }
  if (result.full) {
    toast.add({
      title: 'حداکثر ۵ محصول برای مقایسه',
      description: 'یکی را از صفحه مقایسه حذف کنید.',
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
  <div class="group relative space-y-3">
    <div class="absolute end-2 top-2 z-10 flex flex-col gap-1">
      <UButton
        icon="i-lucide-eye"
        color="neutral"
        variant="soft"
        size="sm"
        aria-label="نمایش سریع"
        @click="onQuickView"
      />
      <UButton
        icon="i-lucide-heart"
        :color="wished ? 'error' : 'neutral'"
        variant="soft"
        size="sm"
        :aria-label="wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
        @click="onToggle"
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

    <NuxtLink
      :to="`/products/${product.slug}`"
      class="block space-y-3"
    >
      <div class="bg-elevated relative aspect-square overflow-hidden rounded-lg">
        <ShopImage
          :src="product.images[0]"
          :alt="product.name"
          :width="480"
          :height="480"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          img-class="size-full object-cover transition group-hover:scale-[1.02]"
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
      </div>

      <div class="space-y-1">
        <h2 class="text-highlighted font-medium group-hover:underline">
          {{ product.name }}
        </h2>
        <p
          v-if="product.brandName"
          class="text-muted text-xs"
        >
          {{ product.brandName }}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <template v-if="pricing.mode === 'call'">
            <p class="text-default font-medium">
              تماس بگیرید
            </p>
          </template>
          <template v-else>
            <p class="text-default">
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
            v-if="product.isFeatured"
            label="ویژه"
            color="primary"
            variant="subtle"
            size="sm"
          />
          <UBadge
            v-if="(product.variants?.length ?? 0) > 0"
            :label="`${product.variants!.length} واریانت`"
            color="neutral"
            variant="subtle"
            size="sm"
          />
          <UBadge
            v-if="product.stock < 1"
            label="ناموجود"
            color="error"
            variant="subtle"
            size="sm"
          />
          <UBadge
            v-else-if="product.stock <= 5"
            :label="`موجودی کم · ${product.unitSymbol || 'عدد'}`"
            color="warning"
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
      </div>
    </NuxtLink>

    <div class="flex gap-2">
      <UButton
        :label="hasVariants ? 'انتخاب واریانت' : 'افزودن به سبد'"
        icon="i-lucide-shopping-cart"
        size="sm"
        block
        :disabled="!canQuickAdd && !hasVariants"
        @click="onAddToCart"
      />
    </div>

    <ProductQuickView
      v-model:open="quickViewOpen"
      :product="product"
    />
  </div>
</template>
