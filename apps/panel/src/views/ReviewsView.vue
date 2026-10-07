<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Badge,
  Button,
  Form,
  FormItem,
  Image,
  Input,
  Modal,
  Popconfirm,
  Rate,
  Select,
  Space,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import {
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type {
  AdminReview,
  AdminReviewList,
  Product,
  ReviewStatus,
} from '@shop/shared'
import {
  REVIEW_STATUSES,
  REVIEW_STATUS_LABELS_FA,
} from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { formatDateTime } from '@/utils/date'
import { formatNumber } from '@/utils/format'
import { REVIEW_STATUS_COLOR } from '@/utils/status'

const TextArea = Input.TextArea

const ability = useAbility<AppAbility>()
const queryClient = useQueryClient()
const page = useRouteQuery('page', '1')
const ratingFilter = useRouteQuery('rating', '')
const productFilter = useRouteQuery('productId', '')
const statusFilter = useRouteQuery('status', 'pending')
const perPage = 20

const replyOpen = ref(false)
const replyTarget = ref<AdminReview | null>(null)
const replyModel = reactive({ reply: '' })

const currentPage = computed(() => {
  const value = Number(page.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const ratingValue = computed(() => {
  const value = Number(ratingFilter.value)
  return Number.isFinite(value) && value >= 1 && value <= 5 ? value : undefined
})

const statusValue = computed(() => {
  const value = statusFilter.value
  return REVIEW_STATUSES.includes(value as ReviewStatus)
    ? (value as ReviewStatus)
    : undefined
})

const columns: TableColumnType<AdminReview>[] = [
  { title: 'تاریخ', dataIndex: 'createdAt', key: 'createdAt', width: 150 },
  { title: 'محصول', key: 'product', ellipsis: true },
  { title: 'کاربر', key: 'user', ellipsis: true },
  { title: 'امتیاز', key: 'rating', width: 130 },
  { title: 'وضعیت', key: 'status', width: 140 },
  { title: 'نظر', dataIndex: 'comment', key: 'comment', ellipsis: true },
  { title: 'تصاویر', key: 'images', width: 140 },
  { title: 'پاسخ', key: 'reply', width: 120 },
  { title: 'عملیات', key: 'actions', width: 280 },
]

const ratingOptions = [5, 4, 3, 2, 1].map((value) => ({
  label: `${value} ستاره`,
  value: String(value),
}))

const statusOptions = [
  { label: 'همه وضعیت‌ها', value: '' },
  ...REVIEW_STATUSES.map((status) => ({
    label: REVIEW_STATUS_LABELS_FA[status],
    value: status,
  })),
]

const { data, isPending, error } = useQuery({
  queryKey: computed(() =>
    queryKeys.reviews(
      currentPage.value,
      perPage,
      productFilter.value || undefined,
      ratingValue.value,
      statusValue.value,
    ),
  ),
  queryFn: () =>
    api<AdminReviewList>('/reviews/admin', {
      params: {
        page: currentPage.value,
        perPage,
        productId: productFilter.value || undefined,
        rating: ratingValue.value,
        status: statusValue.value,
      },
    }),
})

const { data: productsData } = useQuery({
  queryKey: queryKeys.products(1, 100),
  queryFn: () =>
    api<{ items: Product[]; total: number }>('/products/admin', {
      params: { page: 1, perPage: 100, sort: 'newest' },
    }),
})

const rows = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const productOptions = computed(() =>
  (productsData.value?.items ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  })),
)

async function invalidateReviews() {
  await queryClient.invalidateQueries({ queryKey: ['reviews'] })
}

const {
  mutate: removeReview,
  isPending: isDeleting,
  variables: deletingId,
} = useMutation({
  mutationFn: (id: string) => api(`/reviews/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('نظر حذف شد')
    await invalidateReviews()
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

const {
  mutate: updateStatus,
  isPending: isUpdatingStatus,
  variables: statusVariables,
} = useMutation({
  mutationFn: ({ id, status }: { id: string; status: ReviewStatus }) =>
    api(`/reviews/${id}/status`, {
      method: 'PATCH',
      body: { status },
    }),
  onSuccess: async (_data, vars) => {
    message.success(
      vars.status === 'approved'
        ? 'نظر تایید شد'
        : vars.status === 'rejected'
          ? 'نظر رد شد'
          : 'وضعیت به‌روزرسانی شد',
    )
    await invalidateReviews()
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'به‌روزرسانی ناموفق بود')
  },
})

const replySaving = ref(false)

function openReply(row: AdminReview) {
  replyTarget.value = row
  replyModel.reply = row.reply ?? ''
  replyOpen.value = true
}

async function saveReply() {
  if (!replyTarget.value) return
  replySaving.value = true
  try {
    const text = replyModel.reply.trim()
    await api(`/reviews/${replyTarget.value.id}/reply`, {
      method: 'PATCH',
      body: { reply: text.length ? text : null },
    })
    message.success(text.length ? 'پاسخ ذخیره شد' : 'پاسخ حذف شد')
    replyOpen.value = false
    await invalidateReviews()
  } catch (err) {
    message.error(err instanceof ApiError ? err.message : 'ذخیره پاسخ ناموفق بود')
  } finally {
    replySaving.value = false
  }
}

function onPageChange(next: number) {
  page.value = String(next)
}

function onRatingChange(value: string | undefined) {
  ratingFilter.value = value ?? ''
  page.value = '1'
}

function onProductChange(value: string | undefined) {
  productFilter.value = value ?? ''
  page.value = '1'
}

function onStatusFilterChange(value: string | undefined) {
  statusFilter.value = value ?? ''
  page.value = '1'
}

function ratingColor(rating: number) {
  if (rating >= 4) return 'success'
  if (rating === 3) return 'warning'
  return 'error'
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
      <Space align="center">
        <TypographyTitle :level="3" style="margin: 0">نظرات</TypographyTitle>
        <Badge
          :count="total"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="9999"
          :show-zero="true"
        />
      </Space>
      <Space wrap>
        <Select
          :value="statusFilter"
          allow-clear
          placeholder="فیلتر وضعیت"
          style="width: 170px"
          :options="statusOptions"
          @change="(value) => onStatusFilterChange(value as string | undefined)"
        />
        <Select
          :value="productFilter || undefined"
          allow-clear
          placeholder="فیلتر محصول"
          style="width: 220px"
          :options="productOptions"
          @change="(value) => onProductChange(value as string | undefined)"
        />
        <Select
          :value="ratingFilter || undefined"
          allow-clear
          placeholder="فیلتر امتیاز"
          style="width: 150px"
          :options="ratingOptions"
          @change="(value) => onRatingChange(value as string | undefined)"
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
        pageSize: perPage,
        total,
        onChange: onPageChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'createdAt'">
          {{ formatDateTime(record.createdAt) }}
        </template>
        <template v-else-if="column.key === 'product'">
          <div>
            <div>{{ record.productName || 'محصول حذف‌شده' }}</div>
            <Tag v-if="record.productSlug" color="processing">
              {{ record.productSlug }}
            </Tag>
          </div>
        </template>
        <template v-else-if="column.key === 'user'">
          <div>
            <div>{{ record.userFullName }}</div>
            <div style="color: rgba(0,0,0,0.45); font-size: 12px">
              {{ record.userEmail || record.userId }}
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'rating'">
          <Space>
            <Rate :value="record.rating" disabled />
            <Tag :color="ratingColor(record.rating)">
              <StarFilled />
              {{ formatNumber(record.rating) }}
            </Tag>
          </Space>
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :color="REVIEW_STATUS_COLOR[record.status]">
            {{ REVIEW_STATUS_LABELS_FA[record.status] }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'images'">
          <Image.PreviewGroup v-if="record.images?.length">
            <Space :size="4">
              <Image
                v-for="(src, index) in record.images"
                :key="`${record.id}-${index}`"
                :src="src"
                :width="36"
                :height="36"
                style="object-fit: cover; border-radius: 4px"
              />
            </Space>
          </Image.PreviewGroup>
          <span v-else style="color: rgba(0,0,0,0.45)">—</span>
        </template>
        <template v-else-if="column.key === 'reply'">
          <Tag v-if="record.reply" color="purple">
            <CommentOutlined />
            دارد
          </Tag>
          <Tag v-else>بدون پاسخ</Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space wrap>
            <Button
              v-if="ability.can('update', 'Review') && record.status !== 'approved'"
              type="link"
              :loading="isUpdatingStatus && statusVariables?.id === record.id && statusVariables.status === 'approved'"
              @click="updateStatus({ id: record.id, status: 'approved' })"
            >
              <template #icon>
                <CheckOutlined />
              </template>
              تایید
            </Button>
            <Button
              v-if="ability.can('update', 'Review') && record.status !== 'rejected'"
              type="link"
              danger
              :loading="isUpdatingStatus && statusVariables?.id === record.id && statusVariables.status === 'rejected'"
              @click="updateStatus({ id: record.id, status: 'rejected' })"
            >
              <template #icon>
                <CloseOutlined />
              </template>
              رد
            </Button>
            <Button
              v-if="ability.can('update', 'Review')"
              type="link"
              @click="openReply(record)"
            >
              <template #icon>
                <CommentOutlined />
              </template>
              پاسخ
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Review')"
              title="این نظر حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="removeReview(record.id)"
            >
              <Button
                type="link"
                danger
                :loading="isDeleting && deletingId === record.id"
              >
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

    <Modal
      v-model:open="replyOpen"
      title="پاسخ فروشگاه"
      :confirm-loading="replySaving"
      ok-text="ذخیره"
      cancel-text="انصراف"
      destroy-on-close
      @ok="saveReply"
    >
      <p
        v-if="replyTarget"
        style="color: rgba(0,0,0,0.45); margin-bottom: 12px"
      >
        {{ replyTarget.comment }}
      </p>
      <Form layout="vertical">
        <FormItem label="پاسخ" extra="خالی بگذارید تا پاسخ حذف شود">
          <TextArea v-model:value="replyModel.reply" :rows="4" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
