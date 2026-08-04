// Bygger src/lib/data/src/lib/data/land-raster.json från Toms mask (coastline-segments-v1).
// 50 m-celler, even-odd med paritet förankrad i ÖSTKANTEN (öppet hav),
// bitpackad Uint8Array -> base64. Vägrar skriva om sanity-punkterna felar.
import fs from 'node:fs'
const mask = JSON.parse(fs.readFileSync('src/lib/data/land-mask.json', 'utf8'))
if (mask.format !== 'coastline-segments-v1') { console.error('fel maskformat'); process.exit(1) }
const segs = mask.segments
console.log('segment:', segs.length)

const S = 58.70, W = 17.20, N = 60.10, E = 19.40
const CELL_LAT = 50 / 111320
const M_PER_LNG = 111320 * Math.cos(((S + N) / 2) * Math.PI / 180)
const CELL_LNG = 50 / M_PER_LNG
const ROWS = Math.ceil((N - S) / CELL_LAT), COLS = Math.ceil((E - W) / CELL_LNG)
console.log('raster', ROWS, 'x', COLS)

const rowSegs = new Map()
for (const s of segs) {
  const lo = Math.min(s[1], s[3]), hi = Math.max(s[1], s[3])
  const r0 = Math.max(0, Math.floor((lo - S) / CELL_LAT)), r1 = Math.min(ROWS - 1, Math.ceil((hi - S) / CELL_LAT))
  for (let r = r0; r <= r1; r++) {
    if (!rowSegs.has(r)) rowSegs.set(r, [])
    rowSegs.get(r).push(s)
  }
}
const grid = new Uint8Array(ROWS * COLS)
for (let r = 0; r < ROWS; r++) {
  const cand = rowSegs.get(r); if (!cand) continue
  const lat = S + (r + 0.5) * CELL_LAT
  const xs = []
  for (const [x1, y1, x2, y2] of cand)
    if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1))
  xs.sort((a, b) => a - b)
  const startPaLand = xs.length % 2 === 1
  for (let i = startPaLand ? -1 : 0; i + 1 < xs.length; i += 2) {
    const vx = i < 0 ? W : xs[i], hx = xs[i + 1]
    const c0 = Math.max(0, Math.round((vx - W) / CELL_LNG))
    const c1 = Math.min(COLS - 1, Math.round((hx - W) / CELL_LNG) - 1)
    for (let c = c0; c <= c1; c++) grid[r * COLS + c] = 1
  }
}
let land = 0; for (let i = 0; i < grid.length; i++) land += grid[i]
console.log('landandel:', (land / grid.length * 100).toFixed(1), '%')

// sanity — 8 handkontrollerade punkter, EJ ur testdatan
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
  console.log('  sanity', namn.padEnd(16), got === want ? 'OK' : 'FEL')
  if (got !== want) fel++
}
if (fel) { console.error('SANITY MISSLYCKADES — skriver INGET'); process.exit(1) }

// bitpacka
const packed = new Uint8Array(Math.ceil(ROWS * COLS / 8))
for (let i = 0; i < ROWS * COLS; i++) if (grid[i]) packed[i >> 3] |= 1 << (i & 7)
const ut = {
  format: 'land-raster-v1',
  _meta: {
    byggd: new Date().toISOString().slice(0, 10),
    kalla: 'OSM coastline via build-land-mask.mjs (' + segs.length + ' segment), rastrerad av build-land-raster.mjs',
    upplosningM: 50,
    kommentar: 'Paritet förankrad i östkanten (öppet hav). Täcker Stockholms skärgård — utanför bbox är svaret "okänt", inte "vatten".',
  },
  bbox: { s: S, w: W, n: N, e: E },
  cellLat: CELL_LAT, cellLng: CELL_LNG, rows: ROWS, cols: COLS,
  bits: Buffer.from(packed).toString('base64'),
}
fs.writeFileSync('src/lib/data/land-raster.json', JSON.stringify(ut))
console.log('src/lib/data/land-raster.json:', (fs.statSync('src/lib/data/land-raster.json').size / 1024 / 1024).toFixed(2), 'MB — sanity 8/8')
