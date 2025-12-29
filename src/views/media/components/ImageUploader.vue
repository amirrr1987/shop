<template>
  <div class="image-uploader">
    <!-- Upload Zone -->
    <div
      v-if="!selectedImage"
      class="upload-zone"
      :class="{ 'is-dragging': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        :multiple="false"
        accept="image/*"
        @change="handleFileSelect"
        hidden
      />
      <PictureOutlined class="upload-icon" />
      <p class="upload-text">تصویر را اینجا بکشید یا کلیک کنید</p>
      <p class="upload-hint">حداکثر حجم: {{ formatSize(maxSize) }}</p>
    </div>

    <!-- Cropper -->
    <div v-else class="cropper-section">
      <Cropper
        ref="cropperRef"
        :src="selectedImage"
        :stencil-component="stencilComponent"
        :stencil-props="stencilProps"
        :min-width="minWidth"
        :min-height="minHeight"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :auto-zoom="true"
        :transitions="true"
        class="cropper-instance"
      />

      <!-- Crop Mode Selection -->
      <div class="crop-controls">
        <Form layout="vertical" size="small">
          <FormItem label="نوع برش">
            <RadioGroup v-model:value="cropMode" button-style="solid">
              <RadioButton value="custom">دلخواه</RadioButton>
              <RadioButton value="aspect">نسبت</RadioButton>
              <RadioButton value="size">ابعاد ثابت</RadioButton>
              <RadioButton value="minMax">حداقل / حداکثر</RadioButton>
              <RadioButton value="circle">دایره</RadioButton>
            </RadioGroup>
          </FormItem>

          <!-- Aspect Ratio -->
          <FormItem v-if="cropMode === 'aspect'" label="نسبت تصویر">
            <div class="ratio-inputs">
              <InputNumber v-model:value="aspectX" :min="1" :max="100" placeholder="عرض" />
              <span>:</span>
              <InputNumber v-model:value="aspectY" :min="1" :max="100" placeholder="ارتفاع" />
            </div>
            <div class="ratio-presets">
              <Button size="small" @click="setAspect(1, 1)">1:1</Button>
              <Button size="small" @click="setAspect(4, 3)">4:3</Button>
              <Button size="small" @click="setAspect(16, 9)">16:9</Button>
              <Button size="small" @click="setAspect(9, 16)">9:16</Button>
            </div>
          </FormItem>

          <!-- Fixed Size -->
          <FormItem v-if="cropMode === 'size'" label="ابعاد ثابت">
            <div class="size-inputs">
              <InputNumber
                v-model:value="fixedWidth"
                :min="50"
                :max="2000"
                addon-before="عرض"
                addon-after="px"
              />
              <InputNumber
                v-model:value="fixedHeight"
                :min="50"
                :max="2000"
                addon-before="ارتفاع"
                addon-after="px"
              />
            </div>
          </FormItem>
          <FormItem v-if="cropMode === 'minMax'" label="حداقل / حداکثر">
            <div class="grid grid-cols-2 gap-4">
              <InputNumber
                v-model:value="minWidth"
                :min="1"
                :max="maxWidth"
                addon-before="حداقل عرض"
                addon-after="px"
                class="w-full"
              />
              <InputNumber
                v-model:value="maxWidth"
                :min="minWidth"
                addon-before="حداکثر عرض"
                addon-after="px"
                class="w-full"
              />
              <InputNumber
                v-model:value="minHeight"
                :min="1"
                :max="maxHeight"
                addon-before="حداقل ارتفاع"
                addon-after="px"
                class="w-full"
              />
              <InputNumber
                v-model:value="maxHeight"
                :min="minHeight"
                addon-before="حداکثر ارتفاع"
                addon-after="px"
                class="w-full"
              />
            </div>
          </FormItem>
        </Form>
        <Divider>تنظیمات</Divider>
        <!-- Cropper Actions -->
        <div class="crop-actions">
          <Tooltip title="چرخش افقی">
            <Button @click="flipHorizontal"><SwapOutlined /></Button>
          </Tooltip>
          <Tooltip title="چرخش عمودی">
            <Button @click="flipVertical"><SwapOutlined :rotate="90" /></Button>
          </Tooltip>
          <Tooltip title="چرخش چپ">
            <Button @click="rotate(-90)"><RotateLeftOutlined /></Button>
          </Tooltip>
          <Tooltip title="چرخش راست">
            <Button @click="rotate(90)"><RotateRightOutlined /></Button>
          </Tooltip>
          <Tooltip title="بازنشانی">
            <Button @click="resetCropper"><ReloadOutlined /></Button>
          </Tooltip>
        </div>

        <!-- Upload Actions -->
        <div class="upload-actions">
          <Button @click="cancelCrop">انصراف</Button>
          <Button type="primary" :loading="uploading" @click="cropAndUpload">
            <UploadOutlined /> برش و آپلود
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import {
  SwapOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ReloadOutlined,
  PictureOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import {
  Button,
  Form,
  FormItem,
  RadioGroup,
  RadioButton,
  InputNumber,
  Tooltip,
  message,
  Divider,
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
const fileInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)
const selectedImage = ref('')
const currentFile = ref<File | null>(null)
const isDragging = ref(false)
const uploading = ref(false)

// Crop settings
const cropMode = ref<'custom' | 'aspect' | 'size' | 'circle' | 'minMax'>('custom')
const aspectX = ref(4)
const aspectY = ref(3)
const fixedWidth = ref(800)
const fixedHeight = ref(600)
const minWidth = ref<number>(10)
const minHeight = ref<number>(10)
const maxWidth = ref<number>(100)
const maxHeight = ref<number>(100)

// Stencil configuration
const stencilComponent = computed(() => {
  if (cropMode.value === 'circle') {
    return markRaw(CircleStencil)
  }
  return undefined
})

const stencilProps = computed(() => {
  switch (cropMode.value) {
    case 'aspect':
      return { aspectRatio: aspectX.value / aspectY.value }
    case 'size':
      return { aspectRatio: fixedWidth.value / fixedHeight.value }
    case 'circle':
      return { aspectRatio: 1 }
    default:
      return {}
  }
})

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    await loadImage(input.files[0])
    input.value = ''
  }
}

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    await loadImage(files[0])
  }
}

