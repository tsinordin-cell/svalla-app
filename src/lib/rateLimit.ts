/**
 * Simple in-memory rate limiting for API routes.
 * Note: In production with multiple server instances, use Redis instead.
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const limits = new Map<string, RateLimitEntry>()

export function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = limits.get(key)

  if (!entry || now > entry.resetTime) {
    limits.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  return true
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of limits.entries()) {
    if (now > entry.resetTime) {
      limits.delete(key)
    }
  }
}, 5 * 60 * 1000)
