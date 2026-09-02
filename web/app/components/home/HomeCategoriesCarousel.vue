<script setup lang="ts">
import ShopSwiper from '~/components/ShopSwiper.vue'
import { categories } from '~/data/categories'
import type { Category } from '~/types/shop'
</script>

<template>
  <UPageSection
    headline="دسته‌بندی"
    title="دسته‌های محبوب"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl'
    }"
  >
    <ShopSwiper
      :items="categories"
      :options="{
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      }"
    >
      <template #default="{ item }: { item: Category }">
        <UCard
          variant="subtle"
          :ui="{
            root: 'h-full ring-1 ring-default',
            body: 'space-y-3 p-4 sm:p-5'
          }"
        >
          <ULink :to="`/shop?category=${item.slug}`">
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              width="300"
              height="300"
              loading="lazy"
              class="aspect-square w-full rounded-md object-cover ring-1 ring-default"
            />
          </ULink>

          <ULink
            :to="`/shop?category=${item.slug}`"
            class="block text-base font-semibold text-default hover:text-primary"
          >
            {{ item.name }}
          </ULink>

          <UPageLinks
            :links="item.links.map(l => ({ label: l.label, to: l.to }))"
            :ui="{ link: 'text-sm text-muted hover:text-default' }"
          />

          <UButton
            label="مشاهده همه"
            variant="link"
            trailing-icon="i-lucide-arrow-left"
            :to="`/shop?category=${item.slug}`"
          />
        </UCard>
      </template>
    </ShopSwiper>
  </UPageSection>
</template>
