export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const { pageview } = useAnalytics()

  const umamiHost = String(config.public.umamiHost || '').replace(/\/$/, '')
  const umamiWebsiteId = String(config.public.umamiWebsiteId || '')
  const ga4Id = String(config.public.ga4Id || '')

  useHead(() => {
    const scripts: Array<Record<string, unknown>> = []

    if (umamiHost && umamiWebsiteId) {
      scripts.push({
        src: `${umamiHost}/script.js`,
        defer: true,
        'data-website-id': umamiWebsiteId,
        'data-auto-track': 'false',
      })
    }

    if (ga4Id) {
      scripts.push(
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`,
          async: true,
        },
        {
          children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:false});`,
          type: 'text/javascript',
        },
      )
    }

    return { script: scripts }
  })

  router.afterEach((to) => {
    pageview(to.fullPath, typeof document !== 'undefined' ? document.title : to.path)
  })
})
