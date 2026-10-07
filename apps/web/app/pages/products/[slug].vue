<script setup lang="ts">
import type {
  Category,
  Product,
  ProductVariant,
  Review,
  ReviewList,
} from '@shop/shared'
import {
  REVIEW_STATUS_LABELS_FA,
  createReviewSchema,
  isSaleActive,
  resolveUnitPrice,
} from '@shop/shared'
import type { FormSubmitEvent } from '@nuxt/ui'
import { saleCountdownLabel } from '../../utils/product-price'
import { isDirectVideo, toEmbedUrl } from '../../utils/video-embed'
import { breadcrumbJsonLd, productJsonLd } from '~/utils/json-ld'

const route = useRoute()
const api = useApi()
const toast = useToast()
const { user } = useAuth()
const { add } = useCart()
const { has, toggle } = useWishlist()
const {
  track: rememberRecent,
  others,
  hydrate: hydrateRecent,
} = useRecentlyViewed()
const { track: trackEvent } = useAnalytics()

const slug = computed(() => String(route.params.slug))
const quantity = ref(1)
const selectedVariantId = ref<string | null>(null)

const { data: product, error, status } = await useAsyncData(
  () => `product-${slug.value}`,
  () => api<Product>(`/products/${slug.value}`),
  { watch: [slug] },
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'محصول پیدا نشد',
  })
}

function trackProductView(value: Product) {
  rememberRecent(value)
  trackEvent('view_item', {
    product_id: value.id,
    product_name: value.name,
    value: value.price,
  })
}

onMounted(() => {
  hydrateRecent()
  if (product.value) {
    trackProductView(product.value)
  }
})

watch(product, (value) => {
  if (!value || !import.meta.client) {
    return
  }
  trackProductView(value)
})

const recentOthers = computed(() => others(product.value?.id).slice(0, 4))

const {
  data: reviews,
  status: reviewsStatus,
  refresh: refreshReviews,
} = await useAsyncData(
  () => `product-reviews-${product.value?.id ?? slug.value}`,
  async () => {
    if (!product.value) {
      return {
        items: [],
        average: null,
        count: 0,
        mine: null,
      } satisfies ReviewList
    }
    return api<ReviewList>('/reviews', {
      query: { productId: product.value.id },
    })
  },
  { watch: [() => product.value?.id, () => user.value?.id] },
)

const { data: related, status: relatedStatus } = await useAsyncData(
  () => `product-related-${slug.value}`,
  () => api<Product[]>(`/products/${slug.value}/related`),
  { watch: [slug] },
)

const { data: alsoBought, status: alsoBoughtStatus } = await useAsyncData(
  () => `product-also-bought-${slug.value}`,
  () => api<Product[]>(`/products/${slug.value}/also-bought`),
  { watch: [slug] },
)

const wished = computed(() =>
  product.value ? has(product.value.id) : false,
)

const activeImage = ref(0)
watch(
  () => product.value?.id,
  () => {
    activeImage.value = 0
  },
)

const gallery = computed(() => product.value?.images ?? [])
const mainImage = computed(
  () => gallery.value[activeImage.value] || gallery.value[0] || null,
)

const settings = useStoreSettingsState()
const { formatPrice } = useCurrency()

const { data: categories } = await useAsyncData('pdp-categories', () =>
  api<Category[]>('/categories'),
)

const productCategory = computed(() =>
  categories.value?.find((item) => item.id === product.value?.categoryId),
)

const breadcrumbItems = computed(() => {
  const items: Array<{ label: string; to?: string }> = [
    { label: 'خانه', to: '/' },
    { label: 'محصولات', to: '/products' },
  ]
  if (productCategory.value) {
    items.push({
      label: productCategory.value.name,
      to: `/categories/${productCategory.value.slug}`,
    })
  }
  if (product.value) {
    items.push({ label: product.value.name })
  }
  return items
})

const siteUrl = useSiteUrl()

