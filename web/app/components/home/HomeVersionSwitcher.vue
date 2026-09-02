<script setup lang="ts">
import { homeVersions } from '~/data/home-tabs'

const { version, setVersion } = useHomeVariant()
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'ring-1 ring-default',
      body: 'flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5'
    }"
  >
    <div class="flex flex-wrap items-center gap-2">
      <UBadge
        color="primary"
        variant="subtle"
        icon="i-lucide-layout-template"
        :label="`نسخه ${version}`"
      />
      <span class="text-sm text-muted">
        چیدمان صفحه اصلی را امتحان کنید
      </span>
    </div>

    <USelect
      :model-value="version"
      :items="homeVersions"
      value-key="value"
      label-key="label"
      placeholder="انتخاب نسخه خانه"
      icon="i-lucide-home"
      class="min-w-44"
      @update:model-value="setVersion($event as '1' | '2' | '3' | '4')"
    />
  </UCard>
</template>
