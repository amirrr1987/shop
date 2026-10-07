<script setup lang="ts">
import { computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Badge,
  Button,
  Input,
  Space,
  Table,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import type { AdminUser } from '@shop/shared'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatDateTime } from '@/utils/date'
import { formatMoney, formatNumber } from '@/utils/format'

const searchQuery = useRouteQuery('q', '')

const columns: TableColumnType<AdminUser>[] = [
  { title: 'نام', dataIndex: 'fullName', key: 'fullName' },
  { title: 'ایمیل', dataIndex: 'email', key: 'email' },
  { title: 'سفارش‌ها', key: 'orders', width: 140 },
  { title: 'جمع خرید', key: 'orderTotal', width: 150 },
  { title: 'تاریخ عضویت', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.customers,
  queryFn: () =>
    api<AdminUser[]>('/users/admin', {
      params: { scope: 'customers' },
    }),
})

const allRows = computed(() => data.value ?? [])
const searchText = computed(() => searchQuery.value.trim().toLowerCase())

const rows = computed(() => {
  if (!searchText.value) return allRows.value
  return allRows.value.filter((user) => {
    const haystack = [user.fullName, user.email, user.id]
      .join(' ')
      .toLowerCase()
    return haystack.includes(searchText.value)
  })
})

const totalCount = computed(() => rows.value.length)

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
      <Space align="center" wrap>
        <TypographyTitle :level="3" style="margin: 0">
          مشتریان
        </TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="9999"
          :show-zero="true"
        />
      </Space>
      <Space wrap>
        <Input.Search
          :value="searchQuery"
          allow-clear
          placeholder="جستجو: نام یا ایمیل…"
          style="width: 240px"
          @update:value="(value) => { searchQuery = value }"
        />
        <Button
          v-if="searchQuery"
          @click="searchQuery = ''"
        >
          پاک کردن
        </Button>
      </Space>
    </div>

    <Table
      row-key="id"
      :loading="isPending"
      :columns="columns"
      :data-source="rows"
      :pagination="{ pageSize: 20 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'orders'">
          {{ formatNumber((record as AdminUser).orderCount) }} سفارش
        </template>
        <template v-else-if="column.key === 'orderTotal'">
          {{ formatMoney((record as AdminUser).orderTotal) }}
        </template>
        <template v-else-if="column.key === 'createdAt'">
          {{ formatDateTime((record as AdminUser).createdAt) }}
        </template>
      </template>
    </Table>
  </div>
</template>
