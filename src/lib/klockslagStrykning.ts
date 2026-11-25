/**
 * Var mallarna stryker klockslag ur öarnas data (Toms beslut 10, C, 2026-11-17; docs/faktagranskning/beslut-tom.md).
 *
 * Mallarna skriver inga klockslag, avgångstider eller öppettider i löptext (ARBETSREGLER). På sidorna nedan stryks
 * klockslagen i korten med färdsätt (getting_there: tid och text), i FAQ-svaren, i restiden och i komma-dit-sidans
 * turtäthet och parkering (src/lib/mallRegler.ts, regeln i src/lib/klockslag.mjs). Källistan stryker alltid
 * (scripts/generera-kallor.mjs).
 *
 * Beslut C: på batch 01:s nio öar stryks klockslagen alltid, och sidorna kompenseras med belagt innehåll i öarnas data.
 * På andra öar stryks de bara på de sidor som efter strykningen har minst 95 % av ordantalet på main ce275b2 (Lag 3).
 * På övriga sidor skjuts strykningen upp till öns egen batch och står på Vaktens lista: UPPSKJUTEN_STRYKNING nedan.
 * Listan är mätt (mallarnas runda 8, 2026-11-17): alla 101 öar och de fyra sidtyperna renderade med tsx, med strykning
 * på alla sidor, och ordantalet jämfört med main ce275b2. Platsdatabasen: SELECT ur restaurants 2026-11-17 (riktiga namn,
 * dolda platser borttagna; runda 7 mätte med en låtsasdatabas, vilket gav 53 sidor i stället för 44).
 * När en ö granskas tas dess rader bort här.
 */
export type KlockslagsSida = 'ösidan' | 'komma-dit' | 'boende' | 'med-barn'

/** Batch 01: klockslagen stryks alltid (beslut C). */
export const BATCH_01 = new Set(['fjaderholmarna', 'grinda', 'husaro', 'moja', 'sandhamn', 'storholmen', 'styrso', 'uto', 'vaxholm'])

/** Sidor utanför batch 01 där strykningen skjuts upp ("<slug>/<sida>"), eftersom sidan annars hamnar under 95 % av main. */
// Mätt 2026-11-17 (mallarnas runda 8, med den riktiga platsdatabasen och runda 8:s kompensation): kommentaren visar
// ordantalet med strykning mot main ce275b2 (under 95 %).
export const UPPSKJUTEN_STRYKNING = new Set<string>([
  // Runda 11 (2026-11-25, Redaktörens beslut enligt beslut C): öar som är nya på main, mätt mot f3f8df4 med öarnas poster.
  'amto/boende', 'arkosund/boende', 'harstena/boende',  // boende 120/127, 104/111, 122/129 ord
  'asko/ösidan', 'asko/boende', 'asko/med-barn',  // ösidan 1125/1209 ord, boende 189/220 ord, med-barn 230/252 ord
  'asperon/komma-dit', 'asperon/boende', 'asperon/med-barn',  // komma-dit 213/228 ord, boende 175/208 ord, med-barn 340/367 ord
  'bla-jungfrun/ösidan', 'bla-jungfrun/boende', 'bla-jungfrun/med-barn',  // ösidan 1752/1897 ord, boende 206/261 ord, med-barn 354/408 ord
  'djuro/boende', 'djuro/med-barn',  // boende 205/235 ord, med-barn 365/389 ord
  'ekno/ösidan', 'ekno/boende', 'ekno/med-barn',  // ösidan 997/1058 ord, boende 147/168 ord; med-barn 195/206 mot main f3f8df4 (runda 11)
  'fjardlang/ösidan', 'fjardlang/boende',  // ösidan 1688/1777 ord, boende 265/281 ord
  'gotska-sandon/ösidan', 'gotska-sandon/boende',  // ösidan 1631/1741 ord, boende 268/295 ord
  'huvudskar/boende',  // boende 187/208 ord
  'kymmendo/boende',  // boende 218/244 ord
  'landsort/boende',  // boende 218/244 ord
  'lido/ösidan', 'lido/komma-dit', 'lido/boende', 'lido/med-barn',  // ösidan 1816/1955 ord, komma-dit 333/365 ord, boende 242/297 ord, med-barn 338/385 ord
  'lilla-karlso/boende',  // boende 192/208 ord
  'nattaro/boende',  // boende 234/247 ord
  'pater-noster/boende', 'pater-noster/med-barn',  // boende 210/235 ord, med-barn 341/359 ord
  'resaro/komma-dit', 'resaro/boende', 'resaro/med-barn',  // komma-dit 347/387 ord, boende 218/273 ord, med-barn 339/386 ord
  'rodloga/ösidan', 'rodloga/komma-dit', 'rodloga/boende', 'rodloga/med-barn',  // ösidan 1875/2006 ord, komma-dit 301/353 ord, boende 231/306 ord, med-barn 303/367 ord
  'svartloga/ösidan', 'svartloga/komma-dit', 'svartloga/boende', 'svartloga/med-barn',  // ösidan 1633/1855 ord, komma-dit 333/397 ord, boende 219/306 ord, med-barn 332/410 ord
  'tjaro/komma-dit', 'tjaro/boende', 'tjaro/med-barn',  // komma-dit 300/327 ord, boende 271/313 ord, med-barn 380/415 ord
  'vrango/boende', 'vrango/med-barn',  // boende 230/255 ord, med-barn 288/307 ord
])

/** Stryker mallarna klockslagen på den här sidan? */
export function stryksKlockslag(slug: string, sida: KlockslagsSida): boolean {
  return BATCH_01.has(slug) || !UPPSKJUTEN_STRYKNING.has(`${slug}/${sida}`)
}
