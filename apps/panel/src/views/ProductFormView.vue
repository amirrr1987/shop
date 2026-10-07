<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  FormItem,
  FormItemRest,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Switch,
  Tabs,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import {
  ArrowRightOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import {
  PRODUCT_PRICE_MODE_LABELS_FA,
  PRODUCT_PRICE_MODES,
} from '@shop/shared'
import type {
  Brand,
  Category,
  CreateProductInput,
  Product,
  ProductPriceMode,
  ProductSpec,
  ProductUnit,
} from '@shop/shared'
import type { AppAbility } from '@/ability'
import ProductImageField from '@/components/ProductImageField.vue'
import SeoFieldsForm from '@/components/SeoFieldsForm.vue'
import { api, ApiError } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { useMoneyAmount } from '@/composables/useMoneyAmount'
import { slugify } from '@/utils/slugify'

const TextArea = Input.TextArea

type VariantForm = {
  id?: string
  sku: string
  label: string
  optionsText: string
  price: number | null
  stock: number
  isActive: boolean
}

type ProductForm = {
  name: string
  slug: string
  description: string
  price: number
  stock: number
  categoryId: string | null
  brandId: string | null
  unitId: string | null
  images: string[]
  isActive: boolean
  isFeatured: boolean
  priceMode: ProductPriceMode
  salePrice: number | null
  saleEndsAt: Dayjs | null
  specs: ProductSpec[]
  videoUrl: string
  variants: VariantForm[]
  seoTitle: string | null
  seoDescription: string | null
  ogImage: string | null
}

const ability = useAbility<AppAbility>()
const route = useRoute()
const router = useRouter()
const { unitLabel, display, storage, inputStep, inputPrecision } =
  useMoneyAmount()
const queryClient = useQueryClient()
const saving = ref(false)
const formRef = ref<FormInstance>()
const activeTab = ref('basic')

const editingId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' && id.length ? id : null
})
const isEdit = computed(() => Boolean(editingId.value))

const model = reactive<ProductForm>({
  name: '',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: null,
  brandId: null,
  unitId: null,
  images: [],
  isActive: true,
  isFeatured: false,
  priceMode: 'fixed',
  salePrice: null,
  saleEndsAt: null,
  specs: [],
  videoUrl: '',
  variants: [],
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
})

const rules: Record<keyof ProductForm, RuleObject | RuleObject[]> = {
  name: [{ required: true, message: 'وارد کردن نام الزامی است' }],
  slug: [{ required: true, message: 'وارد کردن اسلاگ الزامی است' }],
  description: [],
  price: [{ required: true, type: 'number', min: 0, message: 'قیمت الزامی است' }],
  stock: [{ required: true, type: 'number', min: 0, message: 'موجودی الزامی است' }],
  categoryId: [],
  brandId: [],
  unitId: [],
  images: [],
  isActive: [],
  isFeatured: [],
  priceMode: [],
  salePrice: [],
  saleEndsAt: [],
  specs: [],
  videoUrl: [],
  variants: [],
  seoTitle: [],
  seoDescription: [],
  ogImage: [],
}

const priceModeOptions = PRODUCT_PRICE_MODES.map((value) => ({
  label: PRODUCT_PRICE_MODE_LABELS_FA[value],
  value,
}))

const {
  data: productData,
  isPending: productPending,
  error: productError,
} = useQuery({
  queryKey: computed(() =>
    editingId.value
      ? queryKeys.product(editingId.value)
      : (['products', 'new'] as const),
  ),
  queryFn: () => api<Product>(`/products/admin/${editingId.value}`),
  enabled: computed(() => Boolean(editingId.value)),
})

const { data: categoriesData } = useQuery({
  queryKey: queryKeys.categories,
  queryFn: () => api<Category[]>('/categories'),
})

const { data: brandsData } = useQuery({
  queryKey: queryKeys.brands,
  queryFn: () => api<Brand[]>('/brands'),
})

const { data: unitsData } = useQuery({
  queryKey: queryKeys.productUnits,
  queryFn: () => api<ProductUnit[]>('/product-units/admin'),
})

