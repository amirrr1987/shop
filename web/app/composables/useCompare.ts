import { storeToRefs } from 'pinia'
import { useCompareStore } from '~/stores/compare.store'

export function useCompare() {
  const store = useCompareStore()
  const { items, count } = storeToRefs(store)
  const { maxItems, toggle, has, remove, clear } = store
  return { items, count, maxItems, toggle, has, remove, clear }
}
