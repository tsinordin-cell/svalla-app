/**
 * Distributed rate limiter med Upstash Redis (REST-API) och in-memory-fallback.
 *
 * - Om UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN är satta i env:
 *   använd Upstash. Funkar cross-instance i Vercel/serverless.
 * - Annars: fall tillbaka på in-memory Map (samma beteende som tidigare).
 *
 * Algoritm: fixed window via INCR + EXPIRE NX. Atomic via Upstash pipeline.
 *
 * Failure-mode: vid Upstash-timeout/fel tillåts request (fail-open).
 * Bättre att släppa igenom legitim trafik än att 429:a hela appen om Redis
 * är nere. Critical paths har också extra signaturer (auth/CSRF) bakom.
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const inMemoryLimits = new Map<string, RateLimitEntry>()

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const HAS_UPSTASH   = !!(UPSTASH_URL && UPSTASH_TOKEN)

async function checkUpstash(key: string, max: number, windowMs: number): Promise<boolean> {
  const ttlSec = Math.max(1, Math.ceil(windowMs / 1000))
  const rkey   = `rl:${key}`

  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type':  'application/json',
      },
      // Atomic pipeline: INCR followed by EXPIRE-if-not-set.
      // EXPIRE NX gör att TTL bara sätts vid första increment i fönstret —
      // efterföljande inkrement bibehåller samma utgångstid.
      body: JSON.stringify([
        ['INCR', rkey],
        ['EXPIRE', rkey, String(ttlSec), 'NX'],
      ]),
      // Kort timeout — om Redis är slö ska vi inte blockera användaren.
      signal: AbortSignal.timeout(2000),
    })

    if (!res.ok) {
      // Fail-open: tillåt request hellre än att 429:a på Redis-fel.
      return true
    }

    const data = await res.json() as Array<{ result: number | string }>
    const count = Number(data[0]?.result ?? 0)
    return count <= max
  } catch {
    // Network error / timeout / abort → fail-open.
    return true
  }
}

function checkInMemory(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = inMemoryLimits.get(key)

  if (!entry || now > entry.resetTime) {
    inMemoryLimits.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (entry.count >= max) {
    return false
  }

  entry.count++
  return true
}

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<boolean> {
  if (HAS_UPSTASH) {
    return checkUpstash(key, maxRequests, windowMs)
  }
  return checkInMemory(key, maxRequests, windowMs)
}

// Cleanup-loop för in-memory-fallback. Körs bara om Upstash inte är aktivt.
// (I serverless miljö där instans dör efter request är detta no-op, vilket är OK.)
if (!HAS_UPSTASH && typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of inMemoryLimits.entries()) {
      if (now > entry.resetTime) {
        inMemoryLimits.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}
