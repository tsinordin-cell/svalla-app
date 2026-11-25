/**
 * islandFaqs.ts — FAQ per ö, byggd enbart ur ösidans källbelagda data.
 *
 * Tidigare fanns handskrivna svar för 19 öar och regionmallar. De saknade
 * källor och innehöll fel (gratis Marstrandsfärja, buss 312, bilfärja till
 * Arholma) och priser. De togs bort 2026-10-19. Varje svar här återger nu
 * bara fält som redan visas på sidan med källa: getting_there, restaurants,
 * accommodation, harbors och SCB:s befolkningssiffra. Saknas data för en
 * fråga ställs den inte. Skriv aldrig in fritext här.
 */

import type { Island } from '@/app/o/island-data'
import { SCB_OAR, SCB_OAR_KALLA } from '../app/o/scb-oar.generated'
import { fardsattFran, klockslagsregler } from './mallRegler'
import { aktivitetensLage, grannoarIData } from './badLage'

export interface FAQ {
  q: string
  a: string
}

function lista(namn: string[]): string {
  if (namn.length <= 1) return namn.join('')
  // Ett namn med kommatecken ("Segelsalen, Sandhamn Seglarhotell") lästes som två ställen; då skiljer semikolon
  // (full-20 k084, mallarnas runda 5, 2026-11-10).
  const skilje = namn.some(n => n.includes(',')) ? '; ' : ', '
  return `${namn.slice(0, -1).join(skilje)} och ${namn[namn.length - 1]}`
}

/**
 * Restaurang, krog eller värdshus, samma regel som restaurangsidans rubrik (restauranger/page.tsx). Barer,
 * kaféer och dansställen svarar inte på "Finns det restaurang?": på Utö räknades Bakfickan, enligt
 * verksamheten en nattklubb, som restaurang (full-22 k002; mallarnas runda 5, 2026-11-10).
 */
const RESTAURANGTYP = /restaurang|krog|värdshus|wärdshus|bistro|brasserie/i
const DB_TYPORD: Record<string, string> = { restaurant: 'restaurang', cafe: 'kafé', bar: 'bar' }

/** Regler för gästerna i hamntexten: bokning, betalning, avgift, förtöjning. */
const HAMNREGLER = /förhandsbok|bokning|boka\b|betala|avgift|swish|förtöjning|förbjud|tillåtet/i

function punkt(s: string): string {
  const t = s.trim()
  return /[.!?]$/.test(t) ? t : `${t}.`
}

/**
 * "Hur många bor på X?" ur SCB:s officiella statistik (kort 80106ebb,
 * 2026-09-29). Bara för öar där SCB redovisar en siffra. Svaret säger vilket
 * namn SCB använder när det skiljer sig från ösidans, så att läsaren kan
 * kontrollera siffran i tabellen.
 */
export function befolkningsFaq(island: Pick<Island, 'slug' | 'name'>): FAQ | null {
  const s = SCB_OAR[island.slug]
  if (!s || s.folkbokforda === null) return null
  const antal = s.folkbokforda.toLocaleString('sv-SE')
  const personer = s.folkbokforda === 1 ? 'person' : 'personer'
  const var_ = s.scbNamn === island.name
    ? `Enligt SCB var ${antal} ${personer} folkbokförda på ${island.name} den ${SCB_OAR_KALLA.referens}.`
    : `SCB redovisar ${island.name} som ${s.scbNamn}. Där var ${antal} ${personer} folkbokförda den ${SCB_OAR_KALLA.referens}.`
  return {
    q: `Hur många bor på ${island.name}?`,
    a: `${var_} Det är det senaste året i SCB:s statistik över öar utan bro till fastlandet. Hur många som är där sommartid säger siffran inget om.`,
  }
}

type FaqIsland = Pick<Island, 'slug' | 'name' | 'getting_there' | 'restaurants' | 'accommodation' | 'harbors'>

/**
 * dbKrogar: platsdatabasens ställen på ön (restaurant, cafe, bar), som restaurangsidan räknar dem. Förut räknade
 * FAQ:n bara ödatan, 4 på Sandhamn mot restaurangsidans 10 (full-20 k084; mallarnas runda 5, 2026-11-10).
 */
