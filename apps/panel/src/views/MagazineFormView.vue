<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Spin,
  Tabs,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import {
  ArrowRightOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type {
  CreateMagazinePostInput,
  MagazinePost,
  MagazinePostStatus,
  Product,
} from '@shop/shared'
import {
  MAGAZINE_POST_STATUSES,
  MAGAZINE_POST_STATUS_LABELS_FA,
} from '@shop/shared'
import type { AppAbility } from '@/ability'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import ProductImageField from '@/components/ProductImageField.vue'
import SeoFieldsForm from '@/components/SeoFieldsForm.vue'
import { slugify } from '@/utils/slugify'

type MagazineForm = {
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  bodyMarkdown: string
  status: MagazinePostStatus
  relatedProductIds: string[]
  seoTitle: string | null
  seoDescription: string | null
  ogImage: string | null
}

const ability = useAbility<AppAbility>()
const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()
const saving = ref(false)
const formRef = ref<FormInstance>()
const activeTab = ref('content')

const editingId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' && id.length ? id : null
})
const isEdit = computed(() => Boolean(editingId.value))

const model = reactive<MagazineForm>({
  title: '',
  slug: '',
  excerpt: '',
  coverImage: null,
  bodyMarkdown: '',
  status: 'draft',
  relatedProductIds: [],
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
})

