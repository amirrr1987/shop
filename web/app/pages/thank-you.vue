<script setup lang="ts">
import { formatPrice } from '~/data/products'

const route = useRoute()
const { lastOrder } = useCheckout()

const orderId = computed(() => String(route.query.order || lastOrder.value?.orderId || ''))

useSeoMeta({ title: 'سفارش ثبت شد — روزر' })
</script>

<template>
  <UPage>
    <UPageBody>
      <UEmpty
        icon="i-lucide-check-circle"
        title="سفارش شما با موفقیت ثبت شد!"
        :description="orderId ? `شماره سفارش: ${orderId}` : 'از خرید شما متشکریم'"
        :actions="[
          { label: 'ادامه خرید', to: '/shop', icon: 'i-lucide-store' },
          { label: 'حساب من', to: '/account', color: 'neutral', variant: 'outline', icon: 'i-lucide-user' }
        ]"
      />

      <UCard v-if="lastOrder">
        <UPageHeader
          title="خلاصه سفارش"
          :description="`شماره: ${lastOrder.orderId}`"
        />

        <UPageList>
          <UCard
            v-for="item in lastOrder.items"
            :key="item.product.id"
          >
            <UUser
              :name="item.product.name"
              :description="`${item.quantity} × ${formatPrice(item.product.price)}`"
              :avatar="item.product.image"
            />
          </UCard>
        </UPageList>

        <UAlert
          color="primary"
          variant="subtle"
          icon="i-lucide-wallet"
          :title="`مبلغ پرداختی: ${formatPrice(lastOrder.total)}`"
        />
      </UCard>
    </UPageBody>
  </UPage>
</template>
