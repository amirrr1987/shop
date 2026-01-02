<template>
  <Card title="مشتریان">
    <Table
      :columns="columns"
      :dataSource="customerStore.customers"
      :row-key="(record) => record.id"
      :scroll="{ x: 1200 }"
    />
  </Card>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer.store'
import {
  Card,
  Table,
  Button,
  type TableColumnType,
  Popconfirm,
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
import type { Customer } from '@/models/customer.model'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const customerStore = useCustomerStore()
const router = useRouter()

const columns: TableColumnType<Customer>[] = [
  {
    title: 'نام',
    dataIndex: 'name',
  },
  {
    title: 'ایمیل',
    dataIndex: 'email',
  },
  {
    title: 'شماره تلفن',
    dataIndex: 'phone',
  },
  {
    title: 'آدرس',
    dataIndex: 'address',
  },
  {
    title: 'وضعیت',
    dataIndex: 'isActive',
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
    customRender: ({ record }) =>
      h('div', { class: 'flex gap-2' }, [
        h(Button, {
          type: 'primary',
          class: 'flex! items-center justify-center',
          icon: h(EditOutlined),
          onClick: () => {
            router.push({ name: 'TheCustomerEdit', params: { id: record.id } })
          },
        }),
        h(
          Popconfirm,
          {
            title: 'حذف کردن مشتری',
            description: `این عمل نمی تواند برگشت داده شود.`,
            okText: 'بله',
            cancelText: 'خیر',
            onConfirm: async () => {
              await customerStore.deleteCustomer(record.id)
              message.success('مشتری با موفقیت حذف شد')
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
  customerStore.getCustomers()
})
</script>
