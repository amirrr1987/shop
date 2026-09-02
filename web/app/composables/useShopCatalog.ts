import type { Product, ShopSort } from '~/types/shop'

const PAGE_SIZE = 8

function sortProducts(items: Product[], sort: ShopSort) {
  const sorted = [...items]

  switch (sort) {
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fa'))
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name, 'fa'))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'best':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'sale':
      return sorted.filter(p => p.badges?.includes('sale') || p.oldPrice)
    case 'new':
    default:
      return sorted.sort((a, b) => Number(b.badges?.includes('new')) - Number(a.badges?.includes('new')))
  }
}

export function useShopCatalog() {
  const route = useRoute()
  const router = useRouter()
  const { catalog: products } = useProduct()

  const query = computed(() => route.query)

  const search = computed(() => String(query.value.q || ''))
  const category = computed(() => String(query.value.category || ''))
  const sort = computed<ShopSort>(() => (query.value.sort as ShopSort) || 'new')
  const page = computed(() => Math.max(1, Number(query.value.page) || 1))
  const view = computed(() => (query.value.view === 'list' ? 'list' : 'grid'))
  const columns = computed<'3' | '4'>(() => {
    if (query.value.cols === '3' || query.value.view === '3col') return '3'
    return '4'
  })
  const sidebar = computed(() => {
    const value = query.value.sidebar
    if (value === 'left' || value === 'right') return value
    return 'none'
  })

  const priceMin = computed(() => Number(query.value.priceMin) || 0)
  const priceMax = computed(() => Number(query.value.priceMax) || 100_000_000)
  const sizes = computed(() => {
    const raw = query.value.sizes
    if (!raw) return [] as string[]
    return Array.isArray(raw) ? raw.map(String) : [String(raw)]
  })
  const colors = computed(() => {
    const raw = query.value.colors
    if (!raw) return [] as string[]
    return Array.isArray(raw) ? raw.map(String) : [String(raw)]
  })
  const inStockOnly = computed(() => query.value.inStock === '1')

  const filteredProducts = computed(() => {
    let result = [...(products?.value ?? [])]

    if (search.value) {
      const q = search.value.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q)
        || p.brand.toLowerCase().includes(q)
        || p.category.toLowerCase().includes(q)
      )
    }

    if (category.value) {
      result = result.filter(p => p.category === category.value)
    }

    result = result.filter(p => p.price >= priceMin.value && p.price <= priceMax.value)

    if (inStockOnly.value) {
      result = result.filter(p => p.inStock)
    }

    if (sizes.value.length) {
      result = result.filter(p => p.sizes?.some(s => sizes.value.includes(s)))
    }

    if (colors.value.length) {
      result = result.filter(p => p.colors?.some(c => colors.value.includes(c)))
    }

    return sortProducts(result, sort.value)
  })

  const totalProducts = computed(() => filteredProducts.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalProducts.value / PAGE_SIZE)))

  const paginatedProducts = computed(() => {
    const start = (page.value - 1) * PAGE_SIZE
    return filteredProducts.value.slice(start, start + PAGE_SIZE)
  })

  function updateQuery(patch: Record<string, string | number | string[] | undefined>) {
    const next: Record<string, string | string[]> = {}

    for (const [key, value] of Object.entries({ ...query.value, ...patch })) {
      if (value === undefined || value === '' || value === null) continue
      next[key] = Array.isArray(value) ? value.map(String) : String(value)
    }

    router.push({ path: '/shop', query: next })
  }

  function setView(nextView: 'grid' | 'list') {
    if (nextView === 'list') {
      updateQuery({ view: 'list', page: 1 })
      return
    }

    updateQuery({ view: undefined, cols: undefined, page: 1 })
  }

  function setSort(nextSort: ShopSort) {
    updateQuery({ sort: nextSort, page: 1 })
  }

  function setPage(nextPage: number) {
    updateQuery({ page: nextPage })
  }

  function setSidebar(nextSidebar: 'none' | 'left' | 'right') {
    updateQuery({ sidebar: nextSidebar === 'none' ? undefined : nextSidebar, page: 1 })
  }

  function setColumns(nextColumns: '3' | '4') {
    updateQuery({
      cols: nextColumns === '4' ? undefined : '3',
      view: undefined,
      page: 1
    })
  }

  function resetFilters() {
    router.push({ path: '/shop' })
  }

  return {
    search,
    category,
    sort,
    page,
    view,
    columns,
    sidebar,
    priceMin,
    priceMax,
    sizes,
    colors,
    inStockOnly,
    filteredProducts,
    paginatedProducts,
    totalProducts,
    totalPages,
    pageSize: PAGE_SIZE,
    updateQuery,
    setView,
    setSort,
    setPage,
    setSidebar,
    setColumns,
    resetFilters
  }
}
