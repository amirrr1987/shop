import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  AdminReview,
  AdminReviewList,
  AdminReviewListQuery,
  CreateReviewInput,
  Review,
  ReviewList,
  ReviewStatus,
  UpdateReviewReplyInput,
  UpdateReviewStatusInput,
} from '@shop/shared';
import type { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service.js';
import { UsersService } from '../users/users.service.js';
import { ReviewEntity } from './review.entity.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviews: Repository<ReviewEntity>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async findByProduct(
    productId: string,
    viewerUserId?: string | null,
  ): Promise<ReviewList> {
    await this.productsService.findById(productId);

    const rows = await this.reviews.find({
      where: { productId, status: 'approved' },
      order: { createdAt: 'DESC' },
    });

    const users = await this.usersService.findByIds(
      rows.map((row) => row.userId),
    );
    const byId = new Map(users.map((user) => [user.id, user]));

    const items = rows.map((row) =>
      this.toReview(row, byId.get(row.userId)?.fullName ?? 'کاربر'),
    );

    const count = items.length;
    const average =
      count === 0
        ? null
        : Math.round(
            (items.reduce((sum, item) => sum + item.rating, 0) / count) * 10,
          ) / 10;

    let mine: Review | null = null;
    if (viewerUserId) {
      const own = await this.reviews.findOne({
        where: { productId, userId: viewerUserId },
      });
      if (own) {
        const user = await this.usersService.findById(viewerUserId);
        mine = this.toReview(own, user?.fullName ?? 'کاربر');
      }
    }

    return { items, average, count, mine };
  }

  async findAllAdmin(query: AdminReviewListQuery): Promise<AdminReviewList> {
    const { page, perPage, productId, rating, status } = query;
    const qb = this.reviews
      .createQueryBuilder('review')
      .orderBy('review.created_at', 'DESC')
      .skip((page - 1) * perPage)
      .take(perPage);

    if (productId) {
      qb.andWhere('review.product_id = :productId', { productId });
    }
    if (rating !== undefined) {
      qb.andWhere('review.rating = :rating', { rating });
    }
    if (status) {
      qb.andWhere('review.status = :status', { status });
    }

    const [rows, total] = await qb.getManyAndCount();

    const users = await this.usersService.findByIds(
      rows.map((row) => row.userId),
    );
    const products = await this.productsService.findByIds(
      rows.map((row) => row.productId),
    );
    const userById = new Map(users.map((user) => [user.id, user]));
    const productById = new Map(
      products.map((product) => [product.id, product]),
    );

    const items: AdminReview[] = rows.map((row) => {
      const user = userById.get(row.userId);
      const product = productById.get(row.productId);
      return {
        ...this.toReview(row, user?.fullName ?? 'کاربر'),
        productName: product?.name ?? null,
        productSlug: product?.slug ?? null,
        userEmail: user?.email ?? null,
      };
    });

    return { items, total, page, perPage };
  }

  async create(userId: string, input: CreateReviewInput): Promise<Review> {
    await this.productsService.findById(input.productId);

    const existing = await this.reviews.findOne({
      where: { productId: input.productId, userId },
    });
    if (existing) {
      throw new ConflictException('برای این محصول قبلاً نظر ثبت کرده‌اید');
    }

    const saved = await this.reviews.save(
      this.reviews.create({
        productId: input.productId,
        userId,
        rating: input.rating,
        comment: input.comment,
        images: input.images ?? [],
        status: 'pending',
        reply: null,
        repliedAt: null,
      }),
    );

    const user = await this.usersService.findById(userId);
    return this.toReview(saved, user?.fullName ?? 'کاربر');
  }

  async updateStatus(
    id: string,
    input: UpdateReviewStatusInput,
  ): Promise<AdminReview> {
    const row = await this.findEntity(id);
    row.status = input.status;
    const saved = await this.reviews.save(row);
    return this.toAdminReview(saved);
  }

  async updateReply(
    id: string,
    input: UpdateReviewReplyInput,
  ): Promise<AdminReview> {
    const row = await this.findEntity(id);
    row.reply = input.reply;
    row.repliedAt = input.reply ? new Date() : null;
    const saved = await this.reviews.save(row);
    return this.toAdminReview(saved);
  }

  async remove(userId: string, id: string, isAdmin: boolean) {
    const row = await this.findEntity(id);

    if (!isAdmin && row.userId !== userId) {
      throw new ForbiddenException('فقط نظر خودتان را می‌توانید حذف کنید');
    }

    await this.reviews.remove(row);
    return { id };
  }

  private async findEntity(id: string) {
    const row = await this.reviews.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('نظر پیدا نشد');
    }
    return row;
  }

  private async toAdminReview(row: ReviewEntity): Promise<AdminReview> {
    const [user, product] = await Promise.all([
      this.usersService.findById(row.userId),
      this.productsService.findByIds([row.productId]).then((items) => items[0]),
    ]);

    return {
      ...this.toReview(row, user?.fullName ?? 'کاربر'),
      productName: product?.name ?? null,
      productSlug: product?.slug ?? null,
      userEmail: user?.email ?? null,
    };
  }

  private toReview(row: ReviewEntity, userFullName: string): Review {
    return {
      id: row.id,
      productId: row.productId,
      userId: row.userId,
      userFullName,
      rating: row.rating,
      comment: row.comment,
      images: Array.isArray(row.images) ? row.images : [],
      status: row.status as ReviewStatus,
      reply: row.reply,
      repliedAt: row.repliedAt ? row.repliedAt.toISOString() : null,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
