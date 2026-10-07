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
import {
  CATALOG_WRITE_ROLES,
  OPS_ROLES,
  PANEL_READ_ROLES,
} from '@shop/shared';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import {
  CreateProductUnitDto,
  UpdateProductUnitDto,
} from './dto/product-unit.dto.js';
import { ProductUnitsService } from './product-units.service.js';

@ApiTags('product-units')
@Controller('product-units')
export class ProductUnitsController {
  constructor(private readonly unitsService: ProductUnitsService) {}

  @Get()
  findAll() {
    return this.unitsService.findAll({ activeOnly: true });
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  findAllAdmin() {
    return this.unitsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  create(@Body() body: CreateProductUnitDto) {
    return this.unitsService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductUnitDto,
  ) {
    return this.unitsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.unitsService.remove(id);
  }
}
