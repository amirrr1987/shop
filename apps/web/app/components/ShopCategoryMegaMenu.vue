<script setup lang="ts">
import type { Category } from '@shop/shared'

const api = useApi()
const open = ref(false)

const { data: categories } = await useAsyncData(
  'header-categories-mega',
  () => api<Category[]>('/categories'),
  { lazy: true, server: false },
)

const roots = computed(() =>
  (categories.value ?? []).filter((c) => !c.parentId),
)

function childrenOf(parentId: string) {
  return (categories.value ?? []).filter((c) => c.parentId === parentId)
}

function close() {
  open.value = false
}
</script>

<template>
  <UPopover
    v-model:open="open"
    mode="hover"
    enable-touch
    :open-delay="80"
    :close-delay="120"
    :content="{ side: 'bottom', align: 'start', sideOffset: 8 }"
    :ui="{ content: 'w-[min(90vw,42rem)] p-0' }"
  >
    <UButton
      label="دسته‌ها"
      color="neutral"
      variant="ghost"
      trailing-icon="i-lucide-chevron-down"
      class="hidden md:inline-flex"
    />

    <template #content>
      <div class="space-y-4 p-4">
        <div class="flex items-center justify-between gap-3">
          <p class="text-highlighted text-sm font-semibold">
            دسته‌بندی‌ها
          </p>
          <UButton
            label="همه"
            to="/categories"
            size="xs"
            color="neutral"
            variant="ghost"
            @click="close"
          />
        </div>

        <p
          v-if="!categories"
          class="text-muted text-sm"
        >
          در حال بارگذاری…
        </p>

        <p
          v-else-if="!roots.length"
          class="text-muted text-sm"
        >
          هنوز دسته‌ای ثبت نشده است.
        </p>

        <div
          v-else
          class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="root in roots"
            :key="root.id"
            class="space-y-2"
          >
            <NuxtLink
              :to="`/categories/${root.slug}`"
              class="group flex items-center gap-2"
              @click="close"
            >
              <div
                class="bg-elevated size-10 shrink-0 overflow-hidden rounded-md"
              >
                <ShopImage
                  v-if="root.ogImage"
                  :src="root.ogImage"
                  :alt="root.name"
                  :width="40"
                  :height="40"
                  sizes="40px"
                />
                <div
                  v-else
                  class="text-muted flex size-full items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-folder"
                    class="size-4"
                  />
                </div>
              </div>
              <span class="text-highlighted text-sm font-medium group-hover:underline">
                {{ root.name }}
              </span>
            </NuxtLink>

            <ul
              v-if="childrenOf(root.id).length"
              class="ms-12 space-y-1"
            >
              <li
                v-for="child in childrenOf(root.id).slice(0, 6)"
                :key="child.id"
              >
                <NuxtLink
                  :to="`/categories/${child.slug}`"
                  class="text-muted hover:text-highlighted block text-xs hover:underline"
                  @click="close"
                >
                  {{ child.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
