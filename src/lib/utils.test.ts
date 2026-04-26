import { describe, it, expect } from 'vitest'
import { timeAgo, timeAgoShort, absoluteDate, avatarGradient, initialsOf } from './utils'

// ── Helpers ───────────────────────────────────────────────────────────────────

function msAgo(ms: number): string {
  return new Date(Date.now() - ms).toISOString()
}
const SEC  = 1_000
const MIN  = 60 * SEC
const HOUR = 60 * MIN
const DAY  = 24 * HOUR

// ── timeAgo ───────────────────────────────────────────────────────────────────

describe('timeAgo', () => {
  it('returns "Just nu" for less than 1 minute ago', () => {
    expect(timeAgo(msAgo(30 * SEC))).toBe('Just nu')
    expect(timeAgo(msAgo(0))).toBe('Just nu')
  })

  it('returns minutes for 1–59 min ago', () => {
    expect(timeAgo(msAgo(1 * MIN))).toBe('1 min sedan')
    expect(timeAgo(msAgo(30 * MIN))).toBe('30 min sedan')
    expect(timeAgo(msAgo(59 * MIN))).toBe('59 min sedan')
  })

  it('returns hours for 1–23 h ago', () => {
    expect(timeAgo(msAgo(1 * HOUR))).toBe('1h sedan')
    expect(timeAgo(msAgo(12 * HOUR))).toBe('12h sedan')
    expect(timeAgo(msAgo(23 * HOUR))).toBe('23h sedan')
  })

  it('returns "Igår" for exactly 1 day ago', () => {
    expect(timeAgo(msAgo(1 * DAY))).toBe('Igår')
  })

  it('returns days for 2–6 days ago', () => {
    expect(timeAgo(msAgo(2 * DAY))).toBe('2 dagar sedan')
    expect(timeAgo(msAgo(6 * DAY))).toBe('6 dagar sedan')
  })

  it('returns a formatted date for 7+ days ago', () => {
    const result = timeAgo(msAgo(7 * DAY))
    // Should be a localized date string, not a relative description
    expect(result).not.toMatch(/sedan|Igår|Just nu/)
    expect(result.length).toBeGreaterThan(3)
  })
})

// ── timeAgoShort ──────────────────────────────────────────────────────────────

describe('timeAgoShort', () => {
  it('returns "Just nu" under 1 minute', () => {
    expect(timeAgoShort(msAgo(45 * SEC))).toBe('Just nu')
  })

  it('returns minutes with "m" suffix', () => {
    expect(timeAgoShort(msAgo(5 * MIN))).toBe('5m')
    expect(timeAgoShort(msAgo(59 * MIN))).toBe('59m')
  })

  it('returns hours with "h" suffix', () => {
    expect(timeAgoShort(msAgo(2 * HOUR))).toBe('2h')
    expect(timeAgoShort(msAgo(23 * HOUR))).toBe('23h')
  })

  it('returns days with "d" suffix', () => {
    expect(timeAgoShort(msAgo(1 * DAY))).toBe('1d')
    expect(timeAgoShort(msAgo(10 * DAY))).toBe('10d')
  })
})

// ── absoluteDate ──────────────────────────────────────────────────────────────

describe('absoluteDate', () => {
  it('returns a non-empty string', () => {
    const result = absoluteDate('2024-06-15T10:30:00Z')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(5)
  })

  it('includes the year', () => {
    expect(absoluteDate('2024-06-15T10:30:00Z')).toContain('2024')
  })
})

// ── avatarGradient ────────────────────────────────────────────────────────────

describe('avatarGradient', () => {
  it('returns a CSS gradient string', () => {
    const g = avatarGradient('testuser')
    expect(g).toContain('linear-gradient')
    expect(g).toContain('hsl(')
  })

  it('is deterministic for the same seed', () => {
    expect(avatarGradient('alice')).toBe(avatarGradient('alice'))
    expect(avatarGradient('bob')).toBe(avatarGradient('bob'))
  })

  it('returns different gradients for different seeds', () => {
    expect(avatarGradient('alice')).not.toBe(avatarGradient('bob'))
  })

  it('handles null/undefined with a fallback', () => {
    const fallback = avatarGradient(null)
    expect(fallback).toContain('linear-gradient')
    expect(avatarGradient(undefined)).toBe(fallback)
  })
})

// ── initialsOf ────────────────────────────────────────────────────────────────

describe('initialsOf', () => {
  it('returns first 2 chars of a single word', () => {
    expect(initialsOf('anna')).toBe('AN')
    expect(initialsOf('erik')).toBe('ER')
  })

  it('returns first char of each word for two-word names', () => {
    expect(initialsOf('Anna Berg')).toBe('AB')
    expect(initialsOf('Karl-Erik Svensson')).toBe('KS')
  })

  it('uses only first two words when more are given', () => {
    expect(initialsOf('Anna Maria Berg')).toBe('AM')
  })

  it('returns "?" for null/undefined/empty', () => {
    expect(initialsOf(null)).toBe('?')
    expect(initialsOf(undefined)).toBe('?')
    expect(initialsOf('')).toBe('?')
  })

  it('returns uppercase', () => {
    expect(initialsOf('anna berg')).toBe('AB')
  })
})
