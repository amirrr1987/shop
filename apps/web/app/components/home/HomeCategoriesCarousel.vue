<script setup lang="ts">
import type { Category } from '@shop/shared'

const props = defineProps<{
  categories: Category[]
  pending?: boolean
}>()

const items = computed(() => props.categories)
const multi = computed(() => items.value.length > 2)
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <div class="space-y-1">
        <h2 class="text-highlighted text-xl font-semibold">
          دسته‌ها
        </h2>
        <p class="text-muted text-sm">
          مرور سریع دسته‌بندی‌های فروشگاه
        </p>
      </div>
      <UButton
        to="/categories"
        label="همه"
        color="neutral"
        variant="ghost"
      />
    </div>

    <div
      v-if="pending"
      class="flex gap-4 overflow-hidden"
    >
      <USkeleton
        v-for="n in 4"
        :key="n"
        class="h-40 w-44 shrink-0 rounded-lg"
      />
    </div>

    <p
      v-else-if="!items.length"
      class="text-muted"
    >
      هنوز دسته‌ای ثبت نشده است.
    </p>

    <UCarousel
      v-else
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="false"
      :autoplay="multi ? { delay: 4500, stopOnInteraction: true } : false"
      :ui="{
        item: 'basis-[70%] ps-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <NuxtLink
        :to="`/categories/${item.slug}`"
        class="border-default bg-elevated hover:bg-accented group flex h-full flex-col overflow-hidden rounded-lg border transition"
      >
        <div class="bg-default/40 relative aspect-[4/3] overflow-hidden">
          <ShopImage
            v-if="item.ogImage"
            :src="item.ogImage"
            :alt="item.name"
            :width="360"
            :height="270"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
            img-class="size-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div
            v-else
            class="text-muted flex size-full items-center justify-center"
            aria-hidden="true"
          >
            <UIcon
              name="i-lucide-folder"
              class="size-10"
            />
          </div>
        </div>
        <div class="space-y-1 p-4">
          <p class="text-highlighted font-medium group-hover:underline">
            {{ item.name }}
          </p>
          <p
            v-if="item.description"
            class="text-muted line-clamp-2 text-xs"
          >
            {{ item.description }}
          </p>
        </div>
      </NuxtLink>
    </UCarousel>
  </section>
</template>
