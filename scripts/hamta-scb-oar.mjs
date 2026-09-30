#!/usr/bin/env node
/**
 * Hämtar SCB:s officiella statistik per ö och skriver
 * src/app/o/scb-oar.generated.ts (kort 80106ebb, 2026-09-29).
 *
 * KÄLLA: SCB, tabell MI0812A/OarEjBro01 "Befolkning och bebyggelse på öar
 * utan fastlandsförbindelse med bro, per ö. År 2010 - 2020". Referenstid
 * 31 december respektive år. Officiell statistik.
 * https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/
 *
 * Kopplingen slug → SCB-kod är handgjord och granskad en och en. Namnlikhet
 * räcker inte: SCB:s "Eknö" och "Hasselö" ligger i Västerviks kommun, medan
 * Svallas Eknö och Hasselö ligger i Värmdö. De är därför INTE med. Kommunen
 * läses ur SCB-kodens fyra första siffror (kommunkoden), och skriptet
 * stoppar om den inte är den kommun vi förväntar oss.
 *
 * Körs för hand (nätverk i bygget är en risk vi inte tar):
 *   node scripts/hamta-scb-oar.mjs
 */
import { writeFileSync } from 'node:fs'

const TABELL = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/MI/MI0812/MI0812A/OarEjBro01'
const REGIONER = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/BE/BE0101/BE0101A/BefolkningNy'
const SIDA = 'https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/'
const AR = '2020'

// slug: [SCB-kod, förväntad kommun, SCB:s namn om det skiljer sig från ösidans]
const KOPPLING = {
  arholma: ['0188Q103', 'Norrtälje'],
  asperon: ['1480Q104', 'Göteborg'],
  'aspo-blekinge': ['1080Q101', 'Karlskrona'],
  astol: ['1419Q102', 'Tjörn'],
  birka: ['0125Q103', 'Ekerö', 'Björkö'],
  blido: ['0188Q101', 'Norrtälje'],
  branno: ['1480Q103', 'Göteborg', 'Brännö och Galterö'],
  donso: ['1480Q101', 'Göteborg'],
  dyron: ['1419Q101', 'Tjörn', 'Stora Dyrön'],
  faro: ['0980Q102', 'Gotland'],
  fejan: ['0188Q112', 'Norrtälje'],
  gallno: ['0120Q107', 'Värmdö'],
  gotland: ['0980Q101', 'Gotland'],
  graskar: ['0188Q106', 'Norrtälje'],
  grinda: ['0120Q115', 'Värmdö'],
  gullholmen: ['1421Q105', 'Orust'],
  hano: ['1083Q101', 'Sölvesborg'],
  hemson: ['2280Q101', 'Härnösand'],
  holmon: ['2480Q101', 'Umeå'],
  hono: ['1407Q101', 'Öckerö'],
  husaro: ['0117Q104', 'Österåker'],
  ingmarso: ['0117Q102', 'Österåker'],
  karingon: ['1421Q103', 'Orust'],
  kymmendo: ['0136Q103', 'Haninge'],
  landsort: ['0192Q101', 'Nynäshamn', 'Öja (Landsort)'],
  ljustero: ['0117Q101', 'Österåker'],
  marstrand: ['1482Q101', 'Kungälv', 'Marstrandsön'],
  moja: ['0120Q102', 'Värmdö'],
  namdo: ['0120Q106', 'Värmdö'],
  norrora: ['0188Q110', 'Norrtälje'],
  ockero: ['1407Q102', 'Öckerö'],
  orno: ['0136Q101', 'Haninge'],
  rindo: ['0187Q101', 'Vaxholm'],
  roro: ['1407Q107', 'Öckerö'],
  runmaro: ['0120Q101', 'Värmdö'],
  sandhamn: ['0120Q103', 'Värmdö', 'Sandön'],
  storholmen: ['0186Q101', 'Lidingö', 'Storholmen och Tallholmen'],
  styrso: ['1480Q102', 'Göteborg'],
  svartso: ['0120Q104', 'Värmdö'],
  tynningo: ['0187Q102', 'Vaxholm'],
  ulvon: ['2284Q101', 'Örnsköldsvik', 'Norra Ulvön'],
  uto: ['0136Q102', 'Haninge'],
  ven: ['1282Q101', 'Landskrona'],
  visingo: ['0680Q101', 'Jönköping'],
  vrango: ['1480Q105', 'Göteborg'],
  yxlan: ['0188Q102', 'Norrtälje'],
}

