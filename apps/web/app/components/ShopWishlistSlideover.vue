<script setup lang="ts">
import type { Product } from '@shop/shared'

const open = defineModel<boolean>('open', { default: false })

const api = useApi()
const toast = useToast()
const { items, remove } = useWishlist()
const { add: addToCart } = useCart()
const { formatPrice } = useCurrency()

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
      open.value = false
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

function closeAndGo(path: string) {
  open.value = false
  return navigateTo(path)
}
</script>

<template>
  <USlideover
    v-model:open="open"
    title="علاقه‌مندی‌ها"
    description="محصولات ذخیره‌شده"
    side="left"
  >
    <template #body>
      <EmptyState
        v-if="!items.length"
        title="لیست علاقه‌مندی خالی است"
        description="محصولاتی که دوست دارید را اینجا ذخیره کنید."
        icon="i-lucide-heart"
      >
        <template #actions>
          <UButton
            label="مشاهده محصولات"
            @click="closeAndGo('/products')"
          />
        </template>
      </EmptyState>

      <ul
        v-else
        class="divide-default divide-y"
      >
        <li
          v-for="item in items"
          :key="item.productId"
          class="flex gap-3 py-3"
        >
          <NuxtLink
            :to="`/products/${item.slug}`"
            class="bg-elevated size-16 shrink-0 overflow-hidden rounded-lg"
            @click="open = false"
          >
            <ShopImage
              :src="item.image"
              :alt="item.name"
              :width="64"
              :height="64"
              sizes="64px"
            />
          </NuxtLink>

          <div class="min-w-0 flex-1 space-y-2">
            <NuxtLink
              :to="`/products/${item.slug}`"
              class="text-highlighted line-clamp-2 text-sm font-medium hover:underline"
              @click="open = false"
            >
              {{ item.name }}
            </NuxtLink>
            <p class="text-muted text-xs">
              {{ formatPrice(item.price) }}
            </p>
            <div class="flex flex-wrap gap-1">
              <UButton
                label="سبد"
                icon="i-lucide-shopping-cart"
                size="xs"
                :disabled="item.stock < 1"
                @click="moveToCart(item.productId)"
              />
              <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                size="xs"
                aria-label="حذف"
                @click="onRemove(item.productId, item.name)"
              />
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template
      v-if="items.length"
      #footer
    >
      <UButton
        label="مشاهده همه"
        color="neutral"
        variant="outline"
        block
        @click="closeAndGo('/wishlist')"
      />
    </template>
  </USlideover>
</template>
