<script setup lang="ts">
import type { Brand, Product, ProductFacets } from '@shop/shared'
import { breadcrumbJsonLd, collectionPageJsonLd } from '~/utils/json-ld'
import { toAbsoluteUrl } from '~/utils/site-url'

const PER_PAGE = 24

const route = useRoute()
const router = useRouter()
const api = useApi()
const settings = useStoreSettingsState()
const siteUrl = useSiteUrl()

const slug = computed(() => String(route.params.slug))

const page = computed(() => {
  const raw = Number(route.query.page)
  return Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1
})

const { data: brand, error } = await useAsyncData(
  () => `brand-${slug.value}`,
  () => api<Brand>(`/brands/${slug.value}`),
  { watch: [slug] },
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'برند پیدا نشد',
  })
}

const { data: facets } = await useAsyncData(
  () => `brand-facets-${slug.value}`,
  () =>
    api<ProductFacets>('/products/facets', {
      query: { brand: slug.value },
    }),
  { watch: [slug] },
)

const { data: products, status } = await useAsyncData(
  () => `brand-products-${slug.value}-${page.value}`,
  () =>
    api<{
      items: Product[]
      total: number
      perPage: number
    }>('/products', {
      query: {
        brand: slug.value,
        page: page.value,
        perPage: PER_PAGE,
        sort: 'newest',
      },
    }),
  { watch: [slug, page] },
)

const totalPages = computed(() => {
  const total = products.value?.total ?? 0
  const per = products.value?.perPage ?? PER_PAGE
  return Math.max(1, Math.ceil(total / per))
})

function hubPath(targetPage: number) {
  const base = `/brands/${slug.value}`
  return targetPage > 1 ? `${base}?page=${targetPage}` : base
}

function hubHref(targetPage: number) {
  return toAbsoluteUrl(siteUrl, hubPath(targetPage))
}

useShopSeo(() => {
  const b = brand.value
  if (!b) {
    return { title: 'برند', path: route.path, noindex: true }
  }
  const description =
    b.seoDescription
    || b.description?.slice(0, 160)
    || `خرید از برند ${b.name} در ${settings.value.shopName}`
  const listItems = (products.value?.items ?? []).map((p) => ({
    name: p.name,
    path: `/products/${p.slug}`,
  }))
  const paged = page.value > 1
  return {
    title: paged ? `${b.seoTitle || b.name} — صفحه ${page.value}` : b.seoTitle || b.name,
    description,
    path: hubPath(page.value),
    image: b.ogImage,
    noindex: paged,
    jsonLd: [
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'برندها', path: '/brands' },
        { name: b.name, path: `/brands/${b.slug}` },
      ]),
      collectionPageJsonLd({
        siteUrl,
        name: b.name,
        path: hubPath(page.value),
        description,
        items: listItems,
      }),
    ],
  }
})

useHead(() => {
  const links: Array<{ rel: string; href: string }> = []
  const current = page.value
  const last = totalPages.value
  if (current > 1) {
    const prev = hubHref(current - 1)
    if (prev) links.push({ rel: 'prev', href: prev })
  }
  if (current < last) {
    const next = hubHref(current + 1)
    if (next) links.push({ rel: 'next', href: next })
  }
  return { link: links }
})

function setPage(next: number) {
  void router.replace({
    query: {
      ...route.query,
      page: next > 1 ? String(next) : undefined,
    },
  })
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div>
      <UBreadcrumb
        :items="[
          { label: 'برندها', to: '/brands' },
          { label: brand?.name ?? slug },
        ]"
      />
      <h1 class="mt-4 text-2xl font-semibold text-highlighted">
        {{ brand?.name ?? slug }}
      </h1>
      <p
        v-if="brand?.description"
        class="text-muted mt-2 max-w-3xl text-sm leading-relaxed"
      >
        {{ brand.description }}
      </p>
      <p class="mt-1 text-muted">
        {{ products?.total ?? 0 }} محصول
      </p>
    </div>

    <section
      v-if="facets?.categories?.length"
      class="space-y-3"
    >
      <h2 class="text-lg font-semibold text-highlighted">
        دسته‌های این برند
      </h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="item in facets.categories"
          :key="item.slug"
          :to="{
            path: '/products',
            query: { brand: slug, category: item.slug },
          }"
          class="border-default bg-elevated hover:bg-accented rounded-lg border p-4 transition"
        >
          <p class="text-highlighted font-medium">
            {{ item.name }}
          </p>
          <p class="text-muted mt-1 text-sm">
            {{ item.count }} محصول
          </p>
        </NuxtLink>
      </div>
    </section>

    <div
      v-if="status === 'pending'"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <USkeleton
        v-for="n in 6"
        :key="n"
        class="aspect-square rounded-lg"
      />
    </div>

    <div
      v-else-if="products?.items.length"
      class="space-y-6"
    >
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-lg font-semibold text-highlighted">
          محصولات
        </h2>
        <UButton
          :to="{ path: '/products', query: { brand: slug } }"
          label="همه با فیلتر"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in products.items"
          :key="product.id"
          :product="product"
        />
      </div>
      <div
        v-if="totalPages > 1"
        class="flex justify-center"
      >
        <UPagination
          :page="page"
          :total="products.total"
          :items-per-page="products.perPage ?? PER_PAGE"
          @update:page="setPage"
        />
      </div>
    </div>

    <EmptyState
      v-else
      title="در این برند محصولی نیست"
      description="برندهای دیگر را ببینید یا همه محصولات را مرور کنید."
      icon="i-lucide-package-open"
      action-label="همه محصولات"
      action-to="/products"
    />
  </UContainer>
</template>
