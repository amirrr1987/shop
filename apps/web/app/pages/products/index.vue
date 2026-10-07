<script setup lang="ts">
import type {
  Category,
  Product,
  ProductFacets,
  ProductSort,
} from '@shop/shared'
import {
  PRODUCT_SORT_LABELS_FA,
  PRODUCT_SORTS,
} from '@shop/shared'
import { toAbsoluteUrl } from '~/utils/site-url'

const route = useRoute()
const router = useRouter()
const api = useApi()
const siteUrl = useSiteUrl()

useShopSeo(() => {
  const query = route.query
  const category =
    typeof query.category === 'string' ? query.category.trim() : ''
  const brand = typeof query.brand === 'string' ? query.brand.trim() : ''
  const hasSearch = Boolean(typeof query.q === 'string' && query.q.trim())
  const hasExtra = Boolean(
    query.minPrice
    || query.maxPrice
    || query.option
    || query.inStock
    || query.onSale
    || query.featured
    || (query.page && String(query.page) !== '1')
    || (query.sort && query.sort !== 'newest'),
  )

  // Point thin filter URLs at hub pages to avoid duplicate ranking.
  if (category && !brand && !hasSearch && !hasExtra) {
    return {
      title: 'محصولات',
      description: 'فهرست محصولات فروشگاه',
      path: `/categories/${category}`,
      noindex: true,
    }
  }
  if (brand && !category && !hasSearch && !hasExtra) {
    return {
      title: 'محصولات',
      description: 'فهرست محصولات فروشگاه',
      path: `/brands/${brand}`,
      noindex: true,
    }
  }

  const filtered = Boolean(
    hasSearch || category || brand || hasExtra,
  )
  return {
    title: 'محصولات',
    description: 'فهرست محصولات فروشگاه',
    path: '/products',
    noindex: filtered,
  }
})

const q = computed({
  get: () => (typeof route.query.q === 'string' ? route.query.q : ''),
  set: (value: string) => {
    void router.replace({
      query: {
        ...route.query,
        q: value || undefined,
        page: undefined,
      },
    })
  },
})

const sort = computed({
  get: () =>
    (typeof route.query.sort === 'string' &&
    PRODUCT_SORTS.includes(route.query.sort as ProductSort)
      ? route.query.sort
      : 'newest') as ProductSort,
  set: (value: ProductSort) => {
    void router.replace({
      query: {
        ...route.query,
        sort: value === 'newest' ? undefined : value,
        page: undefined,
      },
    })
  },
})

const category = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : undefined,
)

const brand = computed(() =>
  typeof route.query.brand === 'string' ? route.query.brand : undefined,
)

const option = computed(() =>
  typeof route.query.option === 'string' ? route.query.option : undefined,
)

const minPrice = computed({
  get: () =>
    typeof route.query.minPrice === 'string' ? route.query.minPrice : '',
  set: (value: string) => {
    void router.replace({
      query: {
        ...route.query,
        minPrice: value || undefined,
        page: undefined,
      },
    })
  },
})

const maxPrice = computed({
  get: () =>
    typeof route.query.maxPrice === 'string' ? route.query.maxPrice : '',
  set: (value: string) => {
    void router.replace({
      query: {
        ...route.query,
        maxPrice: value || undefined,
        page: undefined,
      },
    })
  },
})

const inStock = computed({
  get: () => route.query.inStock === 'true',
  set: (value: boolean | 'indeterminate') => {
    void router.replace({
      query: {
        ...route.query,
        inStock: value === true ? 'true' : undefined,
        page: undefined,
      },
    })
  },
})

const featured = computed({
  get: () => route.query.featured === 'true',
  set: (value: boolean | 'indeterminate') => {
    void router.replace({
      query: {
        ...route.query,
        featured: value === true ? 'true' : undefined,
        page: undefined,
      },
    })
  },
})

const onSale = computed({
  get: () => route.query.onSale === 'true',
  set: (value: boolean | 'indeterminate') => {
    void router.replace({
      query: {
        ...route.query,
        onSale: value === true ? 'true' : undefined,
        page: undefined,
      },
    })
  },
})

const page = computed(() => {
  const raw = Number(route.query.page)
  return Number.isFinite(raw) && raw > 0 ? raw : 1
})

const sortItems = PRODUCT_SORTS.map((value) => ({
  label: PRODUCT_SORT_LABELS_FA[value],
  value,
}))

const { data: categories } = await useAsyncData('categories', () =>
  api<Category[]>('/categories'),
)

const { unit, unitLabel, toRialQuery } = useCurrency()
const {
  filterPosition,
  gridColumns,
  viewMode,
  gridClass,
  isTopFilters,
  isStartFilters,
  isListView,
  setFilterPosition,
  setGridColumns,
  setViewMode,
} = useCatalogLayout()

const filterPositionItems = [
  { label: 'راست', value: 'end' as const },
  { label: 'چپ', value: 'start' as const },
  { label: 'بالا', value: 'top' as const },
]

const gridColumnItems = [
  { label: '۳', value: 3 as const },
  { label: '۴', value: 4 as const },
  { label: '۵', value: 5 as const },
]

