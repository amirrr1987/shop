<template>
  <div
    class="media-card"
    :class="{ 'is-selected': isSelected }"
    @click="handleClick"
  >
    <div class="media-checkbox" @click.stop="toggleSelect">
      <Checkbox :checked="isSelected" />
    </div>

    <div class="media-preview">
      <template v-if="media.type === MediaType.IMAGE">
        <img :src="mediaUrl" :alt="media.originalName" class="preview-image" />
      </template>
      <template v-else-if="media.type === MediaType.VIDEO">
        <div class="preview-icon video">
          <VideoCameraOutlined />
        </div>
      </template>
      <template v-else-if="media.type === MediaType.AUDIO">
        <div class="preview-icon audio">
          <SoundOutlined />
        </div>
      </template>
      <template v-else>
        <div class="preview-icon document">
          <FileOutlined />
        </div>
      </template>
    </div>

    <div class="media-info">
      <Tooltip :title="media.originalName">
        <p class="media-name">{{ media.originalName }}</p>
      </Tooltip>
      <p class="media-meta">
        <span class="media-size">{{ formatSize(media.size) }}</span>
        <span class="media-date">{{ formatDate(media.createdAt) }}</span>
      </p>
    </div>

    <div class="media-actions">
      <Tooltip title="مشاهده">
        <Button type="text" size="small" @click.stop="openPreview">
          <EyeOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="ویرایش">
        <Button type="text" size="small" @click.stop="openEdit">
          <EditOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="کپی لینک">
        <Button type="text" size="small" @click.stop="copyUrl">
          <LinkOutlined />
        </Button>
      </Tooltip>
      <Popconfirm
        title="حذف فایل"
        description="آیا مطمئن هستید؟"
        ok-text="بله"
        cancel-text="خیر"
        @confirm="handleDelete"
      >
        <Tooltip title="حذف">
          <Button type="text" size="small" danger @click.stop>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </Popconfirm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Button, Checkbox, Tooltip, Popconfirm, message } from "ant-design-vue";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { MediaType, type Media } from "@/models/media.model";
import { useMediaStore } from "@/stores/media.store";
import dayjs from "dayjs";

const props = defineProps<{
  media: Media;
}>();

const emit = defineEmits<{
  (e: "preview", media: Media): void;
  (e: "edit", media: Media): void;
}>();

const mediaStore = useMediaStore();

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") || "http://localhost:5000";

const mediaUrl = computed(() => {
  return `${API_BASE}/${props.media.path}`;
});

const isSelected = computed(() => mediaStore.isSelected(props.media));

const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDate = (date: string | Date): string => {
  return dayjs(date).format("YYYY/MM/DD");
};

const handleClick = () => {
  toggleSelect();
};

const toggleSelect = () => {
  mediaStore.toggleSelection(props.media);
};

const openPreview = () => {
  emit("preview", props.media);
};

const openEdit = () => {
  emit("edit", props.media);
};

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(mediaUrl.value);
    message.success("لینک کپی شد");
  } catch {
    message.error("خطا در کپی لینک");
  }
};

const handleDelete = async () => {
  try {
    await mediaStore.deleteMedia(props.media.id);
    message.success("فایل حذف شد");
  } catch {
    message.error("خطا در حذف فایل");
  }
};
</script>

<style scoped>
.media-card {
  position: relative;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
  background: #fff;
  cursor: pointer;
}

.media-card:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.media-card.is-selected {
  border-color: #1890ff;
  background: #e6f7ff;
}

.media-checkbox {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
}

.media-preview {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
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

.media-info {
  padding: 12px;
}

.media-name {
  font-size: 13px;
  font-weight: 500;
  color: #262626;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.media-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 11px;
  color: #8c8c8c;
}

.media-actions {
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
</style>