export function getFaqsForIsland(island: FaqIsland, extra: { dbKrogar?: { name: string; type: string }[]; stryk?: boolean } = {}): FAQ[] {
  const ut: FAQ[] = []
  // stryk: false på sidor där strykningen av klockslag är uppskjuten (Toms beslut 10; src/lib/klockslagStrykning.ts).
  const { utanKlockslagsmeningar } = klockslagsregler(extra.stryk ?? true)
  const n = island.name

  // Alla färdsätt: slice(0, 2) tappade Waxholmsbolagets linje 2 på Fjäderholmarna,
  // den enda båten där efter sommarsäsongen (faktagranskningen 2026-11-02, mall-0079).
  // Utan meningar med klockslag ur datan och utan att avreseorten står två gånger (mallarnas runda 5).
  const resor = island.getting_there ?? []
  if (resor.length) {
    ut.push({
      q: `Hur tar jag mig till ${n}?`,
      a: resor.map(r => { const d = utanKlockslagsmeningar(r.desc); return `${fardsattFran(r.method, r.from)}${d ? `: ${punkt(d)}` : '.'}` }).join(' ')
        + ' Kontrollera alltid aktuella avgångar hos trafikbolaget innan du åker.',
    })
  }

  // Typen inom parentes, som på restaurangkorten: Husarös enda ställe är ett kafé (mall-0080).
  // Restaurangerna först; barer, kaféer och andra ställen för sig (mallarnas runda 5).
  const stallen = [
    ...(island.restaurants ?? []).map(r => ({ namn: r.name, typ: r.type ?? '' })),
    ...(extra.dbKrogar ?? []).map(p => ({ namn: p.name, typ: DB_TYPORD[p.type] ?? '' })),
  ]
  const medTyp = (x: { namn: string; typ: string }) => (x.typ ? `${x.namn} (${x.typ.toLowerCase()})` : x.namn)
  const restauranger = stallen.filter(x => RESTAURANGTYP.test(x.typ)).map(medTyp)
  const ovriga = stallen.filter(x => !RESTAURANGTYP.test(x.typ)).map(medTyp)
  const urval = (namn: string[], max: number) => `${lista(namn.slice(0, max))}${namn.length > max ? ` och ${namn.length - max} till` : ''}`
  if (restauranger.length) {
    ut.push({
      q: `Finns det restaurang på ${n}?`,
      a: `På Svalla finns ${urval(restauranger, 5)}.${ovriga.length ? ` Dessutom ${urval(ovriga, 3)}.` : ''} Kolla öppettiderna hos stället innan du åker.`,
    })
  } else if (ovriga.length) {
    ut.push({
      q: `Var kan man äta och dricka på ${n}?`,
      a: `På Svalla finns ${urval(ovriga, 5)}. Kolla öppettiderna hos stället innan du åker.`,
    })
  }

  // "Ja" bara för boende på ön. Boende på en annan ö eller ort (samma lägesregel som badsidan och aktivitetssidan,
  // aktivitetensLage) står för sig: Vindö (Djurönäset), Öckerö (Skärgårdshotellet Hönö) (Kontrollantens fynd mo01-k004;
  // mallarnas runda 7, 2026-11-17).
  const grannoar = grannoarIData(island)
  const allaBoenden = island.accommodation ?? []
  const boende = allaBoenden.filter(a => aktivitetensLage(a, n, grannoar) === 'pa').map(a => a.name)
  const naraBoende = allaBoenden.filter(a => aktivitetensLage(a, n, grannoar) !== 'pa').map(a => a.name)
  const fler = (namn: string[]) => `${lista(namn.slice(0, 5))}${namn.length > 5 ? ` och ${namn.length - 5} till` : ''}`
  if (boende.length) {
    ut.push({
      q: `Finns det boende på ${n}?`,
      a: `Ja. På Svalla finns ${fler(boende)}.${naraBoende.length ? ` Nära ön finns också ${fler(naraBoende)}.` : ''}`,
    })
  } else if (naraBoende.length) {
    ut.push({
      q: `Finns det boende på ${n}?`,
      a: `På Svalla finns inget boende på själva ${n}. Nära ön finns ${fler(naraBoende)}.`,
    })
  }

  // "Mer om service och regler finns under Hamnar" bara när hamnsidan har det: 27 av 85 öar har varken service,
  // bränsle eller platsantal i hamnposterna, till exempel Landsort (full-28 k022, mall-0085; mallarnas runda 5).
  const hamnar = island.harbors ?? []
  if (hamnar.length) {
    const service = hamnar.some(h => (h.service?.length ?? 0) > 0 || h.fuel)
    const regler = hamnar.some(h => HAMNREGLER.test(h.desc))
    const mer = service && regler ? ' Mer om service och regler finns under Hamnar.' : service ? ' Mer om service finns under Hamnar.' : regler ? ' Mer om regler finns under Hamnar.' : ''
    ut.push({
      q: `Var kan jag lägga till med egen båt på ${n}?`,
      a: `${lista(hamnar.map(h => h.spots ? `${h.name} (${h.spots} platser)` : h.name))}.${mer}`,
    })
  }

  const bef = befolkningsFaq(island)
  if (bef) ut.push(bef)
  return ut
}
