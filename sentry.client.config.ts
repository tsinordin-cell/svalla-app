import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Felrapporterna går via vår egen adress (src/app/api/sentry-tunnel/route.ts),
  // så att CSP:n släpper igenom dem och annonsblockerare inte stoppar dem.
  tunnel: '/api/sentry-tunnel',

  // Bara fel, 2026-11-22. Spårning (traces) och sessionsinspelning (replay)
  // är avstängda: de har aldrig körts i webbläsaren, gör sidorna tyngre och
  // inspelning av besökares sessioner bör vänta tills samtycke finns i
  // cookie-rutan.

  // Skicka inte cookies/headers/IP automatiskt — vi har auth-cookies med Supabase JWTs.
  sendDefaultPii: false,

  // Stäng av debug-output i produktion
  debug: false,

  // Sanera URL:er — querystrings kan innehålla email, magic-link-tokens, session_id.
  beforeSend(event) {
    if (event.request?.url) {
      try {
        const u = new URL(event.request.url)
        for (const key of ['token', 'access_token', 'refresh_token', 'email', 'session_id', 'code', 'state']) {
          if (u.searchParams.has(key)) u.searchParams.set(key, '[redacted]')
        }
        event.request.url = u.toString()
      } catch {
        /* ignore parse errors */
      }
    }
    return event
  },

  // Ignorera kända icke-actionable fel
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Non-Error promise rejection captured',
    /ChunkLoadError/,
  ],
})
