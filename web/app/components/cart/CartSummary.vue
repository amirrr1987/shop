<script setup lang="ts">
import { formatPrice } from '~/data/products'
import { countryOptions, shippingMethods } from '~/data/checkout'

const { items, totalPrice, clear } = useCart()

const coupon = ref('')
const country = ref('IR')
const shipping = ref('express')

const shippingCost = computed(() =>
  shippingMethods.find(s => s.value === shipping.value)?.price ?? 0
)

const grandTotal = computed(() => totalPrice.value + shippingCost.value)

const couponDiscount = computed(() =>
  coupon.value.toUpperCase() === 'ROZER10' ? Math.round(totalPrice.value * 0.1) : 0
)

const finalTotal = computed(() => grandTotal.value - couponDiscount.value)
</script>

<template>
  <div class="space-y-4">
    <UCard
      variant="subtle"
      :ui="{ root: 'ring-1 ring-default', body: 'space-y-4 p-4 sm:p-5' }"
    >
      <div class="space-y-1">
        <p class="text-sm font-medium text-default">
          برآورد ارسال
        </p>
        <p class="text-xs text-muted">
          مقصد و روش ارسال را انتخاب کنید
        </p>
      </div>

      <UFormField label="کشور">
        <USelect
          v-model="country"
          :items="countryOptions"
          value-key="value"
          label-key="label"
        />
      </UFormField>

      <UFormField label="روش ارسال">
        <USelect
          v-model="shipping"
          :items="shippingMethods"
          value-key="value"
          label-key="label"
        />
      </UFormField>
    </UCard>

    <UCard
      variant="subtle"
      :ui="{ root: 'ring-1 ring-default', body: 'space-y-4 p-4 sm:p-5' }"
    >
      <p class="text-sm font-medium text-default">
        کد تخفیف
      </p>

      <UFieldGroup orientation="horizontal">
        <UInput
          v-model="coupon"
          placeholder="کد تخفیف (ROZER10)"
          icon="i-lucide-ticket"
          class="min-w-0 flex-1"
        />
        <UButton
          label="اعمال"
          icon="i-lucide-check"
        />
      </UFieldGroup>

      <UAlert
        v-if="couponDiscount"
        color="success"
        variant="subtle"
        icon="i-lucide-badge-percent"
        :title="`تخفیف: ${formatPrice(couponDiscount)}`"
      />
    </UCard>

    <UCard
      variant="subtle"
      :ui="{ root: 'ring-1 ring-default', body: 'space-y-4 p-4 sm:p-5' }"
    >
      <p class="text-sm font-medium text-default">
        جمع کل
      </p>

      <div class="space-y-2 text-sm">
        <div class="flex items-center justify-between text-muted">
          <span>جمع جزء</span>
          <span class="font-medium text-default">{{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="flex items-center justify-between text-muted">
          <span>هزینه ارسال</span>
          <span class="font-medium text-default">{{ formatPrice(shippingCost) }}</span>
        </div>
        <div
          v-if="couponDiscount"
          class="flex items-center justify-between text-success"
        >
          <span>تخفیف</span>
          <span class="font-medium">−{{ formatPrice(couponDiscount) }}</span>
        </div>
        <USeparator />
        <div class="flex items-center justify-between">
          <span class="font-medium text-default">مبلغ قابل پرداخت</span>
          <span class="text-lg font-semibold text-primary">{{ formatPrice(finalTotal) }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-2 pt-2">
        <UButton
          label="تسویه حساب"
          icon="i-lucide-credit-card"
          to="/checkout"
          block
        />
        <UButton
          label="ادامه خرید"
          color="neutral"
          variant="outline"
          icon="i-lucide-store"
          to="/shop"
          block
        />
        <UButton
          label="پاک کردن سبد"
          color="error"
          variant="ghost"
          icon="i-lucide-trash-2"
          block
          @click="clear"
        />
      </div>
    </UCard>
  </div>
</template>
