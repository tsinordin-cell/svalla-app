/**
 * notifyWithRetry.ts — Robustifierad notis-sändning med exponentiell backoff.
 *
 * Problem som löses: fire-and-forget-notiser i API-routes tappas tyst vid
 * transienta fel (DB-timeout, push-service nere, etc). Utan retry syns inte
 * felet i loggar förrän en användare klagar.
 *
 * Strategi:
 *  - 3 försök med exponentiell fördröjning: 1s → 4s → 16s
 *  - Vid slutgiltigt misslyckande: Sentry.captureException + logger.error
 *  - Returnerar void — anroparen behöver inte await:a om det inte är kritiskt
 *
 * Användning:
 *   await notifyWithRetry('forum-reply', () =>
 *     sendPushToUsers(followerIds, { title: '...', body: '...', url: '...' })
 *   )
 */

import * as Sentry from '@sentry/nextjs'
import { logger } from './logger'

const DELAYS_MS = [1_000, 4_000, 16_000] // 1s, 4s, 16s

/**
 * Kör `fn()` upp till 3 gånger med exponentiell backoff.
 * @param context  Kortnamn för logg/Sentry (t.ex. 'forum-reply', 'best-answer')
 * @param fn       Den async-funktion som ska köras (notis-sändning, DB-insert, etc)
 */
export async function notifyWithRetry(
  context: string,
  fn: () => Promise<unknown>
): Promise<void> {
  let lastError: unknown

  for (let attempt = 0; attempt < DELAYS_MS.length; attempt++) {
    try {
      await fn()
      return // Lyckades
    } catch (err) {
      lastError = err
      const isLast = attempt === DELAYS_MS.length - 1

      if (isLast) {
        // Slutgiltigt misslyckande — logga + rapportera till Sentry
        logger.error('notifyWithRetry', `${context} failed after ${DELAYS_MS.length} attempts`, {
          e: err instanceof Error ? err.message : String(err),
          context,
        })
        Sentry.captureException(err, {
          tags: { context: `notify:${context}` },
          extra: { attempts: DELAYS_MS.length },
        })
      } else {
        // Temporärt fel — vänta och försök igen
        const delay = DELAYS_MS[attempt]!
        logger.error('notifyWithRetry', `${context} attempt ${attempt + 1} failed, retrying in ${delay}ms`, {
          e: err instanceof Error ? err.message : String(err),
        })
        await sleep(delay)
      }
    }
  }

  // Nå hit bara om alla försök misslyckades (void return — fel redan loggat)
  void lastError
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