const categoryOptions = computed(() =>
  (categoriesData.value ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  })),
)
const brandOptions = computed(() =>
  (brandsData.value ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  })),
)
const unitOptions = computed(() =>
  (unitsData.value ?? [])
    .filter((item) => item.isActive || item.id === model.unitId)
    .map((item) => ({
      label: `${item.name} (${item.symbol})`,
      value: item.id,
    })),
)

const pageReady = computed(() => !isEdit.value || !productPending.value)

function formatOptions(options: Record<string, string> | undefined) {
  if (!options) return ''
  return Object.entries(options)
    .map(([key, value]) => `${key}:${value}`)
    .join(', ')
}

function parseOptions(text: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const part of text.split(/[,;\n]+/)) {
    const sep = part.indexOf(':')
    if (sep <= 0) continue
    const key = part.slice(0, sep).trim()
    const value = part.slice(sep + 1).trim()
    if (key && value) out[key] = value
  }
  return out
}

function resetModel() {
  model.name = ''
  model.slug = ''
  model.description = ''
  model.price = 0
  model.stock = 0
  model.categoryId = null
  model.brandId = null
  model.unitId =
    unitsData.value?.find((item) => item.slug === 'piece')?.id ?? null
  model.images = []
  model.isActive = true
  model.isFeatured = false
  model.priceMode = 'fixed'
  model.salePrice = null
  model.saleEndsAt = null
  model.specs = []
  model.videoUrl = ''
  model.variants = []
  model.seoTitle = null
  model.seoDescription = null
  model.ogImage = null
}

function fillFromProduct(row: Product) {
  model.name = row.name
  model.slug = row.slug
  model.description = row.description
  model.price = display(row.price)
  model.stock = row.stock
  model.categoryId = row.categoryId
  model.brandId = row.brandId
  model.unitId = row.unitId ?? null
  model.images = [...row.images]
  model.isActive = row.isActive
  model.isFeatured = row.isFeatured
  model.priceMode = row.priceMode ?? 'fixed'
  model.salePrice =
    row.salePrice === null || row.salePrice === undefined
      ? null
      : display(row.salePrice)
  model.saleEndsAt = row.saleEndsAt ? dayjs(row.saleEndsAt) : null
  model.specs = (row.specs ?? []).map((item) => ({
    key: item.key,
    value: item.value,
  }))
  model.videoUrl = row.videoUrl || ''
  model.variants = (row.variants ?? []).map((item) => ({
    id: item.id,
    sku: item.sku,
    label: item.label,
    optionsText: formatOptions(item.options),
    price:
      item.price === null || item.price === undefined
        ? null
        : display(item.price),
    stock: item.stock,
    isActive: item.isActive,
  }))
  model.seoTitle = row.seoTitle ?? null
  model.seoDescription = row.seoDescription ?? null
  model.ogImage = row.ogImage ?? null
}

watch(
  productData,
  (row) => {
    if (editingId.value && row) fillFromProduct(row)
  },
  { immediate: true },
)

watch(
  [editingId, unitsData],
  () => {
    if (!editingId.value) resetModel()
  },
  { immediate: true },
)

watch(productError, (value) => {
  if (value) {
    message.error(
      value instanceof ApiError ? value.message : 'بارگذاری محصول ناموفق بود',
    )
    void router.replace({ name: 'products' })
  }
})

const saveMutation = useMutation({
  mutationFn: async (payload: CreateProductInput) => {
    if (editingId.value) {
      return api(`/products/${editingId.value}`, {
        method: 'PATCH',
        body: payload,
      })
    }
    return api('/products', { method: 'POST', body: payload })
  },
  onSuccess: async () => {
    message.success(isEdit.value ? 'محصول به‌روزرسانی شد' : 'محصول ایجاد شد')
    await queryClient.invalidateQueries({ queryKey: ['products'] })
    await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
    await router.push({ name: 'products' })
  },
  onError: (err) => {
    message.error(err instanceof ApiError ? err.message : 'ذخیره ناموفق بود')
  },
})

function onNameBlur() {
  if (!isEdit.value && !model.slug) {
    model.slug = slugify(model.name)
  }
}

