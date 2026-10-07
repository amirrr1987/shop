import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { PublicUser } from '@shop/shared';
import { OPS_ROLES } from '@shop/shared';
import { AuditService } from '../audit/audit.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { UpdateStoreSettingsDto } from './dto/settings.dto.js';
import { SettingsService } from './settings.service.js';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly auditService: AuditService,
  ) {}

  /** Public: the storefront needs the display unit before anyone logs in. */
  @Get()
  get() {
    return this.settingsService.get();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  async update(
    @CurrentUser() user: PublicUser,
    @Body() body: UpdateStoreSettingsDto,
  ) {
    const settings = await this.settingsService.update(body);
    await this.auditService.record({
      actor: user,
      action: 'settings.update',
      entityType: 'settings',
      entityId: '1',
      meta: { keys: Object.keys(body) },
    });
    return settings;
  }
}
