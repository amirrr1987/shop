<script setup lang="ts">
const features = [
  {
    title: 'شرکت ما',
    description: 'تیمی از طراحان و توسعه‌دهندگان که قالب‌های HTML با کیفیت بالا می‌سازند.',
    icon: 'i-lucide-building'
  },
  {
    title: 'تیم ما',
    description: 'متخصصان UI/UX، frontend و backend با تجربه در eCommerce.',
    icon: 'i-lucide-users'
  },
  {
    title: 'نظرات مشتریان',
    description: 'رضایت مشتریان اولویت ماست و همواره در حال بهبود خدمات هستیم.',
    icon: 'i-lucide-message-circle'
  }
]
</script>

<template>
  <UPageHero
    title="به روزر خوش آمدید"
    description="فروشگاه آنلاین الکترونیک با بهترین محصولات و خدمات."
    orientation="horizontal"
    :links="[
      { label: 'مشاهده فروشگاه', to: '/shop', icon: 'i-lucide-store' },
      { label: 'تماس با ما', to: '/contact', color: 'neutral', variant: 'subtle', trailingIcon: 'i-lucide-arrow-left' }
    ]"
  >
    <NuxtImg
      src="https://picsum.photos/seed/rozer-about/800/500"
      alt="درباره روزر"
      width="800"
      height="500"
      loading="lazy"
    />
  </UPageHero>

  <UPageSection
    headline="درباره"
    title="داستان ما"
    description="روزر از سال ۱۳۹۵ فعالیت خود را در حوزه فروش الکترونیک آغاز کرد. هدف ما ارائه بهترین محصولات با قیمت مناسب و پشتیبانی ۲۴/۷ است. ما با برندهای معتبر جهانی همکاری می‌کنیم تا تجربه خریدی مطمئن و لذت‌بخش برای شما فراهم کنیم."
    :features="features"
  />
</template>
