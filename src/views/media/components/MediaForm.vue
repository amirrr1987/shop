<template>
  <Modal
    v-model:open="isOpen"
    title="ویرایش اطلاعات فایل"
    @ok="handleOk"
    @cancel="handleCancel"
    ok-text="ذخیره"
    cancel-text="انصراف"
    destroy-on-close
  >
    <div v-if="media" class="edit-form">
      <div class="file-info">
        <div class="file-preview">
          <template v-if="media.type === MediaType.IMAGE">
            <img :src="mediaUrl" :alt="media.originalName" class="preview-thumb" />
          </template>
          <template v-else>
            <div class="preview-icon" :class="media.type">
              <VideoCameraOutlined v-if="media.type === MediaType.VIDEO" />
              <SoundOutlined v-else-if="media.type === MediaType.AUDIO" />
              <FileOutlined v-else />
            </div>
          </template>
        </div>
        <div class="file-details">
          <p class="file-name">{{ media.originalName }}</p>
          <p class="file-meta">{{ formatSize(media.size) }} • {{ media.mimeType }}</p>
        </div>
      </div>

      <Divider />

      <Form layout="vertical" :model="form" ref="formRef">
        <FormItem label="توضیحات" name="description">
          <Textarea
            v-model:value="form.description"
            :rows="4"
            :maxlength="500"
            show-count
            placeholder="توضیحات فایل را وارد کنید..."
          />
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Modal, Form, FormItem, Textarea, Divider, message } from 'ant-design-vue'
import { VideoCameraOutlined, SoundOutlined, FileOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue/es/form'
import { MediaType, type Media, type UpdateMedia } from '@/models/media.model'
import { useMediaStore } from '@/stores/media.store'

const isOpen = defineModel<boolean>('open', { required: true })

const props = defineProps<{
  media: Media | null
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()

const mediaStore = useMediaStore()
const formRef = ref<FormInstance>()

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'

const mediaUrl = computed(() => {
  if (!props.media) return ''
  return `${API_BASE}/${props.media.path}`
})

const form = ref<UpdateMedia>({
  description: '',
})

watch(
  () => props.media,
  (media) => {
    if (media) {
      form.value = {
        description: media.description || '',
      }
    }
  },
  { immediate: true },
)

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleOk = async () => {
  if (!props.media) return

  try {
    await mediaStore.updateMedia(props.media.id, form.value)
    message.success('اطلاعات فایل بروزرسانی شد')
    isOpen.value = false
    emit('saved')
  } catch {
    message.error('خطا در بروزرسانی اطلاعات')
  }
}

const handleCancel = () => {
  isOpen.value = false
  form.value = { description: '' }
}
</script>

<style scoped>
.edit-form {
  padding: 8px 0;
}

.file-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.file-preview {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.preview-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fff;
}

.preview-icon.video {
  background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);
}

.preview-icon.audio {
  background: linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%);
}

.preview-icon.document {
  background: linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%);
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  font-size: 12px;
  color: #8c8c8c;
  margin: 4px 0 0;
}
</style>
