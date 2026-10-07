import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  Brand,
  CreateBrandInput,
  UpdateBrandInput,
} from '@shop/shared';
import type { Repository } from 'typeorm';
import { CacheKeys, CacheTTL } from '../cache/cache.keys.js';
import { CacheService } from '../cache/cache.service.js';
import { BrandEntity } from './brand.entity.js';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brands: Repository<BrandEntity>,
    private readonly cache: CacheService,
  ) {}

  findAll() {
    return this.cache.getOrSet(CacheKeys.brandsAll(), CacheTTL.BRAND, async () => {
      const rows = await this.brands.find({ order: { name: 'ASC' } });
      return rows.map((row) => this.toBrand(row));
    });
  }

  async findBySlug(slug: string) {
    return this.cache.getOrSet(
      CacheKeys.brandSlug(slug),
      CacheTTL.BRAND,
      async () => {
        const brand = await this.brands.findOne({ where: { slug } });
        if (!brand) {
          throw new NotFoundException(`برند «${slug}» پیدا نشد`);
        }
        return this.toBrand(brand);
      },
    );
  }

  async findById(id: string) {
    const brand = await this.brands.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('برند پیدا نشد');
    }
    return brand;
  }

  async create(input: CreateBrandInput) {
    await this.ensureUniqueSlug(input.slug);
    const saved = await this.brands.save(
      this.brands.create({
        name: input.name.trim(),
        slug: input.slug.trim(),
        description: input.description?.trim() ?? '',
        seoTitle: emptyToNull(input.seoTitle),
        seoDescription: emptyToNull(input.seoDescription),
        ogImage: emptyToNull(input.ogImage),
      }),
    );
    await this.invalidate();
    return this.toBrand(saved);
  }

  async update(id: string, input: UpdateBrandInput) {
    const brand = await this.findById(id);
    const previousSlug = brand.slug;
    if (input.slug && input.slug !== brand.slug) {
      await this.ensureUniqueSlug(input.slug);
    }
    if (input.name !== undefined) brand.name = input.name.trim();
    if (input.slug !== undefined) brand.slug = input.slug.trim();
    if (input.description !== undefined) {
      brand.description = input.description.trim();
    }
    if (input.seoTitle !== undefined) {
      brand.seoTitle = emptyToNull(input.seoTitle);
    }
    if (input.seoDescription !== undefined) {
      brand.seoDescription = emptyToNull(input.seoDescription);
    }
    if (input.ogImage !== undefined) {
      brand.ogImage = emptyToNull(input.ogImage);
    }
    const saved = await this.brands.save(brand);
    await this.invalidate(previousSlug, saved.slug);
    return this.toBrand(saved);
  }

  async remove(id: string) {
    const brand = await this.findById(id);
    const slug = brand.slug;
    await this.brands.remove(brand);
    await this.invalidate(slug);
    return { id };
  }

  private toBrand(row: BrandEntity): Brand {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? '',
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
      ogImage: row.ogImage ?? null,
      updatedAt: (row.updatedAt ?? row.createdAt ?? new Date()).toISOString(),
    };
  }

  private async invalidate(...slugs: Array<string | null | undefined>) {
    const keys = [
      CacheKeys.brandsAll(),
      ...slugs
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => CacheKeys.brandSlug(slug)),
    ];
    await this.cache.del(...keys);
    await Promise.all([
      this.cache.delByPrefix(CacheKeys.prefixProductsList()),
      this.cache.delByPrefix(CacheKeys.prefixProductsFacets()),
      this.cache.delByPrefix(CacheKeys.prefixProduct()),
    ]);
  }

  private async ensureUniqueSlug(slug: string) {
    const exists = await this.brands.existsBy({ slug });
    if (exists) {
      throw new ConflictException(`اسلاگ برند «${slug}» تکراری است`);
    }
  }
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
