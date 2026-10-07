import {
  Body,
  Controller,
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
} from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { AuditService } from '../audit/audit.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import {
  AdminOrderResponseDto,
  CreateOrderResultResponseDto,
  OrderResponseDto,
} from '../common/dto/response.dto.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto.js';
import { OrdersService } from './orders.service.js';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ZodResponse({ type: [OrderResponseDto] })
  findAll(@CurrentUser() user: PublicUser) {
    return this.ordersService.findAllForUser(user.id);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCookieAuth()
  @Roles(...PANEL_READ_ROLES)
  @ZodResponse({ type: [AdminOrderResponseDto] })
  findAllAdmin() {
    return this.ordersService.findAllAdmin();
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiCookieAuth()
  @ZodResponse({ type: OrderResponseDto })
  findOne(
    @CurrentUser() user: PublicUser | null,
    @Param('id', ParseUUIDPipe) id: string,
    @Query('token') token?: string,
  ) {
    return this.ordersService.findOneForAccess(id, user?.id, token);
  }

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiCookieAuth()
  @RateLimit(20, 60_000)
  @ZodResponse({ type: CreateOrderResultResponseDto })
  create(
    @CurrentUser() user: PublicUser | null,
    @Body() body: CreateOrderDto,
  ) {
    return this.ordersService.create(user?.id ?? null, body);
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ZodResponse({ type: OrderResponseDto })
  cancel(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ordersService.cancelForUser(user.id, id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCookieAuth()
  @Roles(...CATALOG_WRITE_ROLES)
  @ZodResponse({ type: AdminOrderResponseDto })
  async updateStatus(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateOrderStatusDto,
  ) {
    const order = await this.ordersService.updateStatus(id, body);
    await this.auditService.record({
      actor: user,
      action: 'order.status_update',
      entityType: 'order',
      entityId: id,
      meta: {
        status: body.status,
        trackingCode: body.trackingCode ?? null,
        adminNoteUpdated: body.adminNote !== undefined,
      },
    });
    return order;
  }
}
