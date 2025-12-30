<template>
  <Modal
    v-model:open="open"
    :title="'id' in selectedSlider ? 'ویرایش اسلایدر' : 'افزودن اسلایدر'"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    width="800px"
  >
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <Row :gutter="16">
        <Col :span="16">
          <FormItem label="عنوان" name="title" required>
            <Input v-model:value="form.title" placeholder="عنوان اسلایدر" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="موقعیت" name="position">
            <Select v-model:value="form.position" class="w-full!">
              <SelectOption value="home">صفحه اصلی</SelectOption>
              <SelectOption value="category">صفحه دسته‌بندی</SelectOption>
              <SelectOption value="product">صفحه محصول</SelectOption>
              <SelectOption value="banner">بنر تبلیغاتی</SelectOption>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="تصویر دسکتاپ" name="image" required>
            <Input v-model:value="form.image" placeholder="آدرس تصویر" dir="ltr" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="تصویر موبایل" name="imageMobile">
            <Input v-model:value="form.imageMobile" placeholder="آدرس تصویر موبایل (اختیاری)" dir="ltr" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="16">
          <FormItem label="زیرعنوان" name="subtitle">
            <Input v-model:value="form.subtitle" placeholder="زیرعنوان اسلایدر" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="لینک" name="link">
            <Input v-model:value="form.link" placeholder="/products/..." dir="ltr" />
          </FormItem>
        </Col>
      </Row>

      <FormItem label="توضیحات" name="description">
        <Textarea v-model:value="form.description" :rows="2" placeholder="توضیحات اسلایدر" />
      </FormItem>

      <Divider>تنظیمات ظاهری</Divider>

      <Row :gutter="16">
        <Col :span="6">
          <FormItem label="متن دکمه" name="buttonText">
            <Input v-model:value="form.buttonText" placeholder="مشاهده" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="رنگ دکمه">
            <div class="flex items-center gap-2">
              <input type="color" v-model="form.buttonColor" class="w-8 h-8 rounded cursor-pointer" />
              <Input v-model:value="form.buttonColor" dir="ltr" />
            </div>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="رنگ متن">
            <div class="flex items-center gap-2">
              <input type="color" v-model="form.textColor" class="w-8 h-8 rounded cursor-pointer" />
              <Input v-model:value="form.textColor" dir="ltr" />
            </div>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="چینش متن">
            <Select v-model:value="form.textAlign" class="w-full!">
              <SelectOption value="left">چپ</SelectOption>
              <SelectOption value="center">وسط</SelectOption>
              <SelectOption value="right">راست</SelectOption>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Divider>تنظیمات نمایش</Divider>

      <Row :gutter="16">
        <Col :span="6">
          <FormItem label="ترتیب نمایش" name="sortOrder">
            <InputNumber v-model:value="form.sortOrder" :min="0" class="w-full!" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="وضعیت">
            <Switch v-model:checked="form.isActive" checked-children="فعال" un-checked-children="غیرفعال" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="تاریخ شروع">
            <DatePicker v-model:value="startDateValue" class="w-full!" placeholder="انتخاب تاریخ" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="تاریخ پایان">
            <DatePicker v-model:value="endDateValue" class="w-full!" placeholder="انتخاب تاریخ" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { CreateSlider, UpdateSlider } from '@/models/slider.model'
import {
  Modal,
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  SelectOption,
  InputNumber,
  Switch,
  DatePicker,
  Row,
  Col,
  Divider,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, watch, computed } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'

const open = defineModel<boolean>('open', { required: true })
const selectedSlider = defineModel<CreateSlider | UpdateSlider>('selectedSlider', {
  required: true,
})

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInstance>()

const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: 'عنوان اسلایدر الزامی است', trigger: 'blur' }],
  image: [{ required: true, message: 'تصویر اسلایدر الزامی است', trigger: 'blur' }],
}

const emptySlider = (): CreateSlider | UpdateSlider => ({
  title: '',
  position: 'home',
  image: '',
  imageMobile: null,
  link: null,
  subtitle: null,
  description: null,
  buttonText: null,
  buttonColor: '#3b82f6',
  textColor: '#ffffff',
  textAlign: 'center',
  sortOrder: 0,
  isActive: true,
  startDate: null,
  endDate: null,
}) as CreateSlider | UpdateSlider

const form = ref<CreateSlider | UpdateSlider>(emptySlider())

const startDateValue = computed({
  get: () => (form.value.startDate ? dayjs(form.value.startDate) : null),
  set: (value: Dayjs | null) => {
    form.value.startDate = value ? value.toISOString() : null
  },
})

const endDateValue = computed({
  get: () => (form.value.endDate ? dayjs(form.value.endDate) : null),
  set: (value: Dayjs | null) => {
    form.value.endDate = value ? value.toISOString() : null
  },
})

watch(
  selectedSlider,
  (value) => {
    form.value = { ...emptySlider(), ...value }
    formRef.value?.clearValidate()
  },
  { immediate: true },
)

const handleOk = async () => {
  try {
    await formRef.value?.validate()
    selectedSlider.value = { ...form.value }
    emits('submit')
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleCancel = () => {
  form.value = emptySlider()
  formRef.value?.clearValidate()
  emits('cancel')
}
</script>

