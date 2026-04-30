/**
 * Strukturerad logger för Svalla.
 *
 * Server-side: skriver JSON-rader till stdout — Vercel/Sentry fångar dem.
 * Client-side: skriver till console med nivå-prefix.
 *
 * Användning:
 *   import { logger } from '@/lib/logger'
 *   logger.info('feed', 'Laddade turer', { count: 12 })
 *   logger.warn('push', 'VAPID-nyckel saknas')
 *   logger.error('auth', 'Session expired', { userId })
 */

type Level = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  ts:      string
  level:   Level
  scope:   string
  message: string
  [key: string]: unknown
}

function emit(level: Level, scope: string, message: string, meta?: Record<string, unknown>) {
  const entry: LogEntry = {
    ts:      new Date().toISOString(),
    level,
    scope,
    message,
    ...meta,
  }

  if (typeof window === 'undefined') {
    // Server: strukturerad JSON — parsas av Vercel / Sentry
    const line = JSON.stringify(entry)
    if (level === 'error' || level === 'warn') {
      process.stderr.write(line + '\n')
    } else {
      process.stdout.write(line + '\n')
    }
  } else {
    // Klient: färgkodade console-anrop
    const prefix = `[${entry.ts.slice(11, 19)}] [${scope}]`
    if (level === 'error')      console.error(prefix, message, meta ?? '')
    else if (level === 'warn')  console.warn(prefix,  message, meta ?? '')
    else if (level === 'debug') console.debug(prefix, message, meta ?? '')
    else                        console.log(prefix,   message, meta ?? '')
  }
}

export const logger = {
  debug: (scope: string, message: string, meta?: Record<string, unknown>) =>
    emit('debug', scope, message, meta),
  info:  (scope: string, message: string, meta?: Record<string, unknown>) =>
    emit('info',  scope, message, meta),
  warn:  (scope: string, message: string, meta?: Record<string, unknown>) =>
    emit('warn',  scope, message, meta),
  error: (scope: string, message: string, meta?: Record<string, unknown>) =>
    emit('error', scope, message, meta),
}
