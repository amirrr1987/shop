<script setup lang="ts">
import { formatPrice } from '~/data/products'

const open = defineModel<boolean>('open', { default: false })

const { items, totalPrice, updateQuantity, remove } = useCart()
</script>

<template>
  <USlideover
    v-model:open="open"
    title="سبد خرید"
    description="محصولات انتخاب‌شده شما"
  >
    <template #body>
      <UEmpty
        v-if="!items.length"
        icon="i-lucide-shopping-cart"
        title="سبد خرید خالی است"
        description="هنوز محصولی اضافه نکرده‌اید"
        :actions="[{ label: 'رفتن به فروشگاه', to: '/shop', icon: 'i-lucide-store' }]"
      />

      <UPageList v-else>
        <UCard
          v-for="item in items"
          :key="item.product.id"
        >
          <UUser
            :name="item.product.name"
            :description="formatPrice(item.product.price)"
            :avatar="item.product.image"
          />

          <template #footer>
            <UFieldGroup orientation="horizontal">
              <UInputNumber
                :model-value="item.quantity"
                :min="1"
                :max="99"
                @update:model-value="updateQuantity(item.product.id, $event ?? 1)"
              />
              <UButton
                color="error"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="remove(item.product.id)"
              />
            </UFieldGroup>
          </template>
        </UCard>
      </UPageList>
    </template>

    <template #footer>
      <UAlert
        v-if="items.length"
        color="primary"
        variant="subtle"
        icon="i-lucide-receipt"
        :title="`جمع کل: ${formatPrice(totalPrice)}`"
      />
      <UFieldGroup orientation="horizontal">
        <UButton
          label="مشاهده سبد"
          color="neutral"
          variant="outline"
          to="/cart"
          block
        />
        <UButton
          label="تسویه حساب"
          icon="i-lucide-credit-card"
          to="/checkout"
          block
        />
      </UFieldGroup>
    </template>
  </USlideover>
</template>
