<template>
  <Modal
    v-model:open="open"
    :title="'id' in selectedMenu ? 'ویرایش منو' : 'افزودن منو'"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    width="600px"
  >
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="عنوان" name="title" required>
            <Input v-model:value="form.title" placeholder="عنوان منو" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="موقعیت" name="location" required>
            <Select v-model:value="form.location" class="w-full!">
              <SelectOption value="header">هدر</SelectOption>
              <SelectOption value="footer">فوتر</SelectOption>
              <SelectOption value="mobile">موبایل</SelectOption>
              <SelectOption value="sidebar">سایدبار</SelectOption>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="نوع لینک" name="linkType">
            <Select v-model:value="form.linkType" class="w-full!">
              <SelectOption value="internal">داخلی</SelectOption>
              <SelectOption value="external">خارجی</SelectOption>
              <SelectOption value="category">دسته‌بندی</SelectOption>
              <SelectOption value="product">محصول</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="لینک" name="link">
            <Input v-model:value="form.link" placeholder="/products" dir="ltr" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="منوی والد" name="parentId">
            <Select
              v-model:value="form.parentId"
              placeholder="انتخاب منوی والد (اختیاری)"
              allowClear
              showSearch
              optionFilterProp="label"
              :options="parentOptions"
            />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="ترتیب نمایش" name="sortOrder">
            <InputNumber v-model:value="form.sortOrder" :min="0" class="w-full!" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="آیکون" name="icon">
            <Input v-model:value="form.icon" placeholder="home" dir="ltr" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="8">
          <div class="flex items-center gap-2">
            <Switch v-model:checked="form.isActive" />
            <span>فعال</span>
          </div>
        </Col>
        <Col :span="8">
          <div class="flex items-center gap-2">
            <Switch v-model:checked="form.openInNewTab" />
            <span>باز شدن در تب جدید</span>
          </div>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { CreateMenu, UpdateMenu } from '@/models/menu.model'
import { useMenuStore } from '@/stores/menu.store'
import {
  Modal,
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  InputNumber,
  Switch,
  Row,
  Col,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, watch, computed } from 'vue'

const open = defineModel<boolean>('open', { required: true })
const selectedMenu = defineModel<CreateMenu | UpdateMenu>('selectedMenu', {
  required: true,
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const menuStore = useMenuStore()
const formRef = ref<FormInstance>()

// Filter out current menu from parent options
const parentOptions = computed(() => {
  const currentId = 'id' in selectedMenu.value ? selectedMenu.value.id : null
  return menuStore.menus
    .filter((m) => m.id !== currentId && m.location === form.value.location)
    .map((m) => ({
      value: m.id,
      label: m.title,
    }))
})

const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: 'عنوان منو الزامی است', trigger: 'blur' }],
  location: [{ required: true, message: 'موقعیت منو الزامی است', trigger: 'blur' }],
}

const emptyMenu = (): CreateMenu | UpdateMenu =>
  ({
    title: '',
    location: 'header',
    link: null,
    linkType: 'internal',
    icon: null,
    image: null,
    sortOrder: 0,
    isActive: true,
    openInNewTab: false,
    parentId: null,
  }) as CreateMenu | UpdateMenu

const form = ref<CreateMenu | UpdateMenu>(emptyMenu())

watch(
  selectedMenu,
  (value) => {
    form.value = { ...emptyMenu(), ...value }
    formRef.value?.clearValidate()
  },
  { immediate: true },
)

const handleOk = async () => {
  try {
    await formRef.value?.validate()
    selectedMenu.value = { ...form.value }
    emits('submit')
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleCancel = () => {
  form.value = emptyMenu()
  formRef.value?.clearValidate()
  emits('cancel')
}
</script>

