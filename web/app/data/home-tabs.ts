import { products } from '~/data/products'

export const homeCategoryTabSections = [
  {
    id: 'smart-electronics',
    title: 'الکترونیک هوشمند',
    banner: 'https://picsum.photos/seed/rozer-tab-banner1/500/400',
    bannerTo: '/shop?category=accessories',
    tabs: [
      { label: 'خانه هوشمند', slot: 'smart-home' as const, category: 'accessories' },
      { label: 'کنترل از راه دور', slot: 'remote' as const, category: 'accessories' },
      { label: 'ساعت هوشمند', slot: 'watches' as const, category: 'watches' }
    ]
  },
  {
    id: 'gaming',
    title: 'بازی و سرگرمی',
    banner: 'https://picsum.photos/seed/rozer-tab-banner2/500/400',
    bannerTo: '/shop?category=games',
    tabs: [
      { label: 'کنسول و دستگاه', slot: 'console' as const, category: 'games' },
      { label: 'لوازم جانبی', slot: 'gaming-acc' as const, category: 'accessories' },
      { label: 'هدست گیمینگ', slot: 'gaming-audio' as const, category: 'headphones' }
    ]
  }
]

export const homeFeatureTabs = [
  {
    label: 'جدیدترین',
    slot: 'new' as const,
    icon: 'i-lucide-sparkles'
  },
  {
    label: 'پرفروش‌ترین',
    slot: 'best' as const,
    icon: 'i-lucide-trending-up'
  },
  {
    label: 'ویژه',
    slot: 'featured' as const,
    icon: 'i-lucide-star'
  }
]

export function getProductsForHomeTab(category?: string, limit = 6) {
  if (!category) return products.slice(0, limit)
  const filtered = products.filter(p => p.category === category)
  return (filtered.length ? filtered : products).slice(0, limit)
}

export function getFeatureTabProducts(type: 'new' | 'best' | 'featured') {
  if (type === 'new') {
    return products.filter(p => p.badges?.includes('new')).slice(0, 8)
  }
  if (type === 'best') {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
  }
  return products.filter(p => p.badges?.includes('hot') || p.badges?.includes('sale')).slice(0, 8)
}

export const homeVersions = [
  { label: 'خانه ۱ — کلاسیک', value: '1', description: 'index.html' },
  { label: 'خانه ۲ — تب دسته‌بندی', value: '2', description: 'index-2.html' },
  { label: 'خانه ۳ — دسته‌بندی اول', value: '3', description: 'index-3.html' },
  { label: 'خانه ۴ — تب محصولات', value: '4', description: 'index-4.html' }
]
