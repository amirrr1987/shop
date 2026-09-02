export type HomeVersion = '1' | '2' | '3' | '4'

export function useHomeVariant() {
  const route = useRoute()
  const router = useRouter()

  const version = computed<HomeVersion>(() => {
    const v = route.query.v
    if (v === '2' || v === '3' || v === '4') return v
    return '1'
  })

  function setVersion(next: HomeVersion) {
    router.push({
      path: '/',
      query: next === '1' ? {} : { v: next }
    })
  }

  return { version, setVersion }
}
