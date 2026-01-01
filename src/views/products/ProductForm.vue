<template>
  <Card :title="isEditMode ? 'ویرایش محصول' : 'افزودن محصول'">
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem label="تصویر" name="image" required>
          <MediaInput v-model="formImage" :accept="[MediaType.IMAGE]" />
        </FormItem>
        <div class="grid grid-cols-2 md:grid-cols-12 gap-4">
          <FormItem label="نام" name="name" required class="col-span-6">
            <Input v-model:value="form.name" placeholder="نام محصول" />
          </FormItem>
          <FormItem label="اسلاگ" name="slug" required class="col-span-6">
            <Input v-model:value="form.slug" placeholder="slug-example" dir="ltr" />
          </FormItem>
          <FormItem label="قیمت (تومان)" name="price" required class="col-span-4">
            <InputNumber v-model:value="form.price" :min="1" class="w-full!" />
          </FormItem>
          <FormItem label="قیمت تخفیف‌خورده" name="discountPrice" class="col-span-4">
            <InputNumber
              :value="form.discountPrice ?? undefined"
              @update:value="(val) => (form.discountPrice = typeof val === 'number' ? val : null)"
              :min="0"
              class="w-full!"
              placeholder="اختیاری"
            />
          </FormItem>
          <FormItem label="موجودی" name="stock" class="col-span-4">
            <InputNumber v-model:value="form.stock" :min="0" class="w-full!" />
          </FormItem>
          <FormItem label="دسته‌بندی‌ها" name="categoryIds" class="col-span-4">
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
          <FormItem label="تگ‌ها" name="tagIds" class="col-span-4">
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

          <FormItem label="وضعیت" name="isActive" class="col-span-4">
            <Switch
              v-model:checked="form.isActive"
              checked-children="فعال"
              un-checked-children="غیرفعال"
            />
          </FormItem>

          <FormItem label="توضیحات" name="description" class="col-span-12">
            <Textarea
              :value="form.description ?? ''"
              @update:value="(val) => (form.description = val || '')"
              placeholder="توضیحات محصول"
              :rows="4"
            />
          </FormItem>

          <Space class="col-span-12">
            <Button type="primary" :loading="productStore.loading" @click="handleSubmit">
              {{ isEditMode ? 'ذخیره تغییرات' : 'ایجاد محصول' }}
            </Button>
            <Button class="ml-2" @click="handleCancel">انصراف</Button>
          </Space>
        </div>
      </div>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import type { CreateProduct, UpdateProduct, Product } from '@/models/product.model'
import { useCategoryStore } from '@/stores/category.store'
import { useTagStore } from '@/stores/tag.store'
import { useProductStore } from '@/stores/product.store'
import {
  Card,
  Form,
  FormItem,
  Input,
  InputNumber,
  Textarea,
  Select,
  Switch,
  Row,
  Col,
  Button,
  message,
  Space,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MediaInput from './components/MediaInput.vue'
import { MediaType } from '@/models/media.model'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const tagStore = useTagStore()

const isEditMode = computed(() => !!route.params.id)
const productId = computed(() => route.params.id as string)

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
  name: [{ required: true, message: 'نام محصول الزامی است', trigger: 'blur' }],
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
      validator: (_rule, value) => {
        if (value && value.length > 0 && value.length < 3) {
          return Promise.reject('توضیحات باید حداقل ۳ کاراکتر باشد')
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
}

const emptyProduct = (): CreateProduct => ({
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
})

const form = ref<CreateProduct | UpdateProduct>(emptyProduct())

const formImage = computed({
  get: () => form.value.image || '',
  set: (value: string) => {
    form.value.image = value
    formRef.value?.validateFields(['image'])
  },
})

// Helper to extract IDs from product relations
const extractIds = (product: Product): CreateProduct | UpdateProduct => {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    discountPrice: product.discountPrice,
    description: product.description || '',
    image: product.image,
    stock: product.stock,
    isActive: product.isActive,
    tagIds: product.tags?.map((t) => t.id) || [],
    categoryIds: product.categories?.map((c) => c.id) || [],
  }
}

const loadProduct = async () => {
  if (isEditMode.value && productId.value) {
    try {
      const product = await productStore.getProduct(productId.value)
      if (product) {
        form.value = extractIds(product)
      }
    } catch (error) {
      console.error('Failed to load product:', error)
      message.error('خطا در بارگذاری محصول')
    }
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (isEditMode.value) {
      await productStore.updateProduct(form.value as UpdateProduct)
      message.success('محصول با موفقیت ویرایش شد')
    } else {
      await productStore.createProduct(form.value as CreateProduct)
      message.success('محصول با موفقیت ثبت شد')
    }

    router.push({ name: 'TheProductList' })
  } catch (error) {
    console.error('Form validation or submission failed:', error)
  }
}

const handleCancel = () => {
  router.push({ name: 'TheProductList' })
}

onMounted(async () => {
  // Load categories and tags if not already loaded
  if (!categoryStore.categories.length) {
    await categoryStore.getCategories()
  }
  if (!tagStore.tags.length) {
    await tagStore.getTags()
  }

  // Load product if editing
  await loadProduct()
})
</script>
