import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { abilitiesPlugin } from '@casl/vue'
import * as Sentry from '@sentry/vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'nprogress/nprogress.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import { ability } from './ability'

const app = createApp(App)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined
if (sentryDsn) {
  Sentry.init({
    app,
    dsn: sentryDsn,
    environment:
      (import.meta.env.VITE_SENTRY_ENVIRONMENT as string | undefined) ||
      import.meta.env.MODE,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.1),
    sendDefaultPii: false,
  })
}

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VueQueryPlugin, { queryClient })
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

app.mount('#app')
