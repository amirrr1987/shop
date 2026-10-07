<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  InputPassword,
  TypographyTitle,
  message,
} from 'ant-design-vue'
import type { FormInstance, RuleObject } from 'ant-design-vue/es/form'
import type { LoginInput } from '@shop/shared'
import { isPanelRole } from '@shop/shared'
import { useAuthStore } from '@/stores/auth'
import { ApiError } from '@/api/client'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const model = reactive<LoginInput>({
  email: 'admin@shop.local',
  password: 'password123',
})

const rules: Record<keyof LoginInput, RuleObject | RuleObject[]> = {
  email: [
    { required: true, message: 'وارد کردن ایمیل الزامی است' },
    { type: 'email', message: 'یک ایمیل معتبر وارد کنید' },
  ],
  password: [
    { required: true, message: 'وارد کردن رمز عبور الزامی است' },
    { min: 8, message: 'حداقل ۸ کاراکتر' },
  ],
}

onMounted(() => {
  if (route.query.error === 'admin') {
    message.error('دسترسی مدیر لازم است')
  }
})

async function onFinish() {
  loading.value = true
  try {
    const user = await auth.login({ ...model })
    if (!isPanelRole(user.role)) {
      await auth.logout()
      message.error('دسترسی پنل لازم است')
      return
    }
    message.success('با موفقیت وارد شدید')
    await router.push({ name: 'dashboard' })
  } catch (error) {
    const text =
      error instanceof ApiError ? error.message : 'ورود ناموفق بود'
    message.error(text)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    style="
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #f5f5f5;
      padding: 24px;
    "
  >
    <Card style="width: 100%; max-width: 400px">
      <TypographyTitle :level="3" style="margin-top: 0">
        پنل فروشگاه
      </TypographyTitle>
      <Form
        ref="formRef"
        layout="vertical"
        :model="model"
        :rules="rules"
        @finish="onFinish"
      >
        <FormItem label="ایمیل" name="email">
          <Input v-model:value="model.email" autocomplete="username" />
        </FormItem>
        <FormItem label="رمز عبور" name="password">
          <InputPassword
            v-model:value="model.password"
            autocomplete="current-password"
          />
        </FormItem>
        <Button type="primary" html-type="submit" block :loading="loading">
          ورود
        </Button>
      </Form>
    </Card>
  </div>
</template>
