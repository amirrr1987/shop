<script setup lang="ts">
import { formatPrice } from '~/data/products'
import { shippingMethods } from '~/data/checkout'

const { items, totalPrice } = useCart()
const { form } = useCheckout()

const shippingCost = computed(() =>
  shippingMethods.find(s => s.value === form.value.shipping)?.price ?? 0
)

const grandTotal = computed(() => totalPrice.value + shippingCost.value)
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{ root: 'ring-1 ring-default', body: 'space-y-4 p-4 sm:p-5' }"
  >
    <div class="space-y-1">
      <p class="text-sm font-medium text-default">
        خلاصه سفارش
      </p>
      <p class="text-xs text-muted">
        {{ items.length.toLocaleString('fa-IR') }} قلم در سبد
      </p>
    </div>

    <ul class="max-h-64 space-y-3 overflow-y-auto">
      <li
        v-for="item in items"
        :key="item.product.id"
        class="flex items-center gap-3"
      >
        <NuxtImg
          :src="item.product.image"
          :alt="item.product.name"
          width="48"
          height="48"
          loading="lazy"
          class="size-12 shrink-0 rounded-md object-cover ring-1 ring-default"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-default">
            {{ item.product.name }}
          </p>
          <p class="text-xs text-muted">
            {{ item.quantity.toLocaleString('fa-IR') }} × {{ formatPrice(item.product.price) }}
          </p>
        </div>
        <span class="shrink-0 text-sm font-medium text-default">
          {{ formatPrice(item.product.price * item.quantity) }}
        </span>
      </li>
    </ul>

    <USeparator />

    <div class="space-y-2 text-sm">
      <div class="flex items-center justify-between text-muted">
        <span>جمع جزء</span>
        <span class="font-medium text-default">{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="flex items-center justify-between text-muted">
        <span>ارسال</span>
        <span class="font-medium text-default">{{ formatPrice(shippingCost) }}</span>
      </div>
      <USeparator />
      <div class="flex items-center justify-between">
        <span class="font-medium text-default">مبلغ نهایی</span>
        <span class="text-lg font-semibold text-primary">{{ formatPrice(grandTotal) }}</span>
      </div>
    </div>
  </UCard>
</template>
