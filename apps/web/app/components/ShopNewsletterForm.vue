<script setup lang="ts">
import { subscribeNewsletterSchema } from '@shop/shared'
import type { FormSubmitEvent } from '@nuxt/ui'

const api = useApi()
const toast = useToast()

const state = reactive({
  email: '',
  company: '',
})
const loading = ref(false)
const done = ref(false)

async function onSubmit(
  event: FormSubmitEvent<{ email: string; company?: string }>,
) {
  loading.value = true
  try {
    const result = await api<{ id: string; alreadySubscribed: boolean }>(
      '/newsletter/subscribe',
      {
        method: 'POST',
        body: {
          email: event.data.email,
          company: state.company,
        },
      },
    )
    done.value = true
    state.email = ''
    state.company = ''
    toast.add({
      title: result.alreadySubscribed
        ? 'قبلاً عضو خبرنامه هستید'
        : 'عضویت در خبرنامه ثبت شد',
      description: 'از پیشنهادها و تخفیف‌ها باخبرتان می‌کنیم.',
      color: 'success',
    })
  } catch (err) {
    toast.add({
      title: 'ثبت ممکن نشد',
      description: getApiErrorMessage(err, 'لطفاً دوباره تلاش کنید'),
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="space-y-1">
      <p class="text-highlighted text-sm font-medium">
        خبرنامه
      </p>
      <p class="text-muted text-sm leading-relaxed">
        از تخفیف‌ها، محصولات جدید و راهنمای خرید باخبر شوید.
      </p>
    </div>

    <UForm
      :schema="subscribeNewsletterSchema"
      :state="state"
      class="flex flex-col gap-2 sm:flex-row sm:items-start"
      @submit="onSubmit"
    >
      <!-- honeypot -->
      <input
        v-model="state.company"
        type="text"
        name="company"
        tabindex="-1"
        autocomplete="off"
        class="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      >

      <UFormField
        name="email"
        class="min-w-0 flex-1"
      >
        <UInput
          v-model="state.email"
          type="email"
          placeholder="ایمیل شما"
          icon="i-lucide-mail"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        label="عضویت"
        :loading="loading"
        :disabled="done && !state.email"
      />
    </UForm>
  </div>
</template>
