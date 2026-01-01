<template>
  <div class="media-input">
    <!-- Preview Area - Full Media Object -->
    <div v-if="selectedMedia" class="preview-container">
      <div class="preview-wrapper">
        <img
          v-if="selectedMedia.type === MediaType.IMAGE"
          :src="mediaUrl"
          :alt="selectedMedia.originalName"
          class="preview-image"
        />
        <div v-else class="preview-placeholder">
          <FileOutlined class="placeholder-icon" />
          <span>{{ selectedMedia.originalName }}</span>
        </div>
        <div class="preview-overlay">
          <Button type="primary" size="small" ghost @click="openSelector">
            <SwapOutlined /> تغییر
          </Button>
          <Button type="primary" size="small" danger ghost @click="clearSelection">
            <DeleteOutlined /> حذف
          </Button>
        </div>
      </div>
      <p class="preview-name">{{ selectedMedia.originalName }}</p>
    </div>

    <!-- Preview Area - Path Only (for editing existing products) -->
    <div v-else-if="props.modelValue" class="preview-container">
      <div class="preview-wrapper">
        <img :src="pathOnlyUrl" alt="تصویر محصول" class="preview-image" />
        <div class="preview-overlay">
          <Button type="primary" size="small" ghost @click="openSelector">
            <SwapOutlined /> تغییر
          </Button>
          <Button type="primary" size="small" danger ghost @click="clearSelection">
            <DeleteOutlined /> حذف
          </Button>
        </div>
      </div>
      <p class="preview-name">{{ getFilenameFromPath(props.modelValue) }}</p>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state" @click="openSelector">
      <PictureOutlined class="empty-icon" />
      <p class="empty-text">انتخاب تصویر</p>
      <p class="empty-hint">برای انتخاب کلیک کنید</p>
    </div>

    <!-- Media Selector Modal -->
    <Modal
      v-model:open="showSelector"
      title="انتخاب رسانه"
      width="900px"
      :footer="null"
      destroy-on-close
    >
      <div class="selector-content">
        <!-- Filters -->
        <div class="selector-filters">
          <InputSearch
            v-model:value="searchQuery"
            placeholder="جستجو..."
            style="width: 200px"
            allow-clear
            @search="handleSearch"
            @change="debounceSearch"
          />
          <Select
            v-model:value="filterType"
            placeholder="نوع فایل"
            style="width: 120px"
            allow-clear
            @change="handleFilter"
          >
            <SelectOption value="image">تصاویر</SelectOption>
            <SelectOption value="video">ویدیوها</SelectOption>
            <SelectOption value="audio">صوت‌ها</SelectOption>
            <SelectOption value="document">اسناد</SelectOption>
          </Select>
        </div>

        <!-- Media Grid -->
        <Spin :spinning="loading">
          <Empty v-if="mediaList.length === 0 && !loading" description="فایلی یافت نشد" />
          <div v-else class="selector-grid">
            <div
              v-for="media in mediaList"
              :key="media.id"
              class="selector-item"
              :class="{ 'is-selected': tempSelected?.id === media.id }"
              @click="selectMedia(media)"
            >
              <div class="item-preview">
                <img
                  v-if="media.type === MediaType.IMAGE"
                  :src="getMediaUrl(media)"
                  :alt="media.originalName"
                />
                <div v-else class="item-icon" :class="media.type">
                  <VideoCameraOutlined v-if="media.type === MediaType.VIDEO" />
                  <SoundOutlined v-else-if="media.type === MediaType.AUDIO" />
                  <FileOutlined v-else />
                </div>
              </div>
              <p class="item-name">{{ media.originalName }}</p>
              <div v-if="tempSelected?.id === media.id" class="item-check">
                <CheckCircleFilled />
              </div>
            </div>
          </div>
        </Spin>

        <!-- Pagination -->
        <div v-if="meta.totalPages > 1" class="selector-pagination">
          <Pagination
            v-model:current="currentPage"
            :total="meta.total"
            :page-size="meta.limit"
            size="small"
            @change="handlePageChange"
          />
        </div>

        <!-- Footer -->
        <div class="selector-footer">
          <Button @click="cancelSelection">انصراف</Button>
          <Button type="primary" :disabled="!tempSelected" @click="confirmSelection">
            تایید انتخاب
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Modal,
  Button,
  Spin,
  Empty,
  Pagination,
  InputSearch,
  Select,
  SelectOption,
} from 'ant-design-vue'
import {
  PictureOutlined,
  FileOutlined,
  DeleteOutlined,
  SwapOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  CheckCircleFilled,
} from '@ant-design/icons-vue'
import { MediaType, type Media, type QueryMedia } from '@/models/media.model'
import { useMediaService } from '@/services/media.service'

