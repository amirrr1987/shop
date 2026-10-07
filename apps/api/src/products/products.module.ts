import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '../brands/brands.module.js';
import { CategoriesModule } from '../categories/categories.module.js';
import { ProductUnitsModule } from '../product-units/product-units.module.js';
import { ProductVariantEntity } from './product-variant.entity.js';
import { Product } from './product.entity.js';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariantEntity]),
    CategoriesModule,
    BrandsModule,
    ProductUnitsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
