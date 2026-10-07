<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Badge,
  Button,
  Descriptions,
  DescriptionsItem,
  Drawer,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import {
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type { ContactList, ContactMessage, ContactStatus } from '@shop/shared'
import {
  CONTACT_STATUSES,
  CONTACT_STATUS_LABELS_FA,
} from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatDateTime } from '@/utils/date'
import { CONTACT_STATUS_COLOR } from '@/utils/status'

const ability = useAbility<AppAbility>()
const queryClient = useQueryClient()
const page = useRouteQuery('page', '1')
const statusFilter = useRouteQuery('status', 'new')
const perPage = 20
const viewing = ref<ContactMessage | null>(null)

const currentPage = computed(() => {
  const value = Number(page.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const statusValue = computed(() => {
  const value = statusFilter.value
  return CONTACT_STATUSES.includes(value as ContactStatus)
    ? (value as ContactStatus)
    : undefined
})

const statusOptions = [
  { label: 'همه', value: '' },
  ...CONTACT_STATUSES.map((status) => ({
    label: CONTACT_STATUS_LABELS_FA[status],
    value: status,
  })),
]

const columns: TableColumnType<ContactMessage>[] = [
  { title: 'تاریخ', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
  { title: 'نام', dataIndex: 'name', key: 'name', width: 140 },
  { title: 'ایمیل', dataIndex: 'email', key: 'email', ellipsis: true },
  { title: 'موضوع', dataIndex: 'subject', key: 'subject', ellipsis: true },
  { title: 'وضعیت', key: 'status', width: 120 },
  { title: 'عملیات', key: 'actions', width: 220 },
]

const { data, isPending, error } = useQuery({
  queryKey: computed(() =>
    queryKeys.contactMessages(currentPage.value, perPage, statusValue.value),
  ),
  queryFn: () =>
    api<ContactList>('/contact/admin', {
      params: {
        page: currentPage.value,
        perPage,
        status: statusValue.value,
      },
    }),
})

const rows = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const statusMutation = useMutation({
  mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
    api<ContactMessage>(`/contact/${id}/status`, {
      method: 'PATCH',
      body: { status },
    }),
  onSuccess: async (row) => {
    message.success('وضعیت به‌روزرسانی شد')
    if (viewing.value?.id === row.id) {
      viewing.value = row
    }
    await queryClient.invalidateQueries({ queryKey: ['contact-messages'] })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'به‌روزرسانی ناموفق بود')
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/contact/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('پیام حذف شد')
    viewing.value = null
    await queryClient.invalidateQueries({ queryKey: ['contact-messages'] })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

async function openView(row: ContactMessage) {
  viewing.value = row
  if (row.status === 'new' && ability.can('update', 'Contact')) {
    statusMutation.mutate({ id: row.id, status: 'read' })
  }
}

function onPageChange(next: number) {
  page.value = String(next)
}

function onStatusFilterChange(value: unknown) {
  statusFilter.value = value ? String(value) : ''
  page.value = '1'
}

watch(error, (value) => {
  if (value) {
    message.error(
      value instanceof ApiError ? value.message : 'بارگذاری ناموفق بود',
    )
  }
})
</script>

<template>
  <div>
    <Space style="margin-bottom: 16px; width: 100%; justify-content: space-between">
      <Space>
        <TypographyTitle :level="3" style="margin: 0">
          پیام‌های تماس
        </TypographyTitle>
        <Badge :count="total" :overflow-count="999" />
      </Space>
      <Select
        :value="statusFilter"
        :options="statusOptions"
        style="width: 180px"
        @change="onStatusFilterChange"
      />
    </Space>

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
        <template v-if="column.key === 'createdAt'">
          {{ formatDateTime((record as ContactMessage).createdAt) }}
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :color="CONTACT_STATUS_COLOR[(record as ContactMessage).status]">
            {{ CONTACT_STATUS_LABELS_FA[(record as ContactMessage).status] }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button type="link" @click="openView(record as ContactMessage)">
              <template #icon>
                <EyeOutlined />
              </template>
              مشاهده
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Contact')"
              title="این پیام حذف شود؟"
              ok-text="حذف"
              cancel-text="انصراف"
              @confirm="deleteMutation.mutate((record as ContactMessage).id)"
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

    <Drawer
      :open="!!viewing"
      title="جزئیات پیام"
      placement="left"
      width="420"
      destroy-on-close
      @close="viewing = null"
    >
      <template v-if="viewing">
        <Space style="margin-bottom: 16px" wrap>
          <Tag :color="CONTACT_STATUS_COLOR[viewing.status]">
            <MailOutlined />
            {{ CONTACT_STATUS_LABELS_FA[viewing.status] }}
          </Tag>
          <Select
            v-if="ability.can('update', 'Contact')"
            :value="viewing.status"
            :options="CONTACT_STATUSES.map((status) => ({
              label: CONTACT_STATUS_LABELS_FA[status],
              value: status,
            }))"
            style="width: 160px"
            @change="(value) => statusMutation.mutate({
              id: viewing.id,
              status: value as ContactStatus,
            })"
          />
        </Space>

        <Descriptions :column="1" size="small" bordered>
          <DescriptionsItem label="تاریخ">
            {{ formatDateTime(viewing.createdAt) }}
          </DescriptionsItem>
          <DescriptionsItem label="نام">
            {{ viewing.name }}
          </DescriptionsItem>
          <DescriptionsItem label="ایمیل">
            <a :href="`mailto:${viewing.email}`">{{ viewing.email }}</a>
          </DescriptionsItem>
          <DescriptionsItem label="تلفن">
            {{ viewing.phone || '—' }}
          </DescriptionsItem>
          <DescriptionsItem label="موضوع">
            {{ viewing.subject }}
          </DescriptionsItem>
          <DescriptionsItem label="پیام">
            <div style="white-space: pre-wrap">{{ viewing.message }}</div>
          </DescriptionsItem>
        </Descriptions>
      </template>
    </Drawer>
  </div>
</template>
