<template>
  <Modal
    v-model:open="open"
    :title="'id' in selectedProduct ? 'ویرایش محصول' : 'افزودن محصول'"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    :confirmLoading="isLoading"
    width="700px"
  >
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <FormItem label="تصویر" name="image" required>
        <MediaInput v-model="formImage" :accept="[MediaType.IMAGE]" />
      </FormItem>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="نام" name="name" required>
            <Input v-model:value="form.name" placeholder="نام محصول" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="اسلاگ" name="slug" required>
            <Input v-model:value="form.slug" placeholder="slug-example" dir="ltr" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="8">
          <FormItem label="قیمت (تومان)" name="price" required>
            <InputNumber v-model:value="form.price" :min="1" class="w-full!" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="قیمت تخفیف‌خورده" name="discountPrice">
            <InputNumber v-model:value="form.discountPrice" :min="0" class="w-full!" placeholder="اختیاری" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="موجودی" name="stock">
            <InputNumber v-model:value="form.stock" :min="0" class="w-full!" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="دسته‌بندی‌ها" name="categoryIds">
            <Select
              v-model:value="form.categoryIds"
              mode="multiple"
              placeholder="انتخاب دسته‌بندی‌ها"
              allowClear
              showSearch
              optionFilterProp="label"
              :options="categoryOptions"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="تگ‌ها" name="tagIds">
            <Select
              v-model:value="form.tagIds"
              mode="multiple"
              placeholder="انتخاب تگ‌ها"
              allowClear
              showSearch
              optionFilterProp="label"
              :options="tagOptions"
            />
          </FormItem>
        </Col>
      </Row>

      <FormItem label="وضعیت" name="isActive">
        <Switch v-model:checked="form.isActive" checked-children="فعال" un-checked-children="غیرفعال" />
      </FormItem>

      <FormItem label="توضیحات" name="description">
        <Textarea v-model:value="form.description" placeholder="توضیحات محصول" :rows="4" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { CreateProduct, UpdateProduct, Product } from '@/models/product.model'
import { useCategoryStore } from '@/stores/category.store'
import { useTagStore } from '@/stores/tag.store'
import {
  Modal,
  Form,
  FormItem,
  Input,
  InputNumber,
  Textarea,
  Select,
  Switch,
  Row,
  Col,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, watch, computed, onMounted } from 'vue'
import MediaInput from './MediaInput.vue'
import { MediaType } from '@/models/media.model'

const open = defineModel<boolean>('open', { required: true })
const isLoading = defineModel<boolean>('isLoading', { required: true })

const selectedProduct = defineModel<CreateProduct | UpdateProduct>('selectedProduct', {
  required: true,
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const categoryStore = useCategoryStore()
const tagStore = useTagStore()

const formRef = ref<FormInstance>()

const categoryOptions = computed(() =>
  categoryStore.categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  })),
)

const tagOptions = computed(() =>
  tagStore.tags.map((tag) => ({
    value: tag.id,
    label: tag.title,
  })),
)

const rules: Record<string, Rule[]> = {
  image: [
    {
      required: true,
      message: 'تصویر محصول الزامی است',
      trigger: 'change',
      validator: (_rule, value) => {
        if (!value || value === '') {
          return Promise.reject('تصویر محصول الزامی است')
        }
        return Promise.resolve()
      },
    },
  ],
  name: [
    { required: true, message: 'نام محصول الزامی است', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: 'اسلاگ محصول الزامی است', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: 'اسلاگ باید شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد',
      trigger: 'blur',
    },
  ],
  price: [
    { required: true, message: 'قیمت الزامی است', trigger: 'blur' },
    {
      type: 'number',
      min: 1,
      message: 'قیمت باید عددی مثبت باشد',
      trigger: 'blur',
    },
  ],
  description: [
    {
      min: 3,
      message: 'توضیحات باید حداقل ۳ کاراکتر باشد',
      trigger: 'blur',
    },
  ],
}

const emptyProduct = (): CreateProduct | UpdateProduct =>
  ({
    name: '',
    slug: '',
    price: 0,
    discountPrice: null,
    description: '',
    image: '',
    stock: 0,
    isActive: true,
    tagIds: [],
    categoryIds: [],
  }) as CreateProduct | UpdateProduct

const form = ref<CreateProduct | UpdateProduct>(emptyProduct())

const formImage = computed({
  get: () => form.value.image || '',
  set: (value: string) => {
    form.value.image = value
    formRef.value?.validateFields(['image'])
  },
})

// Helper to extract IDs from product relations
const extractIds = (product: CreateProduct | UpdateProduct): CreateProduct | UpdateProduct => {
  const result = { ...product }
  
  // If editing an existing product, extract tag and category IDs
  if ('id' in product) {
    const fullProduct = product as unknown as Product
    if (fullProduct.tags && !result.tagIds?.length) {
      result.tagIds = fullProduct.tags.map((t) => t.id)
    }
    if (fullProduct.categories && !result.categoryIds?.length) {
      result.categoryIds = fullProduct.categories.map((c) => c.id)
    }
  }
  
  return result
}

watch(
  selectedProduct,
  (value) => {
    const extracted = extractIds(value)
    form.value = { ...emptyProduct(), ...extracted }
    formRef.value?.clearValidate()
  },
  { immediate: true },
)

const handleOk = async () => {
  try {
    await formRef.value?.validate()
    selectedProduct.value = { ...form.value }
    emits('submit')
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleCancel = () => {
  form.value = emptyProduct()
  formRef.value?.clearValidate()
  emits('cancel')
}

onMounted(() => {
  // Load categories and tags if not already loaded
  if (!categoryStore.categories.length) {
    categoryStore.getCategories()
  }
  if (!tagStore.tags.length) {
    tagStore.getTags()
  }
})
</script>
