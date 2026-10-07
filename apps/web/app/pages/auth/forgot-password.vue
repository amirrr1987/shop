<script setup lang="ts">
import type { ForgotPasswordInput } from '@shop/shared'
import { forgotPasswordSchema } from '@shop/shared'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'guest',
})

usePrivateSeo('بازیابی رمز عبور', '/auth/forgot-password')

const api = useApi()
const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'ایمیل',
    placeholder: 'you@example.com',
    required: true,
  },
]

const error = ref<string | null>(null)
const loading = ref(false)
const done = ref(false)

async function onSubmit(event: FormSubmitEvent<ForgotPasswordInput>) {
  error.value = null
  loading.value = true
  try {
    const response = await api<{ message?: string }>('/auth/forgot-password', {
      method: 'POST',
      body: event.data,
    })
    done.value = true
    toast.add({
      title: response.message || 'اگر ایمیل ثبت باشد، لینک ارسال شد',
      color: 'success',
    })
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ارسال لینک ناموفق بود')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="flex min-h-[70vh] items-center justify-center py-10">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="forgotPasswordSchema"
        :fields="fields"
        title="بازیابی رمز"
        description="لینک تنظیم رمز جدید به ایمیل شما ارسال می‌شود."
        icon="i-lucide-key-round"
        :submit="{ label: 'ارسال لینک', loading, disabled: done }"
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

        <template
          v-if="done"
          #validation
        >
          <UAlert
            title="اگر این ایمیل ثبت شده باشد، لینک بازیابی ارسال شد."
            color="success"
            variant="subtle"
          />
        </template>

        <template #footer>
          <ULink
            to="/auth/login"
            class="text-primary font-medium"
          >
            بازگشت به ورود
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
