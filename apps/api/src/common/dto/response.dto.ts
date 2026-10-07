import {
  adminOrderSchema,
  adminReviewListSchema,
  adminReviewSchema,
  adminUserSchema,
  auditLogListSchema,
  categorySchema,
  createOrderResultSchema,
  magazineAdminListSchema,
  magazinePostDetailSchema,
  magazinePostSchema,
  magazinePublicListSchema,
  orderSchema,
  paginatedSchema,
  paymentTransactionSchema,
  productSchema,
  reviewListSchema,
  reviewSchema,
  salesReportSchema,
  serverCartSchema,
  startPaymentResultSchema,
  wishlistItemSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CategoryResponseDto extends createZodDto(categorySchema) {}

export class ProductResponseDto extends createZodDto(productSchema) {}

export class ProductListResponseDto extends createZodDto(
  paginatedSchema(productSchema),
) {}

export class AdminUserResponseDto extends createZodDto(adminUserSchema) {}

export class OrderResponseDto extends createZodDto(orderSchema) {}

export class CreateOrderResultResponseDto extends createZodDto(
  createOrderResultSchema,
) {}

export class AdminOrderResponseDto extends createZodDto(adminOrderSchema) {}

export class ReviewResponseDto extends createZodDto(reviewSchema) {}

export class AdminReviewResponseDto extends createZodDto(adminReviewSchema) {}

export class ReviewListResponseDto extends createZodDto(reviewListSchema) {}

export class AdminReviewListResponseDto extends createZodDto(
  adminReviewListSchema,
) {}

export class PaymentTransactionResponseDto extends createZodDto(
  paymentTransactionSchema,
) {}

export class StartPaymentResultResponseDto extends createZodDto(
  startPaymentResultSchema,
) {}

export class SalesReportResponseDto extends createZodDto(salesReportSchema) {}

export class AuditLogListResponseDto extends createZodDto(auditLogListSchema) {}

export class ServerCartResponseDto extends createZodDto(serverCartSchema) {}

export class WishlistItemResponseDto extends createZodDto(wishlistItemSchema) {}

export class MagazinePostResponseDto extends createZodDto(magazinePostSchema) {}

export class MagazinePostDetailResponseDto extends createZodDto(
  magazinePostDetailSchema,
) {}

export class MagazinePublicListResponseDto extends createZodDto(
  magazinePublicListSchema,
) {}

export class MagazineAdminListResponseDto extends createZodDto(
  magazineAdminListSchema,
) {}
