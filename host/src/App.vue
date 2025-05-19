<template>
  <TheConfigProvider>
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="/permission">permission</RouterLink>
    <Button type="primary" @click="configProviderStore.configProvider.componentSize = 'small'">
      small
    </Button>
    <Button type="primary" @click="configProviderStore.configProvider.componentSize = 'large'">
      large
    </Button>

    <RouterView />
  </TheConfigProvider>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Button } from 'ant-design-vue/es'
import { TheConfigProvider } from '@Panel/shared'
import { useConfigProviderStore } from '@Panel/shared'

const configProviderStore = useConfigProviderStore()
configProviderStore.configProvider.direction = 'rtl'
</script>