const hamta = async (url, body) => {
  const r = await fetch(url, body
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    : undefined)
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`)
  return r.json()
}

const meta = await hamta(TABELL)
const oVar = meta.variables.find(v => v.code === 'Oar')
const scbNamn = Object.fromEntries(oVar.values.map((v, i) => [v, oVar.valueTexts[i]]))
const reg = (await hamta(REGIONER)).variables.find(v => v.code === 'Region')
const kommunNamn = Object.fromEntries(reg.values.map((v, i) => [v, reg.valueTexts[i]]))
const innehall = meta.variables.find(v => v.code === 'ContentsCode')
const ordning = innehall.values // folkbokförda, byggnader totalt, bostadsbyggnader (i den ordning SCB anger)
const idx = kod => ordning.indexOf(kod)
const [BEF, BYGG, BOST] = ['000005QY', '000005R0', '000005QZ'].map(idx)
if ([BEF, BYGG, BOST].some(i => i < 0)) throw new Error('SCB har ändrat tabellinnehållet — granska innan du kör igen')

const data = await hamta(TABELL, {
  query: [
    { code: 'Oar', selection: { filter: 'item', values: Object.values(KOPPLING).map(k => k[0]) } },
    { code: 'Tid', selection: { filter: 'item', values: [AR] } },
  ],
  response: { format: 'json' },
})
const perKod = Object.fromEntries(data.data.map(d => [d.key[0], d.values]))
const tal = s => (/^\d+$/.test(s) ? Number(s) : null) // '..' = SCB redovisar ingen siffra

const ut = {}
for (const [slug, [kod, kommun, namn]] of Object.entries(KOPPLING)) {
  const faktisktNamn = scbNamn[kod]
  const faktiskKommun = kommunNamn[kod.slice(0, 4)]
  if (!faktisktNamn) throw new Error(`${slug}: SCB-koden ${kod} finns inte längre`)
  if (faktiskKommun !== kommun) throw new Error(`${slug}: ${kod} ligger i ${faktiskKommun}, väntade ${kommun}`)
  if (namn && namn !== faktisktNamn) throw new Error(`${slug}: SCB kallar ${kod} "${faktisktNamn}", väntade "${namn}"`)
  const v = perKod[kod]
  if (!v) throw new Error(`${slug}: ingen data för ${kod} år ${AR}`)
  ut[slug] = {
    scbNamn: faktisktNamn,
    kommun: faktiskKommun,
    folkbokforda: tal(v[BEF]),
    byggnader: tal(v[BYGG]),
    bostadsbyggnader: tal(v[BOST]),
  }
}

const idag = new Date().toISOString().slice(0, 10)
const fil = `// GENERERAD av scripts/hamta-scb-oar.mjs ${idag} — ändra inte för hand.
// KÄLLA: ${SIDA} — SCB, "Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö", referenstid 31 december ${AR} (hämtad ${idag})

export type ScbO = {
  /** SCB:s namn på ön, när det skiljer sig från ösidans (t.ex. Sandön för Sandhamn). */
  scbNamn: string
  kommun: string
  /** null = SCB redovisar ingen siffra för ön (".." i tabellen). */
  folkbokforda: number | null
  byggnader: number | null
  bostadsbyggnader: number | null
}

export const SCB_OAR_KALLA = {
  url: '${SIDA}',
  tabell: 'Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö',
  referens: '31 december ${AR}',
  hamtad: '${idag}',
} as const

export const SCB_OAR: Record<string, ScbO> = ${JSON.stringify(ut, null, 2)}
`
writeFileSync(new URL('../src/app/o/scb-oar.generated.ts', import.meta.url), fil)
console.log(`${Object.keys(ut).length} öar skrivna till src/app/o/scb-oar.generated.ts`)
