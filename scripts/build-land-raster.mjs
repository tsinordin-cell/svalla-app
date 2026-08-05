// build-land-raster.mjs — bygger src/lib/data/land-raster.json från land-mask.json
//
// 2026-08-04 (kväll) v2: 25 m-celler + KONSERVATIV rasterisering.
//
// v1 använde 50 m och testade bara cellens CENTRUM. Uddar och kobbar som
// täckte mindre än halva cellen försvann då ur masken — uppmätt i produktion:
// 12 landträffar över 5 grid-rutter, upp till 90 m rakt över skär, trots att
// både A* och valideringen sa "vatten". Konservativ rasterisering på 50 m
// visade sig omöjlig: den fyllde igen Strömmen (verklig farled) och
// sanity-testet vägrade skriva.
//
// v2: 25 m-celler, 2x2 subsampling (12,5 m) och OR — en cell är LAND om
// NÅGON del av den är land. Uppmätt: 0 landträffar över 7 testrutter mot den
// exakta segmentmasken, och smala farleder (Strömmen) förblir öppna.
// Filstorlek 4,9 MB — fortfarande mindre än den trasiga swedish-coastline.json
// (6 MB) som allt detta ersatte.
import fs from 'node:fs'

const mask = JSON.parse(fs.readFileSync('src/lib/data/land-mask.json', 'utf8'))
if (mask.format !== 'coastline-segments-v1') { console.error('fel maskformat'); process.exit(1) }
const segs = mask.segments
console.log('segment:', segs.length)

const S = 58.70, W = 17.20, N = 60.10, E = 19.40
const CELL_LAT = 25 / 111320
const M_PER_LNG = 111320 * Math.cos(((S + N) / 2) * Math.PI / 180)
const CELL_LNG = 25 / M_PER_LNG
const ROWS = Math.ceil((N - S) / CELL_LAT), COLS = Math.ceil((E - W) / CELL_LNG)
const SUB = 2                     // 2x2 subsampling => 12,5 m
const SUB_LAT = CELL_LAT / SUB
console.log('raster', ROWS, 'x', COLS, ' subsampling', SUB + 'x' + SUB)

// Segment per SUB-rad
const rowSegs = new Map()
for (const s of segs) {
  const lo = Math.min(s[1], s[3]), hi = Math.max(s[1], s[3])
  const r0 = Math.max(0, Math.floor((lo - S) / SUB_LAT))
  const r1 = Math.min(ROWS * SUB - 1, Math.ceil((hi - S) / SUB_LAT))
  for (let r = r0; r <= r1; r++) {
    if (!rowSegs.has(r)) rowSegs.set(r, [])
    rowSegs.get(r).push(s)
  }
}

const grid = new Uint8Array(ROWS * COLS)
for (let sr = 0; sr < ROWS * SUB; sr++) {
  const cand = rowSegs.get(sr); if (!cand) continue
  const lat = S + (sr + 0.5) * SUB_LAT
  const xs = []
  for (const [x1, y1, x2, y2] of cand)
    if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1))
  xs.sort((a, b) => a - b)
  // Udda antal korsningar => raden börjar på land vid västkanten
  // (inlandet ligger väster om bboxen; strålen skjuts österut mot öppet hav).
  const startPaLand = xs.length % 2 === 1
  const r = (sr / SUB) | 0
  for (let i = startPaLand ? -1 : 0; i + 1 < xs.length; i += 2) {
    const vx = i < 0 ? W : xs[i], hx = xs[i + 1]
    // OR-fyllning: varje cell som RÖRS av landintervallet markeras
    const c0 = Math.max(0, Math.floor((vx - W) / CELL_LNG))
    const c1 = Math.min(COLS - 1, Math.ceil((hx - W) / CELL_LNG))
    for (let c = c0; c <= c1; c++) grid[r * COLS + c] = 1
  }
}
let land = 0
for (let i = 0; i < grid.length; i++) land += grid[i]
console.log('landandel:', (land / grid.length * 100).toFixed(1), '%')

// Sanity — handkontrollerade punkter, oberoende av datan som testas.
// Strömmen och Kanholmsfjärden är kritiska: de bevisar att konservatismen
// inte har fyllt igen verkliga farleder.
const SANITY = [
  ['Gamla stan', 59.3251, 18.0711, true], ['Sergels torg', 59.3326, 18.0649, true],
  ['Södermalm', 59.3130, 18.0700, true], ['Nacka', 59.3100, 18.1600, true],
  ['Strömmen', 59.3238, 18.0776, false], ['Trälhavet', 59.4200, 18.3500, false],
  ['Kanholmsfjärden', 59.3400, 18.6500, false], ['Öppet hav', 59.2900, 19.0000, false],
]
let fel = 0
for (const [namn, la, ln, want] of SANITY) {
  const r = Math.floor((la - S) / CELL_LAT), c = Math.floor((ln - W) / CELL_LNG)
  const got = grid[r * COLS + c] === 1
  console.log('  sanity', namn.padEnd(16), want ? 'LAND  ' : 'vatten', '->', got ? 'LAND  ' : 'vatten', got === want ? 'OK' : 'FEL')
  if (got !== want) fel++
}
if (fel) { console.error('SANITY MISSLYCKADES — skriver INGET'); process.exit(1) }

const packed = new Uint8Array(Math.ceil(ROWS * COLS / 8))
for (let i = 0; i < ROWS * COLS; i++) if (grid[i]) packed[i >> 3] |= 1 << (i & 7)
const ut = {
  format: 'land-raster-v1',
  _meta: {
    byggd: new Date().toISOString().slice(0, 10),
    kalla: 'OSM coastline via build-land-mask.mjs (' + segs.length + ' segment)',
    upplosningM: 25,
    rasterisering: 'KONSERVATIV: 2x2 subsampling (12,5 m) + OR — en cell är land om NÅGON del av den är land. Centrumtest på 50 m missade uddar/kobbar och gav vägar upp till 90 m in på land.',
    kommentar: 'Paritet förankrad i östkanten (öppet hav). Utanför bbox är svaret "okänt", inte "vatten".',
  },
  bbox: { s: S, w: W, n: N, e: E },
  cellLat: CELL_LAT, cellLng: CELL_LNG, rows: ROWS, cols: COLS,
  bits: Buffer.from(packed).toString('base64'),
}
fs.writeFileSync('src/lib/data/land-raster.json', JSON.stringify(ut))
console.log('land-raster.json:', (fs.statSync('src/lib/data/land-raster.json').size / 1024 / 1024).toFixed(2), 'MB — sanity 8/8')
