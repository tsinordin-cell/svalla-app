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

// ── 3) VERIFIERADE FARBARA PASSAGER ────────────────────────────────────────
//
// Rasteriseringen målar vatten INÅT: en cell blir vatten bara om HELA cellen
// är vatten. Det är rätt som grundregel — men i ett sund som smalnar av räcker
// några få smala punkter för att kapa förbindelsen helt.
//
// UPPMÄTT 2026-08-14 med komponentanalys av hela vattenmasken (39,7 miljoner
// celler, 2 753 vattenkomponenter): Skurusundet ÄR vatten i rastret, men
// sönderbrutet i isolerade pussar som inte hänger ihop med havet.
//   Strömmen / Trälhavet / Kanholmsfjärden  -> komponent 1 (havet, 16,1 milj celler)
//   Skurusundet söder om 59,3145            -> komponent 1036
//   Skurusundet norr om 59,3145             -> komponent 1087
// Landproppar på sundets mittlinje låg vid 59,3050 och 59,3290 — den norra
// precis där sundet är som smalast, 103–136 m.
//
// Följd: Saltsjöqvarn -> Boo (10,3 km fågelväg) ruttades 83,3 km norrut till
// 59,42 och österut till 18,71, alltså ut till Kanholmsfjärden och tillbaka.
//
// VARFÖR PUNKTVIS OCH INTE GENERELLT: att göra rasteriseringen mindre
// konservativ skulle sänka alla omvägskvoter och samtidigt öppna för rutter
// genom grund och land. Här öppnas i stället en namngiven passage som någon
// har intygat, med källan skriven ut. Bredden hålls långt under sundets
// smalaste punkt.
//
// VARJE PASSAGE MÅSTE HA EN KÄLLA. Lägg aldrig till en rad här utan att någon
// som känner vattnen har bekräftat den.
const FARBARA_PASSAGER = [
  {
    namn: 'Skurusundet',
    // Källa: Tom Nordin (delägare, Svalla) bekräftade farbarhet 2026-08-14.
    // Stöd: OSM har seamark:type=fairway och seamark:type=bridge i sundet, och
    // Skurubron är taggad maxheight=30 (segelfri höjd 30 m).
    kalla: 'Tom Nordin 2026-08-14 + OSM seamark:type=fairway, Skurubron maxheight=30',
    breddM: 40,   // sundets smalaste uppmätta punkt är 103 m
    // Mittlinjen är HÄRLEDD ur OSM:s kustlinje, inte gissad: för varje
    // latitudband togs västra och östra strandpunkten och mittpunkten mellan dem.
    mittlinje: [
      [59.3040, 18.22200],
      [59.3050, 18.22113],
      [59.3060, 18.22023],
      [59.3070, 18.21895],
      [59.3080, 18.21871],
      [59.3090, 18.21901],
      [59.3100, 18.21986],
      [59.3110, 18.22080],
      [59.3120, 18.22141],
      [59.3130, 18.22162],
      [59.3140, 18.22173],
      [59.3150, 18.22179],
      [59.3160, 18.22218],
      [59.3170, 18.22273],
      [59.3180, 18.22342],
      [59.3190, 18.22356],
      [59.3200, 18.22348],
      [59.3210, 18.22329],
      [59.3220, 18.22299],
      [59.3230, 18.22146],
      [59.3240, 18.22061],
      [59.3250, 18.21952],
      [59.3260, 18.21879],
      [59.3270, 18.21863],
      [59.3280, 18.21844],
      [59.3290, 18.21785],
      [59.3300, 18.21784]
    ],
  },
]

{
  let oppnadeCeller = 0
  for (const p of FARBARA_PASSAGER) {
    const halvLat = (p.breddM / 2) / 111320
    const halvLng = (p.breddM / 2) / M_PER_LNG
    let fore = 0
    for (let k = 0; k + 1 < p.mittlinje.length; k++) {
      const [la0, ln0] = p.mittlinje[k], [la1, ln1] = p.mittlinje[k + 1]
      // stega längs segmentet i halvcellssteg så inget hoppas över
      const steg = Math.ceil(Math.max(Math.abs(la1 - la0) / CELL_LAT, Math.abs(ln1 - ln0) / CELL_LNG) * 2) + 1
      for (let t = 0; t <= steg; t++) {
        const la = la0 + (la1 - la0) * t / steg
        const ln = ln0 + (ln1 - ln0) * t / steg
        const r0 = Math.floor((la - halvLat - S) / CELL_LAT), r1 = Math.floor((la + halvLat - S) / CELL_LAT)
        const c0 = Math.floor((ln - halvLng - W) / CELL_LNG), c1 = Math.floor((ln + halvLng - W) / CELL_LNG)
        for (let r = r0; r <= r1; r++) {
          if (r < 0 || r >= ROWS) continue
          for (let c = c0; c <= c1; c++) {
            if (c < 0 || c >= COLS) continue
            const i = r * COLS + c
            if (grid[i] === 1) { grid[i] = 0; fore++ }
          }
        }
      }
    }
    oppnadeCeller += fore
    console.log('passage öppnad: ' + p.namn + ' — ' + fore + ' celler (' + (fore * 625 / 1e6).toFixed(3) + ' km²), bredd ' + p.breddM + ' m')
    console.log('  källa: ' + p.kalla)
  }
  if (oppnadeCeller > 20000) {
    console.error('AVBRYTER: ' + oppnadeCeller + ' celler öppnade — orimligt mycket för punktvisa passager.')
    process.exit(1)
  }
}

// ── Sanity: handkontrollerade punkter, vägrar skriva vid fel ───────────────
const SANITY = [
  ['Gamla stan', 59.3251, 18.0711, true], ['Sergels torg', 59.3326, 18.0649, true],
  ['Södermalm', 59.3130, 18.0700, true], ['Nacka', 59.3100, 18.1600, true],
  ['Kungsholmen', 59.3320, 18.0150, true], ['Ekerö tätort', 59.2900, 17.8100, true],
  ['Strömmen', 59.3238, 18.0776, false], ['Trälhavet', 59.4200, 18.3500, false],
  ['Kanholmsfjärden', 59.3400, 18.6500, false], ['Öppet hav', 59.2900, 19.0000, false],
  ['Riddarfjärden', 59.3240, 18.0350, false], ['Björkfjärden', 59.3300, 17.5000, false],
  // Skurusundets två landproppar (uppmätta 2026-08-14) ska nu vara vatten.
  // Går de tillbaka till LAND har passage-öppningen slutat fungera.
  ['Skurusundet syd', 59.3050, 18.22113, false],
  ['Skurusundet norr', 59.3290, 18.21785, false],
  // Kontroll åt andra hållet: fast mark 300 m öster om sundet ska FÖRBLI land.
  // Fångar att öppningen målat för brett.
  ['Nacka öster om sundet', 59.3160, 18.2280, true],
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
