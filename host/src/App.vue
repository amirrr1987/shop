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
// import { TheConfigProvider } from '@Panel/shared'
import { TheConfigProvider, useConfigProviderStore } from '@Panel/shared'
import { theme as antTheme } from 'ant-design-vue/es'
import { ref } from 'vue'
import type { MappingAlgorithm } from 'ant-design-vue/es/config-provider/context'

const configProviderStore = useConfigProviderStore()
configProviderStore.configProvider.direction = 'rtl'

const algorithm = ref<MappingAlgorithm[]>([antTheme.compactAlgorithm, antTheme.darkAlgorithm])
configProviderStore.configProvider.theme = {
  algorithm: algorithm.value,
}
</script>