const loadImage = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    message.error('لطفا فقط تصویر انتخاب کنید')
    return
  }

  if (file.size > props.maxSize) {
    message.error(`تصویر بزرگتر از ${formatSize(props.maxSize)} است`)
    return
  }

  currentFile.value = file
  cropMode.value = 'custom'

  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const setAspect = (x: number, y: number) => {
  aspectX.value = x
  aspectY.value = y
}

// Cropper manipulation
const flipHorizontal = () => {
  cropperRef.value?.flip(true, false)
}

const flipVertical = () => {
  cropperRef.value?.flip(false, true)
}

const rotate = (angle: number) => {
  cropperRef.value?.rotate(angle)
}

const resetCropper = () => {
  cropperRef.value?.reset()
}

const cancelCrop = () => {
  selectedImage.value = ''
  currentFile.value = null
}

const cropAndUpload = async () => {
  if (!cropperRef.value || !currentFile.value) return

  uploading.value = true

  try {
    const result = cropperRef.value.getResult()
    if (result && result.canvas) {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        result.canvas!.toBlob(
          (b: Blob | null) => {
            if (b) resolve(b)
            else reject(new Error('Failed to create blob'))
          },
          currentFile.value!.type || 'image/jpeg',
          0.9,
        )
      })

      // Create file from blob
      const croppedFile = new File([blob], currentFile.value.name, {
        type: currentFile.value.type || 'image/jpeg',
      })

      // Upload
      await mediaStore.uploadFile(croppedFile)
      message.success(`${currentFile.value.name} با موفقیت آپلود شد`)
      emit('uploaded')

      // Reset
      selectedImage.value = ''
      currentFile.value = null
    }
  } catch {
    message.error('خطا در آپلود تصویر')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.image-uploader {
  width: 100%;
}

.upload-zone {
  border: 2px dashed #d9d9d9;
  border-radius: 12px;
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
}

.upload-zone:hover,
.upload-zone.is-dragging {
  border-color: #1890ff;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
}

.upload-icon {
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: #262626;
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 12px;
  color: #8c8c8c;
}

.cropper-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cropper-instance {
  height: 350px;
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
}

.crop-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ratio-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ratio-inputs span {
  font-weight: bold;
  color: #8c8c8c;
}

.ratio-presets {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.size-inputs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.crop-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.upload-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
}
</style>
