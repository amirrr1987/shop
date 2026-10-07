<script setup lang="ts">
import type { Order } from '@shop/shared'

usePrivateSeo('سفارش ثبت شد', '/checkout/thank-you')

const route = useRoute()
const api = useApi()
const { formatPrice } = useCurrency()
const { user, fetchMe } = useAuth()
const { read: readGuestToken, save: saveGuestToken } = useGuestOrderToken()
const settings = useStoreSettingsState()

if (import.meta.client && !user.value) {
  await fetchMe()
}

const orderId = computed(() =>
  typeof route.query.orderId === 'string' ? route.query.orderId : '',
)

const guestToken = computed(() => {
  if (typeof route.query.token === 'string' && route.query.token) {
    return route.query.token
  }
  return orderId.value ? readGuestToken(orderId.value) : null
})

watch(
  [orderId, () => route.query.token],
  () => {
    if (
      orderId.value
      && typeof route.query.token === 'string'
      && route.query.token
    ) {
      saveGuestToken(orderId.value, route.query.token)
    }
  },
  { immediate: true },
)

const { data: order, status, error } = await useAsyncData(
  () => `thank-you-order-${orderId.value}-${guestToken.value || ''}`,
  async () => {
    if (!orderId.value) {
      return null
    }
    return api<Order>(`/orders/${orderId.value}`, {
      query: guestToken.value ? { token: guestToken.value } : undefined,
    })
  },
  { watch: [orderId, guestToken] },
)

const shopName = computed(() => settings.value.shopName || 'فروشگاه')
const paid = computed(() => order.value?.paymentStatus === 'paid')
</script>

<template>
  <UContainer class="space-y-8 py-12">
    <div class="mx-auto max-w-2xl space-y-6 text-center">
      <div
        class="bg-success/10 text-success mx-auto flex size-16 items-center justify-center rounded-full"
      >
        <UIcon
          name="i-lucide-party-popper"
          class="size-8"
        />
      </div>

      <div class="space-y-2">
        <h1 class="text-highlighted text-3xl font-semibold tracking-tight">
          {{ paid ? 'از خرید شما سپاسگزاریم' : 'سفارش شما ثبت شد' }}
        </h1>
        <p class="text-muted">
          {{ shopName }} سفارش‌تان را دریافت کرد
          <template v-if="paid">
            و پرداخت با موفقیت انجام شد.
          </template>
          <template v-else>
            .
          </template>
        </p>
      </div>
    </div>

    <div
      v-if="status === 'pending'"
      class="mx-auto max-w-xl"
    >
      <USkeleton class="h-48 w-full rounded-lg" />
    </div>

    <UAlert
      v-else-if="error || !order"
      title="خلاصه سفارش در دسترس نیست"
      description="اگر همین الان پرداخت کرده‌اید، از حساب کاربری یا لینک پیگیری سفارش مهمان استفاده کنید."
      color="warning"
      variant="subtle"
      class="mx-auto max-w-xl"
    />

    <div
      v-else
      class="border-default mx-auto max-w-xl space-y-5 rounded-lg border p-6 text-start"
    >
      <div class="space-y-1">
        <p class="text-muted text-sm">
          شماره سفارش
        </p>
        <p class="text-highlighted font-mono text-sm font-medium break-all">
          {{ order.id }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
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
        <UBadge
          v-if="order.paymentRefId"
          :label="`پیگیری: ${order.paymentRefId}`"
          color="neutral"
          variant="subtle"
        />
      </div>

      <p class="text-default text-lg font-semibold">
        مبلغ:
        {{ formatPrice(order.total) }}
      </p>

      <ul
        v-if="order.items?.length"
        class="divide-default divide-y"
      >
        <li
          v-for="item in order.items"
          :key="`${item.productId}-${item.variantId || ''}`"
          class="flex items-center justify-between gap-3 py-3 text-sm"
        >
          <span class="text-highlighted min-w-0 truncate">
            {{ item.name }}
            <span class="text-muted">× {{ item.quantity }}</span>
          </span>
          <span class="text-default shrink-0 font-medium">
            {{ formatPrice(item.unitPrice * item.quantity) }}
          </span>
        </li>
      </ul>

      <UAlert
        v-if="!user && guestToken"
        title="لینک این صفحه را نگه دارید"
        description="برای مشاهده مجدد سفارش مهمان به همین آدرس با توکن نیاز دارید."
        color="neutral"
        variant="subtle"
      />

      <div class="flex flex-wrap gap-3 pt-2">
        <UButton
          v-if="user"
          :to="`/account/orders/${order.id}`"
          label="مشاهده سفارش"
          icon="i-lucide-package"
        />
        <UButton
          to="/products"
          label="ادامه خرید"
          icon="i-lucide-store"
          color="neutral"
          variant="soft"
        />
        <UButton
          to="/"
          label="صفحه اصلی"
          color="neutral"
          variant="ghost"
        />
      </div>
    </div>
  </UContainer>
</template>
