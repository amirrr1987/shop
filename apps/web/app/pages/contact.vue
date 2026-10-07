<script setup lang="ts">
import { createContactMessageSchema } from '@shop/shared'
import type { FormSubmitEvent } from '@nuxt/ui'

const settings = useStoreSettingsState()

useStaticPageSeo(() => ({
  title: 'تماس با ما',
  description: `تماس با ${settings.value.shopName || 'فروشگاه'}`,
  path: '/contact',
  type: 'ContactPage',
}))

const api = useApi()
const toast = useToast()
const { user } = useAuth()

const state = reactive({
  name: user.value?.fullName ?? '',
  email: user.value?.email ?? '',
  phone: '',
  subject: '',
  message: '',
  company: '',
})

watch(
  user,
  (value) => {
    if (!value) return
    if (!state.name) state.name = value.fullName
    if (!state.email) state.email = value.email
  },
  { immediate: true },
)

const error = ref<string | null>(null)
const loading = ref(false)
const sent = ref(false)

async function onSubmit(
  event: FormSubmitEvent<{
    name: string
    email: string
    phone: string | null
    subject: string
    message: string
  }>,
) {
  error.value = null
  loading.value = true
  try {
    await api('/contact', {
      method: 'POST',
      body: {
        ...event.data,
        company: state.company,
      },
    })
    sent.value = true
    state.subject = ''
    state.message = ''
    state.phone = ''
    state.company = ''
    toast.add({
      title: 'پیام ارسال شد',
      description: 'به‌زودی پاسخ می‌دهیم.',
      color: 'success',
    })
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ارسال پیام ممکن نشد')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="max-w-2xl space-y-2">
      <UBreadcrumb
        :items="[
          { label: 'خانه', to: '/' },
          { label: 'تماس با ما' },
        ]"
      />
      <h1 class="text-2xl font-semibold text-highlighted">
        تماس با ما
      </h1>
      <p class="text-muted">
        سوال، پیشنهاد یا پیگیری سفارش — پیام بگذارید تا بررسی کنیم.
      </p>
    </div>

    <UAlert
      v-if="sent"
      title="پیام شما ثبت شد"
      description="از طریق ایمیل پاسخ می‌دهیم."
      color="success"
      variant="subtle"
      class="max-w-2xl"
    />

    <UForm
      :schema="createContactMessageSchema"
      :state="state"
      class="relative max-w-2xl space-y-4"
      @submit="onSubmit"
    >
      <UAlert
        v-if="error"
        :title="error"
        color="error"
        variant="subtle"
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField
          label="نام"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="ایمیل"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField
        label="تلفن"
        name="phone"
      >
        <UInput
          v-model="state.phone"
          class="w-full"
          placeholder="اختیاری"
        />
      </UFormField>

      <!-- Honeypot: hidden from humans, bots often fill it -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label>
          شرکت
          <input
            v-model="state.company"
            type="text"
            name="company"
            tabindex="-1"
            autocomplete="off"
          >
        </label>
      </div>

      <UFormField
        label="موضوع"
        name="subject"
        required
      >
        <UInput
          v-model="state.subject"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="پیام"
        name="message"
        required
      >
        <UTextarea
          v-model="state.message"
          :rows="5"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        label="ارسال پیام"
        :loading="loading"
      />
    </UForm>
  </UContainer>
</template>
