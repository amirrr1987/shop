<template>
  <Card>
    <template #title>
      <Space direction="vertical" :size="0" justify="center" class="pt-4">
        <Space>
          <SettingOutlined />
          <Typography.Title :level="5">تنظیمات پنل</Typography.Title>
        </Space>
        <Typography.Paragraph type="secondary">
          شخصی‌سازی ظاهر و رفتار پنل مدیریت
        </Typography.Paragraph>
      </Space>
    </template>
    <template #extra>
      <Button type="text" @click="handleResetSettings">
        <template #icon>
          <ReloadOutlined />
        </template>
        بازنشانی تنظیمات
      </Button>
    </template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <!-- Primary Color Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <BgColorsOutlined />
            <span>رنگ اصلی</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="my-1 mb-3 text-xs">
          انتخاب رنگ اصلی پنل
        </Typography.Paragraph>
        <div class="grid grid-cols-4 gap-2">
          <Button
            v-for="color in presetColors"
            :key="color"
            @click="panelThemeStore.token.colorPrimary = color"
            :type="panelThemeStore.token.colorPrimary === color ? 'primary' : 'default'"
            :style="{
              backgroundColor: color,
              borderColor: panelThemeStore.token.colorPrimary === color ? color : '#d9d9d9',
            }"
            :title="color"
            class="aspect-square w-full h-10"
          />
        </div>
      </Card>

      <!-- Component Size Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <FontSizeOutlined />
            <span>اندازه کامپوننت</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          اندازه پیش‌فرض عناصر
        </Typography.Paragraph>
        <RadioGroup
          v-model:value="panelThemeStore.componentSize"
          :options="componentSizeOptions"
          optionType="button"
          buttonStyle="solid"
          class="w-full"
        />
      </Card>

      <!-- Border Radius Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <BorderOutlined />
            <span>شعاع گوشه</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          انحنای گوشه‌های المان‌ها
        </Typography.Paragraph>
        <Slider :min="0" :max="16" v-model:value="panelThemeStore.token.borderRadius" />
        <InputNumber
          :value="(panelThemeStore.token.borderRadius as number) || 6"
          @update:value="handleBorderRadiusChange"
          :min="0"
          :max="16"
          class="w-full mt-2"
          addonAfter="px"
        />
      </Card>

      <!-- Dark Mode Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <BulbOutlined />
            <span>حالت تاریک</span>
          </Space>
        </template>
        <Space class="w-full mt-2" direction="vertical" :size="12">
          <Space class="w-full" :size="16" align="center">
            <div class="flex-1">
              <Typography.Text strong class="block">تم تاریک</Typography.Text>
              <Typography.Paragraph type="secondary" class="my-0 text-xs">
                فعال‌سازی حالت شب
              </Typography.Paragraph>
            </div>
            <Switch :checked="panelThemeStore.isDark" @change="panelThemeStore.toggleDark" />
          </Space>
        </Space>
      </Card>

      <!-- Compact Mode Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <CompressOutlined />
            <span>حالت فشرده</span>
          </Space>
        </template>
        <Space class="w-full mt-2" direction="vertical" :size="12">
          <Space class="w-full" :size="16" align="center">
            <div class="flex-1">
              <Typography.Text strong class="block">فشرده‌سازی</Typography.Text>
              <Typography.Paragraph type="secondary" class="my-0 text-xs">
                کاهش فاصله‌ها
              </Typography.Paragraph>
            </div>
            <Switch :checked="panelThemeStore.isCompact" @change="panelThemeStore.toggleCompact" />
          </Space>
        </Space>
      </Card>

      <!-- Font Size Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <FontSizeOutlined />
            <span>اندازه فونت</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          تنظیم اندازه متن
        </Typography.Paragraph>
        <Slider
          :min="12"
          :max="18"
          v-model:value="panelThemeStore.token.fontSize"
          :marks="fontSizeMarks"
        />
        <Space class="w-full mt-2" :size="8" align="center">
          <Typography.Text type="secondary" class="text-xs">کوچک</Typography.Text>
          <Typography.Text strong class="flex-1 text-center">
            {{ panelThemeStore.token.fontSize }}px
          </Typography.Text>
          <Typography.Text type="secondary" class="text-xs">بزرگ</Typography.Text>
        </Space>
      </Card>

      <!-- Animation Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <ThunderboltOutlined />
            <span>انیمیشن</span>
          </Space>
        </template>
        <Space class="w-full mt-2" direction="vertical" :size="12">
          <Space class="w-full" :size="16" align="center">
            <div class="flex-1">
              <Typography.Text strong class="block">جلوه‌های بصری</Typography.Text>
              <Typography.Paragraph type="secondary" class="my-0 text-xs">
                فعال‌سازی انیمیشن‌ها
              </Typography.Paragraph>
            </div>
            <Switch v-model:checked="animationEnabled" />
          </Space>
        </Space>
      </Card>

      <!-- Layout Type Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <LayoutOutlined />
            <span>نوع لایوت</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          چیدمان کلی صفحه
        </Typography.Paragraph>
        <RadioGroup
          v-model:value="layoutType"
          :options="layoutOptions"
          optionType="button"
          buttonStyle="solid"
          class="w-full"
        />
      </Card>

      <!-- Sidebar Position Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <MenuOutlined />
            <span>موقعیت منو</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          قرارگیری سایدبار
        </Typography.Paragraph>
        <RadioGroup
          v-model:value="sidebarPosition"
          :options="sidebarOptions"
          optionType="button"
          buttonStyle="solid"
          class="w-full"
        />
      </Card>

      <!-- Language Card -->
      <Card :hoverable="true" class="setting-card">
        <template #title>
          <Space>
            <GlobalOutlined />
            <span>زبان</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          زبان رابط کاربری
        </Typography.Paragraph>
        <Select v-model:value="selectedLanguage" class="w-full" :options="languageOptions" />
      </Card>

      <!-- Reset Settings Card -->
      <Card :hoverable="true" class="setting-card card-danger">
        <template #title>
          <Space>
            <ReloadOutlined />
            <span>بازنشانی</span>
          </Space>
        </template>
        <Typography.Paragraph type="secondary" class="mb-3 text-xs">
          برگرداندن به حالت اولیه
        </Typography.Paragraph>
        <Button type="primary" danger block @click="handleResetSettings">
          <ReloadOutlined class="me-1" />
          بازنشانی تنظیمات
        </Button>
      </Card>
    </div>
  </Card>
