<template>
  <Card title="منوها">
    <template #extra>
      <Button type="primary" @click="openCreate" :icon="h(PlusOutlined)">افزودن منو</Button>
    </template>

    <MenuForm
      v-model:open="open"
      v-model:selected-menu="selectedMenu"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <Table
      :columns="columns"
      :dataSource="menuStore.menus"
      :loading="menuStore.loading"
      :row-key="(record) => record.id"
    />
  </Card>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu.store'
import {
  Card,
  Table,
  Button,
  type TableColumnType,
  Popconfirm,
  Tag as AntTag,
  message,
} from 'ant-design-vue'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons-vue'
import { h, onMounted, ref } from 'vue'
import MenuForm from './components/MenuForm.vue'
import type { CreateMenu, Menu, UpdateMenu } from '@/models/menu.model'

const menuStore = useMenuStore()
const open = ref(false)

const emptyMenu = (): CreateMenu | UpdateMenu =>
  ({
    title: '',
    location: 'header',
    link: null,
    linkType: 'internal',
    icon: null,
    image: null,
    sortOrder: 0,
    isActive: true,
    openInNewTab: false,
    parentId: null,
  }) as CreateMenu | UpdateMenu

const selectedMenu = ref<CreateMenu | UpdateMenu>(emptyMenu())

const openCreate = () => {
  selectedMenu.value = emptyMenu()
  open.value = true
}

const handleCancel = () => {
  open.value = false
  selectedMenu.value = emptyMenu()
}

const handleSubmit = async () => {
  const payload = selectedMenu.value

  if ('id' in payload && payload.id) {
    await menuStore.updateMenu(payload as UpdateMenu)
    message.success('منو با موفقیت ویرایش شد')
  } else {
    await menuStore.createMenu(payload as CreateMenu)
    message.success('منو با موفقیت ایجاد شد')
  }

  open.value = false
  selectedMenu.value = emptyMenu()
}

const getParentName = (parentId: string | null | undefined): string => {
  if (!parentId) return '-'
  const parent = menuStore.menus.find((m) => m.id === parentId)
  return parent?.title || '-'
}

const locationLabels: Record<string, string> = {
  header: 'هدر',
  footer: 'فوتر',
  mobile: 'موبایل',
  sidebar: 'سایدبار',
}

const columns: TableColumnType<Menu>[] = [
  {
    title: 'عنوان',
    dataIndex: 'title',
  },
  {
    title: 'موقعیت',
    dataIndex: 'location',
    customRender: ({ text }) => h(AntTag, { color: 'blue' }, () => locationLabels[text] || text),
  },
  {
    title: 'لینک',
    dataIndex: 'link',
    customRender: ({ text }) =>
      text ? h('code', { class: 'bg-gray-100 px-2 py-1 rounded text-xs' }, text) : '-',
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
            selectedMenu.value = { ...record }
            open.value = true
          },
        }),
        h(
          Popconfirm,
          {
            title: 'حذف کردن منو',
            description: `این عمل نمی تواند برگشت داده شود.`,
            okText: 'بله',
            cancelText: 'خیر',
            onConfirm: async () => {
              await menuStore.deleteMenu(record.id)
              message.success('منو با موفقیت حذف شد')
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
  menuStore.getMenus()
})
</script>

