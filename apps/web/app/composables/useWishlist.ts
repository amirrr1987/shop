import type {
  Product,
  ProductAvailabilityItem,
  PublicUser,
  WishlistItem,
} from '@shop/shared'

export type { WishlistItem }

const STORAGE_KEY = 'shop-wishlist'

function readStorage(): WishlistItem[] {
  if (!import.meta.client) {
    return []
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as WishlistItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStorage(items: WishlistItem[]) {
  if (!import.meta.client) {
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useWishlist() {
  const items = useState<WishlistItem[]>('wishlist-items', () => [])
  const user = useState<PublicUser | null>('auth-user')

  const count = computed(() => items.value.length)

  const ids = computed(() => new Set(items.value.map((item) => item.productId)))

  function persist() {
    writeStorage(items.value)
  }

  function hydrate() {
    if (!import.meta.client) {
      return
    }
    items.value = readStorage()
  }

  function has(productId: string) {
    return ids.value.has(productId)
  }

  function isLoggedIn() {
    return Boolean(user.value)
  }

  function applyServerList(next: WishlistItem[]) {
    items.value = next
    persist()
  }

  /** Merge guest local ids into server wishlist (login / session restore). */
  async function mergeForUser() {
    if (!import.meta.client || !isLoggedIn()) {
      return
    }

    // Auth plugin may run before wishlist hydrate — read storage directly.
    const localIds = readStorage().map((item) => item.productId)
    const memoryIds = items.value.map((item) => item.productId)
    const productIds = [...new Set([...localIds, ...memoryIds])]

    const api = useApi()
    const next = await api<WishlistItem[]>('/wishlist/merge', {
      method: 'PUT',
      body: { productIds },
    })
    applyServerList(next)
  }

  async function pullFromServer() {
    if (!import.meta.client || !isLoggedIn()) {
      return
    }
    const api = useApi()
    const next = await api<WishlistItem[]>('/wishlist')
    applyServerList(next)
  }

  async function add(product: Product) {
    if (has(product.id)) {
      return
    }

    if (isLoggedIn()) {
      const api = useApi()
      const next = await api<WishlistItem[]>(`/wishlist/${product.id}`, {
        method: 'POST',
      })
      applyServerList(next)
      return
    }

    items.value.push({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] ?? null,
      stock: product.stock,
    })
    persist()
  }

  async function remove(productId: string) {
    if (isLoggedIn()) {
      const api = useApi()
      const next = await api<WishlistItem[]>(`/wishlist/${productId}`, {
        method: 'DELETE',
      })
      applyServerList(next)
      return
    }

    items.value = items.value.filter((item) => item.productId !== productId)
    persist()
  }

  async function toggle(product: Product) {
    if (has(product.id)) {
      await remove(product.id)
      return false
    }
    await add(product)
    return true
  }

  async function clear() {
    if (isLoggedIn()) {
      const api = useApi()
      const next = await api<WishlistItem[]>('/wishlist', {
        method: 'DELETE',
      })
      applyServerList(next)
      return
    }

    items.value = []
    persist()
  }

  async function sync() {
    if (isLoggedIn()) {
      await pullFromServer()
      return
    }

    if (!items.value.length) {
      return
    }

    const api = useApi()
    const { products } = await api<{ products: ProductAvailabilityItem[] }>(
      '/products/availability',
      {
        method: 'POST',
        body: {
          productIds: items.value.map((item) => item.productId),
        },
      },
    )

    const byId = new Map(products.map((product) => [product.id, product]))
    const next: WishlistItem[] = []

    for (const item of items.value) {
      const product = byId.get(item.productId)
      if (!product) {
        continue
      }
      next.push({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        stock: product.stock,
      })
    }

    items.value = next
    persist()
  }

  return {
    items,
    count,
    has,
    hydrate,
    add,
    remove,
    toggle,
    clear,
    sync,
    mergeForUser,
    pullFromServer,
  }
}
