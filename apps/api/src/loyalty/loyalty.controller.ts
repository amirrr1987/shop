import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import { loyaltyQuoteRequestSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { LoyaltyService } from './loyalty.service.js';

class LoyaltyQuoteDto extends createZodDto(loyaltyQuoteRequestSchema) {}

@ApiTags('loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post('quote')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiCookieAuth()
  quote(
    @CurrentUser() user: PublicUser | undefined,
    @Body() body: LoyaltyQuoteDto,
  ) {
    return this.loyaltyService.quote(user?.id ?? null, body);
  }
}
