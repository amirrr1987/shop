import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module.js';
import { UsersModule } from '../users/users.module.js';
import { ReviewEntity } from './review.entity.js';
import { ReviewsController } from './reviews.controller.js';
import { ReviewsService } from './reviews.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
