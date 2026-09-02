export const shopCategoryFilters = [
  {
    label: 'دسته داغ',
    children: [
      { label: 'لباس', to: '/shop?category=dresses' },
      { label: 'کاپشن', to: '/shop?category=jackets' },
      { label: 'سویشرت', to: '/shop?category=sweaters' },
      { label: 'جین', to: '/shop?category=jeans' },
      { label: 'بلوز و پیراهن', to: '/shop?category=shirts' }
    ]
  },
  {
    label: 'لباس بیرونی',
    children: [
      { label: 'کاپشن ساده', to: '/shop?category=basic-jackets' },
      { label: 'خز واقعی', to: '/shop?category=fur' },
      { label: 'پالتو', to: '/shop?category=coats' },
      { label: 'بلیزر', to: '/shop?category=blazers' },
      { label: 'بارانی', to: '/shop?category=trench' }
    ]
  },
  {
    label: 'الکترونیک',
    children: [
      { label: 'موبایل', to: '/shop?category=smartphone' },
      { label: 'لپ‌تاپ', to: '/shop?category=laptop' },
      { label: 'هدفون', to: '/shop?category=headphones' },
      { label: 'دوربین', to: '/shop?category=camera' },
      { label: 'بازی', to: '/shop?category=games' }
    ]
  }
]

export const shopSizeOptions = [
  { label: 'XS (4)', value: 'xs' },
  { label: 'M (4)', value: 'm' },
  { label: 'L (4)', value: 'l' },
  { label: 'XL (4)', value: 'xl' }
]

export const shopColorOptions = [
  { label: 'مشکی', value: 'black' },
  { label: 'آبی', value: 'blue' },
  { label: 'قهوه‌ای', value: 'brown' },
  { label: 'خاکستری', value: 'gray' },
  { label: 'سبز', value: 'green' }
]

export const shopSortOptions = [
  { label: 'جدیدترین', value: 'new' },
  { label: 'الف تا ی', value: 'az' },
  { label: 'ی تا الف', value: 'za' },
  { label: 'ارزان‌ترین', value: 'price-asc' },
  { label: 'گران‌ترین', value: 'price-desc' },
  { label: 'پرفروش‌ترین', value: 'best' },
  { label: 'حراج', value: 'sale' }
]

export const shopPageSizeOptions = [
  { label: '8 محصول', value: 8 },
  { label: '12 محصول', value: 12 },
  { label: '16 محصول', value: 16 }
]
