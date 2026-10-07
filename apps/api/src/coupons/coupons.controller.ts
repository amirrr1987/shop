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
import { OPS_ROLES } from '@shop/shared';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { AuditService } from '../audit/audit.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import {
  CreateCouponDto,
  UpdateCouponDto,
  ValidateCouponDto,
} from './dto/coupon.dto.js';
import { CouponsService } from './coupons.service.js';

class AutoCouponQueryDto extends createZodDto(
  z.object({
    subtotal: z.coerce.number().int().positive(),
  }),
) {}

@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly auditService: AuditService,
  ) {}

  @Post('validate')
  @RateLimit(20, 60_000)
  validate(@Body() body: ValidateCouponDto) {
    return this.couponsService.validate(body.code, body.subtotal);
  }

  @Get('automatic')
  @RateLimit(30, 60_000)
  automatic(@Query() query: AutoCouponQueryDto) {
    return this.couponsService.previewAutomatic(query.subtotal);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  findAll() {
    return this.couponsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  async create(
    @CurrentUser() user: PublicUser,
    @Body() body: CreateCouponDto,
  ) {
    const coupon = await this.couponsService.create(body);
    await this.auditService.record({
      actor: user,
      action: 'coupon.create',
      entityType: 'coupon',
      entityId: coupon.id,
      meta: { code: coupon.code },
    });
    return coupon;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  async update(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCouponDto,
  ) {
    const coupon = await this.couponsService.update(id, body);
    await this.auditService.record({
      actor: user,
      action: 'coupon.update',
      entityType: 'coupon',
      entityId: id,
      meta: { code: coupon.code, keys: Object.keys(body) },
    });
    return coupon;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  async remove(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.couponsService.remove(id);
    await this.auditService.record({
      actor: user,
      action: 'coupon.delete',
      entityType: 'coupon',
      entityId: id,
    });
    return { ok: true };
  }
}
