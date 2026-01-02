<template>
  <Card :title="isEditMode ? 'ویرایش مشتری' : 'افزودن مشتری'">
    <Form layout="vertical" :model="form" ref="formRef" :rules="rules">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="grid grid-cols-2 md:grid-cols-12 gap-4">
          <FormItem label="نام" name="name" required class="col-span-6">
            <Input v-model:value="form.name" placeholder="نام مشتری" />
          </FormItem>
          <FormItem label="ایمیل" name="email" required class="col-span-6">
            <Input v-model:value="form.email" placeholder="ایمیل مشتری" />
          </FormItem>
          <FormItem label="شماره تلفن" name="phone" required class="col-span-6">
            <Input v-model:value="form.phone" placeholder="شماره تلفن مشتری" />
          </FormItem>
          <FormItem label="آدرس" name="address" required class="col-span-6">
            <Input v-model:value="form.address" placeholder="آدرس مشتری" />
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
              placeholder="توضیحات مشتری"
              :rows="4"
            />
          </FormItem>

          <Space class="col-span-12 justify-end">
            <Button type="primary" :loading="isLoading" @click="handleSubmit">
              {{ isEditMode ? 'ذخیره تغییرات' : 'ایجاد مشتری' }}
            </Button>
            <Button class="ml-2" @click="handleCancel">انصراف</Button>
          </Space>
        </div>
      </div>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import type { CreateCustomer, UpdateCustomer, Customer } from '@/models/customer.model'
import { useCustomerStore } from '@/stores/customer.store'
import {
  Card,
  Form,
  FormItem,
  Input,
  Textarea,
  Switch,
  Button,
  message,
  Space,
} from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()

const isEditMode = computed(() => !!route.params.id)
const customerId = computed(() => route.params.id as string)

const formRef = ref<FormInstance>()
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'نام مشتری الزامی است', trigger: 'blur' }],
  email: [{ required: true, message: 'ایمیل مشتری الزامی است', trigger: 'blur' }],
  phone: [{ required: true, message: 'شماره تلفن مشتری الزامی است', trigger: 'blur' }],
  address: [{ required: true, message: 'آدرس مشتری الزامی است', trigger: 'blur' }],
  isActive: [{ required: true, message: 'وضعیت مشتری الزامی است', trigger: 'blur' }],
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

const emptyCustomer = (): CreateCustomer => ({
  name: '',
  email: '',
  phone: '',
  address: '',
  description: '',
  isActive: true,
})

const form = ref<CreateCustomer | UpdateCustomer>(emptyCustomer())
const customer = ref<Customer>()
// Helper to extract IDs from product relations
const extractIds = (customer: Customer): CreateCustomer | UpdateCustomer => {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    description: customer.description || '',
    isActive: customer.isActive,
  }
}

const loadCustomer = async () => {
  if (isEditMode.value && customerId.value) {
    try {
      customer.value = await customerStore.getCustomer(customerId.value)
      if (customer.value) {
        form.value = extractIds(customer.value)
      }
    } catch (error) {
      console.error('Failed to load customer:', error)
      message.error('خطا در بارگذاری مشتری')
    }
  }
}
const isLoading = ref(false)
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    isLoading.value = true
    message.loading('در حال ثبت محصول...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (isEditMode.value) {
      await customerStore.updateCustomer(form.value as UpdateCustomer)
      message.destroy()
      message.success('مشتری با موفقیت ویرایش شد')
    } else {
      await customerStore.createCustomer(form.value as CreateCustomer)
      message.destroy()
      message.success('مشتری با موفقیت ثبت شد')
    }

    router.push({ name: 'TheCustomerList' })
  } catch (error) {
    console.error('Form validation or submission failed:', error)
  } finally {
    isLoading.value = false
  }
}

const handleCancel = () => {
  router.push({ name: 'TheCustomerList' })
}

onMounted(async () => {
  await loadCustomer()
})
</script>
