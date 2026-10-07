import {
  adminReviewListQuerySchema,
  createReviewSchema,
  updateReviewReplySchema,
  updateReviewStatusSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class CreateReviewDto extends createZodDto(createReviewSchema) {}

export const reviewListQuerySchema = z.object({
  productId: z.string().min(1),
});

export class ReviewListQueryDto extends createZodDto(reviewListQuerySchema) {}

export class AdminReviewListQueryDto extends createZodDto(
  adminReviewListQuerySchema,
) {}

export class UpdateReviewStatusDto extends createZodDto(
  updateReviewStatusSchema,
) {}

export class UpdateReviewReplyDto extends createZodDto(
  updateReviewReplySchema,
) {}
