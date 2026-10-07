import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { OPS_ROLES } from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { AuditLogListResponseDto } from '../common/dto/response.dto.js';
import { AuditService } from './audit.service.js';
import { AuditLogListQueryDto } from './dto/audit.dto.js';

@ApiTags('audit')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...OPS_ROLES)
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('admin')
  @ZodResponse({ type: AuditLogListResponseDto })
  findAllAdmin(@Query() query: AuditLogListQueryDto) {
    return this.auditService.findAllAdmin(query);
  }
}