</template>

<script setup lang="ts">
import {
  Button,
  Switch,
  Select,
  Typography,
  Space,
  Card,
  InputNumber,
  Slider,
  RadioGroup,
  message,
} from 'ant-design-vue'
import {
  BgColorsOutlined,
  FontSizeOutlined,
  BorderOutlined,
  LayoutOutlined,
  SettingOutlined,
  BulbOutlined,
  CompressOutlined,
  ThunderboltOutlined,
  MenuOutlined,
  GlobalOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { usePanelThemeStore } from '@/stores/panel-theme.store'

// ===== Store =====
const panelThemeStore = usePanelThemeStore()

// ===== Reactive State =====
const animationEnabled = ref(true)
const layoutType = ref('side')
const sidebarPosition = ref('right')
const selectedLanguage = ref('fa')

// ===== Options =====
const componentSizeOptions = [
  { label: 'کوچک', value: 'small' },
  { label: 'متوسط', value: 'middle' },
  { label: 'بزرگ', value: 'large' },
]

const layoutOptions = [
  { label: 'کناری', value: 'side' },
  { label: 'بالایی', value: 'top' },
  { label: 'ترکیبی', value: 'mix' },
]

const sidebarOptions = [
  { label: 'راست', value: 'right' },
  { label: 'چپ', value: 'left' },
]

const languageOptions = [
  { label: 'فارسی', value: 'fa' },
  { label: 'English', value: 'en' },
  { label: 'العربية', value: 'ar' },
]

// ===== Preset Colors =====
const presetColors = [
  '#1677ff', // blue
  '#52c41a', // green
  '#faad14', // gold
  '#f5222d', // red
  '#722ed1', // purple
  '#13c2c2', // cyan
  '#eb2f96', // magenta
  '#fa8c16', // orange
]

// ===== Font Size Marks =====
const fontSizeMarks = {
  12: '12',
  14: '14',
  16: '16',
  18: '18',
}

// ===== Event Handlers =====
const handleBorderRadiusChange = (val: string | number | null | undefined) => {
  if (typeof val === 'number') {
    panelThemeStore.token.borderRadius = val
  } else if (typeof val === 'string') {
    const numVal = parseInt(val, 10)
    if (!isNaN(numVal)) {
      panelThemeStore.token.borderRadius = numVal
    }
  } else {
    panelThemeStore.token.borderRadius = 6
  }
}

const handleResetSettings = () => {
  // Reset to default values
  panelThemeStore.token.colorPrimary = '#1677ff'
  panelThemeStore.token.borderRadius = 6
  panelThemeStore.token.fontSize = 14
  panelThemeStore.componentSize = 'middle'
  panelThemeStore.isDark = false
  panelThemeStore.isCompact = false

  animationEnabled.value = true
  layoutType.value = 'side'
  sidebarPosition.value = 'right'
  selectedLanguage.value = 'fa'

  message.success('تنظیمات با موفقیت بازنشانی شد')
}
</script>

<style scoped>
.settings-container {
  max-width: 100%;
  padding: 0;
}

.setting-card {
  height: 100%;
  transition: all 0.3s ease;
}

.setting-card:hover {
  transform: translateY(-2px);
}

.card-danger {
  border-color: #ff4d4f;
  border-style: dashed;
}

.flex-1 {
  flex: 1;
}
</style>
