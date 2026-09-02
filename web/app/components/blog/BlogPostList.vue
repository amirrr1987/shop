<script setup lang="ts">
import type { BlogPost } from '~/data/blog'

const props = defineProps<{
  posts: BlogPost[]
  layout?: 'grid' | 'list'
}>()

const route = useRoute()

function postLink(slug: string) {
  const query: Record<string, string> = {}

  if (route.query.sidebar === 'left' || route.query.sidebar === 'right') {
    query.sidebar = String(route.query.sidebar)
  }

  if (route.query.layout === 'list') {
    query.layout = 'list'
  }

  if (route.query.category) {
    query.category = String(route.query.category)
  }

  return Object.keys(query).length
    ? { path: `/blog/${slug}`, query }
    : `/blog/${slug}`
}

const blogPosts = computed(() =>
  props.posts.map(p => ({
    title: p.title,
    description: p.excerpt,
    date: p.date,
    image: p.image,
    to: postLink(p.slug),
    badge: p.category,
    authors: [{ name: p.author }]
  }))
)
</script>

<template>
  <UBlogPosts
    v-if="layout !== 'list'"
    :posts="blogPosts"
    orientation="horizontal"
    :ui="{
      base: 'gap-6 lg:gap-8'
    }"
  />

  <UPageList
    v-else
    :ui="{
      base: 'space-y-4'
    }"
  >
    <UBlogPost
      v-for="(post, index) in blogPosts"
      :key="posts[index]!.slug"
      v-bind="post"
      orientation="horizontal"
      :ui="{
        root: 'rounded-lg ring-1 ring-default transition-colors hover:bg-elevated/50'
      }"
    />
  </UPageList>
</template>
