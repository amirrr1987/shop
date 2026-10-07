import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from '../settings/settings.module.js';
import { CouponEntity } from './coupon.entity.js';
import { CouponsController } from './coupons.controller.js';
import { CouponsService } from './coupons.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([CouponEntity]), SettingsModule],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
