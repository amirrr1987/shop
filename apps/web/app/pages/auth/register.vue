<script setup lang="ts">
import type { RegisterInput } from '@shop/shared'
import { registerSchema } from '@shop/shared'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'guest',
})

usePrivateSeo('ثبت‌نام', '/auth/register')

const { register } = useAuth()
const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'نام کامل',
    placeholder: 'نام شما',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'ایمیل',
    placeholder: 'you@example.com',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'رمز عبور',
    placeholder: 'حداقل ۸ کاراکتر',
    required: true,
  },
]

const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<RegisterInput>) {
  error.value = null
  loading.value = true

  try {
    await register(event.data)
    toast.add({
      title: 'حساب ساخته شد',
      color: 'success',
    })
    await navigateTo('/account')
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ثبت‌نام ناموفق بود')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="flex min-h-[70vh] items-center justify-center py-10">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="registerSchema"
        :fields="fields"
        title="ثبت‌نام"
        description="برای خرید و پیگیری سفارش ثبت‌نام کنید."
        icon="i-lucide-user-plus"
        :submit="{ label: 'ثبت‌نام', loading }"
        @submit="onSubmit"
      >
        <template
          v-if="error"
          #validation
        >
          <UAlert
            :title="error"
            color="error"
            variant="subtle"
          />
        </template>

        <template #footer>
          قبلاً حساب دارید؟
          <ULink
            to="/auth/login"
            class="text-primary font-medium"
          >
            ورود
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
