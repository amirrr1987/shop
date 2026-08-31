# راهاندازی Shop

همه تنظیمات فقط در **یک فایل** در ریشه پروژه:

```cmd
copy .env.example .env
```

## الگوی نام‌گذاری

```
SHOP_<سرویس>_<ویژگی>
```

| پیشوند | معنی | مثال |
|--------|------|------|
| `SHOP_WEB_*` | فروشگاه Nuxt | `SHOP_WEB_PORT=3000` |
| `SHOP_PANEL_*` | پنل Vite | `SHOP_PANEL_PORT=3001` |
| `SHOP_API_*` | API NestJS | `SHOP_API_PORT=3002` |
| `SHOP_PGADMIN_*` | pgAdmin | `SHOP_PGADMIN_PORT=3003` |
| `SHOP_DB_*` | PostgreSQL (host) | `SHOP_DB_PORT=3004` |
| `SHOP_REDIS_*` | Redis | `SHOP_REDIS_HOST`, `SHOP_REDIS_PORT` |
| `SHOP_ADMIN_*` | اکانت seed ادمین | `SHOP_ADMIN_USER`, `SHOP_ADMIN_PASS` |
| `SHOP_PUBLIC_HOST` | IP یا دامنه عمومی | `localhost` یا `82.39.165.115` |

## لوکال (Docker)

| سرویس | آدرس |
|--------|------|
| فروشگاه (web) | http://localhost:3000 |
| پنل | http://localhost:3001 |
| API Health | http://localhost:3002/health |
| Swagger | http://localhost:3002/api/docs |
| pgAdmin | http://localhost:3003 |
| Postgres (host) | `localhost:3004` |
| Redis | `localhost:6380` |

ورود pgAdmin:
- Email: `shop_pgadmin_admin@example.com`
- Password: مقدار `SHOP_PGADMIN_PASS` در `.env`

اتصال به Postgres داخل pgAdmin:
- Host: `postgres` (از داخل Docker، پورت `5432`) یا `localhost` و پورت `3004` (از ویندوز)
- Database: `shop_db`
- Username: `shop_db_admin`
- Password: مقدار `SHOP_DB_PASS` در `.env`

```cmd
cd /d "C:\Users\Amir\Desktop\rozer-html-template-main-2.0.3\Theme\shop"
docker compose up -d --build
```

## لوکال (بدون Docker)

```cmd
pnpm dev:api
pnpm dev:web
pnpm dev:panel
```

هر سرویس از همان `.env` ریشه می‌خواند.

## VPS (82.39.165.115)

```cmd
copy .env.vps.example .env
```

سپس در `.env` مقدارهای `SHOP_*_PASS` و `SHOP_JWT_SECRET` را قوی کنید و:

```cmd
docker compose up -d --build
```

آدرس‌ها:

| سرویس | آدرس |
|--------|------|
| فروشگاه | http://82.39.165.115:3000 |
| پنل | http://82.39.165.115:3001 |
| API | http://82.39.165.115:3002 |
| pgAdmin | http://82.39.165.115:3003 |
| Postgres (host) | `82.39.165.115:3004` |

> اگر پشت Nginx فقط پورت 80 باز است، `SHOP_*_URL` و `SHOP_CORS_ORIGINS` را مطابق reverse proxy تنظیم کنید.

## Bruno

- GUI: env `local` → `baseUrl` = مقدار `SHOP_API_URL`
- CLI: `docker compose --profile bruno run --rm bruno`

## خاموش کردن

```cmd
docker compose down
```
