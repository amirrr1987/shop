<script setup lang="ts">
const {
  layout,
  sidebar,
  category,
  paginatedPosts,
  filteredPosts,
  page,
  totalPages,
  pageSize,
  setLayout,
  setSidebar,
  setPage,
  setCategory
} = useBlogCatalog()

useSeoMeta({ title: 'وبلاگ — روزر' })

const pageUi = computed(() => {
  const hasSidebar = sidebar.value !== 'none'

  return {
    root: 'flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8',
    left: 'min-w-0 lg:col-span-3',
    center: hasSidebar ? 'min-w-0 lg:col-span-9' : 'min-w-0 lg:col-span-12',
    right: 'min-w-0 lg:col-span-3'
  }
})

const hasPosts = computed(() => paginatedPosts.value.length > 0)

const resultsRange = computed(() => {
  if (!filteredPosts.value.length) return null

  const start = (page.value - 1) * pageSize + 1
  const end = Math.min(page.value * pageSize, filteredPosts.value.length)

  return { start, end }
})
</script>

<template>
  <UContainer class="py-6 sm:py-8">
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
          base: 'mt-0 space-y-6 pb-8 sm:space-y-8 sm:pb-10'
        }"
      >
        <div class="space-y-6 sm:space-y-8">
          <UBreadcrumb
            :items="[
              { label: 'خانه', to: '/' },
              { label: 'وبلاگ', to: '/blog' }
            ]"
            :ui="{ link: 'text-sm text-muted transition-colors hover:text-default' }"
          />

          <UPageHeader
            headline="مجله روزر"
            title="وبلاگ"
            :description="`${filteredPosts.length.toLocaleString('fa-IR')} مطلب ${category ? `در دسته «${category}»` : ''}`"
            :ui="{
              root: 'border-b border-default pb-6',
              title: 'text-2xl sm:text-3xl',
              description: 'text-base text-muted'
            }"
          />

          <UCard
            variant="subtle"
            :ui="{
              root: 'ring-1 ring-default',
              body: 'p-4 sm:p-5'
            }"
          >
            <div class="flex flex-wrap items-center gap-3">
              <UFieldGroup orientation="horizontal">
                <UButton
                  :color="layout === 'grid' ? 'primary' : 'neutral'"
                  :variant="layout === 'grid' ? 'solid' : 'ghost'"
                  icon="i-lucide-layout-grid"
                  label="شبکه"
                  @click="setLayout('grid')"
                />
                <UButton
                  :color="layout === 'list' ? 'primary' : 'neutral'"
                  :variant="layout === 'list' ? 'solid' : 'ghost'"
                  icon="i-lucide-list"
                  label="لیست"
                  @click="setLayout('list')"
                />
              </UFieldGroup>

              <USelect
                :model-value="sidebar"
                :items="[
                  { label: 'بدون سایدبار', value: 'none' },
                  { label: 'سایدبار چپ', value: 'left' },
                  { label: 'سایدبار راست', value: 'right' }
                ]"
                value-key="value"
                label-key="label"
                placeholder="چیدمان"
                icon="i-lucide-panel-left"
                class="min-w-40"
                @update:model-value="setSidebar($event as 'none' | 'left' | 'right')"
              />

              <UButton
                v-if="category"
                label="حذف دسته"
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="setCategory('')"
              />
            </div>
          </UCard>

          <div
            v-if="hasPosts && resultsRange"
            class="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-elevated/50 px-4 py-3 ring-1 ring-default"
          >
            <p class="text-sm text-muted">
              نمایش
              <span class="font-medium text-default">{{ resultsRange.start.toLocaleString('fa-IR') }}</span>
              تا
              <span class="font-medium text-default">{{ resultsRange.end.toLocaleString('fa-IR') }}</span>
              از
              <span class="font-medium text-default">{{ filteredPosts.length.toLocaleString('fa-IR') }}</span>
              مطلب
            </p>
            <UBadge
              color="neutral"
              variant="subtle"
              size="sm"
              :icon="layout === 'grid' ? 'i-lucide-layout-grid' : 'i-lucide-list'"
              :label="layout === 'grid' ? 'نمای شبکه' : 'نمای لیست'"
            />
          </div>

          <UEmpty
            v-if="!hasPosts"
            icon="i-lucide-newspaper"
            title="مطلبی یافت نشد"
            description="فیلتر دسته را تغییر دهید یا همه مطالب را ببینید."
            variant="subtle"
            size="lg"
            :actions="[
              { label: 'همه مطالب', to: '/blog', icon: 'i-lucide-rotate-ccw' },
              { label: 'فروشگاه', to: '/shop', color: 'neutral', variant: 'outline', icon: 'i-lucide-store' }
            ]"
            :ui="{
              root: 'min-h-72 ring-1 ring-default',
              title: 'text-lg font-semibold',
              description: 'max-w-md text-sm text-muted'
            }"
          />

          <BlogPostList
            v-else
            :posts="paginatedPosts"
            :layout="layout"
          />

          <div
            v-if="hasPosts && totalPages > 1"
            class="flex justify-center border-t border-default pt-6"
          >
            <UPagination
              :page="page"
              :total="filteredPosts.length"
              :items-per-page="pageSize"
              show-edges
              @update:page="setPage"
            />
          </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
