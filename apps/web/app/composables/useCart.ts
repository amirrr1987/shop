import type {
  Product,
  ProductAvailabilityItem,
  ProductVariant,
  PublicUser,
  ServerCart,
  ServerCartLine,
} from '@shop/shared'

export type CartLine = {
  productId: string
  variantId: string | null
  quantity: number
  name: string
  slug: string
  price: number
  image: string | null
  stock: number
  variantLabel: string | null
  sku: string | null
}

export type CartIssue = {
  productId: string
  variantId: string | null
  name: string
  message: string
}

const STORAGE_KEY = 'shop-cart'

function lineKey(productId: string, variantId?: string | null) {
  return `${productId}::${variantId || ''}`
}

function normalizeLine(raw: Partial<CartLine> & { productId: string }): CartLine {
  return {
    productId: raw.productId,
    variantId: raw.variantId ?? null,
    quantity: Number(raw.quantity) || 1,
    name: raw.name || '',
    slug: raw.slug || '',
    price: Number(raw.price) || 0,
    image: raw.image ?? null,
    stock: Number(raw.stock) || 0,
    variantLabel: raw.variantLabel ?? null,
    sku: raw.sku ?? null,
  }
}

function fromServerLine(line: ServerCartLine): CartLine {
  return normalizeLine(line)
}

function readStorage(key = STORAGE_KEY): CartLine[] {
  if (!import.meta.client) {
    return []
  }
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as Array<Partial<CartLine> & { productId: string }>
    return Array.isArray(parsed) ? parsed.map(normalizeLine) : []
  } catch {
    return []
  }
}

