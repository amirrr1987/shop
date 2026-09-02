<script setup lang="ts">
const {
  paginatedProducts,
  view,
  columns,
  sidebar,
  search,
  category,
  sort,
  page,
  pageSize,
  totalProducts,
  totalPages,
  sizes,
  colors,
  inStockOnly,
  priceMin,
  priceMax,
  updateQuery,
  resetFilters
} = useShopCatalog()

useSeoMeta({ title: 'فروشگاه — روزر' })

const breadcrumbs = computed(() => {
  const items = [
    { label: 'خانه', to: '/' },
    { label: 'فروشگاه', to: '/shop' }
  ]

  if (category.value) {
    items.push({ label: category.value, to: `/shop?category=${category.value}` })
  }

  return items
})

const pageTitle = computed(() => {
  if (search.value) return `نتایج جستجو: ${search.value}`
  if (category.value) return category.value
  return 'فروشگاه'
})

const pageDescription = computed(() => {
  if (!totalProducts.value) {
    return 'محصولی با فیلترهای فعلی یافت نشد.'
  }

  const count = totalProducts.value.toLocaleString('fa-IR')
  if (search.value && category.value) {
    return `${count} محصول در «${category.value}» برای «${search.value}».`
  }
  if (search.value) {
    return `${count} نتیجه برای «${search.value}».`
  }
  if (category.value) {
    return `${count} محصول در دسته «${category.value}».`
  }
  return `${count} محصول الکترونیک با ارسال سریع و ضمانت اصالت.`
})

const resultsRange = computed(() => {
  if (!totalProducts.value) return null

  const start = (page.value - 1) * pageSize + 1
  const end = Math.min(page.value * pageSize, totalProducts.value)

  return { start, end }
})

const activeFilters = computed(() => {
  const filters: Array<{ key: string, label: string, clear: () => void }> = []

  if (search.value) {
    filters.push({
      key: 'search',
      label: `جستجو: ${search.value}`,
      clear: () => updateQuery({ q: undefined, page: 1 })
    })
  }

  if (category.value) {
    filters.push({
      key: 'category',
      label: `دسته: ${category.value}`,
      clear: () => updateQuery({ category: undefined, page: 1 })
    })
  }

  if (priceMin.value > 0 || priceMax.value < 100_000_000) {
    filters.push({
      key: 'price',
      label: `قیمت: ${priceMin.value.toLocaleString('fa-IR')}–${priceMax.value.toLocaleString('fa-IR')}`,
      clear: () => updateQuery({ priceMin: undefined, priceMax: undefined, page: 1 })
    })
  }

  for (const size of sizes.value) {
    filters.push({
      key: `size-${size}`,
      label: `سایز: ${size}`,
      clear: () => updateQuery({
        sizes: sizes.value.filter(item => item !== size),
        page: 1
      })
    })
  }

  for (const color of colors.value) {
    filters.push({
      key: `color-${color}`,
      label: `رنگ: ${color}`,
      clear: () => updateQuery({
        colors: colors.value.filter(item => item !== color),
        page: 1
      })
    })
  }

  if (inStockOnly.value) {
    filters.push({
      key: 'stock',
      label: 'فقط موجود',
      clear: () => updateQuery({ inStock: undefined, page: 1 })
    })
  }

  if (sort.value !== 'new') {
    filters.push({
      key: 'sort',
      label: 'مرتب‌سازی سفارشی',
      clear: () => updateQuery({ sort: undefined, page: 1 })
    })
  }

  return filters
})

const headerLinks = computed(() => {
  if (!activeFilters.value.length) return []

  return [{
    label: 'پاک کردن فیلترها',
    icon: 'i-lucide-rotate-ccw',
    color: 'neutral' as const,
    variant: 'subtle' as const,
    onClick: () => resetFilters()
  }]
})

const hasProducts = computed(() => paginatedProducts.value.length > 0)

const pageUi = computed(() => {
  const hasSidebar = sidebar.value !== 'none'

  return {
    root: 'flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8',
    left: 'min-w-0 lg:col-span-3',
    center: hasSidebar ? 'min-w-0 lg:col-span-9' : 'min-w-0 lg:col-span-12',
    right: 'min-w-0 lg:col-span-3'
  }
})
</script>

