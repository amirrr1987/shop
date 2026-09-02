<script setup lang="ts">
const { items } = useWishlist()

useSeoMeta({ title: 'علاقه‌مندی‌ها — روزر' })
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
              { label: 'علاقه‌مندی‌ها', to: '/wishlist' }
            ]"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <UPageHeader
            headline="ذخیره‌شده"
            title="علاقه‌مندی‌ها"
            :description="items.length
              ? `${items.length.toLocaleString('fa-IR')} محصول در لیست شما`
              : 'محصولاتی که دوست دارید را اینجا ذخیره کنید.'"
            :ui="{
              root: 'border-b border-default pb-6',
              title: 'text-2xl sm:text-3xl',
              description: 'text-base text-muted'
            }"
          />

          <WishlistTable />
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
