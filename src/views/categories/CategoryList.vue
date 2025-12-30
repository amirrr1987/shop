<template>
  <Card title="دسته‌بندی‌ها">
    <template #extra>
      <Button type="primary" @click="openCreate" :icon="h(PlusOutlined)">افزودن دسته‌بندی</Button>
    </template>

    <CategoryForm
      v-model:open="open"
      v-model:selected-category="selectedCategory"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <Table
      :columns="columns"
      :dataSource="categoryStore.categories"
      :loading="categoryStore.loading"
      :row-key="(record) => record.id"
    />
  </Card>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.store'
import {
  Card,
  Table,
  Button,
  type TableColumnType,
  Popconfirm,
  Tag as AntTag,
  message,
  Image,
} from 'ant-design-vue'
import { DeleteOutlined, EditOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import CategoryForm from './components/CategoryForm.vue'
import type { CreateCategory, Category, UpdateCategory } from '@/models/category.model'
import dayjs from 'dayjs'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'

const categoryStore = useCategoryStore()
const open = ref(false)

const emptyCategory = (): CreateCategory | UpdateCategory => ({
  name: '',
  slug: '',
  description: '',
  image: null,
  isActive: true,
  sortOrder: 0,
  parentId: null,
}) as CreateCategory | UpdateCategory

const selectedCategory = ref<CreateCategory | UpdateCategory>(emptyCategory())

const openCreate = () => {
  selectedCategory.value = emptyCategory()
  open.value = true
}

const handleCancel = () => {
  open.value = false
  selectedCategory.value = emptyCategory()
}

const handleSubmit = async () => {
  const payload = selectedCategory.value

  if ('id' in payload && payload.id) {
    message.loading('در حال ذخیره دسته‌بندی...')

    await categoryStore.updateCategory({
      id: payload.id,
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      image: payload.image,
      isActive: payload.isActive,
      sortOrder: payload.sortOrder,
      parentId: payload.parentId,
    })
    message.success('دسته‌بندی با موفقیت ویرایش شد')
  } else {
    await categoryStore.createCategory({
      name: payload.name!,
      slug: payload.slug!,
      description: payload.description,
      image: payload.image,
      isActive: payload.isActive ?? true,
      sortOrder: payload.sortOrder ?? 0,
      parentId: payload.parentId,
    })
    message.success('دسته‌بندی با موفقیت ایجاد شد')
  }

  open.value = false
  selectedCategory.value = emptyCategory()
}

const getParentName = (parentId: string | null | undefined): string => {
  if (!parentId) return '-'
  const parent = categoryStore.categories.find((c) => c.id === parentId)
  return parent?.name || '-'
}

const columns: TableColumnType<Category>[] = [
  {
    title: 'تصویر',
    dataIndex: 'image',
    width: 80,
    customRender: ({ text }) =>
      text
        ? h(Image, {
            src: `${API_BASE}/${text}`,
            width: 50,
            height: 50,
            style: { objectFit: 'cover', borderRadius: '8px' },
          })
        : h('span', { class: 'text-gray-400' }, '-'),
  },
  {
    title: 'نام',
    dataIndex: 'name',
    customRender: ({ text }) => h(AntTag, { color: 'green' }, () => text),
  },
  {
    title: 'اسلاگ',
    dataIndex: 'slug',
    customRender: ({ text }) => h('code', { class: 'bg-gray-100 px-2 py-1 rounded text-sm' }, text),
  },
  {
    title: 'والد',
    dataIndex: 'parentId',
    customRender: ({ text }) => getParentName(text),
  },
  {
    title: 'ترتیب',
    dataIndex: 'sortOrder',
    width: 80,
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
    customRender: ({ text }) => dayjs(text).format('YYYY/MM/DD'),
  },
  {
    title: 'عملیات',
    key: 'actions',
    width: 120,
    customRender: ({ record }) =>
      h('div', { class: 'flex gap-2' }, [
        h(Button, {
          type: 'primary',
          class: 'flex! items-center justify-center',
          icon: h(EditOutlined),
          onClick: () => {
            selectedCategory.value = { ...record }
            open.value = true
          },
        }),
        h(
          Popconfirm,
          {
            title: 'حذف کردن دسته‌بندی',
            description: `این عمل نمی تواند برگشت داده شود.`,
            okText: 'بله',
            cancelText: 'خیر',
            onConfirm: async () => {
              await categoryStore.deleteCategory(record.id)
              message.success('دسته‌بندی با موفقیت حذف شد')
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
  categoryStore.getCategories()
})
</script>
