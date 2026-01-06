<template>
  <div class="layout-tabbar" :style="tabbarContainerStyle">
    <Tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      :style="tabsStyle"
      @edit="onEdit"
    >
      <TabPane v-for="tab in tabs" :key="tab.key" :tab="tab.title" :closable="tab.closable" />
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabPane } from 'ant-design-vue'
import { ref, computed } from 'vue'
import { theme } from 'ant-design-vue'

// ===== Composables =====
const { token } = theme.useToken()

// ===== Reactive State =====
const activeKey = ref('1')
const tabs = ref([
  { key: '1', title: 'داشبورد', closable: false },
  { key: '2', title: 'محصولات', closable: true },
  { key: '3', title: 'کاربران', closable: true },
])

// ===== Computed Token Values =====
const tokenValues = computed(() => token.value)

// ===== Tabbar Styles =====
const tabbarContainerStyle = computed(() => ({
  backgroundColor: tokenValues.value.colorBgContainer,
  borderBottom: `1px solid ${tokenValues.value.colorBorderSecondary}`,
  padding: `0 ${tokenValues.value.paddingSM}px`,
}))

const tabsStyle = computed(() => ({
  marginBottom: 0,
}))

// ===== Event Handlers =====
const onEdit = (
  targetKey: string | MouseEvent | KeyboardEvent | number,
  action: 'add' | 'remove',
) => {
  if (action === 'remove' && typeof targetKey === 'string') {
    const index = tabs.value.findIndex((tab) => tab.key === targetKey)
    if (index > -1) {
      const tab = tabs.value[index]
      if (tab && tab.closable) {
        tabs.value.splice(index, 1)

        // Update active key if the removed tab was active
        if (activeKey.value === targetKey && tabs.value.length > 0) {
          const prevTab = tabs.value[Math.max(0, index - 1)]
          if (prevTab) {
            activeKey.value = prevTab.key
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.layout-tabbar {
  position: relative;
}

.layout-tabbar :deep(.ant-tabs-nav) {
  margin: 0;
  padding: v-bind('tokenValues.paddingXS + "px 0"');
}

.layout-tabbar :deep(.ant-tabs-tab) {
  border-radius: v-bind('tokenValues.borderRadius + "px"');
  margin: v-bind('`0 ${tokenValues.marginXXS}px`');
  padding: v-bind('`${tokenValues.paddingXS}px ${tokenValues.paddingSM}px`');
  background-color: transparent;
  border: 1px solid transparent;
  transition: all v-bind('tokenValues.motionDurationMid');
}

.layout-tabbar :deep(.ant-tabs-tab:hover) {
  background-color: v-bind('tokenValues.colorFillSecondary');
  color: v-bind('tokenValues.colorPrimary');
}

.layout-tabbar :deep(.ant-tabs-tab-active) {
  background-color: v-bind('tokenValues.colorPrimaryBg');
  border-color: v-bind('tokenValues.colorPrimaryBorder');
}

.layout-tabbar :deep(.ant-tabs-tab-remove) {
  color: v-bind('tokenValues.colorTextSecondary');
  margin-inline-start: v-bind('tokenValues.marginXXS + "px"');
}

.layout-tabbar :deep(.ant-tabs-tab-remove:hover) {
  color: v-bind('tokenValues.colorError');
}
</style>
