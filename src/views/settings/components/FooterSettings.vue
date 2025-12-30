<template>
  <Form layout="vertical">
    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="استایل فوتر">
          <Select v-model:value="model.footerStyle" class="w-full!">
            <SelectOption value="default">پیش‌فرض</SelectOption>
            <SelectOption value="minimal">مینیمال</SelectOption>
            <SelectOption value="detailed">جزئیات کامل</SelectOption>
            <SelectOption value="centered">مرکز</SelectOption>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="متن کپی‌رایت">
          <Input v-model:value="model.siteCopyright" placeholder="© ۱۴۰۳ تمامی حقوق محفوظ است" />
        </FormItem>
      </Col>
    </Row>

    <FormItem label="درباره ما (فوتر)">
      <Textarea
        v-model:value="model.footerAbout"
        :rows="3"
        placeholder="متن کوتاه درباره فروشگاه برای نمایش در فوتر"
      />
    </FormItem>

    <Divider>اجزای فوتر</Divider>

    <Row :gutter="24">
      <Col :span="8">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.footerShowSocial" />
          <span>نمایش شبکه‌های اجتماعی</span>
        </div>
      </Col>
      <Col :span="8">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.footerShowContact" />
          <span>نمایش اطلاعات تماس</span>
        </div>
      </Col>
      <Col :span="8">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.footerShowNewsletter" />
          <span>نمایش خبرنامه</span>
        </div>
      </Col>
    </Row>

    <div v-if="model.footerShowNewsletter">
      <Divider>تنظیمات خبرنامه</Divider>
      <Row :gutter="24">
        <Col :span="12">
          <FormItem label="عنوان خبرنامه">
            <Input v-model:value="model.footerNewsletterTitle" placeholder="عضویت در خبرنامه" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="توضیحات خبرنامه">
            <Input
              v-model:value="model.footerNewsletterDescription"
              placeholder="از آخرین تخفیف‌ها باخبر شوید"
            />
          </FormItem>
        </Col>
      </Row>
    </div>

    <Divider>رنگ‌بندی فوتر</Divider>

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="رنگ پس‌زمینه">
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="model.footerBgColor"
              class="w-10 h-10 rounded cursor-pointer"
            />
            <Input v-model:value="model.footerBgColor" class="flex-1" dir="ltr" />
          </div>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="رنگ متن">
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="model.footerTextColor"
              class="w-10 h-10 rounded cursor-pointer"
            />
            <Input v-model:value="model.footerTextColor" class="flex-1" dir="ltr" />
          </div>
        </FormItem>
      </Col>
    </Row>

    <FormItem label="نمادهای اعتماد (JSON)">
      <Textarea
        v-model:value="model.footerTrustBadges"
        :rows="3"
        placeholder='[{"name": "نماد اعتماد", "image": "/badges/enamad.png", "link": "..."}]'
        dir="ltr"
      />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import type { Setting } from '@/models/setting.model'
import {
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  SelectOption,
  Switch,
  Row,
  Col,
  Divider,
} from 'ant-design-vue'

const model = defineModel<Setting>({ required: true })
</script>
