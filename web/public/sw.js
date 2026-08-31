// Minimal service worker so stale registrations on localhost do not hit Vue Router.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', () => {
  // Network-only: no offline caching for this storefront.
})
