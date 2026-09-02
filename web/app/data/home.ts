import type { PromoBanner, ServiceFeature, SlideItem } from '~/types/shop'

export const heroSlides: SlideItem[] = [
  {
    id: '1',
    subtitle: 'طراحی جدید',
    title: 'سامسونگ گلکسی',
    highlight: 'S10+ Edge',
    image: 'https://picsum.photos/seed/rozer-slide1/1400/500',
    to: '/shop'
  },
  {
    id: '2',
    subtitle: 'گیمینگ بی‌سیم بلوتوث',
    title: 'Bluetooth Gamepad',
    highlight: 'IPEGA PG-9023',
    image: 'https://picsum.photos/seed/rozer-slide2/1400/500',
    to: '/shop?category=games'
  }
]

export const serviceFeatures: ServiceFeature[] = [
  {
    icon: 'i-lucide-truck',
    title: 'ارسال رایگان',
    description: 'برای سفارش‌های بالای ۷۵ دلار'
  },
  {
    icon: 'i-lucide-rotate-ccw',
    title: 'مرجوعی رایگان',
    description: 'تا ۹ روز پس از خرید'
  },
  {
    icon: 'i-lucide-headphones',
    title: 'پشتیبانی ۲۴/۷',
    description: 'تماس در هر ساعت از شبانه‌روز'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'پرداخت امن',
    description: 'اطلاعات پرداخت شما محفوظ است'
  }
]

export const promoBanners: PromoBanner[] = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/rozer-banner1/600/300',
    to: '/shop',
    alt: 'بنر تبلیغاتی ۱'
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/rozer-banner2/600/300',
    to: '/shop?category=headphones',
    alt: 'بنر تبلیغاتی ۲'
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/rozer-banner3/600/300',
    to: '/shop?category=games',
    alt: 'بنر تبلیغاتی ۳'
  }
]
