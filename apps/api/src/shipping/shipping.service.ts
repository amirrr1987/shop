import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CreateShippingMethodInput,
  ShippingMethod,
  UpdateShippingMethodInput,
} from '@shop/shared';
import { resolveShippingCost } from '@shop/shared';
import type { Repository } from 'typeorm';
import { ShippingMethodEntity } from './shipping-method.entity.js';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingMethodEntity)
    private readonly methods: Repository<ShippingMethodEntity>,
  ) {}

  findActive(): Promise<ShippingMethod[]> {
    return this.methods
      .find({
        where: { isActive: true },
        order: { sortOrder: 'ASC', createdAt: 'ASC' },
      })
      .then((rows) => rows.map((row) => this.toMethod(row)));
  }

  findAll(): Promise<ShippingMethod[]> {
    return this.methods
      .find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } })
      .then((rows) => rows.map((row) => this.toMethod(row)));
  }

  async create(input: CreateShippingMethodInput): Promise<ShippingMethod> {
    const saved = await this.methods.save(
      this.methods.create({
        name: input.name.trim(),
        description: input.description?.trim() || null,
        price: input.price,
        estimatedDays: input.estimatedDays,
        freeAbove: input.freeAbove ?? null,
        sortOrder: input.sortOrder ?? 0,
        isActive: input.isActive ?? true,
      }),
    );
    return this.toMethod(saved);
  }

  async update(
    id: string,
    input: UpdateShippingMethodInput,
  ): Promise<ShippingMethod> {
    const row = await this.findEntity(id);

    if (input.name !== undefined) row.name = input.name.trim();
    if (input.description !== undefined) {
      row.description = input.description?.trim() || null;
    }
    if (input.price !== undefined) row.price = input.price;
    if (input.estimatedDays !== undefined) {
      row.estimatedDays = input.estimatedDays;
    }
    if (input.freeAbove !== undefined) row.freeAbove = input.freeAbove;
    if (input.sortOrder !== undefined) row.sortOrder = input.sortOrder;
    if (input.isActive !== undefined) row.isActive = input.isActive;

    return this.toMethod(await this.methods.save(row));
  }

  async remove(id: string) {
    const row = await this.findEntity(id);
    await this.methods.remove(row);
    return { id };
  }

  async resolveForOrder(
    id: string,
    subtotal: number,
  ): Promise<{
    method: ShippingMethodEntity;
    shippingCost: number;
  }> {
    const method = await this.methods.findOne({ where: { id, isActive: true } });
    if (!method) {
      throw new NotFoundException('روش ارسال معتبر نیست');
    }
    return {
      method,
      shippingCost: resolveShippingCost(method, subtotal),
    };
  }

  private async findEntity(id: string) {
    const row = await this.methods.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('روش ارسال پیدا نشد');
    }
    return row;
  }

  private toMethod(row: ShippingMethodEntity): ShippingMethod {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      estimatedDays: row.estimatedDays,
      freeAbove: row.freeAbove,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
