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
import {
  OPS_ROLES,
  PANEL_READ_ROLES,
  type PublicUser,
} from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { AuditService } from '../audit/audit.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { AdminUserResponseDto } from '../common/dto/response.dto.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import {
  AdminUsersQueryDto,
  CreateAdminUserDto,
  SetUserActiveDto,
  UpdateAdminUserDto,
  UpdateUserRoleDto,
} from './dto/user.dto.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly auditService: AuditService,
  ) {}

  @Get('admin')
  @Roles(...PANEL_READ_ROLES)
  @ZodResponse({ type: [AdminUserResponseDto] })
  findAllAdmin(
    @CurrentUser() actor: PublicUser,
    @Query() query: AdminUsersQueryDto,
  ) {
    // Editors/viewers may only list customers; staff list is ops+.
    const scope =
      actor.role === 'editor' || actor.role === 'viewer'
        ? ('customers' as const)
        : query.scope;
    return this.usersService.findAllAdmin({ scope });
  }

  @Post('admin')
  @Roles(...OPS_ROLES)
  @RateLimit(20, 60_000)
  @ZodResponse({ type: AdminUserResponseDto })
  async createAdmin(
    @CurrentUser() actor: PublicUser,
    @Body() body: CreateAdminUserDto,
  ) {
    const user = await this.usersService.createByAdmin(actor, body);
    await this.auditService.record({
      actor,
      action: 'user.create',
      entityType: 'user',
      entityId: user.id,
      meta: { role: user.role, email: user.email },
    });
    return user;
  }

  @Patch(':id')
  @Roles(...OPS_ROLES)
  @ZodResponse({ type: AdminUserResponseDto })
  async updateAdmin(
    @CurrentUser() actor: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAdminUserDto,
  ) {
    const user = await this.usersService.updateByAdmin(actor, id, body);
    await this.auditService.record({
      actor,
      action: 'user.update',
      entityType: 'user',
      entityId: id,
      meta: {
        email: user.email,
        role: user.role,
        fields: Object.keys(body),
      },
    });
    return user;
  }

  @Patch(':id/role')
  @Roles(...OPS_ROLES)
  @ZodResponse({ type: AdminUserResponseDto })
  async updateRole(
    @CurrentUser() actor: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserRoleDto,
  ) {
    const user = await this.usersService.setRole(actor, id, body);
    await this.auditService.record({
      actor,
      action: 'user.role_change',
      entityType: 'user',
      entityId: id,
      meta: { role: body.role, email: user.email },
    });
    return user;
  }

  @Patch(':id/active')
  @Roles(...OPS_ROLES)
  @ZodResponse({ type: AdminUserResponseDto })
  async setActive(
    @CurrentUser() actor: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SetUserActiveDto,
  ) {
    const user = await this.usersService.setActive(actor, id, body);
    await this.auditService.record({
      actor,
      action: body.isActive ? 'user.activate' : 'user.deactivate',
      entityType: 'user',
      entityId: id,
      meta: { email: user.email, isActive: body.isActive },
    });
    return user;
  }
}
