<template>
  <Form layout="vertical">
    <Row :gutter="24">
      <Col :span="8">
        <FormItem label="واحد پول">
          <Input v-model:value="model.currency" placeholder="تومان" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="کد ارز">
          <Input v-model:value="model.currencyCode" placeholder="IRR" dir="ltr" />
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="درصد مالیات">
          <InputNumber
            v-model:value="model.taxRate"
            :min="0"
            :max="100"
            class="w-full!"
            addon-after="%"
          />
        </FormItem>
      </Col>
    </Row>

    <Divider>تنظیمات ارسال</Divider>

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="هزینه ارسال (تومان)">
          <InputNumber
            v-model:value="model.shippingCost"
            :min="0"
            class="w-full!"
            :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          />
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="سقف ارسال رایگان (تومان)">
          <InputNumber
            v-model:value="model.freeShippingThreshold"
            :min="0"
            class="w-full!"
            :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          />
        </FormItem>
      </Col>
    </Row>

    <Divider>وضعیت فروشگاه</Divider>

    <Row :gutter="24">
      <Col :span="8">
        <div class="flex items-center gap-3 mb-4">
          <Switch v-model:checked="model.isStoreOpen" />
          <span :class="model.isStoreOpen ? 'text-green-600' : 'text-red-600'">
            {{ model.isStoreOpen ? 'فروشگاه باز است' : 'فروشگاه بسته است' }}
          </span>
        </div>
      </Col>
      <Col :span="16">
        <FormItem label="پیام بسته بودن فروشگاه" v-if="!model.isStoreOpen">
          <Textarea
            v-model:value="model.storeClosedMessage"
            :rows="2"
            placeholder="فروشگاه در حال بروزرسانی است..."
          />
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
  Textarea,
  InputNumber,
  Switch,
  Row,
  Col,
  Divider,
} from 'ant-design-vue'

const model = defineModel<Setting>({ required: true })
</script>
