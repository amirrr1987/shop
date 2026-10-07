import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { WishlistItemResponseDto } from '../common/dto/response.dto.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { MergeWishlistDto } from './dto/wishlist.dto.js';
import { WishlistService } from './wishlist.service.js';

@ApiTags('wishlist')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ZodResponse({ type: [WishlistItemResponseDto] })
  list(@CurrentUser() user: PublicUser) {
    return this.wishlistService.listForUser(user.id);
  }

  @Put('merge')
  @RateLimit(20, 60_000)
  @ZodResponse({ type: [WishlistItemResponseDto] })
  merge(@CurrentUser() user: PublicUser, @Body() body: MergeWishlistDto) {
    return this.wishlistService.merge(user.id, body);
  }

  @Delete()
  @ZodResponse({ type: [WishlistItemResponseDto] })
  clear(@CurrentUser() user: PublicUser) {
    return this.wishlistService.clear(user.id);
  }

  @Post(':productId')
  @RateLimit(40, 60_000)
  @ZodResponse({ type: [WishlistItemResponseDto] })
  add(
    @CurrentUser() user: PublicUser,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.wishlistService.add(user.id, productId);
  }

  @Delete(':productId')
  @ZodResponse({ type: [WishlistItemResponseDto] })
  remove(
    @CurrentUser() user: PublicUser,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.wishlistService.remove(user.id, productId);
  }
}
