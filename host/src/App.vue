<template>
  <ConfigProvider
    :component-disabled="configStore.config.componentDisabled"
    :component-size="configStore.config.componentSize"
    :csp="configStore.config.csp"
    :direction="configStore.config.direction"
    :dropdown-match-select-width="configStore.config.dropdownMatchSelectWidth"
    :form="configStore.config.form"
    :wave="configStore.config.wave"
    :input="configStore.config.input"
    :auto-insert-space-in-button="configStore.config.autoInsertSpaceInButton"
    :get-popup-container="configStore.config.getPopupContainer"
    :get-prefix-cls="configStore.config.getPrefixCls"
    :get-target-container="configStore.config.getTargetContainer"
    :icon-prefix-cls="configStore.config.iconPrefixCls"
    :locale="configStore.config.locale"
    :page-header="configStore.config.pageHeader"
    :pagination="configStore.config.pagination"
    :select="configStore.config.select"
    :prefix-cls="configStore.config.prefixCls"
    :render-empty="configStore.config.renderEmpty"
    :space="configStore.config.space"
    :theme="configStore.config.theme"
    :transform-cell-text="configStore.config.transformCellText"
    :virtual="configStore.config.virtual"
    :class="configStore.config.class"
    :style="configStore.config.style"
    :key="configStore.config.key"
    :ref="configStore.config.ref"
  >
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue/es'
import { useConfigProviderStore } from './stores/config-provider.store'

const configStore = useConfigProviderStore()
</script>
