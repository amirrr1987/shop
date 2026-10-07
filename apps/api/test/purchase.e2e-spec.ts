import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, type TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import type { Repository } from 'typeorm';
import { AppModule } from '../src/app.module.js';
import { Product } from '../src/products/product.entity.js';
import { ShippingMethodEntity } from '../src/shipping/shipping-method.entity.js';

describe('Purchase flow (e2e)', () => {
  let app: INestApplication<App>;
  let products: Repository<Product>;
  let shipping: Repository<ShippingMethodEntity>;
  let productId: string;
  let shippingMethodId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser('test-cookie-secret'));
    await app.init();

    products = app.get(getRepositoryToken(Product));
    shipping = app.get(getRepositoryToken(ShippingMethodEntity));

    const suffix = Date.now().toString(36);
    const product = await products.save(
      products.create({
        name: `E2E Product ${suffix}`,
        slug: `e2e-product-${suffix}`,
        description: 'e2e',
        price: 100_000,
        stock: 5,
        categoryId: null,
        images: [],
        isActive: true,
        isFeatured: false,
      }),
    );
    productId = product.id;

    const method = await shipping.save(
      shipping.create({
        name: `E2E Post ${suffix}`,
        description: null,
        price: 20_000,
        estimatedDays: 2,
        freeAbove: null,
        sortOrder: 0,
        isActive: true,
      }),
    );
    shippingMethodId = method.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers → orders → mock payment callback → paid', async () => {
    const email = `buyer-${Date.now()}@example.com`;
    const password = 'password123';

    const register = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password,
        fullName: 'خریدار تست',
      });
    expect([200, 201]).toContain(register.status);

    const accessToken = register.body.accessToken as string;
    expect(accessToken).toBeTruthy();

    const orderRes = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        items: [{ productId, quantity: 1 }],
        shippingMethodId,
        address: {
          fullName: 'خریدار تست',
          phone: '09120000000',
          province: 'تهران',
          city: 'تهران',
          postalCode: '1234567890',
          line: 'خیابان تست ۱',
        },
      });
    expect([200, 201]).toContain(orderRes.status);

    const orderId = orderRes.body.id as string;
    expect(orderRes.body.paymentStatus).toBe('pending');
    expect(orderRes.body.total).toBe(120_000);

    const start = await request(app.getHttpServer())
      .post(`/payments/orders/${orderId}/start`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect([200, 201]).toContain(start.status);

    const authority = start.body.authority as string;
    expect(authority).toMatch(/^MOCK-/);
    expect(start.body.paymentUrl).toContain('/payments/callback');

    const callback = await request(app.getHttpServer())
      .get('/payments/callback')
      .query({ Authority: authority, Status: 'OK' })
      .redirects(0)
      .expect(302);

    const location = String(callback.headers.location || '');
    expect(location).toContain('serverVerified=1');
    expect(location).toContain(`orderId=${orderId}`);
    expect(location).toContain('ok=1');

    const paid = await request(app.getHttpServer())
      .get(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(paid.body.paymentStatus).toBe('paid');
    expect(paid.body.status).toBe('paid');
    expect(paid.body.paymentRefId).toBeTruthy();

    const stock = await products.findOneByOrFail({ id: productId });
    expect(stock.stock).toBe(4);
  });
});
