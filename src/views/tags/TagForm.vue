<template>
  <Card :title="isEditMode ? 'ویرایش تگ' : 'افزودن تگ'">
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

      <FormItem>
        <Button type="primary" :loading="tagStore.loading" @click="handleSubmit">
          {{ isEditMode ? 'ذخیره تغییرات' : 'ایجاد تگ' }}
        </Button>
        <Button class="ml-2" @click="handleCancel">انصراف</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import type { CreateTag, UpdateTag } from '@/models/tag.model'
import { Form, FormItem, Input, Textarea, Card, Button } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagStore } from '@/stores/tag.store'

const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()

const isEditMode = computed(() => !!route.params.id)
const tagId = computed(() => route.params.id as string)

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

const formRef = ref<FormInstance>()
const emptyTag = (): CreateTag => ({
  title: '',
  slug: '',
  description: '',
})

const form = ref<CreateTag | UpdateTag>(emptyTag())

const loadTag = async () => {
  if (isEditMode.value && tagId.value) {
    try {
      const tag = await tagStore.getTag(tagId.value)
      if (tag) {
        form.value = {
          id: tag.id,
          title: tag.title,
          slug: tag.slug,
          description: tag.description || '',
        } as UpdateTag
      }
    } catch (error) {
      console.error('Failed to load tag:', error)
    }
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (isEditMode.value) {
      await tagStore.updateTag(form.value as UpdateTag)
    } else {
      await tagStore.createTag(form.value as CreateTag)
    }

    router.push({ name: 'TheTagList' })
  } catch (error) {
    console.error('Form validation or submission failed:', error)
  }
}

const handleCancel = () => {
  router.push({ name: 'TheTagList' })
}

onMounted(() => {
  loadTag()
})
</script>
