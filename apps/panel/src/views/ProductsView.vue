<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Badge,
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
  WarningOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type { Brand, Category, Product } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatMoney, formatNumber } from '@/utils/format'
import { stockTag } from '@/utils/status'

const ability = useAbility<AppAbility>()
const router = useRouter()
const queryClient = useQueryClient()
const page = useRouteQuery('page', '1')
const perPage = 20

const currentPage = computed(() => {
  const value = Number(page.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const columns: TableColumnType<Product>[] = [
  { title: 'نام', dataIndex: 'name', key: 'name' },
  { title: 'اسلاگ', dataIndex: 'slug', key: 'slug', width: 140 },
  { title: 'دسته', key: 'category', width: 120 },
  { title: 'برند', key: 'brand', width: 120 },
  { title: 'قیمت', dataIndex: 'price', key: 'price', width: 130 },
  { title: 'موجودی', key: 'stock', width: 140 },
  { title: 'ویژه', key: 'featured', width: 90 },
  { title: 'وضعیت', key: 'status', width: 100 },
  { title: 'عملیات', key: 'actions', width: 180 },
]

const {
  data: productsData,
  isPending,
  error: productsError,
} = useQuery({
  queryKey: computed(() => queryKeys.products(currentPage.value, perPage)),
  queryFn: () =>
    api<{ items: Product[]; total: number }>('/products/admin', {
      params: {
        page: currentPage.value,
        perPage,
        sort: 'newest',
      },
    }),
})

const { data: categoriesData } = useQuery({
  queryKey: queryKeys.categories,
  queryFn: () => api<Category[]>('/categories'),
})

const { data: brandsData } = useQuery({
  queryKey: queryKeys.brands,
  queryFn: () => api<Brand[]>('/brands'),
})

const rows = computed(() => productsData.value?.items ?? [])
const total = computed(() => productsData.value?.total ?? 0)

const categoryNameById = computed(() => {
  const map = new Map<string, string>()
  for (const item of categoriesData.value ?? []) {
    map.set(item.id, item.name)
  }
  return map
})

const brandNameById = computed(() => {
  const map = new Map<string, string>()
  for (const item of brandsData.value ?? []) {
    map.set(item.id, item.name)
  }
  return map
})

function categoryLabel(categoryId: string | null) {
  if (!categoryId) return null
  return categoryNameById.value.get(categoryId) ?? null
}

function brandLabel(brandId: string | null) {
  if (!brandId) return null
  return brandNameById.value.get(brandId) ?? null
}

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/products/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('محصول حذف شد')
    await queryClient.invalidateQueries({ queryKey: ['products'] })
    await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function goCreate() {
  void router.push({ name: 'product-create' })
}

function goEdit(row: Product) {
  void router.push({ name: 'product-edit', params: { id: row.id } })
}

function onPageChange(next: number) {
  page.value = String(next)
}

watch(productsError, (value) => {
  if (value) {
    message.error(
      value instanceof ApiError ? value.message : 'بارگذاری ناموفق بود',
    )
  }
})
</script>

<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
      <Space align="center">
        <TypographyTitle :level="3" style="margin: 0">محصولات</TypographyTitle>
        <Badge
          :count="total"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="9999"
          :show-zero="true"
        />
      </Space>
      <Button
        v-if="ability.can('create', 'Product')"
        type="primary"
        @click="goCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        افزودن محصول
      </Button>
    </div>

    <Table
      row-key="id"
      :loading="isPending"
      :columns="columns"
      :data-source="rows"
      :pagination="{
        current: currentPage,
        pageSize: perPage,
        total,
        onChange: onPageChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'slug'">
          <Tag>{{ (record as Product).slug }}</Tag>
        </template>
        <template v-else-if="column.key === 'category'">
          <Tag
            v-if="categoryLabel((record as Product).categoryId)"
            color="processing"
          >
            {{ categoryLabel((record as Product).categoryId) }}
          </Tag>
          <Tag v-else>بدون دسته</Tag>
        </template>
        <template v-else-if="column.key === 'brand'">
          <Tag
            v-if="brandLabel((record as Product).brandId) || (record as Product).brandName"
            color="cyan"
          >
            {{ brandLabel((record as Product).brandId) || (record as Product).brandName }}
          </Tag>
          <Tag v-else>بدون برند</Tag>
        </template>
        <template v-else-if="column.key === 'price'">
          <template v-if="(record as Product).priceMode === 'call'">
            تماس بگیرید
          </template>
          <template v-else>
            {{ formatMoney((record as Product).price) }}
          </template>
        </template>
        <template v-else-if="column.key === 'stock'">
          <Space>
            <span>{{ formatNumber((record as Product).stock) }}</span>
            <Tag :color="stockTag((record as Product).stock).color">
              <CloseCircleOutlined v-if="(record as Product).stock < 1" />
              <WarningOutlined
                v-else-if="(record as Product).stock <= 5"
              />
              <CheckCircleOutlined v-else />
              {{ stockTag((record as Product).stock).label }}
            </Tag>
          </Space>
        </template>
        <template v-else-if="column.key === 'featured'">
          <Tag v-if="(record as Product).isFeatured" color="gold">ویژه</Tag>
          <span v-else style="color: rgba(0,0,0,0.25)">—</span>
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :color="(record as Product).isActive ? 'success' : 'default'">
            <EyeOutlined v-if="(record as Product).isActive" />
            <EyeInvisibleOutlined v-else />
            {{ (record as Product).isActive ? 'فعال' : 'مخفی' }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Product')"
              type="link"
              @click="goEdit(record as Product)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Product')"
              title="این محصول حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="deleteMutation.mutate((record as Product).id)"
            >
              <Button type="link" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
                حذف
              </Button>
            </Popconfirm>
          </Space>
        </template>
      </template>
    </Table>
  </div>
</template>
