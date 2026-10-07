<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  Badge,
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
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
import type { CreateShippingMethodInput, ShippingMethod } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { useMoneyAmount } from '@/composables/useMoneyAmount'
import { formatMoney, formatNumber } from '@/utils/format'

const DEFAULT_SHIPPING_RIAL = 750_000

type ShippingForm = {
  name: string
  description: string
  price: number
  estimatedDays: number
  freeAbove: number | null
  sortOrder: number
  isActive: boolean
}

const ability = useAbility<AppAbility>()
const { unitLabel, display, storage, inputStep, inputPrecision } = useMoneyAmount()
const queryClient = useQueryClient()
const saving = ref(false)
const open = ref(false)
const editingId = ref<string | null>(null)
const formRef = ref<FormInstance>()

const model = reactive<ShippingForm>({
  name: '',
  description: '',
  price: 0,
  estimatedDays: 3,
  freeAbove: null,
  sortOrder: 0,
  isActive: true,
})

const rules: Record<keyof ShippingForm, RuleObject | RuleObject[]> = {
  name: [{ required: true, message: 'نام الزامی است' }],
  description: [],
  price: [{ required: true, type: 'number', min: 0, message: 'هزینه الزامی است' }],
  estimatedDays: [
    { required: true, type: 'number', min: 1, message: 'مدت ارسال الزامی است' },
  ],
  freeAbove: [],
  sortOrder: [{ type: 'number' }],
  isActive: [],
}

const columns: TableColumnType<ShippingMethod>[] = [
  { title: 'نام', dataIndex: 'name', key: 'name' },
  { title: 'هزینه', key: 'price', width: 140 },
  { title: 'روز', key: 'estimatedDays', width: 90 },
  { title: 'ارسال رایگان از', key: 'freeAbove', width: 150 },
  { title: 'ترتیب', dataIndex: 'sortOrder', key: 'sortOrder', width: 90 },
  { title: 'وضعیت', key: 'status', width: 100 },
  { title: 'عملیات', key: 'actions', width: 180 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.shippingMethods,
  queryFn: () => api<ShippingMethod[]>('/shipping-methods/admin'),
})

const rows = computed(() => data.value ?? [])
const totalCount = computed(() => rows.value.length)
const activeCount = computed(
  () => rows.value.filter((item) => item.isActive).length,
)

const saveMutation = useMutation({
  mutationFn: async (payload: CreateShippingMethodInput) => {
    if (editingId.value) {
      return api(`/shipping-methods/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/shipping-methods', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(editingId.value ? 'روش به‌روزرسانی شد' : 'روش ایجاد شد')
    open.value = false
    await queryClient.invalidateQueries({ queryKey: queryKeys.shippingMethods })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) =>
    api(`/shipping-methods/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('روش حذف شد')
    await queryClient.invalidateQueries({ queryKey: queryKeys.shippingMethods })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function resetModel() {
  model.name = ''
  model.description = ''
  model.price = display(DEFAULT_SHIPPING_RIAL)
  model.estimatedDays = 3
  model.freeAbove = null
  model.sortOrder = 0
  model.isActive = true
}

function openCreate() {
  editingId.value = null
  resetModel()
  open.value = true
}

function openEdit(row: ShippingMethod) {
  editingId.value = row.id
  model.name = row.name
  model.description = row.description ?? ''
  model.price = display(row.price)
  model.estimatedDays = row.estimatedDays
  model.freeAbove = display(row.freeAbove)
  model.sortOrder = row.sortOrder
  model.isActive = row.isActive
  open.value = true
}

function toPayload(): CreateShippingMethodInput {
  return {
    name: model.name.trim(),
    description: model.description.trim() || null,
    price: storage(model.price),
    estimatedDays: model.estimatedDays,
    freeAbove: storage(model.freeAbove),
    sortOrder: model.sortOrder,
    isActive: model.isActive,
  }
}

async function onSave() {
  await formRef.value?.validate()
  saving.value = true
  try {
    await saveMutation.mutateAsync(toPayload())
  } catch {
    // mutation surfaces toast
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <Space style="margin-bottom: 16px; width: 100%; justify-content: space-between">
      <Space>
        <TypographyTitle :level="3" style="margin: 0">
          روش‌های ارسال
        </TypographyTitle>
        <Badge :count="totalCount" :overflow-count="999" />
        <Tag v-if="activeCount" color="green">
          {{ formatNumber(activeCount) }} فعال
        </Tag>
      </Space>
      <Button
        v-if="ability.can('create', 'Shipping')"
        type="primary"
        @click="openCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        روش جدید
      </Button>
    </Space>

    <Table
      :columns="columns"
      :data-source="rows"
      :loading="isPending"
      row-key="id"
      :pagination="false"
    >
      <template #emptyText>
        <span v-if="error">بارگذاری ناموفق بود</span>
        <span v-else>روش ارسالی ثبت نشده</span>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'price'">
          {{ formatMoney((record as ShippingMethod).price) }}
        </template>
        <template v-else-if="column.key === 'estimatedDays'">
          {{ formatNumber((record as ShippingMethod).estimatedDays) }} روز
        </template>
        <template v-else-if="column.key === 'freeAbove'">
          <span v-if="(record as ShippingMethod).freeAbove">
            {{ formatMoney((record as ShippingMethod).freeAbove!) }}
          </span>
          <span v-else style="color: rgba(0,0,0,0.45)">—</span>
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :color="(record as ShippingMethod).isActive ? 'green' : 'default'">
            {{ (record as ShippingMethod).isActive ? 'فعال' : 'غیرفعال' }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Shipping')"
              type="link"
              @click="openEdit(record as ShippingMethod)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Shipping')"
              title="این روش حذف شود؟"
              ok-text="حذف"
              cancel-text="انصراف"
              @confirm="deleteMutation.mutate((record as ShippingMethod).id)"
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
      :title="editingId ? 'ویرایش روش ارسال' : 'روش ارسال جدید'"
      ok-text="ذخیره"
      cancel-text="انصراف"
      :confirm-loading="saving"
      destroy-on-close
      @ok="onSave"
    >
      <Form
        ref="formRef"
        layout="vertical"
        :model="model"
        :rules="rules"
      >
        <FormItem label="نام" name="name">
          <Input v-model:value="model.name" />
        </FormItem>
        <FormItem label="توضیح" name="description">
          <Input.TextArea v-model:value="model.description" :rows="2" />
        </FormItem>
        <FormItem :label="`هزینه (${unitLabel})`" name="price">
          <InputNumber
            v-model:value="model.price"
            :min="0"
            :step="inputStep"
            :precision="inputPrecision"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="مدت تقریبی (روز)" name="estimatedDays">
          <InputNumber
            v-model:value="model.estimatedDays"
            :min="1"
            :max="60"
            style="width: 100%"
          />
        </FormItem>
        <FormItem :label="`ارسال رایگان از مبلغ (${unitLabel})`" name="freeAbove">
          <InputNumber
            v-model:value="model.freeAbove"
            :min="inputStep"
            :step="inputStep"
            :precision="inputPrecision"
            style="width: 100%"
            placeholder="خالی = بدون ارسال رایگان"
          />
        </FormItem>
        <FormItem label="ترتیب نمایش" name="sortOrder">
          <InputNumber v-model:value="model.sortOrder" style="width: 100%" />
        </FormItem>
        <FormItem label="فعال" name="isActive">
          <Switch v-model:checked="model.isActive" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
