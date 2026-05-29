/**
 * landMask.ts — Riktig OSM coastline-baserad land-validering för sjöleds-routing
 *
 * Använder ~500 slutna polygoner från OpenStreetMap coastline-data för Sverige.
 * Garanterar att inga vägar korsar land — INGA APPROXIMATIONER.
 *
 * Polygon-assemblering från OSM Overpass API (hämtat 2026-04-29).
 * Använder Turf.js för robust punkt-i-polygon och line-intersection testing.
 */

import * as turf from '@turf/turf'
import coastlineData from './data/swedish-coastline.json'

/**
 * Validera att en punkt ligger på vatten (inte innanför någon land-polygon)
 * Returnerar true om LAND, false om VATTEN
 */
export function pointOnLand(lat: number, lng: number): boolean {
  const point = turf.point([lng, lat]) // Turf använder [lng, lat]

  for (const feature of coastlineData.features) {
    if (feature.geometry.type === 'Polygon') {
      // Turf.js booleanPointInPolygon kräver Feature eller Polygon
      const polygon = turf.polygon(feature.geometry.coordinates)
      if (turf.booleanPointInPolygon(point, polygon)) {
        return true // Punkt ligger på land
      }
    }
  }

  return false // Punkt ligger på vatten
}

/**
 * Validera att ett linjestycke inte korsar land
 * Returnerar true om det KORSAR LAND, false om SÄKERT PÅ VATTEN
 *
 * 2026-05-27 RIKTIG FIX: sample-based midpoint-check.
 *
 * Tidigare försök:
 * - V1 (endpoint pointOnLand-check): rejekterade ALLA harbor-rutter eftersom
 *   harbors per definition ligger PÅ kustlinjen (innanför land-polygonerna).
 * - V2 ("lineIntersect >= 2 träffar"): rejekterade rutter som NATURLIGT skär
 *   in/ut ur flera ö-polygoner längs en seglrutt i skärgården. Stockholm→
 *   Sandhamn skär 2+ träffar mot varje ö den passerar = fortfarande blockerad.
 *
 * V3 (denna): dela segmentet i N mellanpunkter, kolla pointOnLand för varje.
 * Om någon MELLAN-punkt är på land → segmentet går genom land. Endpoints
 * räknas inte (de är användarens val, kan vara harbors).
 *
 * Tradeoff: O(N × polygons) per segment istället för O(polygons). Med N=20
 * och 500 polygoner = 10K turf-kall per segment. Path med 50 segment = 500K.
 * Det är acceptabelt för server-side routing-pipelinen.
 */
const SAMPLES_PER_SEGMENT = 20

export function segmentCrossesLand(lat1: number, lng1: number, lat2: number, lng2: number): boolean {
  // Sampla N mellanpunkter (exklusive endpoints — de kan vara harbors).
  // For i in 1..N-1: t = i/N, midpoint = lerp(start, end, t).
  for (let i = 1; i < SAMPLES_PER_SEGMENT; i++) {
    const t = i / SAMPLES_PER_SEGMENT
    const lat = lat1 + (lat2 - lat1) * t
    const lng = lng1 + (lng2 - lng1) * t
    if (pointOnLand(lat, lng)) {
      return true // någon mittpunkt är på land → linjen går genom land
    }
  }
  return false
}

/**
 * Validera att en komplett väg inte korsar land
 * Returnerar {ok: true} om vägen är validerad, annars {ok: false, crossesAt}
 */
export function validatePathLand(path: Array<[number, number]>): { crossesAt?: string; ok: boolean } {
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]!
    const [lat2, lng2] = path[i + 1]!

    if (segmentCrossesLand(lat1, lng1, lat2, lng2)) {
      return {
        ok: false,
        crossesAt: `segment ${i}-${i + 1} [${lat1.toFixed(4)},${lng1.toFixed(4)}→${lat2.toFixed(4)},${lng2.toFixed(4)}]`,
      }
    }
  }

  return { ok: true }
}

/**
 * Legacy wrapper för backwards-compatibility
 */
export function isLineCrossingLand(p1: [number, number], p2: [number, number]): boolean {
  return segmentCrossesLand(p1[0], p1[1], p2[0], p2[1])
}
