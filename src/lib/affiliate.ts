/**
 * Affiliate-länkar — programkatalog, URL-builder och click-tracking.
 *
 * Princip:
 *   - Vi äger länken. All affiliate-trafik routas via /api/affiliate/click så
 *     vi kan logga klick själva (utöver nätverkets dashboard) och bygga
 *     UTM-attribuering för PostHog.
 *   - Vi använder rel="sponsored noopener" och target="_blank" — krävs av
 *     Google's policy och håller refererinformation från att läcka.
 *   - Vi har en explicit programkatalog (PROGRAMS nedan). Ingen "sätt vad-
 *     som-helst-URL"-fri-text i komponenten — det skapar XSS-risk och gör
 *     RPM-mätning omöjlig per program.
 *
 * Lägga till nytt program:
 *   1. Skaffa ett deep-link-prefix från Adtraction/Awin (deras länkbyggare)
 *   2. Lägg till en post i PROGRAMS nedan
 *   3. Använd <AffiliateLink program="ditt-id" placement="..." /> i UI
 */

export type AffiliateNetwork = 'adtraction' | 'awin' | 'direct'

export type AffiliateProgram = {
  /** Vår interna ID — används i AffiliateLink program-prop */
  id: string
  /** Visningsnamn */
  name: string
  /** Vilket nätverk programmet ligger på */
  network: AffiliateNetwork
  /**
   * Mall-URL där {DEEP_LINK} byts ut mot encodeURIComponent(deepLink).
   * Tom sträng = direkt-URL utan deep-linking (fungerar inte för alla program).
   * Adtraction-format: https://track.adtraction.com/t/t?a=AFFID&as=PROGID&t=2&url={DEEP_LINK}
   * Awin-format:       https://www.awin1.com/cread.php?awinmid=MERCHID&awinaffid=AFFID&clickref=CLICKREF&p={DEEP_LINK}
   */
  trackingTemplate: string
  /** Default-domän som visas till användaren ("Annonsör: …") */
  brand: string
  /** Optional: kort beskrivning för admin-vyn */
  category?: string
}

/**
 * PROGRAMKATALOG
 *
 * Tomma trackingTemplate = inte ännu uppkopplad mot nätverk. Då går
 * <AffiliateLink> i "preview-mode" — visar länken men flagger att den
 * inte är intäktsgenererande än. Bra för att UI-bygga innan kontot är klart.
 */
export const PROGRAMS: Record<string, AffiliateProgram> = {
  // === BÅT & SJÖ ===
  batagent: {
    id: 'batagent',
    name: 'Båtagent',
    network: 'adtraction',
    trackingTemplate: '', // TODO: fyll efter Adtraction-godkännande
    brand: 'batagent.se',
    category: 'Begagnade båtar',
  },
  navigationsbutiken: {
    id: 'navigationsbutiken',
    name: 'Navigationsbutiken',
    network: 'adtraction',
    trackingTemplate: '',
    brand: 'navigationsbutiken.se',
    category: 'Sjökort & navigation',
  },
  watski: {
    id: 'watski',
    name: 'Watski',
    network: 'adtraction',
    trackingTemplate: '',
    brand: 'watski.se',
    category: 'Båttillbehör',
  },
  hjertmans: {
    id: 'hjertmans',
    name: 'Hjertmans',
    network: 'adtraction',
    trackingTemplate: '',
    brand: 'hjertmans.se',
    category: 'Båttillbehör',
  },

  // === RESA & BOENDE ===
  booking: {
    id: 'booking',
    name: 'Booking.com',
    network: 'awin',
    trackingTemplate: '',
    brand: 'booking.com',
    category: 'Boende',
  },
  thefork: {
    id: 'thefork',
    name: 'TheFork',
    network: 'awin',
    trackingTemplate: '',
    brand: 'thefork.se',
    category: 'Restaurangbokning',
  },

  // === KLÄDER & UTRUSTNING ===
  helly_hansen: {
    id: 'helly_hansen',
    name: 'Helly Hansen',
    network: 'awin',
    trackingTemplate: '',
    brand: 'hellyhansen.com',
    category: 'Sjökläder',
  },
  webhallen: {
    id: 'webhallen',
    name: 'Webhallen',
    network: 'adtraction',
    trackingTemplate: '',
    brand: 'webhallen.com',
    category: 'Elektronik',
  },
} as const

export type ProgramId = keyof typeof PROGRAMS

/**
 * Bygger en attribuerad affiliate-URL.
 *
 * @param programId - ID från PROGRAMS-katalogen
 * @param deepLink  - Slut-URL hos annonsören (t.ex. specifik produktsida)
 * @param utm       - UTM-parametrar för intern analytics
 * @returns         - Final URL som ska användas i href
 */
export function buildAffiliateUrl(
  programId: ProgramId,
  deepLink: string,
  utm: { source: string; medium: string; campaign: string; content?: string },
): { href: string; isLive: boolean; brand: string } {
  const program = PROGRAMS[programId]
  if (!program) {
    throw new Error(`Unknown affiliate program: ${programId}`)
  }

  // Bygg UTM på deep-link så annonsörens GA visar att trafiken kom från Svalla
  const url = new URL(deepLink)
  url.searchParams.set('utm_source', utm.source)
  url.searchParams.set('utm_medium', utm.medium)
  url.searchParams.set('utm_campaign', utm.campaign)
  if (utm.content) url.searchParams.set('utm_content', utm.content)
  const taggedDeepLink = url.toString()

  // Om vi inte har ett tracking-template ännu (program inte uppsatt) —
  // skicka direkt till annonsören. Förlorar provision men UX:n fungerar.
  if (!program.trackingTemplate) {
    return { href: taggedDeepLink, isLive: false, brand: program.brand }
  }

  const trackedUrl = program.trackingTemplate.replace(
    '{DEEP_LINK}',
    encodeURIComponent(taggedDeepLink),
  )
  return { href: trackedUrl, isLive: true, brand: program.brand }
}

/**
 * Bygger vår egna click-tracking-URL — alla affiliate-klick går först hit
 * så vi loggar dem i affiliate_clicks innan användaren redirectas vidare.
 */
export function trackingRedirectUrl(params: {
  programId: ProgramId
  linkId: string
  placement: string
  destination: string
}): string {
  const u = new URL('/api/affiliate/click', 'https://svalla.se')
  u.searchParams.set('p', params.programId)
  u.searchParams.set('l', params.linkId)
  u.searchParams.set('pl', params.placement)
  u.searchParams.set('to', params.destination)
  // Returnera bara path+query — komponenten lägger ihop med origin
  return u.pathname + u.search
}
