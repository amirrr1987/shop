<script setup lang="ts">
import { fa_ir } from '@nuxt/ui/locale'
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '~/utils/json-ld'

const settings = useStoreSettingsState()
const siteUrl = useSiteUrl()

useHead({
  htmlAttrs: {
    lang: 'fa-IR',
    dir: 'rtl',
  },
  title: () => settings.value.shopName || 'فروشگاه',
  titleTemplate: (title) =>
    title && title !== settings.value.shopName
      ? `${title} | ${settings.value.shopName}`
      : settings.value.shopName,
  script: () => {
    const shop = settings.value.shopName || 'فروشگاه'
    const scripts = [
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          organizationJsonLd({
            siteUrl,
            name: shop,
            logoUrl: settings.value.logoUrl,
            email: settings.value.supportEmail,
            phone: settings.value.supportPhone,
            address: settings.value.legalAddress,
          }),
        ),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(websiteJsonLd(siteUrl, shop)),
      },
    ]
    const hasStoreSignal = Boolean(
      settings.value.legalAddress?.trim()
      || settings.value.supportPhone?.trim()
      || (settings.value.storeBranches?.length ?? 0) > 0,
    )
    if (hasStoreSignal) {
      scripts.push({
        type: 'application/ld+json',
        children: JSON.stringify(
          localBusinessJsonLd({
            siteUrl,
            name: shop,
            logoUrl: settings.value.logoUrl,
            email: settings.value.supportEmail,
            phone: settings.value.supportPhone,
            address: settings.value.legalAddress,
            branches: settings.value.storeBranches,
          }),
        ),
      })
    }
    return scripts
  },
})

const route = useRoute()
const { user, logout } = useAuth()
const { count } = useCart()
const { count: wishlistCount } = useWishlist()
const { count: compareCount } = useCompare()

/**
 * localStorage / session hydrate before Vue hydration, so badge/auth UI must
 * stay SSR-stable until mount (otherwise UChip v-if mismatches).
 */
const shellReady = ref(false)
const cartOpen = ref(false)
const wishlistOpen = ref(false)

onMounted(() => {
  shellReady.value = true
})

const cartBadge = computed(() => (shellReady.value ? count.value : 0))
const wishlistBadge = computed(() =>
  shellReady.value ? wishlistCount.value : 0,
)
const compareBadge = computed(() => (shellReady.value ? compareCount.value : 0))

const search = ref(
  typeof route.query.q === 'string' && route.path.startsWith('/products')
    ? route.query.q
    : '',
)

watch(
  () => [route.path, route.query.q] as const,
  ([path, q]) => {
    if (path.startsWith('/products') && typeof q === 'string') {
      search.value = q
    } else if (!path.startsWith('/products')) {
      search.value = ''
    }
  },
)

async function onSearch() {
  const q = search.value.trim()
  await navigateTo({
    path: '/products',
    query: q ? { q } : {},
  })
}

async function onLogout() {
  await logout()
  await navigateTo('/auth/login')
}
</script>

<template>
  <NuxtRouteAnnouncer />
  <UApp :locale="fa_ir" dir="rtl">
    <UHeader :title="settings.shopName || 'فروشگاه'" to="/">
      <template #top>
        <ShopTopBar />
      </template>

      <template #right>
        <ShopSearchAutocomplete
          v-model="search"
          class="hidden w-40 min-w-0 sm:block md:w-64"
          size="sm"
          @submit="onSearch"
        />

        <UButton
          to="/products"
          label="محصولات"
          color="neutral"
          variant="ghost"
          class="hidden md:inline-flex"
        />
        <ShopCategoryMegaMenu />
        <UButton
          to="/brands"
          label="برندها"
          color="neutral"
          variant="ghost"
          class="hidden md:inline-flex"
        />
        <UButton
          to="/mag"
          label="مجله"
          color="neutral"
          variant="ghost"
          class="hidden md:inline-flex"
        />
        <UButton
          v-if="settings.supportPhone"
          :to="`tel:${settings.supportPhone}`"
          :label="settings.supportPhone"
          icon="i-lucide-phone"
          color="neutral"
          variant="ghost"
          class="hidden lg:inline-flex"
        />
        <UButton
          to="/contact"
          label="تماس"
          color="neutral"
          variant="ghost"
          class="hidden md:inline-flex"
        />
        <UChip
          :show="compareBadge > 0"
          :text="String(compareBadge)"
          size="sm"
        >
          <UButton
            to="/compare"
            label="مقایسه"
            color="neutral"
            variant="ghost"
            class="hidden sm:inline-flex"
          />
        </UChip>
        <UChip
          :show="wishlistBadge > 0"
          :text="wishlistBadge > 99 ? '۹۹+' : String(wishlistBadge)"
          size="sm"
        >
          <UButton
            label="علاقه‌مندی"
            color="neutral"
            variant="ghost"
            class="hidden sm:inline-flex"
            @click="wishlistOpen = true"
          />
        </UChip>
        <UChip
          :show="cartBadge > 0"
          :text="cartBadge > 99 ? '۹۹+' : String(cartBadge)"
          size="sm"
        >
          <UButton
            label="سبد"
            color="neutral"
            variant="ghost"
            @click="cartOpen = true"
          />
        </UChip>

        <template v-if="!shellReady || !user">
          <UButton
            to="/auth/login"
            label="ورود"
          />
        </template>
        <template v-else>
          <UButton
            to="/account"
            :label="user.fullName"
            color="neutral"
            variant="ghost"
          />
          <UButton
            label="خروج"
            color="neutral"
            variant="outline"
            @click="onLogout"
          />
        </template>
        <CurrencySwitcher class="hidden sm:block" />
        <UColorModeSwitch />
      </template>

      <template #body>
        <ShopSearchAutocomplete
          v-model="search"
          class="mb-4 sm:hidden"
          size="md"
          @submit="onSearch"
        />
        <div class="flex flex-col gap-1">
          <UButton
            to="/products"
            label="محصولات"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            to="/categories"
            label="دسته‌ها"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            to="/brands"
            label="برندها"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            to="/mag"
            label="مجله"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            v-if="settings.supportPhone"
            :to="`tel:${settings.supportPhone}`"
            :label="settings.supportPhone"
            icon="i-lucide-phone"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            to="/contact"
            label="تماس با ما"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            to="/compare"
            :label="compareCount ? `مقایسه (${compareCount})` : 'مقایسه'"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <UButton
            label="علاقه‌مندی‌ها"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
            @click="wishlistOpen = true"
          />
          <UButton
            label="سبد خرید"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
            @click="cartOpen = true"
          />
          <CurrencySwitcher class="mt-2" />
        </div>
      </template>
    </UHeader>

    <ShopCartSlideover v-model:open="cartOpen" />
    <ShopWishlistSlideover v-model:open="wishlistOpen" />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <ShopFooter />
  </UApp>
</template>
