<script setup lang="ts">
import type { Brand } from '@shop/shared'
import { breadcrumbJsonLd, collectionPageJsonLd } from '~/utils/json-ld'

const api = useApi()
const settings = useStoreSettingsState()
const siteUrl = useSiteUrl()

const { data: brands, status } = await useAsyncData('brands-page', () =>
  api<Brand[]>('/brands'),
)

useShopSeo(() => {
  const description = `برندهای ${settings.value.shopName || 'فروشگاه'}`
  const list = (brands.value ?? []).map((b) => ({
    name: b.name,
    path: `/brands/${b.slug}`,
  }))
  return {
    title: 'برندها',
    description,
    path: '/brands',
    jsonLd: [
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'برندها', path: '/brands' },
      ]),
      collectionPageJsonLd({
        siteUrl,
        name: 'برندها',
        path: '/brands',
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
          { label: 'برندها' },
        ]"
      />
      <h1 class="mt-4 text-2xl font-semibold text-highlighted">
        برندها
      </h1>
      <p class="mt-1 text-muted">
        محصولات را بر اساس برند ببینید.
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
      v-else-if="brands?.length"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <NuxtLink
        v-for="brand in brands"
        :key="brand.id"
        :to="`/brands/${brand.slug}`"
        class="border-default bg-elevated hover:bg-accented rounded-lg border p-5 transition"
      >
        <h2 class="text-highlighted font-medium">
          {{ brand.name }}
        </h2>
        <p class="text-muted mt-1 text-sm">
          /{{ brand.slug }}
        </p>
      </NuxtLink>
    </div>

    <EmptyState
      v-else
      title="هنوز برندی ثبت نشده"
      description="پس از افزودن برند در پنل، اینجا نمایش داده می‌شود."
      icon="i-lucide-badge"
      action-label="مشاهده محصولات"
      action-to="/products"
    />
  </UContainer>
</template>
