import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ServerCartResponseDto } from '../common/dto/response.dto.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { CartService } from './cart.service.js';
import { MergeCartDto, ReplaceCartDto } from './dto/cart.dto.js';

@ApiTags('cart')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ZodResponse({ type: ServerCartResponseDto })
  list(@CurrentUser() user: PublicUser) {
    return this.cartService.listForUser(user.id);
  }

  @Put()
  @RateLimit(60, 60_000)
  @ZodResponse({ type: ServerCartResponseDto })
  replace(@CurrentUser() user: PublicUser, @Body() body: ReplaceCartDto) {
    return this.cartService.replace(user.id, body);
  }

  @Put('merge')
  @RateLimit(20, 60_000)
  @ZodResponse({ type: ServerCartResponseDto })
  merge(@CurrentUser() user: PublicUser, @Body() body: MergeCartDto) {
    return this.cartService.merge(user.id, body);
  }

  @Delete()
  @ZodResponse({ type: ServerCartResponseDto })
  clear(@CurrentUser() user: PublicUser) {
    return this.cartService.clear(user.id);
  }
}
