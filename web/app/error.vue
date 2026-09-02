<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const { captureError } = useMonitoring()

onMounted(() => {
  captureError(props.error, {
    statusCode: props.error.statusCode,
    statusMessage: props.error.statusMessage
  })
})

function retry() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <UContainer class="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <UIcon
      name="i-lucide-triangle-alert"
      class="mb-4 size-12 text-error"
    />
    <h1 class="text-2xl font-bold text-default">
      {{ error.statusCode ?? 500 }} — خطایی رخ داد
    </h1>
    <p class="mt-2 max-w-md text-muted">
      {{ error.statusMessage || error.message || 'مشکلی پیش آمد. تیم ما از طریق Sentry مطلع شده است.' }}
    </p>
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <UButton
        label="تلاش مجدد"
        icon="i-lucide-rotate-ccw"
        @click="retry"
      />
      <UButton
        label="صفحه اصلی"
        color="neutral"
        variant="outline"
        icon="i-lucide-home"
        to="/"
      />
    </div>
  </UContainer>
</template>
