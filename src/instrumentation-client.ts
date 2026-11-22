// Startar Sentry i webbläsaren (Next.js 15.3+ laddar den här filen före sidan).
// Tidigare laddades sentry.client.config.ts aldrig, eftersom vi inte använder
// withSentryConfig, så inga webbläsarfel nådde Sentry. 2026-11-22.
//
// Sentry laddas först när webbläsaren har tid över (requestIdleCallback), som en
// egen fil. Mätt i förhandsbygget: inläst direkt lade Sentry ca 120 kB (gzip) i
// den fil som varje sida laddar först. Priset för att vänta: fel under sidans
// allra första sekunder fångas inte.
function startaSentry() {
  import('../sentry.client.config')
    .then(async () => {
      // Provfel: svalla.se/?sentry-prov=1 skickar ett fel till Sentry, så att vi
      // kan bevisa hela kedjan (webbläsare → /api/sentry-tunnel → Sentry).
      if (new URLSearchParams(window.location.search).get('sentry-prov') !== '1') return
      const Sentry = await import('@sentry/nextjs')
      Sentry.captureException(new Error('Svalla: provfel från webbläsaren (sentry-prov)'), {
        tags: { prov: 'ja' },
      })
    })
    .catch(() => {
      /* Sentry får aldrig fälla sidan */
    })
}

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startaSentry, { timeout: 4000 })
  } else {
    setTimeout(startaSentry, 2000)
  }
}
