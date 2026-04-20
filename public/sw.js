// Svalla service worker — push notifications + offline cache

const CACHE = 'svalla-v3'
const STATIC = ['/feed', '/platser', '/rutter', '/topplista', '/logga', '/icon-192.png']

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {}))
  )
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// Fetch — network-first för HTML, cache-first för hashed assets
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Hoppa över externa resurser och POST
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // API-anrop: network-first, ingen cache
  if (url.pathname.startsWith('/api/') || url.pathname.includes('supabase')) {
    event.respondWith(
      fetch(request).catch(() => new Response(JSON.stringify({ error: 'offline' }), {
        headers: { 'Content-Type': 'application/json' }
      }))
    )
    return
  }

  // _next/static/chunks & _next/static/css:
  // Cache-first är OK BARA för content-hashed filer (hash i filnamnet).
  // HTML-sidor ska ALDRIG cachas aggressivt — de pekar på nya chunk-hashar efter deploy.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        // Alltid hämta ny version i bakgrunden för att hålla cachen fräsch
        const networkFetch = fetch(request).then(r => {
          if (r.ok) {
            caches.open(CACHE).then(c => c.put(request, r.clone()))
          }
          return r
        })
        // Returnera cachat direkt om det finns (hashed filnamn = immutable)
        return cached || networkFetch
      })
    )
    return
  }

  // HTML-sidor: network-first — ALDRIG stale-while-revalidate.
  // Gammal HTML + nya chunk-hashar = ChunkLoadError.
  // Fallback till cache ENDAST vid nätverksfel (offline).
  event.respondWith(
    fetch(request)
      .then(r => {
        // Spara i cache för offline-fallback, men hämta alltid live
        if (r.ok) {
          caches.open(CACHE).then(c => c.put(request, r.clone()))
        }
        return r
      })
      .catch(async () => {
        // Offline — försök med cache
        const cached = await caches.match(request)
        return cached || new Response('Offline', { status: 503 })
      })
  )
})

// Push event — visa notis
self.addEventListener('push', event => {
  const data = event.data?.json() ?? {}
  const title = data.title ?? 'Svalla'
  const options = {
    body: data.body ?? 'Ny aktivitet i skärgården',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    data: { url: data.url ?? '/feed' },
    vibrate: [100, 50, 100],
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

// Klick på notis — öppna rätt URL
self.addEventListener('notificationclick', event => {
  event.notification.close()
  const url = event.notification.data?.url ?? '/feed'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      const existing = clients.find(c => c.url.includes(self.location.origin))
      if (existing) return existing.focus().then(c => c.navigate(url))
      return self.clients.openWindow(url)
    })
  )
})
