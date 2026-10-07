<script setup lang="ts">
const settings = useStoreSettingsState()

const shopName = computed(() => settings.value.shopName || 'فروشگاه')
const blurb = computed(
  () =>
    settings.value.metaDescription?.trim() ||
    `خرید آنلاین از ${shopName.value} با ارسال مطمئن، پرداخت امن و پشتیبانی پاسخ‌گو.`,
)

const withUs = [
  { label: 'محصولات', to: '/products' },
  { label: 'دسته‌ها', to: '/categories' },
  { label: 'برندها', to: '/brands' },
  { label: 'مجله', to: '/mag' },
  { label: 'درباره ما', to: '/about' },
  { label: 'تماس با ما', to: '/contact' },
] as const

const enamadCode = computed(() => settings.value.enamadCode?.trim() || '')
const enamadHref = computed(() =>
  enamadCode.value
    ? `https://trustseal.enamad.ir/?${enamadCode.value}`
    : '',
)
const enamadImg = computed(() =>
  enamadCode.value
    ? `https://trustseal.enamad.ir/logo.aspx?${enamadCode.value}`
    : '',
)
const branches = computed(() => settings.value.storeBranches ?? [])

const customerService = [
  { label: 'سوالات متداول', to: '/faq' },
  { label: 'نحوه ارسال', to: '/shipping' },
  { label: 'حریم خصوصی', to: '/privacy' },
  { label: 'شرایط مرجوعی', to: '/returns' },
  { label: 'قوانین و مقررات', to: '/terms' },
  { label: 'پیگیری سفارش', to: '/account/orders' },
  { label: 'تماس و پشتیبانی', to: '/contact' },
] as const

const buyGuides = [
  { label: 'راهنمای ثبت سفارش', to: '/faq' },
  { label: 'شیوه‌های پرداخت', to: '/faq' },
  { label: 'نحوه ارسال', to: '/shipping' },
  { label: 'شرایط مرجوعی', to: '/returns' },
  { label: 'پیگیری سفارش', to: '/account/orders' },
] as const

const trustItems = [
  { icon: 'i-lucide-truck', label: 'ارسال سریع' },
  { icon: 'i-lucide-shield-check', label: 'پرداخت امن' },
  { icon: 'i-lucide-headset', label: 'پشتیبانی پاسخ‌گو' },
  { icon: 'i-lucide-badge-check', label: 'ضمانت اصالت' },
  { icon: 'i-lucide-undo-2', label: 'مرجوعی طبق شرایط' },
] as const

const socials = [
  {
    label: 'Instagram',
    icon: 'i-lucide-instagram',
    to: 'https://instagram.com',
  },
  {
    label: 'YouTube',
    icon: 'i-lucide-youtube',
    to: 'https://youtube.com',
  },
  {
    label: 'Aparat',
    icon: 'i-lucide-play',
    to: 'https://www.aparat.com',
  },
] as const

const year = new Date().getFullYear()
</script>

