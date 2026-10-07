import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { PANEL_READ_ROLES } from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { SalesReportResponseDto } from '../common/dto/response.dto.js';
import { SalesReportQueryDto } from './dto/reports.dto.js';
import { ReportsService } from './reports.service.js';

@ApiTags('reports')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...PANEL_READ_ROLES)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @ZodResponse({ type: SalesReportResponseDto })
  sales(@Query() query: SalesReportQueryDto) {
    return this.reportsService.sales(query);
  }
}
