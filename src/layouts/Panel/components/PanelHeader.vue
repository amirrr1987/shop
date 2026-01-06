<template>
  <LayoutHeader class="flex items-center justify-between px-6 py-0">
    <!-- Logo & Brand Section -->
    <div class="flex items-center gap-3">
      <Avatar :size="44" :style="headerLogoStyle">
        <template #icon>
          <ShoppingOutlined :style="headerLogoIconStyle" />
        </template>
      </Avatar>

      <div class="flex flex-col gap-0">
        <Typography.Title :level="5" :style="headerTitleStyle" class="m-0">
          پنل مدیریت
        </Typography.Title>
        <Typography.Text :style="headerSubtitleStyle"> فروشگاه آنلاین </Typography.Text>
      </div>
    </div>

    <!-- Actions Section -->
    <div class="flex items-center gap-3">
      <!-- Search Input -->
      <Input
        v-model:value="searchQuery"
        placeholder="جستجو در پنل..."
        allow-clear
        class="w-[280px]"
        :style="searchInputStyle"
      >
        <template #prefix>
          <SearchOutlined :style="searchIconStyle" />
        </template>
      </Input>

      <!-- Action Buttons Group -->
      <div class="flex items-center gap-1">
        <!-- Notifications Button -->
        <Badge :count="notificationCount" :offset="[-4, 4]" :overflow-count="99">
          <Button
            type="text"
            shape="circle"
            class="header-action-btn flex items-center justify-center w-10 h-10 rounded-lg transition-all"
            :title="notificationTitle"
            @click="handleNotificationClick"
          >
            <template #icon>
              <BellOutlined :style="actionIconStyle" />
            </template>
          </Button>
        </Badge>

        <!-- Fullscreen Toggle Button -->
        <Button
          type="text"
          shape="circle"
          class="header-action-btn flex items-center justify-center w-10 h-10 rounded-lg transition-all"
          :title="fullscreenTitle"
          @click="toggle"
        >
          <template #icon>
            <FullscreenOutlined v-if="!isFullscreen" :style="actionIconStyle" />
            <FullscreenExitOutlined v-else :style="actionIconStyle" />
          </template>
        </Button>
      </div>

      <Divider type="vertical" class="h-6 my-0 mx-2" />

      <!-- User Profile Dropdown -->
      <Dropdown :trigger="['click']" placement="bottomLeft">
        <Space
          :size="12"
          align="center"
          class="user-menu-trigger px-3 py-1.5 rounded-lg cursor-pointer transition-all select-none"
        >
          <Avatar :size="38" class="cursor-pointer shrink-0" :style="userAvatarStyle">
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>

          <Space direction="vertical" :size="0" class="hidden md:flex">
            <Typography.Text :style="userNameStyle">
              {{ currentUser.name }}
            </Typography.Text>
            <Typography.Text :style="userRoleStyle">
              {{ currentUser.role }}
            </Typography.Text>
          </Space>

          <DownOutlined
            :style="userArrowStyle"
            class="user-arrow transition-transform hidden md:inline-block"
          />
        </Space>

        <!-- User Dropdown Menu -->
        <template #overlay>
          <Menu class="user-dropdown-menu min-w-[260px]">
            <!-- User Info Header -->
            <div class="user-dropdown-header px-4 py-3 -mt-2 rounded-t-lg">
              <Space :size="12" align="center">
                <Avatar :size="48">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </Avatar>

                <Space direction="vertical" :size="2" class="flex-1">
                  <Typography.Text :style="dropdownHeaderNameStyle">
                    {{ currentUser.name }}
                  </Typography.Text>
                  <Typography.Text :style="dropdownHeaderEmailStyle">
                    {{ currentUser.email }}
                  </Typography.Text>
                </Space>
              </Space>
            </div>

            <MenuDivider />

            <!-- Profile Menu Item -->
            <MenuItem key="profile" @click="handleProfileClick">
              <template #icon>
                <UserOutlined />
              </template>
              پروفایل من
            </MenuItem>

            <MenuDivider />

            <!-- Settings Menu Item -->
            <MenuItem key="settings" @click="handleSettingsClick">
              <template #icon>
                <SettingOutlined />
              </template>
              تنظیمات
            </MenuItem>

            <!-- Change Password Menu Item -->
            <MenuItem key="change-password" @click="handleChangePasswordClick">
              <template #icon>
                <LockOutlined />
              </template>
              تغییر رمز عبور
            </MenuItem>

            <MenuDivider />

            <!-- Help Menu Item -->
            <MenuItem key="help" @click="handleHelpClick">
              <template #icon>
                <QuestionCircleOutlined />
              </template>
              راهنما
            </MenuItem>

            <MenuDivider />

            <!-- Logout Menu Item -->
            <MenuItem key="logout" danger @click="handleLogoutClick">
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
</template>

