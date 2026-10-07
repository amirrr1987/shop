/** Mark account / auth / checkout-style pages as non-indexable. */
export function usePrivateSeo(title: string, path?: string) {
  const route = useRoute()
  useShopSeo({
    title,
    path: path ?? route.path,
    noindex: true,
  })
}
