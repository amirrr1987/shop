# 🛍️ Frontend Panel Host – فروشگاه

این پروژه یک پنل مدیریت فرانت‌اند برای یک فروشگاه است که با استفاده از [Bun](https://bun.sh) ایجاد شده و ساختار اولیه آن آماده‌سازی شده است. این پروژه با استفاده از تکنولوژی‌های مدرن مانند Vue 3، TypeScript، Vite، UnoCSS و Cypress توسعه داده می‌شود.

---

## 🧱 تکنولوژی‌های استفاده‌شده

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Bun](https://bun.sh) - محیط اجرای سریع جاوااسکریپت
- [UnoCSS](https://github.com/unocss/unocss) - ابزار سبک برای استایل‌دهی
- [Cypress](https://www.cypress.io/) - تست End-to-End
- [Vitest](https://vitest.dev/) - تست یونیت

---

## 🚀 نصب و اجرا

### نصب پکیج‌ها

```bash
bun install
```

### اجرای پروژه

```bash
bun run index.ts
```

---

## 📁 ساختار پروژه

```bash
panel/
├─ host/                     # هسته‌ی اصلی پروژه فرانت‌اند
│  ├─ src/                   # سورس‌کد اصلی
│  │  ├─ assets/            # استایل‌ها و منابع گرافیکی
│  │  ├─ components/        # کامپوننت‌های قابل استفاده مجدد
│  │  ├─ models/            # مدل‌های TypeScript
│  │  ├─ router/            # تنظیمات مسیرها
│  │  ├─ stores/            # مدیریت وضعیت (مثلاً با Pinia)
│  │  ├─ views/             # صفحات اصلی
│  │  ├─ App.vue
│  │  └─ main.ts
│  ├─ cypress/              # تنظیمات و تست‌های Cypress
│  ├─ public/               # فایل‌های عمومی مانند favicon
│  ├─ remotes/              # ماژول‌های راه دور یا Permissionها
│  ├─ config/               # تنظیمات مختلف (در آینده)
│  ├─ index.html
│  └─ vite.config.ts        # پیکربندی Vite
├─ remotes/                 # پروژه‌های ریموت (در آینده)
├─ shared/                  # کامپوننت‌ها یا ابزارهای مشترک (در آینده)
├─ bun.lock
├─ tsconfig.json
└─ README.md
```

---

## 🛠 TODO - مراحل بعدی توسعه

- [ ] طراحی UI اصلی پنل مدیریت
- [ ] پیاده‌سازی احراز هویت
- [ ] اتصال به API بک‌اند
- [ ] افزودن سیستم مجوزها و نقش‌ها
- [ ] تست کامل با Cypress و Vitest

---

## 📄 مجوز

MIT © امیر خان

اگر نیاز داری که بخش‌هایی از این README تخصصی‌تر بشه (مثل نحوه استقرار، راه‌اندازی محیط تست، نحوه اتصال به بک‌اند، یا توضیح درباره معماری پروژه)، خوشحال می‌شم برات گسترش بدم.
