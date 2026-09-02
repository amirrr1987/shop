import type { Category } from '~/types/shop'

export const categories: Category[] = [
  {
    id: '1',
    slug: 'smart-electronics',
    name: 'الکترونیک هوشمند',
    image: 'https://picsum.photos/seed/rozer-c1/300/300',
    links: [
      { label: 'پوشیدنی', to: '/shop?category=wearable' },
      { label: 'خانه هوشمند', to: '/shop?category=smart-home' },
      { label: 'کنترل از راه دور', to: '/shop?category=remote' },
      { label: 'ساعت هوشمند', to: '/shop?category=watches' }
    ]
  },
  {
    id: '2',
    slug: 'audio-video',
    name: 'صوتی و تصویری',
    image: 'https://picsum.photos/seed/rozer-c2/300/300',
    links: [
      { label: 'تلویزیون', to: '/shop?category=tv' },
      { label: 'گیرنده TV', to: '/shop?category=receiver' },
      { label: 'پروژکتور', to: '/shop?category=projector' },
      { label: 'TV Stick', to: '/shop?category=stick' }
    ]
  },
  {
    id: '3',
    slug: 'video-games',
    name: 'بازی ویدیویی',
    image: 'https://picsum.photos/seed/rozer-c3/300/300',
    links: [
      { label: 'کنسول دستی', to: '/shop?category=handheld' },
      { label: 'کنترلر', to: '/shop?category=controller' },
      { label: 'جوی‌استیک', to: '/shop?category=joystick' },
      { label: 'استیکر', to: '/shop?category=stickers' }
    ]
  },
  {
    id: '4',
    slug: 'portable-av',
    name: 'صوتی و تصویری قابل حمل',
    image: 'https://picsum.photos/seed/rozer-c4/300/300',
    links: [
      { label: 'هدفون', to: '/shop?category=headphones' },
      { label: 'اسپیکر', to: '/shop?category=speakers' },
      { label: 'MP3 Player', to: '/shop?category=mp3' },
      { label: 'میکروفون', to: '/shop?category=mic' }
    ]
  },
  {
    id: '5',
    slug: 'camera-photo',
    name: 'دوربین و عکاسی',
    image: 'https://picsum.photos/seed/rozer-c5/300/300',
    links: [
      { label: 'دوربین دیجیتال', to: '/shop?category=camera' },
      { label: 'دوربین فیلمبرداری', to: '/shop?category=camcorder' },
      { label: 'پهپاد', to: '/shop?category=drone' },
      { label: 'اکشن کم', to: '/shop?category=action-cam' }
    ]
  }
]
