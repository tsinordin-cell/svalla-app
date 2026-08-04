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

// ── Raster-A*: vägsökning direkt på 50 m-rastret ──────────────────────────
//
// 2026-08-04 (kväll): ersätter det gamla 550 m-gridet i seaPathfinder, som
// dels aldrig byggde en enda kant (nodnycklar "59.39000" jämfördes mot
// söknycklar "59.395" — parseFloat åt upp nollorna), dels var för grovt för
// skärgårdens sund (~300 m) även efter nyckelfix. Uppmätt 2026-08-04.
//
// Algoritmen är samma som genererade de 609 verifierade rutterna:
// 8-riktningars A* med hörnregel (diagonal kräver båda ortogonala cellerna
// fria), kustnärhetsstraff (hellre marginal än kustkramning) och girig
// genvägs-förenkling där varje genväg valideras mot rastret var ~30 m OCH
// på produktionens exakta 20-sampelpositioner — resultatet klarar
// validatePathLand per konstruktion.

const RASTER_DIRS_R = [-1, 1, 0, 0, -1, -1, 1, 1]
const RASTER_DIRS_C = [0, 0, -1, 1, -1, 1, -1, 1]
const RASTER_DIRS_W = [1, 1, 1, 1, Math.SQRT2, Math.SQRT2, Math.SQRT2, Math.SQRT2]
const HEURISTIC_WEIGHT = 1.3
const MAX_EXPANSIONS = 6_000_000

// Lata singletons — allokeras först när raster-A* faktiskt används
// (~46 MB i en varm lambda; återanvänds mellan anrop via stamp-versionering).
let _gScore: Float32Array | null = null
let _cameFrom: Int32Array | null = null
let _stamp: Int32Array | null = null
let _closed: Int32Array | null = null
let _runId = 0
let _heapId = new Int32Array(1 << 20)
let _heapF = new Float32Array(1 << 20)
let _heapN = 0

function hpush(id: number, f: number): void {
  if (_heapN === _heapId.length) {
    const ni = new Int32Array(_heapN * 2)
    const nf = new Float32Array(_heapN * 2)
    ni.set(_heapId); nf.set(_heapF)
    _heapId = ni; _heapF = nf
  }
  let i = _heapN++
  _heapId[i] = id; _heapF[i] = f
  while (i > 0) {
    const p = (i - 1) >> 1
    if (_heapF[p]! <= _heapF[i]!) break
    const ti = _heapId[p]!, tf = _heapF[p]!
    _heapId[p] = _heapId[i]!; _heapF[p] = _heapF[i]!
    _heapId[i] = ti; _heapF[i] = tf
    i = p
  }
}

function hpop(): number {
  const id = _heapId[0]!
  _heapN--
  _heapId[0] = _heapId[_heapN]!; _heapF[0] = _heapF[_heapN]!
  let i = 0
  for (;;) {
    const l = 2 * i + 1, r = l + 1
    let m = i
    if (l < _heapN && _heapF[l]! < _heapF[m]!) m = l
    if (r < _heapN && _heapF[r]! < _heapF[m]!) m = r
    if (m === i) break
    const ti = _heapId[m]!, tf = _heapF[m]!
    _heapId[m] = _heapId[i]!; _heapF[m] = _heapF[i]!
    _heapId[i] = ti; _heapF[i] = tf
    i = m
  }
  return id
}

const cellLat = (r: number): number => R.bbox.s + (r + 0.5) * R.cellLat
const cellLng = (c: number): number => R.bbox.w + (c + 0.5) * R.cellLng

/** Kustnära cell (någon av 8 grannar är land)? Straffas i A* — inte spärrad. */
function nearLand(r: number, c: number): boolean {
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++)
      if ((dr !== 0 || dc !== 0) && cellLand(r + dr, c + dc)) return true
  return false
}

/** Spiralsök närmsta vattencell (max ~3 km). null om ingen hittas. */
function snapToWaterCell(lat: number, lng: number): [number, number] | null {
  let r = Math.floor((lat - R.bbox.s) / R.cellLat)
  let c = Math.floor((lng - R.bbox.w) / R.cellLng)
  r = Math.max(0, Math.min(R.rows - 1, r))
  c = Math.max(0, Math.min(R.cols - 1, c))
  if (!cellLand(r, c)) return [r, c]
  for (let rad = 1; rad <= 60; rad++)
    for (let dr = -rad; dr <= rad; dr++)
      for (let dc = -rad; dc <= rad; dc++) {
        if (Math.max(Math.abs(dr), Math.abs(dc)) !== rad) continue
        const nr = r + dr, nc = c + dc
        if (nr < 0 || nr >= R.rows || nc < 0 || nc >= R.cols) continue
        if (!cellLand(nr, nc)) return [nr, nc]
      }
  return null
}

