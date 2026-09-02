import { blogPosts } from '~/data/blog'

export function useBlogCatalog() {
  const route = useRoute()
  const router = useRouter()

  const layout = computed(() => route.query.layout === 'list' ? 'list' : 'grid')
  const sidebar = computed(() => {
    const value = route.query.sidebar
    if (value === 'left' || value === 'right') return value
    return 'none'
  })
  const category = computed(() => String(route.query.category || ''))
  const page = computed(() => Math.max(1, Number(route.query.page) || 1))

  const PAGE_SIZE = 4

  const filteredPosts = computed(() => {
    if (!category.value) return blogPosts
    return blogPosts.filter(p => p.category === category.value)
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredPosts.value.length / PAGE_SIZE))
  )

  const paginatedPosts = computed(() => {
    const start = (page.value - 1) * PAGE_SIZE
    return filteredPosts.value.slice(start, start + PAGE_SIZE)
  })

  function updateQuery(patch: Record<string, string | number | undefined>) {
    const next: Record<string, string> = {}
    for (const [key, value] of Object.entries({ ...route.query, ...patch })) {
      if (value !== undefined && value !== '') {
        next[key] = String(value)
      }
    }
    router.push({ path: '/blog', query: next })
  }

  function setLayout(next: 'grid' | 'list') {
    updateQuery({ layout: next === 'grid' ? undefined : next, page: 1 })
  }

  function setSidebar(next: 'none' | 'left' | 'right') {
    updateQuery({ sidebar: next === 'none' ? undefined : next, page: 1 })
  }

  function setCategory(next: string) {
    updateQuery({ category: next || undefined, page: 1 })
  }

  function setPage(next: number) {
    updateQuery({ page: next })
  }

  return {
    layout,
    sidebar,
    category,
    page,
    paginatedPosts,
    filteredPosts,
    totalPages,
    pageSize: PAGE_SIZE,
    setLayout,
    setSidebar,
    setCategory,
    setPage
  }
}
