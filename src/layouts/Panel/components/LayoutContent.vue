<template>
  <LayoutContent :style="contentStyle" class="p-6 overflow-y-auto">
    <slot />
  </LayoutContent>
</template>

<script setup lang="ts">
import { LayoutContent } from 'ant-design-vue'
import { computed } from 'vue'
import { theme } from 'ant-design-vue'

// ===== Composables =====
const { token } = theme.useToken()

// ===== Computed Token Values =====
const tokenValues = computed(() => token.value)

// ===== Content Styles =====
const contentStyle = computed(() => ({
  minHeight: '280px',
  backgroundColor: tokenValues.value.colorBgLayout,
}))
</script>

<style scoped>
/* Custom scrollbar styling */
.ant-layout-content::-webkit-scrollbar {
  width: 8px;
}

.ant-layout-content::-webkit-scrollbar-track {
  background: v-bind('tokenValues.colorBgContainer');
}

.ant-layout-content::-webkit-scrollbar-thumb {
  background: v-bind('tokenValues.colorBorderSecondary');
  border-radius: v-bind('tokenValues.borderRadiusLG + "px"');
}

.ant-layout-content::-webkit-scrollbar-thumb:hover {
  background: v-bind('tokenValues.colorBorder');
}
</style>
