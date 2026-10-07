<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Badge,
  Button,
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
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type {
  MagazineAdminList,
  MagazinePost,
  MagazinePostStatus,
} from '@shop/shared'
import {
  MAGAZINE_POST_STATUSES,
  MAGAZINE_POST_STATUS_LABELS_FA,
} from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatDateTime } from '@/utils/date'

const ability = useAbility<AppAbility>()
const router = useRouter()
const queryClient = useQueryClient()
const page = useRouteQuery('page', '1')
const statusFilter = useRouteQuery('status', '')
const perPage = 20

const currentPage = computed(() => {
  const value = Number(page.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const statusValue = computed(() => {
  const value = statusFilter.value
  return MAGAZINE_POST_STATUSES.includes(value as MagazinePostStatus)
    ? (value as MagazinePostStatus)
    : undefined
})

const statusOptions = [
  { label: 'همه', value: '' },
  ...MAGAZINE_POST_STATUSES.map((status) => ({
    label: MAGAZINE_POST_STATUS_LABELS_FA[status],
    value: status,
  })),
]

const columns: TableColumnType<MagazinePost>[] = [
  { title: 'عنوان', dataIndex: 'title', key: 'title', ellipsis: true },
  { title: 'اسلاگ', dataIndex: 'slug', key: 'slug', width: 160 },
  { title: 'وضعیت', key: 'status', width: 120 },
  { title: 'انتشار', dataIndex: 'publishedAt', key: 'publishedAt', width: 160 },
  { title: 'به‌روزرسانی', dataIndex: 'updatedAt', key: 'updatedAt', width: 160 },
  { title: 'عملیات', key: 'actions', width: 200 },
]

const { data, isPending, error } = useQuery({
  queryKey: computed(() =>
    queryKeys.magazine(currentPage.value, perPage, statusValue.value),
  ),
  queryFn: () =>
    api<MagazineAdminList>('/magazine/admin/posts', {
      params: {
        page: currentPage.value,
        perPage,
        status: statusValue.value,
      },
    }),
})

const rows = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/magazine/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('مطلب حذف شد')
    await queryClient.invalidateQueries({ queryKey: ['magazine'] })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function goCreate() {
  void router.push({ name: 'magazine-create' })
}

function goEdit(row: MagazinePost) {
  void router.push({ name: 'magazine-edit', params: { id: row.id } })
}

function onPageChange(next: number) {
  page.value = String(next)
}

function onStatusFilter(value: unknown) {
  statusFilter.value = String(value ?? '')
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
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
      <Space align="center" wrap>
        <TypographyTitle :level="3" style="margin: 0">مجله</TypographyTitle>
        <Badge
          :count="total"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="9999"
          :show-zero="true"
        />
        <Select
          :value="statusFilter"
          :options="statusOptions"
          style="width: 160px"
          @change="onStatusFilter"
        />
      </Space>
      <Button
        v-if="ability.can('create', 'Magazine')"
        type="primary"
        @click="goCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        مطلب جدید
      </Button>
    </div>

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
        <template v-if="column.key === 'slug'">
          <Tag>{{ (record as MagazinePost).slug }}</Tag>
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag>
            {{
              MAGAZINE_POST_STATUS_LABELS_FA[
                (record as MagazinePost).status
              ]
            }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'publishedAt'">
          {{
            (record as MagazinePost).publishedAt
              ? formatDateTime((record as MagazinePost).publishedAt!)
              : '—'
          }}
        </template>
        <template v-else-if="column.key === 'updatedAt'">
          {{ formatDateTime((record as MagazinePost).updatedAt) }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Magazine')"
              type="link"
              @click="goEdit(record as MagazinePost)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Magazine')"
              title="این مطلب حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="deleteMutation.mutate((record as MagazinePost).id)"
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
  </div>
</template>
