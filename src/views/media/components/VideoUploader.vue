<template>
  <div class="">
    <!-- Upload Zone -->
    <Upload
      v-if="!selectedVideo"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :custom-request="() => {}"
      accept="video/*"
      class="custom-video-uploader"
    >
      <div
        class="px-6 py-10 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:border-purple-500"
      >
        <p class="text-5xl text-purple-500 mb-4">
          <VideoCameraOutlined />
        </p>
        <p class="text-base text-gray-800 mb-2">فایل ویدیو را اینجا بکشید یا کلیک کنید</p>
        <p class="text-xs text-gray-500">
          فرمت‌های مجاز: MP4, WebM, OGG, MOV | حداکثر حجم: {{ formatSize(maxSize) }}
        </p>
      </div>
    </Upload>

    <!-- Video Preview -->
    <Card v-else>
      <div class="flex items-center gap-4 mb-4">
        <Avatar :size="56" class="bg-linear-to-br from-purple-500 to-violet-400">
          <template #icon><PlaySquareOutlined /></template>
        </Avatar>
        <div class="flex-1 min-w-0 flex flex-col gap-1">
          <Typography.Text strong ellipsis>{{ selectedFile?.name }}</Typography.Text>
          <Typography.Text type="secondary">{{
            formatSize(selectedFile?.size || 0)
          }}</Typography.Text>
        </div>
      </div>

      <!-- Video Player -->
      <video
        ref="videoPlayer"
        :src="selectedVideo"
        controls
        class="w-full rounded-lg max-h-80 bg-black"
      />

      <Divider />

      <!-- Upload Progress -->
      <div v-if="uploading">
        <Progress
          :percent="mediaStore.uploadProgress"
          :status="mediaStore.uploadProgress === 100 ? 'success' : 'active'"
          :stroke-color="{
            '0%': '#9333ea',
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
        <Button type="primary" @click="uploadVideo">
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
  VideoCameraOutlined,
  PlaySquareOutlined,
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
const videoPlayer = ref<HTMLVideoElement | null>(null)
const selectedVideo = ref('')
const selectedFile = ref<File | null>(null)
const uploading = ref(false)

const ALLOWED_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/mpeg',
]

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const isVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/') || ALLOWED_TYPES.includes(file.type)
}

const beforeUpload = (file: File) => {
  if (!isVideoFile(file)) {
    message.error('لطفا فقط فایل ویدیو انتخاب کنید')
    return false
  }

  if (file.size > props.maxSize) {
    message.error(`فایل بزرگتر از ${formatSize(props.maxSize)} است`)
    return false
  }

  selectedFile.value = file
  selectedVideo.value = URL.createObjectURL(file)

  return false // Prevent auto upload
}

const cancelUpload = () => {
  if (selectedVideo.value) {
    URL.revokeObjectURL(selectedVideo.value)
  }
  selectedVideo.value = ''
  selectedFile.value = null
  if (videoPlayer.value) {
    videoPlayer.value.pause()
  }
}

const uploadVideo = async () => {
  if (!selectedFile.value) return

  uploading.value = true

  try {
    await mediaStore.uploadFile(selectedFile.value)
    message.success(`${selectedFile.value.name} با موفقیت آپلود شد`)
    emit('uploaded')

    // Reset
    if (selectedVideo.value) {
      URL.revokeObjectURL(selectedVideo.value)
    }
    selectedVideo.value = ''
    selectedFile.value = null
  } catch {
    message.error('خطا در آپلود فایل ویدیو')
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
