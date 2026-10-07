import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CreateMagazinePostInput,
  MagazineAdminList,
  MagazineListQuery,
  MagazinePost,
  MagazinePostDetail,
  MagazinePostSummary,
  MagazinePublicList,
  PaginationQuery,
  UpdateMagazinePostInput,
} from '@shop/shared';
import type { Repository } from 'typeorm';
import { CacheKeys, CacheTTL } from '../cache/cache.keys.js';
import { CacheService } from '../cache/cache.service.js';
import { ProductsService } from '../products/products.service.js';
import { MagazinePostEntity } from './magazine-post.entity.js';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(MagazinePostEntity)
    private readonly posts: Repository<MagazinePostEntity>,
    private readonly products: ProductsService,
    private readonly cache: CacheService,
  ) {}

  findPublic(query: PaginationQuery): Promise<MagazinePublicList> {
    return this.cache.getOrSet(
      CacheKeys.magazineList({ ...query, scope: 'public' }),
      CacheTTL.MAGAZINE,
      () => this.findPublicUncached(query),
    );
  }

  private async findPublicUncached(
    query: PaginationQuery,
  ): Promise<MagazinePublicList> {
    const { page, perPage } = query;
    const [rows, total] = await this.posts.findAndCount({
      where: { status: 'published' },
      order: { publishedAt: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      items: rows.map((row) => this.toSummary(row)),
      total,
      page,
      perPage,
    };
  }

  async findBySlug(slug: string): Promise<MagazinePostDetail> {
    return this.cache.getOrSet(
      CacheKeys.magazineSlug(slug),
      CacheTTL.MAGAZINE,
      () => this.findBySlugUncached(slug),
    );
  }

  private async findBySlugUncached(slug: string): Promise<MagazinePostDetail> {
    const row = await this.posts.findOne({
      where: { slug, status: 'published' },
    });
    if (!row) {
      throw new NotFoundException(`مطلب «${slug}» پیدا نشد`);
    }
    const relatedProducts = await this.loadRelatedProducts(row.relatedProductIds);
    return {
      ...this.toPost(row),
      relatedProducts,
    };
  }

  async findAllAdmin(query: MagazineListQuery): Promise<MagazineAdminList> {
    const { page, perPage, status } = query;
    const [rows, total] = await this.posts.findAndCount({
      where: status ? { status } : {},
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      items: rows.map((row) => this.toPost(row)),
      total,
      page,
      perPage,
    };
  }

  async create(input: CreateMagazinePostInput): Promise<MagazinePost> {
    await this.ensureUniqueSlug(input.slug);
    const status = input.status ?? 'draft';
    const saved = await this.posts.save(
      this.posts.create({
        title: input.title.trim(),
        slug: input.slug.trim(),
        excerpt: input.excerpt?.trim() ?? '',
        coverImage: input.coverImage?.trim() || null,
        bodyMarkdown: input.bodyMarkdown ?? '',
        status,
        publishedAt: status === 'published' ? new Date() : null,
        relatedProductIds: uniqueIds(input.relatedProductIds),
        seoTitle: emptyToNull(input.seoTitle),
        seoDescription: emptyToNull(input.seoDescription),
        ogImage: emptyToNull(input.ogImage),
      }),
    );
    await this.invalidate();
    return this.toPost(saved);
  }

  async update(
    id: string,
    input: UpdateMagazinePostInput,
  ): Promise<MagazinePost> {
    const row = await this.findEntityById(id);
    const previousSlug = row.slug;

    if (input.slug && input.slug !== row.slug) {
      await this.ensureUniqueSlug(input.slug);
      row.slug = input.slug.trim();
    }
    if (input.title !== undefined) row.title = input.title.trim();
    if (input.excerpt !== undefined) row.excerpt = input.excerpt.trim();
    if (input.coverImage !== undefined) {
      row.coverImage = input.coverImage?.trim() || null;
    }
    if (input.bodyMarkdown !== undefined) {
      row.bodyMarkdown = input.bodyMarkdown;
    }
    if (input.relatedProductIds !== undefined) {
      row.relatedProductIds = uniqueIds(input.relatedProductIds);
    }
    if (input.seoTitle !== undefined) {
      row.seoTitle = emptyToNull(input.seoTitle);
    }
    if (input.seoDescription !== undefined) {
      row.seoDescription = emptyToNull(input.seoDescription);
    }
    if (input.ogImage !== undefined) {
      row.ogImage = emptyToNull(input.ogImage);
    }
    if (input.status !== undefined) {
      if (input.status === 'published' && !row.publishedAt) {
        row.publishedAt = new Date();
      }
      row.status = input.status;
    }

    const saved = await this.posts.save(row);
    await this.invalidate(previousSlug, saved.slug);
    return this.toPost(saved);
  }

  async remove(id: string) {
    const row = await this.findEntityById(id);
    const slug = row.slug;
    await this.posts.remove(row);
    await this.invalidate(slug);
    return { id };
  }

  async findById(id: string): Promise<MagazinePost> {
    return this.toPost(await this.findEntityById(id));
  }

  private async findEntityById(id: string) {
    const row = await this.posts.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('مطلب پیدا نشد');
    }
    return row;
  }

  private async loadRelatedProducts(ids: string[]) {
    if (!ids.length) return [];
    const products = await this.products.findByIds(ids);
    const active = products.filter((product) => product.isActive);
    const order = new Map(ids.map((id, index) => [id, index]));
    return active.sort(
      (a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0),
    );
  }

  private async invalidate(...slugs: Array<string | null | undefined>) {
    const keys = slugs
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => CacheKeys.magazineSlug(slug));
    if (keys.length) {
      await this.cache.del(...keys);
    }
    await this.cache.delByPrefix(CacheKeys.prefixMagazineList());
  }

  private async ensureUniqueSlug(slug: string) {
    if (slug === 'admin' || slug.startsWith('admin/')) {
      throw new ConflictException(`اسلاگ «${slug}» مجاز نیست`);
    }
    const exists = await this.posts.existsBy({ slug });
    if (exists) {
      throw new ConflictException(`اسلاگ «${slug}» تکراری است`);
    }
  }

  private toSummary(row: MagazinePostEntity): MagazinePostSummary {
    const { bodyMarkdown: _body, ...rest } = this.toPost(row);
    return rest;
  }

  private toPost(row: MagazinePostEntity): MagazinePost {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      coverImage: row.coverImage,
      bodyMarkdown: row.bodyMarkdown,
      status: row.status,
      publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
      relatedProductIds: row.relatedProductIds ?? [],
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
      ogImage: row.ogImage ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}

function uniqueIds(ids: string[] | undefined): string[] {
  return [...new Set((ids ?? []).filter(Boolean))].slice(0, 8);
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
