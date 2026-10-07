import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import {
  CATALOG_WRITE_ROLES,
  OPS_ROLES,
  PANEL_READ_ROLES,
} from '@shop/shared';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import {
  ContactListQueryDto,
  CreateContactMessageDto,
  UpdateContactStatusDto,
} from './dto/contact.dto.js';
import { ContactService } from './contact.service.js';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RateLimit(5, 60_000)
  create(@Body() body: CreateContactMessageDto) {
    return this.contactService.create(body);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  findAllAdmin(@Query() query: ContactListQueryDto) {
    return this.contactService.findAllAdmin(query);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateContactStatusDto,
  ) {
    return this.contactService.updateStatus(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.remove(id);
  }
}
