<template>
  <div class="grid grid-cols-6 gap-4">
    <Card class="col-span-full">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <FolderOpenOutlined class="text-3xl text-primary!" />
          <span class="text-2xl font-bold">مدیریت فایل‌ها</span>
        </div>
        <div class="flex items-center gap-2">
          <Button type="primary" class="bg-pink-500! hover:bg-pink-600!"  @click="showImageUploader = true">
            <FileImageOutlined /> آپلود عکس
          </Button>
          <Button type="primary" class="bg-purple-500! hover:bg-purple-600!"  @click="showVideoUploader = true">
            <VideoCameraOutlined /> آپلود ویدیو
          </Button>
          <Button type="primary" class="bg-green-500! hover:bg-green-600!"  @click="showAudioUploader = true">
            <AudioOutlined /> آپلود صوت
          </Button>
          <Button type="primary" class="bg-indigo-500! hover:bg-indigo-600!"  @click="showDocumentUploader = true">
            <FileOutlined /> آپلود اسناد
          </Button>
          <Modal
            v-model:open="showImageUploader"
            title="آپلود فایل جدید"
            :footer="null"
            width="600px"
            destroy-on-close
          >
            <ImageUploader @uploaded="onUploaded" />
          </Modal>
          <Modal
            v-model:open="showVideoUploader"
            title="آپلود ویدیو جدید"
            :footer="null"
            width="600px"
            destroy-on-close
          >
            <VideoUploader @uploaded="onUploaded" />
          </Modal>
          <Modal
            v-model:open="showAudioUploader"
            title="آپلود صوت جدید"
            :footer="null"
            width="600px"
            destroy-on-close
          >
            <AudioUploader @uploaded="onUploaded" />
          </Modal>
          <Modal
            v-model:open="showDocumentUploader"
            title="آپلود اسناد جدید"
            :footer="null"
            width="600px"
            destroy-on-close
          >
            <DocumentUploader @uploaded="onUploaded" />
          </Modal>
        </div>
      </div>
    </Card>

    <Card class="">
      <Statistic title="کل فایل‌ها" :value="mediaStore.stats?.totalCount || 0">
        <template #formatter>
          <span class="text-primary font-medium text-lg">{{ mediaStore.stats?.totalCount || 0 }}</span>
        </template>
        <template #prefix>
          <FolderOutlined class="text-primary! font-medium text-lg" />
        </template>
      </Statistic>
    </Card>

    <Card class="">
      <Statistic title="تصاویر" :value="mediaStore.stats?.byType.image?.count || 0">
        <template #formatter>
          <span class="text-pink-500 font-medium text-lg">{{ mediaStore.stats?.byType.image?.count || 0 }}</span>
        </template>
        <template #prefix>
          <PictureOutlined class="text-pink-500! font-medium text-lg" />
        </template>
      </Statistic>
    </Card>

    <Card class="">
      <Statistic title="صوت" :value="mediaStore.stats?.byType.audio?.count || 0">
        <template #formatter>
          <span class="text-green-500 font-medium text-lg">{{ mediaStore.stats?.byType.audio?.count || 0 }}</span>
        </template>
        <template #prefix>
          <AudioOutlined class="text-green-500! font-medium text-lg" />
        </template>
      </Statistic>
    </Card>

    <Card class="">
      <Statistic title="ویدیوها" :value="mediaStore.stats?.byType.video?.count || 0">
        <template #formatter>
          <span class="text-purple-500 font-medium text-lg">{{ mediaStore.stats?.byType.video?.count || 0 }}</span>
        </template>
        <template #prefix>
          <VideoCameraOutlined class="text-purple-500! font-medium text-lg" />
        </template>
      </Statistic>
    </Card>

    <Card class="">
      <Statistic title="اسناد" :value="mediaStore.stats?.byType.document?.count || 0">
        <template #formatter>
          <span class="text-indigo-500 font-medium text-lg">{{ mediaStore.stats?.byType.document?.count || 0 }}</span>
        </template>
        <template #prefix>
          <FileOutlined class="text-indigo-500! font-medium text-lg" />
        </template>
      </Statistic>
    </Card>

    <Card class="">
      <Statistic
        title="فضای استفاده شده"
        :value="formatSize(mediaStore.stats?.totalSize || 0)"
      >
        <template #formatter>
          <span class="text-orange-500 font-medium text-lg">{{ formatSize(mediaStore.stats?.totalSize || 0) }}</span>
        </template>
        <template #prefix>
          <CloudOutlined class="text-orange-500! font-medium text-lg" />
        </template>
      </Statistic>
    </Card>

    <Card class="col-span-full">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <InputSearch
            v-model:value="searchQuery"
            placeholder="جستجو در فایل‌ها..."
            class="w-120"
            allow-clear
            @search="handleSearch"
            @change="debounceSearch"
          />

          <Select
            v-model:value="selectedType"
            placeholder="نوع فایل"
            class="w-40"
            allow-clear
            @change="handleTypeFilter"
          >
            <SelectOption value="image">تصاویر</SelectOption>
            <SelectOption value="video">ویدیوها</SelectOption>
            <SelectOption value="audio">صوت‌ها</SelectOption>
            <SelectOption value="document">اسناد</SelectOption>
          </Select>

          <Select v-model:value="sortValue" class="w-60" @change="handleSort">
            <SelectOption value="createdAt-DESC">جدیدترین</SelectOption>
            <SelectOption value="createdAt-ASC">قدیمی‌ترین</SelectOption>
            <SelectOption value="size-DESC">بزرگترین</SelectOption>
            <SelectOption value="size-ASC">کوچکترین</SelectOption>
            <SelectOption value="originalName-ASC">نام (الف-ی)</SelectOption>
            <SelectOption value="originalName-DESC">نام (ی-الف)</SelectOption>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <template v-if="mediaStore.hasSelection">
            <Tag color="blue">{{ mediaStore.selectionCount }} فایل انتخاب شده</Tag>
            <Button @click="mediaStore.clearSelection">لغو انتخاب</Button>
            <Popconfirm
              title="حذف فایل‌های انتخاب شده"
              description="آیا مطمئن هستید؟ این عمل قابل بازگشت نیست."
              ok-text="بله، حذف شود"
              cancel-text="انصراف"
              @confirm="handleBulkDelete"
            >
              <Button danger> <DeleteOutlined /> حذف انتخاب شده‌ها </Button>
            </Popconfirm>
          </template>
          <template v-else>
            <Button @click="mediaStore.selectAll">انتخاب همه</Button>
          </template>
        </div>
      </div>
    </Card>

    <Card class="col-span-full">
      <Spin :spinning="mediaStore.loading">
        <Empty
          v-if="mediaStore.mediaList.length === 0 && !mediaStore.loading"
          description="فایلی یافت نشد"
        />
        <div v-else class="media-grid">
          <MediaCard
            v-for="media in mediaStore.mediaList"
            :key="media.id"
            :media="media"
            @preview="openPreview"
            @edit="openEdit"
          />
        </div>
      </Spin>
    </Card>

    <!-- Pagination -->
    <div class="pagination-container" v-if="mediaStore.meta.totalPages > 1">
      <Pagination
        v-model:current="currentPage"
        v-model:page-size="pageSize"
        :total="mediaStore.meta.total"
        :show-size-changer="true"
        :page-size-options="['12', '24', '48', '96']"
        show-quick-jumper
        @change="handlePageChange"
        @showSizeChange="handlePageSizeChange"
      />
    </div>

    <!-- Preview Modal -->
    <MediaPreview v-model:open="showPreview" :media="previewMedia" />

    <!-- Edit Modal -->
    <MediaForm v-model:open="showEdit" :media="editMedia" @saved="handleEditSaved" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Card,
  Button,
  Modal,
  Select,
  SelectOption,
  Tag,
  Popconfirm,
  Spin,
  Empty,
  Pagination,
  Statistic,
  InputSearch,
  message,
} from 'ant-design-vue'
import {
  FileImageOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  FileOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  PictureOutlined,
  CloudOutlined,
} from '@ant-design/icons-vue'
import { useMediaStore } from '@/stores/media.store'
import { MediaType, type Media } from '@/models/media.model'
import ImageUploader from './components/ImageUploader.vue'
import VideoUploader from './components/VideoUploader.vue'
import AudioUploader from './components/AudioUploader.vue'
import DocumentUploader from './components/DocumentUploader.vue'
import MediaCard from './components/MediaCard.vue'
import MediaPreview from './components/MediaPreview.vue'
import MediaForm from './components/MediaForm.vue'

