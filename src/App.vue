<script setup lang="ts">
import { App, ConfigProvider } from 'ant-design-vue'
import { RouterView } from 'vue-router'
import { usePanelThemeStore } from '@/stores/panel-theme.store'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { computed } from 'vue'

const panelThemeStore = usePanelThemeStore()
const theme = computed<ThemeConfig>(() => ({
  token: panelThemeStore.token,
  components: panelThemeStore.components,
  algorithm: panelThemeStore.algorithm,
  hashed: panelThemeStore.hashed,
  inherit: panelThemeStore.inherit,
}))
</script>

<template>
  <ConfigProvider
    :locale="panelThemeStore.locale"
    :component-size="panelThemeStore.componentSize"
    :direction="panelThemeStore.direction"
    :theme="theme"
  >
    <App>
      <RouterView />
    </App>
  </ConfigProvider>
</template>

<style scoped></style>
