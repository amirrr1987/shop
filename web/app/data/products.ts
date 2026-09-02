import type { Product } from '~/types/shop'

export const products: Product[] = [
  {
    id: '1',
    slug: 'galaxy-s10-edge',
    name: 'سامسونگ گلکسی S10+ Edge',
    brand: 'Samsung',
    category: 'smartphone',
    price: 28900000,
    oldPrice: 32000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p1/400/400',
    hoverImage: 'https://picsum.photos/seed/rozer-p1h/400/400',
    rating: 5,
    badges: ['new'],
    inStock: true,
    description: 'گوشی هوشمند پرچمدار با طراحی جدید و امکانات پیشرفته.',
    longDescription: 'گلکسی S10+ Edge با صفحه‌نمایش منحنی، دوربین سه‌گانه و پردازنده قدرتمند، تجربه‌ای بی‌نظیر از دنیای موبایل ارائه می‌دهد.',
    sizes: ['m'],
    colors: ['black', 'blue'],
    images: [
      'https://picsum.photos/seed/rozer-p1/600/600',
      'https://picsum.photos/seed/rozer-p1b/600/600',
      'https://picsum.photos/seed/rozer-p1c/600/600',
      'https://picsum.photos/seed/rozer-p1d/600/600'
    ],
    features: [
      'صفحه‌نمایش 6.4 اینچ Dynamic AMOLED',
      'دوربین سه‌گانه 12 مگاپیکسل',
      'باتری 4100mAh با شارژ سریع',
      'مقاوم در برابر آب و گردوغبار IP68'
    ],
    specs: [
      { label: 'وزن', value: '175 گرم' },
      { label: 'ابعاد', value: '157.6 × 74.1 × 7.8 میلی‌متر' },
      { label: 'حافظه', value: '128GB / 8GB RAM' },
      { label: 'سیستم‌عامل', value: 'Android 12' }
    ],
    variants: [
      { id: 'v1', label: '128GB مشکی', price: 28900000, options: { storage: '128GB', color: 'black' } },
      { id: 'v2', label: '256GB آبی', price: 32000000, options: { storage: '256GB', color: 'blue' } },
      { id: 'v3', label: '512GB سفید', price: 36500000, options: { storage: '512GB', color: 'white' } }
    ],
    groupItems: ['3', '4'],
    affiliateUrl: 'https://example.com/buy/galaxy-s10',
    reviewCount: 2
  },
  {
    id: '2',
    slug: 'new-balance-arishi',
    name: 'New Balance Arishi Sport v1',
    brand: 'Studio Design',
    category: 'accessories',
    price: 1890000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p2/400/400',
    hoverImage: 'https://picsum.photos/seed/rozer-p2h/400/400',
    rating: 5,
    badges: ['new'],
    inStock: true,
    description: 'کفش ورزشی سبک و راحت برای استفاده روزمره.',
    sizes: ['m', 'l', 'xl'],
    colors: ['gray', 'black']
  },
  {
    id: '3',
    slug: 'bluetooth-gamepad',
    name: 'Bluetooth Gamepad IPEGA PG-9023',
    brand: 'IPEGA',
    category: 'games',
    price: 1250000,
    oldPrice: 1500000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p3/400/400',
    rating: 4,
    badges: ['sale'],
    inStock: true,
    description: 'دسته بازی بلوتوثی با اتصال پایدار و طراحی ارگونومیک.',
    sizes: ['m'],
    colors: ['black', 'blue']
  },
  {
    id: '4',
    slug: 'wireless-headphones',
    name: 'هدفون بی‌سیم Sony WH-1000XM5',
    brand: 'Sony',
    category: 'headphones',
    price: 18500000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p4/400/400',
    hoverImage: 'https://picsum.photos/seed/rozer-p4h/400/400',
    rating: 5,
    badges: ['hot'],
    inStock: true,
    description: 'هدفون بی‌سیم با نویز کنسلینگ و کیفیت صدای استثنایی.',
    sizes: ['m'],
    colors: ['black', 'brown']
  },
  {
    id: '5',
    slug: 'smart-watch',
    name: 'ساعت هوشمند Apple Watch Series 9',
    brand: 'Apple',
    category: 'watches',
    price: 22000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p5/400/400',
    rating: 5,
    inStock: true,
    description: 'ساعت هوشمند با قابلیت‌های سلامتی و اتصال کامل به آیفون.',
    sizes: ['m', 'l'],
    colors: ['black', 'gray']
  },
  {
    id: '6',
    slug: '4k-camera',
    name: 'دوربین Sony Alpha A7 IV',
    brand: 'Sony',
    category: 'camera',
    price: 95000000,
    oldPrice: 98000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p6/400/400',
    rating: 4,
    badges: ['sale'],
    inStock: true,
    description: 'دوربین حرفه‌ای با سنسور فول‌فریم و فیلم‌برداری 4K.',
    sizes: ['l'],
    colors: ['black']
  },
  {
    id: '7',
    slug: 'gaming-laptop',
    name: 'لپ‌تاپ گیمینگ ASUS ROG Strix',
    brand: 'ASUS',
    category: 'laptop',
    price: 78000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p7/400/400',
    rating: 5,
    badges: ['new', 'hot'],
    inStock: true,
    description: 'لپ‌تاپ گیمینگ با پردازنده قدرتمند و کارت گرافیک اختصاصی.',
    sizes: ['l', 'xl'],
    colors: ['black', 'blue']
  },
  {
    id: '8',
    slug: 'smart-tv',
    name: 'تلویزیون هوشمند LG OLED 55"',
    brand: 'LG',
    category: 'av',
    price: 52000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p8/400/400',
    rating: 4,
    inStock: true,
    description: 'تلویزیون OLED با تصویر فوق‌العاده و پشتیبانی HDR.',
    sizes: ['xl'],
    colors: ['black', 'gray']
  },
  {
    id: '9',
    slug: 'mechanical-keyboard',
    name: 'کیبورد مکانیکی Keychron K2',
    brand: 'Keychron',
    category: 'accessories',
    price: 4500000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p9/400/400',
    rating: 4,
    badges: ['new'],
    inStock: true,
    description: 'کیبورد مکانیکی بی‌سیم با سوئیچ‌های قابل تعویض.',
    sizes: ['m'],
    colors: ['gray', 'brown']
  },
  {
    id: '10',
    slug: 'gaming-mouse',
    name: 'ماوس گیمینگ Logitech G502',
    brand: 'Logitech',
    category: 'games',
    price: 3200000,
    oldPrice: 3800000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p10/400/400',
    rating: 5,
    badges: ['sale'],
    inStock: true,
    description: 'ماوس گیمینگ با سنسور دقیق و دکمه‌های قابل برنامه‌ریزی.',
    sizes: ['m'],
    colors: ['black']
  },
  {
    id: '11',
    slug: 'tablet-pro',
    name: 'تبلت Samsung Galaxy Tab S9',
    brand: 'Samsung',
    category: 'smartphone',
    price: 24000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p11/400/400',
    rating: 4,
    inStock: true,
    description: 'تبلت حرفه‌ای با صفحه‌نمایش AMOLED و قلم S Pen.',
    sizes: ['l'],
    colors: ['gray', 'black']
  },
  {
    id: '12',
    slug: 'portable-speaker',
    name: 'اسپیکر JBL Flip 6',
    brand: 'JBL',
    category: 'headphones',
    price: 6800000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p12/400/400',
    rating: 4,
    badges: ['hot'],
    inStock: true,
    description: 'اسپیکر قابل حمل ضدآب با باس قدرتمند.',
    sizes: ['m'],
    colors: ['blue', 'black']
  },
  {
    id: '13',
    slug: 'monitor-4k',
    name: 'مانیتور 4K Dell UltraSharp 27',
    brand: 'Dell',
    category: 'laptop',
    price: 16000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p13/400/400',
    rating: 5,
    inStock: false,
    description: 'مانیتور 4K با پوشش 99% sRGB برای طراحی.',
    sizes: ['l', 'xl'],
    colors: ['black', 'gray']
  },
  {
    id: '14',
    slug: 'vr-headset',
    name: 'هدست VR Meta Quest 3',
    brand: 'Meta',
    category: 'games',
    price: 28000000,
    oldPrice: 30000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p14/400/400',
    rating: 5,
    badges: ['new', 'sale'],
    inStock: true,
    description: 'هدست واقعیت مجازی با رزولوشن بالا و کنترلرهای دقیق.',
    sizes: ['m', 'l'],
    colors: ['gray']
  },
  {
    id: '15',
    slug: 'drone-mini',
    name: 'پهپاد DJI Mini 4 Pro',
    brand: 'DJI',
    category: 'camera',
    price: 42000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p15/400/400',
    rating: 5,
    badges: ['hot'],
    inStock: true,
    description: 'پهپاد سبک با دوربین 4K و فلایت تایم طولانی.',
    sizes: ['m'],
    colors: ['gray', 'black']
  },
  {
    id: '16',
    slug: 'smart-home-hub',
    name: 'هاب خانه هوشمند Google Nest Hub',
    brand: 'Google',
    category: 'accessories',
    price: 5500000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p16/400/400',
    rating: 4,
    inStock: true,
    description: 'نمایشگر هوشمند با دستیار صوتی و کنترل IoT.',
    sizes: ['m'],
    colors: ['gray', 'brown']
  },
  {
    id: '17',
    slug: 'action-camera',
    name: 'دوربین GoPro Hero 12',
    brand: 'GoPro',
    category: 'camera',
    price: 19000000,
    oldPrice: 21000000,
    currency: 'IRT',
    image: 'https://picsum.photos/seed/rozer-p17/400/400',
    rating: 5,
    badges: ['sale'],
    inStock: true,
    description: 'دوربین اکشن ضدآب با تثبیت‌کننده HyperSmooth.',
    sizes: ['m'],
    colors: ['black', 'blue']
  }
]

export function getProductBySlug(slug: string) {
  let normalized = slug.trim().replace(/\/+$/, '')
  try {
    normalized = decodeURIComponent(normalized)
  } catch {
    // keep raw slug when decode fails
  }
  if (!normalized) return undefined
  if (normalized === 'sample') return products[0]
  return products.find(p => p.slug === normalized)
}

export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category)
}

export function formatPrice(price: number, currency = 'IRT') {
  if (currency === 'IRT') {
    return `${price.toLocaleString('fa-IR')} تومان`
  }
  return `$${price.toLocaleString('en-US')}`
}
