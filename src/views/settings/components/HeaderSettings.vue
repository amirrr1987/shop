<template>
  <Form layout="vertical">
    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="استایل هدر">
          <Select v-model:value="model.headerStyle" class="w-full!">
            <SelectOption value="default">پیش‌فرض</SelectOption>
            <SelectOption value="centered">مرکز</SelectOption>
            <SelectOption value="minimal">مینیمال</SelectOption>
            <SelectOption value="mega">مگا منو</SelectOption>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="تنظیمات نمایش">
          <div class="flex flex-col gap-2">
            <Switch v-model:checked="model.headerSticky" /> چسبنده (Sticky)
          </div>
        </FormItem>
      </Col>
    </Row>

    <Divider>اجزای هدر</Divider>

    <Row :gutter="24">
      <Col :span="8">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.headerShowSearch" />
          <span>نمایش جستجو</span>
        </div>
      </Col>
      <Col :span="8">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.headerShowCart" />
          <span>نمایش سبد خرید</span>
        </div>
      </Col>
      <Col :span="8">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.headerShowCategories" />
          <span>نمایش دسته‌بندی‌ها</span>
        </div>
      </Col>
    </Row>

    <Divider>نوار بالای هدر (Top Bar)</Divider>

    <Row :gutter="24">
      <Col :span="6">
        <div class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="model.headerTopBarEnabled" />
          <span>فعال</span>
        </div>
      </Col>
      <Col :span="18">
        <FormItem label="متن نوار بالا">
          <Input
            v-model:value="model.headerTopBarText"
            placeholder="ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان"
            :disabled="!model.headerTopBarEnabled"
          />
        </FormItem>
      </Col>
    </Row>

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="رنگ پس‌زمینه نوار بالا">
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="model.headerTopBarBgColor"
              class="w-10 h-10 rounded cursor-pointer"
              :disabled="!model.headerTopBarEnabled"
            />
            <Input
              v-model:value="model.headerTopBarBgColor"
              class="flex-1"
              dir="ltr"
              :disabled="!model.headerTopBarEnabled"
            />
          </div>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script setup lang="ts">
import type { Setting } from '@/models/setting.model'
import {
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  Switch,
  Row,
  Col,
  Divider,
} from 'ant-design-vue'

const model = defineModel<Setting>({ required: true })
</script>
