<script setup lang="ts">
useSeoMeta({ title: 'مقایسه محصولات — روزر' })
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
              { label: 'مقایسه', to: '/compare' }
            ]"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <UPageHeader
            headline="خرید هوشمند"
            title="مقایسه محصولات"
            description="حداکثر ۴ محصول را کنار هم ببینید و ویژگی‌ها را مقایسه کنید."
            :ui="{
              root: 'border-b border-default pb-6',
              title: 'text-2xl sm:text-3xl',
              description: 'text-base text-muted'
            }"
          />

          <CompareTable />
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