const mediaStore = useMediaStore()

const showImageUploader = ref(false)
const showVideoUploader = ref(false)
const showAudioUploader = ref(false)
const showDocumentUploader = ref(false)
const showPreview = ref(false)
const showEdit = ref(false)
const previewMedia = ref<Media | null>(null)
const editMedia = ref<Media | null>(null)

const searchQuery = ref('')
const selectedType = ref<MediaType | undefined>(undefined)
const sortValue = ref('createdAt-DESC')
const currentPage = ref(1)
const pageSize = ref(24)

let searchTimeout: ReturnType<typeof setTimeout>

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const onUploaded = () => {
  mediaStore.fetchStats()
}

const handleSearch = () => {
  mediaStore.setSearch(searchQuery.value)
}

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    handleSearch()
  }, 500)
}

const handleTypeFilter = () => {
  mediaStore.setFilter(selectedType.value)
}

const handleSort = () => {
  const [sortBy, sortOrder] = sortValue.value.split('-') as [
    'createdAt' | 'size' | 'originalName',
    'ASC' | 'DESC',
  ]
  mediaStore.setSort(sortBy, sortOrder)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  mediaStore.setPage(page)
}

const handlePageSizeChange = (_current: number, size: number) => {
  pageSize.value = size
  currentPage.value = 1
  mediaStore.setLimit(size)
}

const handleBulkDelete = async () => {
  try {
    await mediaStore.bulkDelete()
    message.success('فایل‌ها با موفقیت حذف شدند')
    mediaStore.fetchStats()
  } catch {
    message.error('خطا در حذف فایل‌ها')
  }
}

const openPreview = (media: Media) => {
  previewMedia.value = media
  showPreview.value = true
}

const openEdit = (media: Media) => {
  editMedia.value = media
  showEdit.value = true
}

const handleEditSaved = () => {
  editMedia.value = null
}

watch(
  () => mediaStore.meta.page,
  (page) => {
    currentPage.value = page
  },
)

onMounted(() => {
  mediaStore.fetchMedia({ limit: pageSize.value })
  mediaStore.fetchStats()
})
</script>

<style scoped>
.media-manager {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
}

.header-card {
  margin-bottom: 24px;
  border-radius: 12px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.title-icon {
  font-size: 28px;
  color: #1890ff;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
}

.filters-card {
  margin-bottom: 24px;
  border-radius: 12px;
}

.filters-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.filters-left {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filters-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.media-grid-container {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  min-height: 400px;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-left,
  .filters-right {
    width: 100%;
    justify-content: center;
  }

  .media-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