<script setup lang="ts">
import {
  LayoutHeader,
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
import { ref, computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useFullscreen } from '@vueuse/core'

// ===== Composables =====
const { token } = theme.useToken()
const { isFullscreen, toggle } = useFullscreen()

// ===== Reactive State =====
const searchQuery = ref('')
const notificationCount = ref(3)

// ===== Current User Data =====
const currentUser = computed(() => ({
  name: 'مدیر سیستم',
  role: 'Administrator',
  email: 'admin@example.com',
}))

// ===== Computed Token Values =====
const tokenValues = computed(() => token.value)

// ===== Header Logo Styles =====
const headerLogoStyle = computed(() => ({
  backgroundColor: tokenValues.value.colorPrimary,
}))

const headerLogoIconStyle = computed(() => ({
  fontSize: tokenValues.value.fontSizeHeading4 + 'px',
  color: tokenValues.value.colorTextLightSolid,
}))

// ===== Header Text Styles =====
const headerTitleStyle = computed(() => ({
  fontSize: tokenValues.value.fontSizeLG + 'px',
  fontWeight: 600,
  color: tokenValues.value.colorTextHeading,
  margin: 0,
}))

const headerSubtitleStyle = computed(() => ({
  fontSize: tokenValues.value.fontSizeSM + 'px',
  color: tokenValues.value.colorTextSecondary,
  lineHeight: 1.2,
}))

// ===== Search Input Styles =====
const searchInputStyle = computed(() => ({
  borderRadius: tokenValues.value.borderRadiusLG + 'px',
}))

const searchIconStyle = computed(() => ({
  color: tokenValues.value.colorTextSecondary,
  fontSize: tokenValues.value.fontSize + 'px',
}))

// ===== Action Button Styles =====
const actionIconStyle = computed(() => ({
  fontSize: tokenValues.value.fontSizeLG + 'px',
  color: tokenValues.value.colorText,
}))

// ===== User Avatar & Menu Styles =====
const userAvatarStyle = computed(() => ({
  backgroundColor: tokenValues.value.colorPrimary,
}))

const userNameStyle = computed(() => ({
  fontSize: tokenValues.value.fontSize + 'px',
  fontWeight: 600,
  color: tokenValues.value.colorTextHeading,
  lineHeight: 1.4,
}))

const userRoleStyle = computed(() => ({
  fontSize: tokenValues.value.fontSizeSM + 'px',
  color: tokenValues.value.colorTextSecondary,
  lineHeight: 1.2,
}))

const userArrowStyle = computed(() => ({
  fontSize: tokenValues.value.fontSizeSM + 'px',
  color: tokenValues.value.colorTextSecondary,
  transition: `transform ${tokenValues.value.motionDurationMid}`,
}))

// ===== Dropdown Header Styles =====
const dropdownHeaderNameStyle = computed(() => ({
  color: tokenValues.value.colorTextLightSolid,
  fontSize: tokenValues.value.fontSize + 'px',
  fontWeight: 600,
  lineHeight: 1.4,
}))

const dropdownHeaderEmailStyle = computed(() => ({
  color: tokenValues.value.colorTextLightSolid,
  fontSize: tokenValues.value.fontSizeSM + 'px',
  lineHeight: 1.2,
  opacity: 0.9,
}))

// ===== Tooltips =====
const notificationTitle = computed(() =>
  notificationCount.value > 0 ? `${notificationCount.value} اعلان جدید` : 'اعلان‌ها',
)

const fullscreenTitle = computed(() =>
  isFullscreen.value ? 'خروج از حالت تمام صفحه' : 'حالت تمام صفحه',
)

// ===== Event Handlers =====
const handleNotificationClick = () => {
  // TODO: Open notifications panel
  console.log('Notifications clicked')
}

const handleProfileClick = () => {
  console.log('Profile clicked')
  // TODO: Navigate to profile page
}

const handleSettingsClick = () => {
  console.log('Settings clicked')
  // TODO: Navigate to settings page
}

const handleChangePasswordClick = () => {
  console.log('Change password clicked')
  // TODO: Open change password modal
}

const handleHelpClick = () => {
  console.log('Help clicked')
  // TODO: Open help documentation
}

const handleLogoutClick = () => {
  console.log('Logout clicked')
  // TODO: Implement logout logic
}
</script>

<style scoped>
/* ===== Header Action Buttons ===== */
.header-action-btn {
  border: 1px solid transparent;
}

.header-action-btn:hover {
  background-color: v-bind('tokenValues.colorFillSecondary');
  border-color: v-bind('tokenValues.colorBorder');
  color: v-bind('tokenValues.colorPrimary');
}

.header-action-btn:active {
  background-color: v-bind('tokenValues.colorFillTertiary');
}

/* ===== User Menu Trigger ===== */
.user-menu-trigger {
  border: 1px solid transparent;
}

.user-menu-trigger:hover {
  background-color: v-bind('tokenValues.colorFillTertiary');
  border-color: v-bind('tokenValues.colorBorder');
}

.user-menu-trigger:hover .user-arrow {
  transform: translateY(2px);
  color: v-bind('tokenValues.colorPrimary');
}

/* ===== User Dropdown Menu ===== */
.user-dropdown-menu {
  border-radius: v-bind('tokenValues.borderRadiusLG + "px"');
  box-shadow: v-bind('tokenValues.boxShadowSecondary');
  padding: v-bind('tokenValues.paddingXS + "px 0"');
}

/* User Dropdown Header */
.user-dropdown-header {
  background: linear-gradient(
    135deg,
    v-bind('tokenValues.colorPrimary') 0%,
    v-bind('tokenValues.colorPrimaryHover') 100%
  );
  border-radius: v-bind(
    'tokenValues.borderRadiusLG + "px " + tokenValues.borderRadiusLG + "px 0 0"'
  );
  margin-bottom: v-bind('tokenValues.marginXS + "px"');
}

/* Menu Items Styling */
.user-dropdown-menu :deep(.ant-menu-item) {
  margin: v-bind('tokenValues.marginXXS + "px " + tokenValues.marginXS + "px"');
  border-radius: v-bind('tokenValues.borderRadius + "px"');
  height: v-bind('tokenValues.controlHeight + "px"');
  line-height: v-bind('tokenValues.controlHeight + "px"');
  padding: v-bind('`0 ${tokenValues.paddingSM}px`');
  transition: all v-bind('tokenValues.motionDurationMid');
  font-size: v-bind('tokenValues.fontSize + "px"');
}

.user-dropdown-menu :deep(.ant-menu-item:hover) {
  background-color: v-bind('tokenValues.colorFillSecondary');
  color: v-bind('tokenValues.colorPrimaryHover');
}

.user-dropdown-menu :deep(.ant-menu-item-active) {
  background-color: v-bind('tokenValues.colorPrimaryBg');
}

/* Danger Item Styling */
.user-dropdown-menu :deep(.ant-menu-item-danger) {
  color: v-bind('tokenValues.colorError');
}

.user-dropdown-menu :deep(.ant-menu-item-danger:hover) {
  background-color: v-bind('tokenValues.colorErrorBg');
  color: v-bind('tokenValues.colorErrorHover');
}

.user-dropdown-menu :deep(.ant-menu-item-danger:active) {
  background-color: v-bind('tokenValues.colorErrorBgHover');
}

/* Menu Icon Styling */
.user-dropdown-menu :deep(.ant-menu-item-icon) {
  font-size: v-bind('tokenValues.fontSize + "px"');
  margin-inline-end: v-bind('tokenValues.marginXS + "px"');
}

/* Menu Divider Styling */
.user-dropdown-menu :deep(.ant-menu-item-divider) {
  margin: v-bind('tokenValues.marginXS + "px 0"');
  background-color: v-bind('tokenValues.colorBorderSecondary');
}

/* ===== Responsive Design ===== */
@media (max-width: 768px) {
  /* Hide user name and role on mobile */
  .user-menu-trigger :deep(.ant-space-item:not(:first-child):not(:last-child)) {
    display: none;
  }
}

@media (max-width: 640px) {
  /* Make search input smaller on mobile */
  .w-\[280px\] {
    width: 180px;
  }
}
</style>
