<script setup lang="ts">
import type { Product, ProductType } from '~/types/shop'
import { formatPrice, products } from '~/data/products'

const props = defineProps<{
  product: Product
  type?: ProductType
}>()

const quantity = ref(1)
const selectedVariant = ref(props.product.variants?.[0]?.id)
const selectedGroup = ref<string[]>([...(props.product.groupItems ?? [])])

const { add } = useCart()
const { toggle, has } = useWishlist()
const { toggle: toggleCompare, has: inCompare } = useCompare()

const activeVariant = computed(() =>
  props.product.variants?.find(v => v.id === selectedVariant.value)
)

const displayPrice = computed(() =>
  activeVariant.value?.price ?? props.product.price
)

const groupProducts = computed(() =>
  (props.product.groupItems ?? [])
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[]
)

const typeLabels: Record<ProductType, string> = {
  simple: 'ساده',
  variable: 'متغیر',
  group: 'گروهی',
  affiliate: 'افیلیت'
}

function addToCart() {
  if (props.type === 'affiliate' && props.product.affiliateUrl) {
    navigateTo(props.product.affiliateUrl, { external: true, open: { target: '_blank' } })
    return
  }

  const productToAdd = activeVariant.value
    ? { ...props.product, price: activeVariant.value.price, name: `${props.product.name} — ${activeVariant.value.label}` }
    : props.product

  add(productToAdd, quantity.value)

  if (props.type === 'group' && selectedGroup.value.length) {
    for (const id of selectedGroup.value) {
      const item = products.find(p => p.id === id)
      if (item) add(item)
    }
  }

  if (props.type !== 'affiliate') {
    useToast().add({
      title: 'به سبد اضافه شد',
      description: productToAdd.name,
      icon: 'i-lucide-shopping-cart',
      color: 'success'
    })
  }
}
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'ring-1 ring-default',
      body: 'space-y-5 p-4 sm:p-6'
    }"
  >
    <div class="flex flex-wrap items-center gap-2">
      <UBadge
        color="primary"
        variant="soft"
        size="sm"
        :label="`نوع: ${typeLabels[type ?? 'simple']}`"
      />
      <UBadge
        color="neutral"
        variant="subtle"
        size="sm"
        :label="`کد: ${product.slug}`"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UIcon
        v-for="star in product.rating"
        :key="star"
        name="i-lucide-star"
        class="size-4 text-warning"
      />
      <span class="text-sm text-muted">
        {{ product.reviewCount ?? 2 }} نظر
      </span>
    </div>

    <UAlert
      color="primary"
      variant="soft"
      icon="i-lucide-tag"
      :title="formatPrice(displayPrice)"
      :description="product.oldPrice ? `قیمت قبلی: ${formatPrice(product.oldPrice)}` : undefined"
      :ui="{
        root: 'ring-1 ring-primary/15',
        title: 'text-lg font-semibold',
        description: 'text-sm text-muted'
      }"
    />

    <p
      v-if="product.description"
      class="text-sm leading-relaxed text-muted"
    >
      {{ product.description }}
    </p>

    <UFormField
      v-if="type === 'variable' && product.variants?.length"
      name="variant"
      label="انتخاب مدل"
      :ui="{ label: 'text-sm font-medium text-default' }"
    >
      <URadioGroup
        v-model="selectedVariant"
        :items="product.variants.map(v => ({ label: `${v.label} — ${formatPrice(v.price)}`, value: v.id }))"
      />
    </UFormField>

    <UFormField
      v-if="type === 'group' && groupProducts.length"
      name="group"
      label="محصولات گروهی"
      description="موارد دلخواه را برای افزودن همزمان انتخاب کنید."
      :ui="{
        label: 'text-sm font-medium text-default',
        description: 'text-xs text-muted'
      }"
    >
      <UCheckboxGroup
        v-model="selectedGroup"
        :items="groupProducts.map(p => ({ label: `${p.name} — ${formatPrice(p.price)}`, value: p.id }))"
      />
    </UFormField>

    <UFormField
      v-if="type !== 'affiliate'"
      name="quantity"
      label="تعداد"
      :ui="{ label: 'text-sm font-medium text-default' }"
    >
      <UInputNumber
        v-model="quantity"
        :min="1"
        :max="99"
        class="w-full max-w-40"
      />
    </UFormField>

    <UAlert
      v-if="type === 'affiliate'"
      color="info"
      variant="soft"
      icon="i-lucide-external-link"
      title="خرید از فروشنده همکار"
      description="با کلیک روی دکمه خرید، به فروشگاه خارجی هدایت می‌شوید."
      :ui="{ description: 'text-xs text-muted' }"
    />

    <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <UButton
        :label="type === 'affiliate' ? 'خرید از فروشنده' : 'افزودن به سبد'"
        :icon="type === 'affiliate' ? 'i-lucide-external-link' : 'i-lucide-shopping-cart'"
        size="lg"
        block
        class="sm:w-auto sm:min-w-44"
        @click="addToCart"
      />
      <UButton
        label="علاقه‌مندی"
        :color="has(product.id) ? 'error' : 'neutral'"
        :variant="has(product.id) ? 'solid' : 'outline'"
        icon="i-lucide-heart"
        block
        class="sm:w-auto"
        @click="toggle(product)"
      />
      <UButton
        label="مقایسه"
        :color="inCompare(product.id) ? 'primary' : 'neutral'"
        :variant="inCompare(product.id) ? 'solid' : 'outline'"
        icon="i-lucide-git-compare"
        block
        class="sm:w-auto"
        @click="toggleCompare(product)"
      />
    </div>

    <USeparator label="اشتراک‌گذاری" />

    <div class="flex flex-wrap gap-1">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-facebook"
        aria-label="اشتراک در فیسبوک"
        square
        :ui="{ base: 'size-9' }"
        to="#"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-x"
        aria-label="اشتراک در ایکس"
        square
        :ui="{ base: 'size-9' }"
        to="#"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-instagram"
        aria-label="اشتراک در اینستاگرام"
        square
        :ui="{ base: 'size-9' }"
        to="#"
      />
    </div>
  </UCard>
</template>
