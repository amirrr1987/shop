<template>
  <Layout class="h-screen overflow-hidden">
    <!-- Header -->
    <PanelHeader />

    <Layout>
      <!-- Sidebar -->
      <PanelSider />

      <!-- Main Content Area -->
      <Layout>
        <!-- Tabbar -->
        <LayoutTabbar />

        <!-- Content -->
        <PanelContent>
          <RouterView />
        </PanelContent>
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Layout } from 'ant-design-vue'
import { RouterView } from 'vue-router'
import { PanelHeader, PanelSider, PanelContent, LayoutTabbar } from './components'
</script>

<style scoped>
/* Layout container styling */
.h-screen {
  height: 100vh;
}

.overflow-hidden {
  overflow: hidden;
}
</style>
