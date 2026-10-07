import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AddressEntity } from '../addresses/address.entity.js';
import { AuditLogEntity } from '../audit/audit-log.entity.js';
import { PasswordResetTokenEntity } from '../auth/password-reset-token.entity.js';
import { RefreshTokenEntity } from '../auth/refresh-token.entity.js';
import { BrandEntity } from '../brands/brand.entity.js';
import { Category } from '../categories/category.entity.js';
import { ContactMessageEntity } from '../contact/contact-message.entity.js';
import { CouponEntity } from '../coupons/coupon.entity.js';
import { NewsletterSubscriberEntity } from '../newsletter/newsletter-subscriber.entity.js';
import { OrderItemEntity } from '../orders/order-item.entity.js';
import { OrderEntity } from '../orders/order.entity.js';
import { PaymentTransactionEntity } from '../payments/payment-transaction.entity.js';
import { ProductVariantEntity } from '../products/product-variant.entity.js';
import { Product } from '../products/product.entity.js';
import { ReviewEntity } from '../reviews/review.entity.js';
import { StoreSettingsEntity } from '../settings/store-settings.entity.js';
import { ShippingMethodEntity } from '../shipping/shipping-method.entity.js';
import { User } from '../users/user.entity.js';
import { CartItemEntity } from '../cart/cart-item.entity.js';
import { LoyaltyLedgerEntity } from '../loyalty/loyalty-ledger.entity.js';
import { MagazinePostEntity } from '../magazine/magazine-post.entity.js';
import { OtpChallengeEntity } from '../otp/otp-challenge.entity.js';
import { ProductUnitEntity } from '../product-units/product-unit.entity.js';
import { WishlistItemEntity } from '../wishlist/wishlist-item.entity.js';
import { migrations } from './migrations/index.js';

/**
 * CLI DataSource (`pnpm migration:run` / `migration:generate`).
 * Load env with: `node --env-file=.env ...`
 * Prefer `pnpm migration:run` (builds to dist first) — do not point CLI at src/*.ts.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'shop',
  entities: [
    User,
    Category,
    BrandEntity,
    Product,
    ProductVariantEntity,
    ProductUnitEntity,
    AddressEntity,
    OrderEntity,
    OrderItemEntity,
    ReviewEntity,
    CouponEntity,
    ContactMessageEntity,
    NewsletterSubscriberEntity,
    ShippingMethodEntity,
    StoreSettingsEntity,
    RefreshTokenEntity,
    PasswordResetTokenEntity,
    AuditLogEntity,
    PaymentTransactionEntity,
    WishlistItemEntity,
    CartItemEntity,
    MagazinePostEntity,
    OtpChallengeEntity,
    LoyaltyLedgerEntity,
  ],
  migrations,
  synchronize: false,
});
