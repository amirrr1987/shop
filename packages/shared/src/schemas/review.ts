import { z } from 'zod';
import { REVIEW_STATUSES } from '../constants.js';
import { paginationQuerySchema } from './pagination.js';

export const reviewSchema = z.object({
  id: z.string(),
  productId: z.string(),
  userId: z.string(),
  userFullName: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
  images: z.array(z.string()),
  status: z.enum(REVIEW_STATUSES),
  reply: z.string().nullable(),
  repliedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});

export type Review = z.infer<typeof reviewSchema>;

export const adminReviewSchema = reviewSchema.extend({
  productName: z.string().nullable(),
  productSlug: z.string().nullable(),
  userEmail: z.string().nullable(),
});

export type AdminReview = z.infer<typeof adminReviewSchema>;

export const reviewListSchema = z.object({
  items: z.array(reviewSchema),
  average: z.number().nullable(),
  count: z.number().int().nonnegative(),
  mine: reviewSchema.nullable(),
});

export type ReviewList = z.infer<typeof reviewListSchema>;

export const adminReviewListSchema = z.object({
  items: z.array(adminReviewSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1),
});

export type AdminReviewList = z.infer<typeof adminReviewListSchema>;

export const createReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1),
  images: z.array(z.string()).optional().default([]),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export const updateReviewStatusSchema = z.object({
  status: z.enum(REVIEW_STATUSES),
});

export type UpdateReviewStatusInput = z.infer<typeof updateReviewStatusSchema>;

export const updateReviewReplySchema = z.object({
  reply: z.string().trim().nullable(),
});

export type UpdateReviewReplyInput = z.infer<typeof updateReviewReplySchema>;

export const adminReviewListQuerySchema = paginationQuerySchema.extend({
  productId: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  status: z.enum(REVIEW_STATUSES).optional(),
});

export type AdminReviewListQuery = z.infer<typeof adminReviewListQuerySchema>;