<template>
  <UContainer class="py-6 sm:py-8">
    <UPage :ui="pageUi">
      <template
        v-if="sidebar === 'left'"
        #left
      >
        <ShopFilters />
      </template>

      <template
        v-if="sidebar === 'right'"
        #right
      >
        <ShopFilters />
      </template>

      <UPageBody
        :ui="{
          base: 'mt-0 space-y-6 pb-8 sm:space-y-8 sm:pb-10'
        }"
      >
        <div class="space-y-6 sm:space-y-8">
        <UBreadcrumb
          :items="breadcrumbs"
          :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
        />

        <UPageHeader
          headline="محصولات"
          :title="pageTitle"
          :description="pageDescription"
          :links="headerLinks"
          :ui="{
            root: 'border-b border-default pb-6',
            title: 'text-2xl sm:text-3xl',
            description: 'text-base text-muted'
          }"
        />

        <ShopToolbar />

        <div
          v-if="activeFilters.length"
          class="flex flex-wrap items-center gap-2"
        >
          <span class="text-xs font-medium text-muted">
            فیلترهای فعال
          </span>
          <UButton
            v-for="filter in activeFilters"
            :key="filter.key"
            :label="filter.label"
            trailing-icon="i-lucide-x"
            color="primary"
            variant="soft"
            size="xs"
            :ui="{ base: 'rounded-full' }"
            @click="filter.clear()"
          />
          <UButton
            label="پاک کردن همه"
            icon="i-lucide-rotate-ccw"
            color="neutral"
            variant="ghost"
            size="xs"
            @click="resetFilters()"
          />
        </div>

        <div
          v-if="hasProducts && resultsRange"
          class="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-elevated/50 px-4 py-3 ring-1 ring-default"
        >
          <p class="text-sm text-muted">
            نمایش
            <span class="font-medium text-default">{{ resultsRange.start.toLocaleString('fa-IR') }}</span>
            تا
            <span class="font-medium text-default">{{ resultsRange.end.toLocaleString('fa-IR') }}</span>
            از
            <span class="font-medium text-default">{{ totalProducts.toLocaleString('fa-IR') }}</span>
            محصول
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <UBadge
              color="neutral"
              variant="subtle"
              size="sm"
              :icon="view === 'grid' ? 'i-lucide-layout-grid' : 'i-lucide-list'"
              :label="view === 'grid' ? 'نمای شبکه' : 'نمای لیست'"
            />
            <UBadge
              v-if="view === 'grid'"
              color="neutral"
              variant="subtle"
              size="sm"
              icon="i-lucide-columns-3"
              :label="columns === '4' ? '۴ ستونه' : '۳ ستونه'"
            />
            <UBadge
              v-if="sidebar !== 'none'"
              color="neutral"
              variant="subtle"
              size="sm"
              icon="i-lucide-panel-left"
              :label="sidebar === 'left' ? 'فیلتر چپ' : 'فیلتر راست'"
            />
          </div>
        </div>

        <UEmpty
          v-if="!hasProducts"
          icon="i-lucide-package-search"
          title="محصولی یافت نشد"
          description="فیلترها را تغییر دهید، جستجوی دیگری انجام دهید یا همه فیلترها را پاک کنید."
          variant="subtle"
          size="lg"
          :actions="[
            { label: 'پاک کردن فیلترها', icon: 'i-lucide-rotate-ccw', onClick: () => resetFilters() },
            { label: 'بازگشت به فروشگاه', to: '/shop', color: 'neutral', variant: 'outline', icon: 'i-lucide-store' }
          ]"
          :ui="{
            root: 'min-h-72 ring-1 ring-default',
            title: 'text-lg font-semibold',
            description: 'max-w-md text-sm text-muted'
          }"
        />

        <ShopProductGrid
          v-else-if="view === 'grid'"
          :products="paginatedProducts"
          :columns="columns"
        />

        <ShopProductList
          v-else
          :products="paginatedProducts"
        />

        <div
          v-if="hasProducts && totalPages > 1"
          class="flex justify-center border-t border-default pt-6"
        >
          <ShopPagination />
        </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
