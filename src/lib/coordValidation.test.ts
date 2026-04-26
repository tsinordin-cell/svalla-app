import { describe, it, expect } from 'vitest'
import {
  ARCHIPELAGO_BOUNDS,
  isInArchipelago,
  classifyCoordError,
  assertInArchipelago,
  InvalidCoordError,
  checkCoord,
  parseCoordString,
} from './coordValidation'

// Known valid archipelago coordinates
const SANDHAMN   = { lat: 59.28, lng: 18.92 }
const STOCKHOLM  = { lat: 59.33, lng: 18.07 }
const VAXHOLM    = { lat: 59.40, lng: 18.35 }

// Known invalid coordinates
const OSLO       = { lat: 59.91, lng: 10.75 }  // too far west
const HELSINKI   = { lat: 60.17, lng: 24.94 }  // too far east + north
const PARIS      = { lat: 48.85, lng:  2.35 }  // way outside
const NULL_ISLAND = { lat:  0,   lng:  0     }

// ── isInArchipelago ───────────────────────────────────────────────────────────

describe('isInArchipelago', () => {
  it('accepts coordinates inside the bounding box', () => {
    expect(isInArchipelago(SANDHAMN.lat,  SANDHAMN.lng)).toBe(true)
    expect(isInArchipelago(STOCKHOLM.lat, STOCKHOLM.lng)).toBe(true)
    expect(isInArchipelago(VAXHOLM.lat,   VAXHOLM.lng)).toBe(true)
  })

  it('accepts exact boundary values', () => {
    expect(isInArchipelago(ARCHIPELAGO_BOUNDS.minLat, ARCHIPELAGO_BOUNDS.minLng)).toBe(true)
    expect(isInArchipelago(ARCHIPELAGO_BOUNDS.maxLat, ARCHIPELAGO_BOUNDS.maxLng)).toBe(true)
  })

  it('rejects coordinates outside the bounding box', () => {
    expect(isInArchipelago(OSLO.lat,       OSLO.lng)).toBe(false)
    expect(isInArchipelago(HELSINKI.lat,   HELSINKI.lng)).toBe(false)
    expect(isInArchipelago(PARIS.lat,      PARIS.lng)).toBe(false)
  })

  it('rejects Null Island (0, 0)', () => {
    expect(isInArchipelago(NULL_ISLAND.lat, NULL_ISLAND.lng)).toBe(false)
  })

  it('rejects NaN and Infinity', () => {
    expect(isInArchipelago(NaN, 18.0)).toBe(false)
    expect(isInArchipelago(59.3, NaN)).toBe(false)
    expect(isInArchipelago(Infinity, 18.0)).toBe(false)
  })
})

// ── classifyCoordError ────────────────────────────────────────────────────────

describe('classifyCoordError', () => {
  it('identifies Null Island', () => {
    expect(classifyCoordError(0, 0)).toContain('Null Island')
  })

  it('identifies non-finite values', () => {
    expect(classifyCoordError(NaN, 18)).toContain('inte ett tal')
  })

  it('identifies coordinates in Finland (lng > 21)', () => {
    expect(classifyCoordError(60.0, 22.0)).toContain('Finland')
  })

  it('identifies west coast / Norway (lng < 12 and lat > 58)', () => {
    expect(classifyCoordError(59.0, 11.0)).toContain('västkusten')
  })

  it('identifies too far south', () => {
    expect(classifyCoordError(57.0, 18.0)).toContain('söderut')
  })

  it('identifies too far north', () => {
    expect(classifyCoordError(61.0, 18.0)).toContain('norrut')
  })

  it('identifies too far west (inland)', () => {
    expect(classifyCoordError(59.3, 16.0)).toContain('väster')
  })

  it('identifies too far east (open sea)', () => {
    expect(classifyCoordError(59.3, 20.0)).toContain('öster')
  })
})

// ── assertInArchipelago ───────────────────────────────────────────────────────

describe('assertInArchipelago', () => {
  it('does not throw for valid coordinates', () => {
    expect(() => assertInArchipelago(SANDHAMN.lat, SANDHAMN.lng)).not.toThrow()
  })

  it('throws InvalidCoordError for invalid coordinates', () => {
    expect(() => assertInArchipelago(PARIS.lat, PARIS.lng)).toThrowError(InvalidCoordError)
  })

  it('includes context in the error message', () => {
    expect(() => assertInArchipelago(PARIS.lat, PARIS.lng, 'restaurang'))
      .toThrow('restaurang')
  })

  it('InvalidCoordError exposes lat, lng and reason', () => {
    try {
      assertInArchipelago(OSLO.lat, OSLO.lng)
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidCoordError)
      const err = e as InvalidCoordError
      expect(err.lat).toBe(OSLO.lat)
      expect(err.lng).toBe(OSLO.lng)
      expect(err.reason).toBeTruthy()
    }
  })
})

// ── checkCoord ────────────────────────────────────────────────────────────────

describe('checkCoord', () => {
  it('returns ok: true for valid coordinates', () => {
    expect(checkCoord(SANDHAMN.lat, SANDHAMN.lng)).toEqual({ ok: true })
  })

  it('returns ok: false with reason for invalid coordinates', () => {
    const result = checkCoord(PARIS.lat, PARIS.lng)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.reason).toBeTruthy()
      expect(result.lat).toBe(PARIS.lat)
      expect(result.lng).toBe(PARIS.lng)
    }
  })
})

// ── parseCoordString ──────────────────────────────────────────────────────────

describe('parseCoordString', () => {
  describe('decimal format', () => {
    it('parses "lat, lng" format', () => {
      const r = parseCoordString('59.28, 18.92')
      expect(r).not.toBeNull()
      expect(r!.lat).toBeCloseTo(59.28, 2)
      expect(r!.lng).toBeCloseTo(18.92, 2)
    })

    it('parses "lat lng" (space-separated)', () => {
      const r = parseCoordString('59.33 18.07')
      expect(r).not.toBeNull()
      expect(r!.lat).toBeCloseTo(59.33, 2)
    })

    it('auto-corrects swapped lng,lat order', () => {
      // 18.92, 59.28 — swapped, but corrected to lat=59.28 lng=18.92
      const r = parseCoordString('18.92, 59.28')
      expect(r).not.toBeNull()
      expect(r!.lat).toBeCloseTo(59.28, 2)
      expect(r!.lng).toBeCloseTo(18.92, 2)
    })

    it('returns null for coordinates outside archipelago', () => {
      expect(parseCoordString('48.85, 2.35')).toBeNull()   // Paris
      expect(parseCoordString('0, 0')).toBeNull()           // Null Island
    })
  })

  describe('DMS format', () => {
    it("parses degrees–minutes–seconds format", () => {
      // 59°17'00"N 18°55'00"E ≈ 59.2833, 18.9167 (Sandhamn area)
      const r = parseCoordString("59°17'00\"N 18°55'00\"E")
      expect(r).not.toBeNull()
      expect(r!.lat).toBeCloseTo(59.283, 2)
      expect(r!.lng).toBeCloseTo(18.917, 2)
    })

    it('returns null for DMS coords outside archipelago', () => {
      // Paris in DMS
      expect(parseCoordString("48°51'00\"N 2°21'00\"E")).toBeNull()
    })
  })

  describe('invalid input', () => {
    it('returns null for empty/garbage strings', () => {
      expect(parseCoordString('')).toBeNull()
      expect(parseCoordString('not coordinates')).toBeNull()
      expect(parseCoordString('abc, def')).toBeNull()
    })
  })
})
