import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsModule } from '../coupons/coupons.module.js';
import { LoyaltyModule } from '../loyalty/loyalty.module.js';
import { OtpModule } from '../otp/otp.module.js';
import { SettingsModule } from '../settings/settings.module.js';
import { ShippingModule } from '../shipping/shipping.module.js';
import { UsersModule } from '../users/users.module.js';
import { OrderItemEntity } from './order-item.entity.js';
import { OrderEntity } from './order.entity.js';
import { OrdersCleanupService } from './orders-cleanup.service.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    UsersModule,
    CouponsModule,
    LoyaltyModule,
    ShippingModule,
    SettingsModule,
    OtpModule,
  ],

  controllers: [OrdersController],
  providers: [OrdersService, OrdersCleanupService],
  exports: [OrdersService],
})
export class OrdersModule {}
