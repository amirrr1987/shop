<template>
  <Card title="محصولات">
    <Table
      :columns="columns"
      :dataSource="productStore.products"
      :row-key="(record) => record.id"
      :scroll="{ x: 1200 }"
    />
  </Card>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/product.store'
import {
  Card,
  Table,
  Button,
  type TableColumnType,
  Popconfirm,
  Image,
  message,
  Tag as AntTag,
} from 'ant-design-vue'
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons-vue'
import { h, onMounted } from 'vue'
import type { Product } from '@/models/product.model'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'

const productStore = useProductStore()
const router = useRouter()


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price)
}

const columns: TableColumnType<Product>[] = [
  {
    title: 'تصویر',
    dataIndex: 'image',
    width: 80,
    fixed: 'left',
    customRender: ({ text }) =>
      text
        ? h(Image, {
            src: `${API_BASE}/${text}`,
            width: 60,
            height: 60,
            style: { objectFit: 'cover', borderRadius: '8px' },
          })
        : h('span', { class: 'text-gray-400' }, '-'),
  },
  {
    title: 'نام',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'اسلاگ',
    dataIndex: 'slug',
    width: 150,
    customRender: ({ text }) => h('code', { class: 'bg-gray-100 px-2 py-1 rounded text-xs' }, text),
  },
  {
    title: 'قیمت',
    dataIndex: 'price',
    width: 120,
    customRender: ({ record }) => {
      const hasDiscount = record.discountPrice && record.discountPrice < record.price
      return h('div', { class: 'flex flex-col' }, [
        hasDiscount
          ? h(
              'span',
              { class: 'line-through text-gray-400 text-xs' },
              `${formatPrice(record.price)} تومان`,
            )
          : null,
        h(
          'span',
          { class: hasDiscount ? 'text-green-600 font-bold' : '' },
          `${formatPrice(hasDiscount ? record.discountPrice! : record.price)} تومان`,
        ),
      ])
    },
  },
  {
    title: 'موجودی',
    dataIndex: 'stock',
    width: 80,
    customRender: ({ text }) =>
      h(AntTag, { color: text > 0 ? 'success' : 'error' }, () => (text > 0 ? text : 'ناموجود')),
  },
  {
    title: 'دسته‌بندی‌ها',
    dataIndex: 'categories',
    width: 180,
    customRender: ({ record }) =>
      record.categories?.length
        ? h(
            'div',
            { class: 'flex flex-wrap gap-1' },
            record.categories.map((cat) =>
              h(AntTag, { color: 'blue', key: cat.id }, () => cat.name),
            ),
          )
        : h('span', { class: 'text-gray-400' }, '-'),
  },
  {
    title: 'تگ‌ها',
    dataIndex: 'tags',
    width: 180,
    customRender: ({ record }) =>
      record.tags?.length
        ? h(
            'div',
            { class: 'flex flex-wrap gap-1' },
            record.tags.map((tag) => h(AntTag, { color: 'purple', key: tag.id }, () => tag.title)),
          )
        : h('span', { class: 'text-gray-400' }, '-'),
  },
  {
    title: 'وضعیت',
    dataIndex: 'isActive',
    width: 100,
    customRender: ({ text }) =>
      text
        ? h(AntTag, { color: 'success', icon: h(CheckCircleOutlined) }, () => 'فعال')
        : h(AntTag, { color: 'error', icon: h(CloseCircleOutlined) }, () => 'غیرفعال'),
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createdAt',
    width: 110,
    customRender: ({ text }) => dayjs(text).format('YYYY/MM/DD'),
  },
  {
    title: 'عملیات',
    key: 'actions',
    width: 120,
    fixed: 'right',
    customRender: ({ record }) =>
      h('div', { class: 'flex gap-2' }, [
        h(Button, {
          type: 'primary',
          class: 'flex! items-center justify-center',
          icon: h(EditOutlined),
          onClick: () => {
            router.push({ name: 'TheProductEdit', params: { id: record.id } })
          },
        }),
        h(
          Popconfirm,
          {
            title: 'حذف کردن محصول',
            description: `این عمل نمی تواند برگشت داده شود.`,
            okText: 'بله',
            cancelText: 'خیر',
            onConfirm: async () => {
              await productStore.deleteProduct(record.id)
              message.success('محصول با موفقیت حذف شد')
            },
          },
          {
            default: () =>
              h(Button, {
                danger: true,
                class: 'flex! items-center justify-center',
                icon: h(DeleteOutlined),
              }),
          },
        ),
      ]),
  },
]

onMounted(() => {
  productStore.getProducts()
})
</script>
