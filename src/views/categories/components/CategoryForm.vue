<template>
  <Modal
    v-model:open="open"
    :title="'id' in selectedCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی'"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
  >
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <FormItem label="نام" name="name" required>
        <Input v-model:value="form.name" placeholder="نام دسته‌بندی را وارد کنید" />
      </FormItem>

      <FormItem label="اسلاگ" name="slug" required>
        <Input v-model:value="form.slug" placeholder="slug-example" dir="ltr" />
      </FormItem>

      <FormItem label="توضیحات" name="description">
        <Textarea
          v-model:value="form.description"
          placeholder="توضیحات دسته‌بندی (اختیاری)"
          :rows="4"
        />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { CreateCategory, UpdateCategory } from '@/models/category.model'
import { Modal, Form, FormItem, Input, Textarea } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, watch } from 'vue'

const open = defineModel<boolean>('open', { required: true })
const selectedCategory = defineModel<CreateCategory | UpdateCategory>('selectedCategory', {
  required: true,
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInstance>()

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
      min: 3,
      message: 'توضیحات باید حداقل ۳ کاراکتر باشد',
      trigger: 'blur',
    },
  ],
}

const emptyCategory = (): CreateCategory | UpdateCategory =>
  ({
    name: '',
    slug: '',
    description: '',
  }) as CreateCategory | UpdateCategory

const form = ref<CreateCategory | UpdateCategory>(emptyCategory())

watch(
  selectedCategory,
  (value) => {
    form.value = { ...value }
    formRef.value?.clearValidate()
  },
  { immediate: true },
)

const handleOk = async () => {
  try {
    await formRef.value?.validate()
    selectedCategory.value = { ...form.value }
    emits('submit')
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleCancel = () => {
  form.value = emptyCategory()
  formRef.value?.clearValidate()
  emits('cancel')
}
</script>

