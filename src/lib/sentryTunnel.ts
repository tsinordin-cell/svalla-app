/**
 * Kontroll för Sentry-tunneln (/api/sentry-tunnel), 2026-11-22.
 *
 * Webbläsaren skickar sina felrapporter (Sentry-"envelopes") till vår egen
 * adress i stället för direkt till Sentry. Då släpps de igenom av CSP:n
 * (connect-src 'self') och stoppas inte av annonsblockerare. Servern skickar
 * vidare, men bara till vårt eget Sentry-projekt: värd och projekt-id i
 * envelopens rubrikrad måste stämma med NEXT_PUBLIC_SENTRY_DSN.
 */

export type SentryMal = { host: string; projektId: string }

/** Läser värd och projekt-id ur en DSN, t.ex. https://nyckel@o1.ingest.de.sentry.io/123. */
export function tolkaDsn(dsn: string | undefined | null): SentryMal | null {
  if (!dsn) return null
  try {
    const u = new URL(dsn)
    if (u.protocol !== 'https:') return null
    const projektId = u.pathname.replace(/^\/+|\/+$/g, '')
    if (!/^\d+$/.test(projektId)) return null
    return { host: u.hostname, projektId }
  } catch {
    return null
  }
}

/**
 * Tar envelopens första rad (JSON-rubriken) och returnerar Sentry-adressen
 * den ska skickas till, eller null om den inte hör till vårt projekt.
 */
export function vidarebefordringsAdress(forstaRaden: string, mal: SentryMal): string | null {
  let rubrik: unknown
  try {
    rubrik = JSON.parse(forstaRaden)
  } catch {
    return null
  }
  const dsn = (rubrik as { dsn?: unknown } | null)?.dsn
  if (typeof dsn !== 'string') return null
  const fran = tolkaDsn(dsn)
  if (!fran || fran.host !== mal.host || fran.projektId !== mal.projektId) return null
  return `https://${mal.host}/api/${mal.projektId}/envelope/`
}

/** Första raden ur en envelope, avkodad som UTF-8 (resten kan vara binärt). */
export function forstaRaden(bytes: Uint8Array): string {
  const slut = bytes.indexOf(0x0a)
  return new TextDecoder().decode(slut === -1 ? bytes : bytes.subarray(0, slut))
}
