<script setup lang="ts">
const { items } = useCart()

useSeoMeta({ title: 'سبد خرید — روزر' })
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
              { label: 'سبد خرید', to: '/cart' }
            ]"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <UPageHeader
            headline="خرید"
            title="سبد خرید"
            :description="items.length
              ? `${items.length.toLocaleString('fa-IR')} قلم در سبد شما`
              : 'هنوز محصولی به سبد اضافه نکرده‌اید.'"
            :ui="{
              root: 'border-b border-default pb-6',
              title: 'text-2xl sm:text-3xl',
              description: 'text-base text-muted'
            }"
          />

          <UEmpty
            v-if="!items.length"
            icon="i-lucide-shopping-cart"
            title="سبد خرید خالی است"
            description="محصولات مورد علاقه‌تان را از فروشگاه انتخاب کنید."
            variant="subtle"
            size="lg"
            :actions="[
              { label: 'ادامه خرید', to: '/shop', icon: 'i-lucide-store' },
              { label: 'صفحه اصلی', to: '/', color: 'neutral', variant: 'outline', icon: 'i-lucide-home' }
            ]"
            :ui="{
              root: 'min-h-72 ring-1 ring-default',
              title: 'text-lg font-semibold',
              description: 'max-w-md text-sm text-muted'
            }"
          />

          <div
            v-else
            class="grid gap-6 lg:grid-cols-12 lg:gap-8"
          >
            <div class="min-w-0 lg:col-span-8">
              <CartTable />
            </div>
            <div class="min-w-0 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <CartSummary />
            </div>
          </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
