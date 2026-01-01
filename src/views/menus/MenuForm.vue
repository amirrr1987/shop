<template>
  <Card :title="isEditMode ? 'ویرایش منو' : 'افزودن منو'">
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
        <Col :span="12">
          <FormItem label="وضعیت" name="isActive">
            <Switch
              v-model:checked="form.isActive"
              checked-children="فعال"
              un-checked-children="غیرفعال"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="باز شدن در تب جدید" name="openInNewTab">
            <Switch
              v-model:checked="form.openInNewTab"
              checked-children="بله"
              un-checked-children="خیر"
            />
          </FormItem>
        </Col>
      </Row>

      <Divider />
      <Space>
        <Button type="primary" :loading="menuStore.loading" @click="handleSubmit">
          {{ isEditMode ? 'ذخیره تغییرات' : 'ایجاد منو' }}
        </Button>
        <Button @click="handleCancel">انصراف</Button>
      </Space>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import type { CreateMenu, UpdateMenu } from '@/models/menu.model'
import { useMenuStore } from '@/stores/menu.store'
import {
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  InputNumber,
  Switch,
  Row,
  Col,
  Card,
  Button,
  Space,
  Divider,
  message,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

const isEditMode = computed(() => !!route.params.id)
const menuId = computed(() => route.params.id as string)

const formRef = ref<FormInstance>()

// Filter out current menu from parent options
const parentOptions = computed(() => {
  const currentId = menuId.value
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

const emptyMenu = (): CreateMenu => ({
  title: '',
  location: 'header',
  link: '',
  linkType: 'internal',
  icon: '',
  image: '',
  sortOrder: 0,
  isActive: true,
  openInNewTab: false,
  parentId: undefined,
})

const form = ref<CreateMenu | UpdateMenu>(emptyMenu())

// Update parent options when location changes
watch(
  () => form.value.location,
  () => {
    // Clear parentId if location changes and current parent is not in the new location
    if (form.value.parentId) {
      const parentExists = menuStore.menus.some(
        (m) => m.id === form.value.parentId && m.location === form.value.location,
      )
      if (!parentExists) {
        form.value.parentId = undefined
      }
    }
  },
)

const loadMenu = async () => {
  if (isEditMode.value && menuId.value) {
    try {
      const menu = await menuStore.getMenu(menuId.value)
      if (menu) {
        form.value = {
          id: menu.id,
          title: menu.title,
          location: menu.location,
          link: menu.link || '',
          linkType: menu.linkType as 'internal' | 'external' | 'category' | 'product',
          icon: menu.icon || '',
          image: menu.image || '',
          sortOrder: menu.sortOrder,
          isActive: menu.isActive,
          openInNewTab: menu.openInNewTab,
          parentId: menu.parentId || undefined,
        } as UpdateMenu
      }
    } catch (error) {
      console.error('Failed to load menu:', error)
      message.error('خطا در بارگذاری منو')
    }
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (isEditMode.value) {
      await menuStore.updateMenu(form.value as UpdateMenu)
      message.success('منو با موفقیت ویرایش شد')
    } else {
      await menuStore.createMenu(form.value as CreateMenu)
      message.success('منو با موفقیت ثبت شد')
    }

    router.push({ name: 'TheMenuList' })
  } catch (error) {
    console.error('Form validation or submission failed:', error)
  }
}

const handleCancel = () => {
  router.push({ name: 'TheMenuList' })
}

onMounted(async () => {
  await menuStore.getMenus()
  await loadMenu()
})
</script>
