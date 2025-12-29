<script setup lang="ts">
import { App, ConfigProvider } from 'ant-design-vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme.store'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { computed } from 'vue'

const themeStore = useThemeStore()
const theme = computed<ThemeConfig>(() => ({
  token: themeStore.token,
  components: themeStore.components,
  algorithm: themeStore.algorithm,
  hashed: themeStore.hashed,
  inherit: themeStore.inherit,
}))
</script>

<template>
  <ConfigProvider
    :locale="themeStore.locale"
    :component-size="themeStore.componentSize"
    :direction="themeStore.direction"
    :theme="theme"
  >
    <App>
      <RouterView />
    </App>
  </ConfigProvider>
</template>

<style scoped></style>
