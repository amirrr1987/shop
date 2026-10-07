import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  Category as SharedCategory,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@shop/shared';
import type { Repository } from 'typeorm';
import { CacheKeys, CacheTTL } from '../cache/cache.keys.js';
import { CacheService } from '../cache/cache.service.js';
import { Category } from './category.entity.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
    private readonly cache: CacheService,
  ) {}

  findAll() {
    return this.cache.getOrSet(
      CacheKeys.categoriesAll(),
      CacheTTL.CATEGORY,
      async () => {
        const rows = await this.categories.find({ order: { name: 'ASC' } });
        return rows.map((row) => this.toCategory(row));
      },
    );
  }

  async findBySlug(slug: string) {
    return this.cache.getOrSet(
      CacheKeys.categorySlug(slug),
      CacheTTL.CATEGORY,
      async () => {
        const category = await this.categories.findOne({ where: { slug } });
        if (!category) {
          throw new NotFoundException(`دسته «${slug}» پیدا نشد`);
        }
        return this.toCategory(category);
      },
    );
  }

  async findById(id: string) {
    const category = await this.categories.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`دسته پیدا نشد`);
    }
    return this.toCategory(category);
  }

  async create(input: CreateCategoryInput) {
    await this.ensureUniqueSlug(input.slug);
    if (input.parentId) {
      await this.findById(input.parentId);
    }

    const saved = await this.categories.save(
      this.categories.create({
        name: input.name,
        slug: input.slug,
        parentId: input.parentId ?? null,
        description: input.description?.trim() ?? '',
        specKeys: input.specKeys ?? [],
        seoTitle: emptyToNull(input.seoTitle),
        seoDescription: emptyToNull(input.seoDescription),
        ogImage: emptyToNull(input.ogImage),
      }),
    );
    await this.invalidate();
    return this.toCategory(saved);
  }

  async update(id: string, input: UpdateCategoryInput) {
    const category = await this.categories.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`دسته پیدا نشد`);
    }
    const previousSlug = category.slug;

    if (input.slug && input.slug !== category.slug) {
      await this.ensureUniqueSlug(input.slug);
    }
    if (input.parentId) {
      await this.findById(input.parentId);
    }

    if (input.name !== undefined) category.name = input.name;
    if (input.slug !== undefined) category.slug = input.slug;
    if (input.parentId !== undefined) category.parentId = input.parentId;
    if (input.description !== undefined) {
      category.description = input.description.trim();
    }
    if (input.specKeys !== undefined) category.specKeys = input.specKeys;
    if (input.seoTitle !== undefined) {
      category.seoTitle = emptyToNull(input.seoTitle);
    }
    if (input.seoDescription !== undefined) {
      category.seoDescription = emptyToNull(input.seoDescription);
    }
    if (input.ogImage !== undefined) {
      category.ogImage = emptyToNull(input.ogImage);
    }

    const saved = await this.categories.save(category);
    await this.invalidate(previousSlug, saved.slug);
    return this.toCategory(saved);
  }

  async remove(id: string) {
    const category = await this.categories.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`دسته پیدا نشد`);
    }
    const slug = category.slug;
    await this.categories.remove(category);
    await this.invalidate(slug);
    return { id };
  }

  private toCategory(row: Category): SharedCategory {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      parentId: row.parentId,
      description: row.description ?? '',
      specKeys: Array.isArray(row.specKeys) ? row.specKeys : [],
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
      ogImage: row.ogImage ?? null,
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  private async invalidate(...slugs: Array<string | null | undefined>) {
    const keys = [
      CacheKeys.categoriesAll(),
      ...slugs
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => CacheKeys.categorySlug(slug)),
    ];
    await this.cache.del(...keys);
    await Promise.all([
      this.cache.delByPrefix(CacheKeys.prefixProductsList()),
      this.cache.delByPrefix(CacheKeys.prefixProductsFacets()),
      this.cache.delByPrefix(CacheKeys.prefixProduct()),
    ]);
  }

  private async ensureUniqueSlug(slug: string) {
    const exists = await this.categories.existsBy({ slug });
    if (exists) {
      throw new ConflictException(`اسلاگ «${slug}» تکراری است`);
    }
  }
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
