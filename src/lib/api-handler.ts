/**
 * api-handler — wrapper för Next.js route-handlers som rapporterar fel till Sentry.
 *
 * Användning:
 *   import { withSentry } from '@/lib/api-handler'
 *   export const POST = withSentry(async (req) => { ... }, 'forum/posts')
 *
 * Wrappern fångar oväntade exceptions, skickar till Sentry med route-tag,
 * och returnerar en generisk 500 till klienten (inga stack traces läcks).
 */

import * as Sentry from '@sentry/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export type RouteContext<T = Record<string, string>> = {
  params: Promise<T>
}

export function withSentry<T = Record<string, string>>(
  handler: (req: NextRequest, ctx: RouteContext<T>) => Promise<NextResponse>,
  routeName: string,
) {
  return async (req: NextRequest, ctx: RouteContext<T>): Promise<NextResponse> => {
    try {
      return await handler(req, ctx)
    } catch (err) {
      Sentry.captureException(err, {
        tags: { route: routeName, method: req.method },
        extra: { url: req.url },
      })
      // I dev: skriv ut till console för felsökning
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[api/${routeName}] uncaught:`, err)
      }
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

/**
 * Variant utan params — för enklare routes som inte använder dynamic segments.
 */
export function withSentrySimple(
  handler: (req: NextRequest) => Promise<NextResponse>,
  routeName: string,
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req)
    } catch (err) {
      Sentry.captureException(err, {
        tags: { route: routeName, method: req.method },
        extra: { url: req.url },
      })
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[api/${routeName}] uncaught:`, err)
      }
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
