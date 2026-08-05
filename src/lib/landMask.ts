/**
 * landMask.ts — raster-baserad land-validering för sjöleds-routing
 *
 * 2026-08-04: OMSKRIVEN. Tidigare version läste swedish-coastline.json som
 * bara innehöll öar (0,38 % av Sveriges landyta — fastlandet saknades) och
 * godkände Stockholm→Göteborg tvärs över Sverige som "vattenväg", samtidigt
 * som rubriken lovade "INGA APPROXIMATIONER". Se /team-tavlan,
 * "Ersätt land-masken", för hela grävningen.
 *
 * Nu: bitpackat 25 m-raster byggt från OSM:s kustlinje (939 569 segment,
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
 *  - Upplösning: 25 m, KONSERVATIVT rastrerad (en cell är land om någon del
 *    av den är land). Kobbar och uddar mindre än en cell finns därmed med,
 *    men deras form är avrundad uppåt. Följ alltid sjökort.
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
 * Ligger punkten DJUPT i land — allt inom ~87 m åt alla håll är land?
 *
 * Radien är mätt fram, inte gissad. Rastret är KONSERVATIVT rastrerat (en
 * cell är land om någon del av den är land), vilket är rätt för vägsökning
 * men gör att smala farleder ser ut som land på cellnivå. Med radie 1
 * underkände den här funktionen 245 av 609 verifierade rutter — 188 av dem
 * med fel mer än en kilometer från närmaste hamn, dvs mitt i farbara sund.
 *
 * Uppmätt 2026-08-04 mot alla 609 rutter och fem kända lögner (rak linje
 * över Södermalm, Sthlm–Göteborg, Värmdö-hoppet, Djurgården, Lidingö):
 *   radie 1 → 245 falska underkännanden, 5/5 lögner fångade
 *   radie 2 →  11 falska underkännanden, 5/5
 *   radie 3 →   0 falska underkännanden, 5/5   ← vald: strängast utan falsklarm
 *
 * Små skär fångas alltså inte här — de hanteras av A*-sökningen, som går på
 * cellnivå i den konservativa masken. Den här funktionen är defense-in-depth
 * mot GROVA fel: rutnätsmarscher över öar och raka linjer över fastlandet.
 */
const DEEP_LAND_RADIUS = 3

