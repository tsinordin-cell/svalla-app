// Svalla service worker — push notifications + offline cache

const CACHE = 'svalla-v2'
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

// Fetch — network-first för API, cache-first för statiska resurser
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Hoppa över externa resurser och POST
  if (request.method !== 'GET') return
  if (!url.origin.includes(self.location.origin)) return

  // API-anrop: network-first
  if (url.pathname.startsWith('/api/') || url.pathname.includes('supabase')) {
    event.respondWith(
      fetch(request).catch(() => new Response(JSON.stringify({ error: 'offline' }), {
        headers: { 'Content-Type': 'application/json' }
      }))
    )
    return
  }

  // Statiska assets (_next/static): cache-first
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(r => {
        const clone = r.clone()
        caches.open(CACHE).then(c => c.put(request, clone))
        return r
      }))
    )
    return
  }

  // Sidor: stale-while-revalidate
  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request)
      const networkFetch = fetch(request).then(r => {
        if (r.ok) cache.put(request, r.clone())
        return r
      }).catch(() => cached)
      return cached || networkFetch
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
