<script setup lang="ts">
import { computed } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Button,
  Popconfirm,
  Space,
  Table,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type { NewsletterList, NewsletterSubscriber } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatDateTime } from '@/utils/date'

const ability = useAbility<AppAbility>()
const queryClient = useQueryClient()
const page = useRouteQuery('page', '1')
const perPage = 20

const currentPage = computed(() => {
  const value = Number(page.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

function onPageChange(next: number) {
  page.value = String(next)
}

const columns: TableColumnType<NewsletterSubscriber>[] = [
  { title: 'تاریخ', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  { title: 'ایمیل', dataIndex: 'email', key: 'email' },
  { title: 'عملیات', key: 'actions', width: 120 },
]

const { data, isPending, error } = useQuery({
  queryKey: computed(() =>
    queryKeys.newsletterSubscribers(currentPage.value, perPage),
  ),
  queryFn: () =>
    api<NewsletterList>('/newsletter/admin', {
      params: {
        page: currentPage.value,
        perPage,
      },
    }),
})

const rows = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/newsletter/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('حذف شد')
    await queryClient.invalidateQueries({
      queryKey: ['newsletter-subscribers'],
    })
  },
  onError: () => message.error('حذف ممکن نشد'),
})
</script>

<template>
  <div>
    <Space style="margin-bottom: 16px">
      <TypographyTitle :level="3" style="margin: 0">
        خبرنامه
      </TypographyTitle>
    </Space>

    <p v-if="error" style="color: #ff4d4f">
      دریافت لیست ممکن نشد
    </p>

    <Table
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :loading="isPending"
      :pagination="{
        current: currentPage,
        pageSize: perPage,
        total,
        showSizeChanger: false,
        onChange: onPageChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'createdAt'">
          {{ formatDateTime((record as NewsletterSubscriber).createdAt) }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <Popconfirm
            v-if="ability.can('delete', 'Newsletter')"
            title="این مشترک حذف شود؟"
            ok-text="حذف"
            cancel-text="انصراف"
            @confirm="deleteMutation.mutate((record as NewsletterSubscriber).id)"
          >
            <Button type="link" danger>
              <template #icon>
                <DeleteOutlined />
              </template>
              حذف
            </Button>
          </Popconfirm>
        </template>
      </template>
    </Table>
  </div>
</template>
