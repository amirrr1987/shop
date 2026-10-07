<script setup lang="ts">
import type { Category, Product } from '@shop/shared'
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

const { data: category, error } = await useAsyncData(
  () => `category-${slug.value}`,
  () => api<Category>(`/categories/${slug.value}`),
  { watch: [slug] },
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'دسته پیدا نشد',
  })
}

const { data: products, status } = await useAsyncData(
  () => `category-products-${slug.value}-${page.value}`,
  () =>
    api<{
      items: Product[]
      total: number
      perPage: number
    }>('/products', {
      query: {
        category: slug.value,
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
  const base = `/categories/${slug.value}`
  return targetPage > 1 ? `${base}?page=${targetPage}` : base
}

function hubHref(targetPage: number) {
  return toAbsoluteUrl(siteUrl, hubPath(targetPage))
}

useShopSeo(() => {
  const c = category.value
  if (!c) {
    return { title: 'دسته', path: route.path, noindex: true }
  }
  const description =
    c.seoDescription
    || c.description?.slice(0, 160)
    || `خرید از دسته ${c.name} در ${settings.value.shopName}`
  const listItems = (products.value?.items ?? []).map((p) => ({
    name: p.name,
    path: `/products/${p.slug}`,
  }))
  const paged = page.value > 1
  return {
    title: paged ? `${c.seoTitle || c.name} — صفحه ${page.value}` : c.seoTitle || c.name,
    description,
    path: hubPath(page.value),
    image: c.ogImage,
    // Deep pages stay crawlable via prev/next; avoid thin duplicate ranking.
    noindex: paged,
    jsonLd: [
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'دسته‌ها', path: '/categories' },
        { name: c.name, path: `/categories/${c.slug}` },
      ]),
      collectionPageJsonLd({
        siteUrl,
        name: c.name,
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
          { label: 'دسته‌ها', to: '/categories' },
          { label: category?.name ?? slug },
        ]"
      />
      <h1 class="mt-4 text-2xl font-semibold text-highlighted">
        {{ category?.name ?? slug }}
      </h1>
      <p
        v-if="category?.description"
        class="text-muted mt-2 max-w-3xl text-sm leading-relaxed"
      >
        {{ category.description }}
      </p>
      <p class="mt-1 text-muted">
        {{ products?.total ?? 0 }} محصول
      </p>
    </div>

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
      title="در این دسته محصولی نیست"
      description="دسته‌های دیگر را ببینید یا همه محصولات را مرور کنید."
      icon="i-lucide-package-open"
      action-label="همه محصولات"
      action-to="/products"
    />
  </UContainer>
</template>
