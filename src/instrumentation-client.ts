// Startar Sentry i webbläsaren (Next.js 15.3+ laddar den här filen före sidan).
// Tidigare laddades sentry.client.config.ts aldrig, eftersom vi inte använder
// withSentryConfig, så inga webbläsarfel nådde Sentry. 2026-11-22.
import * as Sentry from '@sentry/nextjs'
import '../sentry.client.config'

// Provfel: svalla.se/?sentry-prov=1 skickar ett fel till Sentry, så att vi kan
// bevisa att hela kedjan fungerar (webbläsare → /api/sentry-tunnel → Sentry).
try {
  if (new URLSearchParams(window.location.search).get('sentry-prov') === '1') {
    Sentry.captureException(new Error('Svalla: provfel från webbläsaren (sentry-prov)'), {
      tags: { prov: 'ja' },
    })
  }
} catch {
  /* ignorera */
}
