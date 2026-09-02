<script setup lang="ts">
import {
  shopCategoryFilters,
  shopColorOptions,
  shopSizeOptions
} from '~/data/shop-filters'

const {
  priceMin,
  priceMax,
  sizes,
  colors,
  inStockOnly,
  category,
  updateQuery,
  resetFilters
} = useShopCatalog()

const localPrice = ref<[number, number]>([priceMin.value, priceMax.value])
const localSizes = ref<string[]>([...sizes.value])
const localColors = ref<string[]>([...colors.value])
const localInStock = ref(inStockOnly.value)

watch([priceMin, priceMax], ([min, max]) => {
  localPrice.value = [min, max]
})

watch(sizes, (value) => {
  localSizes.value = [...value]
})

watch(colors, (value) => {
  localColors.value = [...value]
})

watch(inStockOnly, (value) => {
  localInStock.value = value
})

const categoryAccordion = computed(() =>
  shopCategoryFilters.map((group, index) => ({
    label: group.label,
    value: `cat-${index}`,
    slot: `cat-${index}` as const
  }))
)

function applyFilters() {
  updateQuery({
    priceMin: localPrice.value[0] || undefined,
    priceMax: localPrice.value[1] >= 100_000_000 ? undefined : localPrice.value[1],
    sizes: localSizes.value.length ? localSizes.value : undefined,
    colors: localColors.value.length ? localColors.value : undefined,
    inStock: localInStock.value ? '1' : undefined,
    page: 1
  })
}
</script>

<template>
  <UPageAside>
    <UCard>
      <template #header>
        <UPageHeader
          title="الکترونیک"
          description="دسته‌بندی محصولات"
        />
      </template>

      <UAccordion :items="categoryAccordion">
        <template
          v-for="(group, index) in shopCategoryFilters"
          :key="group.label"
          #[`cat-${index}`]
        >
          <UPageLinks :links="group.children" />
        </template>
      </UAccordion>
    </UCard>

    <UCard>
      <template #header>
        <UPageHeader title="فیلتر بر اساس" />
      </template>

      <UForm @submit.prevent="applyFilters">
        <UFormField label="محدوده قیمت">
          <USlider
            v-model="localPrice"
            :min="0"
            :max="100_000_000"
            :step="500_000"
          />
          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-banknote"
            :title="`${localPrice[0].toLocaleString('fa-IR')} — ${localPrice[1].toLocaleString('fa-IR')} تومان`"
          />
        </UFormField>

        <UFormField label="سایز">
          <UCheckboxGroup
            v-model="localSizes"
            :items="shopSizeOptions"
            value-key="value"
            label-key="label"
          />
        </UFormField>

        <UFormField label="رنگ">
          <UCheckboxGroup
            v-model="localColors"
            :items="shopColorOptions"
            value-key="value"
            label-key="label"
          />
        </UFormField>

        <UFormField label="موجودی">
          <USwitch
            v-model="localInStock"
            label="فقط کالاهای موجود"
          />
        </UFormField>

        <UFieldGroup orientation="horizontal">
          <UButton
            type="submit"
            label="اعمال فیلتر"
            icon="i-lucide-filter"
          />
          <UButton
            label="پاک کردن"
            color="neutral"
            variant="outline"
            icon="i-lucide-x"
            @click="resetFilters"
          />
        </UFieldGroup>
      </UForm>
    </UCard>

    <UAlert
      v-if="category"
      color="info"
      variant="subtle"
      icon="i-lucide-tag"
      :title="`دسته فعال: ${category}`"
    />
    <UButton
      v-if="category"
      label="حذف فیلتر دسته"
      color="neutral"
      variant="outline"
      icon="i-lucide-x"
      @click="updateQuery({ category: undefined, page: 1 })"
    />
  </UPageAside>
</template>