const viewModeItems = [
  { label: 'شبکه', value: 'grid' as const, icon: 'i-lucide-layout-grid' },
  { label: 'لیست', value: 'list' as const, icon: 'i-lucide-list' },
]

const { data: facets } = await useAsyncData(
  'product-facets',
  () =>
    api<ProductFacets>('/products/facets', {
      query: {
        category: category.value,
        brand: brand.value,
      },
    }),
  { watch: [category, brand] },
)

const { data, status, refresh } = await useAsyncData(
  'products',
  () =>
    api<{
      items: Product[]
      total: number
      page: number
      perPage: number
    }>('/products', {
      query: {
        page: page.value,
        perPage: 12,
        q: q.value || undefined,
        category: category.value,
        brand: brand.value,
        option: option.value,
        sort: sort.value,
        minPrice: toRialQuery(minPrice.value),
        maxPrice: toRialQuery(maxPrice.value),
        inStock: inStock.value ? 'true' : undefined,
        featured: featured.value ? 'true' : undefined,
        onSale: onSale.value ? 'true' : undefined,
      },
    }),
  {
    watch: [
      page,
      q,
      sort,
      category,
      brand,
      option,
      minPrice,
      maxPrice,
      inStock,
      featured,
      onSale,
      unit,
    ],
  },
)

const totalPages = computed(() => {
  if (!data.value) {
    return 1
  }
  return Math.max(1, Math.ceil(data.value.total / data.value.perPage))
})

/** Build absolute listing URL for a given page (omit page=1). */
function productsPageHref(targetPage: number): string | undefined {
  const query = new URLSearchParams()
  for (const [key, raw] of Object.entries(route.query)) {
    if (key === 'page' || raw == null) continue
    const value = Array.isArray(raw) ? raw[0] : raw
    if (typeof value === 'string' && value) {
      query.set(key, value)
    }
  }
  if (targetPage > 1) {
    query.set('page', String(targetPage))
  }
  const qs = query.toString()
  return toAbsoluteUrl(siteUrl, qs ? `/products?${qs}` : '/products')
}

useHead(() => {
  const links: Array<{ rel: string; href: string }> = []
  const current = page.value
  const last = totalPages.value
  if (current > 1) {
    const prev = productsPageHref(current - 1)
    if (prev) links.push({ rel: 'prev', href: prev })
  }
  if (current < last) {
    const next = productsPageHref(current + 1)
    if (next) links.push({ rel: 'next', href: next })
  }
  return { link: links }
})

const hasExtraFilters = computed(
  () =>
    Boolean(
      minPrice.value
      || maxPrice.value
      || inStock.value
      || featured.value
      || onSale.value
      || option.value
      || brand.value,
    ),
)

function setPage(next: number) {
  void router.replace({
    query: {
      ...route.query,
      page: next > 1 ? String(next) : undefined,
    },
  })
}

function clearCategory() {
  void router.replace({
    query: {
      ...route.query,
      category: undefined,
      page: undefined,
    },
  })
}

function clearBrand() {
  void router.replace({
    query: {
      ...route.query,
      brand: undefined,
      page: undefined,
    },
  })
}

function setOption(next: string | undefined) {
  void router.replace({
    query: {
      ...route.query,
      option: next || undefined,
      page: undefined,
    },
  })
}

