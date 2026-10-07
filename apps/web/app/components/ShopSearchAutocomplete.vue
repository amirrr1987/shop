<script setup lang="ts">
import type { Product } from '@shop/shared'
import { productDisplayPrice } from '../utils/product-price'

const props = withDefaults(
  defineProps<{
    modelValue: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    class?: string
  }>(),
  {
    size: 'sm',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

const api = useApi()
const { formatPrice } = useCurrency()
const open = ref(false)
const loading = ref(false)
const items = ref<Product[]>([])
const rootRef = ref<HTMLElement | null>(null)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let requestSeq = 0

const query = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const showPanel = computed(
  () => open.value && query.value.trim().length >= 3,
)

async function fetchSuggest(q: string) {
  const seq = ++requestSeq
  loading.value = true
  try {
    const data = await api<{ items: Product[] }>('/products', {
      query: {
        q,
        perPage: 8,
        page: 1,
        sort: 'newest',
      },
    })
    if (seq !== requestSeq) {
      return
    }
    items.value = data.items ?? []
  } catch {
    if (seq === requestSeq) {
      items.value = []
    }
  } finally {
    if (seq === requestSeq) {
      loading.value = false
    }
  }
}

watch(query, (value) => {
  const q = value.trim()
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
  if (q.length < 3) {
    items.value = []
    loading.value = false
    return
  }
  open.value = true
  debounceTimer = setTimeout(() => {
    void fetchSuggest(q)
  }, 250)
})

function onFocus() {
  if (query.value.trim().length >= 3) {
    open.value = true
  }
}

function closePanel() {
  open.value = false
}

function onSubmit() {
  closePanel()
  emit('submit')
}

async function goProduct(product: Product) {
  closePanel()
  query.value = product.name
  await navigateTo(`/products/${product.slug}`)
}

async function goAllResults() {
  closePanel()
  emit('submit')
}

function onDocumentPointerDown(event: PointerEvent) {
  const root = rootRef.value
  if (!root || !(event.target instanceof Node)) {
    return
  }
  if (!root.contains(event.target)) {
    closePanel()
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>

<template>
  <div
    ref="rootRef"
    class="relative min-w-0"
    :class="props.class"
  >
    <form @submit.prevent="onSubmit">
      <UInput
        v-model="query"
        icon="i-lucide-search"
        placeholder="جستجوی محصول"
        :size="size"
        class="w-full"
        aria-label="جستجوی محصول"
        autocomplete="off"
        role="combobox"
        :aria-expanded="showPanel"
        aria-autocomplete="list"
        @focus="onFocus"
        @keydown.esc.prevent="closePanel"
      />
    </form>

    <div
      v-if="showPanel"
      class="border-default bg-default absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border shadow-lg"
      role="listbox"
    >
      <div
        v-if="loading"
        class="text-muted px-3 py-2 text-sm"
      >
        در حال جستجو…
      </div>

      <ul
        v-else-if="items.length"
        class="max-h-80 overflow-y-auto py-1"
      >
        <li
          v-for="product in items"
          :key="product.id"
        >
          <button
            type="button"
            class="hover:bg-elevated flex w-full items-center gap-3 px-3 py-2 text-start transition-colors"
            role="option"
            @click="goProduct(product)"
          >
            <div class="border-default size-11 shrink-0 overflow-hidden rounded-md border">
              <ShopImage
                :src="product.images[0] ?? null"
                :alt="product.name"
                :width="56"
                :height="56"
                sizes="56px"
                img-class="size-full object-cover"
              />
            </div>
            <span class="min-w-0 flex-1">
              <span class="text-highlighted line-clamp-1 text-sm font-medium">
                {{ product.name }}
              </span>
              <span class="text-muted mt-0.5 block text-xs">
                {{
                  productDisplayPrice(product).mode === 'call'
                    ? 'تماس بگیرید'
                    : formatPrice(productDisplayPrice(product).price ?? 0)
                }}
              </span>
            </span>
          </button>
        </li>
        <li class="border-default border-t">
          <button
            type="button"
            class="text-primary hover:bg-elevated w-full px-3 py-2 text-start text-sm font-medium"
            @click="goAllResults"
          >
            مشاهده همه نتایج برای «{{ query.trim() }}»
          </button>
        </li>
      </ul>

      <div
        v-else
        class="text-muted px-3 py-3 text-sm"
      >
        نتیجه‌ای پیدا نشد
      </div>
    </div>
  </div>
</template>
