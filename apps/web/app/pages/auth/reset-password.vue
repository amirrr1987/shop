<script setup lang="ts">
import type { ResetPasswordInput } from '@shop/shared'
import { resetPasswordSchema } from '@shop/shared'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'guest',
})

usePrivateSeo('تنظیم رمز عبور', '/auth/reset-password')

const api = useApi()
const toast = useToast()
const route = useRoute()

const token = computed(() =>
  typeof route.query.token === 'string' ? route.query.token : '',
)

const fields: AuthFormField[] = [
  {
    name: 'newPassword',
    type: 'password',
    label: 'رمز جدید',
    placeholder: '••••••••',
    required: true,
  },
]

const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit(
  event: FormSubmitEvent<{ newPassword: string }>,
) {
  error.value = null
  if (!token.value) {
    error.value = 'لینک بازیابی نامعتبر است'
    return
  }

  loading.value = true
  try {
    const body: ResetPasswordInput = {
      token: token.value,
      newPassword: event.data.newPassword,
    }
    resetPasswordSchema.parse(body)
    await api('/auth/reset-password', {
      method: 'POST',
      body,
    })
    toast.add({
      title: 'رمز عبور تغییر کرد',
      color: 'success',
    })
    await navigateTo('/auth/login')
  } catch (err) {
    error.value = getApiErrorMessage(err, 'تغییر رمز ناموفق بود')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="flex min-h-[70vh] items-center justify-center py-10">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="resetPasswordSchema.pick({ newPassword: true })"
        :fields="fields"
        title="رمز جدید"
        description="رمز عبور تازه برای حساب خود تنظیم کنید."
        icon="i-lucide-lock-keyhole"
        :submit="{ label: 'ذخیره رمز', loading, disabled: !token }"
        @submit="onSubmit"
      >
        <template
          v-if="!token || error"
          #validation
        >
          <UAlert
            :title="error || 'لینک بازیابی نامعتبر است'"
            color="error"
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
