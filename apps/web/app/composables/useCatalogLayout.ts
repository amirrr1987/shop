import type {
  CatalogFilterPosition,
  CatalogGridColumns,
  StoreSettings,
} from '@shop/shared'

const STORAGE_KEY = 'shop:catalog-layout'

export type CatalogViewMode = 'grid' | 'list'

type CatalogLayout = {
  filterPosition: CatalogFilterPosition
  gridColumns: CatalogGridColumns
  viewMode: CatalogViewMode
}

function readStored(): Partial<CatalogLayout> {
  if (!import.meta.client) return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<CatalogLayout>
  } catch {
    return {}
  }
}

function writeStored(value: CatalogLayout) {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

export function useCatalogLayout() {
  const settings = useStoreSettingsState()
  const stored = ref<Partial<CatalogLayout>>(readStored())

  const filterPosition = computed<CatalogFilterPosition>({
    get: () =>
      stored.value.filterPosition
      ?? settings.value.catalogFilterPosition
      ?? 'end',
    set: (value) => {
      stored.value = { ...stored.value, filterPosition: value }
      writeCurrent()
    },
  })

  const gridColumns = computed<CatalogGridColumns>({
    get: () =>
      stored.value.gridColumns
      ?? settings.value.catalogGridColumns
      ?? 4,
    set: (value) => {
      stored.value = { ...stored.value, gridColumns: value }
      writeCurrent()
    },
  })

  const viewMode = computed<CatalogViewMode>({
    get: () => stored.value.viewMode ?? 'grid',
    set: (value) => {
      stored.value = { ...stored.value, viewMode: value }
      writeCurrent()
    },
  })

  function writeCurrent() {
    writeStored({
      filterPosition: filterPosition.value,
      gridColumns: gridColumns.value,
      viewMode: viewMode.value,
    })
  }

  const gridClass = computed(() => {
    if (viewMode.value === 'list') {
      return 'flex flex-col gap-4'
    }
    const cols = gridColumns.value
    if (cols === 3) return 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
    if (cols === 5) return 'grid gap-6 sm:grid-cols-2 lg:grid-cols-5'
    return 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4'
  })

  const isTopFilters = computed(() => filterPosition.value === 'top')
  const isStartFilters = computed(() => filterPosition.value === 'start')
  const isListView = computed(() => viewMode.value === 'list')

  function setFilterPosition(value: CatalogFilterPosition) {
    filterPosition.value = value
  }

  function setGridColumns(value: CatalogGridColumns) {
    gridColumns.value = value
    if (viewMode.value === 'list') {
      viewMode.value = 'grid'
    }
  }

  function setViewMode(value: CatalogViewMode) {
    viewMode.value = value
  }

  watch(
    () => settings.value as StoreSettings,
    () => {
      // Re-read when settings hydrate if user has no override yet.
      if (
        !stored.value.filterPosition
        && !stored.value.gridColumns
        && !stored.value.viewMode
      ) {
        stored.value = readStored()
      }
    },
    { deep: true },
  )

  return {
    filterPosition,
    gridColumns,
    viewMode,
    gridClass,
    isTopFilters,
    isStartFilters,
    isListView,
    setFilterPosition,
    setGridColumns,
    setViewMode,
  }
}
