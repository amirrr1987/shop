<script setup lang="ts">
const { version } = useHomeVariant()

useSeoMeta({ title: 'روزر — فروشگاه الکترونیک' })
</script>

<template>
  <div class="w-full min-w-0 overflow-x-clip">
    <UContainer class="py-4 sm:py-5">
      <HomeVersionSwitcher />
    </UContainer>

    <HomeLayoutV1 v-if="version === '1'" />
    <HomeLayoutV2 v-else-if="version === '2'" />
    <HomeLayoutV3 v-else-if="version === '3'" />
    <HomeLayoutV4 v-else-if="version === '4'" />
  </div>
</template>
