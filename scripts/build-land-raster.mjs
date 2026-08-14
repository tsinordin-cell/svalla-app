// build-land-raster.mjs — bygger src/lib/data/land-raster.json
//
// Källor:
//   1. src/lib/data/land-mask.json — OSM:s kustlinje (byggs av build-land-mask.mjs)
//   2. OSM-relation 1433877 (Mälaren) — hämtas här, multipolygon med öar
//
// 2026-08-04 v3: Mälaren tillagd. Kustlinjemasken innehåller BARA saltvatten,
// så hela Mälaren var land. Följd: 13 hamnar (Stadshuskajen, Riddarholmen,
// Ekerö, Mälarhöjden m.fl.) kunde aldrig få en verifierad rutt — nio av dem
// hade inget farbart vatten inom 5 km och föll alltid till approximerad
// waypoint-rutt. Uppmätt: Gröndal låg 3 900 m från "vatten".
//
// Rasteriseringen är konservativ ÅT BÅDA HÅLL, och båda felen pekar mot land:
//   land  målas UTÅT  (cell = land om NÅGON del av den är land)
//   vatten målas INÅT (cell = vatten bara om HELA cellen är vatten)
//
// Slussen: Mälaren och Saltsjön blir separata vattenkomponenter, vilket är
// riktigt — passagen kräver slussning. A* hittar därför ingen väg mellan dem
// och flödet faller till en ärligt märkt approximation.
import fs from 'node:fs'

const CACHE = 'scripts/.malaren-cache.json'
const mask = JSON.parse(fs.readFileSync('src/lib/data/land-mask.json', 'utf8'))
if (mask.format !== 'coastline-segments-v1') { console.error('fel maskformat'); process.exit(1) }
const kust = mask.segments
console.log('kustsegment:', kust.length)

// ── Mälaren ────────────────────────────────────────────────────────────────
let malar
if (fs.existsSync(CACHE)) {
  malar = JSON.parse(fs.readFileSync(CACHE, 'utf8'))
  console.log('Mälaren från cache:', malar.length, 'segment')
} else {
  console.log('hämtar Mälaren (rel/1433877) från Overpass…')
  const q = '[out:json][timeout:180];rel(1433877);out geom;'
  let rel = null
  for (const url of ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']) {
    try {
      const res = await fetch(url, { method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'Svalla-LandMask/1.0 (+https://svalla.se; info@svalla.se)' },
        body: 'data=' + encodeURIComponent(q), signal: AbortSignal.timeout(120000) })
      if (!res.ok) { console.log('  ' + url.split('/')[2] + ' HTTP ' + res.status); continue }
      const j = JSON.parse(await res.text())
      rel = j.elements.find(e => e.type === 'relation')
      if (rel) break
    } catch (e) { console.log('  fel:', e.message) }
  }
  if (!rel) { console.error('kunde inte hämta Mälaren — avbryter'); process.exit(1) }
  malar = []
  for (const m of rel.members) {
    if (!m.geometry) continue
    for (let i = 0; i < m.geometry.length - 1; i++)
      malar.push([m.geometry[i].lon, m.geometry[i].lat, m.geometry[i+1].lon, m.geometry[i+1].lat])
  }
  fs.writeFileSync(CACHE, JSON.stringify(malar))
  console.log('Mälaren:', malar.length, 'segment (' + rel.members.length + ' members) — cachad')
}

const S = 58.70, W = 17.20, N = 60.50, E = 19.40  // N höjd från 60.10 2026-08-13, se build-land-mask.mjs
const CELL_LAT = 25 / 111320
const M_PER_LNG = 111320 * Math.cos(((S + N) / 2) * Math.PI / 180)
const CELL_LNG = 25 / M_PER_LNG
const ROWS = Math.ceil((N - S) / CELL_LAT), COLS = Math.ceil((E - W) / CELL_LNG)
const SUB = 2, SUB_LAT = CELL_LAT / SUB
console.log('raster', ROWS, 'x', COLS, ' subsampling', SUB + 'x' + SUB)

const radIndex = (segs) => {
  const m = new Map()
  for (const s of segs) {
    const lo = Math.min(s[1], s[3]), hi = Math.max(s[1], s[3])
    const r0 = Math.max(0, Math.floor((lo - S) / SUB_LAT))
    const r1 = Math.min(ROWS * SUB - 1, Math.ceil((hi - S) / SUB_LAT))
    for (let r = r0; r <= r1; r++) { if (!m.has(r)) m.set(r, []); m.get(r).push(s) }
  }
  return m
}
const korsningar = (cand, lat) => {
  const xs = []
  for (const [x1, y1, x2, y2] of cand)
    if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1))
  return xs.sort((a, b) => a - b)
}

