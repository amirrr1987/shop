<template>
 <Card>
      <Tabs v-model:activeKey="activeTab">
        <TabPane key="general" tab="عمومی">
          <GeneralSettings v-if="setting" v-model="setting" />
        </TabPane>
        <TabPane key="contact" tab="اطلاعات تماس">
          <ContactSettings v-if="setting" v-model="setting" />
        </TabPane>
        <TabPane key="social" tab="شبکه‌های اجتماعی">
          <SocialSettings v-if="setting" v-model="setting" />
        </TabPane>
        <TabPane key="header" tab="هدر">
          <HeaderSettings v-if="setting" v-model="setting" />
        </TabPane>
        <TabPane key="footer" tab="فوتر">
          <FooterSettings v-if="setting" v-model="setting" />
        </TabPane>
        <TabPane key="ecommerce" tab="فروشگاه">
          <EcommerceSettings v-if="setting" v-model="setting" />
        </TabPane>
        <TabPane key="seo" tab="SEO و آنالیتیکس">
          <SeoSettings v-if="setting" v-model="setting" />
        </TabPane>
      </Tabs>

      <div class="mt-6 flex justify-end">
        <Button type="primary" :loading="loading" @click="handleSave" size="large">
          ذخیره تغییرات
        </Button>
      </div>
    </Card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, Tabs, TabPane, Button, message } from 'ant-design-vue'
import { useSettingStore } from '@/stores/setting.store'
import type { Setting } from '@/models/setting.model'
import GeneralSettings from './components/GeneralSettings.vue'
import ContactSettings from './components/ContactSettings.vue'
import SocialSettings from './components/SocialSettings.vue'
import HeaderSettings from './components/HeaderSettings.vue'
import FooterSettings from './components/FooterSettings.vue'
import EcommerceSettings from './components/EcommerceSettings.vue'
import SeoSettings from './components/SeoSettings.vue'

const settingStore = useSettingStore()
const activeTab = ref('general')
const loading = ref(false)
const setting = ref<Setting | null>(null)

onMounted(async () => {
  await settingStore.getSetting()
  if (settingStore.setting) {
    setting.value = { ...settingStore.setting }
  }
})

const handleSave = async () => {
  if (!setting.value) return
  loading.value = true
  try {
    await settingStore.upsertSetting(setting.value)
    message.success('تنظیمات با موفقیت ذخیره شد')
  } catch {
    message.error('خطا در ذخیره تنظیمات')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
