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
import {
  CATALOG_WRITE_ROLES,
  PANEL_READ_ROLES,
} from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import {
  MagazineAdminListResponseDto,
  MagazinePostDetailResponseDto,
  MagazinePostResponseDto,
  MagazinePublicListResponseDto,
} from '../common/dto/response.dto.js';
import {
  CreateMagazinePostDto,
  MagazineListQueryDto,
  UpdateMagazinePostDto,
} from './dto/magazine.dto.js';
import { MagazineService } from './magazine.service.js';

@ApiTags('magazine')
@Controller('magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Get()
  @ZodResponse({ type: MagazinePublicListResponseDto })
  findPublic(@Query() query: MagazineListQueryDto) {
    return this.magazineService.findPublic(query);
  }

  @Get('admin/posts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: MagazineAdminListResponseDto })
  findAllAdmin(@Query() query: MagazineListQueryDto) {
    return this.magazineService.findAllAdmin(query);
  }

  @Get('admin/posts/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: MagazinePostResponseDto })
  findOneAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.magazineService.findById(id);
  }

  @Get(':slug')
  @ZodResponse({ type: MagazinePostDetailResponseDto })
  findBySlug(@Param('slug') slug: string) {
    return this.magazineService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: MagazinePostResponseDto })
  create(@Body() body: CreateMagazinePostDto) {
    return this.magazineService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: MagazinePostResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMagazinePostDto,
  ) {
    return this.magazineService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.magazineService.remove(id);
  }
}
