import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    federation({
      name: 'host',
      filename: 'hostEntry.js',
      remotes: {
        // remotePermissions: 'http://localhost:5911/assets/permissionsEntry.js',
      },
      shared: ['vue', 'pinia', 'vue-router', 'ant-design-vue'],
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5910,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
