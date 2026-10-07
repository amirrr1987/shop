<script setup lang="ts">
import { computed } from 'vue'
import { FormItem, Input, Typography } from 'ant-design-vue'

const seoTitle = defineModel<string | null>('seoTitle', { default: null })
const seoDescription = defineModel<string | null>('seoDescription', {
  default: null,
})
const ogImage = defineModel<string | null>('ogImage', { default: null })

const props = defineProps<{
  fallbackTitle?: string
  fallbackDescription?: string
  pathPreview?: string
}>()

const titleLen = computed(() => (seoTitle.value || '').trim().length)
const descLen = computed(() => (seoDescription.value || '').trim().length)

const previewTitle = computed(
  () => (seoTitle.value || props.fallbackTitle || 'عنوان صفحه').trim(),
)
const previewDesc = computed(
  () =>
    (seoDescription.value || props.fallbackDescription || 'توضیح متا…').trim(),
)
const previewUrl = computed(
  () => props.pathPreview || 'https://example.ir/…',
)
</script>

<template>
  <div class="seo-fields">
    <Typography.Title :level="5" style="margin-top: 0">
      سئو
    </Typography.Title>
    <FormItem :label="`عنوان سئو (${titleLen}/70)`">
      <Input
        :value="seoTitle ?? ''"
        :maxlength="70"
        allow-clear
        placeholder="خالی = نام موجودیت"
        @update:value="(v: string) => (seoTitle = v || null)"
      />
    </FormItem>
    <FormItem :label="`توضیح سئو (${descLen}/160)`">
      <Input.TextArea
        :value="seoDescription ?? ''"
        :maxlength="320"
        :rows="3"
        allow-clear
        placeholder="خالی = خلاصه خودکار"
        @update:value="(v: string) => (seoDescription = v || null)"
      />
    </FormItem>
    <FormItem label="تصویر OG (URL)">
      <Input
        :value="ogImage ?? ''"
        allow-clear
        placeholder="خالی = تصویر اصلی"
        @update:value="(v: string) => (ogImage = v || null)"
      />
    </FormItem>

    <div class="serp-preview">
      <div class="serp-preview__url">{{ previewUrl }}</div>
      <div class="serp-preview__title">{{ previewTitle }}</div>
      <div class="serp-preview__desc">{{ previewDesc }}</div>
    </div>
  </div>
</template>

<style scoped>
.seo-fields {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.serp-preview {
  direction: rtl;
  text-align: right;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 8px;
}

.serp-preview__url {
  color: #202124;
  font-size: 12px;
  margin-bottom: 4px;
  opacity: 0.8;
}

.serp-preview__title {
  color: #1a0dab;
  font-size: 18px;
  line-height: 1.3;
  margin-bottom: 4px;
}

.serp-preview__desc {
  color: #4d5156;
  font-size: 13px;
  line-height: 1.5;
}
</style>
