<template>
  <Layout class="h-screen overflow-hidden">
    <LayoutHeader class="flex items-center justify-between">
      <h1>Panel</h1>
      <div class="flex items-center gap-2">
        <Divider type="vertical" />

        <Dropdown>
          <Button type="link" class="ant-dropdown-link" @click.prevent>
            <template #icon>
              <UserOutlined />
            </template>
          </Button>
          <template #overlay>
            <Menu>
              <MenuItem key="profile">
                <template #icon>
                  <UserOutlined />
                </template>
                پروفایل
              </MenuItem>
              <MenuItem key="change-password">
                <template #icon>
                  <LockOutlined />
                </template>
                تغییر رمز عبور
              </MenuItem>
              <MenuItem key="logout" danger>
                <template #icon>
                  <LogoutOutlined />
                </template>
                خروج
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </div>
    </LayoutHeader>

    <Layout>
      <LayoutSider width="240" collapsible>
        <Menu v-model:selectedKeys="selectedKeys" :items="menuItems" mode="inline" />
      </LayoutSider>
      <LayoutContent class="p-4 overflow-y-auto">
        <RouterView />
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import {
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Menu,
  Divider,
  Button,
  Dropdown,
  MenuItem,
  type MenuProps,
} from 'ant-design-vue'
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  MenuOutlined,
  TagOutlined,
  FileOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
} from '@ant-design/icons-vue'
import { RouterView, useRouter } from 'vue-router'
import { h, onMounted, ref, watch } from 'vue'

const selectedKeys = ref<string[]>([])
const menuItems = ref<MenuProps['items']>([
  {
    key: 'TheDashboard',
    icon: h(HomeOutlined),
    label: 'داشبورد',
  },
  {
    type: 'divider',
  },
  {
    key: 'TheProduct',
    icon: h(ShoppingOutlined),
    label: 'محصولات',
    children: [
      {
        key: 'TheProductCreate',
        icon: h(PlusOutlined),
        label: 'ایجاد محصول',
      },
      {
        key: 'TheProductList',
        icon: h(UnorderedListOutlined),
        label: 'لیست محصولات',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'TheCustomer',
    icon: h(UserOutlined),
    label: 'مشتریان',
    children: [
      {
        key: 'TheCustomerCreate',
        icon: h(PlusOutlined),
        label: 'ایجاد مشتری',
      },
      {
        key: 'TheCustomerList',
        icon: h(UnorderedListOutlined),
        label: 'لیست مشتریان',
      },
    ],
  },
  {
    key: 'TheTags',
    icon: h(TagOutlined),
    label: 'تگ ها',
    children: [
      {
        key: 'TheTagCreate',
        icon: h(PlusOutlined),
        label: 'ایجاد تگ',
      },
      {
        key: 'TheTagList',
        icon: h(UnorderedListOutlined),
        label: 'لیست تگ ها',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'TheCategory',
    icon: h(ShoppingOutlined),
    label: 'دسته بندی ها',
    children: [
      {
        key: 'TheCategoryCreate',
        icon: h(PlusOutlined),
        label: 'ایجاد دسته بندی',
      },
      {
        key: 'TheCategoryList',
        icon: h(UnorderedListOutlined),
        label: 'لیست دسته بندی ها',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'TheMenu',
    icon: h(MenuOutlined),
    label: 'منوها',
    children: [
      {
        key: 'TheMenuCreate',
        icon: h(PlusOutlined),
        label: 'ایجاد منو',
      },
      {
        key: 'TheMenuList',
        icon: h(UnorderedListOutlined),
        label: 'لیست منوها',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'TheMedia',
    icon: h(FileOutlined),
    label: 'رسانه ها',
  },
  {
    type: 'divider',
  },
  {
    key: 'TheSetting',
    icon: h(SettingOutlined),
    label: 'تنظیمات',
    children: [
      {
        key: 'TheShopSetting',
        icon: h(SettingOutlined),
        label: 'تنظیمات فروشگاه',
      },
      {
        key: 'ThePanelSetting',
        icon: h(SettingOutlined),
        label: 'تنظیمات پنل',
      },
    ],
  },
])
const router = useRouter()

// Map route names to menu keys
// const routeToMenuKey = (routeName: string | symbol | undefined): string => {
//   if (!routeName || typeof routeName !== 'string') return 'TheDashboard'

//   // Map Create/List routes to parent menu key
//   if (routeName.includes('Product')) return 'TheProduct'
//   if (routeName.includes('Tag')) return 'TheTags'
//   if (routeName.includes('Categor')) return 'TheCategory'
//   if (routeName.includes('Menu')) return 'TheMenu'

//   return routeName
// }

onMounted(() => {
  const currentRouteName = router.currentRoute.value.name
  selectedKeys.value = [currentRouteName as string]
})

watch(
  () => router.currentRoute.value.name,
  (newRouteName) => {
    selectedKeys.value = [newRouteName as string]
  },
)

watch(selectedKeys, (newKeys) => {
  if (newKeys.length > 0) {
    const key = newKeys[0]
    if (!key) return
    // Map menu keys to route names
    // const routeMap: Record<string, string> = {
    //   TheProduct: 'TheProductList',
    //   TheTags: 'TheTagList',
    //   TheCategory: 'TheCategoriesList',
    //   TheMenu: 'TheMenusList',
    // }
    router.push({ name: key })
  }
})
</script>
