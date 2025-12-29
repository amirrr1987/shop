import type {
  Media,
  UpdateMedia,
  QueryMedia,
  PaginatedMedia,
  MediaStats,
} from "@/models/media.model";
import { axiosInstance } from "./useAxios";

export const useMediaService = () => {
  const getMedia = async (query?: QueryMedia): Promise<PaginatedMedia> => {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    if (query?.type) params.append("type", query.type);
    if (query?.search) params.append("search", query.search);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);

    const response = await axiosInstance.get(`/media?${params.toString()}`);
    return response.data;
  };

  const getMediaById = async (id: string): Promise<Media> => {
    const response = await axiosInstance.get(`/media/${id}`);
    return response.data;
  };

  const uploadMedia = async (
    file: File,
    description?: string,
    onProgress?: (progress: number) => void
  ): Promise<Media> => {
    const formData = new FormData();
    formData.append("file", file);
    if (description) {
      formData.append("description", description);
    }

    const response = await axiosInstance.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  };

  const updateMedia = async (id: string, data: UpdateMedia): Promise<Media> => {
    const response = await axiosInstance.patch(`/media/${id}`, data);
    return response.data;
  };

  const deleteMedia = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/media/${id}`);
  };

  const bulkDeleteMedia = async (
    ids: string[]
  ): Promise<{ deleted: number; failed: number }> => {
    const response = await axiosInstance.delete("/media", { data: { ids } });
    return response.data;
  };

  const getStats = async (): Promise<MediaStats> => {
    const response = await axiosInstance.get("/media/stats");
    return response.data;
  };

  return {
    getMedia,
    getMediaById,
    uploadMedia,
    updateMedia,
    deleteMedia,
    bulkDeleteMedia,
    getStats,
  };
};

