<script setup lang="ts">
const comment = reactive({
  name: '',
  email: '',
  message: ''
})

function submitComment() {
  useToast().add({
    title: 'نظر شما ثبت شد',
    description: 'پس از بررسی منتشر می‌شود',
    icon: 'i-lucide-message-square',
    color: 'success'
  })
  comment.name = ''
  comment.email = ''
  comment.message = ''
}

const mockComments = [
  {
    id: '1',
    author: 'کاربر ۱',
    date: '۱۴۰۴/۰۶/۰۵',
    content: 'مطلب بسیار مفیدی بود. ممنون!'
  },
  {
    id: '2',
    author: 'کاربر ۲',
    date: '۱۴۰۴/۰۶/۰۳',
    content: 'لطفاً مطالب بیشتری درباره گیمینگ بنویسید.'
  }
]
</script>

<template>
  <UPageSection title="نظرات">
    <UPageList>
      <UCard
        v-for="item in mockComments"
        :key="item.id"
      >
        <UUser
          :name="item.author"
          :description="item.date"
          icon="i-lucide-user"
        />
        <UAlert
          color="neutral"
          variant="subtle"
          :title="item.content"
        />
      </UCard>
    </UPageList>

    <UCard>
      <template #header>
        <UPageHeader
          title="ثبت نظر"
          description="نظر خود را بنویسید"
        />
      </template>

      <UForm @submit.prevent="submitComment">
        <UPageColumns>
          <UFormField label="نام">
            <UInput
              v-model="comment.name"
              icon="i-lucide-user"
            />
          </UFormField>
          <UFormField label="ایمیل">
            <UInput
              v-model="comment.email"
              type="email"
              icon="i-lucide-mail"
            />
          </UFormField>
        </UPageColumns>

        <UFormField label="پیام">
          <UTextarea
            v-model="comment.message"
            autoresize
          />
        </UFormField>

        <UButton
          type="submit"
          label="ارسال نظر"
          icon="i-lucide-send"
        />
      </UForm>
    </UCard>
  </UPageSection>
</template>
