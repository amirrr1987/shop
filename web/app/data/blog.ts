export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string[]
  quote?: string
  image: string
  images?: string[]
  author: string
  date: string
  category: string
  tags: string[]
  comments: number
}

export const blogCategories = [
  { label: 'الکترونیک', value: 'electronics', count: 4 },
  { label: 'گیمینگ', value: 'gaming', count: 3 },
  { label: 'راهنما', value: 'guide', count: 2 },
  { label: 'اخبار', value: 'news', count: 3 }
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'galaxy-s10-review',
    title: 'بررسی کامل سامسونگ گلکسی S10+ Edge',
    excerpt: 'نگاهی عمیق به پرچمدار جدید سامسونگ و امکانات آن.',
    content: [
      'گلکسی S10+ Edge با طراحی منحنی و صفحه‌نمایش Dynamic AMOLED، یکی از جذاب‌ترین گوشی‌های سال است. کیفیت ساخت، دوربین و عملکرد کلی در سطح بسیار بالایی قرار دارد.',
      'در تست‌های ما، عمر باتری و سرعت شارژ عملکرد خوبی داشت. پردازنده Exynos در بازی‌ها و اپلیکیشن‌های سنگین بدون لگ اجرا می‌شود.',
      'اگر به دنبال گوشی پرچمدار با صفحه‌نمایش بزرگ هستید، S10+ Edge انتخابی عالی است.'
    ],
    quote: 'S10+ Edge تعادل خوبی بین طراحی، عملکرد و قیمت ارائه می‌دهد.',
    image: 'https://picsum.photos/seed/blog1/800/500',
    author: 'مدیر',
    date: '2024-04-24',
    category: 'electronics',
    tags: ['سامسونگ', 'موبایل', 'بررسی'],
    comments: 2
  },
  {
    slug: 'best-gaming-headsets',
    title: 'بهترین هدست‌های گیمینگ ۲۰۲۴',
    excerpt: 'مقایسه هدست‌های برتر برای گیمرها.',
    content: [
      'انتخاب هدست مناسب برای گیمینگ تأثیر زیادی روی تجربه بازی دارد. در این مطلب چند مدل برتر را بررسی می‌کنیم.',
      'Sony WH-1000XM5 برای بازی‌های story-driven و JBL برای موبایل گزینه‌های مناسبی هستند.',
      'قبل از خرید به نوع اتصال، میکروفون و راحتی گوشواره توجه کنید.'
    ],
    image: 'https://picsum.photos/seed/blog2/800/500',
    images: [
      'https://picsum.photos/seed/blog2a/800/500',
      'https://picsum.photos/seed/blog2b/800/500'
    ],
    author: 'تیم فنی',
    date: '2024-04-20',
    category: 'gaming',
    tags: ['هدفون', 'گیمینگ', 'راهنما'],
    comments: 5
  },
  {
    slug: 'smart-home-guide',
    title: 'راهنمای شروع خانه هوشمند',
    excerpt: 'از کجا شروع کنیم و چه دستگاه‌هایی بخریم؟',
    content: [
      'خانه هوشمند با دستگاه‌های ساده مثل چراغ، پریز و ترموستات هوشمند شروع می‌شود.',
      'Google Nest Hub و ساعت‌های هوشمند می‌توانند مرکز کنترل خوبی باشند.',
      'امنیت شبکه Wi-Fi و به‌روزرسانی firmware را فراموش نکنید.'
    ],
    image: 'https://picsum.photos/seed/blog3/800/500',
    author: 'مدیر',
    date: '2024-04-15',
    category: 'guide',
    tags: ['IoT', 'خانه هوشمند', 'راهنما'],
    comments: 3
  },
  {
    slug: 'laptop-buying-tips',
    title: 'نکات مهم خرید لپ‌تاپ',
    excerpt: 'چطور لپ‌تاپ مناسب نیاز خود را انتخاب کنیم.',
    content: [
      'قبل از خرید لپ‌تاپ، کاربری اصلی خود را مشخص کنید: اداری، طراحی یا گیمینگ.',
      'RAM و SSD مهم‌ترین فاکتورهای تجربه روزمره هستند.',
      'برای گیمینگ به کارت گرافیک اختصاصی و سیستم خنک‌کننده قوی نیاز دارید.'
    ],
    image: 'https://picsum.photos/seed/blog4/800/500',
    author: 'تیم فروش',
    date: '2024-04-10',
    category: 'guide',
    tags: ['لپ‌تاپ', 'راهنما', 'خرید'],
    comments: 1
  },
  {
    slug: 'new-apple-watch',
    title: 'معرفی Apple Watch Series 9',
    excerpt: 'جدیدترین ساعت هوشمند اپل چه ویژگی‌هایی دارد؟',
    content: [
      'Series 9 با پردازنده S9 و صفحه‌نمایش روشن‌تر عرضه شده است.',
      'قابلیت‌های سلامتی و تشخیص سقوط همچنان از نقاط قوت این سری هستند.',
      'برای کاربران iPhone تجربه یکپارچه‌ای ارائه می‌دهد.'
    ],
    image: 'https://picsum.photos/seed/blog5/800/500',
    author: 'مدیر',
    date: '2024-04-05',
    category: 'news',
    tags: ['اپل', 'ساعت', 'اخبار'],
    comments: 4
  },
  {
    slug: 'camera-drone-comparison',
    title: 'مقایسه پهپادهای DJI Mini',
    excerpt: 'Mini 3 Pro در برابر Mini 4 Pro.',
    content: [
      'هر دو مدل برای فیلمبرداری سبک و سفر مناسب هستند.',
      'Mini 4 Pro رزولوشن بالاتر و فلایت تایم بهتری دارد.',
      'برای مبتدی‌ها Mini 3 Pro هنوز گزینه اقتصادی‌تری است.'
    ],
    image: 'https://picsum.photos/seed/blog6/800/500',
    author: 'تیم فنی',
    date: '2024-03-28',
    category: 'electronics',
    tags: ['پهپاد', 'دوربین', 'DJI'],
    comments: 2
  }
]

export const recentPosts = blogPosts.slice(0, 4)

export function getBlogPost(slug: string) {
  return blogPosts.find(p => p.slug === slug)
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter(p => p.category === category)
}
