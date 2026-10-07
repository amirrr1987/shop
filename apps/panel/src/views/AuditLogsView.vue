<script setup lang="ts">
import { computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Select,
  Space,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import type { AuditLog, AuditLogList } from '@shop/shared'
import {
  AUDIT_ACTION_LABELS_FA,
  AUDIT_ACTIONS,
} from '@shop/shared'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatDateTime } from '@/utils/date'

const pageQuery = useRouteQuery('page', '1')
const actionFilter = useRouteQuery('action', '')
const currentPage = computed(() => {
  const value = Number(pageQuery.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const actionOptions = [
  { label: 'همه اقدام‌ها', value: '' },
  ...AUDIT_ACTIONS.map((action) => ({
    label: AUDIT_ACTION_LABELS_FA[action],
    value: action,
  })),
]

const columns: TableColumnType<AuditLog>[] = [
  { title: 'زمان', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  { title: 'اقدام', key: 'action', width: 180 },
  { title: 'عامل', key: 'actor', ellipsis: true },
  { title: 'موجودیت', key: 'entity', width: 200 },
  { title: 'جزئیات', key: 'meta', ellipsis: true },
]

const { data, isPending, error } = useQuery({
  queryKey: computed(() =>
    queryKeys.auditLogs(currentPage.value, actionFilter.value || undefined),
  ),
  queryFn: () =>
    api<AuditLogList>('/audit-logs/admin', {
      params: {
        page: currentPage.value,
        perPage: 20,
        ...(actionFilter.value ? { action: actionFilter.value } : {}),
      },
    }),
})

const rows = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

function actionLabel(action: string) {
  return (
    AUDIT_ACTION_LABELS_FA[action as keyof typeof AUDIT_ACTION_LABELS_FA] ||
    action
  )
}

function metaText(meta: AuditLog['meta']) {
  if (!meta) return '—'
  try {
    return JSON.stringify(meta)
  } catch {
    return '—'
  }
}

function onActionFilterChange(value: unknown) {
  actionFilter.value = value ? String(value) : ''
  pageQuery.value = '1'
}

function onPageChange(next: number) {
  pageQuery.value = String(next)
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
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; gap: 12px; flex-wrap: wrap">
      <TypographyTitle :level="3" style="margin: 0">
        گزارش فعالیت
      </TypographyTitle>
      <Space>
        <Select
          :value="actionFilter"
          :options="actionOptions"
          style="width: 220px"
          @change="onActionFilterChange"
        />
      </Space>
    </div>

    <Table
      row-key="id"
      :loading="isPending"
      :columns="columns"
      :data-source="rows"
      :pagination="{
        current: currentPage,
        pageSize: 20,
        total,
        onChange: onPageChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'createdAt'">
          {{ formatDateTime(record.createdAt) }}
        </template>
        <template v-else-if="column.key === 'action'">
          <Tag color="processing">
            {{ actionLabel(record.action) }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actor'">
          {{ record.actorEmail || record.actorUserId || '—' }}
        </template>
        <template v-else-if="column.key === 'entity'">
          <span>{{ record.entityType }}</span>
          <span v-if="record.entityId" style="color: rgba(0,0,0,0.45)">
            · {{ record.entityId.slice(0, 8) }}
          </span>
        </template>
        <template v-else-if="column.key === 'meta'">
          <code style="font-size: 12px">{{ metaText(record.meta) }}</code>
        </template>
      </template>
    </Table>
  </div>
</template>
