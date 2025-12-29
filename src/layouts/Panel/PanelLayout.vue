<template>
  <Layout class="h-screen">
    <LayoutHeader>
      <h1>Panel</h1>
    </LayoutHeader>

    <Layout>
      <LayoutSider>
        <Menu class="h-full!" v-model:selectedKeys="selectedKeys">
          <MenuItem :icon="h(HomeOutlined)" key="TheDashboard"> داشبورد </MenuItem>
          <MenuDivider />
          <MenuItem :icon="h(ShoppingOutlined)" key="TheProducts"> محصولات </MenuItem>
          <MenuItem :icon="h(TagOutlined)" key="TheTags"> تگ ها </MenuItem>
          <MenuItem :icon="h(ShoppingOutlined)" key="TheCategories"> دسته بندی ها </MenuItem>
          <MenuDivider />
          <MenuItem :icon="h(FileOutlined)" key="TheMedia"> رسانه ها </MenuItem>
          <MenuItem :icon="h(SettingOutlined)" key="TheSettings"> تنظیمات </MenuItem>
        </Menu>
      </LayoutSider>
      <LayoutContent class="p-4">
        <RouterView />
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Layout, LayoutHeader, LayoutSider, LayoutContent, Menu, MenuItem, MenuDivider } from 'ant-design-vue'
import { HomeOutlined, ShoppingOutlined, FileOutlined, TagOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { RouterView, useRouter } from 'vue-router'
import { h, onMounted, ref, watch } from 'vue'

const selectedKeys = ref<string[]>([])

const router = useRouter()
onMounted(() => {
  selectedKeys.value = [router.currentRoute.value.name as string]
})
watch(
  selectedKeys,
  (newKeys) => {
    if (newKeys.length > 0) {
      router.push({ name: newKeys[0] })
    }
  },
  { immediate: true },
)
</script>
