<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  Badge,
  Button,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import type { TableColumnType } from 'ant-design-vue'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { Coupon, CouponType, CreateCouponInput } from '@shop/shared'
import { COUPON_TYPE_LABELS_FA, COUPON_TYPES } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { useMoneyAmount } from '@/composables/useMoneyAmount'
import { formatDateTime } from '@/utils/date'
import { formatMoney, formatNumber } from '@/utils/format'

type CouponForm = {
  code: string
  type: CouponType
  value: number
  minOrderAmount: number
  maxUses: number | null
  startsAt: Dayjs | null
  expiresAt: Dayjs | null
  isActive: boolean
  isAutomatic: boolean
}

const ability = useAbility<AppAbility>()
const { unitLabel, display, storage, inputStep, inputPrecision } = useMoneyAmount()
const queryClient = useQueryClient()
const saving = ref(false)
const open = ref(false)
const editingId = ref<string | null>(null)
const formRef = ref<FormInstance>()

const model = reactive<CouponForm>({
  code: '',
  type: 'percent',
  value: 10,
  minOrderAmount: 0,
  maxUses: null,
  startsAt: null,
  expiresAt: null,
  isActive: true,
  isAutomatic: false,
})

const rules: Record<keyof CouponForm, RuleObject | RuleObject[]> = {
  code: [{ required: true, message: 'کد الزامی است' }],
  type: [{ required: true, message: 'نوع الزامی است' }],
  value: [{ required: true, type: 'number', min: 1, message: 'مقدار الزامی است' }],
  minOrderAmount: [{ type: 'number', min: 0 }],
  maxUses: [],
  startsAt: [],
  expiresAt: [],
  isActive: [],
  isAutomatic: [],
}

const typeOptions = COUPON_TYPES.map((type) => ({
  label: COUPON_TYPE_LABELS_FA[type],
  value: type,
}))

const columns: TableColumnType<Coupon>[] = [
  { title: 'کد', dataIndex: 'code', key: 'code', width: 130 },
  { title: 'نوع', key: 'type', width: 110 },
  { title: 'مقدار', key: 'value', width: 120 },
  { title: 'حداقل سفارش', key: 'minOrderAmount', width: 130 },
  { title: 'استفاده', key: 'usage', width: 110 },
  { title: 'کمپین', key: 'campaign', width: 120 },
  { title: 'انقضا', key: 'expiresAt', width: 150 },
  { title: 'وضعیت', key: 'status', width: 100 },
  { title: 'عملیات', key: 'actions', width: 180 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.coupons,
  queryFn: () => api<Coupon[]>('/coupons'),
})

const rows = computed(() => data.value ?? [])
const totalCount = computed(() => rows.value.length)
const activeCount = computed(
  () => rows.value.filter((item) => item.isActive).length,
)