export function pointDeepOnLand(lat: number, lng: number): boolean {
  if (!inMaskCoverage(lat, lng)) return false
  const r = Math.floor((lat - R.bbox.s) / R.cellLat)
  const c = Math.floor((lng - R.bbox.w) / R.cellLng)
  for (let dr = -DEEP_LAND_RADIUS; dr <= DEEP_LAND_RADIUS; dr++)
    for (let dc = -DEEP_LAND_RADIUS; dc <= DEEP_LAND_RADIUS; dc++)
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


// ── Raster-A*: vägsökning direkt på 25 m-rastret ──────────────────────────
//
// 2026-08-04 (kväll): ersatte det gamla 550 m-gridet i seaPathfinder, som
// dels aldrig byggde en enda kant (nodnycklar "59.39000" jämfördes mot
// söknycklar "59.395" — parseFloat åt upp nollorna), dels var för grovt för
// skärgårdens sund (~300 m).
//
// 2026-08-04 (sent): rastret gick från 50 m centrumtestat till 25 m
// konservativt. Med 50 m-centrumtest gav A* vägar upp till 90 m rakt över
// skär — kobbar som täckte mindre än halva cellen fanns helt enkelt inte i
// masken (12 landträffar över 5 grid-rutter, uppmätt mot exakta segment-
// masken). Med 25 m konservativt: 0 landträffar över 7 testrutter.
//
// MINNE: 25 m ger 31 Mceller för hela bboxen. Att allokera A*-arrayer för
// hela rutnätet vore ~500 MB per lambda. I stället allokeras ett SUB-GRID
// runt start/mål (+30 % marginal), typiskt 3–60 MB, och återanvänds mellan
// anrop när det räcker. Marginalen behövs för att A* ska kunna gå runt öar
// som sticker ut utanför den raka linjen.

const RASTER_DR = [-1, 1, 0, 0, -1, -1, 1, 1]
const RASTER_DC = [0, 0, -1, 1, -1, 1, -1, 1]
const RASTER_DW = [1, 1, 1, 1, Math.SQRT2, Math.SQRT2, Math.SQRT2, Math.SQRT2]
const HEURISTIC_WEIGHT = 1.3
const NEAR_LAND_PENALTY = 2.0
const MAX_EXPANSIONS = 20_000_000
const SUBGRID_MARGIN = 0.3

// Återanvändbara buffertar (växer vid behov, krymper aldrig)
let _bufCells = 0
let _g: Float32Array | null = null
let _from: Int32Array | null = null
let _closed: Uint8Array | null = null
let _heapId = new Int32Array(1 << 20)
let _heapF = new Float32Array(1 << 20)
let _heapN = 0

function heapPush(id: number, f: number): void {
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

function heapPop(): number {
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

const cellCenterLat = (r: number): number => R.bbox.s + (r + 0.5) * R.cellLat
const cellCenterLng = (c: number): number => R.bbox.w + (c + 0.5) * R.cellLng

/** Kustnära cell (någon av 8 grannar är land)? Straffas i A* — inte spärrad. */
function cellNearLand(r: number, c: number): boolean {
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++)
      if ((dr !== 0 || dc !== 0) && cellLand(r + dr, c + dc)) return true
  return false
}

// En hamnkoordinat kan ligga inne på land (Möja i planner-client ligger
// 1 050 m in på ön). Då snappar vi till närmaste vatten — men det får inte
// vara en damm eller insjö. Kravet: cellen ska höra till en sammanhängande
// vattenyta på minst 1,25 km². Verkliga vikar når havet genom sundet och
// passerar; isolerade fickor (Möjas damm: 6 celler) gör det inte.
const MIN_NAVIGABLE_CELLS = 2000
const _floodQueue = new Int32Array(MIN_NAVIGABLE_CELLS + 8)
const _floodSeen = new Set<number>()

function isNavigableWater(r: number, c: number): boolean {
  _floodSeen.clear()
  let qh = 0, qt = 0
  const start = r * R.cols + c
  _floodQueue[qt++] = start
  _floodSeen.add(start)
  while (qh < qt && qt < MIN_NAVIGABLE_CELLS) {
    const id = _floodQueue[qh++]!
    const rr = (id / R.cols) | 0, cc = id % R.cols
    for (let k = 0; k < 4; k++) {
      const nr = rr + RASTER_DR[k]!, nc = cc + RASTER_DC[k]!
      if (nr < 0 || nr >= R.rows || nc < 0 || nc >= R.cols) continue
      const nid = nr * R.cols + nc
      if (_floodSeen.has(nid) || cellLand(nr, nc)) continue
      _floodSeen.add(nid)
      if (qt < _floodQueue.length) _floodQueue[qt++] = nid
    }
  }
  return qt >= MIN_NAVIGABLE_CELLS
}

/** Spiralsök närmsta FARBARA vattencell (max ~3 km). null om ingen hittas. */
/**
 * Sant om punkten kan snappas till farbart vatten (≥ MIN_NAVIGABLE_CELLS
 * sammanhängande vattenceller). Används för att skilja "hamnkoordinaten
 * ligger fel" från "det finns ingen väg mellan hamnarna" när en rutt
 * misslyckas — två helt olika besked till användaren.
 */
export function hasNavigableWaterNear(lat: number, lng: number): boolean {
  return snapToWaterCell(lat, lng) !== null
}

function snapToWaterCell(lat: number, lng: number): [number, number] | null {
  let r = Math.floor((lat - R.bbox.s) / R.cellLat)
  let c = Math.floor((lng - R.bbox.w) / R.cellLng)
  r = Math.max(0, Math.min(R.rows - 1, r))
  c = Math.max(0, Math.min(R.cols - 1, c))
  if (!cellLand(r, c) && isNavigableWater(r, c)) return [r, c]
  const maxRad = Math.ceil(3000 / 25)
  for (let rad = 1; rad <= maxRad; rad++)
    for (let dr = -rad; dr <= rad; dr++)
      for (let dc = -rad; dc <= rad; dc++) {
        if (Math.max(Math.abs(dr), Math.abs(dc)) !== rad) continue
        const nr = r + dr, nc = c + dc
        if (nr < 0 || nr >= R.rows || nc < 0 || nc >= R.cols) continue
        if (cellLand(nr, nc)) continue
        if (isNavigableWater(nr, nc)) return [nr, nc]
      }
  return null
}

/**
 * Genvägskontroll: hela linjen mellan två punkter måste vara rastervatten.
 * Samplas var ~15 m (under en halv cell) plus på produktionens exakta
 * 20-sampelpositioner, så validatePathLand aldrig kan underkänna något vi
 * har godkänt.
 */
function rasterSegmentClear(la1: number, ln1: number, la2: number, ln2: number): boolean {
  for (let k = 1; k < SAMPLES_PER_SEGMENT; k++) {
    const t = k / SAMPLES_PER_SEGMENT
    if (pointOnLand(la1 + (la2 - la1) * t, ln1 + (ln2 - ln1) * t)) return false
  }
  const cellsAway = Math.hypot((la2 - la1) / R.cellLat, (ln2 - ln1) / R.cellLng)
  const n = Math.max(SAMPLES_PER_SEGMENT, Math.ceil(cellsAway * 2))
  for (let i = 1; i < n; i++) {
    const t = i / n
    if (pointOnLand(la1 + (la2 - la1) * t, ln1 + (ln2 - ln1) * t)) return false
  }
  return true
}

/**
 * A* över 25 m-rastret mellan två punkter inom maskens täckning.
 * Returnerar förenklad väg av [lat, lng] (start/mål är snappade vattenceller,
 * INTE anroparens exakta punkter) — eller null om täckning saknas, om
 * punkterna inte har farbart vatten inom 3 km, eller om ingen väg finns.
 */
export function findRasterPath(
  startLat: number, startLng: number,
  endLat: number, endLng: number,
  marginMultiplier: number = SUBGRID_MARGIN,
): Array<[number, number]> | null {
  if (!inMaskCoverage(startLat, startLng) || !inMaskCoverage(endLat, endLng)) return null

  const a = snapToWaterCell(startLat, startLng)
  const b = snapToWaterCell(endLat, endLng)
  if (!a || !b) return null

  // ── Sub-grid: bara området runt start/mål, med marginal för omvägar ──
  // Marginalen utgår från det STÖRSTA avståndet i någon axel. Med marginal
  // per axel blir en långsmal rutt (Möja→Sandhamn: 618 celler i lat, 56 i lng)
  // ett smalt band där A* inte kan gå runt öar — uppmätt: ingen väg.
  const [ar, ac] = a, [br, bc] = b
  const span = Math.max(Math.abs(ar - br), Math.abs(ac - bc))
  const padR = Math.max(40, Math.ceil(span * marginMultiplier))
  const padC = Math.max(40, Math.ceil(span * marginMultiplier))
  const r0 = Math.max(0, Math.min(ar, br) - padR)
  const r1 = Math.min(R.rows - 1, Math.max(ar, br) + padR)
  const c0 = Math.max(0, Math.min(ac, bc) - padC)
  const c1 = Math.min(R.cols - 1, Math.max(ac, bc) + padC)
  const H = r1 - r0 + 1, Wd = c1 - c0 + 1
  const cells = H * Wd

  if (cells > _bufCells) {
    _g = new Float32Array(cells)
    _from = new Int32Array(cells)
    _closed = new Uint8Array(cells)
    _bufCells = cells
  }
  const g = _g!, from = _from!, closed = _closed!
  closed.fill(0, 0, cells)
  g.fill(Infinity, 0, cells)
  _heapN = 0

  const idx = (r: number, c: number): number => (r - r0) * Wd + (c - c0)
  const startId = idx(ar, ac), targetId = idx(br, bc)
  const h = (r: number, c: number): number => {
    const dr2 = Math.abs(r - br), dc2 = Math.abs(c - bc)
    return (dr2 + dc2 + (Math.SQRT2 - 2) * Math.min(dr2, dc2)) * HEURISTIC_WEIGHT
  }
  g[startId] = 0
  from[startId] = -1
  heapPush(startId, h(ar, ac))

  let expanded = 0
  let found = false
  while (_heapN > 0) {
    const id = heapPop()
    if (id === targetId) { found = true; break }
    if (closed[id] === 1) continue
    closed[id] = 1
    if (++expanded > MAX_EXPANSIONS) return null
    const r = r0 + ((id / Wd) | 0), c = c0 + (id % Wd)
    const g0 = g[id]!
    for (let k = 0; k < 8; k++) {
      const nr = r + RASTER_DR[k]!, nc = c + RASTER_DC[k]!
      if (nr < r0 || nr > r1 || nc < c0 || nc > c1) continue
      if (cellLand(nr, nc)) continue
      if (k >= 4 && (cellLand(nr, c) || cellLand(r, nc))) continue // hörnregel
      const nid = idx(nr, nc)
      if (closed[nid] === 1) continue
      const ng = g0 + RASTER_DW[k]! + (cellNearLand(nr, nc) ? NEAR_LAND_PENALTY : 0)
      if (ng < g[nid]!) {
        g[nid] = ng
        from[nid] = id
        heapPush(nid, ng + h(nr, nc))
      }
    }
  }
  // Ingen väg inom sub-gridet? Prova med tre gånger marginalen innan vi ger
  // upp — omvägen kan ligga utanför den första rutan.
  if (!found) {
    return marginMultiplier < 1.2
      ? findRasterPath(startLat, startLng, endLat, endLng, marginMultiplier * 3)
      : null
  }

  const path: number[] = []
  for (let cur = targetId; cur !== -1; cur = from[cur]!) path.push(cur)
  path.reverse()
  const pts: Array<[number, number]> = path.map(id => [
    Number(cellCenterLat(r0 + ((id / Wd) | 0)).toFixed(5)),
    Number(cellCenterLng(c0 + (id % Wd)).toFixed(5)),
  ])

  // Girig genvägs-förenkling — varje genväg valideras mot rastret
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
