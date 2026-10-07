<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const { items, subtotal, setQuantity, remove } = useCart()
const { formatPrice } = useCurrency()

function lineKey(productId: string, variantId: string | null) {
  return `${productId}::${variantId || ''}`
}

function closeAndGo(path: string) {
  open.value = false
  return navigateTo(path)
}
</script>

<template>
  <USlideover
    v-model:open="open"
    title="سبد خرید"
    description="محصولات انتخاب‌شده"
    side="left"
  >
    <template #body>
      <EmptyState
        v-if="!items.length"
        title="سبد خرید خالی است"
        description="هنوز محصولی اضافه نکرده‌اید."
        icon="i-lucide-shopping-cart"
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
          :key="lineKey(item.productId, item.variantId)"
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
            <div class="flex items-center gap-2">
              <UInputNumber
                :model-value="item.quantity"
                :min="1"
                :max="Math.max(item.stock, 1)"
                size="sm"
                class="w-24"
                @update:model-value="
                  setQuantity(
                    item.productId,
                    Number($event || 1),
                    item.variantId,
                  )
                "
              />
              <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                size="sm"
                aria-label="حذف از سبد"
                @click="remove(item.productId, item.variantId)"
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
      <div class="flex w-full flex-col gap-3">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted">جمع جزء</span>
          <span class="text-highlighted font-semibold">
            {{ formatPrice(subtotal) }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <UButton
            label="مشاهده سبد"
            color="neutral"
            variant="outline"
            block
            @click="closeAndGo('/cart')"
          />
          <UButton
            label="تسویه حساب"
            icon="i-lucide-credit-card"
            block
            @click="closeAndGo('/checkout')"
          />
        </div>
      </div>
    </template>
  </USlideover>
</template>
