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
    },
  },

  routeRules: {
    '/auth/login': { redirect: '/login' },
  },
})
