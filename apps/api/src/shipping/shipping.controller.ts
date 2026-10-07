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
import { OPS_ROLES } from '@shop/shared';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import {
  CreateShippingMethodDto,
  UpdateShippingMethodDto,
} from './dto/shipping.dto.js';
import { ShippingService } from './shipping.service.js';

@ApiTags('shipping')
@Controller('shipping-methods')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  findActive() {
    return this.shippingService.findActive();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  findAll() {
    return this.shippingService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  create(@Body() body: CreateShippingMethodDto) {
    return this.shippingService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateShippingMethodDto,
  ) {
    return this.shippingService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...OPS_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.shippingService.remove(id);
  }
}
