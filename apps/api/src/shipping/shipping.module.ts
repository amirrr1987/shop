import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethodEntity } from './shipping-method.entity.js';
import { ShippingController } from './shipping.controller.js';
import { ShippingService } from './shipping.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethodEntity])],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ShippingService],
})
export class ShippingModule {}
