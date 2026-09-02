import type { NavigationMenuItem } from '@nuxt/ui'

export const mainNavItems: NavigationMenuItem[] = [
  { label: 'خانه', to: '/' },
  {
    label: 'فروشگاه',
    to: '/shop',
    children: [
      { label: 'شبکه ۴ ستونه', to: '/shop' },
      { label: 'شبکه ۳ ستونه', to: '/shop?view=3col' },
      { label: 'لیست محصولات', to: '/shop?view=list' },
      { label: 'با سایدبار چپ', to: '/shop?sidebar=left' },
      { label: 'با سایدبار راست', to: '/shop?sidebar=right' }
    ]
  },
  {
    label: 'محصول',
    to: '/product/sample',
    children: [
      { label: 'محصول ساده', to: '/product/sample' },
      { label: 'محصول متغیر', to: '/product/sample?type=variable' },
      { label: 'محصول گروهی', to: '/product/sample?type=group' },
      { label: 'محصول افیلیت', to: '/product/sample?type=affiliate' },
      { label: 'گالری چپ', to: '/product/sample?gallery=left' },
      { label: 'گالری راست', to: '/product/sample?gallery=right' },
      { label: 'اسلایدر', to: '/product/sample?gallery=slider' },
      { label: 'استیکی چپ', to: '/product/sample?sticky=left' },
      { label: 'استیکی راست', to: '/product/sample?sticky=right' }
    ]
  },
  {
    label: 'وبلاگ',
    to: '/blog',
    children: [
      { label: 'شبکه — سایدبار چپ', to: '/blog?layout=grid&sidebar=left' },
      { label: 'شبکه — سایدبار راست', to: '/blog?layout=grid&sidebar=right' },
      { label: 'لیست — سایدبار چپ', to: '/blog?layout=list&sidebar=left' },
      { label: 'لیست — سایدبار راست', to: '/blog?layout=list&sidebar=right' }
    ]
  },
  { label: 'درباره ما', to: '/about' },
  { label: 'تماس', to: '/contact' }
]

export const categoryNavItems: NavigationMenuItem[] = [
  {
    label: 'الکترونیک',
    children: [
      { label: 'لوازم جانبی', to: '/shop?category=accessories' },
      { label: 'دوربین', to: '/shop?category=camera' },
      { label: 'صوتی و تصویری', to: '/shop?category=av' },
      { label: 'هدفون', to: '/shop?category=headphones' }
    ]
  },
  {
    label: 'کامپیوتر',
    children: [
      { label: 'لپ‌تاپ', to: '/shop?category=laptop' },
      { label: 'مانیتور', to: '/shop?category=monitor' },
      { label: 'لوازم جانبی', to: '/shop?category=pc-accessories' }
    ]
  },
  {
    label: 'موبایل',
    children: [
      { label: 'گوشی هوشمند', to: '/shop?category=smartphone' },
      { label: 'تبلت', to: '/shop?category=tablet' },
      { label: 'لوازم جانبی', to: '/shop?category=mobile-accessories' }
    ]
  },
  {
    label: 'بازی',
    to: '/shop?category=games'
  },
  {
    label: 'ساعت',
    to: '/shop?category=watches'
  }
]

export const footerColumns = [
  {
    label: 'درباره ما',
    children: [
      { label: 'ارسال', to: '#' },
      { label: 'درباره ما', to: '/about' },
      { label: 'پرداخت امن', to: '#' },
      { label: 'تماس', to: '/contact' },
      { label: 'نقشه سایت', to: '#' }
    ]
  },
  {
    label: 'لینک‌های سفارشی',
    children: [
      { label: 'اطلاعیه حقوقی', to: '#' },
      { label: 'کاهش قیمت', to: '/shop?sort=sale' },
      { label: 'محصولات جدید', to: '/shop?sort=new' },
      { label: 'پرفروش‌ترین‌ها', to: '/shop?sort=best' },
      { label: 'ورود', to: '/login' },
      { label: 'حساب من', to: '/account' }
    ]
  }
]

export const settingMenuItems = [
  [{ label: 'حساب من', icon: 'i-lucide-user', to: '/account' }],
  [{ label: 'تسویه حساب', icon: 'i-lucide-credit-card', to: '/checkout' }],
  [{ label: 'ورود', icon: 'i-lucide-log-in', to: '/login' }]
]

// export const currencyOptions = [
//   { label: 'تومان', value: 'IRT' },
//   { label: 'USD $', value: 'USD' },
//   { label: 'EUR €', value: 'EUR' }
// ]

// export const languageOptions = [
//   { label: 'فارسی', value: 'fa' },
//   { label: 'English', value: 'en' }
// ]
