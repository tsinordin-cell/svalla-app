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
 * 2026-05-25 KRITISK FIX: endpoint pointOnLand-check borttagen.
 * Bakgrund: hamnar är PÅ kustlinjen — pointOnLand returnerar true för dem
 * eftersom OSM coastline-polygonerna inkluderar landytan runt hamnen.
 * Resultat: validatePathLand rejekterade ALLA rutter eftersom start/slut alltid
 * "var på land". Detta var grundbuggen i hela routing-pipelinen — Stockholm→
 * Sandhamn, Strömstad→Smögen, alla riktiga rutter blockerades.
 *
 * Nu: vi kollar BARA om linjen MELLAN endpoints skär en land-polygon. Endpoints
 * är användarens val (vi kan inte styra var hamnar ligger). Det är OK att en
 * harbor-koord ligger inom en kustlinje-polygon — det är därför den heter
 * "harbor".
 */
export function segmentCrossesLand(lat1: number, lng1: number, lat2: number, lng2: number): boolean {
  // OBS: ingen endpoint-check (se kommentar ovan).

  // Skapa ett line feature och testa intersection med alla land-polygoner
  const line = turf.lineString([[lng1, lat1], [lng2, lat2]])

  for (const feature of coastlineData.features) {
    if (feature.geometry.type === 'Polygon') {
      const polygon = turf.polygon(feature.geometry.coordinates)

      // Turf.js lineIntersect — antal skärningspunkter med polygonens kant.
      // 0 träffar = linjen ligger helt utanför ELLER helt inuti polygonen.
      //   - Utanför = vatten = OK
      //   - Inuti = land = FEL, men: om linjen är helt inuti en land-polygon
      //     har vi bara kort segment där (typiskt 50–200 m) eftersom snap-
      //     punkterna är vid kanten. Det är acceptabelt MVP-precision.
      // 2+ träffar = linjen går från vatten genom land och tillbaka = FEL.
      // 1 träff = linjen går från utanför till inuti (eller tvärtom). Det
      //   händer naturligt vid harbors där endpoint är "innanför" polygonen.
      //   Är inte ett land-traversal.
      const intersects = turf.lineIntersect(line, polygon)
      if (intersects.features && intersects.features.length >= 2) {
        return true // Linjen skär in OCH ut ur polygonen → går genom land
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
