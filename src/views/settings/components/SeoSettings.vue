<template>
  <Form layout="vertical">
    <Alert
      message="این تنظیمات برای ردیابی و آنالیز بازدیدکنندگان سایت استفاده می‌شود"
      type="info"
      show-icon
      class="mb-6"
    />

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="Google Analytics ID">
          <Input v-model:value="model.googleAnalyticsId" placeholder="G-XXXXXXXXXX" dir="ltr">
            <template #prefix>
              <GoogleOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="Google Tag Manager ID">
          <Input v-model:value="model.googleTagManagerId" placeholder="GTM-XXXXXXX" dir="ltr">
            <template #prefix>
              <CodeOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
    </Row>

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="Meta Pixel ID (Facebook)">
          <Input v-model:value="model.metaPixelId" placeholder="XXXXXXXXXXXXXXXX" dir="ltr">
            <template #prefix>
              <FacebookOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
    </Row>

    <Divider>نکات مهم</Divider>

    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Google Analytics برای ردیابی بازدید و رفتار کاربران استفاده می‌شود</li>
      <li>Google Tag Manager برای مدیریت متمرکز تگ‌ها و اسکریپت‌ها کاربرد دارد</li>
      <li>Meta Pixel برای ردیابی تبلیغات فیسبوک و اینستاگرام استفاده می‌شود</li>
    </ul>
  </Form>
</template>

<script setup lang="ts">
import type { Setting } from '@/models/setting.model'
import { Form, FormItem, Input, Alert, Row, Col, Divider } from 'ant-design-vue'
import { GoogleOutlined, CodeOutlined, FacebookOutlined } from '@ant-design/icons-vue'

const model = defineModel<Setting>({ required: true })
</script>
