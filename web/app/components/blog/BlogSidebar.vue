<script setup lang="ts">
import { blogCategories, blogPosts, recentPosts } from '~/data/blog'

const route = useRoute()
const { category, setCategory } = useBlogCatalog()

const search = ref('')

const categoryLinks = computed(() =>
  blogCategories.map(c => ({
    label: `${c.label} (${c.count})`,
    to: {
      path: '/blog',
      query: {
        ...route.query,
        category: c.value,
        page: undefined
      }
    }
  }))
)

const filteredRecent = computed(() => {
  if (!search.value) return recentPosts
  const q = search.value.toLowerCase()
  return blogPosts.filter(p =>
    p.title.toLowerCase().includes(q)
    || p.excerpt.toLowerCase().includes(q)
  ).slice(0, 4)
})

function recentPostLink(slug: string) {
  const query: Record<string, string> = {}

  if (route.query.sidebar === 'left' || route.query.sidebar === 'right') {
    query.sidebar = String(route.query.sidebar)
  }

  if (route.query.layout === 'list') {
    query.layout = 'list'
  }

  return Object.keys(query).length
    ? { path: `/blog/${slug}`, query }
    : `/blog/${slug}`
}
</script>

<template>
  <UPageAside>
    <UCard>
      <template #header>
        <UPageHeader title="جستجو" />
      </template>
      <UInput
        v-model="search"
        placeholder="جستجو در وبلاگ..."
        icon="i-lucide-search"
      />
    </UCard>

    <UCard>
      <template #header>
        <UPageHeader title="دسته‌بندی" />
      </template>
      <UPageLinks :links="categoryLinks" />
      <UButton
        v-if="category"
        label="حذف فیلتر"
        color="neutral"
        variant="outline"
        icon="i-lucide-x"
        @click="setCategory('')"
      />
    </UCard>

    <UCard>
      <template #header>
        <UPageHeader title="پست‌های اخیر" />
      </template>
      <UPageList>
        <UCard
          v-for="post in filteredRecent"
          :key="post.slug"
        >
          <ULink :to="recentPostLink(post.slug)">
            <UPageHeader
              :title="post.title"
              :description="post.date"
            />
          </ULink>
        </UCard>
      </UPageList>
    </UCard>

    <UCard>
      <template #header>
        <UPageHeader title="برچسب‌ها" />
      </template>
      <UFieldGroup orientation="horizontal">
        <UBadge
          v-for="tag in ['سامسونگ', 'گیمینگ', 'راهنما', 'IoT']"
          :key="tag"
          color="neutral"
          variant="subtle"
          :label="tag"
        />
      </UFieldGroup>
    </UCard>
  </UPageAside>
</template>
