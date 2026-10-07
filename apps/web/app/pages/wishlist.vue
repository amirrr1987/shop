<script setup lang="ts">
import type { Product } from '@shop/shared'

useShopSeo({
  title: 'علاقه‌مندی‌ها',
  path: '/wishlist',
  noindex: true,
})

const { items, count, remove, clear, sync } = useWishlist()
const { add: addToCart } = useCart()
const toast = useToast()
const api = useApi()
const storageReady = useState('wishlist-storage-ready', () => false)
const syncing = ref(false)

watch(
  storageReady,
  async (ready) => {
    if (!ready || !items.value.length) {
      return
    }

    syncing.value = true
    try {
      await sync()
    } catch (err) {
      toast.add({
        title: getApiErrorMessage(err, 'به‌روزرسانی علاقه‌مندی‌ها ممکن نشد'),
        color: 'error',
      })
    } finally {
      syncing.value = false
    }
  },
  { immediate: true },
)

async function onClear() {
  try {
    await clear()
    toast.add({ title: 'لیست خالی شد', color: 'neutral' })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'خالی کردن لیست ممکن نشد'),
      color: 'error',
    })
  }
}

async function onRemove(productId: string, name: string) {
  try {
    await remove(productId)
    toast.add({
      title: 'حذف شد',
      description: name,
      color: 'neutral',
    })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'حذف از علاقه‌مندی‌ها ممکن نشد'),
      color: 'error',
    })
  }
}

async function moveToCart(productId: string) {
  const item = items.value.find((row) => row.productId === productId)
  if (!item || item.stock < 1) {
    return
  }

  try {
    const product = await api<Product>(`/products/${item.slug}`)
    if ((product.variants?.length ?? 0) > 0) {
      await navigateTo(`/products/${product.slug}`)
      return
    }
    addToCart(product, 1)
    await remove(productId)
    toast.add({
      title: 'به سبد منتقل شد',
      description: product.name,
      color: 'success',
    })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'انتقال به سبد ممکن نشد'),
      color: 'error',
    })
  }
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          علاقه‌مندی‌ها
        </h1>
        <p class="mt-1 text-muted">
          {{ count }} مورد
        </p>
      </div>
      <UButton
        v-if="storageReady && items.length"
        label="خالی کردن"
        color="neutral"
        variant="ghost"
        @click="onClear"
      />
    </div>

    <div
      v-if="!storageReady || syncing"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <USkeleton
        v-for="n in 3"
        :key="n"
        class="aspect-square rounded-lg"
      />
    </div>

    <EmptyState
      v-else-if="!items.length"
      title="لیست علاقه‌مندی خالی است"
      description="با زدن قلب روی کارت محصول اینجا ذخیره می‌شود؛ بعد از ورود با حساب همگام می‌ماند."
      icon="i-lucide-heart"
      action-label="مشاهده محصولات"
      action-to="/products"
    />

    <ul
      v-else
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="item in items"
        :key="item.productId"
        class="border-default space-y-3 rounded-lg border p-4"
      >
        <NuxtLink
          :to="`/products/${item.slug}`"
          class="bg-elevated block aspect-square overflow-hidden rounded-lg"
        >
          <ShopImage
            :src="item.image"
            :alt="item.name"
            :width="480"
            :height="480"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </NuxtLink>

        <div class="space-y-1">
          <NuxtLink
            :to="`/products/${item.slug}`"
            class="text-highlighted font-medium hover:underline"
          >
            {{ item.name }}
          </NuxtLink>
          <p class="text-default">
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
            v-else-if="item.stock <= 5"
            label="موجودی کم"
            color="warning"
            variant="subtle"
            size="sm"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <UButton
            label="افزودن به سبد"
            size="sm"
            :disabled="item.stock < 1"
            @click="moveToCart(item.productId)"
          />
          <UButton
            label="حذف"
            size="sm"
            color="neutral"
            variant="ghost"
            @click="onRemove(item.productId, item.name)"
          />
        </div>
      </li>
    </ul>
  </UContainer>
</template>
