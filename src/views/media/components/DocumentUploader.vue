<template>
  <div class="">
    <!-- Upload Zone -->
    <Upload
      v-if="!selectedFile"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :custom-request="() => {}"
      :accept="acceptTypes"
      class="custom-document-uploader"
    >
      <div
        class="px-6 py-10 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:border-blue-500"
      >
        <p class="text-5xl text-blue-500 mb-4">
          <FileTextOutlined />
        </p>
        <p class="text-base text-gray-800 mb-2">فایل سند را اینجا بکشید یا کلیک کنید</p>
        <p class="text-xs text-gray-500">
          فرمت‌های مجاز: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT | حداکثر حجم:
          {{ formatSize(maxSize) }}
        </p>
      </div>
    </Upload>

    <!-- Document Preview -->
    <Card v-else>
      <div class="flex items-center gap-4">
        <Avatar :size="56" :class="getDocumentAvatarClass">
          <template #icon>
            <component :is="getDocumentIcon" />
          </template>
        </Avatar>
        <div class="flex-1 min-w-0 flex flex-col gap-1">
          <Typography.Text strong ellipsis>{{ selectedFile?.name }}</Typography.Text>
          <div class="flex items-center gap-2">
            <Tag :color="getDocumentTagColor">{{ getDocumentExtension }}</Tag>
            <Typography.Text type="secondary">{{
              formatSize(selectedFile?.size || 0)
            }}</Typography.Text>
          </div>
        </div>
      </div>

      <Divider />

      <!-- Document Info -->
      <Descriptions :column="1" size="small" bordered>
        <DescriptionsItem label="نام فایل">{{ selectedFile?.name }}</DescriptionsItem>
        <DescriptionsItem label="نوع فایل">{{ selectedFile?.type || 'نامشخص' }}</DescriptionsItem>
        <DescriptionsItem label="حجم">{{ formatSize(selectedFile?.size || 0) }}</DescriptionsItem>
        <DescriptionsItem label="آخرین تغییر">{{
          formatDate(selectedFile?.lastModified)
        }}</DescriptionsItem>
      </Descriptions>

      <Divider />

      <!-- Upload Progress -->
      <div v-if="uploading">
        <Progress
          :percent="mediaStore.uploadProgress"
          :status="mediaStore.uploadProgress === 100 ? 'success' : 'active'"
          :stroke-color="{
            '0%': '#3b82f6',
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
        <Button type="primary" @click="uploadDocument">
          <template #icon><UploadOutlined /></template>
          آپلود
        </Button>
      </Space>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  FileTextOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileUnknownOutlined,
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
  Tag,
  Descriptions,
  DescriptionsItem,
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
const selectedFile = ref<File | null>(null)
const uploading = ref(false)

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'application/rtf',
  'application/zip',
  'application/x-rar-compressed',
]

const acceptTypes = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.zip,.rar'

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return 'نامشخص'
  return new Date(timestamp).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const isDocumentFile = (file: File): boolean => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  const validExtensions = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'txt',
    'csv',
    'rtf',
    'zip',
    'rar',
  ]
  return ALLOWED_TYPES.includes(file.type) || validExtensions.includes(extension || '')
}

const getDocumentExtension = computed(() => {
  if (!selectedFile.value) return ''
  return selectedFile.value.name.split('.').pop()?.toUpperCase() || 'FILE'
})

const getDocumentIcon = computed(() => {
  const ext = getDocumentExtension.value.toLowerCase()
  switch (ext) {
    case 'pdf':
      return FilePdfOutlined
    case 'doc':
    case 'docx':
      return FileWordOutlined
    case 'xls':
    case 'xlsx':
    case 'csv':
      return FileExcelOutlined
    case 'ppt':
    case 'pptx':
      return FilePptOutlined
    case 'txt':
    case 'rtf':
      return FileTextOutlined
    default:
      return FileUnknownOutlined
  }
})

const getDocumentAvatarClass = computed(() => {
  const ext = getDocumentExtension.value.toLowerCase()
  switch (ext) {
    case 'pdf':
      return 'bg-linear-to-br from-red-500 to-rose-400'
    case 'doc':
    case 'docx':
      return 'bg-linear-to-br from-blue-500 to-indigo-400'
    case 'xls':
    case 'xlsx':
    case 'csv':
      return 'bg-linear-to-br from-green-500 to-emerald-400'
    case 'ppt':
    case 'pptx':
      return 'bg-linear-to-br from-orange-500 to-amber-400'
    default:
      return 'bg-linear-to-br from-gray-500 to-slate-400'
  }
})

const getDocumentTagColor = computed(() => {
  const ext = getDocumentExtension.value.toLowerCase()
  switch (ext) {
    case 'pdf':
      return 'red'
    case 'doc':
    case 'docx':
      return 'blue'
    case 'xls':
    case 'xlsx':
    case 'csv':
      return 'green'
    case 'ppt':
    case 'pptx':
      return 'orange'
    case 'txt':
    case 'rtf':
      return 'default'
    case 'zip':
    case 'rar':
      return 'purple'
    default:
      return 'default'
  }
})

const beforeUpload = (file: File) => {
  if (!isDocumentFile(file)) {
    message.error('لطفا فقط فایل سند انتخاب کنید')
    return false
  }

  if (file.size > props.maxSize) {
    message.error(`فایل بزرگتر از ${formatSize(props.maxSize)} است`)
    return false
  }

  selectedFile.value = file

  return false // Prevent auto upload
}

const cancelUpload = () => {
  selectedFile.value = null
}

const uploadDocument = async () => {
  if (!selectedFile.value) return

  uploading.value = true

  try {
    await mediaStore.uploadFile(selectedFile.value)
    message.success(`${selectedFile.value.name} با موفقیت آپلود شد`)
    emit('uploaded')

    // Reset
    selectedFile.value = null
  } catch {
    message.error('خطا در آپلود فایل سند')
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
