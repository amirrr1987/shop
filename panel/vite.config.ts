import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const shopRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, shopRoot, '')
  const port = Number(env.SHOP_PANEL_PORT ?? env.PORT ?? 3001)
  const host = env.SHOP_PANEL_HOST ?? '0.0.0.0'

  return {
    envDir: shopRoot,
    envPrefix: ['VITE_', 'SHOP_'],
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host,
      port,
      strictPort: true,
    },
  }
})
