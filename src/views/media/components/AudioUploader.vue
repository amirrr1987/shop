<template>
  <div class="">
    <!-- Upload Zone -->
    <Upload
      v-if="!selectedAudio"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :custom-request="() => {}"
      accept="audio/*"
      class="custom-audio-uploader"
    >
      <div
        class="px-6 py-10 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:border-teal-500"
      >
        <p class="text-5xl text-teal-500 mb-4">
          <CustomerServiceOutlined />
        </p>
        <p class="text-base text-gray-800 mb-2">فایل صوتی را اینجا بکشید یا کلیک کنید</p>
        <p class="text-xs text-gray-500">
          فرمت‌های مجاز: MP3, WAV, OGG, AAC | حداکثر حجم: {{ formatSize(maxSize) }}
        </p>
      </div>
    </Upload>

    <!-- Audio Preview -->
    <Card v-else>
      <div class="flex items-center gap-4">
        <Avatar :size="56" class="bg-linear-to-br from-teal-500 to-cyan-400">
          <template #icon><SoundOutlined /></template>
        </Avatar>
        <div class="flex-1 min-w-0 flex flex-col gap-1">
          <Typography.Text strong ellipsis>{{ selectedFile?.name }}</Typography.Text>
          <Typography.Text type="secondary">{{
            formatSize(selectedFile?.size || 0)
          }}</Typography.Text>
        </div>
      </div>

      <Divider />

      <!-- Audio Player -->
      <audio ref="audioPlayer" :src="selectedAudio" controls class="w-full rounded-lg" />

      <Divider />

      <!-- Upload Progress -->
      <div v-if="uploading">
        <Progress
          :percent="mediaStore.uploadProgress"
          :status="mediaStore.uploadProgress === 100 ? 'success' : 'active'"
          :stroke-color="{
            '0%': '#13c2c2',
            '100%': '#52c41a',
          }"
        />
        <Typography.Text type="secondary" class="block text-center mt-2"
          >در حال آپلود...</Typography.Text
        >
      </div>

      <!-- Actions -->
      <Space v-else class="flex justify-end w-full">
        <Button @click="cancelUpload">
          <template #icon><DeleteOutlined /></template>
          حذف
        </Button>
        <Button type="primary" @click="uploadAudio">
          <template #icon><UploadOutlined /></template>
          آپلود
        </Button>
      </Space>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CustomerServiceOutlined,
  SoundOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import {
  Upload,
  Card,
  Avatar,
  Typography,
  Divider,
  Progress,
  Space,
  Button,
  message,
} from 'ant-design-vue'
import { useMediaStore } from '@/stores/media.store'

interface Props {
  maxSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxSize: 50 * 1024 * 1024, // 50MB
})

const emit = defineEmits<{
  (e: 'uploaded'): void
}>()

const mediaStore = useMediaStore()
const audioPlayer = ref<HTMLAudioElement | null>(null)
const selectedAudio = ref('')
const selectedFile = ref<File | null>(null)
const uploading = ref(false)

const ALLOWED_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/aac',
  'audio/x-m4a',
  'audio/webm',
]

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const isAudioFile = (file: File): boolean => {
  return file.type.startsWith('audio/') || ALLOWED_TYPES.includes(file.type)
}

const beforeUpload = (file: File) => {
  if (!isAudioFile(file)) {
    message.error('لطفا فقط فایل صوتی انتخاب کنید')
    return false
  }

  if (file.size > props.maxSize) {
    message.error(`فایل بزرگتر از ${formatSize(props.maxSize)} است`)
    return false
  }

  selectedFile.value = file

  const reader = new FileReader()
  reader.onload = (e) => {
    selectedAudio.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  return false // Prevent auto upload
}

const cancelUpload = () => {
  selectedAudio.value = ''
  selectedFile.value = null
  if (audioPlayer.value) {
    audioPlayer.value.pause()
  }
}

const uploadAudio = async () => {
  if (!selectedFile.value) return

  uploading.value = true

  try {
    await mediaStore.uploadFile(selectedFile.value)
    message.success(`${selectedFile.value.name} با موفقیت آپلود شد`)
    emit('uploaded')

    // Reset
    selectedAudio.value = ''
    selectedFile.value = null
  } catch {
    message.error('خطا در آپلود فایل صوتی')
  } finally {
    uploading.value = false
  }
}
</script>
<style scoped>
:deep(.ant-upload-wrapper .ant-upload) {
  outline: 0;
  width: 100%;
}
</style>
