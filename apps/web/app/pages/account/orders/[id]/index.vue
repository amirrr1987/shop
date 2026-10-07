<script setup lang="ts">
import type { Order } from '@shop/shared'

definePageMeta({
  middleware: 'auth',
})

usePrivateSeo('جزئیات سفارش')

const route = useRoute()
const api = useApi()
const toast = useToast()
const id = computed(() => String(route.params.id))
const cancelling = ref(false)

const { data: order, error, status, refresh } = await useAsyncData(
  () => `order-${id.value}`,
  () => api<Order>(`/orders/${id.value}`),
  { watch: [id] },
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'سفارش پیدا نشد',
  })
}

const canCancel = computed(
  () =>
    order.value?.status === 'pending' &&
    order.value?.paymentStatus === 'pending',
)

const canPay = computed(
  () =>
    order.value?.status === 'pending' &&
    order.value?.paymentStatus === 'pending',
)

async function cancelOrder() {
  if (!order.value || !canCancel.value) {
    return
  }

  cancelling.value = true
  try {
    await api<Order>(`/orders/${order.value.id}/cancel`, { method: 'POST' })
    await refresh()
    toast.add({ title: 'سفارش لغو شد', color: 'success' })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'لغو سفارش ممکن نشد'),
      color: 'error',
    })
  } finally {
    cancelling.value = false
  }
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <UBreadcrumb
          :items="[
            { label: 'سفارش‌ها', to: '/account/orders' },
            { label: 'جزئیات' },
          ]"
        />
        <h1 class="mt-4 text-2xl font-semibold text-highlighted">
          جزئیات سفارش
        </h1>
      </div>
      <div
        v-if="order"
        class="flex flex-wrap items-center gap-2"
      >
        <UBadge
          :label="orderStatusLabel(order.status)"
          :color="orderStatusColor(order.status)"
          variant="subtle"
        />
        <UBadge
          :label="paymentStatusLabel(order.paymentStatus)"
          :color="paymentStatusColor(order.paymentStatus)"
          variant="outline"
        />
        <UButton
          :to="`/account/orders/${order.id}/invoice`"
          label="فاکتور"
          color="neutral"
          variant="soft"
          size="sm"
          icon="i-lucide-printer"
        />
        <UButton
          v-if="canPay"
          :to="`/checkout/callback?orderId=${order.id}`"
          label="پرداخت"
          size="sm"
        />
        <UButton
          v-if="canCancel"
          label="لغو سفارش"
          color="error"
          variant="soft"
          :loading="cancelling"
          @click="cancelOrder"
        />
      </div>
    </div>

    <USkeleton
      v-if="status === 'pending'"
      class="h-48 rounded-lg"
    />

    <template v-else-if="order">
      <div class="grid gap-6 lg:grid-cols-2">
        <section class="border-default space-y-3 rounded-lg border p-5">
          <h2 class="font-medium text-highlighted">
            اقلام
          </h2>
          <ul class="space-y-2 text-sm">
            <li
              v-for="item in order.items"
              :key="`${item.productId}-${item.name}`"
              class="text-muted flex justify-between gap-3"
            >
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>{{ formatPrice(item.unitPrice * item.quantity) }}</span>
            </li>
          </ul>
          <div class="border-default space-y-2 border-t pt-3 text-sm">
            <div class="text-muted flex justify-between gap-3">
              <span>جمع جزء</span>
              <span>{{ formatPrice(order.subtotal) }}</span>
            </div>
            <div
              v-if="order.discount"
              class="flex justify-between gap-3 text-success"
            >
              <span>تخفیف {{ order.couponCode ? `(${order.couponCode})` : '' }}</span>
              <span>− {{ formatPrice(order.discount) }}</span>
            </div>
            <div
              v-if="order.shippingMethodName"
              class="text-muted flex justify-between gap-3"
            >
              <span>ارسال ({{ order.shippingMethodName }})</span>
              <span>
                {{
                  order.shippingCost
                    ? formatPrice(order.shippingCost)
                    : 'رایگان'
                }}
              </span>
            </div>
            <div
              v-if="order.taxAmount"
              class="text-muted flex justify-between gap-3"
            >
              <span>مالیات</span>
              <span>{{ formatPrice(order.taxAmount) }}</span>
            </div>
            <div class="text-highlighted flex justify-between font-semibold">
              <span>قابل پرداخت</span>
              <span>{{ formatPrice(order.total) }}</span>
            </div>
            <div
              v-if="order.refundedAmount"
              class="flex justify-between gap-3 text-error"
            >
              <span>مسترد شده</span>
              <span>− {{ formatPrice(order.refundedAmount) }}</span>
            </div>
            <p
              v-if="order.paymentRefId"
              class="text-muted pt-1 text-xs"
            >
              کد پیگیری پرداخت: {{ order.paymentRefId }}
            </p>
            <p
              v-if="order.trackingCode"
              class="text-muted pt-1 text-xs"
            >
              کد رهگیری ارسال: {{ order.trackingCode }}
            </p>
          </div>
        </section>

        <section class="border-default space-y-2 rounded-lg border p-5">
          <h2 class="font-medium text-highlighted">
            آدرس ارسال
          </h2>
          <p class="text-default">
            {{ order.address.fullName }}
          </p>
          <p class="text-muted text-sm">
            {{ order.address.phone }}
          </p>
          <p class="text-muted text-sm">
            {{ order.address.line }}
          </p>
          <p class="text-muted text-sm">
            {{ order.address.city }}، {{ order.address.province }}
            {{ order.address.postalCode }}
          </p>
          <p class="text-muted mt-4 text-sm">
            ثبت‌شده در {{ new Date(order.createdAt).toLocaleString('fa-IR') }}
          </p>
          <div
            v-if="order.note"
            class="border-default mt-4 space-y-1 border-t pt-3"
          >
            <h3 class="font-medium text-highlighted">
              یادداشت
            </h3>
            <p class="text-muted text-sm whitespace-pre-wrap">
              {{ order.note }}
            </p>
          </div>
        </section>
      </div>
    </template>
  </UContainer>
</template>
