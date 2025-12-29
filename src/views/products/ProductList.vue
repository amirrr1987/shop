<template>
  <Card title="Products">
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
} from 'ant-design-vue'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import ProductForm from './components/ProductForm.vue'
import type { CreateProduct, Product, UpdateProduct } from '@/models/product.model'
import dayjs from 'dayjs'
const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'
const productStore = useProductStore()
const open = ref(false)

const emptyProduct = (): CreateProduct | UpdateProduct => ({}) as CreateProduct | UpdateProduct

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
  isLoading.value = false
  const payload = selectedProduct.value
  if ('id' in payload) {
    await productStore.updateProduct({
      name: payload.name,
      price: payload.price,
      description: payload.description,
      id: payload.id,
      image: payload.image,
    })
    message.success('محصول با موفقیت ویرایش شد.')
  } else {
    await productStore.createProduct({
      name: payload.name,
      price: payload.price,
      description: payload.description,
      image: payload.image,
    })
    message.success('محصول با موفقیت ثبت شد.')
  }

  open.value = false
  selectedProduct.value = emptyProduct()
  await productStore.getProducts()
}

const columns: TableColumnType<Product>[] = [
  { title: 'ID', dataIndex: 'id' },
  {
    title: 'تصویر',
    dataIndex: 'image',
    width: 120,
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
  { title: 'نام', dataIndex: 'name' },
  {
    title: 'قیمت (تومان)',
    dataIndex: 'price',
    customRender: ({ text }) => `${Number(text)}`,
  },
  { title: 'توضیحات', dataIndex: 'description' },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createdAt',
    customRender: ({ text }) => dayjs(text).format('HH:mm:ss - YYYY/MM/DD'),
  },
  {
    title: 'تاریخ بروزرسانی',
    dataIndex: 'updatedAt',
    customRender: ({ text }) => dayjs(text).format('HH:mm:ss - YYYY/MM/DD'),
  },
  {
    title: 'عملیات',
    key: 'actions',
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
              await productStore.getProducts()
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
