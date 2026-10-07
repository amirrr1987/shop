<script setup lang="ts">
import type { Product, ProductSpec } from '@shop/shared'

useShopSeo({
  title: 'مقایسه محصولات',
  description: 'مقایسه حداکثر پنج محصول کنار هم',
  path: '/compare',
  noindex: true,
})

const api = useApi()
const { items, count, max, remove, clear } = useCompare()
const { formatPrice } = useCurrency()
const storageReady = useState('compare-storage-ready', () => false)

/** Live specs/brand from API (covers old localStorage rows without specs). */
const liveById = ref<Record<string, { brandName: string | null; specs: ProductSpec[] }>>({})

watch(
  () => items.value.map((item) => item.slug).join('|'),
  async (key) => {
    if (!key || !import.meta.client) {
      liveById.value = {}
      return
    }
    const next: typeof liveById.value = {}
    await Promise.all(
      items.value.map(async (item) => {
        try {
          const product = await api<Product>(`/products/${item.slug}`)
          next[item.productId] = {
            brandName: product.brandName ?? item.brandName ?? null,
            specs: product.specs ?? item.specs ?? [],
          }
        } catch {
          next[item.productId] = {
            brandName: item.brandName ?? null,
            specs: item.specs ?? [],
          }
        }
      }),
    )
    liveById.value = next
  },
  { immediate: true },
)

type CompareRow = {
  key: string
  label: string
  kind: 'price' | 'brand' | 'stock' | 'featured' | 'spec'
  specKey?: string
}

function resolvedSpecs(productId: string): ProductSpec[] {
  return liveById.value[productId]?.specs
    ?? items.value.find((row) => row.productId === productId)?.specs
    ?? []
}

function resolvedBrand(productId: string): string {
  return liveById.value[productId]?.brandName
    ?? items.value.find((row) => row.productId === productId)?.brandName
    ?? ''
}

const rows = computed((): CompareRow[] => {
  const base: CompareRow[] = [
    { key: 'price', label: 'قیمت', kind: 'price' },
    { key: 'brand', label: 'برند', kind: 'brand' },
    { key: 'stock', label: 'موجودی', kind: 'stock' },
    { key: 'featured', label: 'ویژه', kind: 'featured' },
  ]

  const specKeys = new Set<string>()
  for (const item of items.value) {
    for (const spec of resolvedSpecs(item.productId)) {
      if (spec.key.trim()) {
        specKeys.add(spec.key.trim())
      }
    }
  }

  for (const key of [...specKeys].sort((a, b) => a.localeCompare(b, 'fa'))) {
    base.push({
      key: `spec-${key}`,
      label: key,
      kind: 'spec',
      specKey: key,
    })
  }

  return base
})

function specValue(productId: string, specKey: string) {
  return resolvedSpecs(productId).find((spec) => spec.key === specKey)?.value ?? '—'
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          مقایسه محصولات
        </h1>
        <p class="text-muted mt-1 text-sm">
          حداکثر {{ max }} محصول هم‌دسته · {{ count }} انتخاب‌شده
        </p>
      </div>
      <UButton
        v-if="storageReady && count"
        label="خالی کردن"
        color="neutral"
        variant="ghost"
        @click="clear"
      />
    </div>

    <div
      v-if="!storageReady"
      class="space-y-3"
    >
      <USkeleton class="h-40 rounded-lg" />
    </div>

    <EmptyState
      v-else-if="!count"
      title="هنوز محصولی برای مقایسه نیست"
      description="از کارت محصول دکمه مقایسه را بزنید — فقط محصولات یک دسته (حداکثر پنج مورد)."
      icon="i-lucide-columns-3"
      action-label="مشاهده محصولات"
      action-to="/products"
    />

    <div
      v-else
      class="overflow-x-auto"
    >
      <table class="w-full min-w-160 border-collapse text-sm">
        <thead>
          <tr class="border-default border-b">
            <th class="text-muted w-28 py-3 text-start font-medium">
              ویژگی
            </th>
            <th
              v-for="item in items"
              :key="item.productId"
              class="px-3 py-3 text-start align-top"
            >
              <div class="space-y-3">
                <NuxtLink
                  :to="`/products/${item.slug}`"
                  class="bg-elevated block aspect-square max-w-40 overflow-hidden rounded-lg"
                >
                  <ShopImage
                    :src="item.image"
                    :alt="item.name"
                    :width="200"
                    :height="200"
                    sizes="160px"
                  />
                </NuxtLink>
                <NuxtLink
                  :to="`/products/${item.slug}`"
                  class="text-highlighted font-medium hover:underline"
                >
                  {{ item.name }}
                </NuxtLink>
                <UButton
                  label="حذف"
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  @click="remove(item.productId)"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.key"
            class="border-default border-b"
          >
            <th class="text-muted py-3 text-start font-medium">
              {{ row.label }}
            </th>
            <td
              v-for="item in items"
              :key="`${item.productId}-${row.key}`"
              class="px-3 py-3"
            >
              <template v-if="row.kind === 'price'">
                <span v-if="item.priceMode === 'call'">تماس بگیرید</span>
                <span v-else>{{ formatPrice(item.price) }}</span>
              </template>
              <template v-else-if="row.kind === 'brand'">
                {{ resolvedBrand(item.productId) || '—' }}
              </template>
              <template v-else-if="row.kind === 'stock'">
                <UBadge
                  v-if="item.stock < 1"
                  label="ناموجود"
                  color="error"
                  variant="subtle"
                  size="sm"
                />
                <span v-else>{{ item.stock }} عدد</span>
              </template>
              <template v-else-if="row.kind === 'featured'">
                {{ item.isFeatured ? 'بله' : 'خیر' }}
              </template>
              <template v-else>
                {{ specValue(item.productId, row.specKey!) }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UContainer>
</template>
