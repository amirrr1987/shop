<template>
  <Modal
    v-model:open="open"
    :title="'id' in selectedProduct ? 'ویرایش محصول' : 'افزودن محصول'"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    :confirmLoading="isLoading"
  >
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <FormItem label="تصویر" name="image" required>
        <MediaInput v-model="formImage" :accept="[MediaType.IMAGE]" />
      </FormItem>
      <FormItem label="نام" name="name" required>
        <Input v-model:value="form.name" />
      </FormItem>

      <FormItem label="قیمت" name="price" required>
        <InputNumber v-model:value="form.price" type="number" min="0" step="1" class="w-full!" />
      </FormItem>
      <FormItem label="توضیحات" name="description">
        <Textarea v-model:value="form.description" />
      </FormItem>
    </Form>
  </Modal>
</template>
<script setup lang="ts">
import type { CreateProduct, UpdateProduct } from '@/models/product.model'
import { Modal, Form, FormItem, Input, InputNumber, Textarea } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, watch, computed } from 'vue'
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

const formRef = ref<FormInstance>()

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
      validateTrigger: 'change',
    },
  ],
  name: [
    { required: true, message: 'نام محصول الزامی است', trigger: 'blur' },
    { min: 1, message: 'نام محصول الزامی است', trigger: 'blur' },
  ],
  price: [
    { required: true, message: 'قیمت باید عدد صحیح باشد', trigger: 'blur' },
    {
      type: 'number',
      min: 1,
      message: 'قیمت باید عددی مثبت باشد',
      trigger: 'blur',
      validator: (_rule, value) => {
        if (value === null || value === undefined || value === '' || isNaN(Number(value))) {
          return Promise.reject('قیمت باید عدد صحیح باشد')
        }
        if (!Number.isInteger(value)) {
          return Promise.reject('قیمت باید عدد صحیح باشد')
        }
        if (value <= 0) {
          return Promise.reject('قیمت باید عددی مثبت باشد')
        }
        return Promise.resolve()
      },
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
    price: 0,
    description: '',
    image: '',
  }) as CreateProduct | UpdateProduct

const form = ref<CreateProduct | UpdateProduct>(emptyProduct())

const formImage = computed({
  get: () => form.value.image || '',
  set: (value: string) => {
    form.value.image = value
    // Trigger validation for image field when value changes
    formRef.value?.validateFields(['image'])
  },
})

watch(
  selectedProduct,
  (value) => {
    form.value = { ...value }
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
</script>
