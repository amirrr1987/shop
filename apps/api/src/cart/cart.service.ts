import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CartLineInput,
  MergeCartInput,
  ReplaceCartInput,
  ServerCart,
  ServerCartLine,
} from '@shop/shared';
import { type Repository } from 'typeorm';
import { ProductsService } from '../products/products.service.js';
import { CartItemEntity } from './cart-item.entity.js';

function lineKey(productId: string, variantId?: string | null) {
  return `${productId}::${variantId || ''}`;
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly items: Repository<CartItemEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async listForUser(userId: string): Promise<ServerCart> {
    const rows = await this.items.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
    return this.enrich(
      rows.map((row) => ({
        productId: row.productId,
        variantId: row.variantId,
        quantity: row.quantity,
      })),
    );
  }

  async replace(
    userId: string,
    input: ReplaceCartInput,
  ): Promise<ServerCart> {
    const cart = await this.enrich(input.items);
    await this.persist(userId, cart.items);
    return cart;
  }

  /** Merge guest lines into the user's cart (sum quantities), then enrich. */
  async merge(userId: string, input: MergeCartInput): Promise<ServerCart> {
    const existing = await this.items.find({ where: { userId } });
    const byKey = new Map<string, CartLineInput>();

    for (const row of existing) {
      byKey.set(lineKey(row.productId, row.variantId), {
        productId: row.productId,
        variantId: row.variantId,
        quantity: row.quantity,
      });
    }

    for (const line of input.items) {
      const key = lineKey(line.productId, line.variantId);
      const prev = byKey.get(key);
      if (!prev) {
        byKey.set(key, {
          productId: line.productId,
          variantId: line.variantId ?? null,
          quantity: line.quantity,
        });
        continue;
      }
      byKey.set(key, {
        ...prev,
        quantity: prev.quantity + line.quantity,
      });
    }

    const cart = await this.enrich([...byKey.values()]);
    await this.persist(userId, cart.items);
    return cart;
  }

  async clear(userId: string): Promise<ServerCart> {
    await this.items.delete({ userId });
    return { items: [] };
  }

  private async persist(userId: string, lines: ServerCartLine[]) {
    await this.items.delete({ userId });
    if (!lines.length) {
      return;
    }
    await this.items.save(
      lines.map((line) =>
        this.items.create({
          userId,
          productId: line.productId,
          variantId: line.variantId,
          quantity: line.quantity,
        }),
      ),
    );
  }

  private async enrich(lines: CartLineInput[]): Promise<ServerCart> {
    if (!lines.length) {
      return { items: [] };
    }

    const { products } = await this.productsService.findAvailability({
      items: lines.map((line) => ({
        productId: line.productId,
        variantId: line.variantId ?? null,
      })),
    });

    const byKey = new Map(
      products.map((product) => [
        lineKey(product.id, product.variantId),
        product,
      ]),
    );

    const items: ServerCartLine[] = [];
    for (const line of lines) {
      const product = byKey.get(lineKey(line.productId, line.variantId));
      if (!product || product.stock < 1) {
        continue;
      }
      const quantity = Math.min(
        Math.max(1, line.quantity),
        Math.max(product.stock, 1),
      );
      items.push({
        productId: product.id,
        variantId: product.variantId,
        quantity,
        name: product.variantLabel
          ? `${product.name} (${product.variantLabel})`
          : product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        stock: product.stock,
        variantLabel: product.variantLabel,
        sku: product.sku,
      });
    }

    return { items };
  }
}
