import type { Product, ProductPriceMode, ProductSpec } from '@shop/shared'

export type CompareItem = {
  productId: string
  name: string
  slug: string
  price: number
  priceMode: ProductPriceMode
  image: string | null
  stock: number
  isFeatured: boolean
  brandName: string | null
  specs: ProductSpec[]
  /** Same-category constraint; null = uncategorized bucket. */
  categoryId: string | null
}

export type CompareToggleResult = {
  added: boolean
  full: boolean
  /** Different category than the current compare set. */
  categoryMismatch: boolean
  /** Product has no category while set expects one, or vice-versa handled via mismatch. */
  noCategory: boolean
}

const STORAGE_KEY = 'shop-compare'
const MAX_ITEMS = 5

function readStorage(): CompareItem[] {
  if (!import.meta.client) {
    return []
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CompareItem[]
    if (!Array.isArray(parsed)) return []
    const items = parsed.slice(0, MAX_ITEMS).map((item) => ({
      ...item,
      priceMode: item.priceMode === 'call' ? 'call' as const : 'fixed' as const,
      categoryId: item.categoryId ?? null,
      brandName: item.brandName ?? null,
      specs: Array.isArray(item.specs) ? item.specs : [],
    }))
    // Drop mixed-category leftovers from older clients.
    const categoryId = items[0]?.categoryId ?? null
    return items.filter((item) => (item.categoryId ?? null) === categoryId)
  } catch {
    return []
  }
}

function writeStorage(items: CompareItem[]) {
  if (!import.meta.client) {
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useCompare() {
  const items = useState<CompareItem[]>('compare-items', () => [])

  const categoryId = computed(() => items.value[0]?.categoryId ?? null)

  function hydrate() {
    if (!import.meta.client) return
    items.value = readStorage()
  }

  function has(productId: string) {
    return items.value.some((item) => item.productId === productId)
  }

  function toggle(product: Product): CompareToggleResult {
    if (has(product.id)) {
      items.value = items.value.filter((item) => item.productId !== product.id)
      writeStorage(items.value)
      return {
        added: false,
        full: false,
        categoryMismatch: false,
        noCategory: false,
      }
    }

    const productCategoryId = product.categoryId ?? null
    if (!productCategoryId) {
      return {
        added: false,
        full: false,
        categoryMismatch: false,
        noCategory: true,
      }
    }

    if (items.value.length > 0) {
      const currentCategory = items.value[0]?.categoryId ?? null
      if (currentCategory !== productCategoryId) {
        return {
          added: false,
          full: false,
          categoryMismatch: true,
          noCategory: false,
        }
      }
    }

    if (items.value.length >= MAX_ITEMS) {
      return {
        added: false,
        full: true,
        categoryMismatch: false,
        noCategory: false,
      }
    }

    items.value = [
      ...items.value,
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        priceMode: product.priceMode ?? 'fixed',
        image: product.images[0] ?? null,
        stock: product.stock,
        isFeatured: product.isFeatured,
        brandName: product.brandName ?? null,
        specs: product.specs ?? [],
        categoryId: productCategoryId,
      },
    ]
    writeStorage(items.value)
    return {
      added: true,
      full: false,
      categoryMismatch: false,
      noCategory: false,
    }
  }

  function remove(productId: string) {
    items.value = items.value.filter((item) => item.productId !== productId)
    writeStorage(items.value)
  }

  function clear() {
    items.value = []
    writeStorage(items.value)
  }

  const count = computed(() => items.value.length)
  const max = MAX_ITEMS

  return {
    items,
    count,
    max,
    categoryId,
    hydrate,
    has,
    toggle,
    remove,
    clear,
  }
}
