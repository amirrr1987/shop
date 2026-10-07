import './instrument.js';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import helmet from 'helmet';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';
import { PersianHttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { JsonLogger } from './common/logger/json.logger.js';
import type { Env } from './config/env.schema.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new JsonLogger('Bootstrap'),
  });
  const config = app.get(ConfigService<Env, true>);

  const uploadRoot = join(
    process.cwd(),
    config.get('UPLOAD_DIR', { infer: true }),
  );
  if (!existsSync(uploadRoot)) {
    mkdirSync(uploadRoot, { recursive: true });
  }
  app.useStaticAssets(uploadRoot, { prefix: '/uploads/' });

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new PersianHttpExceptionFilter(),
  );
  const nodeEnv = config.get('NODE_ENV', { infer: true });
  const isProd = nodeEnv === 'production';

  if (isProd) {
    // Terminate TLS at reverse proxy (Caddy/Nginx/Traefik).
    app.set('trust proxy', 1);
  }

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      hsts: isProd
        ? { maxAge: 15_552_000, includeSubDomains: true, preload: false }
        : false,
      contentSecurityPolicy: false,
    }),
  );
  app.use(cookieParser(config.get('COOKIE_SECRET', { infer: true })));
  app.enableCors({
    origin: config.get('CORS_ORIGINS', { infer: true }),
    credentials: true,
  });

  const swaggerFlag = config.get('SWAGGER_ENABLED', { infer: true });
  const swaggerEnabled =
    swaggerFlag !== undefined ? swaggerFlag : nodeEnv !== 'production';

  if (swaggerEnabled) {
    const openApiConfig = new DocumentBuilder()
      .setTitle('Shop API')
      .setDescription('Shop backend API')
      .setVersion('0.0.1')
      .addBearerAuth()
      .addCookieAuth('access_token')
      .addCookieAuth('refresh_token')
      .build();

    const openApiDoc = SwaggerModule.createDocument(app, openApiConfig);
    SwaggerModule.setup('docs', app, cleanupOpenApiDoc(openApiDoc));
  }

  const port = config.get('PORT', { infer: true });
  await app.listen(port);
}

await bootstrap();
