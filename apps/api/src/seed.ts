import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { AppModule } from './app.module.js';
import { Category } from './categories/category.entity.js';
import { CouponEntity } from './coupons/coupon.entity.js';
import { Product } from './products/product.entity.js';
import { ShippingMethodEntity } from './shipping/shipping-method.entity.js';
import { UsersService } from './users/users.service.js';

/** All money below is in rials (1 toman = 10 rials). */

const categoriesSeed = [
  { name: 'الکترونیک', slug: 'electronics', parentId: null },
  { name: 'پوشاک', slug: 'clothing', parentId: null },
  { name: 'خانه و آشپزخانه', slug: 'home', parentId: null },
  { name: 'زیبایی و سلامت', slug: 'beauty', parentId: null },
  { name: 'ورزش و سفر', slug: 'sports', parentId: null },
  { name: 'کتاب و لوازم تحریر', slug: 'books', parentId: null },
] as const;

type ProductSeed = {
  name: string;
  slug: string;
  description: string;
  /** Rials */
  price: number;
  stock: number;
  categorySlug: (typeof categoriesSeed)[number]['slug'];
  imageSeed: string;
  isFeatured?: boolean;
  isActive?: boolean;
};

const productsSeed: ProductSeed[] = [
  // electronics (12)
  {
    name: 'هدفون بی‌سیم',
    slug: 'wireless-earbuds',
    description: 'هدفون جمع‌وجور با صدای شفاف، میکروفون نویزگیر و کیس شارژ.',
    price: 12_500_000,
    stock: 25,
    categorySlug: 'electronics',
    imageSeed: 'earbuds',
    isFeatured: true,
  },
  {
    name: 'هاب USB-C هفت‌پورت',
    slug: 'usb-c-hub',
    description: 'هاب USB-C با HDMI، کارت‌خوان و سه پورت USB-A برای لپ‌تاپ.',
    price: 8_900_000,
    stock: 40,
    categorySlug: 'electronics',
    imageSeed: 'hub',
  },
  {
    name: 'ماوس بی‌سیم ارگونومیک',
    slug: 'wireless-mouse',
    description: 'ماوس بی‌سیم با باتری ماندگار و طراحی مناسب دست راست.',
    price: 3_450_000,
    stock: 55,
    categorySlug: 'electronics',
    imageSeed: 'mouse',
  },
  {
    name: 'کیبورد مکانیکال',
    slug: 'mechanical-keyboard',
    description: 'کیبورد مکانیکال با سوییچ آبی و نور پس‌زمینه سفید.',
    price: 18_700_000,
    stock: 18,
    categorySlug: 'electronics',
    imageSeed: 'keyboard',
    isFeatured: true,
  },
  {
    name: 'پاوربانک ۲۰۰۰۰',
    slug: 'power-bank-20k',
    description: 'پاوربانک ۲۰۰۰۰ میلی‌آمپر با شارژ سریع دو پورت.',
    price: 6_800_000,
    stock: 48,
    categorySlug: 'electronics',
    imageSeed: 'powerbank',
  },
  {
    name: 'ساعت هوشمند اسپرت',
    slug: 'smart-watch-sport',
    description: 'ساعت هوشمند با مانیتور ضربان، GPS و مقاومت در برابر آب.',
    price: 22_900_000,
    stock: 15,
    categorySlug: 'electronics',
    imageSeed: 'smartwatch',
    isFeatured: true,
  },
  {
    name: 'اسپیکر بلوتوث پرتابل',
    slug: 'bluetooth-speaker',
    description: 'اسپیکر بلوتوث با صدای بلند، باتری ۱۲ ساعته و ضدآب.',
    price: 9_500_000,
    stock: 30,
    categorySlug: 'electronics',
    imageSeed: 'speaker',
  },
  {
    name: 'وب‌کم Full HD',
    slug: 'webcam-fhd',
    description: 'وب‌کم ۱۰۸۰p با میکروفون داخلی برای جلسات آنلاین.',
    price: 7_100_000,
    stock: 22,
    categorySlug: 'electronics',
    imageSeed: 'webcam',
  },
  {
    name: 'هارد اکسترنال ۱ ترابایت',
    slug: 'hdd-1tb',
    description: 'هارد اکسترنال USB 3.2 با ظرفیت ۱ ترابایت.',
    price: 11_200_000,
    stock: 35,
    categorySlug: 'electronics',
    imageSeed: 'hdd',
  },
  {
    name: 'کابل HDMI ۲ متری',
    slug: 'hdmi-cable-2m',
    description: 'کابل HDMI 2.0 پشتیبانی از 4K، طول ۲ متر.',
    price: 890_000,
    stock: 120,
    categorySlug: 'electronics',
    imageSeed: 'hdmi',
  },
  {
    name: 'شارژر دیواری ۶۵ وات',
    slug: 'gan-charger-65w',
    description: 'شارژر GaN ۶۵ وات با دو پورت USB-C مناسب لپ‌تاپ و گوشی.',
    price: 4_950_000,
    stock: 42,
    categorySlug: 'electronics',
    imageSeed: 'charger',
  },
  {
    name: 'استند لپ‌تاپ آلومینیومی',
    slug: 'laptop-stand',
    description: 'استند آلومینیومی قابل تنظیم برای لپ‌تاپ ۱۳ تا ۱۶ اینچ.',
    price: 2_750_000,
    stock: 38,
    categorySlug: 'electronics',
    imageSeed: 'laptopstand',
  },

  // clothing (10)
  {
    name: 'پیراهن لینن',
    slug: 'linen-shirt',
    description: 'پیراهن لینن خنک برای روزهای گرم، برش راحت.',
    price: 7_200_000,
    stock: 18,
    categorySlug: 'clothing',
    imageSeed: 'shirt',
    isFeatured: true,
  },
  {
    name: 'کت جین کلاسیک',
    slug: 'denim-jacket',
    description: 'کت جین کلاسیک با دوخت محکم و جیب داخلی.',
    price: 14_800_000,
    stock: 12,
    categorySlug: 'clothing',
    imageSeed: 'jacket',
    isFeatured: true,
  },
  {
    name: 'تی‌شرت نخی ساده',
    slug: 'cotton-tee',
    description: 'تی‌شرت ۱۰۰٪ پنبه با دوخت دوبل یقه.',
    price: 1_950_000,
    stock: 80,
    categorySlug: 'clothing',
    imageSeed: 'tee',
  },
  {
    name: 'هودی زمستانی',
    slug: 'winter-hoodie',
    description: 'هودی ضخیم با کلاه و جیب جلو، مناسب پاییز و زمستان.',
    price: 5_600_000,
    stock: 28,
    categorySlug: 'clothing',
    imageSeed: 'hoodie',
  },
  {
    name: 'شلوار جین اسلیم',
    slug: 'slim-jeans',
    description: 'شلوار جین اسلیم با کشسانی ملایم.',
    price: 8_400_000,
    stock: 24,
    categorySlug: 'clothing',
    imageSeed: 'jeans',
  },
  {
    name: 'کفش اسپرت روزمره',
    slug: 'casual-sneakers',
    description: 'کفش اسپرت سبک با کفی راحت برای پیاده‌روی روزانه.',
    price: 9_900_000,
    stock: 20,
    categorySlug: 'clothing',
    imageSeed: 'sneakers',
    isFeatured: true,
  },
  {
    name: 'کمربند چرم مصنوعی',
    slug: 'faux-leather-belt',
    description: 'کمربند قابل تنظیم با سگک فلزی مات.',
    price: 1_480_000,
    stock: 45,
    categorySlug: 'clothing',
    imageSeed: 'belt',
  },
  {
    name: 'کلاه بیسبال',
    slug: 'baseball-cap',
    description: 'کلاه نخی با گیره قابل تنظیم پشت.',
    price: 980_000,
    stock: 60,
    categorySlug: 'clothing',
    imageSeed: 'cap',
  },
  {
    name: 'جوراب ورزشی ۳ جفت',
    slug: 'sport-socks-3pack',
    description: 'پک سه‌تایی جوراب ورزشی ضدتعریق.',
    price: 720_000,
    stock: 100,
    categorySlug: 'clothing',
    imageSeed: 'socks',
  },
  {
    name: 'شال پشمی سبک',
    slug: 'light-wool-scarf',
    description: 'شال سبک برای هوای خنک، بافت نرم.',
    price: 2_100_000,
    stock: 33,
    categorySlug: 'clothing',
    imageSeed: 'scarf',
  },

  // home (10)
  {
    name: 'ماگ سرامیکی مات',
    slug: 'ceramic-mug',
    description: 'ماگ سرامیکی مات ۳۵۰ میلی‌لیتر، مناسب ماشین ظرفشویی.',
    price: 1_800_000,
    stock: 60,
    categorySlug: 'home',
    imageSeed: 'mug',
  },
  {
    name: 'چراغ مطالعه LED',
    slug: 'desk-lamp',
    description: 'چراغ مطالعه LED با شدت نور قابل تنظیم و بازوی منعطف.',
    price: 6_500_000,
    stock: 22,
    categorySlug: 'home',
    imageSeed: 'lamp',
    isFeatured: true,
  },
  {
    name: 'سازمان‌دهنده میز کار',
    slug: 'desk-organizer',
    description: 'باکس رومیزی چندخانه برای قلم، کاغذ و لوازم کوچک.',
    price: 1_250_000,
    stock: 50,
    categorySlug: 'home',
    imageSeed: 'organizer',
  },
  {
    name: 'کتری برقی ۱.۷ لیتری',
    slug: 'electric-kettle',
    description: 'کتری برقی استیل با قطع‌کن خودکار و نشانگر سطح آب.',
    price: 4_300_000,
    stock: 26,
    categorySlug: 'home',
    imageSeed: 'kettle',
  },
  {
    name: 'سینی سرو چوبی',
    slug: 'wood-serving-tray',
    description: 'سینی سرو چوبی با دسته‌های فلزی.',
    price: 2_650_000,
    stock: 19,
    categorySlug: 'home',
    imageSeed: 'tray',
  },
  {
    name: 'بالش مموری فوم',
    slug: 'memory-foam-pillow',
    description: 'بالش مموری فوم با کاور قابل شستشو.',
    price: 3_900_000,
    stock: 34,
    categorySlug: 'home',
    imageSeed: 'pillow',
  },
  {
    name: 'دستمال آشپزخانه میکروفایبر (۵ عدد)',
    slug: 'microfiber-cloths',
    description: 'پک پنج‌عددی دستمال میکروفایبر جذب بالا.',
    price: 650_000,
    stock: 90,
    categorySlug: 'home',
    imageSeed: 'cloths',
  },
  {
    name: 'گلدان سرامیکی متوسط',
    slug: 'ceramic-vase',
    description: 'گلدان سرامیکی مینیمال برای گل خشک یا شاخه بریده.',
    price: 2_200_000,
    stock: 27,
    categorySlug: 'home',
    imageSeed: 'vase',
  },
  {
    name: 'ساعت دیواری مدرن',
    slug: 'wall-clock-modern',
    description: 'ساعت دیواری بی‌صدا با قاب فلزی نازک.',
    price: 3_150_000,
    stock: 16,
    categorySlug: 'home',
    imageSeed: 'wallclock',
  },
  {
    name: 'ست قاشق چای‌خوری ۶ عددی',
    slug: 'tea-spoon-set',
    description: 'ست استیل ۶ عددی قاشق چای‌خوری در جعبه هدیه.',
    price: 1_100_000,
    stock: 44,
    categorySlug: 'home',
    imageSeed: 'teaspoons',
  },

  // beauty (8)
  {
    name: 'کرم مرطوب‌کننده صورت',
    slug: 'face-moisturizer',
    description: 'کرم مرطوب‌کننده سبک برای پوست معمولی تا خشک، ۵۰ میلی‌لیتر.',
    price: 2_850_000,
    stock: 40,
    categorySlug: 'beauty',
    imageSeed: 'moisturizer',
    isFeatured: true,
  },
  {
    name: 'ضدآفتاب SPF50',
    slug: 'sunscreen-spf50',
    description: 'ضدآفتاب بی‌رنگ با SPF50 مناسب استفاده روزانه.',
    price: 1_980_000,
    stock: 55,
    categorySlug: 'beauty',
    imageSeed: 'sunscreen',
  },
  {
    name: 'شامپو تقویتی مو',
    slug: 'hair-shampoo',
    description: 'شامپو تقویتی برای موهای آسیب‌دیده، ۴۰۰ میلی‌لیتر.',
    price: 1_420_000,
    stock: 48,
    categorySlug: 'beauty',
    imageSeed: 'shampoo',
  },
  {
    name: 'مسواک برقی',
    slug: 'electric-toothbrush',
    description: 'مسواک برقی با تایمر ۲ دقیقه‌ای و دو سری یدک.',
    price: 5_750_000,
    stock: 21,
    categorySlug: 'beauty',
    imageSeed: 'toothbrush',
  },
  {
    name: 'عطر جیبی ۲۰ میلی‌لیتر',
    slug: 'pocket-perfume',
    description: 'عطر جیبی با رایحه ملایم مرکباتی.',
    price: 3_600_000,
    stock: 30,
    categorySlug: 'beauty',
    imageSeed: 'perfume',
  },
  {
    name: 'ست مراقبت لب',
    slug: 'lip-care-set',
    description: 'ست بالم لب و اسکراب ملایم در جعبه کوچک.',
    price: 890_000,
    stock: 70,
    categorySlug: 'beauty',
    imageSeed: 'lipcare',
  },
  {
    name: 'آینه آرایشی LED',
    slug: 'led-makeup-mirror',
    description: 'آینه رومیزی با نور LED سه‌حالته و بزرگنمایی.',
    price: 4_100_000,
    stock: 14,
    categorySlug: 'beauty',
    imageSeed: 'mirror',
  },
  {
    name: 'برس مو ضدگره',
    slug: 'detangling-brush',
    description: 'برس مو مناسب موهای خشک و مرطوب، بدون آسیب به تار مو.',
    price: 780_000,
    stock: 65,
    categorySlug: 'beauty',
    imageSeed: 'hairbrush',
  },

  // sports (8)
  {
    name: 'مت یوگا ضدلغزش',
    slug: 'yoga-mat',
    description: 'مت یوگا ضخامت ۶ میلی‌متر با سطح ضدلغزش.',
    price: 2_400_000,
    stock: 36,
    categorySlug: 'sports',
    imageSeed: 'yogamat',
    isFeatured: true,
  },
  {
    name: 'دمبل ۲ کیلویی جفت',
    slug: 'dumbbells-2kg',
    description: 'جفت دمبل ۲ کیلویی با روکش نئوپرن.',
    price: 3_300_000,
    stock: 25,
    categorySlug: 'sports',
    imageSeed: 'dumbbells',
  },
  {
    name: 'بطری ورزشی ۷۵۰ میلی‌لیتر',
    slug: 'sports-bottle',
    description: 'بطری ورزشی Tritan بدون BPA با درپوش قفل‌شونده.',
    price: 950_000,
    stock: 80,
    categorySlug: 'sports',
    imageSeed: 'bottle',
  },
  {
    name: 'کوله پشتی شهری ۲۰ لیتری',
    slug: 'city-backpack-20l',
    description: 'کوله سبک ضدآب با محفظه لپ‌تاپ ۱۵ اینچ.',
    price: 6_200_000,
    stock: 29,
    categorySlug: 'sports',
    imageSeed: 'backpack',
    isFeatured: true,
  },
  {
    name: 'طناب ورزشی سرعتی',
    slug: 'speed-jump-rope',
    description: 'طناب ورزشی با بلبرینگ و دسته‌های ضدلغزش.',
    price: 680_000,
    stock: 75,
    categorySlug: 'sports',
    imageSeed: 'jumprope',
  },
  {
    name: 'دستکش تمرین باشگاه',
    slug: 'gym-gloves',
    description: 'دستکش تمرین با کف ضدلغزش و مچ‌بند قابل تنظیم.',
    price: 1_350_000,
    stock: 40,
    categorySlug: 'sports',
    imageSeed: 'gymgloves',
  },
  {
    name: 'ساک ورزشی متوسط',
    slug: 'duffel-bag',
    description: 'ساک ورزشی با جیب کفش جدا و بند شانه.',
    price: 4_800_000,
    stock: 17,
    categorySlug: 'sports',
    imageSeed: 'duffel',
  },
  {
    name: 'کش ورزشی ۳ مقاومتی',
    slug: 'resistance-bands-3',
    description: 'ست سه‌تایی کش مقاومتی سبک، متوسط و سنگین.',
    price: 1_150_000,
    stock: 52,
    categorySlug: 'sports',
    imageSeed: 'bands',
  },

  // books (8) — total 12+10+10+8+8+8 = 56
  {
    name: 'دفتر نقطه‌ای A5',
    slug: 'dot-grid-notebook',
    description: 'دفتر نقطه‌ای A5 با جلد سخت و کاغذ ۱۰۰ گرمی.',
    price: 780_000,
    stock: 70,
    categorySlug: 'books',
    imageSeed: 'notebook',
  },
  {
    name: 'خودکار ژلی مشکی (۳ عدد)',
    slug: 'gel-pen-3pack',
    description: 'پک سه‌تایی خودکار ژلی روان با جوهر مشکی.',
    price: 320_000,
    stock: 150,
    categorySlug: 'books',
    imageSeed: 'pens',
  },
  {
    name: 'ماژیک هایلایتر ۴ رنگ',
    slug: 'highlighter-4pack',
    description: 'ست هایلایتر پاستلی چهار رنگ برای مطالعه.',
    price: 450_000,
    stock: 95,
    categorySlug: 'books',
    imageSeed: 'highlighter',
  },
  {
    name: 'کتاب برنامه‌ریزی هفتگی',
    slug: 'weekly-planner',
    description: 'پلنر هفتگی بدون تاریخ با صفحات هدف‌گذاری.',
    price: 1_650_000,
    stock: 32,
    categorySlug: 'books',
    imageSeed: 'planner',
    isFeatured: true,
  },
  {
    name: 'پوشه زیپ‌دار اسناد',
    slug: 'zip-document-folder',
    description: 'پوشه A4 زیپ‌دار ضدآب برای مدارک و لپ‌تاپ کوچک.',
    price: 890_000,
    stock: 40,
    categorySlug: 'books',
    imageSeed: 'folder',
  },
  {
    name: 'استیکر نوت شفاف',
    slug: 'clear-sticky-notes',
    description: 'برچسب یادداشت شفاف قابل جابه‌جایی، ۱۲۰ برگ.',
    price: 280_000,
    stock: 110,
    categorySlug: 'books',
    imageSeed: 'stickynotes',
  },
  {
    name: 'خط‌کش فلزی ۳۰ سانتی',
    slug: 'metal-ruler-30cm',
    description: 'خط‌کش استیل ۳۰ سانتی با لبه ضدلغزش.',
    price: 240_000,
    stock: 85,
    categorySlug: 'books',
    imageSeed: 'ruler',
  },
  {
    name: 'کیف لوازم تحریر رومیزی',
    slug: 'desk-pencil-case',
    description: 'جامدادی رومیزی چندخانه برای میز کار و مطالعه.',
    price: 1_050_000,
    stock: 28,
    categorySlug: 'books',
    imageSeed: 'pencilcase',
  },
];

