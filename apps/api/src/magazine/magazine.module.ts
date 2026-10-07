import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module.js';
import { MagazinePostEntity } from './magazine-post.entity.js';
import { MagazineController } from './magazine.controller.js';
import { MagazineService } from './magazine.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([MagazinePostEntity]),
    ProductsModule,
  ],
  controllers: [MagazineController],
  providers: [MagazineService],
})
export class MagazineModule {}
