<script setup lang="ts">
import type { Brand, Category, Product } from '@shop/shared'
import type { HomeHeroSlide, HomePromoBanner } from '~/types/home'

const api = useApi()
const settings = useStoreSettingsState()
const branches = computed(() => settings.value.storeBranches ?? [])
const shopName = computed(() => settings.value.shopName || 'فروشگاه')

useShopSeo(() => ({
  title: settings.value.shopName,
  description:
    settings.value.metaDescription
    || `خرید آنلاین از ${settings.value.shopName} — محصولات منتخب با ارسال مطمئن`,
  path: '/',
  image: settings.value.defaultOgImage || settings.value.logoUrl,
}))

const { data: categories, status: categoriesStatus } = await useAsyncData(
  'home-categories',
  () => api<Category[]>('/categories'),
)

const { data: brands, status: brandsStatus } = await useAsyncData(
  'home-brands',
  () => api<Brand[]>('/brands'),
)

const { data: onSale, status: onSaleStatus } = await useAsyncData(
  'home-on-sale',
  () =>
    api<{ items: Product[] }>('/products', {
      query: {
        page: 1,
        perPage: 12,
        sort: 'newest',
        onSale: 'true',
      },
    }),
)

const { data: featured, status: featuredStatus } = await useAsyncData(
  'home-featured',
  () =>
    api<{ items: Product[] }>('/products', {
      query: {
        page: 1,
        perPage: 12,
        sort: 'newest',
        featured: 'true',
      },
    }),
)

const { data: bestselling, status: bestsellingStatus } = await useAsyncData(
  'home-bestselling',
  () =>
    api<{ items: Product[] }>('/products', {
      query: {
        page: 1,
        perPage: 12,
        sort: 'bestselling',
      },
    }),
)

const { data, status } = await useAsyncData('home-products', () =>
  api<{ items: Product[] }>('/products', {
    query: {
      page: 1,
      perPage: 12,
      sort: 'newest',
    },
  }),
)

const { items: recentItems, hydrate: hydrateRecent } = useRecentlyViewed()
const recentReady = ref(false)
const recentPreview = computed(() =>
  recentReady.value ? recentItems.value.slice(0, 8) : [],
)

const heroSlides = computed((): HomeHeroSlide[] => {
  const slides: HomeHeroSlide[] = [
    {
      id: 'brand',
      subtitle:
        settings.value.metaDescription?.trim().slice(0, 100)
        || 'محصولات منتخب با ارسال مطمئن',
      title: shopName.value,
      ctaLabel: 'مشاهده محصولات',
      to: '/products',
      image: settings.value.defaultOgImage || null,
    },
  ]

  const pool = [
    ...(featured.value?.items ?? []),
    ...(onSale.value?.items ?? []),
    ...(data.value?.items ?? []),
  ]
  const seen = new Set<string>(['brand'])

  for (const product of pool) {
    if (slides.length >= 3) break
    if (seen.has(product.id)) continue
    const image = product.images[0] || product.ogImage
    if (!image) continue
    seen.add(product.id)
    slides.push({
      id: product.id,
      subtitle: product.brandName || 'پیشنهاد ویژه',
      title: product.name,
      ctaLabel: 'مشاهده محصول',
      to: `/products/${product.slug}`,
      image,
    })
  }

  return slides
})

const promoBanners = computed((): HomePromoBanner[] => {
  const banners: HomePromoBanner[] = []
  const saleImage = onSale.value?.items.find((p) => p.images[0])?.images[0]

  banners.push({
    id: 'sale',
    title: 'پیشنهادهای زمان‌دار',
    subtitle: 'تخفیف‌های محدود',
    to: '/products?onSale=true',
    image: saleImage ?? null,
    alt: 'پیشنهادهای زمان‌دار',
  })

  const category = categories.value?.[0]
  if (category) {
    const categoryImage
      = category.ogImage
      || featured.value?.items.find(
        (p) => p.categoryId === category.id && p.images[0],
      )?.images[0]
      || featured.value?.items.find((p) => p.images[0])?.images[0]
      || null
    banners.push({
      id: `category-${category.id}`,
      title: category.name,
      subtitle: 'مشاهده دسته',
      to: `/categories/${category.slug}`,
      image: categoryImage,
      alt: category.name,
    })
  }

  const brand = brands.value?.[0]
  banners.push({
    id: 'brands',
    title: brand ? brand.name : 'برندها',
    subtitle: brand ? 'و سایر برندها' : 'همه برندها',
    to: brand ? `/brands/${brand.slug}` : '/brands',
    image: brand?.ogImage ?? null,
    alt: brand ? brand.name : 'برندها',
  })

  return banners.slice(0, 3)
})

onMounted(() => {
  hydrateRecent()
  recentReady.value = true
})
</script>

<template>
  <div>
    <HomeHeroCarousel :slides="heroSlides" />

    <UContainer class="space-y-10 py-10">
      <HomePromoBanners :banners="promoBanners" />

      <HomeServiceFeatures />

      <HomeCategoriesCarousel
        :categories="categories ?? []"
        :pending="categoriesStatus === 'pending'"
      />

      <HomeBrandsCarousel
        :brands="brands ?? []"
        :pending="brandsStatus === 'pending'"
      />

      <HomeProductCarousel
        title="پیشنهادهای زمان‌دار"
        to="/products?onSale=true"
        :products="onSale?.items ?? []"
        :pending="onSaleStatus === 'pending'"
      />

      <HomeProductCarousel
        title="ویژه"
        to="/products?featured=true"
        :products="featured?.items ?? []"
        :pending="featuredStatus === 'pending'"
      />

      <HomeProductCarousel
        title="پرفروش‌ترین"
        to="/products?sort=bestselling"
        :products="bestselling?.items ?? []"
        :pending="bestsellingStatus === 'pending'"
      />

      <HomeRecentCarousel :items="recentPreview" />

      <HomeProductCarousel
        title="تازه‌ها"
        to="/products"
        :products="data?.items ?? []"
        :pending="status === 'pending'"
      />

      <p
        v-if="status !== 'pending' && !data?.items.length"
        class="text-muted"
      >
        هنوز محصولی نیست. از پنل مدیریت اضافه کنید.
      </p>

      <HomeBranchesCarousel :branches="branches" />
    </UContainer>
  </div>
</template>
