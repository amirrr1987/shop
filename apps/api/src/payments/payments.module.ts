import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../orders/order.entity.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentTransactionEntity } from './payment-transaction.entity.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { ZarinpalClient } from './zarinpal.client.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, PaymentTransactionEntity]),
    OrdersModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, ZarinpalClient],
  exports: [PaymentsService],
})
export class PaymentsModule {}
