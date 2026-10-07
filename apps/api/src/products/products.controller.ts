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
  ProductListResponseDto,
  ProductResponseDto,
} from '../common/dto/response.dto.js';
import {
  CartUpsellDto,
  CreateProductDto,
  ProductAvailabilityDto,
  ProductListQueryDto,
  UpdateProductDto,
} from './dto/product.dto.js';
import { ProductsService } from './products.service.js';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ZodResponse({ type: ProductListResponseDto })
  findAll(@Query() query: ProductListQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: ProductListResponseDto })
  findAllAdmin(@Query() query: ProductListQueryDto) {
    return this.productsService.findAll(query, { includeInactive: true });
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PANEL_READ_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: ProductResponseDto })
  findOneAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findById(id);
  }

  @Post('availability')
  availability(@Body() body: ProductAvailabilityDto) {
    return this.productsService.findAvailability(body);
  }

  @Post('cart-upsell')
  @ZodResponse({ type: [ProductResponseDto] })
  cartUpsell(@Body() body: CartUpsellDto) {
    return this.productsService.findCartUpsell(body);
  }

  @Get('facets')
  facets(
    @Query('category') category?: string,
    @Query('brand') brand?: string,
  ) {
    return this.productsService.facets({ category, brand });
  }

  @Get(':slug/related')
  @ZodResponse({ type: [ProductResponseDto] })
  findRelated(@Param('slug') slug: string) {
    return this.productsService.findRelated(slug);
  }

  @Get(':slug/also-bought')
  @ZodResponse({ type: [ProductResponseDto] })
  findAlsoBought(@Param('slug') slug: string) {
    return this.productsService.findAlsoBought(slug);
  }

  @Get(':slug')
  @ZodResponse({ type: ProductResponseDto })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: ProductResponseDto })
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ZodResponse({ type: ProductResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