async function seed() {
  if (productsSeed.length < 50) {
    throw new Error(`Seed needs ≥50 products, got ${productsSeed.length}`);
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const usersService = app.get(UsersService);
  const categories = app.get<Repository<Category>>(getRepositoryToken(Category));
  const products = app.get<Repository<Product>>(getRepositoryToken(Product));
  const coupons = app.get<Repository<CouponEntity>>(
    getRepositoryToken(CouponEntity),
  );
  const shippingMethods = app.get<Repository<ShippingMethodEntity>>(
    getRepositoryToken(ShippingMethodEntity),
  );

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@shop.local';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'password123';
  if (
    process.env.NODE_ENV === 'production' &&
    adminPassword === 'password123'
  ) {
    throw new Error(
      'Refusing to seed default ADMIN_SEED_PASSWORD in production',
    );
  }

  let admin = await usersService.findByEmail(adminEmail);
  if (!admin) {
    admin = await usersService.create({
      email: adminEmail,
      fullName: 'مدیر فروشگاه',
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: 'owner',
    });
    console.log(
      `Created owner ${admin.email} (password from ADMIN_SEED_PASSWORD)`,
    );
  } else if (admin.role !== 'owner') {
    await usersService.setRole(
      { id: admin.id, email: admin.email, fullName: admin.fullName, role: 'owner', loyaltyPoints: 0 },
      admin.id,
      { role: 'owner' },
    );
    admin = (await usersService.findById(admin.id)) ?? admin;
    console.log(`Upgraded ${admin.email} to owner`);
  } else {
    console.log(`Owner ${admin.email} already exists`);
  }

  const categoryIds = new Map<string, string>();

  for (const item of categoriesSeed) {
    let category = await categories.findOne({ where: { slug: item.slug } });
    if (!category) {
      category = await categories.save(categories.create(item));
      console.log(`Created category ${category.slug}`);
    } else if (category.name !== item.name) {
      category.name = item.name;
      category = await categories.save(category);
      console.log(`Updated category ${category.slug}`);
    } else {
      console.log(`Category ${category.slug} already exists`);
    }
    categoryIds.set(category.slug, category.id);
  }

  let created = 0;
  let updated = 0;
  let zeroFixed = 0;

  for (const item of productsSeed) {
    const categoryId = categoryIds.get(item.categorySlug) ?? null;
    const images = [
      `https://picsum.photos/seed/${encodeURIComponent(item.imageSeed)}/800/800`,
    ];
    const payload = {
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      stock: item.stock,
      categoryId,
      images,
      isFeatured: item.isFeatured ?? false,
      isActive: item.isActive ?? true,
    };

    const existing = await products.findOne({ where: { slug: item.slug } });
    if (existing) {
      const wasZero = Number(existing.price) === 0;
      existing.name = payload.name;
      existing.description = payload.description;
      existing.price = payload.price;
      existing.stock = payload.stock;
      existing.categoryId = payload.categoryId;
      existing.images = payload.images;
      existing.isFeatured = payload.isFeatured;
      existing.isActive = payload.isActive;
      await products.save(existing);
      updated += 1;
      if (wasZero) {
        zeroFixed += 1;
      }
      console.log(
        `Updated product ${item.slug} (price=${payload.price} rial${wasZero ? ', was 0' : ''})`,
      );
      continue;
    }

    await products.save(products.create(payload));
    created += 1;
    console.log(`Created product ${item.slug} (price=${payload.price} rial)`);
  }

  const welcomeCode = 'WELCOME10';
  let welcome = await coupons.findOne({ where: { code: welcomeCode } });
  if (!welcome) {
    welcome = await coupons.save(
      coupons.create({
        code: welcomeCode,
        type: 'percent',
        value: 10,
        minOrderAmount: 0,
        maxUses: null,
        usedCount: 0,
        expiresAt: null,
        isActive: true,
      }),
    );
    console.log(`Created coupon ${welcome.code} (10%)`);
  } else {
    console.log(`Coupon ${welcome.code} already exists`);
  }

  const shippingSeed = [
    {
      name: 'پست پیشتاز',
      description: 'ارسال عادی در سراسر کشور',
      price: 750_000,
      estimatedDays: 4,
      freeAbove: 20_000_000,
      sortOrder: 10,
    },
    {
      name: 'تیپاکس',
      description: 'ارسال سریع‌تر به مراکز استان',
      price: 1_200_000,
      estimatedDays: 2,
      freeAbove: null,
      sortOrder: 20,
    },
    {
      name: 'پیک موتوری (تهران)',
      description: 'فقط محدوده تهران',
      price: 900_000,
      estimatedDays: 1,
      freeAbove: null,
      sortOrder: 30,
    },
  ] as const;

  for (const item of shippingSeed) {
    let method = await shippingMethods.findOne({ where: { name: item.name } });
    if (!method) {
      method = await shippingMethods.save(
        shippingMethods.create({
          ...item,
          isActive: true,
        }),
      );
      console.log(`Created shipping method ${method.name}`);
    } else {
      method.description = item.description;
      method.price = item.price;
      method.estimatedDays = item.estimatedDays;
      method.freeAbove = item.freeAbove;
      method.sortOrder = item.sortOrder;
      method.isActive = true;
      await shippingMethods.save(method);
      console.log(`Updated shipping method ${method.name}`);
    }
  }

  const sample = await products.find({
    take: 3,
    order: { createdAt: 'DESC' },
  });
  console.log(
    'Sample prices:',
    sample.map((p) => `${p.slug}=${p.price}`).join(', '),
  );
  console.log(
    `Seed complete: ${productsSeed.length} catalog items, created=${created}, updated=${updated}, zeroFixed=${zeroFixed}`,
  );

  await app.close();
}

await seed();