function clearExtraFilters() {
  void router.replace({
    query: {
      ...route.query,
      minPrice: undefined,
      maxPrice: undefined,
      inStock: undefined,
      featured: undefined,
      onSale: undefined,
      option: undefined,
      brand: undefined,
      page: undefined,
    },
  })
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <UBreadcrumb
          :items="[
            { label: 'خانه', to: '/' },
            { label: 'محصولات' },
          ]"
        />
        <h1 class="mt-4 text-2xl font-semibold text-highlighted">محصولات</h1>
        <p class="mt-1 text-muted">
          {{ data?.total ?? 0 }} مورد
          <span v-if="category"> در {{ category }}</span>
          <span v-if="brand"> · برند {{ brand }}</span>
        </p>
      </div>

      <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="جستجوی محصول"
          class="w-full sm:w-64"
        />
        <USelect
          v-model="sort"
          :items="sortItems"
          class="w-full sm:w-52"
        />
        <div class="border-default hidden overflow-hidden rounded-md border sm:inline-flex">
          <UButton
            v-for="item in filterPositionItems"
            :key="item.value"
            size="sm"
            color="neutral"
            :variant="filterPosition === item.value ? 'soft' : 'ghost'"
            :label="item.label"
            class="rounded-none"
            @click="setFilterPosition(item.value)"
          />
        </div>
        <div class="border-default hidden overflow-hidden rounded-md border sm:inline-flex">
          <UButton
            v-for="item in viewModeItems"
            :key="item.value"
            size="sm"
            color="neutral"
            :variant="viewMode === item.value ? 'soft' : 'ghost'"
            :icon="item.icon"
            :aria-label="item.label"
            class="rounded-none"
            @click="setViewMode(item.value)"
          />
        </div>
        <div
          v-if="!isListView"
          class="border-default hidden overflow-hidden rounded-md border sm:inline-flex"
        >
          <UButton
            v-for="item in gridColumnItems"
            :key="item.value"
            size="sm"
            color="neutral"
            :variant="gridColumns === item.value ? 'soft' : 'ghost'"
            :label="item.label"
            class="rounded-none"
            @click="setGridColumns(item.value)"
          />
        </div>
      </div>
    </div>

    <div
      class="gap-8"
      :class="isTopFilters
        ? 'flex flex-col'
        : isStartFilters
          ? 'lg:flex lg:flex-row'
          : 'lg:flex lg:flex-row-reverse'"
    >
      <aside
        class="space-y-4"
        :class="isTopFilters ? 'w-full' : 'w-full shrink-0 lg:w-64'"
      >
        <div v-if="categories?.length" class="flex flex-wrap gap-2">
          <UButton
            label="همه دسته‌ها"
            size="sm"
            :variant="category ? 'ghost' : 'soft'"
            color="neutral"
            @click="clearCategory"
          />
          <UButton
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            size="sm"
            :variant="category === item.slug ? 'soft' : 'ghost'"
            color="neutral"
            :to="{ query: { ...route.query, category: item.slug, page: undefined } }"
          />
        </div>

        <div
          v-if="facets?.brands.length"
          class="flex flex-wrap gap-2"
        >
          <UButton
            label="همه برندها"
            size="sm"
            :variant="brand ? 'ghost' : 'soft'"
            color="neutral"
            @click="clearBrand"
          />
          <UButton
            v-for="item in facets.brands"
            :key="item.slug"
            :label="`${item.name} (${item.count})`"
            size="sm"
            :variant="brand === item.slug ? 'soft' : 'ghost'"
            color="neutral"
            :to="{ query: { ...route.query, brand: item.slug, page: undefined } }"
          />
        </div>

        <div
          v-if="facets?.options.length"
          class="space-y-3"
        >
          <div
            v-for="facet in facets.options"
            :key="facet.key"
            class="flex flex-wrap items-center gap-2"
          >
            <span class="text-muted text-sm">{{ facet.key }}:</span>
            <UButton
              v-for="value in facet.values"
              :key="`${facet.key}:${value.value}`"
              :label="`${value.value} (${value.count})`"
              size="xs"
              :variant="option === `${facet.key}:${value.value}` ? 'soft' : 'ghost'"
              color="neutral"
              @click="setOption(
                option === `${facet.key}:${value.value}`
                  ? undefined
                  : `${facet.key}:${value.value}`,
              )"
            />
          </div>
        </div>

        <div class="border-default flex flex-col gap-3 rounded-lg border p-4">
          <UFormField
            :label="`حداقل قیمت (${unitLabel})`"
            class="w-full"
          >
            <UInput
              v-model="minPrice"
              type="number"
              min="0"
              placeholder="۰"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="`حداکثر قیمت (${unitLabel})`"
            class="w-full"
          >
            <UInput
              v-model="maxPrice"
              type="number"
              min="0"
              placeholder="—"
              class="w-full"
            />
          </UFormField>
          <UCheckbox
            v-model="inStock"
            label="فقط موجود"
          />
          <UCheckbox
            v-model="featured"
            label="فقط ویژه"
          />
          <UCheckbox
            v-model="onSale"
            label="فقط تخفیف‌دار"
          />
          <UButton
            v-if="hasExtraFilters"
            label="پاک کردن فیلترها"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="clearExtraFilters"
          />
        </div>
      </aside>

      <div class="min-w-0 flex-1 space-y-8">
        <div
          v-if="status === 'pending'"
          :class="gridClass"
        >
          <USkeleton
            v-for="n in 6"
            :key="n"
            :class="isListView ? 'h-36 rounded-lg' : 'aspect-square rounded-lg'"
          />
        </div>

        <div
          v-else-if="data?.items.length"
          :class="gridClass"
        >
          <template v-if="isListView">
            <ProductListItem
              v-for="product in data.items"
              :key="product.id"
              :product="product"
            />
          </template>
          <template v-else>
            <ProductCard
              v-for="product in data.items"
              :key="product.id"
              :product="product"
            />
          </template>
        </div>

        <EmptyState
          v-else
          title="محصولی پیدا نشد"
          description="فیلتر یا جستجو را عوض کنید؛ یا همه محصولات را ببینید."
          icon="i-lucide-search-x"
        >
          <template #actions>
            <div class="flex flex-wrap justify-center gap-2">
              <UButton
                label="تلاش دوباره"
                variant="soft"
                @click="refresh()"
              />
              <UButton
                v-if="hasExtraFilters || category || q"
                label="پاک کردن فیلترها"
                color="neutral"
                variant="ghost"
                @click="() => { clearExtraFilters(); clearCategory(); q = '' }"
              />
            </div>
          </template>
        </EmptyState>

        <div
          v-if="totalPages > 1"
          class="flex justify-center"
        >
          <UPagination
            :page="page"
            :total="data?.total ?? 0"
            :items-per-page="data?.perPage ?? 12"
            @update:page="setPage"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
