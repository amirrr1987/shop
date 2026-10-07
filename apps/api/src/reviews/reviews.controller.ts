import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import {
  CATALOG_WRITE_ROLES,
  PANEL_READ_ROLES,
  USER_ROLE_RANK,
} from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import {
  AdminReviewListResponseDto,
  AdminReviewResponseDto,
  ReviewListResponseDto,
  ReviewResponseDto,
} from '../common/dto/response.dto.js';
import {
  AdminReviewListQueryDto,
  CreateReviewDto,
  ReviewListQueryDto,
  UpdateReviewReplyDto,
  UpdateReviewStatusDto,
} from './dto/review.dto.js';
import { ReviewsService } from './reviews.service.js';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiCookieAuth()
  @ZodResponse({ type: ReviewListResponseDto })
  findByProduct(
    @Query() query: ReviewListQueryDto,
    @CurrentUser() user: PublicUser | null,
  ) {
    return this.reviewsService.findByProduct(query.productId, user?.id);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: AdminReviewListResponseDto })
  findAllAdmin(@Query() query: AdminReviewListQueryDto) {
    return this.reviewsService.findAllAdmin(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ZodResponse({ type: ReviewResponseDto })
  create(@CurrentUser() user: PublicUser, @Body() body: CreateReviewDto) {
    return this.reviewsService.create(user.id, body);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: AdminReviewResponseDto })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReviewStatusDto,
  ) {
    return this.reviewsService.updateStatus(id, body);
  }

  @Patch(':id/reply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: AdminReviewResponseDto })
  updateReply(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReviewReplyDto,
  ) {
    return this.reviewsService.updateReply(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  remove(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const asAdmin = USER_ROLE_RANK[user.role] >= USER_ROLE_RANK.admin;
    return this.reviewsService.remove(user.id, id, asAdmin);
  }
}
