<script setup lang="ts">
import { promoBanners } from '~/data/home'
</script>

<template>
  <UPageSection
    headline="پیشنهاد ویژه"
    title="بنرهای تبلیغاتی"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl'
    }"
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ULink
        v-for="banner in promoBanners"
        :key="banner.id"
        :to="banner.to"
        class="group overflow-hidden rounded-lg ring-1 ring-default transition-shadow hover:ring-primary/40"
      >
        <NuxtImg
          :src="banner.image"
          :alt="banner.alt"
          width="600"
          height="300"
          loading="lazy"
          class="aspect-2/1 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </ULink>
    </div>
  </UPageSection>
</template>
