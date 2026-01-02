<template>
  <Card>
    <Tabs v-model:activeKey="activeTab">
      <!-- Color Tab -->
      <Tabs.TabPane key="color">
        <template #tab>
          <span>
            <BgColorsOutlined class="ml-2" />
            رنگ
          </span>
        </template>
        <Card title="رنگ‌های پیش‌فرض">
          <Typography.Paragraph type="secondary" class="my-1 mb-3 text-xs">
            انتخاب سریع رنگ اصلی
          </Typography.Paragraph>
          <Space>
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
              class="aspect-square!"
            />
          </Space>
        </Card>
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
          <Card title="اندازه کامپوننت" :hoverable="true">
            <Typography.Paragraph type="secondary" class=" text-xs">
              اندازه پیش‌فرض عناصر رابط
            </Typography.Paragraph>
            <RadioGroup
              v-model:value="panelThemeStore.componentSize"
              :options="componentSizeOptions"
              optionType="button"
              buttonStyle="solid"
            />
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
        <Card title="شعاع گوشه" :hoverable="true">
          <Slider :min="0" :max="16" v-model:value="panelThemeStore.token.borderRadius" />
          <InputNumber
            :value="(panelThemeStore.token.borderRadius as number) || 6"
            @update:value="
              (val) => {
                if (typeof val === 'number') {
                  panelThemeStore.token.borderRadius = val
                } else if (val === null || val === undefined) {
                  panelThemeStore.token.borderRadius = 6
                }
              }
            "
            :min="0"
            :max="16"
            class="w-full mt-2"
          />
        </Card>
      </Tabs.TabPane>

      <!-- layouts-->
      <Tabs.TabPane key="layout">
        <template #tab>
          <span>
            <LayoutOutlined class="ml-2" />
            لایوت
          </span>
        </template>
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
              <Switch :checked="panelThemeStore.isDark" @change="panelThemeStore.toggleDark" />
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
              <Switch
                :checked="panelThemeStore.isCompact"
                @change="panelThemeStore.toggleCompact"
              />
            </Space>
          </Card>
        </div>
      </Tabs.TabPane>
    </Tabs>
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
  Tabs,
  InputNumber,
  Slider,
  Collapse,
  RadioGroup,
} from 'ant-design-vue'
import {
  BgColorsOutlined,
  FontSizeOutlined,
  BorderOutlined,
  AppstoreOutlined,
  BorderInnerOutlined,
  LayoutOutlined,
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { usePanelThemeStore } from '@/stores/panel-theme.store'

const panelThemeStore = usePanelThemeStore()
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
</script>
