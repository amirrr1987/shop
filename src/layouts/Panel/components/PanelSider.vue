<template>
  <LayoutSider
    v-model:collapsed="collapsed"
    :width="siderWidth"
    :collapsed-width="collapsedWidth"
    collapsible
    :style="siderStyle"
    class="panel-sider"
  >
    <Menu
      v-model:selectedKeys="selectedKeys"
      :items="menuItems"
      mode="inline"
      :style="menuStyle"
      :inline-collapsed="collapsed"
    />
  </LayoutSider>
</template>

<script setup lang="ts">
import { LayoutSider, Menu } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { theme } from 'ant-design-vue'
import { useMenu } from '@/composable/useMenu'

// ===== Composables =====
const { token } = theme.useToken()
const { selectedKeys, menuItems } = useMenu()

// ===== Reactive State =====
const collapsed = ref(false)

// ===== Constants =====
const siderWidth = 240
const collapsedWidth = 80

// ===== Computed Token Values =====
const tokenValues = computed(() => token.value)

// ===== Sider Styles =====
const siderStyle = computed(() => ({
  backgroundColor: tokenValues.value.colorBgContainer,
  borderInlineEnd: `1px solid ${tokenValues.value.colorBorderSecondary}`,
}))

const menuStyle = computed(() => ({
  height: '100%',
  borderInlineEnd: 'none',
}))
</script>

<style scoped>
.panel-sider {
  overflow: auto;
  height: 100%;
}

.panel-sider :deep(.ant-layout-sider-trigger) {
  background-color: v-bind('tokenValues.colorBgContainer');
  border-top: 1px solid v-bind('tokenValues.colorBorderSecondary');
  color: v-bind('tokenValues.colorText');
}

.panel-sider :deep(.ant-layout-sider-trigger:hover) {
  background-color: v-bind('tokenValues.colorFillSecondary');
  color: v-bind('tokenValues.colorPrimary');
}
</style>
