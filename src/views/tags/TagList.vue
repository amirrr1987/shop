<template>
  <Card title="تگ‌ها">
    <template #extra>
      <Button type="primary" @click="openCreate" :icon="h(PlusOutlined)">افزودن تگ</Button>
    </template>

    <TagForm
      v-model:open="open"
      v-model:selected-tag="selectedTag"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

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
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import TagForm from './components/TagForm.vue'
import type { CreateTag, Tag, UpdateTag } from '@/models/tag.model'
import dayjs from 'dayjs'

const tagStore = useTagStore()
const open = ref(false)

const emptyTag = (): CreateTag | UpdateTag => ({}) as CreateTag | UpdateTag

const selectedTag = ref<CreateTag | UpdateTag>(emptyTag())

const openCreate = () => {
  selectedTag.value = emptyTag()
  open.value = true
}

const handleCancel = () => {
  open.value = false
  selectedTag.value = emptyTag()
}

const handleSubmit = async () => {
  const payload = selectedTag.value
  if ('id' in payload && payload.id) {
    await tagStore.updateTag({
      id: payload.id,
      title: payload.title,
      slug: payload.slug,
      description: payload.description,
    })
  } else {
    await tagStore.createTag({
      title: payload.title!,
      slug: payload.slug!,
      description: payload.description,
    })
  }

  open.value = false
  selectedTag.value = emptyTag()
}

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
            selectedTag.value = { ...record }
            open.value = true
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
