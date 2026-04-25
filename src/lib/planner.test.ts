import { describe, it, expect } from 'vitest'
import {
  haversineKm,
  crossTrack,
  matchesInterest,
  suggestStops,
  type PlaceInput,
} from './planner'

// ── haversineKm ────────────────────────────────────────────────────────────

describe('haversineKm', () => {
  it('returns 0 for identical points', () => {
    expect(haversineKm(59.3, 18.0, 59.3, 18.0)).toBe(0)
  })

  it('Stockholm → Sandhamn ≈ 48 km (luftlinje)', () => {
    const d = haversineKm(59.3238, 18.0776, 59.2820, 18.9130)
    expect(d).toBeGreaterThan(40)
    expect(d).toBeLessThan(60)
  })
})

// ── crossTrack ─────────────────────────────────────────────────────────────

describe('crossTrack', () => {
  // Linje: Stockholm → Sandhamn
  const aLat = 59.3238, aLng = 18.0776   // start
  const bLat = 59.2820, bLng = 18.9130   // slut

  it('punkt på linjen har ~0 avstånd', () => {
    const midLat = (aLat + bLat) / 2
    const midLng = (aLng + bLng) / 2
    const { distKm } = crossTrack(midLat, midLng, aLat, aLng, bLat, bLng)
    expect(distKm).toBeLessThan(2)
  })

  it('punkt vid startpunkt → t ≈ 0', () => {
    const { t } = crossTrack(aLat, aLng, aLat, aLng, bLat, bLng)
    expect(t).toBeCloseTo(0, 1)
  })

  it('punkt vid slutpunkt → t ≈ 1', () => {
    const { t } = crossTrack(bLat, bLng, aLat, aLng, bLat, bLng)
    expect(t).toBeCloseTo(1, 1)
  })

  it('punkt långt utanför korridor har stort avstånd', () => {
    // Norrtälje är ~60 km norr om linjen Stockholm→Sandhamn
    const { distKm } = crossTrack(59.7579, 18.7077, aLat, aLng, bLat, bLng)
    expect(distKm).toBeGreaterThan(30)
  })
})

// ── matchesInterest ────────────────────────────────────────────────────────

describe('matchesInterest', () => {
  const restaurant: PlaceInput = {
    id: '1', name: 'Sandhamns Värdshus',
    lat: 59.28, lng: 18.91,
    type: 'restaurant', categories: ['restaurant'], tags: ['mat'],
    island: 'Sandhamn',
  }
  const sauna: PlaceInput = {
    id: '2', name: 'Bastun på Grinda',
    lat: 59.46, lng: 18.72,
    type: 'sastu', categories: ['bastu'], tags: ['bastu'],
    island: 'Grinda',
  }
  const fuel: PlaceInput = {
    id: '3', name: 'Statoil Vaxholm',
    lat: 59.40, lng: 18.35,
    type: 'fuel', categories: ['fuel'], tags: ['bensin'],
    island: 'Vaxholm',
  }

  it('matchar restaurang mot krog', () => {
    expect(matchesInterest(restaurant, ['krog'])).toBe('krog')
  })

  it('matchar bastu mot bastu', () => {
    expect(matchesInterest(sauna, ['bastu'])).toBe('bastu')
  })

  it('matchar fuel mot bensin', () => {
    expect(matchesInterest(fuel, ['bensin'])).toBe('bensin')
  })

  it('returnerar null om ingen match', () => {
    expect(matchesInterest(fuel, ['krog', 'bastu'])).toBeNull()
  })

  it('matchar på första intresset i listan', () => {
    expect(matchesInterest(restaurant, ['bastu', 'krog'])).toBe('krog')
  })
})

// ── suggestStops ───────────────────────────────────────────────────────────

describe('suggestStops', () => {
  const start = { lat: 59.3238, lng: 18.0776 }  // Stockholm
  const end   = { lat: 59.2820, lng: 18.9130 }  // Sandhamn

  const places: PlaceInput[] = [
    {
      id: 'r1', name: 'Grinda Wärdshus',
      lat: 59.4602, lng: 18.7167,
      type: 'restaurant', categories: ['restaurant'], tags: ['mat'],
      island: 'Grinda',
    },
    {
      id: 'r2', name: 'Vaxholms Hembygdsgård',
      lat: 59.4024, lng: 18.3512,
      type: 'restaurant', categories: ['restaurant'], tags: ['mat'],
      island: 'Vaxholm',
    },
    {
      id: 'b1', name: 'Finnhamnsbastun',
      lat: 59.5430, lng: 18.8240,
      type: 'sauna', categories: ['bastu'], tags: ['bastu'],
      island: 'Finnhamn',
    },
    {
      id: 'far', name: 'Norrtälje hamn',
      lat: 59.7579, lng: 18.7077,  // långt norr om linjen
      type: 'harbor', categories: ['harbor'], tags: ['hamn'],
      island: 'Norrtälje',
    },
  ]

  it('returnerar bara platser inom korridoren', () => {
    const stops = suggestStops(start, end, ['krog', 'bastu', 'brygga'], places)
    const ids = stops.map(s => s.id)
    // Norrtälje är för långt norr om linjen
    expect(ids).not.toContain('far')
  })

  it('filtrerar på intressen', () => {
    const stops = suggestStops(start, end, ['bastu'], places)
    expect(stops.every(s => s.type === 'sauna' || (s.categories ?? []).includes('bastu'))).toBe(true)
  })

  it('returnerar max maxStops resultat', () => {
    const manyPlaces: PlaceInput[] = Array.from({ length: 20 }, (_, i) => ({
      id: `p${i}`, name: `Plats ${i}`,
      lat: 59.30 + i * 0.01, lng: 18.2 + i * 0.03,
      type: 'restaurant', categories: ['restaurant'], tags: ['mat'],
      island: `Ö${i}`,
    }))
    const stops = suggestStops(start, end, ['krog'], manyPlaces, { maxStops: 4 })
    expect(stops.length).toBeLessThanOrEqual(4)
  })

  it('returnerar tom lista om inga intressen matchar', () => {
    const stops = suggestStops(start, end, ['bensin'], places)
    expect(stops).toHaveLength(0)
  })

  it('deduplicerar per ö (max 2 stopp per ö)', () => {
    const multiSameIsland: PlaceInput[] = Array.from({ length: 5 }, (_, i) => ({
      id: `s${i}`, name: `Sandhamn plats ${i}`,
      lat: 59.282 + i * 0.001, lng: 18.913 + i * 0.001,
      type: 'restaurant', categories: ['restaurant'], tags: [],
      island: 'Sandhamn',
    }))
    const stops = suggestStops(start, end, ['krog'], multiSameIsland)
    const fromSandhamn = stops.filter(s => s.island === 'Sandhamn')
    expect(fromSandhamn.length).toBeLessThanOrEqual(2)
  })

  it('stoppar med score 0–1', () => {
    const stops = suggestStops(start, end, ['krog', 'bastu'], places)
    stops.forEach(s => {
      expect(s.score).toBeGreaterThanOrEqual(0)
      expect(s.score).toBeLessThanOrEqual(1)
    })
  })
})
