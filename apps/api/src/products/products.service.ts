import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CartUpsellRequest,
  CreateProductInput,
  Product as SharedProduct,
  ProductAvailabilityItem,
  ProductAvailabilityRequest,
  ProductFacets,
  ProductListQuery,
  ProductVariant,
  UpdateProductInput,
  UpsertProductVariantInput,
} from '@shop/shared';
import { DataSource, In, type Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service.js';
import { CacheKeys, CacheTTL } from '../cache/cache.keys.js';
import { CacheService } from '../cache/cache.service.js';
import { CategoriesService } from '../categories/categories.service.js';
import { ProductUnitsService } from '../product-units/product-units.service.js';
import { ProductVariantEntity } from './product-variant.entity.js';
import { Product } from './product.entity.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    @InjectRepository(ProductVariantEntity)
    private readonly variants: Repository<ProductVariantEntity>,
    private readonly categoriesService: CategoriesService,
    private readonly brandsService: BrandsService,
    private readonly productUnitsService: ProductUnitsService,
    private readonly cache: CacheService,
    private readonly dataSource: DataSource,
  ) {}


  async findAll(query: ProductListQuery, options?: { includeInactive?: boolean }) {
    if (options?.includeInactive) {
      return this.findAllUncached(query, options);
    }
    return this.cache.getOrSet(
      CacheKeys.productList(query),
      CacheTTL.LIST,
      () => this.findAllUncached(query, options),
    );
  }

  private async findAllUncached(
    query: ProductListQuery,
    options?: { includeInactive?: boolean },
  ) {
    const {
      page,
      perPage,
      q,
      category,
      brand,
      condition,
      option,
      sort,
      minPrice,
      maxPrice,
      inStock,
      featured,
      onSale,
    } = query;
    const qb = this.products.createQueryBuilder('product');

    if (!options?.includeInactive) {
      qb.andWhere('product.is_active = :isActive', { isActive: true });
    }

    if (q) {
      qb.andWhere(
        '(product.name ILIKE :q OR product.description ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    if (category) {
      const found = await this.categoriesService.findBySlug(category);
      qb.andWhere('product.category_id = :categoryId', {
        categoryId: found.id,
      });
    }

    if (brand) {
      const found = await this.brandsService.findBySlug(brand);
      qb.andWhere('product.brand_id = :brandId', { brandId: found.id });
    }

    if (condition) {
      qb.andWhere('product.condition = :condition', { condition });
    }

    if (option) {
      const sep = option.indexOf(':');
      const optionKey = option.slice(0, sep).trim();
      const optionValue = option.slice(sep + 1).trim();
      if (!optionKey || !optionValue) {
        throw new BadRequestException('فیلتر گزینه نامعتبر است');
      }
      qb.andWhere(
        `EXISTS (
          SELECT 1 FROM product_variants v
          WHERE v.product_id = product.id
            AND v.is_active = true
            AND v.options ->> :optionKey = :optionValue
        )`,
        { optionKey, optionValue },
      );
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      throw new BadRequestException(
        'حداکثر قیمت باید بزرگ‌تر یا مساوی حداقل باشد',
      );
    }
    if (inStock === true) {
      qb.andWhere('product.stock > 0');
    }
    if (featured === true) {
      qb.andWhere('product.is_featured = :isFeatured', { isFeatured: true });
    }
    if (onSale === true) {
      qb.andWhere('product.sale_price IS NOT NULL');
      qb.andWhere('product.sale_ends_at IS NOT NULL');
      qb.andWhere('product.sale_ends_at > NOW()');
      qb.andWhere('product.sale_price < product.price');
      qb.andWhere("product.price_mode = 'fixed'");
    }

    if (sort === 'bestselling') {
      // Scalar subquery + order alias — avoid joining a raw subquery (no entity metadata).
      qb.addSelect(
        `(
          SELECT COALESCE(SUM(oi.quantity), 0)::int
          FROM order_items oi
          INNER JOIN orders o ON o.id = oi.order_id
          WHERE o.payment_status = 'paid'
            AND oi.product_id = product.id
        )`,
        'sold_count',
      );
      qb.orderBy('sold_count', 'DESC');
      qb.addOrderBy('product.created_at', 'DESC');
    } else if (sort === 'popular') {
      qb.orderBy('product.view_count', 'DESC');
      qb.addOrderBy('product.created_at', 'DESC');
    } else if (sort === 'price-asc') {
      qb.orderBy('product.price', 'ASC');
    } else if (sort === 'price-desc') {
      qb.orderBy('product.price', 'DESC');
    } else {
      qb.orderBy('product.created_at', 'DESC');
    }

    qb.skip((page - 1) * perPage).take(perPage);

    const [rows, total] = await qb.getManyAndCount();
    const items = await this.attachVariants(rows, {
      activeOnly: !options?.includeInactive,
    });

    return { items, total, page, perPage };
  }

  async facets(query: {
    category?: string;
    brand?: string;
  }): Promise<ProductFacets> {
    return this.cache.getOrSet(
      CacheKeys.productFacets(query.category, query.brand),
      CacheTTL.FACETS,
      () => this.facetsUncached(query),
    );
  }

  private async facetsUncached(query: {
    category?: string;
    brand?: string;
  }): Promise<ProductFacets> {
    const qb = this.products
      .createQueryBuilder('product')
      .where('product.is_active = :isActive', { isActive: true });

    if (query.category) {
      const found = await this.categoriesService.findBySlug(query.category);
      qb.andWhere('product.category_id = :categoryId', {
        categoryId: found.id,
      });
    }
    if (query.brand) {
      const found = await this.brandsService.findBySlug(query.brand);
      qb.andWhere('product.brand_id = :brandId', { brandId: found.id });
    }

    const brandRows = await qb
      .clone()
      .select('brand.slug', 'slug')
      .addSelect('brand.name', 'name')
      .addSelect('COUNT(product.id)::int', 'count')
      .innerJoin('brands', 'brand', 'brand.id = product.brand_id')
      .groupBy('brand.id')
      .addGroupBy('brand.slug')
      .addGroupBy('brand.name')
      .orderBy('brand.name', 'ASC')
      .getRawMany<{ slug: string; name: string; count: string | number }>();

    const categoryRows = await qb
      .clone()
      .select('category.slug', 'slug')
      .addSelect('category.name', 'name')
      .addSelect('COUNT(product.id)::int', 'count')
      .innerJoin('categories', 'category', 'category.id = product.category_id')
      .groupBy('category.id')
      .addGroupBy('category.slug')
      .addGroupBy('category.name')
      .orderBy('category.name', 'ASC')
      .getRawMany<{ slug: string; name: string; count: string | number }>();

    const activeIds = (
      await qb.clone().select('product.id', 'id').getRawMany<{ id: string }>()
    ).map((row) => row.id);

    const optionsMap = new Map<string, Map<string, Set<string>>>();
    if (activeIds.length) {
      const variants = await this.variants.find({
        where: { productId: In(activeIds), isActive: true },
      });
      for (const variant of variants) {
        for (const [key, value] of Object.entries(variant.options ?? {})) {
          if (!key || !value) continue;
          const byValue = optionsMap.get(key) ?? new Map<string, Set<string>>();
          const products = byValue.get(value) ?? new Set<string>();
          products.add(variant.productId);
          byValue.set(value, products);
          optionsMap.set(key, byValue);
        }
      }
    }

    return {
      brands: brandRows.map((row) => ({
        slug: row.slug,
        name: row.name,
        count: Number(row.count) || 0,
      })),
      categories: categoryRows.map((row) => ({
        slug: row.slug,
        name: row.name,
        count: Number(row.count) || 0,
      })),
      options: [...optionsMap.entries()].map(([key, byValue]) => ({
        key,
        values: [...byValue.entries()]
          .map(([value, products]) => ({
            value,
            count: products.size,
          }))
          .sort((a, b) => a.value.localeCompare(b.value, 'fa')),
      })),
    };
  }

  /** Cached PDP payload (no view bump). */
  private async getCachedProductBySlug(slug: string): Promise<SharedProduct> {
    return this.cache.getOrSet(
      CacheKeys.productSlug(slug),
      CacheTTL.PRODUCT,
      async () => {
        const product = await this.products.findOne({
          where: { slug, isActive: true },
        });
        if (!product) {
          throw new NotFoundException(`محصول «${slug}» پیدا نشد`);
        }
        const [mapped] = await this.attachVariants([product], {
          activeOnly: true,
        });
        return mapped!;
      },
    );
  }

  async findBySlug(slug: string) {
    const mapped = await this.getCachedProductBySlug(slug);
    await this.products.increment({ id: mapped.id }, 'viewCount', 1);
    return {
      ...mapped,
      viewCount: (mapped.viewCount ?? 0) + 1,
    };
  }

  async findRelated(slug: string, limit = 4) {
    return this.cache.getOrSet(
      CacheKeys.productRelated(slug),
      CacheTTL.RELATED,
      async () => {
        const product = await this.getCachedProductBySlug(slug);
        return this.loadCategoryFallback(product.id, product.categoryId, limit);
      },
    );
  }

  /** Co-purchase from paid orders; falls back to same-category related. */
  async findAlsoBought(slug: string, limit = 4) {
    return this.cache.getOrSet(
      CacheKeys.productAlsoBought(slug),
      CacheTTL.RELATED,
      async () => {
        const product = await this.getCachedProductBySlug(slug);
        const fromOrders = await this.loadByCoPurchaseIds(
          [product.id],
          [product.id],
          limit,
        );
        if (fromOrders.length >= limit) {
          return fromOrders;
        }
        const exclude = new Set([
          product.id,
          ...fromOrders.map((item) => item.id),
        ]);
        const fallback = await this.loadCategoryFallback(
          product.id,
          product.categoryId,
          limit,
          exclude,
        );
        return [...fromOrders, ...fallback].slice(0, limit);
      },
    );
  }

  async findCartUpsell(input: CartUpsellRequest) {
    const productIds = [...new Set(input.productIds)];
    const limit = input.limit ?? 4;
    const fromOrders = await this.loadByCoPurchaseIds(
      productIds,
      productIds,
      limit,
    );
    if (fromOrders.length >= limit) {
      return fromOrders;
    }

    const seed = await this.products.findOne({
      where: { id: productIds[0], isActive: true },
    });
    const exclude = new Set([
      ...productIds,
      ...fromOrders.map((item) => item.id),
    ]);
    const fallback = seed
      ? await this.loadCategoryFallback(
          seed.id,
          seed.categoryId,
          limit,
          exclude,
        )
      : [];
    return [...fromOrders, ...fallback].slice(0, limit);
  }

  private async loadByCoPurchaseIds(
    seedIds: string[],
    excludeIds: string[],
    limit: number,
  ) {
    if (!seedIds.length || limit < 1) {
      return [] as SharedProduct[];
    }

    const rows = await this.dataSource.query<
      Array<{ product_id: string; score: string }>
    >(
      `
      SELECT oi2.product_id::text AS product_id, COUNT(*)::text AS score
      FROM order_items oi1
      INNER JOIN orders o ON o.id = oi1.order_id AND o.payment_status = 'paid'
      INNER JOIN order_items oi2
        ON oi2.order_id = oi1.order_id
       AND oi2.product_id <> oi1.product_id
      WHERE oi1.product_id = ANY($1::uuid[])
        AND NOT (oi2.product_id = ANY($2::uuid[]))
      GROUP BY oi2.product_id
      ORDER BY COUNT(*) DESC
      LIMIT $3
      `,
      [seedIds, excludeIds, limit],
    );

    if (!rows.length) {
      return [] as SharedProduct[];
    }

    const ids = rows.map((row) => row.product_id);
    const products = await this.products.find({
      where: { id: In(ids), isActive: true },
    });
    const byId = new Map(products.map((row) => [row.id, row]));
    const ordered = ids
      .map((id) => byId.get(id))
      .filter((row): row is Product => Boolean(row));
    return this.attachVariants(ordered, { activeOnly: true });
  }

  private async loadCategoryFallback(
    productId: string,
    categoryId: string | null,
    limit: number,
    excludeIds: Set<string> = new Set(),
  ) {
    const qb = this.products
      .createQueryBuilder('product')
      .where('product.is_active = :isActive', { isActive: true })
      .andWhere('product.id != :id', { id: productId })
      .orderBy('product.created_at', 'DESC')
      .take(limit + excludeIds.size);

    if (categoryId) {
      qb.andWhere('product.category_id = :categoryId', { categoryId });
    }

    const related = await qb.getMany();
    const filtered = related
      .filter((row) => !excludeIds.has(row.id))
      .slice(0, limit);
    return this.attachVariants(filtered, { activeOnly: true });
  }


  async findAvailability(
    input: ProductAvailabilityRequest,
  ): Promise<{ products: ProductAvailabilityItem[] }> {
    const lines =
      input.items ??
      (input.productIds ?? []).map((productId) => ({
        productId,
        variantId: null as string | null,
      }));

    const productIds = [...new Set(lines.map((line) => line.productId))];
    const rows = await this.products.find({
      where: {
        id: In(productIds),
        isActive: true,
      },
    });
    const byProduct = new Map(rows.map((row) => [row.id, row]));
    const variantIds = [
      ...new Set(
        lines
          .map((line) => line.variantId)
          .filter((id): id is string => Boolean(id)),
      ),
    ];
    const variantRows = variantIds.length
      ? await this.variants.find({ where: { id: In(variantIds), isActive: true } })
      : [];
    const byVariant = new Map(variantRows.map((row) => [row.id, row]));

    const products: ProductAvailabilityItem[] = [];
    for (const line of lines) {
      const product = byProduct.get(line.productId);
      if (!product) {
        continue;
      }
      const priceBase = Number(product.price) || 0;
      if (line.variantId) {
        const variant = byVariant.get(line.variantId);
        if (!variant || variant.productId !== product.id) {
          continue;
        }
        products.push({
          id: product.id,
          variantId: variant.id,
          name: product.name,
          slug: product.slug,
          price:
            variant.price === null || variant.price === undefined
              ? priceBase
              : Number(variant.price) || 0,
          stock: variant.stock,
          image: product.images[0] ?? null,
          variantLabel: variant.label,
          sku: variant.sku,
        });
        continue;
      }

      products.push({
        id: product.id,
        variantId: null,
        name: product.name,
        slug: product.slug,
        price: priceBase,
        stock: product.stock,
        image: product.images[0] ?? null,
        variantLabel: null,
        sku: null,
      });
    }

    return { products };
  }

  async findById(id: string) {
    const product = await this.products.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`محصول پیدا نشد`);
    }
    const [mapped] = await this.attachVariants([product], { activeOnly: false });
    return mapped!;
  }

  async findByIds(ids: string[]) {
    const unique = [...new Set(ids.filter(Boolean))];
    if (!unique.length) return [];
    const rows = await this.products.find({ where: { id: In(unique) } });
    return this.attachVariants(rows, { activeOnly: false });
  }

  async create(input: CreateProductInput) {
    await this.ensureUniqueSlug(input.slug);
    if (input.categoryId) {
      await this.categoriesService.findById(input.categoryId);
    }

    if (input.brandId) {
      await this.brandsService.findById(input.brandId);
    }
    if (input.unitId) {
      await this.productUnitsService.findById(input.unitId);
    }

    const saved = await this.products.save(
      this.products.create({
        name: input.name,
        slug: input.slug,
        description: input.description ?? '',
        price: input.price,
        stock: input.stock ?? 0,
        categoryId: input.categoryId ?? null,
        brandId: input.brandId ?? null,
        unitId: input.unitId ?? null,
        images: input.images ?? [],
        isActive: input.isActive ?? true,
        isFeatured: input.isFeatured ?? false,
        priceMode: input.priceMode ?? 'fixed',
        condition: 'new',
        salePrice: input.salePrice ?? null,
        saleEndsAt: input.saleEndsAt ? new Date(input.saleEndsAt) : null,
        specs: input.specs ?? [],
        videoUrl: (input.videoUrl ?? '').trim(),
        seoTitle: emptyToNull(input.seoTitle),
        seoDescription: emptyToNull(input.seoDescription),
        ogImage: emptyToNull(input.ogImage),
      }),
    );

    await this.replaceVariants(saved.id, input.variants ?? []);
    const result = await this.findById(saved.id);
    await this.invalidateCatalogCache(saved.slug);
    return result;
  }

  async update(id: string, input: UpdateProductInput) {
    const product = await this.products.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`محصول پیدا نشد`);
    }
    const previousSlug = product.slug;

    if (input.slug && input.slug !== product.slug) {
      await this.ensureUniqueSlug(input.slug);
    }
    if (input.categoryId) {
      await this.categoriesService.findById(input.categoryId);
    }
    if (input.brandId) {
      await this.brandsService.findById(input.brandId);
    }
    if (input.unitId) {
      await this.productUnitsService.findById(input.unitId);
    }

    if (input.name !== undefined) product.name = input.name;
    if (input.slug !== undefined) product.slug = input.slug;
    if (input.description !== undefined) product.description = input.description;
    if (input.price !== undefined) product.price = input.price;
    if (input.stock !== undefined) product.stock = input.stock;
    if (input.categoryId !== undefined) product.categoryId = input.categoryId;
    if (input.brandId !== undefined) product.brandId = input.brandId;
    if (input.unitId !== undefined) product.unitId = input.unitId;
    if (input.images !== undefined) product.images = input.images;
    if (input.isActive !== undefined) product.isActive = input.isActive;
    if (input.isFeatured !== undefined) product.isFeatured = input.isFeatured;
    if (input.priceMode !== undefined) product.priceMode = input.priceMode;
    if (input.condition !== undefined) product.condition = 'new';
    if (input.salePrice !== undefined) product.salePrice = input.salePrice;
    if (input.saleEndsAt !== undefined) {
      product.saleEndsAt = input.saleEndsAt ? new Date(input.saleEndsAt) : null;
    }
    if (input.specs !== undefined) product.specs = input.specs;
    if (input.videoUrl !== undefined) {
      product.videoUrl = input.videoUrl.trim();
    }
    if (input.seoTitle !== undefined) {
      product.seoTitle = emptyToNull(input.seoTitle);
    }
    if (input.seoDescription !== undefined) {
      product.seoDescription = emptyToNull(input.seoDescription);
    }
    if (input.ogImage !== undefined) {
      product.ogImage = emptyToNull(input.ogImage);
    }

    await this.products.save(product);

    if (input.variants !== undefined) {
      await this.replaceVariants(product.id, input.variants);
    }

    const result = await this.findById(product.id);
    await this.invalidateCatalogCache(previousSlug, product.slug);
    return result;
  }

  async remove(id: string) {
    const product = await this.products.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`محصول پیدا نشد`);
    }
    const slug = product.slug;
    await this.products.remove(product);
    await this.invalidateCatalogCache(slug);
    return { id };
  }

  private async invalidateCatalogCache(...slugs: Array<string | null | undefined>) {
    const keys = slugs
      .filter((slug): slug is string => Boolean(slug))
      .flatMap((slug) => [
        CacheKeys.productSlug(slug),
        CacheKeys.productRelated(slug),
        CacheKeys.productAlsoBought(slug),
      ]);

    if (keys.length) {
      await this.cache.del(...keys);
    }
    await Promise.all([
      this.cache.delByPrefix(CacheKeys.prefixProductsList()),
      this.cache.delByPrefix(CacheKeys.prefixProductsFacets()),
    ]);
  }

  private async replaceVariants(
    productId: string,
    variants: UpsertProductVariantInput[],
  ) {
    const skus = variants.map((item) => item.sku.trim().toUpperCase());
    if (new Set(skus).size !== skus.length) {
      throw new BadRequestException('SKU تکراری در لیست واریانت‌ها');
    }

    for (const sku of skus) {
      const conflict = await this.variants.findOne({ where: { sku } });
      if (conflict && conflict.productId !== productId) {
        throw new ConflictException(`SKU «${sku}» قبلاً ثبت شده است`);
      }
    }

    const existing = await this.variants.find({ where: { productId } });
    const keepIds = new Set(
      variants.map((item) => item.id).filter((id): id is string => Boolean(id)),
    );
    const toRemove = existing.filter((row) => !keepIds.has(row.id));
    if (toRemove.length) {
      await this.variants.remove(toRemove);
    }

    for (const item of variants) {
      const sku = item.sku.trim().toUpperCase();
      if (item.id) {
        const row = existing.find((entry) => entry.id === item.id);
        if (!row) {
          throw new BadRequestException('واریانت نامعتبر است');
        }
        row.sku = sku;
        row.label = item.label.trim();
        row.options = item.options ?? {};
        row.price = item.price;
        row.stock = item.stock;
        row.isActive = item.isActive;
        await this.variants.save(row);
      } else {
        await this.variants.save(
          this.variants.create({
            productId,
            sku,
            label: item.label.trim(),
            options: item.options ?? {},
            price: item.price,
            stock: item.stock,
            isActive: item.isActive,
          }),
        );
      }
    }

    const active = await this.variants.find({
      where: { productId, isActive: true },
    });
    if (active.length) {
      const stock = active.reduce((sum, row) => sum + row.stock, 0);
      await this.products.update({ id: productId }, { stock });
    }
  }

  private async attachVariants(
    products: Product[],
    options: { activeOnly: boolean },
  ): Promise<SharedProduct[]> {
    if (!products.length) {
      return [];
    }
    const ids = products.map((row) => row.id);
    const rows = await this.variants.find({
      where: options.activeOnly
        ? { productId: In(ids), isActive: true }
        : { productId: In(ids) },
      order: { sku: 'ASC' },
    });
    const byProduct = new Map<string, ProductVariantEntity[]>();
    for (const row of rows) {
      const list = byProduct.get(row.productId) ?? [];
      list.push(row);
      byProduct.set(row.productId, list);
    }

    const brandIds = [
      ...new Set(
        products
          .map((row) => row.brandId)
          .filter((id): id is string => Boolean(id)),
      ),
    ];
    const brands = brandIds.length
      ? await Promise.all(
          brandIds.map((id) => this.brandsService.findById(id).catch(() => null)),
        )
      : [];
    const brandById = new Map(
      brands
        .filter((row): row is NonNullable<typeof row> => Boolean(row))
        .map((row) => [row.id, row]),
    );

    const unitIds = [
      ...new Set(
        products
          .map((row) => row.unitId)
          .filter((id): id is string => Boolean(id)),
      ),
    ];
    const units = await this.productUnitsService.findByIds(unitIds);
    const unitById = new Map(units.map((row) => [row.id, row]));

    return products.map((product) => {
      const brand = product.brandId
        ? brandById.get(product.brandId)
        : undefined;
      const unit = product.unitId ? unitById.get(product.unitId) : undefined;
      return this.toProduct(
        product,
        byProduct.get(product.id) ?? [],
        brand,
        unit,
      );
    });
  }

  private toProduct(
    product: Product,
    variants: ProductVariantEntity[],
    brand?: { id: string; name: string; slug: string } | null,
    unit?: { id: string; name: string; symbol: string } | null,
  ): SharedProduct {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price) || 0,
      stock: product.stock,
      categoryId: product.categoryId,
      brandId: product.brandId,
      brandName: brand?.name ?? null,
      brandSlug: brand?.slug ?? null,
      unitId: product.unitId ?? null,
      unitName: unit?.name ?? null,
      unitSymbol: unit?.symbol ?? null,
      images: product.images ?? [],
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      priceMode: product.priceMode ?? 'fixed',
      condition: 'new',
      salePrice:
        product.salePrice === null || product.salePrice === undefined
          ? null
          : Number(product.salePrice) || 0,
      saleEndsAt: product.saleEndsAt
        ? product.saleEndsAt.toISOString()
        : null,
      specs: Array.isArray(product.specs) ? product.specs : [],
      videoUrl: product.videoUrl || null,
      viewCount: product.viewCount ?? 0,
      variants: variants.map((row) => this.toVariant(row)),
      seoTitle: product.seoTitle ?? null,
      seoDescription: product.seoDescription ?? null,
      ogImage: product.ogImage ?? null,
      updatedAt: product.updatedAt.toISOString(),
    };
  }

  private toVariant(row: ProductVariantEntity): ProductVariant {
    return {
      id: row.id,
      productId: row.productId,
      sku: row.sku,
      label: row.label,
      options: row.options ?? {},
      price:
        row.price === null || row.price === undefined
          ? null
          : Number(row.price) || 0,
      stock: row.stock,
      isActive: row.isActive,
    };
  }

  private async ensureUniqueSlug(slug: string) {
    const exists = await this.products.existsBy({ slug });
    if (exists) {
      throw new ConflictException(`اسلاگ محصول «${slug}» تکراری است`);
    }
  }
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
