<script setup lang="ts">
import type { Order, StartPaymentResult, VerifyPaymentResult } from '@shop/shared'

usePrivateSeo('نتیجه پرداخت', '/checkout/callback')

const route = useRoute()
const api = useApi()
const toast = useToast()
const { track } = useAnalytics()
const { user, fetchMe } = useAuth()
const { save: saveGuestToken, read: readGuestToken } = useGuestOrderToken()

if (import.meta.client && !user.value) {
  await fetchMe()
}

function trackPurchaseIfPaid(next: Order | null | undefined, ok: boolean) {
  if (!next || !ok || next.paymentStatus !== 'paid') {
    return
  }
  track('purchase', {
    order_id: next.id,
    value: next.total,
    currency: 'IRR',
  })
}

const orderId = computed(() =>
  typeof route.query.orderId === 'string' ? route.query.orderId : '',
)
const authority = computed(() =>
  typeof route.query.Authority === 'string' ? route.query.Authority : '',
)
const gatewayStatus = computed(() =>
  typeof route.query.Status === 'string' ? route.query.Status : '',
)
const serverVerified = computed(() => route.query.serverVerified === '1')
const queryMessage = computed(() =>
  typeof route.query.message === 'string' ? route.query.message : null,
)
const queryOk = computed(() => route.query.ok === '1')

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
      orderId.value &&
      typeof route.query.token === 'string' &&
      route.query.token
    ) {
      saveGuestToken(orderId.value, route.query.token)
    }
  },
  { immediate: true },
)

const paying = ref(false)
const verifying = ref(false)
const verifyMessage = ref<string | null>(null)

const { data: order, error, status, refresh } = await useAsyncData(
  () =>
    `checkout-order-${orderId.value}-${authority.value}-${guestToken.value || ''}`,
  async () => {
    if (orderId.value) {
      return api<Order>(`/orders/${orderId.value}`, {
        query: guestToken.value ? { token: guestToken.value } : undefined,
      })
    }
    return null
  },
  { watch: [orderId, authority, guestToken] },
)

async function verifyReturn() {
  if (!authority.value || !gatewayStatus.value) {
    return
  }

  verifying.value = true
  verifyMessage.value = null
  try {
    const result = await api<VerifyPaymentResult>('/payments/verify', {
      method: 'POST',
      body: {
        authority: authority.value,
        status: gatewayStatus.value,
        guestToken: guestToken.value,
      },
    })
    order.value = result.order
    verifyMessage.value = result.message
    trackPurchaseIfPaid(result.order, result.ok)
    toast.add({
      title: result.ok ? 'پرداخت موفق' : 'پرداخت ناموفق',
      description: result.message,
      color: result.ok ? 'success' : 'error',
    })
    if (result.ok && result.order.paymentStatus === 'paid') {
      await navigateTo(
        {
          path: '/checkout/thank-you',
          query: {
            orderId: result.order.id,
            ...(guestToken.value ? { token: guestToken.value } : {}),
          },
        },
        { replace: true },
      )
      return
    }
    if (result.order.id && !orderId.value) {
      await navigateTo(
        {
          path: '/checkout/callback',
          query: {
            orderId: result.order.id,
            ...(guestToken.value ? { token: guestToken.value } : {}),
          },
        },
        { replace: true },
      )
    }
  } catch (err) {
    verifyMessage.value = getApiErrorMessage(err, 'تایید پرداخت ممکن نشد')
    toast.add({
      title: verifyMessage.value,
      color: 'error',
    })
  } finally {
    verifying.value = false
  }
}

async function payNow() {
  if (!orderId.value) {
    return
  }

  paying.value = true
  try {
    const started = await api<StartPaymentResult>(
      `/payments/orders/${orderId.value}/start`,
      {
        method: 'POST',
        query: guestToken.value ? { token: guestToken.value } : undefined,
      },
    )
    await navigateTo(started.paymentUrl, { external: true })
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'شروع پرداخت ممکن نشد'),
      color: 'error',
    })
  } finally {
    paying.value = false
  }
}

onMounted(async () => {
  if (serverVerified.value) {
    verifyMessage.value = queryMessage.value
    if (queryMessage.value) {
      toast.add({
        title: queryOk.value ? 'پرداخت موفق' : 'پرداخت ناموفق',
        description: queryMessage.value,
        color: queryOk.value ? 'success' : 'error',
      })
    }
    await refresh()
    trackPurchaseIfPaid(order.value, queryOk.value)
    if (queryOk.value && order.value?.paymentStatus === 'paid') {
      await navigateTo(
        {
          path: '/checkout/thank-you',
          query: {
            orderId: order.value.id,
            ...(guestToken.value ? { token: guestToken.value } : {}),
          },
        },
        { replace: true },
      )
    }
    return
  }

  // Fallback: older flow or direct landing with gateway query params.
  if (authority.value && gatewayStatus.value) {
    void verifyReturn()
  }
})
</script>

<template>
  <UContainer class="space-y-6 py-10">
    <h1 class="text-2xl font-semibold text-highlighted">
      پرداخت
    </h1>

    <UAlert
      v-if="error && !authority"
      title="سفارش پیدا نشد"
      color="error"
      variant="subtle"
    />

    <div v-else-if="verifying || status === 'pending'">
      <USkeleton class="h-40 w-full rounded-lg" />
      <p
        v-if="verifying"
        class="text-muted mt-3 text-sm"
      >
        در حال تایید پرداخت...
      </p>
    </div>

    <div
      v-else-if="order"
      class="border-default space-y-4 rounded-lg border p-6"
    >
      <p class="text-muted text-sm">
        سفارش
        <span class="text-default font-medium">{{ order.id }}</span>
      </p>
      <p class="text-default">
        مبلغ:
        <span class="font-semibold">{{ formatPrice(order.total) }}</span>
      </p>
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

      <UAlert
        v-if="verifyMessage"
        :title="verifyMessage"
        :color="order.paymentStatus === 'paid' ? 'success' : 'warning'"
        variant="subtle"
      />

      <UAlert
        v-if="!user && guestToken"
        title="لینک این صفحه را نگه دارید"
        description="برای مشاهده مجدد سفارش مهمان به همین آدرس با توکن نیاز دارید."
        color="neutral"
        variant="subtle"
      />

      <div class="flex flex-wrap gap-3">
        <UButton
          v-if="order.paymentStatus === 'pending' && order.status === 'pending'"
          label="پرداخت"
          :loading="paying"
          @click="payNow"
        />
        <UButton
          v-if="order.paymentStatus === 'paid'"
          :to="{
            path: '/checkout/thank-you',
            query: {
              orderId: order.id,
              ...(guestToken ? { token: guestToken } : {}),
            },
          }"
          label="صفحه تشکر"
          color="primary"
          variant="soft"
        />
        <UButton
          v-if="user"
          :to="`/account/orders/${order.id}`"
          label="مشاهده سفارش"
          color="neutral"
          variant="soft"
        />
        <UButton
          to="/products"
          label="ادامه خرید"
          color="neutral"
          variant="ghost"
        />
      </div>
    </div>

    <UAlert
      v-else-if="authority && !order"
      title="نتیجه پرداخت دریافت شد ولی سفارش بارگذاری نشد"
      color="warning"
      variant="subtle"
    />
  </UContainer>
</template>
