<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { formatPrice } from '~/data/products'

const { items, remove } = useWishlist()
const { add } = useCart()

const quantities = ref<Record<string, number>>({})

watch(items, (list) => {
  for (const product of list) {
    if (!quantities.value[product.id]) {
      quantities.value[product.id] = 1
    }
  }
}, { immediate: true })

const tableData = computed(() =>
  items.value.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    slug: product.slug,
    price: product.price,
    quantity: quantities.value[product.id] ?? 1,
    subtotal: product.price * (quantities.value[product.id] ?? 1)
  }))
)

const columns: TableColumn<typeof tableData.value[number]>[] = [
  { id: 'image', header: 'تصویر' },
  { accessorKey: 'name', header: 'نام محصول' },
  { id: 'price', header: 'قیمت' },
  { id: 'quantity', header: 'تعداد' },
  { id: 'subtotal', header: 'جمع' },
  { id: 'actions', header: 'عملیات' }
]

function addProductToCart(productId: string) {
  const product = items.value.find(p => p.id === productId)
  if (!product) return
  add(product, quantities.value[productId] ?? 1)
}
</script>

<template>
  <UEmpty
    v-if="!items.length"
    icon="i-lucide-heart"
    title="لیست علاقه‌مندی خالی است"
    description="محصولاتی که دوست دارید را از فروشگاه ذخیره کنید."
    variant="subtle"
    size="lg"
    :actions="[{ label: 'رفتن به فروشگاه', to: '/shop', icon: 'i-lucide-store' }]"
    :ui="{
      root: 'min-h-72 ring-1 ring-default',
      title: 'text-lg font-semibold',
      description: 'max-w-md text-sm text-muted'
    }"
  />

  <UCard
    v-else
    variant="subtle"
    :ui="{
      root: 'overflow-hidden ring-1 ring-default',
      body: 'p-0 sm:p-0'
    }"
  >
    <div class="overflow-x-auto">
      <UTable
        :data="tableData"
        :columns="columns"
        :ui="{
          root: 'min-w-180',
          th: 'text-xs font-medium text-muted',
          td: 'align-middle'
        }"
      >
        <template #image-cell="{ row }">
          <ULink :to="`/product/${row.original.slug}`">
            <NuxtImg
              :src="row.original.image"
              :alt="row.original.name"
              width="64"
              height="64"
              loading="lazy"
              class="rounded-md object-cover ring-1 ring-default"
            />
          </ULink>
        </template>

        <template #name-cell="{ row }">
          <ULink
            :to="`/product/${row.original.slug}`"
            class="font-medium hover:text-primary"
          >
            {{ row.original.name }}
          </ULink>
        </template>

        <template #price-cell="{ row }">
          {{ formatPrice(row.original.price) }}
        </template>

        <template #quantity-cell="{ row }">
          <UInputNumber
            v-model="quantities[row.original.id]"
            :min="1"
            :max="99"
            class="w-24"
          />
        </template>

        <template #subtotal-cell="{ row }">
          <span class="font-medium">{{ formatPrice(row.original.subtotal) }}</span>
        </template>

        <template #actions-cell="{ row }">
          <UFieldGroup orientation="horizontal">
            <UButton
              label="افزودن به سبد"
              icon="i-lucide-shopping-cart"
              size="sm"
              @click="addProductToCart(row.original.id)"
            />
            <UButton
              color="error"
              variant="ghost"
              icon="i-lucide-trash-2"
              size="sm"
              aria-label="حذف از علاقه‌مندی‌ها"
              @click="remove(row.original.id)"
            />
          </UFieldGroup>
        </template>
      </UTable>
    </div>
  </UCard>
</template>
