import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CATALOG_WRITE_ROLES } from '@shop/shared';
import { ZodResponse } from 'nestjs-zod';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CategoryResponseDto } from '../common/dto/response.dto.js';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ZodResponse({ type: [CategoryResponseDto] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  @ZodResponse({ type: CategoryResponseDto })
  findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: CategoryResponseDto })
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: CategoryResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
