<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  Badge,
  Button,
  Form,
  FormItem,
  Input,
  Modal,
  Popconfirm,
  Space,
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
import type { Brand, CreateBrandInput } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import SeoFieldsForm from '@/components/SeoFieldsForm.vue'
import { slugify } from '@/utils/slugify'

type BrandForm = {
  name: string
  slug: string
  description: string
  seoTitle: string | null
  seoDescription: string | null
  ogImage: string | null
}

const ability = useAbility<AppAbility>()
const queryClient = useQueryClient()
const saving = ref(false)
const open = ref(false)
const editingId = ref<string | null>(null)
const formRef = ref<FormInstance>()

const model = reactive<BrandForm>({
  name: '',
  slug: '',
  description: '',
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  name: [{ required: true, message: 'وارد کردن نام الزامی است' }],
  slug: [{ required: true, message: 'وارد کردن اسلاگ الزامی است' }],
}

const columns: TableColumnType<Brand>[] = [
  { title: 'نام', dataIndex: 'name', key: 'name' },
  { title: 'اسلاگ', dataIndex: 'slug', key: 'slug' },
  { title: 'عملیات', key: 'actions', width: 180 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.brands,
  queryFn: () => api<Brand[]>('/brands'),
})

const rows = computed(() => data.value ?? [])
const totalCount = computed(() => rows.value.length)

const saveMutation = useMutation({
  mutationFn: async (payload: CreateBrandInput) => {
    if (editingId.value) {
      return api(`/brands/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/brands', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(editingId.value ? 'برند به‌روزرسانی شد' : 'برند ایجاد شد')
    open.value = false
    await queryClient.invalidateQueries({ queryKey: queryKeys.brands })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/brands/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('برند حذف شد')
    await queryClient.invalidateQueries({ queryKey: queryKeys.brands })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function resetModel() {
  model.name = ''
  model.slug = ''
  model.description = ''
  model.seoTitle = null
  model.seoDescription = null
  model.ogImage = null
}

function openCreate() {
  editingId.value = null
  resetModel()
  open.value = true
}

function openEdit(row: Brand) {
  editingId.value = row.id
  model.name = row.name
  model.slug = row.slug
  model.description = row.description ?? ''
  model.seoTitle = row.seoTitle ?? null
  model.seoDescription = row.seoDescription ?? null
  model.ogImage = row.ogImage ?? null
  open.value = true
}

function onNameBlur() {
  if (!editingId.value && !model.slug) {
    model.slug = slugify(model.name)
  }
}

async function onSave() {
  await formRef.value?.validate()
  saving.value = true
  try {
    await saveMutation.mutateAsync({
      name: model.name,
      slug: model.slug,
      description: model.description,
      seoTitle: model.seoTitle,
      seoDescription: model.seoDescription,
      ogImage: model.ogImage,
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
        <TypographyTitle :level="3" style="margin: 0">برندها</TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="999"
          :show-zero="true"
        />
      </Space>
      <Button
        v-if="ability.can('create', 'Brand')"
        type="primary"
        @click="openCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        افزودن برند
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
          <Tag color="processing">{{ (record as Brand).slug }}</Tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Brand')"
              type="link"
              @click="openEdit(record as Brand)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Brand')"
              title="این برند حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="deleteMutation.mutate((record as Brand).id)"
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
      :title="editingId ? 'ویرایش برند' : 'افزودن برند'"
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
        <FormItem label="اسلاگ" name="slug">
          <Input v-model:value="model.slug" />
        </FormItem>
        <FormItem label="توضیح برند (محتوای صفحه)">
          <Input.TextArea v-model:value="model.description" :rows="3" />
        </FormItem>
        <SeoFieldsForm
          v-model:seo-title="model.seoTitle"
          v-model:seo-description="model.seoDescription"
          v-model:og-image="model.ogImage"
          :fallback-title="model.name"
          :fallback-description="model.description"
          :path-preview="model.slug ? `/brands/${model.slug}` : '/brands/…'"
        />
      </Form>
    </Modal>
  </div>
</template>
