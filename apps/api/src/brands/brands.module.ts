import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity.js';
import { BrandsController } from './brands.controller.js';
import { BrandsService } from './brands.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
