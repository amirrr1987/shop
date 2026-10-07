---
name: shop-stack
description: Map of the shop monorepo — apps, money, payments, guest orders. Use when unsure where code lives or how money/payments work.
---

# Shop stack

Monorepo (`pnpm` + Turborepo):

| Path | Role | Dev |
|------|------|-----|
| `apps/web` | Nuxt storefront | :3000 |
| `apps/api` | Nest API | :3001 |
| `apps/panel` | Vue admin (antdv) | :5173 |
| `packages/shared` | Shared Zod/types | build before API if types change |

## Invariants
- Currency base: **rial**.
- Payment callback hits **API**, not Nuxt directly.
- Guest checkout: order access via `guestToken`.
- Postgres + Redis via Docker Compose; API env from `apps/api/.env.example`.

## Where to look
- Orders/payments: `apps/api/src/orders`, `apps/api/src/payments`
- Catalog: `apps/api/src/products`, `categories`
- Storefront pages: `apps/web/app/pages`
- Admin views: `apps/panel/src/views`

Open only the paths needed for the task.
