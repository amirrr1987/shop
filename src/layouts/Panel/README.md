# Panel Layout

این لایه اصلی پنل مدیریت است که به کامپوننت‌های مجزا تفکیک شده است.

## ساختار

```
Panel/
├── PanelLayout.vue          # کامپوننت اصلی لایه
└── components/
    ├── index.ts             # Export کامپوننت‌ها
    ├── PanelHeader.vue      # هدر پنل (لوگو، جستجو، نوتیفیکیشن، منوی کاربر)
    ├── PanelSider.vue       # سایدبار (منوی اصلی)
    ├── LayoutContent.vue    # محتوای اصلی (با اسلات)
    └── LayoutTabbar.vue     # تب‌بار (مدیریت تب‌ها)
```

## کامپوننت‌ها

### PanelLayout.vue
کامپوننت اصلی که تمام بخش‌ها را در خود جای داده است.

**استفاده:**
```vue
<template>
  <PanelLayout />
</template>
```

### PanelHeader.vue
هدر پنل شامل:
- لوگو و برند
- جستجو
- دکمه نوتیفیکیشن
- دکمه تمام صفحه
- منوی کاربر (پروفایل، تنظیمات، خروج)

**ویژگی‌ها:**
- Responsive Design
- استفاده کامل از Ant Design tokens
- Hover effects و Transitions

### PanelSider.vue
سایدبار قابل جمع شدن با منوی اصلی.

**ویژگی‌ها:**
- قابلیت Collapse
- عرض قابل تنظیم
- منوی Inline mode

### LayoutContent.vue
محتوای اصلی که از `<slot>` استفاده می‌کند.

**استفاده:**
```vue
<PanelContent>
  <RouterView />
</PanelContent>
```

### LayoutTabbar.vue
تب‌بار برای مدیریت تب‌های باز.

**ویژگی‌ها:**
- تب‌های قابل بستن
- تب اول (داشبورد) غیرقابل بستن
- مدیریت تب فعال

## استانداردها

✅ **Vue 3 Composition API**
- استفاده از `<script setup lang="ts">`
- استفاده از `ref` و `computed`

✅ **Ant Design Vue Tokens**
- تمام رنگ‌ها، فونت‌ها و spacing از tokens

✅ **TailwindCSS**
- استفاده برای layout و utility classes
- عدم استفاده از `@apply`

✅ **Pure CSS**
- استفاده از `v-bind` برای استایل‌های دینامیک
- عدم استفاده از CSS برای display/flex/grid

## مثال استفاده در Router

```typescript
import PanelLayout from '@/layouts/Panel/PanelLayout.vue'

const routes = [
  {
    path: '/panel',
    component: PanelLayout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      // ... other routes
    ],
  },
]
```

## TODO

- [ ] اتصال به API برای اطلاعات کاربر
- [ ] پیاده‌سازی نوتیفیکیشن‌ها
- [ ] اتصال منوی کاربر به روتر
- [ ] پیاده‌سازی Logout
- [ ] ذخیره وضعیت Collapse سایدبار
- [ ] پیاده‌سازی مدیریت تب‌ها با Router
