<template>
  <Card :title="isEditMode ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی'">
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <FormItem label="نام" name="name" required>
        <Input v-model:value="form.name" placeholder="نام دسته‌بندی را وارد کنید" />
      </FormItem>

      <FormItem label="اسلاگ" name="slug" required>
        <Input v-model:value="form.slug" placeholder="slug-example" dir="ltr" />
      </FormItem>

      <FormItem label="دسته‌بندی والد" name="parentId">
        <Select
          v-model:value="form.parentId"
          placeholder="انتخاب دسته‌بندی والد (اختیاری)"
          allowClear
          showSearch
          optionFilterProp="label"
          :options="parentOptions"
        />
      </FormItem>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="ترتیب نمایش" name="sortOrder">
            <InputNumber v-model:value="form.sortOrder" :min="0" class="w-full!" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="وضعیت" name="isActive">
            <Switch
              v-model:checked="form.isActive"
              checked-children="فعال"
              un-checked-children="غیرفعال"
            />
          </FormItem>
        </Col>
      </Row>

      <FormItem label="تصویر" name="image">
        <Input v-model:value="form.image" placeholder="آدرس تصویر (اختیاری)" dir="ltr" />
      </FormItem>

      <FormItem label="توضیحات" name="description">
        <Textarea
          v-model:value="form.description"
          placeholder="توضیحات دسته‌بندی (اختیاری)"
          :rows="4"
        />
      </FormItem>
      <Divider />
      <Space>
        <Button type="primary" :loading="categoryStore.loading" @click="handleSubmit">
          {{ isEditMode ? 'ذخیره تغییرات' : 'ایجاد دسته‌بندی' }}
        </Button>
        <Button class="ml-2" @click="handleCancel">انصراف</Button>
      </Space>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import type { CreateCategory, UpdateCategory } from '@/models/category.model'
import { useCategoryStore } from '@/stores/category.store'
import {
  Card,
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  InputNumber,
  Switch,
  Row,
  Col,
  Button,
  message,
  Space,
  Divider,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()

const isEditMode = computed(() => !!route.params.id)
const categoryId = computed(() => route.params.id as string)

const formRef = ref<FormInstance>()

// Filter out current category from parent options to prevent self-reference
const parentOptions = computed(() => {
  const currentId = categoryId.value
  return categoryStore.categories
    .filter((cat) => cat.id !== currentId)
    .map((cat) => ({
      value: cat.id,
      label: cat.name,
    }))
})

const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'نام دسته‌بندی الزامی است', trigger: 'blur' },
    { min: 1, message: 'نام دسته‌بندی الزامی است', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: 'اسلاگ دسته‌بندی الزامی است', trigger: 'blur' },
    { min: 1, message: 'اسلاگ دسته‌بندی الزامی است', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: 'اسلاگ باید شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد',
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

const emptyCategory = (): CreateCategory => ({
  name: '',
  slug: '',
  description: '',
  image: '',
  isActive: true,
  sortOrder: 0,
  parentId: undefined,
})

const form = ref<CreateCategory | UpdateCategory>(emptyCategory())

const loadCategory = async () => {
  if (isEditMode.value && categoryId.value) {
    try {
      const category = await categoryStore.getCategory(categoryId.value)
      if (category) {
        form.value = {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          image: category.image || '',
          isActive: category.isActive,
          sortOrder: category.sortOrder,
          parentId: category.parentId,
        } as UpdateCategory
      }
    } catch (error) {
      console.error('Failed to load category:', error)
      message.error('خطا در بارگذاری دسته‌بندی')
    }
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (isEditMode.value) {
      await categoryStore.updateCategory(form.value as UpdateCategory)
      message.success('دسته‌بندی با موفقیت ویرایش شد')
    } else {
      await categoryStore.createCategory(form.value as CreateCategory)
      message.success('دسته‌بندی با موفقیت ثبت شد')
    }

    router.push({ name: 'TheCategoryList' })
  } catch (error) {
    console.error('Form validation or submission failed:', error)
  }
}

const handleCancel = () => {
  router.push({ name: 'TheCategoryList' })
}

onMounted(async () => {
  await categoryStore.getCategories()
  await loadCategory()
})
</script>
