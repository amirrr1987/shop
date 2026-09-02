<script setup lang="ts">
useSeoMeta({ title: 'تماس با ما — روزر' })
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer class="space-y-8 py-6 sm:space-y-10 sm:py-8">
        <UBreadcrumb
          :items="[
            { label: 'خانه', to: '/' },
            { label: 'تماس', to: '/contact' }
          ]"
        />

        <UPageHeader
          headline="پشتیبانی"
          title="تماس با ما"
          description="سؤال، پیشنهاد یا مشکل خرید دارید؟ تیم روزر در ساعات کاری پاسخگوست."
        />

        <UCard
          variant="subtle"
          :ui="{
            root: 'overflow-hidden ring-1 ring-default',
            body: 'p-0'
          }"
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=51.389%2C35.6892%2C51.419%2C35.7092&layer=mapnik&marker=35.6992%2C51.4040"
            title="موقعیت فروشگاه روزر روی نقشه"
            loading="lazy"
            referrerpolicy="no-referrer"
            class="aspect-21/9 min-h-60 w-full border-0 sm:min-h-80"
          />
        </UCard>

        <div class="grid gap-8 lg:grid-cols-6 lg:gap-10">
          <div class="lg:col-span-3">
            <ContactInfo />
          </div>
          <div class="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
