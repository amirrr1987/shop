import {
  cartUpsellRequestSchema,
  createProductSchema,
  productAvailabilityRequestSchema,
  productListQuerySchema,
  updateProductSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateProductDto extends createZodDto(createProductSchema) {}

export class UpdateProductDto extends createZodDto(updateProductSchema) {}

export class ProductListQueryDto extends createZodDto(productListQuerySchema) {}

export class ProductAvailabilityDto extends createZodDto(
  productAvailabilityRequestSchema,
) {}

export class CartUpsellDto extends createZodDto(cartUpsellRequestSchema) {}
