<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouteQuery } from '@vueuse/router'
import {
  Badge,
  Button,
  Descriptions,
  DescriptionsItem,
  Drawer,
  Input,
  Select,
  Space,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import {
  DownloadOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  PrinterOutlined,
  ShoppingOutlined,
} from '@ant-design/icons-vue'
import type {
  AdminOrder,
  OrderStatus,
  PaymentStatus,
  RefundPaymentResult,
} from '@shop/shared'
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS_FA,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABELS_FA,
} from '@shop/shared'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { formatDateTime } from '@/utils/date'
import { formatMoney, formatNumber } from '@/utils/format'
import {
  ORDER_STATUS_COLOR,
  PAYMENT_STATUS_COLOR,
} from '@/utils/status'
import {
  ORDER_STATUS_ICON,
  PAYMENT_STATUS_ICON,
} from '@/utils/status-icons'

const queryClient = useQueryClient()
const auth = useAuthStore()
const settings = useSettingsStore()
const viewing = ref<AdminOrder | null>(null)
const adminNoteDraft = ref('')
const statusFilter = useRouteQuery('status', '')
const paymentFilter = useRouteQuery('payment', '')
const searchQuery = useRouteQuery('q', '')
const tablePage = useRouteQuery('page', '1')

const statusOptions = ORDER_STATUSES.map((status) => ({
  value: status,
  label: () =>
    h(
      'span',
      { style: { display: 'inline-flex', alignItems: 'center', gap: '6px' } },
      [h(ORDER_STATUS_ICON[status]), ORDER_STATUS_LABELS_FA[status]],
    ),
}))

const statusFilterOptions = [
  { label: 'همه وضعیت‌ها', value: '' },
  ...ORDER_STATUSES.map((status) => ({
    label: ORDER_STATUS_LABELS_FA[status],
    value: status,
  })),
]

const paymentFilterOptions = [
  { label: 'همه پرداخت‌ها', value: '' },
  ...PAYMENT_STATUSES.map((status) => ({
    label: PAYMENT_STATUS_LABELS_FA[status],
    value: status,
  })),
]

const columns: TableColumnType<AdminOrder>[] = [
  { title: 'تاریخ ثبت', dataIndex: 'createdAt', key: 'createdAt', width: 170 },
  { title: 'مشتری', key: 'customer', ellipsis: true },
  { title: 'جمع', key: 'total', width: 160 },
  { title: 'پرداخت', dataIndex: 'paymentStatus', key: 'paymentStatus', width: 130 },
  { title: 'وضعیت', key: 'status', width: 220 },
  { title: 'اقلام', key: 'items', ellipsis: true },
  { title: 'شهر', key: 'city', width: 120 },
  { title: 'عملیات', key: 'actions', width: 90 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.orders,
  queryFn: () => api<AdminOrder[]>('/orders/admin'),
})

const allRows = computed(() => data.value ?? [])

const statusFilterValue = computed(() => {
  const value = statusFilter.value
  return ORDER_STATUSES.includes(value as OrderStatus)
    ? (value as OrderStatus)
    : undefined
})

const paymentFilterValue = computed(() => {
  const value = paymentFilter.value
  return PAYMENT_STATUSES.includes(value as PaymentStatus)
    ? (value as PaymentStatus)
    : undefined
})

const searchText = computed(() => searchQuery.value.trim().toLowerCase())

