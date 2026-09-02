<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { formatPrice } from '~/data/products'
import type { CartItem } from '~/types/shop'

const { items, updateQuantity, remove } = useCart()

const tableData = computed(() =>
  items.value.map((item: CartItem) => ({
    id: item.product.id,
    name: item.product.name,
    image: item.product.image,
    slug: item.product.slug,
    price: item.product.price,
    quantity: item.quantity,
    subtotal: item.product.price * item.quantity
  }))
)

const columns: TableColumn<typeof tableData.value[number]>[] = [
  { id: 'image', header: 'تصویر' },
  { accessorKey: 'name', header: 'نام محصول' },
  { id: 'price', header: 'قیمت' },
  { id: 'quantity', header: 'تعداد' },
  { id: 'subtotal', header: 'جمع' },
  { id: 'actions', header: '' }
]
</script>

<template>
  <UCard
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
            :model-value="row.original.quantity"
            :min="1"
            :max="99"
            class="w-24"
            @update:model-value="updateQuantity(row.original.id, $event ?? 1)"
          />
        </template>

        <template #subtotal-cell="{ row }">
          <span class="font-medium">{{ formatPrice(row.original.subtotal) }}</span>
        </template>

        <template #actions-cell="{ row }">
          <UButton
            color="error"
            variant="ghost"
            icon="i-lucide-trash-2"
            size="sm"
            aria-label="حذف از سبد"
            @click="remove(row.original.id)"
          />
        </template>
      </UTable>
    </div>
  </UCard>
</template>
