<script setup lang="ts">
import type { Order } from '@shop/shared'

definePageMeta({
  middleware: 'auth',
})

usePrivateSeo('سفارش‌ها', '/account/orders')

const api = useApi()

const { data: orders, status } = await useAsyncData('my-orders', () =>
  api<Order[]>('/orders'),
)
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div>
      <h1 class="text-2xl font-semibold text-highlighted">
        سفارش‌ها
      </h1>
      <p class="mt-1 text-muted">
        خریدهای اخیر شما.
      </p>
    </div>

    <div
      v-if="status === 'pending'"
      class="space-y-3"
    >
      <USkeleton
        v-for="n in 3"
        :key="n"
        class="h-20 rounded-lg"
      />
    </div>

    <ul
      v-else-if="orders?.length"
      class="divide-default divide-y rounded-lg border border-default"
    >
      <li
        v-for="order in orders"
        :key="order.id"
      >
        <NuxtLink
          :to="`/account/orders/${order.id}`"
          class="hover:bg-elevated flex flex-col gap-2 px-4 py-4 transition sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-highlighted font-medium">
              {{ formatPrice(order.total) }}
            </p>
            <p class="text-muted text-sm">
              {{ new Date(order.createdAt).toLocaleString('fa-IR') }}
            </p>
          </div>
          <div class="flex gap-2">
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
        </NuxtLink>
      </li>
    </ul>

    <p
      v-else
      class="text-muted"
    >
      هنوز سفارشی ندارید.
    </p>
  </UContainer>
</template>
