import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { SendOtpDto, VerifyOtpDto } from './dto/otp.dto.js';
import { OtpService } from './otp.service.js';

@ApiTags('otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @RateLimit(10, 60_000)
  send(@Body() body: SendOtpDto) {
    return this.otpService.send(body);
  }

  @Post('verify')
  @RateLimit(20, 60_000)
  verify(@Body() body: VerifyOtpDto) {
    return this.otpService.verify(body);
  }
}
