import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpChallengeEntity } from './otp-challenge.entity.js';
import { OtpController } from './otp.controller.js';
import { OtpService } from './otp.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([OtpChallengeEntity])],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
