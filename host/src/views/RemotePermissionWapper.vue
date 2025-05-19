<template>
  <div id="permission-container" />
</template>

<script setup lang="ts">
import { mountPermissionApp } from 'remotePermissions/PermissionBootstrap'
import { onMounted } from 'vue'

onMounted(() => {
  const container = document.getElementById('permission-container')
  if (container) {
    container.innerHTML = ''
    mountPermissionApp(container)
  }
})
</script>
