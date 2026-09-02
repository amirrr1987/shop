// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  devServer: {
    host: process.env.SHOP_WEB_HOST ?? '0.0.0.0',
    port: Number(process.env.SHOP_WEB_PORT ?? 3000),
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.SHOP_API_URL ?? 'http://localhost:3002',
      webUrl: process.env.SHOP_WEB_URL ?? 'http://localhost:3000',
      panelUrl: process.env.SHOP_PANEL_URL ?? 'http://localhost:3001',
      sentry: {
        dsn: process.env.NUXT_PUBLIC_SENTRY_DSN || '',
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: Number(process.env.NUXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0.1')
      }
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@sentry/nuxt',
    '@nuxtjs/device',
    'nuxt-swiper',
    'nuxt-echarts'
  ],
  eslint: {
    config: {
      typescript: true
    }
  },
  css: ['~/assets/css/main.css'],
  image: {
    provider: 'none'
  },
  sentry: {
    sourceMapsUploadOptions: {
      enabled: Boolean(process.env.SENTRY_AUTH_TOKEN)
    }
  },
  echarts: {
    renderer: 'svg',
    charts: ['BarChart', 'LineChart', 'PieChart'],
    components: [
      'GridComponent',
      'TooltipComponent',
      'LegendComponent',
      'TitleComponent'
    ]
  },
  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      title: 'روزر — فروشگاه الکترونیک'
    }
  }
})