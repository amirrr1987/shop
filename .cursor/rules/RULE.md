---
description: 'استانداردهای توسعه Vue 3 برای پنل مدیریت - استفاده از Composition API، Pinia، Ant Design Vue و TailwindCSS'
alwaysApply: true
globs:
  - '**/*.vue'
  - '**/*.ts'
  - '**/composable/**'
  - '**/stores/**'
---

# استانداردهای توسعه پنل مدیریت

این قانون استانداردهای توسعه برای پروژه پنل مدیریت را تعریف می‌کند.

## Vue 3 و Composition API

- همیشه از **Vue 3** و **Composition API** استفاده کن
- از `<script setup lang="ts">` برای تمام کامپوننت‌های Vue استفاده کن
- **هرگز** از Options API استفاده نکن

مثال صحیح:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

## مدیریت وضعیت

- از **Pinia** برای مدیریت وضعیت استفاده کن
- Store ها را در پوشه `src/stores` قرار بده
- از composable به جای mixin استفاده کن

## ساختار پروژه

- ساختار فعلی پوشه‌ها را رعایت کن
- فایل‌های composable را در `src/composable` قرار بده
- کامپوننت‌ها را در `src/components` قرار بده

## کتابخانه‌ها و وابستگی‌ها

- **عدم اضافه کردن لایبرری جدید بدون تأیید**
- قبل از اضافه کردن هر وابستگی جدید، از تیم تأیید بگیر

## کامپوننت‌های UI

- اولویت استفاده از کامپوننت‌های اصلی **Ant Design Vue (antdv)** در پروژه
- از کامپوننت‌های سفارشی فقط در صورت نیاز استفاده کن

## استایل‌دهی

- برای استایل‌دهی، ابتدا از **antdv tokens** استفاده کن
- در صورت نیاز تکمیلی یا سفارشی از **TailwindCSS** بهره بگیر
- ترتیب اولویت: antdv tokens → TailwindCSS → استایل‌های سفارشی
