# سناریوی دستی Go / No-Go (با `PAYMENT_PROVIDER=mock`)

هدف: قبل از پول واقعی، سه مسیر حیاتی را یک‌بار روی staging/لوکال سبز کنید.  
سندباکس زرین‌پال جداست: [`ZARINPAL_SANDBOX.md`](./ZARINPAL_SANDBOX.md).

## پیش‌نیاز

- Postgres روشن، API روی `3001`، وب `3000`، پنل `5173`
- `PAYMENT_PROVIDER=mock`
- `PAYMENT_CALLBACK_URL=http://localhost:3001/payments/callback`
- `PAYMENT_RETURN_URL=http://localhost:3000/checkout/callback`
- `MAIL_DRIVER=log` (تأیید ایمیل در لاگ API)
- موجودی محصول seed کافی

سلامت:

```bat
curl -s http://127.0.0.1:3001/health
```

---

## A) خرید کامل (callback API)

1. در وب: محصول → سبد → چک‌اوت → ثبت سفارش  
2. پرداخت mock را شروع کنید؛ باید به  
   `http://localhost:3001/payments/callback?Authority=MOCK-...&Status=OK`  
   بروید و بعد به `/checkout/callback` برگردید  
3. چک‌ها:
   - سفارش `paid`
   - موجودی کم شده
   - در لاگ API خط ایمیل تأیید (یا SMTP واقعی)
   - در پنل: جزئیات سفارش + در صورت نیاز تراکنش‌های پرداخت

تکرار `start` روی همان سفارش unpaid باید همان `authority` را reuse کند (idempotent).

---

## B) لغو unpaid و برگشت موجودی

1. موقتاً در `apps/api/.env`:

```env
ORDER_UNPAID_TTL_MINUTES=1
```

API را ری‌استارت کنید؛ لاگ باید چیزی شبیه  
`Unpaid order cleanup every 60s (ttl=1m)` نشان دهد.

2. سفارش جدید بسازید ولی **پرداخت نکنید**؛ موجودی قبل را یادداشت کنید  
3. بیش از ۱ دقیقه صبر کنید (حداکثر حدود ۲ دقیقه تا جاب بعدی)  
4. چک‌ها:
   - سفارش `cancelled` / دیگر pending unpaid نیست
   - موجودی به حالت قبل برگشته
   - در لاگ: `Expired unpaid order cancelled`

بعد از تست TTL را به مقدار staging برگردانید (مثلاً `120`).

---

## C) استرداد paid (جزئی یا کامل)

1. یک سفارش `paid` از سناریو A داشته باشید  
2. در پنل (نقش **admin**): سفارش → استرداد  
   - مبلغ خالی = کامل؛ یا مبلغ جزئی به ریال  
3. چک‌ها:
   - `refundedAmount` و در استرداد کامل `paymentStatus=refunded`
   - موجودی برای استرداد کامل برمی‌گردد
   - audit: `payment.refund`

---

## D) ادمین prod (یادآوری)

- `ADMIN_SEED_PASSWORD` قوی و یکتا؛ فقط در secrets خارج از git  
- نقش staff برای کار روزانه؛ admin محدود  
- Swagger در prod بسته (`SWAGGER_ENABLED` پیش‌فرض off)

---

## بعد از سبز شدن A–C

در `Plan.md` آیتم‌های Go/No-Go ۹ (و در صورت انجام D، آیتم ۱۰) را تیک بزنید.  
سپس سندباکس زرین‌پال؛ فقط بعد از آن `PAYMENT_PROVIDER=zarinpal` روی prod.
