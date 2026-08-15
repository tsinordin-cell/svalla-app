// oppna-passager-i-raster.mjs — öppnar farbara passager i ETT REDAN BYGGT raster
//
// VARFÖR DEN HÄR FILEN FINNS I STÄLLET FÖR EN OMBYGGNAD
//
// build-land-raster.mjs bygger rastret från src/lib/data/land-mask.json, och
// den filen ligger INTE i repot — den genereras av build-land-mask.mjs mot
// Overpass. En ombyggnad idag skulle alltså hämta färsk OSM-kustlinje och ge
// ett annat raster överallt, inte bara vid den passage vi vill öppna. Det är
// en okontrollerad ändring av varenda rutt på sajten för att fixa ett sund.
//
// Det här skriptet gör i stället precis det build-land-raster.mjs gör i sitt
// passage-steg, fast på det raster som redan ligger i repot. Samma matematik,
// samma källdata (farbara-passager.json), samma spärrar. Diffen blir exakt de
// celler passagen öppnar och ingenting annat.
//
// IDEMPOTENT. Kör om den hur många gånger som helst — andra körningen öppnar
// noll celler, eftersom cellerna redan är vatten.
//
// KÖR
//   node scripts/oppna-passager-i-raster.mjs           # skriver
//   node scripts/oppna-passager-i-raster.mjs --torr    # visar bara, skriver inte
import fs from 'node:fs'

const TORR = process.argv.includes('--torr')
const RASTER = 'src/lib/data/land-raster.json'

const d = JSON.parse(fs.readFileSync(RASTER, 'utf8'))
const { bbox: BB, rows: ROWS, cols: COLS, cellLat: CELL_LAT, cellLng: CELL_LNG } = d
const M_PER_LNG = 111320 * Math.cos(((BB.s + BB.n) / 2) * Math.PI / 180)

// Packa upp till en byte per cell — enklare att resonera om än bitfältet.
const bits = Buffer.from(d.bits, 'base64')
const grid = new Uint8Array(ROWS * COLS)
for (let i = 0; i < ROWS * COLS; i++) if (bits[i >> 3] & (1 << (i & 7))) grid[i] = 1

const rc = (lat, lng) => [
  Math.floor((lat - BB.s) / CELL_LAT),
  Math.floor((lng - BB.w) / CELL_LNG),
]
const land = (r, c) =>
  r < 0 || r >= ROWS || c < 0 || c >= COLS ? true : grid[r * COLS + c] === 1

/** Fyra-grannad flödesfyllning. Returnerar Set av cellindex. */
function komponent(lat, lng) {
  const [r0, c0] = rc(lat, lng)
  if (land(r0, c0)) return null
  const seen = new Set([r0 * COLS + c0])
  const stack = [[r0, c0]]
  while (stack.length) {
    const [r, c] = stack.pop()
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc
      if (land(nr, nc)) continue
      const i = nr * COLS + nc
      if (seen.has(i)) continue
      seen.add(i); stack.push([nr, nc])
    }
  }
  return seen
}

// ── Före: hur stor är Mälaren-komponenten? ────────────────────────────────
const MALAREN = [59.4500, 17.7700]   // Görvälnfjärden, söder om Stäket
const fore = komponent(...MALAREN)
console.log('Mälaren-komponenten före:', fore ? fore.size : 0, 'celler')

// ── Öppna passagerna ──────────────────────────────────────────────────────
// Identisk kod med passage-steget i build-land-raster.mjs. Ändras den ena
// måste den andra ändras med, annars glider rastret isär beroende på vilken
// väg det byggdes.
const PASSAGER = JSON.parse(
  fs.readFileSync('src/lib/data/farbara-passager.json', 'utf8'),
).passager

