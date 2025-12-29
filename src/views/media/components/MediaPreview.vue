<template>
  <Modal
    v-model:open="isOpen"
    :title="media?.originalName || 'پیش‌نمایش'"
    :footer="null"
    width="800px"
    centered
    destroy-on-close
  >
    <div v-if="media" class="preview-container">
      <div class="preview-content">
        <template v-if="media.type === MediaType.IMAGE">
          <img :src="mediaUrl" :alt="media.originalName" class="preview-image" />
        </template>
        <template v-else-if="media.type === MediaType.VIDEO">
          <video :src="mediaUrl" controls class="preview-video">
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </template>
        <template v-else-if="media.type === MediaType.AUDIO">
          <div class="audio-preview">
            <SoundOutlined class="audio-icon" />
            <audio :src="mediaUrl" controls class="preview-audio" />
          </div>
        </template>
        <template v-else>
          <div class="document-preview">
            <FileOutlined class="document-icon" />
            <p>پیش‌نمایش برای این نوع فایل در دسترس نیست</p>
            <Button type="primary" :href="mediaUrl" target="_blank">
              <DownloadOutlined /> دانلود فایل
            </Button>
          </div>
        </template>
      </div>

      <Divider />

      <Descriptions :column="2" size="small">
        <DescriptionsItem label="نام فایل">{{ media.originalName }}</DescriptionsItem>
        <DescriptionsItem label="نوع">{{ getTypeLabel(media.type) }}</DescriptionsItem>
        <DescriptionsItem label="حجم">{{ formatSize(media.size) }}</DescriptionsItem>
        <DescriptionsItem label="MIME Type">{{ media.mimeType }}</DescriptionsItem>
        <DescriptionsItem label="تاریخ آپلود">{{ formatDate(media.createdAt) }}</DescriptionsItem>
        <DescriptionsItem label="آخرین بروزرسانی">{{ formatDate(media.updatedAt) }}</DescriptionsItem>
        <DescriptionsItem v-if="media.description" label="توضیحات" :span="2">
          {{ media.description }}
        </DescriptionsItem>
      </Descriptions>

      <Divider />

      <div class="preview-actions">
        <Button @click="copyUrl">
          <LinkOutlined /> کپی لینک
        </Button>
        <Button type="primary" :href="mediaUrl" target="_blank">
          <DownloadOutlined /> دانلود
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Modal,
  Button,
  Divider,
  Descriptions,
  DescriptionsItem,
  message,
} from "ant-design-vue";
import {
  SoundOutlined,
  FileOutlined,
  DownloadOutlined,
  LinkOutlined,
} from "@ant-design/icons-vue";
import { MediaType, type Media } from "@/models/media.model";
import dayjs from "dayjs";

const isOpen = defineModel<boolean>("open", { required: true });

const props = defineProps<{
  media: Media | null;
}>();

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") || "http://localhost:5000";

const mediaUrl = computed(() => {
  if (!props.media) return "";
  return `${API_BASE}/${props.media.path}`;
});

const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDate = (date: string | Date): string => {
  return dayjs(date).format("YYYY/MM/DD - HH:mm");
};

const getTypeLabel = (type: MediaType): string => {
  const labels: Record<MediaType, string> = {
    [MediaType.IMAGE]: "تصویر",
    [MediaType.VIDEO]: "ویدیو",
    [MediaType.AUDIO]: "صوت",
    [MediaType.DOCUMENT]: "سند",
  };
  return labels[type];
};

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(mediaUrl.value);
    message.success("لینک کپی شد");
  } catch {
    message.error("خطا در کپی لینک");
  }
};
</script>

<style scoped>
.preview-container {
  padding: 16px 0;
}

.preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.preview-video {
  max-width: 100%;
  max-height: 400px;
}

.audio-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 48px;
}

.audio-icon {
  font-size: 64px;
  color: #13c2c2;
}

.preview-audio {
  width: 100%;
  max-width: 400px;
}

.document-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px;
  text-align: center;
}

.document-icon {
  font-size: 64px;
  color: #fa8c16;
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>

