<script setup lang="ts">
import type { MagazinePublicList } from '@shop/shared'
import { breadcrumbJsonLd, collectionPageJsonLd } from '~/utils/json-ld'
import { toAbsoluteUrl } from '~/utils/site-url'

const api = useApi()
const route = useRoute()
const settings = useStoreSettingsState()
const siteUrl = useSiteUrl()
const router = useRouter()

const page = computed(() => {
  const value = Number(route.query.page ?? 1)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const { data, status } = await useAsyncData(
  () => `mag-list-${page.value}`,
  () =>
    api<MagazinePublicList>('/magazine', {
      query: { page: page.value, perPage: 12 },
    }),
  { watch: [page] },
)

const items = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)
const perPage = computed(() => data.value?.perPage ?? 12)
const pageCount = computed(() =>
  Math.max(1, Math.ceil(total.value / perPage.value)),
)

function magPath(targetPage: number) {
  return targetPage > 1 ? `/mag?page=${targetPage}` : '/mag'
}

function setPage(next: number) {
  void router.replace({
    query: {
      ...route.query,
      page: next > 1 ? String(next) : undefined,
    },
  })
}

useShopSeo(() => {
  const description = `مقالات و راهنماهای ${settings.value.shopName || 'فروشگاه'}`
  const paged = page.value > 1
  const list = items.value.map((post) => ({
    name: post.title,
    path: `/mag/${post.slug}`,
  }))
  return {
    title: paged ? `مجله — صفحه ${page.value}` : 'مجله',
    description,
    path: magPath(page.value),
    noindex: paged,
    jsonLd: [
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'مجله', path: '/mag' },
      ]),
      collectionPageJsonLd({
        siteUrl,
        name: 'مجله',
        path: magPath(page.value),
        description,
        items: list,
      }),
    ],
  }
})

useHead(() => {
  const links: Array<{ rel: string; href: string }> = []
  const current = page.value
  const last = pageCount.value
  if (current > 1) {
    const prev = toAbsoluteUrl(siteUrl, magPath(current - 1))
    if (prev) links.push({ rel: 'prev', href: prev })
  }
  if (current < last) {
    const next = toAbsoluteUrl(siteUrl, magPath(current + 1))
    if (next) links.push({ rel: 'next', href: next })
  }
  return { link: links }
})

function formatDate(value: string | null) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
    }).format(new Date(value))
  } catch {
    return ''
  }
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div>
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'مجله' },
        ]"
      />
      <h1 class="mt-4 text-2xl font-semibold text-highlighted">
        مجله
      </h1>
      <p class="mt-1 text-muted">
        راهنما، معرفی و مطالب فروشگاه.
      </p>
    </div>

    <div
      v-if="status === 'pending'"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <USkeleton
        v-for="n in 6"
        :key="n"
        class="h-64 rounded-lg"
      />
    </div>

    <div
      v-else-if="items.length"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <NuxtLink
        v-for="post in items"
        :key="post.id"
        :to="`/mag/${post.slug}`"
        class="border-default bg-elevated hover:bg-accented group flex flex-col overflow-hidden rounded-lg border transition"
      >
        <div class="bg-muted aspect-[16/10] overflow-hidden">
          <ShopImage
            v-if="post.coverImage"
            :src="post.coverImage"
            :alt="post.title"
            class="size-full object-cover transition group-hover:scale-[1.02]"
          />
          <div
            v-else
            class="text-muted flex size-full items-center justify-center"
          >
            <UIcon
              name="i-lucide-newspaper"
              class="size-10"
            />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2 p-4">
          <p
            v-if="post.publishedAt"
            class="text-muted text-xs"
          >
            {{ formatDate(post.publishedAt) }}
          </p>
          <h2 class="text-highlighted font-medium leading-snug">
            {{ post.title }}
          </h2>
          <p
            v-if="post.excerpt"
            class="text-muted line-clamp-3 text-sm"
          >
            {{ post.excerpt }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <EmptyState
      v-else
      title="هنوز مطلبی منتشر نشده"
      description="پس از انتشار در پنل، مطالب اینجا نمایش داده می‌شوند."
      icon="i-lucide-newspaper"
      action-label="مشاهده محصولات"
      action-to="/products"
    />

    <div
      v-if="pageCount > 1"
      class="flex justify-center"
    >
      <UPagination
        :page="page"
        :total="total"
        :items-per-page="perPage"
        @update:page="setPage"
      />
    </div>
  </UContainer>
</template>
