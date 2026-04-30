// Svalla service worker — push notifications + offline cache

const CACHE = 'svalla-v6'
// Cача BARA statiska assets — ALDRIG HTML-sidor eller RSC-payloads.
// HTML-sidor är dynamiska och RSC-payloads matchar inte vanliga navigeringar —
// att cacha dem blandar ihop formaten och kraschar React-hydreringen.
const STATIC = ['/icon-192.png']

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

// Fetch — network-first för HTML + RSC, cache-first för hashed assets
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
  // NETWORK-FIRST för att undvika att cross-build stale chunks serveras.
  // Content-hashade filer byter namn per build; om SW från tidigare build
  // hänger kvar kan dess cache innehålla chunks som inte längre matchar
  // den serverade HTML:en — det leder till att appens bootstrap importerar
  // symboler som inte finns i den gamla bundle:n och kastar runtime-fel
  // under hydration (vilket landar i app/feed/error.tsx).
  //
  // Strategi: network-first, fall back till cache bara vid offline.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      fetch(request).then(r => {
        if (r.ok) {
          caches.open(CACHE).then(c => c.put(request, r.clone()))
        }
        return r
      }).catch(() => caches.match(request).then(c => c || Response.error()))
    )
    return
  }

  // HTML-sidor och RSC-navigeringar: network-only — ingen cache.
  // RSC-payloads och HTML har olika format och ska ALDRIG blandas i cachen.
  // Om nätet är nere returnerar vi ett användarvänligt felmeddelande.
  event.respondWith(
    fetch(request).catch(async () => {
      // Offline — returnera en minimalistisk offline-sida
      return new Response(
        `<!DOCTYPE html><html lang="sv"><head><meta charset="utf-8"><title>Svalla – Offline</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>body{font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#e8f0f5;text-align:center;padding:24px}h1{color:#1e5c82;font-size:22px;margin:0 0 8px}.e{font-size:48px;display:block;margin:0 0 16px}</style>
        </head><body><main><span class="e">⚓</span><h1>Du är offline</h1>
        <p style="color:#5a7a8a;font-size:14px;margin:0 0 20px">Kontrollera din anslutning och försök igen.</p>
        <a href="/feed" style="display:inline-block;padding:12px 24px;border-radius:14px;background:linear-gradient(135deg,#1e5c82,#2d7d8a);color:#fff;text-decoration:none;font-weight:600;font-size:14px">Försök igen</a>
        </main></body></html>`,
        { status: 503, headers: { 'Content-Type': 'text/html;charset=utf-8' } }
      )
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
