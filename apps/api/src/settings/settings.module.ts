import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller.js';
import { SettingsService } from './settings.service.js';
import { StoreSettingsEntity } from './store-settings.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([StoreSettingsEntity])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
