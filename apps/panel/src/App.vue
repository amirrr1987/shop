<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import fa_IR from 'ant-design-vue/es/locale/fa_IR'
</script>

<template>
  <ConfigProvider :locale="fa_IR" direction="rtl"
  :theme="{
  token: {
      fontFamily: 'Vazirmatn',
    }
  }"
  >
    <RouterView />
  </ConfigProvider>
</template>