let totalt = 0
for (const p of PASSAGER) {
  const halvLat = (p.breddM / 2) / 111320
  const halvLng = (p.breddM / 2) / M_PER_LNG
  let oppnade = 0
  for (let k = 0; k + 1 < p.mittlinje.length; k++) {
    const [la0, ln0] = p.mittlinje[k], [la1, ln1] = p.mittlinje[k + 1]
    const steg = Math.ceil(Math.max(
      Math.abs(la1 - la0) / CELL_LAT, Math.abs(ln1 - ln0) / CELL_LNG) * 2) + 1
    for (let t = 0; t <= steg; t++) {
      const la = la0 + (la1 - la0) * t / steg
      const ln = ln0 + (ln1 - ln0) * t / steg
      const r0 = Math.floor((la - halvLat - BB.s) / CELL_LAT)
      const r1 = Math.floor((la + halvLat - BB.s) / CELL_LAT)
      const c0 = Math.floor((ln - halvLng - BB.w) / CELL_LNG)
      const c1 = Math.floor((ln + halvLng - BB.w) / CELL_LNG)
      for (let r = r0; r <= r1; r++) {
        if (r < 0 || r >= ROWS) continue
        for (let c = c0; c <= c1; c++) {
          if (c < 0 || c >= COLS) continue
          const i = r * COLS + c
          if (grid[i] === 1) { grid[i] = 0; oppnade++ }
        }
      }
    }
  }
  totalt += oppnade
  console.log(`  ${p.namn}: ${oppnade} celler (${(oppnade * 625 / 1e6).toFixed(4)} km²), bredd ${p.breddM} m`)
}
console.log('totalt öppnade:', totalt, 'celler')
if (totalt > 20000) {
  console.error('AVBRYTER: orimligt många celler för punktvisa passager.')
  process.exit(1)
}

// ── Sanity: samma tanke som i build-land-raster.mjs ────────────────────────
// Passagernas celler ska vara VATTEN. Fast mark strax bredvid ska förbli LAND.
// Faller något skrivs ingenting — det var precis så en trasig mask kunde nå
// produktion en gång.
const SANITY = [
  ['Gamla stan', 59.3251, 18.0711, true],
  ['Strömmen', 59.3238, 18.0776, false],
  ['Björkfjärden', 59.3300, 17.5000, false],
  ['Skurusundet norr', 59.3290, 18.21785, false],
  ['Baggensstäket väst', 59.30030, 18.27800, false],
  ['Knapens hål', 59.30390, 18.28830, false],
  ['Land norr om Knapens hål', 59.30620, 18.28830, true],
  ['Stäketsundet norra proppen', 59.47041, 17.79292, false],
  ['Stäketsundet södra proppen', 59.46951, 17.79470, false],
  ['Land väster om Stäket', 59.47050, 17.78800, true],
  ['Land öster om Stäket', 59.47050, 17.79750, true],
]
let fel = 0
for (const [namn, la, ln, vill] of SANITY) {
  const [r, c] = rc(la, ln)
  const fick = grid[r * COLS + c] === 1
  console.log('  ' + namn.padEnd(28) + (vill ? 'LAND  ' : 'vatten') +
    ' -> ' + (fick ? 'LAND  ' : 'vatten') + (fick === vill ? ' OK' : ' FEL'))
  if (fick !== vill) fel++
}
if (fel) { console.error(`SANITY MISSLYCKADES (${fel}) — skriver INGET`); process.exit(1) }

// ── Efter: har rätt vatten kopplats ihop? ─────────────────────────────────
// Det här är själva poängen med Stäketsundet, så det kontrolleras uttryckligen
// i stället för att antas: norra Mälarbassängen ska nu ligga i samma
// vattenkomponent som resten av sjön.
const efter = komponent(...MALAREN)
console.log('Mälaren-komponenten efter:', efter.size, 'celler',
  `(+${efter.size - (fore ? fore.size : 0)})`)
const KOPPLADE = [
  ['Sigtunafjärden', 59.6100, 17.7200],
  ['Riddarfjärden', 59.3240, 18.0350],
  ['Skarven', 59.4800, 17.7600],
]
let saknas = 0
for (const [namn, la, ln] of KOPPLADE) {
  const [r, c] = rc(la, ln)
  const ok = !land(r, c) && efter.has(r * COLS + c)
  console.log('  ' + namn.padEnd(28) + (ok ? 'ihop med Mälaren OK' : 'INTE IHOP — FEL'))
  if (!ok) saknas++
}
if (saknas) { console.error('KOPPLINGSTESTET MISSLYCKADES — skriver INGET'); process.exit(1) }

if (TORR) { console.log('\nTORRKÖRNING — ingenting skrivet.'); process.exit(0) }

const packed = new Uint8Array(Math.ceil(ROWS * COLS / 8))
for (let i = 0; i < ROWS * COLS; i++) if (grid[i]) packed[i >> 3] |= 1 << (i & 7)
fs.writeFileSync(RASTER, JSON.stringify({ ...d, bits: Buffer.from(packed).toString('base64') }))
console.log('\nskrivet:', RASTER)