useShopSeo(() => {
  const p = product.value
  if (!p) {
    return { title: 'محصول', path: route.path, noindex: true }
  }
  const title = p.seoTitle || p.name
  const description =
    p.seoDescription
    || p.description?.slice(0, 160)
    || `${p.name} در ${settings.value.shopName}`
  const image = p.ogImage || p.images?.[0] || null
  const category = categories.value?.find((c) => c.id === p.categoryId)
  return {
    title,
    description,
    path: `/products/${p.slug}`,
    image,
    type: 'product',
    jsonLd: [
      productJsonLd({
        siteUrl,
        name: p.name,
        description: p.description || p.name,
        path: `/products/${p.slug}`,
        images: p.images ?? [],
        price: p.salePrice ?? p.price,
        inStock: p.stock > 0 || (p.variants?.some((v) => v.isActive && v.stock > 0) ?? false),
        brandName: p.brandName,
        sku: p.id,
        variants: p.variants,
        aggregateRating:
          reviews.value?.count && reviews.value.average != null
            ? {
                ratingValue: reviews.value.average,
                reviewCount: reviews.value.count,
              }
            : null,
      }),
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'محصولات', path: '/products' },
        ...(category
          ? [{ name: category.name, path: `/categories/${category.slug}` }]
          : []),
        { name: p.name },
      ]),
    ],
  }
})

const myReview = computed(() => reviews.value?.mine ?? null)

const reviewState = reactive({
  rating: 5,
  comment: '',
  images: [] as string[],
})

const reviewLoading = ref(false)
const reviewUploading = ref(false)
const reviewError = ref<string | null>(null)
const MAX_REVIEW_IMAGES = 3
const ratingItems = [5, 4, 3, 2, 1].map((value) => ({
  label: `${value} ستاره`,
  value,
}))

const activeVariants = computed(
  () => product.value?.variants?.filter((item) => item.isActive) ?? [],
)

const selectedVariant = computed<ProductVariant | null>(() => {
  if (!selectedVariantId.value) {
    return null
  }
  return (
    activeVariants.value.find((item) => item.id === selectedVariantId.value)
    ?? null
  )
})

const resolvedPrice = computed(() => {
  if (!product.value) {
    return { ok: false as const, reason: 'call' as const }
  }
  return resolveUnitPrice({
    price: product.value.price,
    priceMode: product.value.priceMode,
    salePrice: product.value.salePrice,
    saleEndsAt: product.value.saleEndsAt,
    variantPrice: selectedVariant.value?.price,
  })
})

const displayPrice = computed(() =>
  resolvedPrice.value.ok ? resolvedPrice.value.unitPrice : 0,
)

const onSale = computed(() =>
  Boolean(
    product.value
    && resolvedPrice.value.ok
    && resolvedPrice.value.onSale
    && isSaleActive(
      product.value.salePrice,
      product.value.saleEndsAt,
      product.value.price,
    ),
  ),
)

const saleEndsLabel = computed(() =>
  onSale.value ? saleCountdownLabel(product.value?.saleEndsAt) : '',
)

const isCallPrice = computed(
  () => !resolvedPrice.value.ok || product.value?.priceMode === 'call',
)

const displayStock = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.stock
  }
  if (activeVariants.value.length) {
    return activeVariants.value.reduce((sum, item) => sum + item.stock, 0)
  }
  return product.value?.stock ?? 0
})

const variantItems = computed(() =>
  activeVariants.value.map((item) => ({
    label: `${item.label} · ${item.sku}${item.stock < 1 ? ' (ناموجود)' : ''}`,
    value: item.id,
    disabled: item.stock < 1,
  })),
)

/** Option keys present on active variants (e.g. رنگ، گارانتی). */
const optionKeys = computed(() => {
  const keys = new Set<string>()
  for (const variant of activeVariants.value) {
    for (const key of Object.keys(variant.options ?? {})) {
      if (key) keys.add(key)
    }
  }
  return [...keys]
})

const useOptionPicker = computed(
  () => optionKeys.value.length > 0 && activeVariants.value.length > 0,
)

const selectedOptions = ref<Record<string, string>>({})

function valuesForKey(key: string) {
  const values = new Set<string>()
  for (const variant of activeVariants.value) {
    const value = variant.options?.[key]
    if (value) values.add(value)
  }
  return [...values]
}

