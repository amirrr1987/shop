<template>
  <div ref="permissionContainer" />
</template>

<script setup lang="ts">
import { mountPermissionApp } from 'remotePermissions/PermissionBootstrap'
import { onMounted, onUnmounted, ref } from 'vue'

const permissionContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (permissionContainer.value && permissionContainer.value.childElementCount === 0) {
    mountPermissionApp(permissionContainer.value)
  }
})
onUnmounted(() => {
  if (permissionContainer.value) {
    permissionContainer.value.innerHTML = ''
  }
})
</script>
