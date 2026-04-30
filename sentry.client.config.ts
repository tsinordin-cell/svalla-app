import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Fånga 20% av alla traces — justeras upp när trafiken ökar
  tracesSampleRate: 0.2,

  // Spela in 5% av sessioner, 100% vid fel
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      // Maska inputs alltid — användarinmatning kan innehålla email/lösen/PII.
      // maskAllText avstängd så replays fortfarande är användbara för debug,
      // men element med klassen .sentry-mask maskas (forms, profilfält etc).
      maskAllInputs: true,
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

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
