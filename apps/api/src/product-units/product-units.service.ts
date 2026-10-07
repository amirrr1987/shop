import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CreateProductUnitInput,
  ProductUnit,
  UpdateProductUnitInput,
} from '@shop/shared';
import { In, type Repository } from 'typeorm';
import { ProductUnitEntity } from './product-unit.entity.js';

@Injectable()
export class ProductUnitsService {
  constructor(
    @InjectRepository(ProductUnitEntity)
    private readonly units: Repository<ProductUnitEntity>,
  ) {}

  findAll(options?: { activeOnly?: boolean }): Promise<ProductUnit[]> {
    return this.units
      .find({
        where: options?.activeOnly ? { isActive: true } : undefined,
        order: { sortOrder: 'ASC', name: 'ASC' },
      })
      .then((rows) => rows.map((row) => this.toUnit(row)));
  }

  async findById(id: string) {
    const row = await this.units.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('واحد پیدا نشد');
    }
    return row;
  }

  async findByIds(ids: string[]) {
    const unique = [...new Set(ids.filter(Boolean))];
    if (!unique.length) return [];
    return this.units.find({ where: { id: In(unique) } });
  }

  async create(input: CreateProductUnitInput): Promise<ProductUnit> {
    await this.ensureUniqueSlug(input.slug);
    const saved = await this.units.save(
      this.units.create({
        name: input.name.trim(),
        slug: input.slug.trim(),
        symbol: input.symbol.trim(),
        sortOrder: input.sortOrder ?? 0,
        isActive: input.isActive ?? true,
      }),
    );
    return this.toUnit(saved);
  }

  async update(
    id: string,
    input: UpdateProductUnitInput,
  ): Promise<ProductUnit> {
    const row = await this.findById(id);
    if (input.slug && input.slug !== row.slug) {
      await this.ensureUniqueSlug(input.slug);
      row.slug = input.slug.trim();
    }
    if (input.name !== undefined) row.name = input.name.trim();
    if (input.symbol !== undefined) row.symbol = input.symbol.trim();
    if (input.sortOrder !== undefined) row.sortOrder = input.sortOrder;
    if (input.isActive !== undefined) row.isActive = input.isActive;
    return this.toUnit(await this.units.save(row));
  }

  async remove(id: string) {
    const row = await this.findById(id);
    await this.units.remove(row);
    return { id };
  }

  private async ensureUniqueSlug(slug: string) {
    const exists = await this.units.existsBy({ slug });
    if (exists) {
      throw new ConflictException(`اسلاگ واحد «${slug}» تکراری است`);
    }
  }

  private toUnit(row: ProductUnitEntity): ProductUnit {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      symbol: row.symbol,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
    };
  }
}
