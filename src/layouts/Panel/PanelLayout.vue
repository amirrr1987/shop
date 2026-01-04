<template>
  <Layout :style="{ height: '100vh', overflow: 'hidden' }">
    <LayoutHeader>
      <Space :style="{ width: '100%', height: '100%' }" justify="space-between" align="center">
        <!-- Left: Logo & Title -->
        <Space :size="16" align="center">
          <Space :size="12" align="center">
            <Avatar :style="{ backgroundColor: '#667eea' }">
              <template #icon>
                <ShoppingOutlined :style="{ fontSize: '20px', color: '#fff' }" />
              </template>
            </Avatar>
            <Space direction="vertical" :size="0">
              <Typography.Title :level="5" :style="{ margin: 0 }">پنل مدیریت</Typography.Title>
              <Typography.Text type="secondary" :style="{ fontSize: '12px' }">
                فروشگاه آنلاین
              </Typography.Text>
            </Space>
          </Space>
        </Space>

        <!-- Right: Actions -->
        <Space :size="12" align="center">
          <!-- Search -->
          <Input
            v-model:value="searchQuery"
            placeholder="جستجو..."
            allow-clear
            :style="{ width: '300px' }"
          >
            <template #prefix>
              <SearchOutlined :style="{ color: '#9ca3af' }" />
            </template>
          </Input>

          <!-- Notifications -->
          <Badge :count="notificationCount" :offset="[-2, 2]">
            <Button
              type="text"
              shape="circle"
              class="header-action-btn"
              @click="handleNotificationClick"
            >
              <template #icon>
                <BellOutlined :style="{ fontSize: '18px' }" />
              </template>
            </Button>
          </Badge>

          <!-- Fullscreen Toggle -->
          <Button type="text" shape="circle" class="header-action-btn" @click="toggleFullscreen">
            <template #icon>
              <FullscreenOutlined :style="{ fontSize: '18px' }" />
            </template>
          </Button>

          <Divider type="vertical" :style="{ height: '24px', margin: '0 8px' }" />

          <!-- User Menu -->
          <Dropdown :trigger="['click']" placement="bottomLeft">
            <Space :size="12" align="center" class="user-menu-trigger">
              <Avatar
                :size="36"
                :style="{
                  backgroundColor: '#667eea',
                  cursor: 'pointer',
                  flexShrink: 0,
                }"
              >
                <template #icon>
                  <UserOutlined />
                </template>
              </Avatar>
              <Space direction="vertical" :size="2">
                <Typography.Text :style="{ fontSize: '14px', fontWeight: 600, color: '#1f2937' }">
                  مدیر سیستم
                </Typography.Text>
                <Typography.Text :style="{ fontSize: '12px', color: '#6b7280' }">
                  Administrator
                </Typography.Text>
              </Space>
              <DownOutlined
                :style="{
                  fontSize: '12px',
                  color: '#9ca3af',
                  transition: 'transform 0.3s',
                }"
                class="user-arrow"
              />
            </Space>
            <template #overlay>
              <Menu class="user-dropdown-menu">
                <Space :size="12" align="center" class="user-dropdown-header">
                  <Avatar>
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </Avatar>
                  <Space direction="vertical" :size="0">
                    <Typography.Text :style="{ color: '#fff', fontSize: '14px', fontWeight: 600 }">
                      مدیر سیستم
                    </Typography.Text>
                    <Typography.Text :style="{ color: '#fff', fontSize: '12px' }">
                      admin@example.com
                    </Typography.Text>
                  </Space>
                </Space>
                <MenuDivider />
                <MenuItem key="profile">
                  <template #icon>
                    <UserOutlined />
                  </template>
                  پروفایل من
                </MenuItem>
                <MenuItem key="settings">
                  <template #icon>
                    <SettingOutlined />
                  </template>
                  تنظیمات
                </MenuItem>
                <MenuItem key="change-password">
                  <template #icon>
                    <LockOutlined />
                  </template>
                  تغییر رمز عبور
                </MenuItem>
                <MenuDivider />
                <MenuItem key="help">
                  <template #icon>
                    <QuestionCircleOutlined />
                  </template>
                  راهنما
                </MenuItem>
                <MenuDivider />
                <MenuItem key="logout" danger>
                  <template #icon>
                    <LogoutOutlined />
                  </template>
                  خروج از حساب کاربری
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </Space>
      </Space>
    </LayoutHeader>

    <Layout>
      <LayoutSider width="240" collapsible>
        <Menu v-model:selectedKeys="selectedKeys" :items="menuItems" mode="inline" />
      </LayoutSider>
      <LayoutContent :style="{ padding: '16px', overflowY: 'auto' }">
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
  MenuDivider,
  MenuItem,
  Divider,
  Button,
  Dropdown,
  Input,
  Avatar,
  Badge,
  Typography,
  Space,
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
  SearchOutlined,
  BellOutlined,
  FullscreenOutlined,
  DownOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue'
import { RouterView, useRouter } from 'vue-router'
import { h, onMounted, ref, watch } from 'vue'

const selectedKeys = ref<string[]>([])
const searchQuery = ref('')
const notificationCount = ref(3)
const isFullscreen = ref(false)

const handleNotificationClick = () => {
  // TODO: Open notifications panel
  console.log('Notifications clicked')
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

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

<style scoped>
.header-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.2s;
}

.header-action-btn:hover {
  background-color: #f3f4f6;
  color: #667eea;
}

.user-menu-trigger {
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.user-menu-trigger:hover {
  background-color: #f9fafb;
}

.user-arrow {
  transition: transform 0.3s;
}

.user-menu-trigger:hover .user-arrow {
  transform: translateY(2px);
}

.user-dropdown-menu {
  min-width: 240px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
}

.user-dropdown-header {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-top: -8px;
  border-radius: 12px 12px 0 0;
}

.user-dropdown-menu :deep(.ant-menu-item) {
  margin: 4px 8px;
  border-radius: 8px;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  transition: all 0.2s;
}

.user-dropdown-menu :deep(.ant-menu-item:hover) {
  background-color: #f3f4f6;
}

.user-dropdown-menu :deep(.ant-menu-item-danger) {
  color: #ef4444;
}

.user-dropdown-menu :deep(.ant-menu-item-danger:hover) {
  background-color: #fef2f2;
  color: #dc2626;
}

.user-dropdown-menu :deep(.ant-menu-item-icon) {
  font-size: 16px;
  margin-inline-end: 10px;
}

.logo-container {
  transition: transform 0.3s;
}

.logo-container:hover {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .header-search {
    display: none;
  }

  .user-menu-trigger :deep(.ant-space-item:not(:first-child):not(:last-child)) {
    display: none;
  }

  .user-menu-trigger {
    padding: 4px;
  }
}
</style>
