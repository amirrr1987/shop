<script setup lang="ts">
import type { ChangePasswordInput, UpdateProfileInput } from '@shop/shared'
import { changePasswordSchema, updateProfileSchema } from '@shop/shared'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'auth',
})

usePrivateSeo('پروفایل', '/account/profile')

const { user, updateProfile, changePassword } = useAuth()
const toast = useToast()

const profileState = reactive<UpdateProfileInput>({
  fullName: user.value?.fullName ?? '',
})

watch(
  () => user.value?.fullName,
  (value) => {
    if (value) {
      profileState.fullName = value
    }
  },
)

const passwordState = reactive<ChangePasswordInput>({
  currentPassword: '',
  newPassword: '',
})

const profileLoading = ref(false)
const passwordLoading = ref(false)
const profileError = ref<string | null>(null)
const passwordError = ref<string | null>(null)

async function onProfileSubmit(event: FormSubmitEvent<UpdateProfileInput>) {
  profileLoading.value = true
  profileError.value = null
  try {
    await updateProfile(event.data)
    toast.add({ title: 'پروفایل به‌روز شد', color: 'success' })
  } catch (err) {
    profileError.value = getApiErrorMessage(err, 'به‌روزرسانی پروفایل ممکن نشد')
  } finally {
    profileLoading.value = false
  }
}

async function onPasswordSubmit(event: FormSubmitEvent<ChangePasswordInput>) {
  passwordLoading.value = true
  passwordError.value = null
  try {
    await changePassword(event.data)
    passwordState.currentPassword = ''
    passwordState.newPassword = ''
    toast.add({ title: 'رمز عبور تغییر کرد', color: 'success' })
  } catch (err) {
    passwordError.value = getApiErrorMessage(err, 'تغییر رمز ممکن نشد')
  } finally {
    passwordLoading.value = false
  }
}
</script>

<template>
  <UContainer class="space-y-10 py-10">
    <div>
      <UBreadcrumb
        :items="[
          { label: 'حساب کاربری', to: '/account' },
          { label: 'پروفایل' },
        ]"
      />
      <h1 class="mt-4 text-2xl font-semibold text-highlighted">
        پروفایل
      </h1>
      <p class="mt-1 text-muted">
        نام یا رمز عبور را تغییر دهید.
      </p>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <section class="border-default space-y-4 rounded-lg border p-5">
        <h2 class="font-medium text-highlighted">
          نام
        </h2>
        <p
          v-if="user"
          class="text-muted text-sm"
        >
          {{ user.email }}
        </p>

        <UForm
          :schema="updateProfileSchema"
          :state="profileState"
          class="space-y-4"
          @submit="onProfileSubmit"
        >
          <UFormField
            label="نام کامل"
            name="fullName"
          >
            <UInput
              v-model="profileState.fullName"
              class="w-full"
            />
          </UFormField>

          <UAlert
            v-if="profileError"
            :title="profileError"
            color="error"
            variant="subtle"
          />

          <UButton
            type="submit"
            label="ذخیره نام"
            :loading="profileLoading"
          />
        </UForm>
      </section>

      <section class="border-default space-y-4 rounded-lg border p-5">
        <h2 class="font-medium text-highlighted">
          رمز عبور
        </h2>

        <UForm
          :schema="changePasswordSchema"
          :state="passwordState"
          class="space-y-4"
          @submit="onPasswordSubmit"
        >
          <UFormField
            label="رمز فعلی"
            name="currentPassword"
          >
            <UInput
              v-model="passwordState.currentPassword"
              type="password"
              autocomplete="current-password"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="رمز جدید"
            name="newPassword"
          >
            <UInput
              v-model="passwordState.newPassword"
              type="password"
              autocomplete="new-password"
              class="w-full"
            />
          </UFormField>

          <UAlert
            v-if="passwordError"
            :title="passwordError"
            color="error"
            variant="subtle"
          />

          <UButton
            type="submit"
            label="تغییر رمز"
            color="neutral"
            variant="soft"
            :loading="passwordLoading"
          />
        </UForm>
      </section>
    </div>
  </UContainer>
</template>
