const CACHE = 'inflow-v1'

// On install: skip waiting so the SW activates immediately
self.addEventListener('install', () => self.skipWaiting())

// On activate: claim clients and delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch: network-first, fall back to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests for same-origin or cdn resources
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache a clone of successful responses
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached
          // For navigation requests (HTML), return the cached root
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
          return new Response('Offline', { status: 503 })
        })
      )
  )
})
