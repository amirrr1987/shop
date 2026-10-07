<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Button, Modal, Space, Upload, message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { ApiError, uploadFile } from '@/api/client'

const images = defineModel<string[]>('images', { required: true })

const MAX_IMAGES = 8
const cropOpen = ref(false)
const cropSrc = ref<string | null>(null)
const uploading = ref(false)
const cropperRef = shallowRef<{
  getResult: () => { canvas?: HTMLCanvasElement | null }
} | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const fileList = computed<UploadProps['fileList']>(() =>
  images.value.map((url, index) => ({
    uid: `${index}-${url}`,
    name: `image-${index + 1}`,
    status: 'done' as const,
    url,
  })),
)

function openPicker() {
  if (images.value.length >= MAX_IMAGES) {
    message.warning(`حداکثر ${MAX_IMAGES} تصویر`)
    return
  }
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  if (!file.type.startsWith('image/')) {
    message.error('فقط فایل تصویری مجاز است')
    return
  }

  if (cropSrc.value) {
    URL.revokeObjectURL(cropSrc.value)
  }
  cropSrc.value = URL.createObjectURL(file)
  cropOpen.value = true
}

function closeCrop() {
  cropOpen.value = false
  if (cropSrc.value) {
    URL.revokeObjectURL(cropSrc.value)
    cropSrc.value = null
  }
}

async function confirmCrop() {
  const canvas = cropperRef.value?.getResult().canvas
  if (!canvas) {
    message.error('برش تصویر ممکن نشد')
    return
  }

  uploading.value = true
  try {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((value) => resolve(value), 'image/jpeg', 0.9)
    })
    if (!blob) {
      throw new Error('خروجی تصویر خالی است')
    }

    const result = await uploadFile<{ url: string }>(
      '/uploads/images',
      blob,
      'product.jpg',
    )
    images.value = [...images.value, result.url]
    message.success('تصویر آپلود شد')
    closeCrop()
  } catch (err) {
    message.error(err instanceof ApiError ? err.message : 'آپلود ناموفق بود')
  } finally {
    uploading.value = false
  }
}

function onRemove(file: NonNullable<UploadProps['fileList']>[number]) {
  if (!file.url) return true
  images.value = images.value.filter((url) => url !== file.url)
  return true
}

onBeforeUnmount(() => {
  if (cropSrc.value) {
    URL.revokeObjectURL(cropSrc.value)
  }
})
</script>

<template>
  <div>
    <input
      ref="fileInputRef"
      type="file"
      accept="image/jpeg,image/png,image/webp,image/gif"
      style="display: none"
      @change="onFileChange"
    >

    <Upload
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="() => false"
      @remove="onRemove"
    >
      <button
        v-if="images.length < MAX_IMAGES"
        type="button"
        style="border: 0; background: transparent; cursor: pointer"
        @click.stop.prevent="openPicker"
      >
        <PlusOutlined />
        <div style="margin-top: 8px">برش و آپلود</div>
      </button>
    </Upload>

    <Modal
      v-model:open="cropOpen"
      title="برش تصویر"
      :confirm-loading="uploading"
      ok-text="آپلود"
      cancel-text="انصراف"
      width="720px"
      destroy-on-close
      @ok="confirmCrop"
      @cancel="closeCrop"
    >
      <div style="height: 420px; background: #111">
        <Cropper
          v-if="cropSrc"
          ref="cropperRef"
          class="product-cropper"
          :src="cropSrc"
          :stencil-props="{ aspectRatio: 1 }"
        />
      </div>
      <Space style="margin-top: 12px">
        <Button @click="openPicker">
          انتخاب فایل دیگر
        </Button>
      </Space>
    </Modal>
  </div>
</template>

<style scoped>
.product-cropper {
  height: 420px;
  background: #111;
}
</style>
