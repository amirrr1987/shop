<script setup lang="ts">
import ShopSwiper from '~/components/ShopSwiper.vue'
import type { Product } from '~/types/shop'
import { getProductsForHomeTab, homeCategoryTabSections } from '~/data/home-tabs'

const sections = homeCategoryTabSections
</script>

<template>
  <UPageSection
    v-for="section in sections"
    :key="section.id"
    :title="section.title"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl'
    }"
  >
    <UTabs
      :items="section.tabs.map(t => ({
        label: t.label,
        slot: t.slot
      }))"
    >
      <template
        v-for="tab in section.tabs"
        :key="tab.slot"
        #[tab.slot]
      >
        <div class="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div class="min-w-0 lg:col-span-4">
            <UPageCard
              :to="section.bannerTo"
              variant="subtle"
              :ui="{ root: 'h-full overflow-hidden ring-1 ring-default' }"
            >
              <NuxtImg
                :src="section.banner"
                :alt="section.title"
                width="500"
                height="400"
                loading="lazy"
                class="aspect-4/3 w-full object-cover"
              />
            </UPageCard>
          </div>

          <div class="min-w-0 lg:col-span-8">
            <ShopSwiper
              :items="getProductsForHomeTab(tab.category)"
              :options="{
                breakpoints: {
                  640: { slidesPerView: 1 },
                  1024: { slidesPerView: 2 }
                }
              }"
            >
              <template #default="{ item }: { item: Product }">
                <ProductCard :product="item" />
              </template>
            </ShopSwiper>
          </div>
        </div>
      </template>
    </UTabs>
  </UPageSection>
</template>
