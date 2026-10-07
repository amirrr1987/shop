import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductUnitEntity } from './product-unit.entity.js';
import { ProductUnitsController } from './product-units.controller.js';
import { ProductUnitsService } from './product-units.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ProductUnitEntity])],
  controllers: [ProductUnitsController],
  providers: [ProductUnitsService],
  exports: [ProductUnitsService],
})
export class ProductUnitsModule {}
