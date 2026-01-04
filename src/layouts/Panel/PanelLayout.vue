<template>
  <Layout class="h-screen overflow-hidden">
    <LayoutHeader
      class="header-modern"
      :style="{
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px',
        height: '64px',
        lineHeight: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }"
    >
      <div class="flex items-center justify-between h-full">
        <!-- Left: Logo & Title -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <div
              class="logo-container"
              style="
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
              "
            >
              <ShoppingOutlined :style="{ fontSize: '20px', color: '#ffffff' }" />
            </div>
            <div class="flex flex-col">
              <h1
                class="m-0 text-lg font-bold"
                style="color: #1f2937; line-height: 1.2; margin-bottom: 2px"
              >
                پنل مدیریت
              </h1>
              <span class="text-xs" style="color: #6b7280; line-height: 1; font-size: 11px">
                فروشگاه آنلاین
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <Input
            v-model:value="searchQuery"
            placeholder="جستجو..."
            allow-clear
            class="header-search"
            style="width: 300px"
          >
            <template #prefix>
              <SearchOutlined style="color: #9ca3af" />
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

          <Divider type="vertical" style="height: 24px; margin: 0 8px" />

          <!-- User Menu -->
          <Dropdown :trigger="['click']" placement="bottomLeft">
            <div class="user-menu-trigger">
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
              <div class="user-info">
                <div class="user-name">مدیر سیستم</div>
                <div class="user-role">Administrator</div>
              </div>
              <DownOutlined
                :style="{
                  fontSize: '12px',
                  color: '#9ca3af',
                  transition: 'transform 0.3s',
                }"
                class="user-arrow"
              />
            </div>
            <template #overlay>
              <Menu class="user-dropdown-menu">
                <div class="user-dropdown-header">
                  <Avatar :size="48" :style="{ backgroundColor: '#667eea' }">
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </Avatar>
                  <div class="user-dropdown-info">
                    <div class="user-dropdown-name">مدیر سیستم</div>
                    <div class="user-dropdown-email">admin@example.com</div>
                  </div>
                </div>
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
        </div>
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
  MenuDivider,
  MenuItem,
  Divider,
  Button,
  Dropdown,
  Input,
  Avatar,
  Badge,
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
.header-modern {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.header-search :deep(.ant-input) {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
}

.header-search :deep(.ant-input):hover {
  border-color: #667eea;
}

.header-search :deep(.ant-input):focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

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
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.user-menu-trigger:hover {
  background-color: #f9fafb;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
  line-height: 1;
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
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -8px -8px 8px -8px;
  border-radius: 12px 12px 0 0;
}

.user-dropdown-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-dropdown-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
}

.user-dropdown-email {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
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

  .user-info {
    display: none;
  }

  .user-menu-trigger {
    padding: 4px;
  }
}
</style>
