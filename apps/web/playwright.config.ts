import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const webPort = Number(process.env.E2E_WEB_PORT || 4000)
const webOrigin = process.env.E2E_WEB_URL || `http://127.0.0.1:${webPort}`

/**
 * Prefer a locally installed browser (no Playwright CDN download).
 * E2E_BROWSER_CHANNEL=chrome | msedge | chromium (bundled; needs download)
 */
const browserChannel = (process.env.E2E_BROWSER_CHANNEL || 'chrome') as
  | 'chrome'
  | 'msedge'
  | 'chromium'

/**
 * Storefront purchase E2E.
 * Requires API on E2E_API_URL (default http://127.0.0.1:4001) with seed + mock payments.
 * Offline / filtered networks: use Chrome/Edge channel — skip `playwright install`.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: webOrigin,
    trace: 'on-first-retry',
    headless: !!process.env.CI,
    locale: 'fa-IR',
  },
  projects: [
    {
      name: browserChannel === 'msedge' ? 'msedge' : 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        ...(browserChannel === 'chromium'
          ? {}
          : { channel: browserChannel }),
      },
    },
  ],
  webServer: {
    command: 'pnpm exec nuxt dev --host 127.0.0.1 --port ' + String(webPort),
    url: webOrigin,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})

