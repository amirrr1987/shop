<script setup lang="ts">
import { formatPrice } from '~/data/products'
import type { Product } from '~/types/shop'

const { items, count, maxItems, remove, clear } = useCompare()
const { add } = useCart()

interface CompareRow {
  key: string
  label: string
  getValue: (product: Product) => string
}

const compareRows = computed<CompareRow[]>(() => {
  const rows: CompareRow[] = [
    {
      key: 'price',
      label: 'قیمت',
      getValue: p => formatPrice(p.price)
    },
    {
      key: 'brand',
      label: 'برند',
      getValue: p => p.brand
    },
    {
      key: 'category',
      label: 'دسته',
      getValue: p => p.category
    },
    {
      key: 'rating',
      label: 'امتیاز',
      getValue: p => `${p.rating}/5`
    },
    {
      key: 'stock',
      label: 'موجودی',
      getValue: p => p.inStock ? 'موجود' : 'ناموجود'
    }
  ]

  const specLabels = new Set<string>()
  for (const product of items.value) {
    for (const spec of product.specs ?? []) {
      specLabels.add(spec.label)
    }
  }

  for (const label of specLabels) {
    rows.push({
      key: `spec-${label}`,
      label,
      getValue: p => p.specs?.find(s => s.label === label)?.value ?? '—'
    })
  }

  return rows
})
</script>

<template>
  <UEmpty
    v-if="!items.length"
    icon="i-lucide-git-compare"
    title="لیست مقایسه خالی است"
    description="حداکثر ۴ محصول را از فروشگاه برای مقایسه اضافه کنید."
    variant="subtle"
    size="lg"
    :actions="[{ label: 'مشاهده فروشگاه', to: '/shop', icon: 'i-lucide-store' }]"
    :ui="{
      root: 'min-h-72 ring-1 ring-default',
      title: 'text-lg font-semibold',
      description: 'max-w-md text-sm text-muted'
    }"
  />

  <div
    v-else
    class="space-y-6"
  >
    <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-elevated/50 px-4 py-3 ring-1 ring-default">
      <p class="text-sm text-muted">
        <span class="font-medium text-default">{{ count.toLocaleString('fa-IR') }}</span>
        از
        <span class="font-medium text-default">{{ maxItems.toLocaleString('fa-IR') }}</span>
        محصول برای مقایسه
      </p>
      <UButton
        label="پاک کردن همه"
        color="error"
        variant="ghost"
        size="sm"
        icon="i-lucide-trash-2"
        @click="clear"
      />
    </div>

    <div class="overflow-x-auto rounded-lg ring-1 ring-default">
      <table class="w-full min-w-160 border-collapse text-sm">
        <thead>
          <tr class="border-b border-default bg-elevated/50">
            <th
              scope="col"
              class="sticky inset-s-0 z-10 min-w-32 bg-elevated/95 px-4 py-3 text-start font-medium text-muted"
            >
              ویژگی
            </th>
            <th
              v-for="product in items"
              :key="product.id"
              scope="col"
              class="min-w-44 px-4 py-3 text-center"
            >
              <div class="flex flex-col items-center gap-3">
                <ULink :to="`/product/${product.slug}`">
                  <NuxtImg
                    :src="product.image"
                    :alt="product.name"
                    width="80"
                    height="80"
                    loading="lazy"
                    class="mx-auto rounded-lg object-cover ring-1 ring-default"
                  />
                </ULink>
                <ULink
                  :to="`/product/${product.slug}`"
                  class="line-clamp-2 text-sm font-medium text-default hover:text-primary"
                >
                  {{ product.name }}
                </ULink>
                <UFieldGroup orientation="horizontal">
                  <UButton
                    label="افزودن به سبد"
                    icon="i-lucide-shopping-cart"
                    size="xs"
                    @click="add(product)"
                  />
                  <UButton
                    color="error"
                    variant="ghost"
                    icon="i-lucide-trash-2"
                    size="xs"
                    aria-label="حذف از مقایسه"
                    @click="remove(product.id)"
                  />
                </UFieldGroup>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in compareRows"
            :key="row.key"
            class="border-b border-default last:border-b-0"
          >
            <th
              scope="row"
              class="sticky inset-s-0 z-10 bg-default px-4 py-3 text-start font-medium text-muted"
            >
              {{ row.label }}
            </th>
            <td
              v-for="product in items"
              :key="`${row.key}-${product.id}`"
              class="px-4 py-3 text-center text-default"
            >
              {{ row.getValue(product) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UCard
      v-if="items.some(p => p.features?.length)"
      variant="subtle"
      :ui="{ root: 'ring-1 ring-default', body: 'space-y-4 p-4 sm:p-5' }"
    >
      <p class="text-sm font-medium text-default">
        ویژگی‌های کلیدی
      </p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="product in items"
          :key="`features-${product.id}`"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ product.name }}
          </p>
          <ul class="space-y-1 text-sm text-default">
            <li
              v-for="(feature, index) in product.features ?? []"
              :key="index"
              class="flex items-start gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-primary"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </UCard>
  </div>
</template>