function addVariant() {
  model.variants.push({
    sku: '',
    label: '',
    optionsText: '',
    price: null,
    stock: 0,
    isActive: true,
  })
}

function removeVariant(index: number) {
  model.variants.splice(index, 1)
}

function addSpec() {
  if (model.specs.length >= 40) {
    message.warning('حداکثر ۴۰ مشخصه')
    return
  }
  model.specs.push({ key: '', value: '' })
}

function removeSpec(index: number) {
  model.specs.splice(index, 1)
}

function applyCategorySpecTemplate(categoryId: string | null) {
  if (!categoryId) return
  const category = (categoriesData.value ?? []).find(
    (item) => item.id === categoryId,
  )
  const keys = [...(category?.specKeys ?? [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )
  if (!keys.length) return

  const existing = new Map(
    model.specs
      .filter((item) => item.key.trim())
      .map((item) => [item.key.trim(), item.value]),
  )
  model.specs = keys.map((item) => ({
    key: item.key,
    value: existing.get(item.key) ?? '',
  }))
  for (const [key, value] of existing) {
    if (!keys.some((item) => item.key === key)) {
      model.specs.push({ key, value })
    }
  }
}

function onCategoryChange(value: unknown) {
  const next = (value as string | null) ?? null
  model.categoryId = next
  applyCategorySpecTemplate(next)
}

function toPayload(): CreateProductInput {
  const salePrice =
    model.priceMode === 'fixed' && model.salePrice != null
      ? storage(model.salePrice)
      : null
  const saleEndsAt =
    model.priceMode === 'fixed' && model.saleEndsAt
      ? model.saleEndsAt.toISOString()
      : null

  return {
    name: model.name,
    slug: model.slug,
    description: model.description,
    price: storage(model.price),
    stock: model.stock,
    categoryId: model.categoryId,
    brandId: model.brandId,
    unitId: model.unitId,
    images: model.images,
    isActive: model.isActive,
    isFeatured: model.isFeatured,
    priceMode: model.priceMode,
    condition: 'new',
    salePrice,
    saleEndsAt,
    specs: model.specs
      .map((item) => ({
        key: item.key.trim(),
        value: item.value.trim(),
      }))
      .filter((item) => item.key && item.value),
    videoUrl: model.videoUrl.trim(),
    variants: model.variants.map((item) => ({
      id: item.id,
      sku: item.sku.trim(),
      label: item.label.trim(),
      options: parseOptions(item.optionsText),
      price:
        item.price === null || item.price === undefined
          ? null
          : storage(item.price),
      stock: item.stock,
      isActive: item.isActive,
    })),
    seoTitle: model.seoTitle,
    seoDescription: model.seoDescription,
    ogImage: model.ogImage,
  }
}

async function onSave() {
  try {
    await formRef.value?.validate()
  } catch {
    activeTab.value = 'basic'
    message.warning('فیلدهای الزامی را کامل کنید')
    return
  }
  saving.value = true
  try {
    await saveMutation.mutateAsync(toPayload())
  } catch {
    // message shown in mutation onError
  } finally {
    saving.value = false
  }
}

function goBack() {
  void router.push({ name: 'products' })
}

const canSubmit = computed(() =>
  isEdit.value
    ? ability.can('update', 'Product')
    : ability.can('create', 'Product'),
)
</script>

<template>
  <div class="product-form-page">
    <Breadcrumb style="margin-bottom: 12px">
      <Breadcrumb.Item>
        <a @click.prevent="goBack">محصولات</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {{ isEdit ? 'ویرایش' : 'افزودن' }}
      </Breadcrumb.Item>
    </Breadcrumb>

    <div class="product-form-page__header">
      <Space align="center">
        <Button type="text" @click="goBack">
          <template #icon>
            <ArrowRightOutlined />
          </template>
        </Button>
        <TypographyTitle :level="3" style="margin: 0">
          {{ isEdit ? 'ویرایش محصول' : 'افزودن محصول' }}
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
        class="product-form-page__body"
      >
        <Tabs v-model:active-key="activeTab">
          <Tabs.TabPane key="basic" tab="اطلاعات پایه">
            <Card size="small" :bordered="false">
              <FormItem label="نام" name="name">
                <Input v-model:value="model.name" @blur="onNameBlur" />
              </FormItem>
              <FormItem label="اسلاگ" name="slug">
                <Input v-model:value="model.slug" dir="ltr" />
              </FormItem>
              <FormItem label="توضیحات" name="description">
                <TextArea v-model:value="model.description" :rows="4" />
              </FormItem>
              <Space wrap style="width: 100%">
                <FormItem label="دسته" name="categoryId" style="min-width: 220px">
                  <Select
                    :value="model.categoryId"
                    allow-clear
                    :options="categoryOptions"
                    placeholder="اختیاری"
                    style="width: 220px"
                    @change="onCategoryChange"
                  />
                </FormItem>
                <FormItem label="برند" name="brandId" style="min-width: 220px">
                  <Select
                    v-model:value="model.brandId"
                    allow-clear
                    :options="brandOptions"
                    placeholder="اختیاری"
                    style="width: 220px"
                  />
                </FormItem>
                <FormItem label="واحد فروش" name="unitId" style="min-width: 220px">
                  <Select
                    v-model:value="model.unitId"
                    allow-clear
                    :options="unitOptions"
                    placeholder="عدد"
                    style="width: 220px"
                  />
                </FormItem>
              </Space>
              <FormItem
                label="تصاویر"
                name="images"
                extra="برش مربعی و آپلود — حداکثر ۸ تصویر"
              >
                <ProductImageField v-model:images="model.images" />
              </FormItem>
              <FormItem
                label="ویدیو محصول"
                name="videoUrl"
                extra="لینک YouTube / آپارات / فایل mp4"
              >
                <Input
                  v-model:value="model.videoUrl"
                  dir="ltr"
                  placeholder="https://..."
                />
              </FormItem>
              <Space size="large">
                <FormItem label="نمایش در فروشگاه" name="isActive">
                  <Switch v-model:checked="model.isActive" />
                </FormItem>
                <FormItem label="محصول ویژه" name="isFeatured">
                  <Switch v-model:checked="model.isFeatured" />
                </FormItem>
              </Space>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane key="pricing" tab="قیمت و موجودی">
            <Card size="small" :bordered="false">
              <FormItem label="حالت قیمت" name="priceMode">
                <Select
                  v-model:value="model.priceMode"
                  :options="priceModeOptions"
                  style="max-width: 280px"
                />
              </FormItem>
              <FormItem
                v-if="model.priceMode === 'fixed'"
                :label="`قیمت (${unitLabel})`"
                name="price"
              >
                <InputNumber
                  v-model:value="model.price"
                  :min="0"
                  :step="inputStep"
                  :precision="inputPrecision"
                  style="width: 280px"
                />
              </FormItem>
              <FormItem
                v-else
                :label="`قیمت مرجع (${unitLabel})`"
                name="price"
                extra="برای کالاهای «تماس بگیرید» هم یک مبلغ مرجع نگه دارید"
              >
                <InputNumber
                  v-model:value="model.price"
                  :min="0"
                  :step="inputStep"
                  :precision="inputPrecision"
                  style="width: 280px"
                />
              </FormItem>
              <template v-if="model.priceMode === 'fixed'">
                <FormItem
                  :label="`قیمت فروش ویژه (${unitLabel})`"
                  name="salePrice"
                  extra="خالی = بدون تخفیف زمان‌دار"
                >
                  <InputNumber
                    v-model:value="model.salePrice"
                    :min="0"
                    :step="inputStep"
                    :precision="inputPrecision"
                    style="width: 280px"
                  />
                </FormItem>
                <FormItem label="پایان تخفیف" name="saleEndsAt">
                  <DatePicker
                    v-model:value="model.saleEndsAt"
                    show-time
                    style="width: 280px"
                    placeholder="اختیاری"
                  />
                </FormItem>
              </template>
              <FormItem
                label="موجودی"
                name="stock"
                :extra="
                  model.variants.length
                    ? 'با واریانت، مجموع موجودی واریانت‌های فعال ذخیره می‌شود'
                    : undefined
                "
              >
                <InputNumber
                  v-model:value="model.stock"
                  :min="0"
                  :disabled="model.variants.length > 0"
                  style="width: 280px"
                />
              </FormItem>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane key="specs" tab="مشخصات">
            <Card size="small" :bordered="false">
              <FormItem
                label="ویژگی‌ها / مشخصات"
                name="specs"
                extra="آزاد برای هر نوع کالا — مثلاً جنس: نخی · وزن: ۲۰۰ گرم"
              >
                <FormItemRest>
                  <div style="display: flex; flex-direction: column; gap: 8px">
                    <Space
                      v-for="(spec, index) in model.specs"
                      :key="index"
                      style="width: 100%"
                    >
                      <Input
                        v-model:value="spec.key"
                        placeholder="نام ویژگی"
                        style="width: 180px"
                      />
                      <Input
                        v-model:value="spec.value"
                        placeholder="مقدار"
                        style="flex: 1; min-width: 200px"
                      />
                      <Button danger type="link" @click="removeSpec(index)">
                        حذف
                      </Button>
                    </Space>
                    <Button type="dashed" block @click="addSpec">
                      <template #icon>
                        <PlusOutlined />
                      </template>
                      افزودن ویژگی
                    </Button>
                  </div>
                </FormItemRest>
              </FormItem>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane key="variants" tab="واریانت‌ها">
            <Card size="small" :bordered="false">
              <FormItem
                label="واریانت / SKU"
                extra="گزینه‌های فروش مثل رنگ:مشکی یا سایز:L"
              >
                <FormItemRest>
                  <div style="display: flex; flex-direction: column; gap: 12px">
                    <div
                      v-for="(variant, index) in model.variants"
                      :key="variant.id || index"
                      class="product-form-page__variant"
                    >
                      <Space direction="vertical" style="width: 100%">
                        <Space wrap>
                          <Input
                            v-model:value="variant.sku"
                            placeholder="SKU"
                            style="width: 140px"
                          />
                          <Input
                            v-model:value="variant.label"
                            placeholder="برچسب (مثلاً قرمز / L)"
                            style="width: 200px"
                          />
                          <InputNumber
                            v-model:value="variant.price"
                            :min="0"
                            :step="inputStep"
                            :precision="inputPrecision"
                            :placeholder="`قیمت (${unitLabel}) اختیاری`"
                            style="width: 160px"
                          />
                          <InputNumber
                            v-model:value="variant.stock"
                            :min="0"
                            placeholder="موجودی"
                            style="width: 110px"
                          />
                          <Switch
                            v-model:checked="variant.isActive"
                            checked-children="فعال"
                            un-checked-children="خاموش"
                          />
                          <Button
                            danger
                            type="link"
                            @click="removeVariant(index)"
                          >
                            حذف
                          </Button>
                        </Space>
                        <Input
                          v-model:value="variant.optionsText"
                          placeholder="گزینه‌ها: رنگ:مشکی, سایز:L"
                        />
                      </Space>
                    </div>
                    <Button type="dashed" block @click="addVariant">
                      <template #icon>
                        <PlusOutlined />
                      </template>
                      افزودن واریانت
                    </Button>
                  </div>
                </FormItemRest>
              </FormItem>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane key="seo" tab="سئو">
            <Card size="small" :bordered="false">
              <SeoFieldsForm
                v-model:seo-title="model.seoTitle"
                v-model:seo-description="model.seoDescription"
                v-model:og-image="model.ogImage"
                :fallback-title="model.name"
                :fallback-description="model.description"
                :path-preview="
                  model.slug ? `/products/${model.slug}` : '/products/…'
                "
              />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Spin>

    <div class="product-form-page__footer">
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
.product-form-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px);
  padding-bottom: 72px;
}

.product-form-page__header {
  margin-bottom: 16px;
}

.product-form-page__body {
  max-width: 960px;
}

.product-form-page__variant {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
}

.product-form-page__footer {
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
