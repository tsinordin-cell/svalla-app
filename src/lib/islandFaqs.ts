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

export interface FAQ {
  q: string
  a: string
}

function lista(namn: string[]): string {
  if (namn.length <= 1) return namn.join('')
  return `${namn.slice(0, -1).join(', ')} och ${namn[namn.length - 1]}`
}

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

export function getFaqsForIsland(island: FaqIsland): FAQ[] {
  const ut: FAQ[] = []
  const n = island.name

  const resor = (island.getting_there ?? []).slice(0, 2)
  if (resor.length) {
    ut.push({
      q: `Hur tar jag mig till ${n}?`,
      a: resor.map(r => `${r.method}${r.from ? ` från ${r.from}` : ''}: ${punkt(r.desc)}`).join(' ')
        + ' Kontrollera alltid aktuella avgångar hos trafikbolaget innan du åker.',
    })
  }

  const krogar = (island.restaurants ?? []).map(r => r.name)
  if (krogar.length) {
    ut.push({
      q: `Finns det restaurang på ${n}?`,
      a: `På Svalla finns ${lista(krogar.slice(0, 5))}${krogar.length > 5 ? ` och ${krogar.length - 5} till` : ''}. Öppettiderna skiljer sig mellan säsonger, så kolla ställets egen sida innan du åker.`,
    })
  }

  const boende = (island.accommodation ?? []).map(a => a.name)
  if (boende.length) {
    ut.push({
      q: `Finns det boende på ${n}?`,
      a: `Ja. På Svalla finns ${lista(boende.slice(0, 5))}${boende.length > 5 ? ` och ${boende.length - 5} till` : ''}.`,
    })
  }

  const hamnar = island.harbors ?? []
  if (hamnar.length) {
    ut.push({
      q: `Finns det gästhamn för egen båt på ${n}?`,
      a: `${lista(hamnar.map(h => h.spots ? `${h.name} (${h.spots} platser)` : h.name))}. Mer om service och regler finns under Hamnar.`,
    })
  }

  const bef = befolkningsFaq(island)
  if (bef) ut.push(bef)
  return ut
}