const rows = computed(() => {
  return allRows.value.filter((order) => {
    if (statusFilterValue.value && order.status !== statusFilterValue.value) {
      return false
    }
    if (
      paymentFilterValue.value &&
      order.paymentStatus !== paymentFilterValue.value
    ) {
      return false
    }
    if (!searchText.value) {
      return true
    }
    const haystack = [
      order.id,
      order.userFullName,
      order.userEmail,
      order.userId,
      order.couponCode,
      order.shippingMethodName,
      order.note,
      order.paymentRefId,
      order.address.city,
      order.address.province,
      order.address.fullName,
      order.address.phone,
      ...order.items.map((item) => item.name),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(searchText.value)
  })
})

const totalCount = computed(() => rows.value.length)
const currentPage = computed(() => {
  const value = Number(tablePage.value)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const hasActiveFilters = computed(
  () =>
    Boolean(
      statusFilterValue.value ||
        paymentFilterValue.value ||
        searchText.value,
    ),
)

function onStatusFilterChange(value: unknown) {
  statusFilter.value = value ? String(value) : ''
  tablePage.value = '1'
}

function onPaymentFilterChange(value: unknown) {
  paymentFilter.value = value ? String(value) : ''
  tablePage.value = '1'
}

function onSearchChange(value: string) {
  searchQuery.value = value
  tablePage.value = '1'
}

function clearFilters() {
  statusFilter.value = ''
  paymentFilter.value = ''
  searchQuery.value = ''
  tablePage.value = '1'
}

function onPageChange(next: number) {
  tablePage.value = String(next)
}

const {
  mutate: updateStatus,
  isPending: isUpdatingStatus,
  variables: statusVariables,
} = useMutation({
  mutationFn: ({
    id,
    status,
    trackingCode,
    adminNote,
  }: {
    id: string
    status: OrderStatus
    trackingCode?: string | null
    adminNote?: string | null
  }) =>
    api<AdminOrder>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: { status, trackingCode, adminNote },
    }),
  onSuccess: (order) => {
    message.success('وضعیت به‌روزرسانی شد')
    if (viewing.value?.id === order.id) {
      viewing.value = order
      adminNoteDraft.value = order.adminNote ?? ''
    }
    void queryClient.invalidateQueries({ queryKey: queryKeys.orders })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'به‌روزرسانی ناموفق بود')
  },
})

function paymentLabel(status: PaymentStatus) {
  return PAYMENT_STATUS_LABELS_FA[status] ?? status
}

function itemCount(order: AdminOrder) {
  return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

function onStatusChange(order: AdminOrder, status: OrderStatus) {
  if (status === order.status) return
  let trackingCode: string | null | undefined
  if (status === 'shipped') {
    const entered = window.prompt('کد رهگیری ارسال (اختیاری):', order.trackingCode ?? '')
    if (entered === null) return
    trackingCode = entered.trim() || null
  }
  updateStatus({ id: order.id, status, trackingCode })
}

function openView(order: AdminOrder) {
  viewing.value = order
  adminNoteDraft.value = order.adminNote ?? ''
}

function saveAdminNote() {
  if (!viewing.value) return
  updateStatus({
    id: viewing.value.id,
    status: viewing.value.status,
    adminNote: adminNoteDraft.value.trim() || null,
  })
}

const {
  mutate: refundOrder,
  isPending: isRefunding,
} = useMutation({
  mutationFn: ({
    id,
    amount,
    reason,
  }: {
    id: string
    amount?: number
    reason?: string
  }) =>
    api<RefundPaymentResult>(`/payments/orders/${id}/refund`, {
      method: 'POST',
      body: { amount, reason },
    }),
  onSuccess: (result) => {
    message.success(result.message)
    if (viewing.value) {
      viewing.value = {
        ...viewing.value,
        ...result.order,
      }
    }
    void queryClient.invalidateQueries({ queryKey: queryKeys.orders })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'استرداد ناموفق بود')
  },
})

function refundableRemaining(order: AdminOrder) {
  return Math.max(0, order.total - (order.refundedAmount ?? 0))
}

function canRefund(order: AdminOrder) {
  return (
    auth.isAdmin &&
    (order.paymentStatus === 'paid' || order.paymentStatus === 'refunded') &&
    refundableRemaining(order) > 0
  )
}

function onRefund(order: AdminOrder) {
  const remaining = refundableRemaining(order)
  const entered = window.prompt(
    `مبلغ استرداد به ریال (خالی = کامل، حداکثر ${remaining}):`,
    String(remaining),
  )
  if (entered === null) return
  const trimmed = entered.trim()
  const amount = trimmed ? Number(trimmed) : undefined
  if (trimmed && (!Number.isFinite(amount) || (amount ?? 0) < 1)) {
    message.error('مبلغ نامعتبر است')
    return
  }
  const reason =
    window.prompt('دلیل استرداد (اختیاری):', '')?.trim() || undefined
  refundOrder({ id: order.id, amount, reason })
}

