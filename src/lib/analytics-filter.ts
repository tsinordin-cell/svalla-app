/**
 * analytics-filter — skiljer människor från agenter i analytics_events.
 *
 * Bakgrund (docs/BASLINJE-2026-09.md): 24 aug–20 sep 2026 stod 71 av 639
 * sessioner för 877 av 2 098 sidvisningar. Det var Claudes webbläsare och våra
 * egna kontroller, inte besökare. /admin/malet räknade in dem och överskattade
 * sidvisningarna med ~70 %.
 *
 * Två lager:
 *  1. arAgentUserAgent — säker träff på user-agent. Används i /api/analytics/track
 *     så raderna aldrig skrivs.
 *  2. arAgentSession — heuristik för sessioner som redan ligger i tabellen och för
 *     agenter utan märke i user-agent (Claudes molnwebbläsare skickar en vanlig
 *     Mac/Chrome-sträng från USA). Regeln: USA + minst tio sidvisningar i samma
 *     session. En svensk skärgårdssajt har få amerikaner som läser tio sidor.
 *     Det är en heuristik, inte en mätning — därför står den här och inte i
 *     insert-vägen, så att rådata finns kvar om regeln visar sig fel.
 */

export const AGENT_UA = /claude|headless|playwright|puppeteer|bot\b|crawl|spider/i

export function arAgentUserAgent(ua: string | null | undefined): boolean {
  return !!ua && AGENT_UA.test(ua)
}

export interface SessionRad {
  session_id: string | null
  event_name: string
  country_code?: string | null
  user_agent?: string | null
}

/** Returnerar mängden session-id:n som ska räknas bort. */
export function agentSessioner(rader: SessionRad[]): Set<string> {
  const pvPerSession = new Map<string, number>()
  const usSession = new Set<string>()
  const uaTraff = new Set<string>()
  for (const r of rader) {
    if (!r.session_id) continue
    if (arAgentUserAgent(r.user_agent)) uaTraff.add(r.session_id)
    if (r.country_code === 'US') usSession.add(r.session_id)
    if (r.event_name === 'page_viewed') {
      pvPerSession.set(r.session_id, (pvPerSession.get(r.session_id) ?? 0) + 1)
    }
  }
  const bort = new Set<string>(uaTraff)
  for (const id of usSession) {
    if ((pvPerSession.get(id) ?? 0) >= 10) bort.add(id)
  }
  return bort
}

/** Filtrerar bort agentsessioner ur en radlista. Rader utan session_id behålls. */
export function baraManniskor<T extends SessionRad>(rader: T[]): T[] {
  const bort = agentSessioner(rader)
  return rader.filter(r => !r.session_id || !bort.has(r.session_id))
}
