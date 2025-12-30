<template>
  <Form layout="vertical">
    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="نام سایت">
          <Input v-model:value="model.siteName" placeholder="نام فروشگاه" />
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="شعار سایت">
          <Input v-model:value="model.siteSlogan" placeholder="شعار فروشگاه" />
        </FormItem>
      </Col>
    </Row>

    <FormItem label="توضیحات سایت">
      <Textarea
        v-model:value="model.siteDescription"
        :rows="3"
        placeholder="توضیحات کوتاه درباره فروشگاه"
      />
    </FormItem>

    <FormItem label="کلمات کلیدی">
      <Input v-model:value="model.siteKeywords" placeholder="کلمات کلیدی جدا شده با کاما" />
    </FormItem>

    <Divider>رنگ‌بندی</Divider>

    <Row :gutter="24">
      <Col :span="8">
        <FormItem label="رنگ اصلی">
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="model.primaryColor"
              class="w-10 h-10 rounded cursor-pointer"
            />
            <Input v-model:value="model.primaryColor" class="flex-1" dir="ltr" />
          </div>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="رنگ ثانویه">
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="model.secondaryColor"
              class="w-10 h-10 rounded cursor-pointer"
            />
            <Input v-model:value="model.secondaryColor" class="flex-1" dir="ltr" />
          </div>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="رنگ تأکیدی">
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="model.accentColor"
              class="w-10 h-10 rounded cursor-pointer"
            />
            <Input v-model:value="model.accentColor" class="flex-1" dir="ltr" />
          </div>
        </FormItem>
      </Col>
    </Row>

    <Divider>تصاویر سایت</Divider>

    <Row :gutter="24">
      <Col :span="8">
        <FormItem label="لوگو">
          <Input v-model:value="model.siteLogo" placeholder="آدرس لوگو" dir="ltr" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="لوگو تیره">
          <Input v-model:value="model.siteLogoDark" placeholder="آدرس لوگو تیره" dir="ltr" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="فاویکون">
          <Input v-model:value="model.siteFavicon" placeholder="آدرس فاویکون" dir="ltr" />
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script setup lang="ts">
import type { Setting } from '@/models/setting.model'
import { Form, FormItem, Input, Textarea, Row, Col, Divider } from 'ant-design-vue'

const model = defineModel<Setting>({ required: true })
</script>
