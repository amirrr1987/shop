<script setup lang="ts">
import { categoryNavItems, mainNavItems } from '~/data/navigation'

const route = useRoute()
const searchQuery = ref('')
const { searchCategory, cartOpen, wishlistOpen } = useUi()
const debouncedSearch = refDebounced(searchQuery, 400)

const categoryOptions = [
  { label: 'همه دسته‌ها', value: 'all' },
  { label: 'لپ‌تاپ', value: 'laptop' },
  { label: 'موبایل', value: 'smartphone' },
  { label: 'هدفون', value: 'headphones' },
  { label: 'بازی', value: 'games' },
  { label: 'دوربین', value: 'camera' }
]

const { totalItems, totalPrice } = useCart()
const { count: wishlistCount } = useWishlist()
const { count: compareCount } = useCompare()

watch(() => route.query.q, (value) => {
  if (route.path === '/shop') {
    searchQuery.value = String(value || '')
  }
}, { immediate: true })

watch(debouncedSearch, (value) => {
  if (route.path !== '/shop') return

  const current = String(route.query.q || '')
  if (value === current) return

  navigateTo({
    path: '/shop',
    query: {
      ...route.query,
      q: value || undefined,
      category: searchCategory.value !== 'all' ? searchCategory.value : undefined,
      page: undefined
    }
  }, { replace: true })
})

function onSearch() {
  navigateTo({
    path: '/shop',
    query: {
      q: searchQuery.value || undefined,
      category: searchCategory.value !== 'all' ? searchCategory.value : undefined
    }
  })
}
</script>

<template>
  <UHeader
    to="/"
    title="روزر"
    :ui="{
      root: 'bg-default/90 backdrop-blur-md border-b border-default',
      left: 'shrink-0 lg:flex-none',
      center: 'hidden min-w-0 lg:flex lg:flex-1 lg:justify-center',
      right: 'shrink-0 flex-none gap-1 sm:gap-1.5',
      container: 'gap-3',
      body: 'space-y-4 border-t border-default'
    }"
  >
    <template #title>
      <span class="inline-flex items-center gap-2 sm:gap-2.5">
        <span class="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 sm:size-9">
          <UIcon
            name="i-lucide-shopping-bag"
            class="size-4 text-primary sm:size-5"
          />
        </span>
        <span class="hidden text-lg font-bold text-highlighted sm:inline sm:text-xl">روزر</span>
      </span>
    </template>

    <UNavigationMenu
      :items="mainNavItems"
      :ui="{ link: 'text-sm font-medium whitespace-nowrap' }"
    />

    <template #right>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-phone"
        to="tel:+800345678"
        aria-label="تماس: (+800) 345678"
        square
        class="hidden md:inline-flex"
        :ui="{ base: 'size-9' }"
      />

      <div class="relative">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-git-compare"
          to="/compare"
          aria-label="مقایسه محصولات"
          square
          :ui="{ base: 'size-9' }"
        />
        <UBadge
          v-if="compareCount"
          color="primary"
          size="sm"
          :label="String(compareCount)"
          class="pointer-events-none absolute -top-1 -inset-s-1 min-w-4 justify-center px-1"
        />
      </div>

      <div class="relative">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-heart"
          aria-label="علاقه‌مندی‌ها"
          square
          :ui="{ base: 'size-9' }"
          @click="wishlistOpen = true"
        />
        <UBadge
          v-if="wishlistCount"
          color="error"
          size="sm"
          :label="String(wishlistCount)"
          class="pointer-events-none absolute -top-1 -inset-s-1 min-w-4 justify-center px-1"
        />
      </div>

      <div class="relative">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-shopping-bag"
          aria-label="سبد خرید"
          square
          :ui="{ base: 'size-9' }"
          @click="cartOpen = true"
        />
        <UBadge
          v-if="totalItems"
          color="primary"
          size="sm"
          :label="String(totalItems)"
          class="pointer-events-none absolute -top-1 -inset-s-1 min-w-4 justify-center px-1"
        />
      </div>

      <UColorModeButton :ui="{ base: 'size-9' }" />
    </template>

    <template #bottom>
      <UContainer class="hidden border-t border-default py-3 lg:block">
        <div class="flex items-center gap-3">
          <UFieldGroup
            orientation="horizontal"
            class="min-w-0 flex-1"
          >
            <USelect
              v-model="searchCategory"
              :items="categoryOptions"
              value-key="value"
              label-key="label"
              placeholder="دسته"
              :ui="{ base: 'min-w-32 shrink-0' }"
            />
            <UInput
              v-model="searchQuery"
              placeholder="جستجو در فروشگاه..."
              icon="i-lucide-search"
              class="min-w-0 flex-1"
              @keyup.enter="onSearch"
            />
            <UButton
              icon="i-lucide-search"
              label="جستجو"
              @click="onSearch"
            />
          </UFieldGroup>

          <p
            v-if="totalItems"
            class="hidden shrink-0 text-sm text-muted xl:block"
          >
            سبد:
            <span class="font-medium text-default">{{ totalPrice.toLocaleString('fa-IR') }} تومان</span>
          </p>
        </div>
      </UContainer>
    </template>

    <template #body>
      <UFieldGroup
        orientation="vertical"
        class="w-full"
      >
        <USelect
          v-model="searchCategory"
          :items="categoryOptions"
          value-key="value"
          label-key="label"
          placeholder="دسته"
        />
        <UInput
          v-model="searchQuery"
          placeholder="جستجو در فروشگاه..."
          icon="i-lucide-search"
          @keyup.enter="onSearch"
        />
        <UButton
          label="جستجو"
          icon="i-lucide-search"
          block
          @click="onSearch"
        />
      </UFieldGroup>

      <UNavigationMenu
        :items="mainNavItems"
        orientation="vertical"
        class="-mx-2.5"
        :ui="{ link: 'text-sm font-medium' }"
      />

      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-phone"
        label="(+800) 345678"
        to="tel:+800345678"
        block
      />
    </template>
  </UHeader>

  <div class="border-b border-default bg-elevated/50">
    <UContainer class="py-1.5">
      <UNavigationMenu
        :items="categoryNavItems"
        color="primary"
        variant="link"
        :ui="{
          root: 'overflow-x-auto',
          list: 'flex flex-nowrap items-center gap-1',
          link: 'whitespace-nowrap px-2.5 py-2 text-sm font-medium'
        }"
      />
    </UContainer>
  </div>

  <LayoutShopCartSlideover v-model:open="cartOpen" />
  <LayoutShopWishlistSlideover v-model:open="wishlistOpen" />
</template>
