<template>
  <Modal
    v-model:open="open"
    :title="'id' in selectedTag ? 'ویرایش تگ' : 'افزودن تگ'"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
  >
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <FormItem label="عنوان" name="title" required>
        <Input v-model:value="form.title" placeholder="عنوان تگ را وارد کنید" />
      </FormItem>

      <FormItem label="اسلاگ" name="slug" required>
        <Input v-model:value="form.slug" placeholder="slug-example" dir="ltr" />
      </FormItem>

      <FormItem label="توضیحات" name="description">
        <Textarea v-model:value="form.description" placeholder="توضیحات تگ (اختیاری)" :rows="4" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { CreateTag, UpdateTag } from '@/models/tag.model'
import { Modal, Form, FormItem, Input, Textarea } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, watch } from 'vue'

const open = defineModel<boolean>('open', { required: true })
const selectedTag = defineModel<CreateTag | UpdateTag>('selectedTag', {
  required: true,
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInstance>()

const rules: Record<string, Rule[]> = {
  title: [
    { required: true, message: 'عنوان تگ الزامی است', trigger: 'blur' },
    { min: 1, message: 'عنوان تگ الزامی است', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: 'اسلاگ تگ الزامی است', trigger: 'blur' },
    { min: 1, message: 'اسلاگ تگ الزامی است', trigger: 'blur' },
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

const emptyTag = (): CreateTag | UpdateTag =>
  ({
    title: '',
    slug: '',
    description: '',
  }) as CreateTag | UpdateTag

const form = ref<CreateTag | UpdateTag>(emptyTag())

watch(
  selectedTag,
  (value) => {
    form.value = { ...value }
    formRef.value?.clearValidate()
  },
  { immediate: true },
)

const handleOk = async () => {
  try {
    await formRef.value?.validate()
    selectedTag.value = { ...form.value }
    emits('submit')
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleCancel = () => {
  form.value = emptyTag()
  formRef.value?.clearValidate()
  emits('cancel')
}
</script>

