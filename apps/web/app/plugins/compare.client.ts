export default defineNuxtPlugin(() => {
  const { hydrate } = useCompare()
  const ready = useState('compare-storage-ready', () => false)

  onNuxtReady(() => {
    hydrate()
    ready.value = true
  })
})
