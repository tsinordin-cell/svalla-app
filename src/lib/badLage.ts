/**
 * Var en badplats eller aktivitet ligger enligt sin egen text: på ön, på en annan plats, eller oklart. Används av
 * badsidan och med barn-sidan (flyttad från bad/page.tsx i mallarnas runda 5, 2026-11-10; mall-N004, mall-0198).
 */
import { ALL_ISLANDS } from '@/app/o/island-data'
import { pekarBort, meningar } from '@/lib/mallRegler'

/**
 * Ligger badplatsen på ön enligt sin egen text? Platsdatabasens urval är en cirkel kring ön och fångar
 * grannöar (Gröna vik "på Brännö", 4,3 km från Styrsö; Kåreviks badplats "på södra Tjörn", 1,4 km från
 * Dyrön), och öns egen lista kan ha en badplats på grannön (Ålö Storsand på Utö). Rubriken "Badplatser på X"
 * räknar bara platser på ön (2026-11-03, mall-N004). 'pa': texten säger "på <ön>", i öns egen lista också
 * "på ön", "på öns" eller "runt ön"; 'annan': texten säger "på grannön", "på <en annan ö i Svalla>",
 * "<väderstreck> om <ön>", "nära <ön>" eller "utanför <ön>" (Tanum Strand "strax söder om Grebbestad");
 * 'oklar': texten säger inget om vilken ö. En oklar plats räknas inte som på ön: den står under
 * "på och nära" och får etiketten "Badplats på eller nära X" (Härmanö huvud stod som "Badplats på
 * Gullholmen"; 2026-11-07, mall-N004 omarbete 4).
 */
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
export function paOrt(namn: string): RegExp {
  return new RegExp(`(?:^|[^a-zåäö])på (?:(?:norra|södra|östra|västra|nordöstra|nordvästra|sydöstra|sydvästra) )?${esc(namn)}s?(?![a-zåäö])`, 'i')
}
/**
 * "<väderstreck> om X", "nära X", "utanför X". Inte när namnet är början på en kyrkas namn: "4 km söder om Mörkö kyrka"
 * (Slessberget) och "nordväst om Fårö kyrka" (Gamla Hamn) anger läget från kyrkan, inte från en annan plats än ön
 * (mallarnas runda 7, 2026-11-17).
 */
export function naraOrt(namn: string): RegExp {
  return new RegExp(`(?:^|[^a-zåäö])(?:(?:norr|söder|öster|väster|nordost|nordväst|sydost|sydväst) om|nära|utanför) ${esc(namn)}s?(?![a-zåäö])(?!\\s+(?:kyrka|kyrkby|kapell)(?![a-zåäö]))`, 'i')
}
export function lage(text: string, oNamn: string, egen = false): 'pa' | 'annan' | 'oklar' {
  if (paOrt(oNamn).test(text) || (egen && /(?:^|[^a-zåäö])(?:på öns?|runt ön)(?![a-zåäö])/i.test(text))) return 'pa'
  if (/på grannön/i.test(text) || naraOrt(oNamn).test(text) || ALL_ISLANDS.some(o => o.name !== oNamn && paOrt(o.name).test(text))) return 'annan'
  return 'oklar'
}

/** "utanför <ort>", vilken ort som helst: Nordens Ark "på Åby säteri utanför Hunnebostrand" (Kungshamn). */
const UTANFOR_ORT = /(?:^|[^\p{L}])utanför \p{Lu}/u

/** Nämner meningen ön själv: "<ön>" eller "<ön>s" (inte efter "från", "till", "nära", "utanför" eller "<väderstreck> om"), "på ön" eller "runt ön". */
function namnerOn(mening: string, oNamn: string): boolean {
  if (/(?:^|[^\p{L}])(?:på öns?|runt ön)(?!\p{L})/iu.test(mening)) return true
  const fore = /(?:från|till|nära|utanför|(?:norr|söder|öster|väster|nordost|nordväst|sydost|sydväst) om)\s$/i
  for (const m of mening.matchAll(new RegExp(`(?<!\\p{L})${esc(oNamn)}s?(?!\\p{L})`, 'giu'))) {
    if (!fore.test(mening.slice(Math.max(0, (m.index ?? 0) - 12), m.index))) return true
  }
  return false
}

/**
 * Gäller aktiviteten ön? Rubriken "Bad och vattenliv på X" stod över kort om andra platser: Vindö "Bad på Djurö",
 * Gräddö "Björköörens badplats" ("väster om Gräddö"), Gullholmen "Vandra på Härmanö" (mall-0198; mallarnas runda 5,
 * 2026-11-10). Regeln (runda 6, 2026-11-16, Kontrollantens fynd ma5021 och ma5027):
 *  1. Kortet gäller en annan plats när namnet säger "på" en annan ö i Svalla eller en grannö som öns egen data nämner
 *     ("grannön Härmanö"), eller när första meningen pekar bort (pekarBort: "Närmast …", "ingen badplats", "grannön")
 *     eller säger "nära X", "<väderstreck> om X" eller "utanför <ort>", vilken ort som helst (Nordens Ark "utanför
 *     Hunnebostrand" på Kungshamn).
 *  2. Ett sådant kort är 'annan' (rubriken "nära X"), utom när en senare mening nämner ön själv (inte efter "från",
 *     "till", "nära", "utanför" eller "<väderstreck> om"), "på ön" eller "runt ön". Då beskriver kortet både ön och en
 *     annan plats och är 'bada' (rubriken "på och nära X"): Utös "Bad & stränder" börjar med Ålö Storsand på grannön,
 *     men nästa mening följer leden genom Utö skjutfält och den sista beskriver Barnens bad och Rävstavik.
 *  3. Andra kort är 'pa'. Örens badplats på Torö och Stenbogen i Kungshamn räknas som på ön, och "Buss 860 från
 *     Kungshamn" gör inte Nordens Ark till ett kort om Kungshamn.
 */
export function aktivitetensLage(a: { name: string; desc: string }, oNamn: string, grannoar: string[]): 'pa' | 'bada' | 'annan' {
  const [forsta = '', ...resten] = meningar(a.desc)
  const namnetPekarBort = [...ALL_ISLANDS.map(o => o.name).filter(n => n !== oNamn), ...grannoar].some(n => paOrt(n).test(a.name))
  // Säger första meningen "på <ön>", pekar "utanför <ort>" eller "nära" inte bort: Slussens Pensionat "på norra Orust, i
  // Slussen utanför Henån" (mallarnas runda 7, 2026-11-17).
  const narhet = !paOrt(oNamn).test(`${a.name}. ${forsta}`) && (naraOrt(oNamn).test(`${a.name}. ${forsta}`) || UTANFOR_ORT.test(`${a.name}. ${forsta}`))
  const borta = namnetPekarBort || pekarBort(a.desc) || narhet
  if (!borta) return 'pa'
  return resten.some(m => namnerOn(m, oNamn)) ? 'bada' : 'annan'
}

/** Rubrikordet för ett läge: "på X", "på och nära X", "nära X". */
export const LAGESORD: Record<'pa' | 'bada' | 'annan', string> = { pa: 'på', bada: 'på och nära', annan: 'nära' }

/** Grannöar som öns egen data nämner ("Härmanö huvud på grannön Härmanö"). */
export function grannoarIData(island: object): string[] {
  return [...new Set([...JSON.stringify(island).matchAll(/grannön ([A-ZÅÄÖ][\p{L}-]+)/gu)].map(m => m[1]!))]
}