function isOptionValueAvailable(key: string, value: string) {
  return activeVariants.value.some((variant) => {
    if (variant.options?.[key] !== value) return false
    if (variant.stock < 1) return false
    return optionKeys.value.every((otherKey) => {
      if (otherKey === key) return true
      const selected = selectedOptions.value[otherKey]
      if (!selected) return true
      return variant.options?.[otherKey] === selected
    })
  })
}

function syncVariantFromOptions() {
  if (!useOptionPicker.value) return
  const match = activeVariants.value.find((variant) =>
    optionKeys.value.every(
      (key) => variant.options?.[key] === selectedOptions.value[key],
    ),
  )
  selectedVariantId.value = match?.id ?? null
}

function selectOption(key: string, value: string) {
  selectedOptions.value = { ...selectedOptions.value, [key]: value }
  syncVariantFromOptions()
}

const videoEmbed = computed(() => toEmbedUrl(product.value?.videoUrl))
const videoIsFile = computed(() => isDirectVideo(videoEmbed.value))

watch(
  product,
  (value) => {
    if (value) {
      quantity.value = 1
      const firstInStock = value.variants?.find(
        (item) => item.isActive && item.stock > 0,
      )
      const initial = firstInStock ?? value.variants?.[0] ?? null
      selectedVariantId.value = initial?.id ?? null
      selectedOptions.value = { ...(initial?.options ?? {}) }
    }
  },
  { immediate: true },
)

function addToCart() {
  if (!product.value) {
    return
  }

  if (isCallPrice.value) {
    toast.add({
      title: 'خرید آنلاین ممکن نیست',
      description: 'برای این کالا با پشتیبانی تماس بگیرید.',
      color: 'warning',
    })
    return
  }

  if (activeVariants.value.length && !selectedVariant.value) {
    toast.add({
      title: 'واریانت را انتخاب کنید',
      color: 'warning',
    })
    return
  }

  if (displayStock.value < 1) {
    toast.add({
      title: 'ناموجود',
      color: 'error',
    })
    return
  }

  try {
    add(product.value, quantity.value, selectedVariant.value)
    toast.add({
      title: 'به سبد اضافه شد',
      description: selectedVariant.value
        ? `${product.value.name} (${selectedVariant.value.label})`
        : product.value.name,
      color: 'success',
    })
  } catch {
    toast.add({
      title: 'واریانت را انتخاب کنید',
      color: 'warning',
    })
  }
}

async function onToggleWishlist() {
  if (!product.value) {
    return
  }

  try {
    const added = await toggle(product.value)
    toast.add({
      title: added ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد',
      description: product.value.name,
      color: added ? 'success' : 'neutral',
    })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'به‌روزرسانی علاقه‌مندی‌ها ممکن نشد'),
      color: 'error',
    })
  }
}

async function onSubmitReview(
  event: FormSubmitEvent<{ rating: number; comment: string }>,
) {
  if (!product.value || !user.value) {
    await navigateTo({
      path: '/auth/login',
      query: { redirect: route.fullPath },
    })
    return
  }

  reviewLoading.value = true
  reviewError.value = null

  try {
    await api<Review>('/reviews', {
      method: 'POST',
      body: {
        productId: product.value.id,
        rating: event.data.rating,
        comment: event.data.comment,
        images: reviewState.images,
      },
    })
    reviewState.comment = ''
    reviewState.rating = 5
    reviewState.images = []
    await refreshReviews()
    toast.add({
      title: 'نظر ثبت شد',
      description: 'پس از تایید مدیر نمایش داده می‌شود',
      color: 'success',
    })
  } catch (err) {
    reviewError.value = getApiErrorMessage(err, 'ثبت نظر ممکن نشد')
  } finally {
    reviewLoading.value = false
  }
}

async function onReviewImageChange(files: File[] | File | null | undefined) {
  const list = Array.isArray(files) ? files : files ? [files] : []
  if (!list.length) {
    return
  }
  const room = MAX_REVIEW_IMAGES - reviewState.images.length
  if (room < 1) {
    toast.add({
      title: `حداکثر ${MAX_REVIEW_IMAGES} تصویر`,
      color: 'warning',
    })
    return
  }

  reviewUploading.value = true
  reviewError.value = null
  try {
    for (const file of list.slice(0, room)) {
      const form = new FormData()
      form.append('file', file)
      const result = await api<{ url: string }>('/uploads/review-images', {
        method: 'POST',
        body: form,
      })
      reviewState.images.push(result.url)
    }
  } catch (err) {
    reviewError.value = getApiErrorMessage(err, 'آپلود تصویر ممکن نشد')
  } finally {
    reviewUploading.value = false
  }
}

