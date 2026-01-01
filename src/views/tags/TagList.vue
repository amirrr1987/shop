<template>
  <Card title="تگ‌ها">
    <Table
      :columns="columns"
      :dataSource="tagStore.tags"
      :loading="tagStore.loading"
      :row-key="(record) => record.id"
    />
  </Card>
</template>

<script setup lang="ts">
import { useTagStore } from '@/stores/tag.store'
import {
  Card,
  Table,
  Button,
  type TableColumnType,
  Popconfirm,
  Tag as AntTag,
} from 'ant-design-vue'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import { h, onMounted } from 'vue'
import type { Tag } from '@/models/tag.model'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const tagStore = useTagStore()
const router = useRouter()

const columns: TableColumnType<Tag>[] = [
  { title: 'ID', dataIndex: 'id' },
  {
    title: 'عنوان',
    dataIndex: 'title',
    customRender: ({ text }) => h(AntTag, { color: 'blue' }, () => text),
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
            router.push({ name: 'TheTagEdit', params: { id: record.id } })
          },
        }),
        h(
          Popconfirm,
          {
            title: 'حذف کردن تگ',
            description: `این عمل نمی تواند برگشت داده شود.`,
            okText: 'بله',
            cancelText: 'خیر',
            onConfirm: async () => {
              await tagStore.deleteTag(record.id)
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
  tagStore.getTags()
})
</script>
