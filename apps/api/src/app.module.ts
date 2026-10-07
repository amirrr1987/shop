import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@sentry/nestjs/setup';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AddressesModule } from './addresses/addresses.module.js';
import { AuditModule } from './audit/audit.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BrandsModule } from './brands/brands.module.js';
import { CacheModule } from './cache/cache.module.js';
import { CartModule } from './cart/cart.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { RateLimitGuard } from './common/guards/rate-limit.guard.js';
import { type Env, validateEnv } from './config/env.schema.js';
import { ContactModule } from './contact/contact.module.js';
import { CouponsModule } from './coupons/coupons.module.js';
import { NewsletterModule } from './newsletter/newsletter.module.js';
import { migrations } from './database/migrations/index.js';
import { LoyaltyModule } from './loyalty/loyalty.module.js';
import { MagazineModule } from './magazine/magazine.module.js';
import { MailModule } from './mail/mail.module.js';
import { OrdersModule } from './orders/orders.module.js';

import { OtpModule } from './otp/otp.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ProductUnitsModule } from './product-units/product-units.module.js';
import { ProductsModule } from './products/products.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { ShippingModule } from './shipping/shipping.module.js';
import { UploadsModule } from './uploads/uploads.module.js';
import { UsersModule } from './users/users.module.js';
import { WishlistModule } from './wishlist/wishlist.module.js';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => {
        const nodeEnv = config.get('NODE_ENV', { infer: true });
        const syncFlag = config.get('TYPEORM_SYNCHRONIZE', { infer: true });
        const synchronize =
          syncFlag !== undefined ? syncFlag : nodeEnv !== 'production';
        const runMigrationsFlag = config.get('TYPEORM_RUN_MIGRATIONS', {
          infer: true,
        });
        const migrationsRun =
          runMigrationsFlag !== undefined
            ? runMigrationsFlag
            : nodeEnv === 'production' && !synchronize;

        return {
          type: 'postgres' as const,
          host: config.get('DATABASE_HOST', { infer: true }),
          port: config.get('DATABASE_PORT', { infer: true }),
          username: config.get('DATABASE_USER', { infer: true }),
          password: config.get('DATABASE_PASSWORD', { infer: true }),
          database: config.get('DATABASE_NAME', { infer: true }),
          autoLoadEntities: true,
          synchronize,
          migrationsRun,
          migrations,
        };
      },
    }),
    CacheModule,
    UsersModule,
    AddressesModule,
    WishlistModule,
    CartModule,
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    ProductUnitsModule,
    ReviewsModule,
    CouponsModule,
    ContactModule,
    NewsletterModule,
    MagazineModule,
    LoyaltyModule,
    ShippingModule,
    SettingsModule,
    UploadsModule,
    MailModule,
    OtpModule,
    OrdersModule,
    PaymentsModule,
    ReportsModule,
    AuditModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}
