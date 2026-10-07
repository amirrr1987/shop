# تست سندباکس زرین‌پال

هدف: یک خرید واقعی از درگاه سندباکس تا قبل از `PAYMENT_PROVIDER=zarinpal` روی prod.

## پیش‌نیاز

1. Merchant سندباکس از پنل زرین‌پال
2. API و وب لوکال روشن (`3001` / `3000`)
3. در `apps/api/.env`:

```env
PAYMENT_PROVIDER=zarinpal
ZARINPAL_SANDBOX=true
ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PAYMENT_CALLBACK_URL=http://localhost:3001/payments/callback
PAYMENT_RETURN_URL=http://localhost:3000/checkout/callback
```

اگر `PAYMENT_PROVIDER=zarinpal` باشد و merchant خالی بماند، API هنگام بوت خطا می‌دهد.

برای callback از دستگاه دیگر / موبایل، `PAYMENT_CALLBACK_URL` باید از اینترنت به API برسد (مثلاً tunnel).

## سناریوی دستی

1. محصول به سبد → چک‌اوت → ثبت سفارش
2. `POST /payments/orders/:id/start` باید `provider=zarinpal` و `paymentUrl` سندباکس برگرداند
3. در صفحه سندباکس پرداخت را کامل کن (کارت تست زرین‌پال)
4. برگشت به `/payments/callback` → verify سمت سرور → redirect به وب
5. سفارش `paid`، موجودی کم شده، ایمیل تأیید (با `MAIL_DRIVER=log` در لاگ API)
6. اختیاری: استرداد جزئی از پنل و چک ledger

## برگشت به mock

```env
PAYMENT_PROVIDER=mock
```

## تست واحد (بدون شبکه)

```bat
cd /d C:\Users\a-maghami\Desktop\shop && pnpm --filter @shop/api test
```

پوشش: URL سندباکس/پرود، نبود merchant، request/verify موفق و خطای verify.
