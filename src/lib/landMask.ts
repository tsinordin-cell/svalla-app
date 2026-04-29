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
 */
export function segmentCrossesLand(lat1: number, lng1: number, lat2: number, lng2: number): boolean {
  // Kontrollera om något endpoint ligger på land
  if (pointOnLand(lat1, lng1) || pointOnLand(lat2, lng2)) {
    return true
  }

  // Skapa ett line feature och testa intersection med alla land-polygoner
  const line = turf.lineString([[lng1, lat1], [lng2, lat2]])

  for (const feature of coastlineData.features) {
    if (feature.geometry.type === 'Polygon') {
      const polygon = turf.polygon(feature.geometry.coordinates)

      // Turf.js lineIntersect
      const intersects = turf.lineIntersect(line, polygon)
      if (intersects.features && intersects.features.length > 0) {
        return true // Linjen skär polygonen
      }
    }
  }

  return false // Linje är säker
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
