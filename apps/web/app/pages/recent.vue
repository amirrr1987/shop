<script setup lang="ts">
useShopSeo({
  title: 'اخیراً دیده‌شده',
  path: '/recent',
  noindex: true,
})

const { items, count, hydrate, clear } = useRecentlyViewed()
const toast = useToast()

onMounted(() => {
  hydrate()
})

function onClear() {
  clear()
  toast.add({ title: 'لیست پاک شد', color: 'neutral' })
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          اخیراً دیده‌شده
        </h1>
        <p class="mt-1 text-muted">
          {{ count }} محصول
        </p>
      </div>
      <UButton
        v-if="items.length"
        label="خالی کردن"
        color="neutral"
        variant="ghost"
        @click="onClear"
      />
    </div>

    <div
      v-if="!items.length"
      class="border-default rounded-lg border border-dashed py-16 text-center"
    >
      <p class="text-muted">
        هنوز محصولی ندیده‌اید.
      </p>
      <UButton
        class="mt-4"
        to="/products"
        label="مشاهده محصولات"
      />
    </div>

    <div
      v-else
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <RecentProductCard
        v-for="item in items"
        :key="item.productId"
        :item="item"
      />
    </div>
  </UContainer>
</template>