// 1) LAND från kustlinjen — utåt
const grid = new Uint8Array(ROWS * COLS)
const kustRad = radIndex(kust)
for (let sr = 0; sr < ROWS * SUB; sr++) {
  const cand = kustRad.get(sr); if (!cand) continue
  const xs = korsningar(cand, S + (sr + 0.5) * SUB_LAT)
  // udda antal => raden börjar på land vid västkanten (inlandet ligger väster om bboxen)
  const startLand = xs.length % 2 === 1
  const r = (sr / SUB) | 0
  for (let i = startLand ? -1 : 0; i + 1 < xs.length; i += 2) {
    const vx = i < 0 ? W : xs[i], hx = xs[i + 1]
    const c0 = Math.max(0, Math.floor((vx - W) / CELL_LNG))
    const c1 = Math.min(COLS - 1, Math.ceil((hx - W) / CELL_LNG))
    for (let c = c0; c <= c1; c++) grid[r * COLS + c] = 1
  }
}

// 2) VATTEN från Mälaren — inåt, och bara om ALLA sub-rader säger vatten
const traffar = new Uint8Array(ROWS * COLS)
const malarRad = radIndex(malar)
for (let sr = 0; sr < ROWS * SUB; sr++) {
  const cand = malarRad.get(sr); if (!cand) continue
  const xs = korsningar(cand, S + (sr + 0.5) * SUB_LAT)
  const r = (sr / SUB) | 0
  for (let i = 0; i + 1 < xs.length; i += 2) {
    const c0 = Math.max(0, Math.ceil((xs[i] - W) / CELL_LNG))
    const c1 = Math.min(COLS - 1, Math.floor((xs[i + 1] - W) / CELL_LNG) - 1)
    for (let c = c0; c <= c1; c++) traffar[r * COLS + c]++
  }
}
let oppnat = 0
for (let i = 0; i < grid.length; i++) if (traffar[i] >= SUB && grid[i] === 1) { grid[i] = 0; oppnat++ }
console.log('Mälarvatten öppnat:', (oppnat * 625 / 1e6).toFixed(0), 'km²')
let land = 0; for (let i = 0; i < grid.length; i++) land += grid[i]
console.log('landandel:', (land / grid.length * 100).toFixed(1), '%')

// ── Sanity: handkontrollerade punkter, vägrar skriva vid fel ───────────────
const SANITY = [
  ['Gamla stan', 59.3251, 18.0711, true], ['Sergels torg', 59.3326, 18.0649, true],
  ['Södermalm', 59.3130, 18.0700, true], ['Nacka', 59.3100, 18.1600, true],
  ['Kungsholmen', 59.3320, 18.0150, true], ['Ekerö tätort', 59.2900, 17.8100, true],
  ['Strömmen', 59.3238, 18.0776, false], ['Trälhavet', 59.4200, 18.3500, false],
  ['Kanholmsfjärden', 59.3400, 18.6500, false], ['Öppet hav', 59.2900, 19.0000, false],
  ['Riddarfjärden', 59.3240, 18.0350, false], ['Björkfjärden', 59.3300, 17.5000, false],
]
let fel = 0
for (const [namn, la, ln, vill] of SANITY) {
  const r = Math.floor((la - S) / CELL_LAT), c = Math.floor((ln - W) / CELL_LNG)
  const fick = grid[r * COLS + c] === 1
  console.log('  ' + namn.padEnd(18) + (vill ? 'LAND  ' : 'vatten') + ' -> ' + (fick ? 'LAND  ' : 'vatten') + (fick === vill ? ' OK' : ' FEL'))
  if (fick !== vill) fel++
}
if (fel) { console.error('SANITY MISSLYCKADES (' + fel + ') — skriver INGET'); process.exit(1) }

const packed = new Uint8Array(Math.ceil(ROWS * COLS / 8))
for (let i = 0; i < ROWS * COLS; i++) if (grid[i]) packed[i >> 3] |= 1 << (i & 7)
fs.writeFileSync('src/lib/data/land-raster.json', JSON.stringify({
  format: 'land-raster-v1',
  _meta: {
    byggd: new Date().toISOString().slice(0, 10),
    kalla: 'OSM kustlinje (' + kust.length + ' segment) + Mälaren rel/1433877 (' + malar.length + ' segment)',
    upplosningM: 25,
    rasterisering: 'KONSERVATIV åt båda håll: land målas utåt (cell=land om någon del är land), Mälarvatten målas inåt (cell=vatten bara om hela cellen är vatten). Båda felen pekar mot land.',
    malarenTillagd: true,
    kommentar: 'Mälaren och Saltsjön är separata vattenkomponenter — passagen vid Slussen kräver slussning och ska inte ruttas som öppet vatten.',
  },
  bbox: { s: S, w: W, n: N, e: E },
  cellLat: CELL_LAT, cellLng: CELL_LNG, rows: ROWS, cols: COLS,
  bits: Buffer.from(packed).toString('base64'),
}))
console.log('land-raster.json:', (fs.statSync('src/lib/data/land-raster.json').size / 1024 / 1024).toFixed(2), 'MB — sanity 12/12')
