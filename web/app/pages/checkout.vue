<script setup lang="ts">
import { shippingMethods } from '~/data/checkout'

const router = useRouter()
const { items, totalPrice, clear } = useCart()
const { form, placeOrder } = useCheckout()

useSeoMeta({ title: 'تسویه حساب — روزر' })

onMounted(() => {
  if (!items.value.length) {
    navigateTo('/cart')
  }
})

const shippingCost = computed(() =>
  shippingMethods.find(s => s.value === form.value.shipping)?.price ?? 0
)

const grandTotal = computed(() => totalPrice.value + shippingCost.value)

const { captureError } = useMonitoring()

function onSubmit() {
  try {
    const orderId = placeOrder(items.value, grandTotal.value)
    clear()
    router.push({ path: '/thank-you', query: { order: orderId } })
  } catch (error) {
    captureError(error, {
      route: 'checkout',
      itemCount: items.value.length,
      total: grandTotal.value
    })
    throw error
  }
}
</script>

<template>
  <UContainer class="py-6 sm:py-8">
    <UPage>
      <UPageBody
        :ui="{
          base: 'mt-0 space-y-6 pb-8 sm:space-y-8 sm:pb-10'
        }"
      >
        <div class="space-y-6 sm:space-y-8">
          <UBreadcrumb
            :items="[
              { label: 'خانه', to: '/' },
              { label: 'سبد خرید', to: '/cart' },
              { label: 'تسویه حساب', to: '/checkout' }
            ]"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <UPageHeader
            headline="پرداخت"
            title="تسویه حساب"
            :description="`${items.length.toLocaleString('fa-IR')} قلم — اطلاعات تحویل و پرداخت را تکمیل کنید.`"
            :ui="{
              root: 'border-b border-default pb-6',
              title: 'text-2xl sm:text-3xl',
              description: 'text-base text-muted'
            }"
          />

          <div class="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div class="min-w-0 lg:col-span-8">
              <CheckoutForm @submit="onSubmit" />
            </div>
            <div class="min-w-0 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <CheckoutOrderSummary />
            </div>
          </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
