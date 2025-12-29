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
} from 'ant-design-vue'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import CategoryForm from './components/CategoryForm.vue'
import type { CreateCategory, Category, UpdateCategory } from '@/models/category.model'
import dayjs from 'dayjs'

const categoryStore = useCategoryStore()
const open = ref(false)

const emptyCategory = (): CreateCategory | UpdateCategory => ({}) as CreateCategory | UpdateCategory

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
    message.loading('دسته‌بندی حال ذخیره کردن تگ')

    await categoryStore.updateCategory({
      id: payload.id,
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
    })
    message.success('دسته‌بندی با موفقیت .ویرایش شد')
  } else {
    await categoryStore.createCategory({
      name: payload.name!,
      slug: payload.slug!,
      description: payload.description,
    })
    message.success('دسته‌بندی با موفقیت .ویرایش شد')

  }

  open.value = false
  selectedCategory.value = emptyCategory()
}

const columns: TableColumnType<Category>[] = [
  { title: 'ID', dataIndex: 'id' },
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
    title: 'توضیحات',
    dataIndex: 'description',
    customRender: ({ text }) => text || h('span', { class: 'text-gray-400' }, '-'),
  },
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
