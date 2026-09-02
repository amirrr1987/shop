<script setup lang="ts">
import { getBlogPost } from '~/data/blog'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const post = computed(() => getBlogPost(slug.value))

const sidebar = computed(() => {
  const value = route.query.sidebar
  if (value === 'left' || value === 'right') return value
  return 'none'
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'مطلب یافت نشد' })
}

useSeoMeta({ title: () => `${post.value!.title} — روزر` })

const breadcrumbs = computed(() => [
  { label: 'خانه', to: '/' },
  { label: 'وبلاگ', to: '/blog' },
  { label: post.value!.title, to: `/blog/${post.value!.slug}` }
])

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
  <UContainer
    v-if="post"
    class="py-6 sm:py-8"
  >
    <UPage :ui="pageUi">
      <template
        v-if="sidebar === 'left'"
        #left
      >
        <BlogSidebar />
      </template>

      <template
        v-if="sidebar === 'right'"
        #right
      >
        <BlogSidebar />
      </template>

      <UPageBody
        :ui="{
          base: 'mt-0 space-y-8 pb-8 sm:space-y-10 sm:pb-10'
        }"
      >
        <div class="space-y-8 sm:space-y-10">
          <UBreadcrumb
            :items="breadcrumbs"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <BlogPostContent :post="post" />
          <BlogComments />
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