function csvEscape(value: string | number | null | undefined) {
  const raw = value == null ? '' : String(value)
  if (/[",\n\r]/.test(raw)) {
    return `"${raw.replaceAll('"', '""')}"`
  }
  return raw
}

function exportCsv() {
  const header = [
    'id',
    'createdAt',
    'customer',
    'email',
    'status',
    'paymentStatus',
    'subtotal',
    'discount',
    'shippingCost',
    'taxAmount',
    'total',
    'coupon',
    'city',
    'phone',
    'trackingCode',
    'adminNote',
  ]
  const lines = [
    header.join(','),
    ...rows.value.map((order) =>
      [
        order.id,
        order.createdAt,
        order.userFullName,
        order.userEmail,
        order.status,
        order.paymentStatus,
        order.subtotal,
        order.discount,
        order.shippingCost,
        order.taxAmount,
        order.total,
        order.couponCode,
        order.address.city,
        order.address.phone,
        order.trackingCode,
        order.adminNote,
      ]
        .map(csvEscape)
        .join(','),
    ),
  ]
  const blob = new Blob(['\uFEFF' + lines.join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
  message.success(`${rows.value.length} سفارش خروجی گرفته شد`)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function printInvoice(order: AdminOrder) {
  const win = window.open('', '_blank', 'noopener,noreferrer,width=800,height=900')
  if (!win) {
    message.warning('پنجره چاپ مسدود شد')
    return
  }

  const sellerTitle = settings.legalName || settings.shopName || 'فروشگاه'
  const legalLines = [
    settings.nationalId ? `شناسه ملی: ${settings.nationalId}` : '',
    settings.economicCode ? `کد اقتصادی: ${settings.economicCode}` : '',
    settings.registrationNumber
      ? `شماره ثبت: ${settings.registrationNumber}`
      : '',
    settings.legalAddress || '',
  ]
    .filter(Boolean)
    .map((line) => `<p class="muted">${escapeHtml(line)}</p>`)
    .join('')

  const rows = order.items
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.name)}${
          item.variantLabel
            ? `<br/><span class="muted">${escapeHtml(item.variantLabel)}${
                item.sku ? ` · ${escapeHtml(item.sku)}` : ''
              }</span>`
            : ''
        }</td>
        <td style="text-align:center">${formatNumber(item.quantity)}</td>
        <td style="text-align:left">${formatMoney(item.unitPrice)}</td>
        <td style="text-align:left">${formatMoney(item.unitPrice * item.quantity)}</td>
      </tr>`,
    )
    .join('')

  win.document.write(`<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>فاکتور ${escapeHtml(order.id.slice(0, 8))}</title>
  <style>
    body { font-family: Tahoma, sans-serif; padding: 24px; color: #111; }
    h1 { margin: 0 0 4px; font-size: 22px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { border-bottom: 1px solid #ddd; padding: 8px; font-size: 13px; }
    th { color: #666; font-weight: 600; }
    .muted { color: #666; font-size: 13px; }
    .totals { width: 280px; margin-right: auto; margin-top: 16px; }
    .totals div { display: flex; justify-content: space-between; margin: 6px 0; font-size: 13px; }
    .total { font-weight: 700; font-size: 15px; border-top: 1px solid #ddd; padding-top: 8px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(sellerTitle)}</h1>
  ${
    settings.legalName && settings.shopName && settings.legalName !== settings.shopName
      ? `<p class="muted">${escapeHtml(settings.shopName)}</p>`
      : ''
  }
  ${legalLines}
  <p class="muted">فاکتور سفارش · ${escapeHtml(order.id.slice(0, 8).toUpperCase())}</p>
  <p class="muted">${escapeHtml(formatDateTime(order.createdAt))}</p>
  <p><strong>${escapeHtml(order.userFullName || '—')}</strong><br/>${escapeHtml(order.userEmail || '')}</p>
  <p class="muted">${escapeHtml(order.address.fullName)} · ${escapeHtml(order.address.phone)}<br/>
  ${escapeHtml(order.address.line)}<br/>
  ${escapeHtml(order.address.city)}، ${escapeHtml(order.address.province)} — ${escapeHtml(order.address.postalCode)}</p>
  ${order.note ? `<p class="muted">یادداشت: ${escapeHtml(order.note)}</p>` : ''}
  <table>
    <thead>
      <tr><th>کالا</th><th>تعداد</th><th>قیمت واحد</th><th>مبلغ</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="totals">
    <div><span>جمع جزء</span><span>${formatMoney(order.subtotal)}</span></div>
    ${
      order.discount
        ? `<div><span>تخفیف</span><span>−${formatMoney(order.discount)}</span></div>`
        : ''
    }
    <div><span>ارسال</span><span>${
      order.shippingCost ? formatMoney(order.shippingCost) : 'رایگان'
    }</span></div>
    ${
      order.taxAmount
        ? `<div><span>مالیات</span><span>${formatMoney(order.taxAmount)}</span></div>`
        : ''
    }
    <div class="total"><span>مبلغ نهایی</span><span>${formatMoney(order.total)}</span></div>
  </div>
</body>
</html>`)
  win.document.close()
  win.focus()
  win.print()
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
        <TypographyTitle :level="3" style="margin: 0">
          سفارش‌ها
        </TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="999"
          :show-zero="true"
        />
        <Tag v-if="hasActiveFilters" color="processing">
          فیلتر فعال
        </Tag>
      </Space>
      <Space wrap>
        <Input.Search
          :value="searchQuery"
          allow-clear
          placeholder="جستجو: مشتری، شهر، محصول…"
          style="width: 240px"
          @update:value="onSearchChange"
        />
        <Select
          :value="statusFilter"
          :options="statusFilterOptions"
          style="width: 160px"
          @change="onStatusFilterChange"
        />
        <Select
          :value="paymentFilter"
          :options="paymentFilterOptions"
          style="width: 160px"
          @change="onPaymentFilterChange"
        />
        <Button v-if="hasActiveFilters" @click="clearFilters">
          پاک کردن
        </Button>
        <Button :disabled="!rows.length" @click="exportCsv">
          <template #icon>
            <DownloadOutlined />
          </template>
          خروجی CSV
        </Button>
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
        total: totalCount,
        onChange: onPageChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'createdAt'">
          {{ formatDateTime(record.createdAt) }}
        </template>
        <template v-else-if="column.key === 'customer'">
          <div>
            <div>{{ record.userFullName || '—' }}</div>
            <div style="color: rgba(0,0,0,0.45); font-size: 12px">
              <div>{{ record.userEmail || (record.userId ? record.userId : 'مهمان') }}</div>
              <div
                v-if="record.guestPhone"
                style="color: rgba(0,0,0,0.45); font-size: 12px"
              >
                {{ record.guestPhone }}
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'total'">
          <div>
            <div>{{ formatMoney(record.total) }}</div>
            <Tag v-if="record.discount" color="purple" style="margin-top: 4px">
              {{ record.couponCode || 'تخفیف' }}
              −{{ formatMoney(record.discount) }}
            </Tag>
          </div>
        </template>
        <template v-else-if="column.key === 'paymentStatus'">
          <Tag :color="PAYMENT_STATUS_COLOR[record.paymentStatus]">
            <component :is="PAYMENT_STATUS_ICON[record.paymentStatus]" />
            {{ paymentLabel(record.paymentStatus) }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'status'">
          <Space>
            <Tag :color="ORDER_STATUS_COLOR[record.status]">
              <component :is="ORDER_STATUS_ICON[record.status]" />
              {{ ORDER_STATUS_LABELS_FA[record.status] }}
            </Tag>
            <Select
              :value="record.status"
              :options="statusOptions"
              :loading="isUpdatingStatus && statusVariables?.id === record.id"
              style="width: 140px"
              size="small"
              @change="(value) => onStatusChange(record, value as OrderStatus)"
            />
          </Space>
        </template>
        <template v-else-if="column.key === 'items'">
          <Space>
            <Tag color="purple">
              <ShoppingOutlined />
              {{ formatNumber(itemCount(record)) }} قلم
            </Tag>
            <span style="color: rgba(0,0,0,0.65)">
              {{
                record.items
                  .map((item) => `${item.name} ×${formatNumber(item.quantity)}`)
                  .join('، ')
              }}
            </span>
          </Space>
        </template>
        <template v-else-if="column.key === 'city'">
          <Tag>
            <EnvironmentOutlined />
            {{ record.address.city }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Button type="link" @click="openView(record)">
            <template #icon>
              <EyeOutlined />
            </template>
            مشاهده
          </Button>
        </template>
      </template>
    </Table>

    <Drawer
      :open="!!viewing"
      title="جزئیات سفارش"
      placement="left"
      width="420"
      destroy-on-close
      @close="viewing = null"
    >
      <template v-if="viewing">
        <Space style="margin-bottom: 16px" wrap>
          <Tag :color="ORDER_STATUS_COLOR[viewing.status]">
            <component :is="ORDER_STATUS_ICON[viewing.status]" />
            {{ ORDER_STATUS_LABELS_FA[viewing.status] }}
          </Tag>
          <Tag :color="PAYMENT_STATUS_COLOR[viewing.paymentStatus]">
            <component :is="PAYMENT_STATUS_ICON[viewing.paymentStatus]" />
            {{ paymentLabel(viewing.paymentStatus) }}
          </Tag>
          <Button size="small" @click="printInvoice(viewing)">
            <template #icon>
              <PrinterOutlined />
            </template>
            چاپ فاکتور
          </Button>
          <Button
            v-if="canRefund(viewing)"
            size="small"
            danger
            :loading="isRefunding"
            @click="onRefund(viewing)"
          >
            استرداد
          </Button>
        </Space>

        <Descriptions :column="1" size="small" bordered>
          <DescriptionsItem label="تاریخ">
            {{ formatDateTime(viewing.createdAt) }}
          </DescriptionsItem>
          <DescriptionsItem label="مشتری">
            {{ viewing.userFullName || '—' }}
          </DescriptionsItem>
          <DescriptionsItem label="ایمیل">
            {{ viewing.userEmail || (viewing.userId ? viewing.userId : 'مهمان') }}
            <template v-if="viewing.guestPhone">
              · {{ viewing.guestPhone }}
            </template>
          </DescriptionsItem>
          <DescriptionsItem label="جمع جزء">
            {{ formatMoney(viewing.subtotal) }}
          </DescriptionsItem>
          <DescriptionsItem v-if="viewing.discount" label="تخفیف">
            <Tag color="purple">{{ viewing.couponCode }}</Tag>
            −{{ formatMoney(viewing.discount) }}
          </DescriptionsItem>
          <DescriptionsItem label="ارسال">
            {{ viewing.shippingMethodName || '—' }}
            —
            {{
              viewing.shippingCost
                ? formatMoney(viewing.shippingCost)
                : 'رایگان'
            }}
          </DescriptionsItem>
          <DescriptionsItem v-if="viewing.taxAmount" label="مالیات">
            {{ formatMoney(viewing.taxAmount) }}
          </DescriptionsItem>
          <DescriptionsItem label="قابل پرداخت">
            {{ formatMoney(viewing.total) }}
          </DescriptionsItem>
          <DescriptionsItem v-if="viewing.refundedAmount" label="مسترد شده">
            {{ formatMoney(viewing.refundedAmount) }}
          </DescriptionsItem>
          <DescriptionsItem v-if="viewing.paymentRefId" label="کد پیگیری پرداخت">
            {{ viewing.paymentRefId }}
          </DescriptionsItem>
          <DescriptionsItem v-if="viewing.trackingCode" label="کد رهگیری ارسال">
            {{ viewing.trackingCode }}
          </DescriptionsItem>
          <DescriptionsItem label="آدرس">
            {{ viewing.address.line }}
            —
            {{ viewing.address.city }}، {{ viewing.address.province }}
          </DescriptionsItem>
          <DescriptionsItem v-if="viewing.note" label="یادداشت مشتری">
            <div style="white-space: pre-wrap">{{ viewing.note }}</div>
          </DescriptionsItem>
          <DescriptionsItem label="اقلام">
            <div
              v-for="item in viewing.items"
              :key="`${item.productId}-${item.name}`"
            >
              {{ item.name }}{{ item.variantLabel ? ` (${item.variantLabel})` : '' }} × {{ formatNumber(item.quantity) }}
              <span
                v-if="item.sku"
                style="color: #8c8c8c"
              > · {{ item.sku }}</span>
              —
              {{ formatMoney(item.unitPrice * item.quantity) }}
            </div>
          </DescriptionsItem>
        </Descriptions>

        <div style="margin-top: 16px">
          <TypographyTitle :level="5" style="margin-bottom: 8px">
            یادداشت داخلی
          </TypographyTitle>
          <Input.TextArea
            v-model:value="adminNoteDraft"
            :rows="3"
            :maxlength="2000"
            show-count
            placeholder="فقط برای ادمین — به مشتری نشان داده نمی‌شود"
          />
          <Button
            type="primary"
            style="margin-top: 8px"
            :loading="isUpdatingStatus && statusVariables?.id === viewing.id"
            @click="saveAdminNote"
          >
            ذخیره یادداشت
          </Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
