# shop

فروشگاه مونورپو: Nuxt (ویترین) · Nest (API) · Vue panel · `@shop/shared`.

| App | Package | Dev URL |
| --- | --- | --- |
| `apps/web` | `@shop/web` | http://localhost:3000 |
| `apps/api` | `@shop/api` | http://localhost:3001 |
| `apps/panel` | `@shop/panel` | http://localhost:5173 |

## شروع سریع

```bat
cd /d C:\Users\a-maghami\Desktop\shop
pnpm install
docker compose up -d
copy apps\api\.env.example apps\api\.env
pnpm --filter @shop/shared build
pnpm --filter @shop/api migration:run
pnpm --filter @shop/api seed
pnpm dev
```

دستورهای جدا:

```bat
pnpm dev:web
pnpm dev:api
pnpm dev:panel
pnpm build
pnpm test
```

## دیتابیس

- Postgres: `localhost:5432` (`postgres` / `postgres`, db `shop`)
- Redis: `localhost:6379` (کش کاتالوگ API؛ `REDIS_ENABLED` / `REDIS_URL`)
- برای e2e API دیتابیس جدا: `shop_test`

```bat
docker compose exec postgres psql -U postgres -c "CREATE DATABASE shop_test;"
cd /d C:\Users\a-maghami\Desktop\shop && pnpm --filter @shop/api test:e2e
```

اگر پورت `5432` اشغال است، سرویس محلی Postgres را متوقف کن.

## مستندات

- پلن محصول و فازها: [`Plan.md`](./Plan.md)
- Deploy کوتاه: [`docs/DEPLOY.md`](./docs/DEPLOY.md)

## پرداخت (مهم)

`PAYMENT_CALLBACK_URL` باید به **API** بخورد (`/payments/callback`)، نه مستقیم به Nuxt.  
بعد از verify، کاربر به `PAYMENT_RETURN_URL` هدایت می‌شود.  
سندباکس زرین‌پال: [`docs/ZARINPAL_SANDBOX.md`](./docs/ZARINPAL_SANDBOX.md).  
سناریوی دستی لانچ (mock): [`docs/LAUNCH_MANUAL.md`](./docs/LAUNCH_MANUAL.md).
