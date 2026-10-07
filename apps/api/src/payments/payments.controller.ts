import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import {
  OPS_ROLES,
  PANEL_READ_ROLES,
} from '@shop/shared';
import type { Response } from 'express';
import { ZodResponse } from 'nestjs-zod';
import { AuditService } from '../audit/audit.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import {
  PaymentTransactionResponseDto,
  StartPaymentResultResponseDto,
} from '../common/dto/response.dto.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { RefundPaymentDto, VerifyPaymentDto } from './dto/payment.dto.js';
import { PaymentsService } from './payments.service.js';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Gateway return / IPN (no auth). Verifies server-side, then redirects
   * the browser to PAYMENT_RETURN_URL.
   */
  @Get('callback')
  @RateLimit(60, 60_000)
  async gatewayCallback(
    @Query('Authority') authority: string | undefined,
    @Query('Status') status: string | undefined,
    @Res() res: Response,
  ) {
    const { redirectUrl } = await this.paymentsService.handleGatewayCallback({
      authority,
      status,
    });
    return res.redirect(302, redirectUrl);
  }

  @Post('orders/:orderId/start')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiCookieAuth()
  @RateLimit(15, 60_000)
  @ZodResponse({ type: StartPaymentResultResponseDto })
  start(
    @CurrentUser() user: PublicUser | null,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Query('token') token: string | undefined,
  ) {
    return this.paymentsService.startForAccess(orderId, user?.id, token);
  }

  /** Fallback if the shopper lands on the web callback directly. */
  @Post('verify')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiCookieAuth()
  @RateLimit(20, 60_000)
  verify(
    @CurrentUser() user: PublicUser | null,
    @Body() body: VerifyPaymentDto,
  ) {
    return this.paymentsService.verifyForAccess(user?.id, body);
  }

  @Get('orders/:orderId/transactions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCookieAuth()
  @Roles(...PANEL_READ_ROLES)
  @ZodResponse({ type: [PaymentTransactionResponseDto] })
  listTransactions(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.paymentsService.listForOrder(orderId);
  }

  @Post('orders/:orderId/refund')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCookieAuth()
  @Roles(...OPS_ROLES)
  @RateLimit(10, 60_000)
  async refund(
    @CurrentUser() user: PublicUser,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() body: RefundPaymentDto,
  ) {
    const result = await this.paymentsService.refundForAdmin(orderId, body);
    await this.auditService.record({
      actor: user,
      action: 'payment.refund',
      entityType: 'order',
      entityId: orderId,
      meta: {
        amount: result.transaction.amount,
        transactionId: result.transaction.id,
        paymentStatus: result.order.paymentStatus,
      },
    });
    return result;
  }
}
