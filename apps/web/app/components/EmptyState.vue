<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
    actionLabel?: string
    actionTo?: string
  }>(),
  {
    description: '',
    icon: 'i-lucide-inbox',
    actionLabel: '',
    actionTo: '',
  },
)
</script>

<template>
  <div class="border-default rounded-lg border border-dashed px-6 py-16 text-center">
    <div class="bg-elevated mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
      <UIcon
        :name="icon"
        class="text-muted size-6"
        aria-hidden="true"
      />
    </div>
    <h2 class="text-highlighted text-lg font-medium">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-muted mx-auto mt-2 max-w-md text-sm"
    >
      {{ description }}
    </p>
    <div
      v-if="actionLabel && actionTo"
      class="mt-5"
    >
      <UButton
        :to="actionTo"
        :label="actionLabel"
      />
    </div>
    <div
      v-else-if="$slots.actions"
      class="mt-5"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