function writeStorage(lines: CartLine[]) {
  if (!import.meta.client) {
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
}

function mergeLines(a: CartLine[], b: CartLine[]): CartLine[] {
  const byKey = new Map<string, CartLine>()
  for (const line of [...a, ...b]) {
    const key = lineKey(line.productId, line.variantId)
    const existing = byKey.get(key)
    if (!existing) {
      byKey.set(key, { ...line })
      continue
    }
    byKey.set(key, {
      ...existing,
      ...line,
      quantity: existing.quantity + line.quantity,
      stock: Math.max(existing.stock, line.stock),
    })
  }
  return [...byKey.values()].map((line) => ({
    ...line,
    quantity: Math.max(1, Math.min(line.quantity, Math.max(line.stock, 1))),
  }))
}

function resolveVariantPrice(product: Product, variant?: ProductVariant | null) {
  if (!variant || variant.price === null || variant.price === undefined) {
    return product.price
  }
  return variant.price
}

function isLoggedIn() {
  return Boolean(useState<PublicUser | null>('auth-user').value)
}

export function useCart() {
  const items = useState<CartLine[]>('cart-items', () => [])

  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const canCheckout = computed(
    () =>
      items.value.length > 0 &&
      items.value.every((item) => item.stock >= item.quantity && item.stock > 0),
  )

  function persist() {
    writeStorage(items.value)
  }

  function applyServerCart(cart: ServerCart) {
    items.value = cart.items.map(fromServerLine)
    persist()
  }

  function hydrate() {
    if (!import.meta.client) {
      return
    }
    items.value = readStorage()
  }

  async function pushToServer() {
    if (!import.meta.client || !isLoggedIn()) {
      return
    }
    const api = useApi()
    const next = await api<ServerCart>('/cart', {
      method: 'PUT',
      body: {
        items: items.value.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    })
    applyServerCart(next)
  }

  /**
   * Merge guest cart into the signed-in user's server cart, then sync stock/prices.
   */
  async function mergeForUser(_userId?: string): Promise<CartIssue[]> {
    if (!import.meta.client || !isLoggedIn()) {
      return []
    }

    const guest = readStorage()
    const memory = items.value
    const merged = mergeLines(guest, memory)
    const api = useApi()
    const next = await api<ServerCart>('/cart/merge', {
      method: 'PUT',
      body: {
        items: merged.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    })
    applyServerCart(next)
    return sync()
  }

  function saveForUser(_userId?: string) {
    persist()
  }

  function add(
    product: Product,
    quantity = 1,
    variant?: ProductVariant | null,
  ) {
    if ((product.variants?.length ?? 0) > 0 && !variant) {
      throw new Error('variant_required')
    }

    const amount = Math.max(1, quantity)
    const stock = variant ? variant.stock : product.stock
    const price = resolveVariantPrice(product, variant)
    const key = lineKey(product.id, variant?.id)
    const existing = items.value.find(
      (item) => lineKey(item.productId, item.variantId) === key,
    )
    const displayName = variant
      ? `${product.name} (${variant.label})`
      : product.name

    if (existing) {
      existing.quantity = Math.min(stock, existing.quantity + amount)
      existing.stock = stock
      existing.price = price
      existing.name = displayName
      existing.slug = product.slug
      existing.image = product.images[0] ?? null
      existing.variantLabel = variant?.label ?? null
      existing.sku = variant?.sku ?? null
    } else {
      items.value.push({
        productId: product.id,
        variantId: variant?.id ?? null,
        quantity: Math.min(stock, amount),
        name: displayName,
        slug: product.slug,
        price,
        image: product.images[0] ?? null,
        stock,
        variantLabel: variant?.label ?? null,
        sku: variant?.sku ?? null,
      })
    }

    persist()
    void pushToServer().catch(() => {
      // Keep local cart if server sync fails.
    })

    if (import.meta.client) {
      try {
        useAnalytics().track('add_to_cart', {
          product_id: product.id,
          variant_id: variant?.id,
          product_name: product.name,
          quantity: amount,
          value: price * amount,
        })
      } catch {
        // analytics optional
      }
    }
  }

  function setQuantity(
    productId: string,
    quantity: number,
    variantId: string | null = null,
  ) {
    const item = items.value.find(
      (line) =>
        line.productId === productId && (line.variantId ?? null) === variantId,
    )
    if (!item) {
      return
    }

    if (quantity < 1) {
      remove(productId, variantId)
      return
    }

    item.quantity = Math.min(item.stock, quantity)
    persist()
    void pushToServer().catch(() => {
      // Keep local cart if server sync fails.
    })
  }

  function remove(productId: string, variantId: string | null = null) {
    items.value = items.value.filter(
      (item) =>
        !(item.productId === productId && (item.variantId ?? null) === variantId),
    )
    persist()
    void pushToServer().catch(() => {
      // Keep local cart if server sync fails.
    })
  }

  function clear() {
    items.value = []
    persist()
    if (import.meta.client && isLoggedIn()) {
      void useApi()('/cart', { method: 'DELETE' }).catch(() => {
        // Keep local clear even if server fails.
      })
    }
  }

  async function sync(): Promise<CartIssue[]> {
    if (!items.value.length) {
      return []
    }

    const api = useApi()
    const { products } = await api<{ products: ProductAvailabilityItem[] }>(
      '/products/availability',
      {
        method: 'POST',
        body: {
          items: items.value.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
          })),
        },
      },
    )

    const byKey = new Map(
      products.map((product) => [
        lineKey(product.id, product.variantId),
        product,
      ]),
    )
    const issues: CartIssue[] = []
    const next: CartLine[] = []

    for (const item of items.value) {
      const product = byKey.get(lineKey(item.productId, item.variantId))
      const label = item.name
      if (!product) {
        issues.push({
          productId: item.productId,
          variantId: item.variantId,
          name: label,
          message: 'دیگر موجود نیست',
        })
        continue
      }

      if (product.stock < 1) {
        issues.push({
          productId: item.productId,
          variantId: item.variantId,
          name: product.variantLabel
            ? `${product.name} (${product.variantLabel})`
            : product.name,
          message: 'ناموجود',
        })
        continue
      }

      const quantity = Math.min(item.quantity, product.stock)
      const displayName = product.variantLabel
        ? `${product.name} (${product.variantLabel})`
        : product.name
      if (quantity < item.quantity) {
        issues.push({
          productId: item.productId,
          variantId: item.variantId,
          name: displayName,
          message: `تعداد به ${quantity} کاهش یافت`,
        })
      }

      if (product.price !== item.price) {
        issues.push({
          productId: item.productId,
          variantId: item.variantId,
          name: displayName,
          message: 'قیمت به‌روز شد',
        })
      }

      next.push({
        productId: product.id,
        variantId: product.variantId,
        quantity,
        name: displayName,
        slug: product.slug,
        price: product.price,
        image: product.image,
        stock: product.stock,
        variantLabel: product.variantLabel,
        sku: product.sku,
      })
    }

    items.value = next
    persist()
    if (isLoggedIn()) {
      void pushToServer().catch(() => {
        // Local sync already applied.
      })
    }
    return issues
  }

  return {
    items,
    count,
    subtotal,
    canCheckout,
    hydrate,
    mergeForUser,
    saveForUser,
    add,
    setQuantity,
    remove,
    clear,
    sync,
  }
}
