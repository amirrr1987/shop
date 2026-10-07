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
import type { PublicUser } from '@shop/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AddressesService } from './addresses.service.js';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto.js';

@ApiTags('addresses')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  findAll(@CurrentUser() user: PublicUser) {
    return this.addressesService.findAllForUser(user.id);
  }

  @Post()
  create(@CurrentUser() user: PublicUser, @Body() body: CreateAddressDto) {
    return this.addressesService.create(user.id, body);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAddressDto,
  ) {
    return this.addressesService.update(user.id, id, body);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: PublicUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.addressesService.remove(user.id, id);
  }
}
