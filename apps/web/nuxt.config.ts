// https://nuxt.com/docs/api/configuration/nuxt-config
const sentryDsn = process.env.NUXT_PUBLIC_SENTRY_DSN || ''
const apiProxy = process.env.NUXT_API_PROXY || 'http://127.0.0.1:4001'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    // Only load Sentry when a DSN is configured (avoids RAM/OOM in local dev).
    ...(sentryDsn ? ['@sentry/nuxt/module'] : []),
  ],
  css: ['~/assets/css/main.css'],
  // Offline Fontsource in main.css — do not fetch Google Fonts via @nuxt/fonts.
  ui: {
    fonts: false,
  },
  devtools: { enabled: false },
  icon: {
    // Prefer local @iconify-json/lucide (no Iconify API fetch in SSR).
    serverBundle: {
      collections: ['lucide'],
    },
    // Default `/api/_nuxt_icon` collides with Nest proxy (`/api/**`).
    localApiEndpoint: '/_nuxt_icon',
  },
  // 3000 is in Windows Hyper-V excluded range 2905–3004
  devServer: {
    port: 4000,
  },
  // Avoid Vite cold-start "#app-manifest" resolution errors with routeRules
  // https://github.com/nuxt/nuxt/issues/33606
  experimental: {
    appManifest: false,
  },
  runtimeConfig: {
    // Nest origin for SSR $fetch + sitemap (never expose to client).
    apiProxy,
    public: {
      // Browser calls same-origin /api → routeRules → Nest (auth cookies stay on web host).
      apiBase: '/api',
      /** Canonical origin for SEO (canonical/OG/sitemap). e.g. https://shop.example.ir */
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
      sentryDsn,
      sentryEnvironment:
        process.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT ||
        process.env.NODE_ENV ||
        'development',
      /** e.g. https://analytics.example.com — empty disables Umami */
      umamiHost: process.env.NUXT_PUBLIC_UMAMI_HOST || '',
      umamiWebsiteId: process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID || '',
      /** e.g. G-XXXXXXXX — empty disables GA4 */
      ga4Id: process.env.NUXT_PUBLIC_GA4_ID || '',
    },
  },
  ...(sentryDsn
    ? {
        sentry: {
          sourceMapsUploadOptions: {
            enabled: false,
          },
        },
      }
    : {}),
  routeRules: {
    '/api/**': { proxy: `${apiProxy}/**` },
    '/uploads/**': { proxy: `${apiProxy}/uploads/**` },
  },
})
