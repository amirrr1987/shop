export type TrustFeature = {
  icon: string
  title: string
  description: string
  to?: string
}

export const trustFeatures: TrustFeature[] = [
  {
    icon: 'i-lucide-truck',
    title: 'ارسال سریع',
    description: 'روش و زمان تحویل در چک‌اوت مشخص می‌شود.',
    to: '/shipping',
  },
  {
    icon: 'i-lucide-undo-2',
    title: 'مرجوعی آسان',
    description: 'طبق شرایط مرجوعی فروشگاه درخواست دهید.',
    to: '/returns',
  },
  {
    icon: 'i-lucide-headset',
    title: 'پشتیبانی پاسخ‌گو',
    description: 'از صفحه تماس یا تلفن پشتیبانی کمک بگیرید.',
    to: '/contact',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'پرداخت امن',
    description: 'پرداخت از طریق درگاه امن انجام می‌شود.',
    to: '/faq',
  },
]
