<template>
  <Layout class="h-screen overflow-hidden">
    <LayoutHeader class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Avatar :style="{ backgroundColor: tokenValues.colorPrimary }">
          <template #icon>
            <ShoppingOutlined
              :style="{
                fontSize: tokenValues.fontSizeLG,
                color: tokenValues.colorTextLightSolid,
              }"
            />
          </template>
        </Avatar>
        <div class="flex flex-col">
          <Typography.Title :level="5" class="">پنل مدیریت</Typography.Title>
          <Typography.Text type="secondary" :style="{ fontSize: tokenValues.fontSizeSM }">
            فروشگاه آنلاین
          </Typography.Text>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Search -->
        <Input v-model:value="searchQuery" placeholder="جستجو..." allow-clear class="w-[300px]">
          <template #prefix>
            <SearchOutlined :style="{ color: tokenValues.colorTextSecondary }" />
          </template>
        </Input>

        <!-- Notifications -->
        <Badge :count="notificationCount" :offset="[-2, 2]">
          <Button
            type="text"
            shape="circle"
            class="header-action-btn flex items-center justify-center w-10 h-10 rounded-lg transition-all"
            @click="handleNotificationClick"
          >
            <template #icon>
              <BellOutlined :style="{ fontSize: tokenValues.fontSizeLG }" />
            </template>
          </Button>
        </Badge>

        <!-- Fullscreen Toggle -->
        <Button
          type="text"
          shape="circle"
          class="header-action-btn flex items-center justify-center w-10 h-10 rounded-lg transition-all"
          @click="toggle"
        >
          <template #icon>
            <FullscreenOutlined
              :style="{ fontSize: tokenValues.fontSizeLG }"
              v-if="!isFullscreen"
            />
            <FullscreenExitOutlined :style="{ fontSize: tokenValues.fontSizeLG }" v-else />
          </template>
        </Button>

        <Divider type="vertical" class="h-6 my-0 mx-2" />

        <!-- User Menu -->
        <Dropdown :trigger="['click']" placement="bottomLeft">
          <Space
            :size="12"
            align="center"
            class="user-menu-trigger px-3 py-1.5 rounded-lg cursor-pointer transition-all select-none"
          >
            <Avatar
              :size="36"
              class="cursor-pointer shrink-0"
              :style="{
                backgroundColor: tokenValues.colorPrimary,
              }"
            >
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
            <Space direction="vertical" :size="2">
              <Typography.Text
                :style="{
                  fontSize: tokenValues.fontSize,
                  fontWeight: 600,
                  color: tokenValues.colorTextHeading,
                }"
              >
                مدیر سیستم
              </Typography.Text>
              <Typography.Text
                :style="{
                  fontSize: tokenValues.fontSizeSM,
                  color: tokenValues.colorTextSecondary,
                }"
              >
                Administrator
              </Typography.Text>
            </Space>
            <DownOutlined
              :style="{
                fontSize: tokenValues.fontSizeSM,
                color: tokenValues.colorTextSecondary,
                transition: tokenValues.motionDurationMid,
              }"
              class="user-arrow transition-transform"
            />
          </Space>
          <template #overlay>
            <Menu class="user-dropdown-menu">
              <Space
                :size="12"
                align="center"
                class="user-dropdown-header px-4 py-3 -mt-2 rounded-t-lg"
              >
                <Avatar>
                  <template #icon>
                    <UserOutlined />
                  </template>
                </Avatar>
                <Space direction="vertical" :size="0">
                  <Typography.Text
                    :style="{
                      color: tokenValues.colorTextLightSolid,
                      fontSize: tokenValues.fontSize,
                      fontWeight: 600,
                    }"
                  >
                    مدیر سیستم
                  </Typography.Text>
                  <Typography.Text
                    :style="{
                      color: tokenValues.colorTextLightSolid,
                      fontSize: tokenValues.fontSizeSM,
                    }"
                  >
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
  Typography,
  Space,
} from 'ant-design-vue'
import {
  ShoppingOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
  SearchOutlined,
  BellOutlined,
  FullscreenOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue'
import { RouterView } from 'vue-router'
import { ref, computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useMenu } from '@/composable/useMenu'
import { useFullscreen } from '@vueuse/core'

const { token } = theme.useToken()
const { selectedKeys, menuItems } = useMenu()
const { isFullscreen, toggle } = useFullscreen()

const searchQuery = ref('')
const notificationCount = ref(3)

const handleNotificationClick = () => {
  // TODO: Open notifications panel
  console.log('Notifications clicked')
}

// Computed values for template usage
const tokenValues = computed(() => token.value)
</script>

<style scoped>
.header-action-btn:hover {
  background-color: v-bind('tokenValues.colorFillSecondary');
  color: v-bind('tokenValues.colorPrimary');
}

.user-menu-trigger:hover {
  background-color: v-bind('tokenValues.colorFillTertiary');
}

.user-menu-trigger:hover .user-arrow {
  transform: translateY(2px);
}

.user-dropdown-menu {
  min-width: 240px;
  border-radius: v-bind('tokenValues.borderRadiusLG + "px"');
  box-shadow: v-bind('tokenValues.boxShadowSecondary');
  padding: v-bind('tokenValues.paddingXS + "px 0"');
}

.user-dropdown-header {
  background: linear-gradient(
    135deg,
    v-bind('tokenValues.colorPrimary') 0%,
    v-bind('tokenValues.colorPrimaryHover') 100%
  );
  border-radius: v-bind(
    'tokenValues.borderRadiusLG + "px " + tokenValues.borderRadiusLG + "px 0 0"'
  );
}

.user-dropdown-menu :deep(.ant-menu-item) {
  margin: v-bind('tokenValues.marginXXS + "px " + tokenValues.marginXS + "px"');
  border-radius: v-bind('tokenValues.borderRadius + "px"');
  height: v-bind('tokenValues.controlHeight + "px"');
  line-height: v-bind('tokenValues.controlHeight + "px"');
  padding: v-bind('`0 ${tokenValues.paddingSM}px`');
  transition: all v-bind('tokenValues.motionDurationMid');
}

.user-dropdown-menu :deep(.ant-menu-item:hover) {
  background-color: v-bind('tokenValues.colorFillSecondary');
}

.user-dropdown-menu :deep(.ant-menu-item-danger) {
  color: v-bind('tokenValues.colorError');
}

.user-dropdown-menu :deep(.ant-menu-item-danger:hover) {
  background-color: v-bind('tokenValues.colorErrorBg');
  color: v-bind('tokenValues.colorErrorHover');
}

.user-dropdown-menu :deep(.ant-menu-item-icon) {
  font-size: v-bind('tokenValues.fontSize + "px"');
  margin-inline-end: v-bind('tokenValues.marginXS + "px"');
}

/* Responsive */
@media (max-width: 768px) {
  .user-menu-trigger :deep(.ant-space-item:not(:first-child):not(:last-child)) {
    display: none;
  }
}
</style>