const saveMutation = useMutation({
  mutationFn: async (payload: CreateCouponInput) => {
    if (editingId.value) {
      return api(`/coupons/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/coupons', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(editingId.value ? 'کد به‌روزرسانی شد' : 'کد ایجاد شد')
    open.value = false
    await queryClient.invalidateQueries({ queryKey: queryKeys.coupons })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/coupons/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('کد حذف شد')
    await queryClient.invalidateQueries({ queryKey: queryKeys.coupons })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function resetModel() {
  model.code = ''
  model.type = 'percent'
  model.value = 10
  model.minOrderAmount = 0
  model.maxUses = null
  model.startsAt = null
  model.expiresAt = null
  model.isActive = true
  model.isAutomatic = false
}

function openCreate() {
  editingId.value = null
  resetModel()
  open.value = true
}

function openEdit(row: Coupon) {
  editingId.value = row.id
  model.code = row.code
  model.type = row.type
  model.value = row.type === 'fixed' ? display(row.value) : row.value
  model.minOrderAmount = display(row.minOrderAmount)
  model.maxUses = row.maxUses
  model.startsAt = row.startsAt ? dayjs(row.startsAt) : null
  model.expiresAt = row.expiresAt ? dayjs(row.expiresAt) : null
  model.isActive = row.isActive
  model.isAutomatic = row.isAutomatic
  open.value = true
}

function toPayload(): CreateCouponInput {
  return {
    code: model.code.trim().toUpperCase(),
    type: model.type,
    value: model.type === 'fixed' ? storage(model.value) : model.value,
    minOrderAmount: storage(model.minOrderAmount),
    maxUses: model.maxUses,
    startsAt: model.startsAt ? model.startsAt.toISOString() : null,
    expiresAt: model.expiresAt ? model.expiresAt.toISOString() : null,
    isActive: model.isActive,
    isAutomatic: model.isAutomatic,
  }
}

async function onSave() {
  await formRef.value?.validate()
  saving.value = true
  try {
    await saveMutation.mutateAsync(toPayload())
  } catch {
    // message shown in mutation onError
  } finally {
    saving.value = false
  }
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
        <TypographyTitle :level="3" style="margin: 0">کدهای تخفیف</TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="999"
          :show-zero="true"
        />
        <Tag v-if="activeCount" color="success">
          {{ formatNumber(activeCount) }} فعال
        </Tag>
      </Space>
      <Button
        v-if="ability.can('create', 'Coupon')"
        type="primary"
        @click="openCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        افزودن کد
      </Button>
    </div>

    <Table
      row-key="id"
      :loading="isPending"
      :columns="columns"
      :data-source="rows"
      :pagination="{ pageSize: 20 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'code'">
          <Tag color="purple">{{ record.code }}</Tag>
        </template>
        <template v-else-if="column.key === 'type'">
          <Tag :color="record.type === 'percent' ? 'blue' : 'cyan'">
            {{ COUPON_TYPE_LABELS_FA[record.type] }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'value'">
          {{
            record.type === 'percent'
              ? `${formatNumber(record.value)}٪`
              : formatMoney(record.value)
          }}
        </template>
        <template v-else-if="column.key === 'minOrderAmount'">
          {{
            record.minOrderAmount
              ? formatMoney(record.minOrderAmount)
              : '—'
          }}
        </template>
        <template v-else-if="column.key === 'usage'">
          {{ formatNumber(record.usedCount) }}
          /
          {{ record.maxUses == null ? '∞' : formatNumber(record.maxUses) }}
        </template>
        <template v-else-if="column.key === 'campaign'">
          <Tag v-if="record.isAutomatic" color="gold">
            خودکار
          </Tag>
          <span v-else style="color: rgba(0,0,0,0.45)">—</span>
        </template>
        <template v-else-if="column.key === 'expiresAt'">
          {{ record.expiresAt ? formatDateTime(record.expiresAt) : 'بدون انقضا' }}
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :color="record.isActive ? 'success' : 'default'">
            {{ record.isActive ? 'فعال' : 'غیرفعال' }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Coupon')"
              type="link"
              @click="openEdit(record)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Coupon')"
              title="این کد حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="deleteMutation.mutate(record.id)"
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

    <Modal
      v-model:open="open"
      :title="editingId ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف'"
      :confirm-loading="saving"
      ok-text="ذخیره"
      cancel-text="انصراف"
      destroy-on-close
      @ok="onSave"
    >
      <Form ref="formRef" layout="vertical" :model="model" :rules="rules">
        <FormItem label="کد" name="code">
          <Input
            v-model:value="model.code"
            placeholder="SUMMER10"
            style="text-transform: uppercase"
          />
        </FormItem>
        <FormItem label="نوع" name="type">
          <Select v-model:value="model.type" :options="typeOptions" />
        </FormItem>
        <FormItem
          :label="model.type === 'percent' ? 'درصد' : `مبلغ (${unitLabel})`"
          name="value"
        >
          <InputNumber
            v-model:value="model.value"
            :min="model.type === 'percent' ? 1 : inputStep"
            :max="model.type === 'percent' ? 100 : undefined"
            :step="model.type === 'percent' ? 1 : inputStep"
            :precision="model.type === 'percent' ? 0 : inputPrecision"
            style="width: 100%"
          />
        </FormItem>
        <FormItem :label="`حداقل مبلغ سفارش (${unitLabel})`" name="minOrderAmount">
          <InputNumber
            v-model:value="model.minOrderAmount"
            :min="0"
            :step="inputStep"
            :precision="inputPrecision"
            style="width: 100%"
          />
        </FormItem>
        <FormItem
          label="سقف استفاده"
          name="maxUses"
          extra="خالی = نامحدود"
        >
          <InputNumber
            v-model:value="model.maxUses!"
            :min="1"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="شروع کمپین" name="startsAt" extra="اختیاری — خالی = فوری">
          <DatePicker
            v-model:value="model.startsAt!"
            show-time
            allow-clear
            format="YYYY/MM/DD HH:mm"
            placeholder="شروع"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="انقضا" name="expiresAt" extra="اختیاری">
          <DatePicker
            v-model:value="model.expiresAt!"
            show-time
            allow-clear
            format="YYYY/MM/DD HH:mm"
            placeholder="انتخاب تاریخ انقضا"
            style="width: 100%"
          />
        </FormItem>
        <FormItem
          label="اعمال خودکار"
          name="isAutomatic"
          extra="اگر مشتری کدی وارد نکند، بهترین کمپین خودکار اعمال می‌شود"
        >
          <Switch v-model:checked="model.isAutomatic" />
        </FormItem>
        <FormItem label="فعال" name="isActive">
          <Switch v-model:checked="model.isActive" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
