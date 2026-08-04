/**
 * landMask.ts — raster-baserad land-validering för sjöleds-routing
 *
 * 2026-08-04: OMSKRIVEN. Tidigare version läste swedish-coastline.json som
 * bara innehöll öar (0,38 % av Sveriges landyta — fastlandet saknades) och
 * godkände Stockholm→Göteborg tvärs över Sverige som "vattenväg", samtidigt
 * som rubriken lovade "INGA APPROXIMATIONER". Se /team-tavlan,
 * "Ersätt land-masken", för hela grävningen.
 *
 * Nu: bitpackat 50 m-raster byggt från OSM:s kustlinje (939 569 segment,
 * scripts/build-land-mask.mjs → scripts/build-land-raster.mjs), verifierat
 * mot 8 handkontrollerade sanity-punkter vid bygget. Even-odd-paritet
 * förankrad i östkanten (öppet hav).
 *
 * TVÅ STRÄNGHETSNIVÅER — medvetet olika användning:
 *
 *  pointOnLand (cellnivå, KONSERVATIV): en cell räknas som land om dess
 *  centrum ligger på land. Kustnära "blandceller" klassas ofta som land.
 *  Rätt nivå för VÄGSÖKNING — hellre en omväg än en genväg över en udde.
 *
 *  validatePathLand (djupnivå, defense-in-depth): en sampelpunkt underkänner
 *  bara om cellen OCH alla 8 grannceller är land, dvs punkten ligger >50 m
 *  in i land. Fångar varje verklig katastrof (rutnätsmarsch över en ö går
 *  hundratals meter in i land) utan att falskt underkänna korrekta kustnära
 *  rutter som redan segment-verifierats vid bygget — cellnivån underkände
 *  464 av 609 sådana pga kvantisering. Uppmätt 2026-08-04.
 *
 * ÄRLIGA BEGRÄNSNINGAR:
 *  - Täckning: Stockholms skärgård (bbox i land-raster.json). Utanför bboxen
 *    kan vi inte skilja land från vatten — pointOnLand svarar false
 *    (vi PÅSTÅR inte land) och validatePathLand rapporterar coverage så att
 *    ett "ok" utanför täckning aldrig kan tas som verifiering.
 *  - Upplösning: 50 m. Följ alltid sjökort.
 */

import landRaster from './data/land-raster.json'

const R = landRaster as {
  format: string
  bbox: { s: number; w: number; n: number; e: number }
  cellLat: number
  cellLng: number
  rows: number
  cols: number
  bits: string
}

if (R.format !== 'land-raster-v1') {
  throw new Error(`landMask: oväntat rasterformat "${R.format}" — kör scripts/build-land-raster.mjs`)
}

// Avkoda base64 → bitfält en gång vid modul-load (~1 MB).
const BITS: Uint8Array = typeof Buffer !== 'undefined'
  ? new Uint8Array(Buffer.from(R.bits, 'base64'))
  : Uint8Array.from(atob(R.bits), c => c.charCodeAt(0))

function cellLand(r: number, c: number): boolean {
  if (r < 0 || r >= R.rows || c < 0 || c >= R.cols) return false // utanför = obekräftat
  const i = r * R.cols + c
  return (BITS[i >> 3]! & (1 << (i & 7))) !== 0
}

/** Ligger punkten inom rastrets täckningsområde? */
export function inMaskCoverage(lat: number, lng: number): boolean {
  return lat >= R.bbox.s && lat < R.bbox.n && lng >= R.bbox.w && lng < R.bbox.e
}

/**
 * Är punkten på land? (cellnivå — KONSERVATIV, för vägsökning)
 * false utanför täckning = OKÄNT, inte "vatten" — se inMaskCoverage.
 */
export function pointOnLand(lat: number, lng: number): boolean {
  if (!inMaskCoverage(lat, lng)) return false
  return cellLand(
    Math.floor((lat - R.bbox.s) / R.cellLat),
    Math.floor((lng - R.bbox.w) / R.cellLng),
  )
}

/**
 * Ligger punkten DJUPT i land (>50 m in — cellen och alla 8 grannar land)?
 * Används av validatePathLand för att skilja verkliga landfel från
 * kvantiseringsbrus vid kusten.
 */
export function pointDeepOnLand(lat: number, lng: number): boolean {
  if (!inMaskCoverage(lat, lng)) return false
  const r = Math.floor((lat - R.bbox.s) / R.cellLat)
  const c = Math.floor((lng - R.bbox.w) / R.cellLng)
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++)
      if (!cellLand(r + dr, c + dc)) return false
  return true
}

/**
 * Korsar segmentet land? (cellnivå — för kantbygge i vägsökning)
 * Samplar mellanpunkter; ändpunkter exkluderade (hamnar ligger på kustlinjen).
 */
const SAMPLES_PER_SEGMENT = 20

export function segmentCrossesLand(lat1: number, lng1: number, lat2: number, lng2: number): boolean {
  for (let i = 1; i < SAMPLES_PER_SEGMENT; i++) {
    const t = i / SAMPLES_PER_SEGMENT
    if (pointOnLand(lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t)) return true
  }
  return false
}

export type PathLandValidation = {
  ok: boolean
  crossesAt?: string
  /**
   * 'full'    = hela vägen inom rastrets täckning — ok betyder verifierad.
   * 'partial' = delar utanför täckning — ok betyder bara "inget KÄNT landfel".
   * 'none'    = helt utanför täckning — ok är vakuöst, INTE en verifiering.
   */
  coverage: 'full' | 'partial' | 'none'
}

/**
 * Defense-in-depth-validering av en komplett väg (djupnivå).
 * ok=false ⇒ ett VERKLIGT landfel (>50 m in i land) hittades.
 * ok=true  ⇒ tolka ALLTID tillsammans med coverage (se typen ovan).
 */
export function validatePathLand(path: Array<[number, number]>): PathLandValidation {
  let inne = 0
  let totalt = 0

  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]!
    const [lat2, lng2] = path[i + 1]!

    for (let k = 1; k < SAMPLES_PER_SEGMENT; k++) {
      const t = k / SAMPLES_PER_SEGMENT
      const lat = lat1 + (lat2 - lat1) * t
      const lng = lng1 + (lng2 - lng1) * t
      totalt++
      if (!inMaskCoverage(lat, lng)) continue
      inne++
      if (pointDeepOnLand(lat, lng)) {
        return {
          ok: false,
          coverage: 'partial',
          crossesAt: `segment ${i}-${i + 1} [${lat1.toFixed(4)},${lng1.toFixed(4)}→${lat2.toFixed(4)},${lng2.toFixed(4)}]`,
        }
      }
    }
  }

  const coverage = totalt === 0 || inne === 0 ? 'none' : inne === totalt ? 'full' : 'partial'
  return { ok: true, coverage }
}

/** Legacy-wrapper för bakåtkompatibilitet */
export function isLineCrossingLand(p1: [number, number], p2: [number, number]): boolean {
  return segmentCrossesLand(p1[0], p1[1], p2[0], p2[1])
}
