<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  Badge,
  Button,
  Drawer,
  Form,
  FormItem,
  FormItemRest,
  Input,
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
import type { Category, CategorySpecKey, CreateCategoryInput } from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import SeoFieldsForm from '@/components/SeoFieldsForm.vue'
import { slugify } from '@/utils/slugify'

type CategoryForm = {
  name: string
  slug: string
  description: string
  specKeys: CategorySpecKey[]
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

const model = reactive<CategoryForm>({
  name: '',
  slug: '',
  description: '',
  specKeys: [],
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  name: [{ required: true, message: 'وارد کردن نام الزامی است' }],
  slug: [{ required: true, message: 'وارد کردن اسلاگ الزامی است' }],
}

const columns: TableColumnType<Category>[] = [
  { title: 'نام', dataIndex: 'name', key: 'name' },
  { title: 'اسلاگ', dataIndex: 'slug', key: 'slug' },
  { title: 'ویژگی‌ها', key: 'specKeys', width: 120 },
  { title: 'عملیات', key: 'actions', width: 180 },
]

const { data, isPending, error } = useQuery({
  queryKey: queryKeys.categories,
  queryFn: () => api<Category[]>('/categories'),
})

const rows = computed(() => data.value ?? [])
const totalCount = computed(() => rows.value.length)

const saveMutation = useMutation({
  mutationFn: async (payload: CreateCategoryInput) => {
    if (editingId.value) {
      return api(`/categories/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/categories', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(editingId.value ? 'دسته به‌روزرسانی شد' : 'دسته ایجاد شد')
    open.value = false
    await queryClient.invalidateQueries({ queryKey: queryKeys.categories })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) => api(`/categories/${id}`, { method: 'DELETE' }),
  onSuccess: async () => {
    message.success('دسته حذف شد')
    await queryClient.invalidateQueries({ queryKey: queryKeys.categories })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'حذف ناموفق بود')
  },
})

function resetModel() {
  model.name = ''
  model.slug = ''
  model.description = ''
  model.specKeys = []
  model.seoTitle = null
  model.seoDescription = null
  model.ogImage = null
}

function openCreate() {
  editingId.value = null
  resetModel()
  open.value = true
}

function openEdit(row: Category) {
  editingId.value = row.id
  model.name = row.name
  model.slug = row.slug
  model.description = row.description ?? ''
  model.specKeys = (row.specKeys ?? []).map((item, index) => ({
    key: item.key,
    sortOrder: item.sortOrder ?? index,
    required: Boolean(item.required),
  }))
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

function addSpecKey() {
  if (model.specKeys.length >= 40) {
    message.warning('حداکثر ۴۰ ویژگی')
    return
  }
  model.specKeys.push({
    key: '',
    sortOrder: model.specKeys.length,
    required: false,
  })
}

function removeSpecKey(index: number) {
  model.specKeys.splice(index, 1)
}

async function onSave() {
  await formRef.value?.validate()
  saving.value = true
  try {
    await saveMutation.mutateAsync({
      name: model.name,
      slug: model.slug,
      parentId: null,
      description: model.description,
      seoTitle: model.seoTitle,
      seoDescription: model.seoDescription,
      ogImage: model.ogImage,
      specKeys: model.specKeys
        .map((item, index) => ({
          key: item.key.trim(),
          sortOrder: index,
          required: Boolean(item.required),
        }))
        .filter((item) => item.key),
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
        <TypographyTitle :level="3" style="margin: 0">دسته‌ها</TypographyTitle>
        <Badge
          :count="totalCount"
          :number-style="{ backgroundColor: '#1677ff' }"
          :overflow-count="999"
          :show-zero="true"
        />
      </Space>
      <Button
        v-if="ability.can('create', 'Category')"
        type="primary"
        @click="openCreate"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        افزودن دسته
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
          <Tag color="processing">{{ (record as Category).slug }}</Tag>
        </template>
        <template v-else-if="column.key === 'specKeys'">
          {{ (record as Category).specKeys?.length ?? 0 }} کلید
        </template>
        <template v-else-if="column.key === 'actions'">
          <Space>
            <Button
              v-if="ability.can('update', 'Category')"
              type="link"
              @click="openEdit(record as Category)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              ویرایش
            </Button>
            <Popconfirm
              v-if="ability.can('delete', 'Category')"
              title="این دسته حذف شود؟"
              ok-text="بله"
              cancel-text="خیر"
              @confirm="deleteMutation.mutate((record as Category).id)"
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

    <Drawer
      v-model:open="open"
      :title="editingId ? 'ویرایش دسته' : 'افزودن دسته'"
      placement="left"
      :width="520"
      destroy-on-close
      :footer-style="{ textAlign: 'left' }"
    >
      <Form ref="formRef" layout="vertical" :model="model" :rules="rules">
        <FormItem label="نام" name="name">
          <Input v-model:value="model.name" @blur="onNameBlur" />
        </FormItem>
        <FormItem label="اسلاگ" name="slug">
          <Input v-model:value="model.slug" dir="ltr" />
        </FormItem>
        <FormItem label="توضیح دسته (محتوای صفحه)">
          <Input.TextArea v-model:value="model.description" :rows="3" />
        </FormItem>
        <SeoFieldsForm
          v-model:seo-title="model.seoTitle"
          v-model:seo-description="model.seoDescription"
          v-model:og-image="model.ogImage"
          :fallback-title="model.name"
          :fallback-description="model.description"
          :path-preview="model.slug ? `/categories/${model.slug}` : '/categories/…'"
        />
        <FormItem
          label="قالب مشخصات محصول"
          extra="با انتخاب این دسته در فرم محصول، این کلیدها پیش‌پر می‌شوند"
        >
          <FormItemRest>
            <div style="display: flex; flex-direction: column; gap: 8px">
              <Space
                v-for="(item, index) in model.specKeys"
                :key="index"
                align="center"
                style="width: 100%"
              >
                <Input
                  v-model:value="item.key"
                  placeholder="مثلاً توان، امپدانس"
                  style="width: 240px"
                />
                <span style="white-space: nowrap">الزامی</span>
                <Switch v-model:checked="item.required" size="small" />
                <Button
                  danger
                  type="link"
                  @click="removeSpecKey(index)"
                >
                  حذف
                </Button>
              </Space>
              <Button
                type="dashed"
                block
                @click="addSpecKey"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
                افزودن کلید
              </Button>
            </div>
          </FormItemRest>
        </FormItem>
      </Form>
      <template #footer>
        <Space>
          <Button @click="open = false">انصراف</Button>
          <Button type="primary" :loading="saving" @click="onSave">
            ذخیره
          </Button>
        </Space>
      </template>
    </Drawer>
  </div>
</template>
