import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CreateAddressInput,
  SavedAddress,
  UpdateAddressInput,
} from '@shop/shared';
import type { Repository } from 'typeorm';
import { AddressEntity } from './address.entity.js';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addresses: Repository<AddressEntity>,
  ) {}

  async findAllForUser(userId: string): Promise<SavedAddress[]> {
    const rows = await this.addresses.find({
      where: { userId },
      order: { isDefault: 'DESC', createdAt: 'DESC' },
    });
    return rows.map((row) => this.toSaved(row));
  }

  async create(
    userId: string,
    input: CreateAddressInput,
  ): Promise<SavedAddress> {
    if (input.isDefault) {
      await this.clearDefault(userId);
    }

    const count = await this.addresses.count({ where: { userId } });
    const row = await this.addresses.save(
      this.addresses.create({
        userId,
        label: input.label ?? null,
        fullName: input.fullName,
        phone: input.phone,
        province: input.province,
        city: input.city,
        postalCode: input.postalCode,
        line: input.line,
        isDefault: input.isDefault || count === 0,
      }),
    );

    return this.toSaved(row);
  }

  async update(
    userId: string,
    id: string,
    input: UpdateAddressInput,
  ): Promise<SavedAddress> {
    const row = await this.findOwned(userId, id);

    if (input.isDefault) {
      await this.clearDefault(userId);
    }

    Object.assign(row, {
      ...input,
      label: input.label === undefined ? row.label : input.label,
    });

    return this.toSaved(await this.addresses.save(row));
  }

  async remove(userId: string, id: string) {
    const row = await this.findOwned(userId, id);
    const wasDefault = row.isDefault;
    await this.addresses.remove(row);

    if (wasDefault) {
      const next = await this.addresses.findOne({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
      if (next) {
        next.isDefault = true;
        await this.addresses.save(next);
      }
    }

    return { id };
  }

  private async findOwned(userId: string, id: string) {
    const row = await this.addresses.findOne({ where: { id, userId } });
    if (!row) {
      throw new NotFoundException(`آدرس پیدا نشد`);
    }
    return row;
  }

  private async clearDefault(userId: string) {
    await this.addresses.update({ userId, isDefault: true }, { isDefault: false });
  }

  private toSaved(row: AddressEntity): SavedAddress {
    return {
      id: row.id,
      label: row.label,
      fullName: row.fullName,
      phone: row.phone,
      province: row.province,
      city: row.city,
      postalCode: row.postalCode,
      line: row.line,
      isDefault: row.isDefault,
    };
  }
}
