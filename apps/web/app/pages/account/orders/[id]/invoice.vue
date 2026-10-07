<script setup lang="ts">
import type { Order } from '@shop/shared'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const api = useApi()
const settings = useStoreSettingsState()
const id = computed(() => String(route.params.id))

const { data: order, error, status } = await useAsyncData(
  () => `order-invoice-${id.value}`,
  () => api<Order>(`/orders/${id.value}`),
  { watch: [id] },
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'سفارش پیدا نشد',
  })
}

usePrivateSeo('فاکتور سفارش')

useHead({
  bodyAttrs: {
    class: 'invoice-print-page',
  },
})

const shortId = computed(() =>
  order.value ? order.value.id.slice(0, 8).toUpperCase() : '',
)

function onPrint() {
  if (!import.meta.client) {
    return
  }
  window.print()
}
</script>

<template>
  <UContainer class="space-y-6 py-10 print:max-w-none print:px-0 print:py-0">
    <div class="flex flex-wrap items-start justify-between gap-4 print:hidden">
      <div>
        <UBreadcrumb
          :items="[
            { label: 'سفارش‌ها', to: '/account/orders' },
            { label: 'جزئیات', to: `/account/orders/${id}` },
            { label: 'فاکتور' },
          ]"
        />
        <h1 class="mt-4 text-2xl font-semibold text-highlighted">
          فاکتور سفارش
        </h1>
      </div>
      <div class="flex flex-wrap gap-2">
        <UButton
          :to="`/account/orders/${id}`"
          label="بازگشت"
          color="neutral"
          variant="ghost"
        />
        <UButton
          label="چاپ"
          icon="i-lucide-printer"
          :disabled="!order"
          @click="onPrint"
        />
      </div>
    </div>

    <USkeleton
      v-if="status === 'pending'"
      class="h-64 rounded-lg print:hidden"
    />

    <article
      v-else-if="order"
      class="border-default bg-default space-y-6 rounded-lg border p-6 print:border-0 print:p-0"
    >
      <header class="flex flex-wrap items-start justify-between gap-4 border-b border-default pb-4">
        <div>
          <p class="text-2xl font-semibold text-highlighted">
            {{ settings.legalName || settings.shopName || 'فروشگاه' }}
          </p>
          <p
            v-if="settings.legalName && settings.shopName && settings.legalName !== settings.shopName"
            class="text-muted text-sm"
          >
            {{ settings.shopName }}
          </p>
          <p class="text-muted mt-1 text-sm">
            فاکتور فروش
          </p>
          <ul
            v-if="settings.nationalId || settings.economicCode || settings.registrationNumber || settings.legalAddress"
            class="text-muted mt-2 space-y-0.5 text-xs"
          >
            <li v-if="settings.nationalId">
              شناسه ملی: {{ settings.nationalId }}
            </li>
            <li v-if="settings.economicCode">
              کد اقتصادی: {{ settings.economicCode }}
            </li>
            <li v-if="settings.registrationNumber">
              شماره ثبت: {{ settings.registrationNumber }}
            </li>
            <li v-if="settings.legalAddress">
              {{ settings.legalAddress }}
            </li>
          </ul>
          <p
            v-if="settings.supportPhone || settings.supportEmail"
            class="text-muted mt-2 text-xs"
          >
            <span v-if="settings.supportPhone">{{ settings.supportPhone }}</span>
            <span v-if="settings.supportPhone && settings.supportEmail"> · </span>
            <span v-if="settings.supportEmail">{{ settings.supportEmail }}</span>
          </p>
        </div>
        <div class="text-sm text-end">
          <p class="text-highlighted font-medium">
            شماره: {{ shortId }}
          </p>
          <p class="text-muted mt-1">
            {{ new Date(order.createdAt).toLocaleString('fa-IR') }}
          </p>
          <div class="mt-2 flex flex-wrap justify-end gap-2">
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
          </div>
        </div>
      </header>

      <section class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-1 text-sm">
          <h2 class="font-medium text-highlighted">
            خریدار
          </h2>
          <p>{{ order.address.fullName }}</p>
          <p class="text-muted">
            {{ order.address.phone }}
          </p>
          <p class="text-muted">
            {{ order.address.line }}
          </p>
          <p class="text-muted">
            {{ order.address.city }}، {{ order.address.province }}
            —
            {{ order.address.postalCode }}
          </p>
        </div>
        <div
          v-if="order.note || order.shippingMethodName || order.paymentRefId || order.trackingCode"
          class="space-y-1 text-sm"
        >
          <h2 class="font-medium text-highlighted">
            جزئیات ارسال
          </h2>
          <p v-if="order.shippingMethodName">
            روش ارسال: {{ order.shippingMethodName }}
          </p>
          <p v-if="order.paymentRefId">
            پیگیری پرداخت: {{ order.paymentRefId }}
          </p>
          <p v-if="order.trackingCode">
            رهگیری ارسال: {{ order.trackingCode }}
          </p>
          <p
            v-if="order.note"
            class="text-muted whitespace-pre-wrap"
          >
            یادداشت: {{ order.note }}
          </p>
        </div>
      </section>

      <section>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-default border-b text-muted">
              <th class="py-2 text-start font-medium">
                کالا
              </th>
              <th class="py-2 text-center font-medium">
                تعداد
              </th>
              <th class="py-2 text-end font-medium">
                قیمت واحد
              </th>
              <th class="py-2 text-end font-medium">
                مبلغ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in order.items"
              :key="`${item.productId}-${item.name}`"
              class="border-default border-b"
            >
              <td class="py-3 text-highlighted">
                {{ item.name }}
                <span
                  v-if="item.variantLabel"
                  class="text-muted block text-xs"
                >
                  {{ item.variantLabel }}
                  <span v-if="item.sku"> · {{ item.sku }}</span>
                </span>
              </td>
              <td class="py-3 text-center">
                {{ item.quantity }}
              </td>
              <td class="py-3 text-end">
                {{ formatPrice(item.unitPrice) }}
              </td>
              <td class="py-3 text-end">
                {{ formatPrice(item.unitPrice * item.quantity) }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="ms-auto w-full max-w-xs space-y-2 text-sm">
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
          <span>ارسال</span>
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
        <div class="text-highlighted flex justify-between gap-3 border-t border-default pt-2 text-base font-semibold">
          <span>مبلغ نهایی</span>
          <span>{{ formatPrice(order.total) }}</span>
        </div>
        <div
          v-if="order.refundedAmount"
          class="flex justify-between gap-3 text-error"
        >
          <span>مسترد شده</span>
          <span>− {{ formatPrice(order.refundedAmount) }}</span>
        </div>
      </section>
    </article>
  </UContainer>
</template>

<style>
@media print {
  body.invoice-print-page header,
  body.invoice-print-page footer,
  body.invoice-print-page .print\:hidden {
    display: none !important;
  }

  body.invoice-print-page {
    background: white !important;
  }
}
</style>
