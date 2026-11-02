import { Module } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { UploadsController } from './uploads.controller.js';
import { UploadsService } from './uploads.service.js';

@Module({
  controllers: [UploadsController],
  providers: [StorageService, UploadsService],
  exports: [StorageService, UploadsService],
})
export class UploadsModule {}
