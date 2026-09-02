<script setup lang="ts">
const { login, register, rememberedEmail, setRememberedEmail, clearRememberedEmail } = useAuth()
const router = useRouter()

const tabItems = [
  { label: 'ورود', icon: 'i-lucide-log-in', slot: 'login' as const },
  { label: 'ثبت‌نام', icon: 'i-lucide-user-plus', slot: 'register' as const }
]

const loginForm = reactive({
  email: rememberedEmail.value,
  password: '',
  remember: !!rememberedEmail.value
})

const registerForm = reactive({
  email: '',
  password: '',
  username: ''
})

function onLogin() {
  login(loginForm.email, loginForm.password)
  if (loginForm.remember) {
    setRememberedEmail(loginForm.email)
  } else {
    clearRememberedEmail()
  }
  router.push('/account')
}

function onRegister() {
  register({ email: registerForm.email })
  router.push('/account')
}
</script>

<template>
  <UPageCard
    title="خوش آمدید"
    description="وارد حساب خود شوید یا ثبت‌نام کنید"
    icon="i-lucide-lock"
    variant="subtle"
  >
    <UTabs :items="tabItems">
      <template #login>
        <UForm @submit.prevent="onLogin">
          <UFormField label="ایمیل یا نام کاربری">
            <UInput
              v-model="loginForm.email"
              type="email"
              icon="i-lucide-mail"
              placeholder="email@example.com"
            />
          </UFormField>

          <UFormField label="رمز عبور">
            <UInput
              v-model="loginForm.password"
              type="password"
              icon="i-lucide-key"
              placeholder="رمز عبور"
            />
          </UFormField>

          <UCheckbox
            v-model="loginForm.remember"
            label="مرا به خاطر بسپار"
          />

          <UButton
            type="submit"
            label="ورود"
            icon="i-lucide-log-in"
            block
          />

          <ULink to="#">رمز عبور را فراموش کرده‌اید؟</ULink>
        </UForm>
      </template>

      <template #register>
        <UForm @submit.prevent="onRegister">
          <UFormField label="نام کاربری">
            <UInput
              v-model="registerForm.username"
              icon="i-lucide-user"
              placeholder="نام کاربری"
            />
          </UFormField>

          <UFormField label="ایمیل">
            <UInput
              v-model="registerForm.email"
              type="email"
              icon="i-lucide-mail"
              placeholder="email@example.com"
            />
          </UFormField>

          <UFormField label="رمز عبور">
            <UInput
              v-model="registerForm.password"
              type="password"
              icon="i-lucide-key"
              placeholder="رمز عبور"
            />
          </UFormField>

          <UButton
            type="submit"
            label="ثبت‌نام"
            icon="i-lucide-user-plus"
            block
          />
        </UForm>
      </template>
    </UTabs>

    <USeparator label="یا" />

    <UFieldGroup orientation="horizontal">
      <UButton
        label="Google"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-google"
      />
      <UButton
        label="GitHub"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
      />
    </UFieldGroup>
  </UPageCard>
</template>