function removeReviewImage(index: number) {
  reviewState.images.splice(index, 1)
}

async function onDeleteReview(id: string) {
  try {
    await api(`/reviews/${id}`, { method: 'DELETE' })
    await refreshReviews()
    toast.add({ title: 'نظر حذف شد', color: 'neutral' })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'حذف نظر ممکن نشد'),
      color: 'error',
    })
  }
}
</script>

<template>
  <UContainer class="space-y-10 py-10">
    <div
      v-if="status === 'pending'"
      class="grid gap-8 lg:grid-cols-2"
    >
      <USkeleton class="aspect-square rounded-lg" />
      <div class="space-y-4">
        <USkeleton class="h-8 w-2/3" />
        <USkeleton class="h-6 w-1/3" />
        <USkeleton class="h-24 w-full" />
      </div>
    </div>

    <template v-if="product">
    <UBreadcrumb
      class="mb-2"
      :items="breadcrumbItems"
    />

    <div
      class="grid gap-8 lg:grid-cols-2"
    >
      <div class="space-y-3">
        <div class="bg-elevated aspect-square overflow-hidden rounded-lg">
          <ShopImage
            :src="mainImage"
            :alt="product.name"
            :width="900"
            :height="900"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div
          v-if="gallery.length > 1"
          class="grid grid-cols-4 gap-2 sm:grid-cols-5"
          role="list"
          aria-label="گالری تصاویر محصول"
        >
          <button
            v-for="(image, index) in gallery"
            :key="`${image}-${index}`"
            type="button"
            class="bg-elevated aspect-square overflow-hidden rounded-md ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            :class="index === activeImage ? 'ring-2 ring-primary' : ''"
            :aria-label="`تصویر ${index + 1}`"
            :aria-pressed="index === activeImage"
            @click="activeImage = index"
          >
            <ShopImage
              :src="image"
              :alt="`${product.name} — تصویر ${index + 1}`"
              :width="120"
              :height="120"
              sizes="96px"
            />
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold text-highlighted">
            {{ product.name }}
          </h1>
          <p
            v-if="product.brandName && product.brandSlug"
            class="text-muted text-sm"
          >
            برند:
            <NuxtLink
              :to="`/brands/${product.brandSlug}`"
              class="text-highlighted hover:underline"
            >
              {{ product.brandName }}
            </NuxtLink>
          </p>
          <div
            v-if="isCallPrice"
            class="space-y-1"
          >
            <p class="text-xl text-default font-medium">
              تماس بگیرید
            </p>
            <UButton
              v-if="settings.supportPhone"
              :to="`tel:${settings.supportPhone}`"
              :label="settings.supportPhone"
              icon="i-lucide-phone"
              size="sm"
              variant="soft"
            />
            <UButton
              v-else
              to="/contact"
              label="تماس با پشتیبانی"
              icon="i-lucide-phone"
              size="sm"
              variant="soft"
            />
          </div>
          <div
            v-else
            class="flex flex-wrap items-baseline gap-3"
          >
            <p class="text-xl text-default">
              {{ formatPrice(displayPrice) }}
            </p>
            <p
              v-if="onSale"
              class="text-muted text-base line-through"
            >
              {{ formatPrice(product.price) }}
            </p>
          </div>
          <p
            v-if="saleEndsLabel"
            class="text-error text-sm"
          >
            پایان تخفیف: {{ saleEndsLabel }}
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <UBadge
              v-if="product.isFeatured"
              label="ویژه"
              color="primary"
              variant="subtle"
            />
            <UBadge
              v-if="onSale"
              label="تخفیف زمان‌دار"
              color="error"
              variant="subtle"
            />
            <UBadge
              v-if="displayStock < 1"
              label="ناموجود"
              color="error"
              variant="subtle"
            />
            <UBadge
              v-else-if="displayStock <= 5"
              :label="`موجودی کم · ${displayStock} ${product.unitSymbol || 'عدد'}`"
              color="warning"
              variant="subtle"
            />
            <UBadge
              v-else
              :label="`${displayStock} ${product.unitSymbol || 'عدد'} موجود`"
              color="success"
              variant="subtle"
            />
            <UBadge
              v-if="selectedVariant?.sku"
              :label="`SKU: ${selectedVariant.sku}`"
              color="neutral"
              variant="subtle"
            />
          </div>
          <p
            v-if="reviews?.count"
            class="text-muted text-sm"
          >
            امتیاز {{ reviews.average }} از ۵ · {{ reviews.count }} نظر
          </p>
        </div>

        <p class="text-default whitespace-pre-wrap">
          {{ product.description || 'توضیحی ثبت نشده است.' }}
        </p>

        <div
          v-if="useOptionPicker"
          class="space-y-4"
        >
          <div
            v-for="key in optionKeys"
            :key="key"
            class="space-y-2"
          >
            <p class="text-sm font-medium text-highlighted">
              {{ key }}
            </p>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="value in valuesForKey(key)"
                :key="`${key}:${value}`"
                :label="value"
                size="sm"
                :color="selectedOptions[key] === value ? 'primary' : 'neutral'"
                :variant="selectedOptions[key] === value ? 'solid' : 'soft'"
                :disabled="!isOptionValueAvailable(key, value)"
                @click="selectOption(key, value)"
              />
            </div>
          </div>
        </div>
        <UFormField
          v-else-if="variantItems.length"
          label="گزینه / واریانت"
          required
        >
          <USelect
            v-model="selectedVariantId"
            :items="variantItems"
            class="w-full max-w-md"
          />
        </UFormField>

        <div class="flex flex-wrap items-center gap-3">
          <UInputNumber
            v-model="quantity"
            :min="1"
            :max="Math.max(1, displayStock)"
            :disabled="displayStock < 1"
            class="w-28"
          />
          <UButton
            v-if="!isCallPrice"
            label="افزودن به سبد"
            icon="i-lucide-shopping-cart"
            :disabled="displayStock < 1 || (variantItems.length > 0 && !selectedVariant)"
            @click="addToCart"
          />
          <UButton
            v-else
            :to="settings.supportPhone ? `tel:${settings.supportPhone}` : '/contact'"
            label="تماس برای قیمت"
            icon="i-lucide-phone"
          />
          <UButton
            :label="wished ? 'حذف از علاقه‌مندی' : 'علاقه‌مندی'"
            icon="i-lucide-heart"
            color="neutral"
            :variant="wished ? 'soft' : 'ghost'"
            @click="onToggleWishlist"
          />
          <UButton
            to="/cart"
            label="مشاهده سبد"
            color="neutral"
            variant="ghost"
          />
        </div>
      </div>
    </div>
    </template>

    <section
      v-if="product?.specs?.length"
      class="space-y-4"
    >
      <h2 class="text-xl font-semibold text-highlighted">
        ویژگی‌ها و مشخصات
      </h2>
      <div class="border-default overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <tbody>
            <tr
              v-for="(spec, index) in product.specs"
              :key="`${spec.key}-${index}`"
              class="border-default border-b last:border-b-0"
              :class="index % 2 === 0 ? 'bg-elevated/40' : ''"
            >
              <th class="text-muted w-40 px-4 py-3 text-start font-medium sm:w-56">
                {{ spec.key }}
              </th>
              <td class="text-default px-4 py-3">
                {{ spec.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section
      v-if="videoEmbed"
      class="space-y-4"
    >
      <h2 class="text-xl font-semibold text-highlighted">
        ویدیو محصول
      </h2>
      <div class="border-default bg-elevated aspect-video overflow-hidden rounded-lg border">
        <video
          v-if="videoIsFile"
          :src="videoEmbed"
          controls
          class="size-full object-contain"
        />
        <iframe
          v-else
          :src="videoEmbed"
          title="ویدیو محصول"
          class="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>

    <section
      v-if="product && recentOthers.length"
      class="space-y-6"
    >
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold text-highlighted">
          اخیراً دیده‌اید
        </h2>
        <UButton
          to="/recent"
          label="همه"
          color="neutral"
          variant="ghost"
        />
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <RecentProductCard
          v-for="item in recentOthers"
          :key="item.productId"
          :item="item"
        />
      </div>
    </section>

    <section
      v-if="product && (alsoBoughtStatus === 'pending' || alsoBought?.length)"
      class="space-y-6"
    >
      <h2 class="text-xl font-semibold text-highlighted">
        مشتریان این را هم خریدند
      </h2>

      <div
        v-if="alsoBoughtStatus === 'pending'"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <USkeleton
          v-for="n in 4"
          :key="n"
          class="aspect-square rounded-lg"
        />
      </div>

      <div
        v-else-if="alsoBought?.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <ProductCard
          v-for="item in alsoBought"
          :key="item.id"
          :product="item"
        />
      </div>
    </section>

    <section
      v-if="product && (relatedStatus === 'pending' || related?.length)"
      class="space-y-6"
    >
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold text-highlighted">
          محصولات مرتبط
        </h2>
        <UButton
          v-if="product.categoryId"
          to="/products"
          label="همه محصولات"
          color="neutral"
          variant="ghost"
        />
      </div>

      <div
        v-if="relatedStatus === 'pending'"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <USkeleton
          v-for="n in 4"
          :key="n"
          class="aspect-square rounded-lg"
        />
      </div>

      <div
        v-else-if="related?.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <ProductCard
          v-for="item in related"
          :key="item.id"
          :product="item"
        />
      </div>
    </section>

    <section
      v-if="product"
      class="space-y-6"
    >
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-highlighted">
            نظرات
          </h2>
          <p class="text-muted mt-1 text-sm">
            تجربه خریداران این محصول
          </p>
        </div>
      </div>

      <div
        v-if="user && myReview && myReview.status !== 'approved'"
        class="border-default space-y-3 rounded-lg border p-5"
      >
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="font-medium text-highlighted">
            نظر شما
          </h3>
          <UBadge
            :label="REVIEW_STATUS_LABELS_FA[myReview.status]"
            :color="myReview.status === 'pending' ? 'warning' : 'error'"
            variant="subtle"
          />
        </div>
        <p class="text-muted text-sm">
          {{ myReview.rating }} از ۵ ·
          {{ new Date(myReview.createdAt).toLocaleString('fa-IR') }}
        </p>
        <p class="text-default text-sm whitespace-pre-wrap">
          {{ myReview.comment }}
        </p>
        <div
          v-if="myReview.images?.length"
          class="flex flex-wrap gap-2"
        >
          <a
            v-for="(src, index) in myReview.images"
            :key="`${src}-${index}`"
            :href="src"
            target="_blank"
            rel="noopener noreferrer"
            class="border-default block size-20 overflow-hidden rounded-md border"
          >
            <ShopImage
              :src="src"
              :alt="`تصویر نظر ${index + 1}`"
              :width="160"
              :height="160"
              sizes="80px"
              img-class="size-full object-cover"
            />
          </a>
        </div>
        <UButton
          label="حذف نظر"
          size="sm"
          color="error"
          variant="ghost"
          @click="onDeleteReview(myReview.id)"
        />
      </div>

      <div
        v-else-if="user && !myReview"
        class="border-default space-y-4 rounded-lg border p-5"
      >
        <h3 class="font-medium text-highlighted">
          ثبت نظر
        </h3>
        <UForm
          :schema="createReviewSchema.omit({ productId: true })"
          :state="reviewState"
          class="space-y-4"
          @submit="onSubmitReview"
        >
          <UFormField
            label="امتیاز"
            name="rating"
          >
            <USelect
              v-model="reviewState.rating"
              :items="ratingItems"
              class="w-40"
            />
          </UFormField>
          <UFormField
            label="نظر"
            name="comment"
          >
            <UTextarea
              v-model="reviewState.comment"
              :rows="3"
              class="w-full"
              placeholder="نظر خود را بنویسید"
            />
          </UFormField>
          <UFormField
            label="تصاویر (اختیاری)"
            name="images"
            :help="`تا ${MAX_REVIEW_IMAGES} تصویر`"
          >
            <div class="space-y-3">
              <div
                v-if="reviewState.images.length"
                class="flex flex-wrap gap-2"
              >
                <div
                  v-for="(src, index) in reviewState.images"
                  :key="`${src}-${index}`"
                  class="border-default relative size-20 overflow-hidden rounded-md border"
                >
                  <ShopImage
                    :src="src"
                    :alt="`پیش‌نمایش ${index + 1}`"
                    :width="160"
                    :height="160"
                    sizes="80px"
                    img-class="size-full object-cover"
                  />
                  <UButton
                    icon="i-lucide-x"
                    size="xs"
                    color="neutral"
                    variant="solid"
                    class="absolute end-1 top-1"
                    aria-label="حذف تصویر"
                    @click="removeReviewImage(index)"
                  />
                </div>
              </div>
              <UFileUpload
                v-if="reviewState.images.length < MAX_REVIEW_IMAGES"
                :key="reviewState.images.length"
                :model-value="null"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                label="افزودن تصویر"
                description="JPG، PNG، WEBP یا GIF"
                :disabled="reviewUploading"
                @update:model-value="onReviewImageChange"
              />
            </div>
          </UFormField>
          <UAlert
            v-if="reviewError"
            :title="reviewError"
            color="error"
            variant="subtle"
          />
          <UButton
            type="submit"
            label="ارسال نظر"
            :loading="reviewLoading || reviewUploading"
          />
        </UForm>
      </div>

      <div
        v-else-if="!user"
        class="border-default flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
      >
        <p class="text-muted text-sm">
          برای ثبت نظر وارد شوید.
        </p>
        <UButton
          :to="{ path: '/auth/login', query: { redirect: route.fullPath } }"
          label="ورود"
          size="sm"
        />
      </div>

      <div
        v-if="reviewsStatus === 'pending'"
        class="space-y-3"
      >
        <USkeleton
          v-for="n in 2"
          :key="n"
          class="h-24 rounded-lg"
        />
      </div>

      <ul
        v-else-if="reviews?.items.length"
        class="space-y-3"
      >
        <li
          v-for="item in reviews.items"
          :key="item.id"
          class="border-default space-y-2 rounded-lg border p-4"
        >
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p class="text-highlighted font-medium">
                {{ item.userFullName }}
              </p>
              <p class="text-muted text-sm">
                {{ item.rating }} از ۵ ·
                {{ new Date(item.createdAt).toLocaleString('fa-IR') }}
              </p>
            </div>
            <UButton
              v-if="user && (user.id === item.userId || user.role === 'owner' || user.role === 'admin')"
              label="حذف"
              size="sm"
              color="error"
              variant="ghost"
              @click="onDeleteReview(item.id)"
            />
          </div>
          <p class="text-default text-sm whitespace-pre-wrap">
            {{ item.comment }}
          </p>
          <div
            v-if="item.images?.length"
            class="flex flex-wrap gap-2"
          >
            <a
              v-for="(src, index) in item.images"
              :key="`${item.id}-${index}`"
              :href="src"
              target="_blank"
              rel="noopener noreferrer"
              class="border-default block size-20 overflow-hidden rounded-md border"
            >
              <ShopImage
                :src="src"
                :alt="`تصویر نظر ${index + 1}`"
                :width="160"
                :height="160"
                sizes="80px"
                img-class="size-full object-cover"
              />
            </a>
          </div>
          <div
            v-if="item.reply"
            class="bg-elevated mt-2 space-y-1 rounded-md p-3"
          >
            <p class="text-muted text-xs font-medium">
              پاسخ فروشگاه
              <span v-if="item.repliedAt">
                · {{ new Date(item.repliedAt).toLocaleString('fa-IR') }}
              </span>
            </p>
            <p class="text-default text-sm whitespace-pre-wrap">
              {{ item.reply }}
            </p>
          </div>
        </li>
      </ul>

      <p
        v-else
        class="text-muted"
      >
        هنوز نظری ثبت نشده است.
      </p>
    </section>
  </UContainer>
</template>
