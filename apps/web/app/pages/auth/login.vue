<script setup lang="ts">
import type { LoginInput } from '@shop/shared'
import { loginSchema } from '@shop/shared'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'guest',
})

usePrivateSeo('ورود', '/auth/login')

const { login } = useAuth()
const toast = useToast()
const route = useRoute()

const fields: AuthFormField[] = [
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
    placeholder: '••••••••',
    required: true,
  },
]

const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<LoginInput>) {
  error.value = null
  loading.value = true

  try {
    await login(event.data)
    toast.add({
      title: 'خوش آمدید',
      color: 'success',
    })
    const redirect =
      typeof route.query.redirect === 'string' ? route.query.redirect : '/account'
    await navigateTo(redirect)
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ورود ناموفق بود')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="flex min-h-[70vh] items-center justify-center py-10">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="loginSchema"
        :fields="fields"
        title="ورود"
        description="وارد حساب فروشگاه شوید."
        icon="i-lucide-lock"
        :submit="{ label: 'ورود', loading }"
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
          <div class="flex flex-col gap-2">
            <ULink
              to="/auth/forgot-password"
              class="text-primary font-medium"
            >
              رمز را فراموش کرده‌اید؟
            </ULink>
            <p>
              حساب ندارید؟
              <ULink
                to="/auth/register"
                class="text-primary font-medium"
              >
                ثبت‌نام
              </ULink>
            </p>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
