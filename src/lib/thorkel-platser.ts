/**
 * Platslistan som Thorkel får i systemprompten, och kontrollen av länkarna i hans svar.
 *
 * 2026-10-23: Förut hämtade guiden de 80 första platserna i bokstavsordning av ca 700,
 * dolda platser kom med, och varje länk till en platssida (/upptack/<id>) ströks, eftersom
 * kontrollen bara släppte igenom /platser/<id>. Grinda Wärdshus (plats 208 i bokstavsordning)
 * syntes därför aldrig för Thorkel, och hans bokningslänk dit kunde inte finnas.
 * Nu får han alla synliga krogar, kaféer, barer, bastur och boenden som ligger på en ö,
 * sorterade per ö, med bokningslänk och öppettider där de finns.
 */

export type PlatsRad = {
  id: string
  name: string | null
  island: string | null
  type: string | null
  booking_url: string | null
  opening_hours: string | null
  endast_medlemmar: boolean | null
}

/** Platstyper som Thorkel får i sin lista (kolumnen restaurants.type). */
export const THORKEL_PLATSTYPER = ['restaurant', 'cafe', 'bar', 'sauna', 'hotel'] as const

const TYPNAMN: Record<string, string> = {
  restaurant: 'krog',
  cafe: 'kafé',
  bar: 'bar',
  sauna: 'bastu',
  hotel: 'boende',
}

/** Längsta öppettidstext som tas med per plats; resten kortas med en ellips. */
const MAX_OPPETTIDER = 120

function kort(text: string, max: number): string {
  const ren = text.replace(/\s+/g, ' ').trim()
  return ren.length > max ? `${ren.slice(0, max - 1).trimEnd()}…` : ren
}

export function platsUrl(id: string): string {
  return `https://svalla.se/upptack/${id}`
}

export type Platslista = {
  /** Raderna till systemprompten, en plats per rad, sorterade per ö och namn. */
  text: string
  /** Id:n som Thorkel får länka till. */
  idn: Set<string>
  /** Bokningslänkar som Thorkel får visa. */
  bokningslankar: Set<string>
  antal: number
}

/**
 * Bygger Thorkels platslista. Raderna ska redan vara filtrerade på synliga platser
 * (hidden_at is null) och på THORKEL_PLATSTYPER; platser utan ö eller namn hoppas över,
 * eftersom Thorkel väljer platser efter ö.
 */
export function byggPlatslista(rader: PlatsRad[]): Platslista {
  const med = rader
    .filter(r => r.id && r.name?.trim() && r.island?.trim())
    .sort((a, b) =>
      a.island!.trim().localeCompare(b.island!.trim(), 'sv') ||
      a.name!.trim().localeCompare(b.name!.trim(), 'sv'))

  const idn = new Set<string>()
  const bokningslankar = new Set<string>()
  const textrader = med.map(r => {
    idn.add(r.id)
    const typ = TYPNAMN[r.type ?? ''] ?? 'plats'
    const delar = [`${r.name!.trim()} (${r.island!.trim()}, ${typ}): ${platsUrl(r.id)}`]
    const bokning = r.booking_url?.trim()
    if (bokning) {
      bokningslankar.add(bokning)
      delar.push(`${r.type === 'hotel' ? 'Boka' : 'Boka bord'}: ${bokning}`)
    }
    const oppet = r.opening_hours?.trim()
    if (oppet) delar.push(`Öppettider enligt Svalla: ${kort(oppet, MAX_OPPETTIDER)}`)
    if (r.endast_medlemmar) delar.push('Endast för medlemmar')
    return delar.join(' · ')
  })

  return { text: textrader.join('\n'), idn, bokningslankar, antal: textrader.length }
}

/** Instruktionen som står direkt under listan i systemprompten. */
export const PLATSLISTA_REGLER =
  'När du nämner en plats ur listan, länka till platssidan på Svalla. Om bokningslänk finns, visa den tydligt: ' +
  '[Boka bord →](länken ur listan). Du kan inte boka själv; skicka länken. ' +
  'Öppettiderna i listan är säsongstider ur Svallas platsdata, inte dagens. Skriv dem som "enligt Svalla" ' +
  'och be användaren ringa innan. En plats märkt "Endast för medlemmar" föreslår du bara om användaren är medlem.'

/** Svallas egna sidor som Thorkel alltid får länka till. */
const EGNA_SIDOR = '(planera|karta|resmal|populara-turer|segelrutter|kom-igang|logga-in)'
/**
 * Ösidornas undersidor. De motsvarar mapparna i src/app/o/[slug]/; en ny mapp där måste läggas till här,
 * annars stryks länken tyst (så försvann all länkning till ösidor fram till 2026-09-14).
 */
const O_UNDERSIDOR = '(bad|boende|hamnar|komma-dit|restauranger|aktiviteter|med-barn)'

/**
 * Behåller bara länkar som pekar på något som finns: platssidor ur listan, bokningslänkar ur listan,
 * Svallas egna sidor och ösidor vars slug finns. Andra länkar blir vanlig text (etiketten står kvar).
 */
export function rensaLankar(
  text: string,
  tillatet: { platsIdn: Set<string>; bokningslankar: Set<string>; oSlugs: Set<string> },
): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (hel, etikett: string, url: string) => {
    const plats = /^(?:https?:\/\/svalla\.se)?\/(?:platser|upptack)\/([0-9a-f-]+)\/?$/i.exec(url)
    if (plats && tillatet.platsIdn.has(plats[1]!.toLowerCase())) return hel
    if (tillatet.bokningslankar.has(url)) return hel
    if (new RegExp(`^https?://svalla\\.se/${EGNA_SIDOR}(/|$|\\?)`, 'i').test(url)) return hel
    if (new RegExp(`^/${EGNA_SIDOR}(/|$|\\?)`, 'i').test(url)) return hel
    const o = new RegExp(`^(?:https?://svalla\\.se)?/o/([a-z0-9-]+)(?:/${O_UNDERSIDOR})?/?$`, 'i').exec(url)
    if (o && tillatet.oSlugs.has(o[1]!.toLowerCase())) return hel
    return etikett
  })
}