const coverImages = computed({
  get: () => (model.coverImage ? [model.coverImage] : []),
  set: (value: string[]) => {
    model.coverImage = value[0] ?? null
  },
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  title: [{ required: true, message: 'عنوان الزامی است' }],
  slug: [{ required: true, message: 'اسلاگ الزامی است' }],
  bodyMarkdown: [{ required: true, message: 'متن مطلب الزامی است' }],
}

const {
  data: postData,
  isPending: postPending,
  error: postError,
} = useQuery({
  queryKey: computed(() =>
    editingId.value
      ? queryKeys.magazinePost(editingId.value)
      : (['magazine', 'new'] as const),
  ),
  queryFn: () => api<MagazinePost>(`/magazine/admin/posts/${editingId.value}`),
  enabled: computed(() => Boolean(editingId.value)),
})

const { data: productsData } = useQuery({
  queryKey: ['products-for-magazine'],
  queryFn: () =>
    api<{ items: Product[] }>('/products/admin', {
      params: { page: 1, perPage: 100, sort: 'newest' },
    }),
})

const productOptions = computed(() =>
  (productsData.value?.items ?? []).map((product) => ({
    label: product.name,
    value: product.id,
  })),
)

const pageReady = computed(() => !isEdit.value || !postPending.value)

function resetModel() {
  model.title = ''
  model.slug = ''
  model.excerpt = ''
  model.coverImage = null
  model.bodyMarkdown = ''
  model.status = 'draft'
  model.relatedProductIds = []
  model.seoTitle = null
  model.seoDescription = null
  model.ogImage = null
}

function fillFromPost(row: MagazinePost) {
  model.title = row.title
  model.slug = row.slug
  model.excerpt = row.excerpt
  model.coverImage = row.coverImage
  model.bodyMarkdown = row.bodyMarkdown
  model.status = row.status
  model.relatedProductIds = [...row.relatedProductIds]
  model.seoTitle = row.seoTitle ?? null
  model.seoDescription = row.seoDescription ?? null
  model.ogImage = row.ogImage ?? null
}

watch(
  postData,
  (row) => {
    if (editingId.value && row) fillFromPost(row)
  },
  { immediate: true },
)

watch(
  editingId,
  () => {
    if (!editingId.value) resetModel()
  },
  { immediate: true },
)

watch(postError, (value) => {
  if (value) {
    message.error(
      value instanceof ApiError ? value.message : 'بارگذاری مطلب ناموفق بود',
    )
    void router.replace({ name: 'magazine' })
  }
})

const saveMutation = useMutation({
  mutationFn: async (payload: CreateMagazinePostInput) => {
    if (editingId.value) {
      return api(`/magazine/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/magazine', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(isEdit.value ? 'مطلب به‌روزرسانی شد' : 'مطلب ایجاد شد')
    await queryClient.invalidateQueries({ queryKey: ['magazine'] })
    await router.push({ name: 'magazine' })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

function onTitleBlur() {
  if (!isEdit.value && !model.slug) {
    model.slug = slugify(model.title)
  }
}

async function onSave() {
  try {
    await formRef.value?.validate()
  } catch {
    activeTab.value = 'content'
    message.warning('فیلدهای الزامی را کامل کنید')
    return
  }
  saving.value = true
  try {
    await saveMutation.mutateAsync({
      title: model.title,
      slug: model.slug,
      excerpt: model.excerpt,
      coverImage: model.coverImage,
      bodyMarkdown: model.bodyMarkdown,
      status: model.status,
      relatedProductIds: model.relatedProductIds.slice(0, 8),
      seoTitle: model.seoTitle,
      seoDescription: model.seoDescription,
      ogImage: model.ogImage,
    })
  } catch {
    // message shown in mutation onError
  } finally {
    saving.value = false
  }
}

function goBack() {
  void router.push({ name: 'magazine' })
}

const canSubmit = computed(() =>
  isEdit.value
    ? ability.can('update', 'Magazine')
    : ability.can('create', 'Magazine'),
)
</script>

<template>
  <div class="magazine-form-page">
    <Breadcrumb style="margin-bottom: 12px">
      <Breadcrumb.Item>
        <a @click.prevent="goBack">مجله</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {{ isEdit ? 'ویرایش' : 'مطلب جدید' }}
      </Breadcrumb.Item>
    </Breadcrumb>

    <div class="magazine-form-page__header">
      <Space align="center">
        <Button type="text" @click="goBack">
          <template #icon>
            <ArrowRightOutlined />
          </template>
        </Button>
        <TypographyTitle :level="3" style="margin: 0">
          {{ isEdit ? 'ویرایش مطلب' : 'مطلب جدید' }}
        </TypographyTitle>
      </Space>
    </div>

    <Spin :spinning="!pageReady">
      <Form
        v-if="pageReady"
        ref="formRef"
        layout="vertical"
        :model="model"
        :rules="rules"
        class="magazine-form-page__body"
      >
        <Tabs v-model:active-key="activeTab">
          <Tabs.TabPane key="content" tab="محتوا">
            <Card size="small" :bordered="false">
              <FormItem label="عنوان" name="title">
                <Input v-model:value="model.title" @blur="onTitleBlur" />
              </FormItem>
              <FormItem label="اسلاگ" name="slug">
                <Input v-model:value="model.slug" dir="ltr" />
              </FormItem>
              <FormItem label="خلاصه" name="excerpt">
                <Input.TextArea
                  v-model:value="model.excerpt"
                  :rows="2"
                  :maxlength="500"
                  show-count
                />
              </FormItem>
              <FormItem label="وضعیت" name="status">
                <Select
                  v-model:value="model.status"
                  style="max-width: 240px"
                  :options="
                    MAGAZINE_POST_STATUSES.map((status) => ({
                      label: MAGAZINE_POST_STATUS_LABELS_FA[status],
                      value: status,
                    }))
                  "
                />
              </FormItem>
              <FormItem label="تصویر کاور">
                <ProductImageField v-model:images="coverImages" />
              </FormItem>
              <FormItem label="متن (Markdown)" name="bodyMarkdown">
                <Input.TextArea
                  v-model:value="model.bodyMarkdown"
                  :rows="16"
                  placeholder="# عنوان&#10;&#10;پاراگراف مطلب..."
                />
              </FormItem>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane key="related" tab="محصولات مرتبط">
            <Card size="small" :bordered="false">
              <FormItem label="محصولات مرتبط">
                <Select
                  v-model:value="model.relatedProductIds"
                  mode="multiple"
                  :options="productOptions"
                  :max-tag-count="4"
                  allow-clear
                  show-search
                  option-filter-prop="label"
                  placeholder="حداکثر ۸ محصول"
                />
              </FormItem>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane key="seo" tab="سئو">
            <Card size="small" :bordered="false">
              <SeoFieldsForm
                v-model:seo-title="model.seoTitle"
                v-model:seo-description="model.seoDescription"
                v-model:og-image="model.ogImage"
                :fallback-title="model.title"
                :fallback-description="model.excerpt"
                :path-preview="model.slug ? `/mag/${model.slug}` : '/mag/…'"
              />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Spin>

    <div class="magazine-form-page__footer">
      <Space>
        <Button @click="goBack">انصراف</Button>
        <Button
          v-if="canSubmit"
          type="primary"
          :loading="saving"
          @click="onSave"
        >
          <template #icon>
            <SaveOutlined />
          </template>
          ذخیره
        </Button>
      </Space>
    </div>
  </div>
</template>

<style scoped>
.magazine-form-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px);
  padding-bottom: 72px;
}

.magazine-form-page__header {
  margin-bottom: 16px;
}

.magazine-form-page__body {
  max-width: 960px;
}

.magazine-form-page__footer {
  position: sticky;
  bottom: 0;
  z-index: 10;
  margin-top: auto;
  margin-inline: -24px;
  margin-bottom: -24px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.96);
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(6px);
}
</style>
