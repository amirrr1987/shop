import { z } from "zod";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
}

export const mediaSchema = z.object({
  id: z.string().uuid(),
  originalName: z.string(),
  filename: z.string(),
  path: z.string(),
  mimeType: z.string(),
  size: z.number(),
  type: z.nativeEnum(MediaType),
  description: z.string().nullable().optional(),
  url: z.string().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const updateMediaSchema = z.object({
  description: z.string().max(500).optional(),
});

export const queryMediaSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  type: z.nativeEnum(MediaType).optional(),
  search: z.string().optional(),
  sortBy: z.enum(["createdAt", "size", "originalName"]).optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

export const paginatedMediaSchema = z.object({
  data: z.array(mediaSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export const mediaStatsSchema = z.object({
  totalCount: z.number(),
  totalSize: z.number(),
  byType: z.record(
    z.nativeEnum(MediaType),
    z.object({
      count: z.number(),
      size: z.number(),
    }),
  ),
});

export type Media = z.infer<typeof mediaSchema>;
export type UpdateMedia = z.infer<typeof updateMediaSchema>;
export type QueryMedia = z.infer<typeof queryMediaSchema>;
export type PaginatedMedia = z.infer<typeof paginatedMediaSchema>;
export type MediaStats = z.infer<typeof mediaStatsSchema>;
