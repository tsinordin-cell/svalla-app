import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 0.2,

  debug: false,

  // Ignorera vanliga 4xx som inte är bugs
  ignoreErrors: [
    'NEXT_NOT_FOUND',
  ],
})