<template>
  <UFooter>
    <template #top>
      <UContainer class="border-default border-b py-8">
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <li
            v-for="item in trustItems"
            :key="item.label"
            class="text-muted flex items-center gap-2 text-sm"
          >
            <UIcon
              :name="item.icon"
              class="size-5 shrink-0"
            />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </UContainer>

      <UContainer class="border-default border-b py-12">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div class="space-y-5 lg:col-span-4">
            <div class="space-y-2">
              <p class="text-highlighted text-lg font-semibold tracking-tight">
                فروشگاه اینترنتی {{ shopName }}
              </p>
              <p class="text-muted max-w-md text-sm leading-relaxed">
                {{ blurb }}
              </p>
            </div>

            <ShopNewsletterForm />

            <div class="space-y-2">
              <p class="text-highlighted text-sm font-medium">
                همراه ما باشید
              </p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="item in socials"
                  :key="item.label"
                  :to="item.to"
                  :icon="item.icon"
                  :label="item.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                />
              </div>
            </div>

            <div
              v-if="settings.supportPhone || settings.supportEmail"
              class="text-muted space-y-1 text-sm"
            >
              <p v-if="settings.supportPhone">
                تلفن:
                <a
                  :href="`tel:${settings.supportPhone}`"
                  class="text-highlighted hover:underline"
                >
                  {{ settings.supportPhone }}
                </a>
              </p>
              <p v-if="settings.supportEmail">
                ایمیل:
                <a
                  :href="`mailto:${settings.supportEmail}`"
                  class="text-highlighted hover:underline"
                >
                  {{ settings.supportEmail }}
                </a>
              </p>
            </div>
          </div>

          <div class="lg:col-span-2">
            <p class="text-highlighted mb-3 text-sm font-medium">
              همراه با {{ shopName }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="item in withUs"
                :key="item.to"
              >
                <NuxtLink
                  :to="item.to"
                  class="text-muted hover:text-highlighted text-sm transition-colors"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <p class="text-highlighted mb-3 text-sm font-medium">
              خدمات مشتریان
            </p>
            <ul class="space-y-2">
              <li
                v-for="item in customerService"
                :key="item.label"
              >
                <NuxtLink
                  :to="item.to"
                  class="text-muted hover:text-highlighted text-sm transition-colors"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <p class="text-highlighted mb-3 text-sm font-medium">
              راهنمای خرید
            </p>
            <ul class="space-y-2">
              <li
                v-for="item in buyGuides"
                :key="item.label"
              >
                <NuxtLink
                  :to="item.to"
                  class="text-muted hover:text-highlighted text-sm transition-colors"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-4 lg:col-span-2">
            <div class="space-y-2">
              <p class="text-highlighted text-sm font-medium">
                اعتماد شما سرمایه ماست
              </p>
              <p class="text-muted text-sm leading-relaxed">
                {{ shopName }} تلاش می‌کند تجربه‌ای امن، شفاف و سریع برای خرید
                آنلاین شما فراهم کند.
              </p>
            </div>

            <div
              class="border-default bg-elevated/40 flex min-h-28 items-center justify-center rounded-lg border px-4 py-6 text-center"
              :aria-label="`نماد اعتماد الکترونیکی ${shopName}`"
            >
              <ClientOnly>
                <a
                  v-if="enamadCode"
                  :href="enamadHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerpolicy="origin"
                  class="inline-block"
                >
                  <img
                    :src="enamadImg"
                    alt="نماد اعتماد الکترونیکی"
                    class="mx-auto h-24 w-auto"
                    referrerpolicy="origin"
                  >
                </a>
                <div
                  v-else
                  class="space-y-1"
                >
                  <UIcon
                    name="i-lucide-shield-check"
                    class="text-muted mx-auto size-8"
                  />
                  <p class="text-muted text-xs">
                    نماد اعتماد پس از ثبت کد اینماد در تنظیمات نمایش داده می‌شود
                  </p>
                </div>
              </ClientOnly>
            </div>

            <div
              v-if="branches.length"
              class="space-y-2"
            >
              <p class="text-highlighted text-sm font-medium">
                شعب حضوری
              </p>
              <ul class="space-y-3">
                <li
                  v-for="(branch, index) in branches"
                  :key="`${branch.name}-${index}`"
                  class="text-muted text-sm"
                >
                  <p class="text-highlighted font-medium">
                    {{ branch.name }}
                  </p>
                  <p>{{ branch.address }}</p>
                  <p v-if="branch.phone">
                    <a
                      :href="`tel:${branch.phone}`"
                      class="hover:underline"
                    >{{ branch.phone }}</a>
                  </p>
                  <p v-if="branch.hours">
                    {{ branch.hours }}
                  </p>
                  <a
                    v-if="branch.mapUrl"
                    :href="branch.mapUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-highlighted hover:underline"
                  >
                    نقشه
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-xs">
        © {{ year }} {{ shopName }}. همه حقوق محفوظ است.
      </p>
    </template>

    <template #right>
      <div class="flex flex-wrap items-center gap-1">
        <UButton
          to="/privacy"
          label="حریم خصوصی"
          color="neutral"
          variant="link"
          size="xs"
        />
        <UButton
          to="/terms"
          label="قوانین"
          color="neutral"
          variant="link"
          size="xs"
        />
        <UButton
          to="/returns"
          label="مرجوعی"
          color="neutral"
          variant="link"
          size="xs"
        />
      </div>
    </template>
  </UFooter>
</template>
