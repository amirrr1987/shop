import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { MergeWishlistInput, WishlistItem } from '@shop/shared';
import { In, type Repository } from 'typeorm';
import { Product } from '../products/product.entity.js';
import { WishlistItemEntity } from './wishlist-item.entity.js';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItemEntity)
    private readonly items: Repository<WishlistItemEntity>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async listForUser(userId: string): Promise<WishlistItem[]> {
    const rows = await this.items.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return this.toWishlistItems(rows.map((row) => row.productId));
  }

  async add(userId: string, productId: string): Promise<WishlistItem[]> {
    const product = await this.products.findOne({
      where: { id: productId, isActive: true },
    });
    if (!product) {
      throw new NotFoundException('محصول پیدا نشد');
    }

    const existing = await this.items.findOne({
      where: { userId, productId },
    });
    if (!existing) {
      await this.items.save(this.items.create({ userId, productId }));
    }
    return this.listForUser(userId);
  }

  async remove(userId: string, productId: string): Promise<WishlistItem[]> {
    await this.items.delete({ userId, productId });
    return this.listForUser(userId);
  }

  async clear(userId: string): Promise<WishlistItem[]> {
    await this.items.delete({ userId });
    return [];
  }

  /** Union guest product ids into the user's server wishlist, then return list. */
  async merge(
    userId: string,
    input: MergeWishlistInput,
  ): Promise<WishlistItem[]> {
    const ids = [...new Set(input.productIds.filter(Boolean))];
    if (!ids.length) {
      return this.listForUser(userId);
    }

    const active = await this.products.find({
      where: { id: In(ids), isActive: true },
      select: ['id'],
    });
    const activeIds = new Set(active.map((row) => row.id));

    for (const productId of ids) {
      if (!activeIds.has(productId)) {
        continue;
      }
      const existing = await this.items.findOne({
        where: { userId, productId },
      });
      if (!existing) {
        await this.items.save(this.items.create({ userId, productId }));
      }
    }

    return this.listForUser(userId);
  }

  private async toWishlistItems(productIds: string[]): Promise<WishlistItem[]> {
    if (!productIds.length) {
      return [];
    }
    const products = await this.products.find({
      where: { id: In(productIds), isActive: true },
    });
    const byId = new Map(products.map((row) => [row.id, row]));
    const items: WishlistItem[] = [];
    for (const productId of productIds) {
      const product = byId.get(productId);
      if (!product) {
        continue;
      }
      items.push({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.price) || 0,
        image: product.images[0] ?? null,
        stock: product.stock,
      });
    }
    return items;
  }
}
