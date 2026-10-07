<script setup lang="ts">
import type { MagazinePostDetail } from '@shop/shared'
import { articleJsonLd, breadcrumbJsonLd } from '~/utils/json-ld'
import { renderMarkdown } from '../../utils/markdown'

const RESERVED_SLUGS = new Set(['admin', 'admin/posts'])

const api = useApi()
const route = useRoute()
const settings = useStoreSettingsState()
const siteUrl = useSiteUrl()
const slug = computed(() => String(route.params.slug ?? ''))

function isMagazinePost(value: unknown): value is MagazinePostDetail {
  if (!value || typeof value !== 'object') return false
  const post = value as Partial<MagazinePostDetail>
  return (
    typeof post.slug === 'string'
    && typeof post.title === 'string'
    && typeof post.bodyMarkdown === 'string'
  )
}

const { data: post, error, status } = await useAsyncData(
  () => `mag-${slug.value}`,
  async () => {
    if (!slug.value || RESERVED_SLUGS.has(slug.value)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'مطلب پیدا نشد',
      })
    }
    const result = await api<MagazinePostDetail>(`/magazine/${slug.value}`)
    if (!isMagazinePost(result)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'مطلب پیدا نشد',
      })
    }
    return result
  },
  { watch: [slug] },
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'مطلب پیدا نشد',
  })
}

const html = computed(() => renderMarkdown(post.value?.bodyMarkdown))

useShopSeo(() => {
  const p = post.value
  if (!p) {
    return { title: 'مجله', path: route.path, noindex: true }
  }
  const title = p.seoTitle || p.title
  const description = p.seoDescription || p.excerpt || p.title
  const shop = settings.value.shopName || 'فروشگاه'
  return {
    title,
    description,
    path: `/mag/${p.slug}`,
    image: p.ogImage || p.coverImage,
    type: 'article',
    jsonLd: [
      breadcrumbJsonLd(siteUrl, [
        { name: 'خانه', path: '/' },
        { name: 'مجله', path: '/mag' },
        { name: p.title },
      ]),
      articleJsonLd({
        siteUrl,
        title: p.title,
        description,
        path: `/mag/${p.slug}`,
        image: p.ogImage || p.coverImage,
        datePublished: p.publishedAt || p.createdAt,
        dateModified: p.updatedAt,
        publisherName: shop,
        publisherLogo: settings.value.logoUrl,
      }),
    ],
  }
})

function formatDate(value: string | null) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'long',
    }).format(new Date(value))
  } catch {
    return ''
  }
}
</script>

<template>
  <UContainer class="space-y-10 py-10">
    <div
      v-if="status === 'pending'"
      class="mx-auto max-w-3xl space-y-4"
    >
      <USkeleton class="h-8 w-2/3" />
      <USkeleton class="h-4 w-1/3" />
      <USkeleton class="aspect-[16/9] w-full rounded-lg" />
      <USkeleton class="h-40 w-full" />
    </div>

    <template v-else-if="post">
      <article class="mx-auto max-w-3xl space-y-6">
        <div class="space-y-3">
          <UBreadcrumb
            :items="[
              { label: 'خانه', to: '/' },
              { label: 'مجله', to: '/mag' },
              { label: post.title },
            ]"
          />
          <h1 class="text-3xl font-semibold text-highlighted leading-tight">
            {{ post.title }}
          </h1>
          <p
            v-if="post.publishedAt"
            class="text-muted text-sm"
          >
            {{ formatDate(post.publishedAt) }}
          </p>
          <p
            v-if="post.excerpt"
            class="text-muted text-base"
          >
            {{ post.excerpt }}
          </p>
        </div>

        <div
          v-if="post.coverImage"
          class="overflow-hidden rounded-lg"
        >
          <ShopImage
            :src="post.coverImage"
            :alt="post.title"
            class="aspect-[16/9] w-full object-cover"
            priority
          />
        </div>

        <div
          class="mag-prose text-default space-y-4 text-base leading-8"
          v-html="html"
        />
      </article>

      <section
        v-if="post.relatedProducts?.length"
        class="space-y-4"
      >
        <h2 class="text-xl font-semibold text-highlighted">
          محصولات مرتبط
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            v-for="product in post.relatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>
    </template>

    <EmptyState
      v-else
      title="مطلب پیدا نشد"
      description="این مطلب حذف شده یا هنوز منتشر نشده است."
      icon="i-lucide-newspaper"
      action-label="بازگشت به مجله"
      action-to="/mag"
    />
  </UContainer>
</template>

<style scoped>
.mag-prose :deep(h1),
.mag-prose :deep(h2),
.mag-prose :deep(h3) {
  color: var(--ui-text-highlighted);
  font-weight: 600;
  line-height: 1.35;
  margin-top: 1.5rem;
}

.mag-prose :deep(h1) {
  font-size: 1.5rem;
}

.mag-prose :deep(h2) {
  font-size: 1.25rem;
}

.mag-prose :deep(h3) {
  font-size: 1.125rem;
}

.mag-prose :deep(p) {
  margin: 0;
}

.mag-prose :deep(ul),
.mag-prose :deep(ol) {
  padding-inline-start: 1.25rem;
}

.mag-prose :deep(li) {
  margin-block: 0.25rem;
}

.mag-prose :deep(blockquote) {
  border-inline-start: 3px solid var(--ui-border);
  color: var(--ui-text-muted);
  padding-inline-start: 1rem;
}

.mag-prose :deep(a) {
  color: var(--ui-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.mag-prose :deep(code) {
  background: var(--ui-bg-elevated);
  border-radius: 0.25rem;
  font-size: 0.9em;
  padding: 0.1em 0.35em;
}
</style>
