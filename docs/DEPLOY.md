# Deploy کوتاه

هدف: یک staging قابل‌اجرا با Postgres، API، وب و پنل.

## پیش‌نیاز

- Node `>=22.18`
- pnpm `11`
- Docker (Postgres + Redis؛ اختیاری MinIO/بکاپ)

## ۱) دیتابیس و Redis

```bat
cd /d C:\Users\a-maghami\Desktop\shop
docker compose up -d
```

این دستور Postgres و Redis (`6379`) را بالا می‌آورد. API با `REDIS_URL` کش کاتالوگ می‌زند؛ اگر Redis قطع باشد به حافظهٔ پروسس fallback می‌کند.

از `apps/api/.env.example` فایل `.env` بساز و رمزها را عوض کن.

```bat
cd /d C:\Users\a-maghami\Desktop\shop
pnpm --filter @shop/shared build
pnpm --filter @shop/api migration:run
pnpm --filter @shop/api seed
```

`TYPEORM_SYNCHRONIZE=false` در staging/prod.

## ۲) پرداخت

| متغیر | نقش |
| --- | --- |
| `PAYMENT_PROVIDER` | `mock` یا `zarinpal` |
| `PAYMENT_CALLBACK_URL` | آدرس **عمومی API**: `https://api.example.com/payments/callback` |
| `PAYMENT_RETURN_URL` | صفحه وب بعد از verify: `https://shop.example.com/checkout/callback` |
| `ZARINPAL_MERCHANT_ID` | فقط وقتی provider=zarinpal |
| `ZARINPAL_SANDBOX` | `true` تا قبل از پول واقعی |

جریان: درگاه → `GET /payments/callback` (verify سمت سرور) → redirect به وب.

چک‌لیست سندباکس: [`docs/ZARINPAL_SANDBOX.md`](./ZARINPAL_SANDBOX.md).

## آنالیتیکس (اختیاری)

در `apps/web/.env`:

| متغیر | مثال |
| --- | --- |
| `NUXT_PUBLIC_UMAMI_HOST` | `https://analytics.example.com` |
| `NUXT_PUBLIC_UMAMI_WEBSITE_ID` | uuid سایت Umami |
| `NUXT_PUBLIC_GA4_ID` | `G-XXXXXXXX` |

رویدادها: `view_item`، `add_to_cart`، `begin_checkout`، `purchase`، `add_to_compare`.

## ۳) اجرای محلی اپ‌ها

```bat
cd /d C:\Users\a-maghami\Desktop\shop
pnpm dev
```

- وب: http://localhost:3000  
- API: http://localhost:3001  
- پنل: http://localhost:5173  

Compose با profile اپ:

```bat
docker compose --profile app up -d --build
```

(secrets از `.env.docker`؛ نمونه در `.env.docker.example`)

## ۴) E2E وب (Playwright)

API باید روشن باشد (`3001`)، seed شده، `PAYMENT_PROVIDER=mock`.

به‌خاطر فیلتر CDN مرورگر Playwright، پیش‌فرض از **Chrome نصب‌شده روی سیستم** استفاده می‌شود (بدون `playwright install`).

```bat
cd /d C:\Users\a-maghami\Desktop\shop
pnpm install
set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
cd apps\web
pnpm test:e2e
```

اگر فقط Edge دارید:

```bat
cd /d C:\Users\a-maghami\Desktop\shop\apps\web && pnpm test:e2e:edge
```

اگر خود `@playwright/test` از npm هم فیلتر است، registry/mirror جدا لازم است؛ مرورگر را دیگر دانلود نکن.

## ۵) چک‌لیست قبل از پول واقعی

1. migrations + بکاپ restore تست شده  
2. HTTPS / HSTS / CORS / secrets خارج از git  
3. سندباکس زرین‌پال سبز، بعد merchant واقعی — [`ZARINPAL_SANDBOX.md`](./ZARINPAL_SANDBOX.md)  
4. ایمیل SMTP واقعی (نه فقط `MAIL_DRIVER=log`)  
5. سناریوی دستی: خرید، لغو unpaid، استرداد — [`LAUNCH_MANUAL.md`](./LAUNCH_MANUAL.md)  
6. CI سبز، Sentry با DSN  

جزئیات کامل در `Plan.md` بخش Go/No-Go.