/** Genvägskontroll: rastervatten var ~30 m OCH på prod-positionerna k/20. */
function rasterSegmentClear(la1: number, ln1: number, la2: number, ln2: number): boolean {
  for (let k = 1; k < SAMPLES_PER_SEGMENT; k++) {
    const t = k / SAMPLES_PER_SEGMENT
    if (pointOnLand(la1 + (la2 - la1) * t, ln1 + (ln2 - ln1) * t)) return false
  }
  const meters = Math.hypot((la2 - la1) / R.cellLat, (ln2 - ln1) / R.cellLng) * 50
  const n = Math.max(SAMPLES_PER_SEGMENT, Math.ceil(meters / 30))
  for (let i = 1; i < n; i++) {
    const t = i / n
    if (pointOnLand(la1 + (la2 - la1) * t, ln1 + (ln2 - ln1) * t)) return false
  }
  return true
}

/**
 * A* över 50 m-rastret mellan två punkter inom maskens täckning.
 * Returnerar förenklad väg av [lat, lng] (start/mål är snappade vattenceller,
 * INTE anroparens exakta punkter) — eller null om täckning saknas eller
 * ingen vattenväg finns.
 */
export function findRasterPath(
  startLat: number, startLng: number,
  endLat: number, endLng: number,
): Array<[number, number]> | null {
  if (!inMaskCoverage(startLat, startLng) || !inMaskCoverage(endLat, endLng)) return null

  const a = snapToWaterCell(startLat, startLng)
  const b = snapToWaterCell(endLat, endLng)
  if (!a || !b) return null

  const N = R.rows * R.cols
  if (!_gScore) {
    _gScore = new Float32Array(N)
    _cameFrom = new Int32Array(N)
    _stamp = new Int32Array(N)
    _closed = new Int32Array(N)
  }
  const gScore = _gScore, cameFrom = _cameFrom!, stamp = _stamp!, closed = _closed!

  _runId++
  _heapN = 0
  const runId = _runId
  const [r0, c0] = a
  const [r1, c1] = b
  const startId = r0 * R.cols + c0
  const targetId = r1 * R.cols + c1
  const h = (r: number, c: number): number => {
    const dr = Math.abs(r - r1), dc = Math.abs(c - c1)
    return (dr + dc + (Math.SQRT2 - 2) * Math.min(dr, dc)) * HEURISTIC_WEIGHT
  }
  stamp[startId] = runId
  gScore[startId] = 0
  cameFrom[startId] = -1
  hpush(startId, h(r0, c0))

  let expanded = 0
  let found = false
  while (_heapN > 0) {
    const id = hpop()
    if (id === targetId) { found = true; break }
    if (closed[id] === runId) continue
    closed[id] = runId
    if (++expanded > MAX_EXPANSIONS) return null
    const r = (id / R.cols) | 0, c = id % R.cols
    const g0 = gScore[id]!
    for (let k = 0; k < 8; k++) {
      const nr = r + RASTER_DIRS_R[k]!, nc = c + RASTER_DIRS_C[k]!
      if (nr < 0 || nr >= R.rows || nc < 0 || nc >= R.cols) continue
      if (cellLand(nr, nc)) continue
      if (k >= 4 && (cellLand(nr, c) || cellLand(r, nc))) continue // hörnregel
      const nid = nr * R.cols + nc
      if (closed[nid] === runId) continue
      const ng = g0 + RASTER_DIRS_W[k]! + (nearLand(nr, nc) ? 2.0 : 0)
      if (stamp[nid] !== runId || ng < gScore[nid]!) {
        stamp[nid] = runId
        gScore[nid] = ng
        cameFrom[nid] = id
        hpush(nid, ng + h(nr, nc))
      }
    }
  }
  if (!found) return null

  // återskapa cellväg
  const cells: number[] = []
  for (let cur = targetId; cur !== -1; cur = cameFrom[cur]!) cells.push(cur)
  cells.reverse()
  const pts: Array<[lat: number, lng: number]> = cells.map(id => [
    Number(cellLat((id / R.cols) | 0).toFixed(5)),
    Number(cellLng(id % R.cols).toFixed(5)),
  ])

  // girig genvägs-förenkling (varje genväg validerad mot rastret)
  const ut: Array<[number, number]> = [pts[0]!]
  let i = 0
  while (i < pts.length - 1) {
    let j = pts.length - 1
    while (j > i + 1 && !rasterSegmentClear(pts[i]![0], pts[i]![1], pts[j]![0], pts[j]![1]))
      j = i + Math.max(1, Math.floor((j - i) / 2))
    ut.push(pts[j]!)
    i = j
  }
  return ut
}
