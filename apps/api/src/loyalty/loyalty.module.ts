import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from '../settings/settings.module.js';
import { User } from '../users/user.entity.js';
import { LoyaltyLedgerEntity } from './loyalty-ledger.entity.js';
import { LoyaltyController } from './loyalty.controller.js';
import { LoyaltyService } from './loyalty.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoyaltyLedgerEntity, User]),
    SettingsModule,
  ],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}