const props = defineProps<{
  modelValue?: string
  accept?: MediaType[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const mediaService = useMediaService()

const showSelector = ref(false)
const loading = ref(false)
const mediaList = ref<Media[]>([])
const selectedMedia = ref<Media | null>(null)
const tempSelected = ref<Media | null>(null)

const searchQuery = ref('')
const filterType = ref<MediaType | undefined>()
const currentPage = ref(1)

const meta = ref({
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 0,
})

let searchTimeout: ReturnType<typeof setTimeout>

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'

const mediaUrl = computed(() => {
  if (!selectedMedia.value) return ''
  return `${API_BASE}/${selectedMedia.value.path}`
})

const pathOnlyUrl = computed(() => {
  if (!props.modelValue) return ''
  return `${API_BASE}/${props.modelValue}`
})

const getFilenameFromPath = (path: string): string => {
  return path.split('/').pop() || path
}

const getMediaUrl = (media: Media): string => {
  return `${API_BASE}/${media.path}`
}

const fetchMedia = async () => {
  loading.value = true
  try {
    const query: QueryMedia = {
      page: currentPage.value,
      limit: meta.value.limit,
      search: searchQuery.value || undefined,
      type: filterType.value,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    }
    const response = await mediaService.getMedia(query)
    mediaList.value = response.data
    meta.value = response.meta
  } finally {
    loading.value = false
  }
}

const openSelector = () => {
  tempSelected.value = selectedMedia.value
  showSelector.value = true
  fetchMedia()
}

const selectMedia = (media: Media) => {
  tempSelected.value = media
}

const confirmSelection = () => {
  if (tempSelected.value) {
    selectedMedia.value = tempSelected.value
    emit('update:modelValue', tempSelected.value.path)
    showSelector.value = false
  }
}

const cancelSelection = () => {
  tempSelected.value = null
  showSelector.value = false
}

const clearSelection = () => {
  selectedMedia.value = null
  emit('update:modelValue', '')
}

const handleSearch = () => {
  currentPage.value = 1
  fetchMedia()
}

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    handleSearch()
  }, 500)
}

const handleFilter = () => {
  currentPage.value = 1
  fetchMedia()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchMedia()
}



// Load selected media if modelValue is provided
watch(
  () => props.modelValue,
  async (path) => {
    if (path && !selectedMedia.value) {
      // Try to find media by path in the list or fetch it
      const found = mediaList.value.find((m) => m.path === path)
      if (found) {
        selectedMedia.value = found
      }
    } else if (!path) {
      selectedMedia.value = null
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.media-input {
  width: 100%;
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #f0f0f0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  gap: 8px;
}

.placeholder-icon {
  font-size: 32px;
  color: #8c8c8c;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.preview-wrapper:hover .preview-overlay {
  opacity: 1;
}

.preview-name {
  font-size: 12px;
  color: #8c8c8c;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state {
  width: 100%;
  height: 160px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background: #fafafa;
}

.empty-state:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

.empty-icon {
  font-size: 36px;
  color: #1890ff;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 14px;
  color: #262626;
  margin: 0;
}

.empty-hint {
  font-size: 12px;
  color: #8c8c8c;
  margin: 4px 0 0;
}

.selector-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.selector-filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

.selector-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  padding: 4px;
}

.selector-item {
  position: relative;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.selector-item:hover {
  border-color: #1890ff;
}

.selector-item.is-selected {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.item-preview {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  overflow: hidden;
}

.item-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}

.item-icon.video {
  background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);
}

.item-icon.audio {
  background: linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%);
}

.item-icon.document {
  background: linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%);
}

.item-name {
  padding: 8px;
  font-size: 11px;
  color: #262626;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-check {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 20px;
  color: #1890ff;
}

.selector-pagination {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

.selector-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>
