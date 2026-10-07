<script setup lang="ts">
import type { Product } from '@shop/shared'
import type { CartIssue } from '~/composables/useCart'

useShopSeo({
  title: 'سبد خرید',
  path: '/cart',
  noindex: true,
})

const { items, subtotal, canCheckout, setQuantity, remove, clear, sync } =
  useCart()
const toast = useToast()
const api = useApi()
const storageReady = useState('cart-storage-ready', () => false)

const syncing = ref(false)
const issues = ref<CartIssue[]>([])

watch(
  storageReady,
  async (ready) => {
    if (!ready || !items.value.length) {
      return
    }

    syncing.value = true
    try {
      issues.value = await sync()
    } catch (err) {
      toast.add({
        title: getApiErrorMessage(err, 'به‌روزرسانی سبد ممکن نشد'),
        color: 'error',
      })
    } finally {
      syncing.value = false
    }
  },
  { immediate: true },
)

const productIdsKey = computed(() =>
  items.value
    .map((item) => item.productId)
    .sort()
    .join(','),
)

const { data: upsell, status: upsellStatus } = await useAsyncData(
  () => `cart-upsell-${productIdsKey.value || 'empty'}`,
  async () => {
    const ids = items.value.map((item) => item.productId)
    if (!ids.length) {
      return [] as Product[]
    }
    return api<Product[]>('/products/cart-upsell', {
      method: 'POST',
      body: { productIds: ids, limit: 4 },
    })
  },
  { watch: [productIdsKey] },
)

function onClear() {
  clear()
  issues.value = []
  toast.add({
    title: 'سبد خالی شد',
    color: 'neutral',
  })
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-2xl font-semibold text-highlighted">
        سبد خرید
      </h1>
      <UButton
        v-if="storageReady && items.length"
        label="خالی کردن"
        color="neutral"
        variant="ghost"
        @click="onClear"
      />
    </div>

    <UAlert
      v-if="issues.length"
      title="سبد به‌روز شد"
      color="warning"
      variant="subtle"
      :description="issues.map((issue) => `${issue.name}: ${issue.message}`).join(' · ')"
    />

    <div
      v-if="!storageReady || syncing"
      class="space-y-3"
    >
      <USkeleton class="h-24 rounded-lg" />
      <USkeleton class="h-24 rounded-lg" />
    </div>

    <EmptyState
      v-else-if="!items.length"
      title="سبد خرید خالی است"
      description="محصولی را انتخاب کنید و برای پرداخت به سبد برگردید."
      icon="i-lucide-shopping-cart"
      action-label="مشاهده محصولات"
      action-to="/products"
    />

    <div
      v-else
      class="grid gap-8 lg:grid-cols-[1fr_20rem]"
    >
      <ul class="divide-default divide-y">
        <li
          v-for="item in items"
          :key="item.productId"
          class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center"
        >
          <NuxtLink
            :to="`/products/${item.slug}`"
            class="bg-elevated size-20 shrink-0 overflow-hidden rounded-lg"
          >
            <ShopImage
              :src="item.image"
              :alt="item.name"
              :width="80"
              :height="80"
              sizes="80px"
            />
          </NuxtLink>

          <div class="min-w-0 flex-1 space-y-1">
            <NuxtLink
              :to="`/products/${item.slug}`"
              class="text-highlighted font-medium hover:underline"
            >
              {{ item.name }}
            </NuxtLink>
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-muted text-sm">
                {{ formatPrice(item.price) }}
              </p>
              <UBadge
                v-if="item.stock < 1"
                label="ناموجود"
                color="error"
                variant="subtle"
                size="sm"
              />
              <UBadge
                v-else-if="item.stock < 5"
                :label="`${item.stock} عدد باقی‌مانده`"
                color="warning"
                variant="subtle"
                size="sm"
              />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <UInputNumber
              :model-value="item.quantity"
              :min="1"
              :max="item.stock"
              class="w-28"
              @update:model-value="setQuantity(item.productId, Number($event || 1), item.variantId)"
            />
            <p class="text-default w-28 text-end font-medium">
              {{ formatPrice(item.price * item.quantity) }}
            </p>
            <UButton
              icon="i-lucide-trash-2"
              color="neutral"
              variant="ghost"
              aria-label="حذف"
              @click="remove(item.productId, item.variantId)"
            />
          </div>
        </li>
      </ul>

      <aside class="border-default bg-elevated h-fit space-y-4 rounded-lg border p-5">
        <div class="flex items-center justify-between">
          <span class="text-muted">جمع</span>
          <span class="text-highlighted font-semibold">
            {{ formatPrice(subtotal) }}
          </span>
        </div>
        <UButton
          to="/checkout"
          label="ادامه خرید"
          block
          icon="i-lucide-arrow-left"
          trailing
          :disabled="!canCheckout"
        />
        <UButton
          to="/products"
          label="بازگشت به محصولات"
          block
          color="neutral"
          variant="ghost"
        />
      </aside>
    </div>

    <section
      v-if="items.length && (upsellStatus === 'pending' || upsell?.length)"
      class="space-y-4"
    >
      <h2 class="text-lg font-semibold text-highlighted">
        پیشنهاد برای سبد شما
      </h2>
      <div
        v-if="upsellStatus === 'pending'"
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <USkeleton
          v-for="n in 4"
          :key="n"
          class="h-40 rounded-lg"
        />
      </div>
      <div
        v-else-if="upsell?.length"
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in upsell"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </UContainer>
</template>
