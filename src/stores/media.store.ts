import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type {
  Media,
  UpdateMedia,
  QueryMedia,
  PaginatedMedia,
  MediaStats,
} from "@/models/media.model";
import { useMediaService } from "@/services/media.service";

export const useMediaStore = defineStore("media", () => {
  const mediaService = useMediaService();

  const mediaList = ref<Media[]>([]);
  const selectedMedia = ref<Media[]>([]);
  const stats = ref<MediaStats | null>(null);
  const loading = ref(false);
  const uploading = ref(false);
  const uploadProgress = ref(0);

  const meta = ref({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  const query = ref<QueryMedia>({
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const hasSelection = computed(() => selectedMedia.value.length > 0);
  const selectionCount = computed(() => selectedMedia.value.length);

  const fetchMedia = async (newQuery?: Partial<QueryMedia>) => {
    loading.value = true;
    try {
      if (newQuery) {
        query.value = { ...query.value, ...newQuery };
      }
      const response: PaginatedMedia = await mediaService.getMedia(query.value);
      mediaList.value = response.data;
      meta.value = response.meta;
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    stats.value = await mediaService.getStats();
  };

  const uploadFile = async (file: File, description?: string) => {
    uploading.value = true;
    uploadProgress.value = 0;
    try {
      const media = await mediaService.uploadMedia(file, description, (progress) => {
        uploadProgress.value = progress;
      });
      await fetchMedia();
      return media;
    } finally {
      uploading.value = false;
      uploadProgress.value = 0;
    }
  };

  const updateMedia = async (id: string, data: UpdateMedia) => {
    const updated = await mediaService.updateMedia(id, data);
    const index = mediaList.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      mediaList.value[index] = updated;
    }
    return updated;
  };

  const deleteMedia = async (id: string) => {
    await mediaService.deleteMedia(id);
    await fetchMedia();
  };

  const bulkDelete = async () => {
    if (selectedMedia.value.length === 0) return;
    const ids = selectedMedia.value.map((m) => m.id);
    await mediaService.bulkDeleteMedia(ids);
    selectedMedia.value = [];
    await fetchMedia();
  };

  const toggleSelection = (media: Media) => {
    const index = selectedMedia.value.findIndex((m) => m.id === media.id);
    if (index === -1) {
      selectedMedia.value.push(media);
    } else {
      selectedMedia.value.splice(index, 1);
    }
  };

  const selectAll = () => {
    selectedMedia.value = [...mediaList.value];
  };

  const clearSelection = () => {
    selectedMedia.value = [];
  };

  const isSelected = (media: Media) => {
    return selectedMedia.value.some((m) => m.id === media.id);
  };

  const setPage = (page: number) => {
    fetchMedia({ page });
  };

  const setLimit = (limit: number) => {
    fetchMedia({ limit, page: 1 });
  };

  const setFilter = (type?: QueryMedia["type"]) => {
    fetchMedia({ type, page: 1 });
  };

  const setSearch = (search: string) => {
    fetchMedia({ search, page: 1 });
  };

  const setSort = (sortBy: QueryMedia["sortBy"], sortOrder: QueryMedia["sortOrder"]) => {
    fetchMedia({ sortBy, sortOrder, page: 1 });
  };

  return {
    mediaList,
    selectedMedia,
    stats,
    loading,
    uploading,
    uploadProgress,
    meta,
    query,
    hasSelection,
    selectionCount,
    fetchMedia,
    fetchStats,
    uploadFile,
    updateMedia,
    deleteMedia,
    bulkDelete,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
    setPage,
    setLimit,
    setFilter,
    setSearch,
    setSort,
  };
});

