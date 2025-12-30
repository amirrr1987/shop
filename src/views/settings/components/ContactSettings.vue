<template>
  <Form layout="vertical">
    <Row :gutter="24">
      <Col :span="8">
        <FormItem label="ایمیل">
          <Input v-model:value="model.siteEmail" placeholder="info@example.com" dir="ltr" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="تلفن ثابت">
          <Input v-model:value="model.sitePhone" placeholder="021-12345678" dir="ltr" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="موبایل">
          <Input v-model:value="model.siteMobile" placeholder="09123456789" dir="ltr" />
        </FormItem>
      </Col>
    </Row>

    <FormItem label="آدرس">
      <Textarea v-model:value="model.siteAddress" :rows="2" placeholder="آدرس کامل فروشگاه" />
    </FormItem>

    <Row :gutter="24">
      <Col :span="8">
        <FormItem label="شهر">
          <Input v-model:value="model.siteCity" placeholder="تهران" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="استان">
          <Input v-model:value="model.siteProvince" placeholder="تهران" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="کد پستی">
          <Input v-model:value="model.sitePostalCode" placeholder="1234567890" dir="ltr" />
        </FormItem>
      </Col>
    </Row>

    <Divider>موقعیت مکانی</Divider>

    <Row :gutter="24">
      <Col :span="8">
        <FormItem label="عرض جغرافیایی">
          <InputNumber
            v-model:value="model.mapLatitude"
            :min="-90"
            :max="90"
            :step="0.0000001"
            class="w-full!"
          />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="طول جغرافیایی">
          <InputNumber
            v-model:value="model.mapLongitude"
            :min="-180"
            :max="180"
            :step="0.0000001"
            class="w-full!"
          />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="ساعات کاری">
          <Input v-model:value="model.workingHours" placeholder="شنبه تا چهارشنبه ۹ تا ۱۸" />
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script setup lang="ts">
import type { Setting } from '@/models/setting.model'
import { Form, FormItem, Input, Textarea, InputNumber, Row, Col, Divider } from 'ant-design-vue'

const model = defineModel<Setting>({ required: true })
</script>
