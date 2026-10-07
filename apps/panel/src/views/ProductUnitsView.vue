<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
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
import type { CreateProductUnitInput, ProductUnit } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { slugify } from '@/utils/slugify'

type UnitForm = {
  name: string
  slug: string
  symbol: string
  sortOrder: number
  isActive: boolean
}

const ability = useAbility<AppAbility>()
const queryClient = useQueryClient()
const saving = ref(false)
const open = ref(false)
const editingId = ref<string | null>(null)
const formRef = ref<FormInstance>()

const model = reactive<UnitForm>({
  name: '',
  slug: '',
  symbol: '',
  sortOrder: 0,
  isActive: true,
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  name: [{ required: true, message: 'نام الزامی است' }],
  slug: [{ required: true, message: 'اسلاگ الزامی است' }],
  symbol: [{ required: true, message: 'نماد الزامی است' }],
}

const columns: TableColumnType<ProductUnit>[] = [
  { title: 'نام', dataIndex: 'name', key: 'name' },
  { title: 'نماد', dataIndex: 'symbol', key: 'symbol', width: 100 },
  { title: 'اسلاگ', dataIndex: 'slug', key: 'slug', width: 140 },
  { title: 'ترتیب', dataIndex: 'sortOrder', key: 'sortOrder', width: 90 },
  { title: 'فعال', key: 'isActive', width: 90 },
  { title: 'عملیات', key: 'actions', width: 180 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.productUnits,
  queryFn: () => api<ProductUnit[]>('/product-units/admin'),
})

const rows = computed(() => data.value ?? [])
const totalCount = computed(() => rows.value.length)

const saveMutation = useMutation({
  mutationFn: async (payload: CreateProductUnitInput) => {
    if (editingId.value) {
      return api(`/product-units/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/product-units', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(editingId.value ? 'واحد به‌روزرسانی شد' : 'واحد ایجاد شد')
    open.value = false
    await queryClient.invalidateQueries({ queryKey: queryKeys.productUnits })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/product-units/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('واحد حذف شد')
    await queryClient.invalidateQueries({ queryKey: queryKeys.productUnits })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function resetModel() {
  model.name = ''
  model.slug = ''
  model.symbol = ''
  model.sortOrder = 0
  model.isActive = true
}

function openCreate() {
  editingId.value = null
  resetModel()
  open.value = true
}

function openEdit(row: ProductUnit) {
  editingId.value = row.id
  model.name = row.name
  model.slug = row.slug
  model.symbol = row.symbol
  model.sortOrder = row.sortOrder
  model.isActive = row.isActive
  open.value = true
}

function onNameBlur() {
  if (!editingId.value && !model.slug) {
    model.slug = slugify(model.name)
  }
  if (!editingId.value && !model.symbol) {
    model.symbol = model.name
  }
}

async function onSave() {
  await formRef.value?.validate()
  saving.value = true
  try {
    await saveMutation.mutateAsync({
      name: model.name,
      slug: model.slug,
      symbol: model.symbol,
      sortOrder: model.sortOrder,
      isActive: model.isActive,
    })
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
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
      <Space align="center">
        <TypographyTitle :level="3" style="margin: 0">واحدهای فروش</TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="999"
          :show-zero="true"
        />
      </Space>
      <Button
        v-if="ability.can('create', 'ProductUnit')"
        type="primary"
        @click="openCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        واحد جدید
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
        <template v-if="column.key === 'slug'">
          <Tag>{{ (record as ProductUnit).slug }}</Tag>
        </template>
        <template v-else-if="column.key === 'isActive'">
          <Tag :color="(record as ProductUnit).isActive ? 'success' : 'default'">
            {{ (record as ProductUnit).isActive ? 'فعال' : 'غیرفعال' }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'ProductUnit')"
              type="link"
              @click="openEdit(record as ProductUnit)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'ProductUnit')"
              title="این واحد حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="deleteMutation.mutate((record as ProductUnit).id)"
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
      :title="editingId ? 'ویرایش واحد' : 'واحد جدید'"
      :confirm-loading="saving"
      ok-text="ذخیره"
      cancel-text="انصراف"
      destroy-on-close
      @ok="onSave"
    >
      <Form ref="formRef" layout="vertical" :model="model" :rules="rules">
        <FormItem label="نام" name="name">
          <Input v-model:value="model.name" @blur="onNameBlur" />
        </FormItem>
        <FormItem label="نماد نمایشی" name="symbol">
          <Input v-model:value="model.symbol" placeholder="مثلاً عدد، کیلو" />
        </FormItem>
        <FormItem label="اسلاگ" name="slug">
          <Input v-model:value="model.slug" />
        </FormItem>
        <FormItem label="ترتیب" name="sortOrder">
          <InputNumber v-model:value="model.sortOrder" :min="0" style="width: 100%" />
        </FormItem>
        <FormItem label="فعال" name="isActive">
          <Switch v-model:checked="model.isActive" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
