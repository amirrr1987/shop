import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('SHOP_DB_HOST', 'localhost'),
        port: Number(config.get<string>('SHOP_DB_PORT', '5432')),
        username: config.get<string>('SHOP_DB_USER', 'shop_db_admin'),
        password: config.get<string>('SHOP_DB_PASS', 'shop_db_pass'),
        database: config.get<string>('SHOP_DB_NAME', 'shop_db'),
        autoLoadEntities: true,
        synchronize: config.get<string>('SHOP_ENV', 'development') !== 'production',
        retryAttempts: 20,
        retryDelay: 3000,
      }),
    }),
    HealthModule,
  ],
})
export class AppModule {}
