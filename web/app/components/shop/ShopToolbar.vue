<script setup lang="ts">
import { shopSortOptions } from '~/data/shop-filters'

const {
  view,
  sort,
  columns,
  sidebar,
  totalProducts,
  setView,
  setSort,
  setColumns,
  setSidebar
} = useShopCatalog()

const sortModel = computed({
  get: () => sort.value,
  set: value => setSort(value as typeof sort.value)
})
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'ring-1 ring-default',
      body: 'space-y-4 p-4 sm:p-5'
    }"
  >
    <div class="flex flex-wrap items-center gap-3">
      <UFieldGroup orientation="horizontal">
        <UButton
          :color="view === 'grid' ? 'primary' : 'neutral'"
          :variant="view === 'grid' ? 'solid' : 'ghost'"
          icon="i-lucide-layout-grid"
          label="شبکه"
          @click="setView('grid')"
        />
        <UButton
          :color="view === 'list' ? 'primary' : 'neutral'"
          :variant="view === 'list' ? 'solid' : 'ghost'"
          icon="i-lucide-list"
          label="لیست"
          @click="setView('list')"
        />
      </UFieldGroup>

      <UBadge
        color="neutral"
        variant="subtle"
        size="sm"
        :label="`${totalProducts.toLocaleString('fa-IR')} محصول`"
      />
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <USelect
        v-model="sortModel"
        :items="shopSortOptions"
        value-key="value"
        label-key="label"
        placeholder="مرتب‌سازی"
        icon="i-lucide-arrow-up-down"
        class="min-w-40 flex-1 sm:flex-none sm:min-w-48"
      />

      <USelect
        v-if="view === 'grid'"
        :model-value="columns"
        :items="[
          { label: '۴ ستونه', value: '4' },
          { label: '۳ ستونه', value: '3' }
        ]"
        value-key="value"
        label-key="label"
        placeholder="ستون‌ها"
        icon="i-lucide-columns-3"
        class="min-w-36 flex-1 sm:flex-none"
        @update:model-value="setColumns($event as '3' | '4')"
      />

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
        class="min-w-36 flex-1 sm:flex-none"
        @update:model-value="setSidebar($event as 'none' | 'left' | 'right')"
      />
    </div>
  </UCard>
</template>
