/**
 * Tolkar CSP-rapporter från webbläsare. Används av /api/csp-rapport.
 *
 * Två format finns:
 * - report-to (Reporting API): en lista [{ type: 'csp-violation', body: {...} }]
 *   med camelCase-fält (blockedURL, effectiveDirective, documentURL …).
 * - report-uri (äldre): { 'csp-report': {...} } med bindestreck
 *   (blocked-uri, effective-directive, document-uri …).
 */

export type CspRapport = {
  direktiv: string
  blockerat: string
  sida: string
  kalla: string
  rad: number | null
  utdrag: string
}

/** Klipper bort query-sträng och fragment, som kan bära tokens. */
export function utanQuery(adress: unknown): string {
  if (typeof adress !== 'string' || !adress) return ''
  const s = adress.slice(0, 300)
  const i = s.search(/[?#]/)
  return i === -1 ? s : s.slice(0, i)
}

function str(v: unknown, max = 120): string {
  return typeof v === 'string' ? v.slice(0, max) : ''
}

function fran(body: Record<string, unknown>, nyaFormatet: boolean): CspRapport {
  const f = (camel: string, bindestreck: string) => (nyaFormatet ? body[camel] : body[bindestreck])
  const rad = f('lineNumber', 'line-number')
  return {
    direktiv: str(f('effectiveDirective', 'effective-directive') ?? f('violatedDirective', 'violated-directive'), 60),
    blockerat: utanQuery(f('blockedURL', 'blocked-uri')),
    sida: utanQuery(f('documentURL', 'document-uri')),
    kalla: utanQuery(f('sourceFile', 'source-file')),
    rad: typeof rad === 'number' ? rad : null,
    // Utdraget (de första 40 tecknen av blockerad kod) visar vad som stoppades.
    utdrag: str(f('sample', 'script-sample'), 40),
  }
}

export function tolkaCspRapporter(text: string): CspRapport[] {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return []
  }
  const ut: CspRapport[] = []
  if (Array.isArray(data)) {
    for (const r of data) {
      if (r && typeof r === 'object' && (r as { type?: unknown }).type === 'csp-violation') {
        const body = (r as { body?: unknown }).body
        if (body && typeof body === 'object') ut.push(fran(body as Record<string, unknown>, true))
      }
    }
  } else if (data && typeof data === 'object') {
    const body = (data as Record<string, unknown>)['csp-report']
    if (body && typeof body === 'object') ut.push(fran(body as Record<string, unknown>, false))
  }
  return ut
}

/** En loggrad. JSON.stringify på varje fält så att radbrytningar inte kan förfalska loggrader. */
export function formatCspRapport(r: CspRapport): string {
  return `[csp] direktiv=${JSON.stringify(r.direktiv)} blockerat=${JSON.stringify(r.blockerat)} sida=${JSON.stringify(r.sida)} kalla=${JSON.stringify(r.kalla)} rad=${r.rad ?? '-'} utdrag=${JSON.stringify(r.utdrag)}`
}
