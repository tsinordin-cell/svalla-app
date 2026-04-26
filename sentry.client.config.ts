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
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Stäng av debug-output i produktion
  debug: false,

  // Ignorera kända icke-actionable fel
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Non-Error promise rejection captured',
    /ChunkLoadError/,
  ],
})
