import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../orders/order.entity.js';
import { ReportsController } from './reports.controller.js';
import { ReportsService } from './reports.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
