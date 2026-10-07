<script setup lang="ts">
import type { Category } from '@shop/shared'
import { breadcrumbJsonLd, collectionPageJsonLd } from '~/utils/json-ld'

const api = useApi()
const settings = useStoreSettingsState()
const siteUrl = useSiteUrl()

const { data: categories, status } = await useAsyncData('categories-page', () =>
  api<Category[]>('/categories'),
)

useShopSeo(() => {
  const description = `دسته‌بندی محصولات ${settings.value.shopName || 'فروشگاه'}`
  const list = (categories.value ?? []).map((c) => ({
    name: c.name,
    path: `/categories/${c.slug}`,
  }))
  return {
    title: 'دسته‌ها',
    description,
    path: '/categories',
    jsonLd: [
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'دسته‌ها', path: '/categories' },
      ]),
      collectionPageJsonLd({
        siteUrl,
        name: 'دسته‌ها',
        path: '/categories',
        description,
        items: list,
      }),
    ],
  }
})
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div>
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'دسته‌ها' },
        ]"
      />
      <h1 class="mt-4 text-2xl font-semibold text-highlighted">
        دسته‌ها
      </h1>
      <p class="mt-1 text-muted">
        محصولات را بر اساس دسته ببینید.
      </p>
    </div>

    <div
      v-if="status === 'pending'"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <USkeleton
        v-for="n in 6"
        :key="n"
        class="h-24 rounded-lg"
      />
    </div>

    <div
      v-else-if="categories?.length"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/categories/${category.slug}`"
        class="border-default bg-elevated hover:bg-accented rounded-lg border p-5 transition"
      >
        <h2 class="text-highlighted font-medium">
          {{ category.name }}
        </h2>
        <p class="text-muted mt-1 text-sm">
          /{{ category.slug }}
        </p>
      </NuxtLink>
    </div>

    <EmptyState
      v-else
      title="هنوز دسته‌ای ثبت نشده"
      description="پس از افزودن دسته در پنل، اینجا نمایش داده می‌شود."
      icon="i-lucide-folder"
      action-label="مشاهده محصولات"
      action-to="/products"
    />
  </UContainer>
</template>
