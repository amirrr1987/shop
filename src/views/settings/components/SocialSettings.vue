<template>
  <Form layout="vertical">
    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="اینستاگرام">
          <Input
            v-model:value="model.socialInstagram"
            placeholder="https://instagram.com/..."
            dir="ltr"
          >
            <template #prefix>
              <InstagramOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="تلگرام">
          <Input v-model:value="model.socialTelegram" placeholder="https://t.me/..." dir="ltr">
            <template #prefix>
              <SendOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
    </Row>

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="واتساپ">
          <Input v-model:value="model.socialWhatsapp" placeholder="09123456789" dir="ltr">
            <template #prefix>
              <WhatsAppOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="توییتر / X">
          <Input
            v-model:value="model.socialTwitter"
            placeholder="https://twitter.com/..."
            dir="ltr"
          >
            <template #prefix>
              <!-- <XOutlined /> -->x
            </template>
          </Input>
        </FormItem>
      </Col>
    </Row>

    <Row :gutter="24">
      <Col :span="12">
        <FormItem label="لینکدین">
          <Input
            v-model:value="model.socialLinkedin"
            placeholder="https://linkedin.com/..."
            dir="ltr"
          >
            <template #prefix>
              <LinkedinOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="یوتیوب">
          <Input
            v-model:value="model.socialYoutube"
            placeholder="https://youtube.com/..."
            dir="ltr"
          >
            <template #prefix>
              <YoutubeOutlined />
            </template>
          </Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script setup lang="ts">
import type { Setting } from '@/models/setting.model'
import { Form, FormItem, Input, Row, Col } from 'ant-design-vue'
import {
  InstagramOutlined,
  SendOutlined,
  WhatsAppOutlined,
  // XOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from '@ant-design/icons-vue'

const model = defineModel<Setting>({ required: true })
</script>
