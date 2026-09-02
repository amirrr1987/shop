<script setup lang="ts">
import type { ProductGallery, ProductSticky, ProductType } from '~/types/shop'
import { formatPrice, getProductBySlug } from '~/data/products'

definePageMeta({
  validate(route) {
    const param = route.params.slug
    const slug = (Array.isArray(param) ? param[0] : param)?.toString().trim()
    if (!slug) return false
    return Boolean(getProductBySlug(slug))
  }
})

const route = useRoute()
const { getBySlug, trackView } = useProduct()

const slug = computed(() => {
  const param = route.params.slug
  const raw = Array.isArray(param) ? param[0] : param
  if (!raw) return ''
  try {
    return decodeURIComponent(String(raw)).trim()
  } catch {
    return String(raw).trim()
  }
})

const product = computed(() => (slug.value ? getBySlug(slug.value) : undefined))

watch(product, (value) => {
  if (value) trackView(value)
}, { immediate: true })

useSeoMeta({ title: () => `${product.value?.name ?? 'محصول'} — روزر` })

const productType = computed<ProductType>(() => {
  const type = route.query.type
  if (type === 'variable' || type === 'group' || type === 'affiliate') return type
  return 'simple'
})

const gallery = computed<ProductGallery>(() => {
  const value = route.query.gallery
  if (value === 'left' || value === 'right' || value === 'slider') return value
  return 'default'
})

const sticky = computed<ProductSticky>(() => {
  const value = route.query.sticky
  if (value === 'left' || value === 'right') return value
  return 'none'
})

const badgeLabels: Record<'new' | 'sale' | 'hot', string> = {
  new: 'جدید',
  sale: 'تخفیف',
  hot: 'پرفروش'
}

const trustFeatures = [
  { icon: 'i-lucide-truck', title: 'ارسال سریع', description: '۱ تا ۳ روز کاری' },
  { icon: 'i-lucide-shield-check', title: 'پرداخت امن', description: 'درگاه معتبر' },
  { icon: 'i-lucide-rotate-ccw', title: '۷ روز ضمانت', description: 'بازگشت آسان' }
]

const breadcrumbs = computed(() => [
  { label: 'خانه', to: '/' },
  { label: 'فروشگاه', to: '/shop' },
  { label: product.value!.category, to: `/shop?category=${product.value!.category}` },
  { label: product.value!.name, to: `/product/${product.value!.slug}` }
])

const pageDescription = computed(() => {
  const parts = [
    product.value!.brand,
    `${product.value!.rating}/۵`,
    product.value!.reviewCount ? `${product.value!.reviewCount} نظر` : null,
    product.value!.inStock ? 'موجود' : 'ناموجود'
  ].filter(Boolean)

  return parts.join(' · ')
})

const showGalleryAside = computed(() =>
  sticky.value === 'left' || (sticky.value === 'none' && gallery.value === 'left')
)

const showInfoAside = computed(() => sticky.value === 'right')

const showMainGrid = computed(() =>
  sticky.value === 'none' && gallery.value !== 'left'
)

const showInfoInMain = computed(() =>
  !showInfoAside.value && (showGalleryAside.value || showMainGrid.value)
)

const showGalleryInMain = computed(() =>
  sticky.value === 'right' || showMainGrid.value
)

const pageUi = computed(() => {
  const hasAside = showGalleryAside.value || showInfoAside.value

  return {
    root: 'flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8',
    left: 'min-w-0 lg:col-span-3',
    center: hasAside ? 'min-w-0 lg:col-span-9' : 'min-w-0 lg:col-span-12',
    right: 'min-w-0 lg:col-span-3'
  }
})

const discountPercent = computed(() => {
  const item = product.value
  if (!item?.oldPrice || item.oldPrice <= item.price) return null
  return Math.round((1 - item.price / item.oldPrice) * 100)
})
</script>

<template>
  <UContainer
    v-if="product"
    class="py-6 sm:py-8"
  >
    <UPage :ui="pageUi">
      <template
        v-if="showGalleryAside"
        #left
      >
        <UPageAside>
          <ProductGallery
            :product="product"
            :gallery="gallery"
          />
        </UPageAside>
      </template>

      <template
        v-if="showInfoAside"
        #right
      >
        <UPageAside>
          <ProductInfo
            :product="product"
            :type="productType"
          />
        </UPageAside>
      </template>

      <UPageBody
        :ui="{
          base: 'mt-0 space-y-8 pb-8 sm:space-y-10 sm:pb-10'
        }"
      >
        <div class="space-y-6 sm:space-y-8">
          <UBreadcrumb
            :items="breadcrumbs"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <UPageHeader
            :headline="product.brand"
            :title="product.name"
            :description="pageDescription"
            :ui="{
              root: 'border-b border-default pb-6',
              headline: 'text-sm font-semibold text-primary',
              title: 'text-2xl sm:text-3xl',
              description: 'text-sm text-muted sm:text-base'
            }"
          >
            <template #links>
              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  v-for="badge in product.badges"
                  :key="badge"
                  color="primary"
                  variant="soft"
                  size="sm"
                  :label="badgeLabels[badge]"
                />
                <UBadge
                  v-if="discountPercent"
                  color="error"
                  variant="soft"
                  size="sm"
                  :label="`${discountPercent}٪ تخفیف`"
                />
                <UBadge
                  :color="product.inStock ? 'success' : 'error'"
                  variant="subtle"
                  size="sm"
                  :icon="product.inStock ? 'i-lucide-check' : 'i-lucide-x'"
                  :label="product.inStock ? 'موجود' : 'ناموجود'"
                />
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  icon="i-lucide-banknote"
                  :label="formatPrice(product.price)"
                />
              </div>
            </template>
          </UPageHeader>

          <div class="grid gap-3 sm:grid-cols-3">
            <UPageFeature
              v-for="feature in trustFeatures"
              :key="feature.title"
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
              orientation="horizontal"
              :ui="{
                root: 'gap-3 rounded-lg bg-elevated/50 p-3 ring-1 ring-default',
                leadingIcon: 'size-4 text-primary',
                title: 'text-xs font-semibold text-highlighted',
                description: 'text-[11px] leading-snug text-muted'
              }"
            />
          </div>

          <div
            v-if="showMainGrid"
            class="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10"
          >
            <template v-if="gallery === 'right'">
              <div class="min-w-0">
                <ProductInfo
                  :product="product"
                  :type="productType"
                />
              </div>
              <div class="min-w-0">
                <ProductGallery
                  :product="product"
                  :gallery="gallery"
                />
              </div>
            </template>

            <template v-else>
              <div class="min-w-0">
                <ProductGallery
                  :product="product"
                  :gallery="gallery"
                />
              </div>
              <div class="min-w-0">
                <ProductInfo
                  :product="product"
                  :type="productType"
                />
              </div>
            </template>
          </div>

          <div
            v-else-if="showInfoInMain"
            class="min-w-0"
            :class="showGalleryAside ? 'max-w-2xl' : undefined"
          >
            <ProductInfo
              :product="product"
              :type="productType"
            />
          </div>

          <div
            v-else-if="showGalleryInMain"
            class="min-w-0 max-w-3xl"
          >
            <ProductGallery
              :product="product"
              :gallery="gallery"
            />
          </div>

          <ProductTabs :product="product" />
          <ProductRelated :product="product" />
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
