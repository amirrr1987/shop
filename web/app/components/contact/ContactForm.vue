<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function onSubmit() {
  useToast().add({
    title: 'پیام شما ارسال شد',
    description: 'به‌زودی با شما تماس می‌گیریم.',
    icon: 'i-lucide-send',
    color: 'success'
  })
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'ring-1 ring-default',
      header: 'border-b border-default px-4 py-5 sm:px-6',
      body: 'p-4 sm:p-6'
    }"
  >
    <template #header>
      <div class="space-y-1">
        <h2 class="text-lg font-semibold tracking-tight text-highlighted">
          ارسال پیام
        </h2>
        <p class="text-sm text-muted">
          فرم زیر را پر کنید؛ معمولاً ظرف ۲۴ ساعت پاسخ می‌دهیم.
        </p>
      </div>
    </template>

    <UForm
      class="space-y-5"
      @submit.prevent="onSubmit"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField
          name="name"
          label="نام"
          required
          :ui="{ label: 'text-sm font-medium text-default' }"
        >
          <UInput
            v-model="form.name"
            placeholder="نام و نام خانوادگی"
            icon="i-lucide-user"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="email"
          label="ایمیل"
          required
          :ui="{ label: 'text-sm font-medium text-default' }"
        >
          <UInput
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            icon="i-lucide-mail"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField
        name="subject"
        label="موضوع"
        required
        :ui="{ label: 'text-sm font-medium text-default' }"
      >
        <UInput
          v-model="form.subject"
          placeholder="موضوع پیام شما"
          icon="i-lucide-text"
          class="w-full"
        />
      </UFormField>

      <UFormField
        name="message"
        label="پیام"
        required
        description="حداقل چند جمله درباره سؤال یا درخواست خود بنویسید."
        :ui="{
          label: 'text-sm font-medium text-default',
          description: 'text-xs text-muted'
        }"
      >
        <UTextarea
          v-model="form.message"
          placeholder="پیام خود را بنویسید..."
          :rows="5"
          autoresize
          class="w-full"
          :ui="{ base: 'min-h-30' }"
        />
      </UFormField>

      <UButton
        type="submit"
        label="ارسال پیام"
        icon="i-lucide-send"
        size="lg"
        block
        class="sm:w-auto sm:min-w-40"
      />
    </UForm>
  </UCard>
</template>
