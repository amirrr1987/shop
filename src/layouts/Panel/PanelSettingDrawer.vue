<script setup lang="ts">
import {
  Button,
  Drawer,
  Switch,
  Select,
  Typography,
  Space,
  Card,
  Tabs,
  InputNumber,
  Input,
  Slider,
  Collapse,
} from 'ant-design-vue'
import {
  SettingOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  BorderOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons-vue'
import { ref, h } from 'vue'
import { useThemeStore } from '@/stores/theme.store'

const open = ref(false)
const themeStore = useThemeStore()
const activeTab = ref('color')

const componentSizeOptions = [
  { label: 'کوچک', value: 'small' },
  { label: 'متوسط', value: 'middle' },
  { label: 'بزرگ', value: 'large' },
]

// Preset colors
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

// Reset color function
const resetColor = (
  colorType: 'colorPrimary' | 'colorSuccess' | 'colorWarning' | 'colorError' | 'colorInfo',
) => {
  const defaults: Record<string, string> = {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
  }
  if (themeStore.token[colorType] !== undefined) {
    themeStore.token[colorType] = defaults[colorType]
  }
}

// Reset border radius
const resetBorderRadius = () => {
  themeStore.token.borderRadius = 6
  themeStore.token.borderRadiusSM = 4
  themeStore.token.borderRadiusLG = 8
  themeStore.token.borderRadiusXS = 2
}
</script>

<template>
  <Button @click="open = true" type="text" :icon="h(SettingOutlined)" />
  <Drawer v-model:open="open" title="تنظیمات تم" placement="left" :width="420">
    <Tabs v-model:activeKey="activeTab">
      <!-- Color Tab -->
      <Tabs.TabPane key="color">
        <template #tab>
          <span>
            <BgColorsOutlined class="ml-2" />
            رنگ
          </span>
        </template>
        <div class="py-4">
          <!-- Preset Colors -->
          <div class="mb-6">
            <Typography.Text strong>رنگ‌های پیش‌فرض</Typography.Text>
            <Typography.Paragraph type="secondary" class="my-1 mb-3 text-xs">
              انتخاب سریع رنگ اصلی
            </Typography.Paragraph>
            <Space :size="8" wrap>
              <Button
                v-for="color in presetColors"
                :key="color"
                @click="themeStore.token.colorPrimary = color"
                :type="themeStore.token.colorPrimary === color ? 'primary' : 'default'"
                class="w-8 h-8 p-0"
                :style="{
                  backgroundColor: color,
                  borderColor: themeStore.token.colorPrimary === color ? color : '#d9d9d9',
                }"
                :title="color"
              />
            </Space>
          </div>

          <!-- Brand Color -->
          <Collapse>
            <Collapse.Panel key="brand">
              <template #header>
                <span>
                  <BgColorsOutlined class="ml-2" />
                  رنگ اصلی
                </span>
              </template>
              <div class="mb-4">
                <Space justify="space-between" class="w-full mb-2">
                  <Typography.Text type="secondary">Seed Token</Typography.Text>
                  <Button type="link" size="small" @click="resetColor('colorPrimary')"
                    >Reset</Button
                  >
                </Space>
                <Typography.Text strong>رنگ اصلی</Typography.Text>
                <div class="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    :value="themeStore.token.colorPrimary || '#1677ff'"
                    @input="
                      (e) => (themeStore.token.colorPrimary = (e.target as HTMLInputElement).value)
                    "
                    class="color-picker"
                  />
                  <Input
                    :value="themeStore.token.colorPrimary || '#1677ff'"
                    @update:value="(val) => (themeStore.token.colorPrimary = val)"
                    dir="ltr"
                    class="flex-1"
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>

          <div class="mt-4" />

          <!-- Success Color -->
          <Collapse>
            <Collapse.Panel key="success">
              <template #header>
                <span>
                  <CheckCircleOutlined class="ml-2" style="color: #52c41a" />
                  رنگ موفقیت
                </span>
              </template>
              <div class="mb-4">
                <Space justify="space-between" class="w-full mb-2">
                  <Typography.Text type="secondary">Seed Token</Typography.Text>
                  <Button type="link" size="small" @click="resetColor('colorSuccess')"
                    >Reset</Button
                  >
                </Space>
                <Typography.Text strong>رنگ موفقیت</Typography.Text>
                <div class="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    :value="themeStore.token.colorSuccess || '#52c41a'"
                    @input="
                      (e) => (themeStore.token.colorSuccess = (e.target as HTMLInputElement).value)
                    "
                    class="color-picker"
                  />
                  <Input
                    :value="themeStore.token.colorSuccess || '#52c41a'"
                    @update:value="(val) => (themeStore.token.colorSuccess = val)"
                    dir="ltr"
                    class="flex-1"
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>

          <div class="mt-4" />

          <!-- Warning Color -->
          <Collapse>
            <Collapse.Panel key="warning">
              <template #header>
                <span>
                  <ExclamationCircleOutlined class="ml-2" style="color: #faad14" />
                  رنگ هشدار
                </span>
              </template>
              <div class="mb-4">
                <Space justify="space-between" class="w-full mb-2">
                  <Typography.Text type="secondary">Seed Token</Typography.Text>
                  <Button type="link" size="small" @click="resetColor('colorWarning')"
                    >Reset</Button
                  >
                </Space>
                <Typography.Text strong>رنگ هشدار</Typography.Text>
                <div class="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    :value="themeStore.token.colorWarning || '#faad14'"
                    @input="
                      (e) => (themeStore.token.colorWarning = (e.target as HTMLInputElement).value)
                    "
                    class="color-picker"
                  />
                  <Input
                    :value="themeStore.token.colorWarning || '#faad14'"
                    @update:value="(val) => (themeStore.token.colorWarning = val)"
                    dir="ltr"
                    class="flex-1"
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>

          <div class="mt-4" />

          <!-- Error Color -->
          <Collapse>
            <Collapse.Panel key="error">
              <template #header>
                <span>
                  <CloseCircleOutlined class="ml-2" style="color: #ff4d4f" />
                  رنگ خطا
                </span>
              </template>
              <div class="mb-4">
                <Space justify="space-between" class="w-full mb-2">
                  <Typography.Text type="secondary">Seed Token</Typography.Text>
                  <Button type="link" size="small" @click="resetColor('colorError')">Reset</Button>
                </Space>
                <Typography.Text strong>رنگ خطا</Typography.Text>
                <div class="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    :value="themeStore.token.colorError || '#ff4d4f'"
                    @input="
                      (e) => (themeStore.token.colorError = (e.target as HTMLInputElement).value)
                    "
                    class="color-picker"
                  />
                  <Input
                    :value="themeStore.token.colorError || '#ff4d4f'"
                    @update:value="(val) => (themeStore.token.colorError = val)"
                    dir="ltr"
                    class="flex-1"
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>

          <div class="mt-4" />

          <!-- Info Color -->
          <Collapse>
            <Collapse.Panel key="info">
              <template #header>
                <span>
                  <InfoCircleOutlined class="ml-2" style="color: #1677ff" />
                  رنگ اطلاعات
                </span>
              </template>
              <div class="mb-4">
                <Space justify="space-between" class="w-full mb-2">
                  <Typography.Text type="secondary">Seed Token</Typography.Text>
                  <Button type="link" size="small" @click="resetColor('colorInfo')">Reset</Button>
                </Space>
                <Typography.Text strong>رنگ اطلاعات</Typography.Text>
                <div class="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    :value="themeStore.token.colorInfo || '#1677ff'"
                    @input="
                      (e) => (themeStore.token.colorInfo = (e.target as HTMLInputElement).value)
                    "
                    class="color-picker"
                  />
                  <Input
                    :value="themeStore.token.colorInfo || '#1677ff'"
                    @update:value="(val) => (themeStore.token.colorInfo = val)"
                    dir="ltr"
                    class="flex-1"
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      </Tabs.TabPane>

      <!-- Size Tab -->
      <Tabs.TabPane key="size">
        <template #tab>
          <span>
            <FontSizeOutlined class="ml-2" />
            اندازه
          </span>
        </template>
        <div class="py-4">
          <Card>
            <Space direction="vertical" :size="16" class="w-full">
              <div>
                <Typography.Text strong>اندازه کامپوننت</Typography.Text>
                <Typography.Paragraph type="secondary" class="my-1 text-xs">
                  اندازه پیش‌فرض عناصر رابط
                </Typography.Paragraph>
                <Select
                  v-model:value="themeStore.componentSize"
                  :options="componentSizeOptions"
                  class="w-full mt-2"
                />
              </div>
            </Space>
          </Card>
        </div>
      </Tabs.TabPane>

      <!-- Style Tab -->
      <Tabs.TabPane key="style">
        <template #tab>
          <span>
            <BorderOutlined class="ml-2" />
            استایل
          </span>
        </template>
        <div class="py-4">
          <!-- Border Radius -->
          <Collapse>
            <Collapse.Panel key="borderRadius">
              <template #header>
                <span>
                  <BorderInnerOutlined class="ml-2" />
                  شعاع گوشه
                </span>
              </template>
              <div class="mb-4">
                <Space justify="space-between" class="w-full mb-2">
                  <Typography.Text type="secondary">Seed Token</Typography.Text>
                  <Button type="link" size="small" @click="resetBorderRadius">Reset</Button>
                </Space>
                <Typography.Text strong>شعاع گوشه پایه</Typography.Text>
                <div class="mt-3">
                  <Slider
                    :min="0"
                    :max="16"
                    :value="(themeStore.token.borderRadius as number) || 6"
                    @change="
                      (val) => {
                        if (typeof val === 'number') {
                          themeStore.token.borderRadius = val
                        }
                      }
                    "
                  />
                  <InputNumber
                    :value="(themeStore.token.borderRadius as number) || 6"
                    @update:value="
                      (val) => {
                        if (typeof val === 'number') {
                          themeStore.token.borderRadius = val
                        } else if (val === null || val === undefined) {
                          themeStore.token.borderRadius = 6
                        }
                      }
                    "
                    :min="0"
                    :max="16"
                    class="w-full mt-2"
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>

          <div class="mt-4" />

          <!-- Shadow -->
          <Collapse>
            <Collapse.Panel key="shadow">
              <template #header>
                <span>
                  <BorderOutlined class="ml-2" />
                  سایه
                </span>
              </template>
              <Typography.Paragraph type="secondary">
                تنظیمات سایه در نسخه‌های بعدی اضافه خواهد شد
              </Typography.Paragraph>
            </Collapse.Panel>
          </Collapse>
        </div>
      </Tabs.TabPane>

      <!-- Others Tab -->
      <Tabs.TabPane key="others">
        <template #tab>
          <span>
            <AppstoreOutlined class="ml-2" />
            سایر
          </span>
        </template>
        <div class="py-4">
          <Card :hoverable="true">
            <Space class="w-full" justify="space-between">
              <div>
                <Typography.Text strong>حالت تاریک</Typography.Text>
                <Typography.Paragraph type="secondary" class="my-1 text-xs">
                  فعال‌سازی تم تاریک
                </Typography.Paragraph>
              </div>
              <Switch :checked="themeStore.isDark" @change="themeStore.toggleDark" />
            </Space>
          </Card>

          <div class="mt-3" />

          <Card :hoverable="true">
            <Space class="w-full" justify="space-between">
              <div>
                <Typography.Text strong>حالت فشرده</Typography.Text>
                <Typography.Paragraph type="secondary" class="my-1 text-xs">
                  کاهش فاصله‌های عناصر
                </Typography.Paragraph>
              </div>
              <Switch :checked="themeStore.isCompact" @change="themeStore.toggleCompact" />
            </Space>
          </Card>
        </div>
      </Tabs.TabPane>
    </Tabs>
  </Drawer>
</template>

<style scoped>
.color-picker {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  padding: 2px;
  -webkit-appearance: none;
  appearance: none;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 2px;
}

.color-picker:hover {
  opacity: 0.9;
  transition: opacity 0.2s;
}
</style>
