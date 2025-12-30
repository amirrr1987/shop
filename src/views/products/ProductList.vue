<template>
  <Card title="محصولات">
    <template #extra>
      <Button type="primary" @click="openCreate" :icon="h(PlusOutlined)">افزودن محصول</Button>
    </template>

    <ProductForm
      v-model:open="open"
      v-model:selected-product="selectedProduct"
      @submit="handleSubmit"
      @cancel="handleCancel"
      :isLoading="isLoading"
    />

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
import { DeleteOutlined, EditOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import ProductForm from './components/ProductForm.vue'
import type { CreateProduct, Product, UpdateProduct } from '@/models/product.model'
import dayjs from 'dayjs'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'

const productStore = useProductStore()
const open = ref(false)

const emptyProduct = (): CreateProduct | UpdateProduct =>
  ({
    name: '',
    slug: '',
    price: 0,
    discountPrice: null,
    description: '',
    image: '',
    stock: 0,
    isActive: true,
    tagIds: [],
    categoryIds: [],
  }) as CreateProduct | UpdateProduct

const selectedProduct = ref<CreateProduct | UpdateProduct>(emptyProduct())

const openCreate = () => {
  selectedProduct.value = emptyProduct()
  open.value = true
}

const handleCancel = () => {
  open.value = false
  selectedProduct.value = emptyProduct()
}

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  const payload = selectedProduct.value

  try {
    if ('id' in payload && payload.id) {
      await productStore.updateProduct({
        id: payload.id,
        name: payload.name,
        slug: payload.slug,
        price: payload.price,
        discountPrice: payload.discountPrice,
        description: payload.description,
        image: payload.image,
        stock: payload.stock,
        isActive: payload.isActive,
        tagIds: payload.tagIds,
        categoryIds: payload.categoryIds,
      })
      message.success('محصول با موفقیت ویرایش شد')
    } else {
      await productStore.createProduct({
        name: payload.name!,
        slug: payload.slug!,
        price: payload.price!,
        discountPrice: payload.discountPrice,
        description: payload.description,
        image: payload.image!,
        stock: payload.stock ?? 0,
        isActive: payload.isActive ?? true,
        tagIds: payload.tagIds ?? [],
        categoryIds: payload.categoryIds ?? [],
      })
      message.success('محصول با موفقیت ثبت شد')
    }

    open.value = false
    selectedProduct.value = emptyProduct()
    await productStore.getProducts()
  } finally {
    isLoading.value = false
  }
}

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
          ? h('span', { class: 'line-through text-gray-400 text-xs' }, `${formatPrice(record.price)} تومان`)
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
      h(
        AntTag,
        { color: text > 0 ? 'success' : 'error' },
        () => (text > 0 ? text : 'ناموجود'),
      ),
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
            record.tags.map((tag) =>
              h(AntTag, { color: 'purple', key: tag.id }, () => tag.title),
            ),
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
            selectedProduct.value = { ...record }
            open.value = true
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
