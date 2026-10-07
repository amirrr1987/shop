import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import type { Request, Response } from 'express';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dto/auth.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @RateLimit(8, 60_000)
  register(
    @Body() body: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(body, req, res);
  }

  @Post('login')
  @RateLimit(10, 60_000)
  login(
    @Body() body: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(body, req, res);
  }

  @Post('forgot-password')
  @RateLimit(5, 60_000)
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  @RateLimit(8, 60_000)
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @Post('refresh')
  @RateLimit(30, 60_000)
  refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  me(@CurrentUser() user: PublicUser) {
    return { user };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  updateProfile(
    @CurrentUser() user: PublicUser,
    @Body() body: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(user.id, body);
  }

  @Post('password')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  changePassword(
    @CurrentUser() user: PublicUser,
    @Body() body: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, body);
  }
}
