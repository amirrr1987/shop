import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { OPS_ROLES } from '@shop/shared';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import {
  NewsletterListQueryDto,
  SubscribeNewsletterDto,
} from './dto/newsletter.dto.js';
import { NewsletterService } from './newsletter.service.js';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  @RateLimit(8, 60_000)
  subscribe(@Body() body: SubscribeNewsletterDto) {
    return this.newsletterService.subscribe(body);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  findAllAdmin(@Query() query: NewsletterListQueryDto) {
    return this.newsletterService.findAllAdmin(query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsletterService.remove(id);
  }
}
