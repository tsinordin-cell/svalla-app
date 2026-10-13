/**
 * gsc — Google Search Console (klick, visningar, CTR, position) till /team.
 *
 * Återanvänder tjänstekontot i GOOGLE_INDEXING_SA_JSON (samma som skickar
 * URL:er till Indexing API). För att läsa sökstatistik måste kontot:
 *   1. finnas som användare på egendomen i Search Console, och
 *   2. Search Console API vara påslaget i kontots Google Cloud-projekt.
 * Saknas något av dem returneras { ok: false, reason } och /team visar exakt
 * vilket steg som fattas — ingen siffra hittas på.
 *
 * Resultatet cachas sex timmar (Google uppdaterar ändå bara en gång per dygn,
 * med 2–3 dygns fördröjning). Fel cachas inte: de kastas inuti cachen.
 */
import { createSign } from 'node:crypto'
import { unstable_cache } from 'next/cache'

export type GscDay = { date: string; clicks: number; impressions: number; position: number }
export type GscQuery = { query: string; clicks: number; impressions: number; position: number }
export type GscPage = { page: string; clicks: number; impressions: number }

export type GscData = {
  ok: true
  property: string
  /** Dagliga värden, äldst först, så långt bak Google sparar (16 mån). */
  days: GscDay[]
  topQueries: GscQuery[]
  topPages: GscPage[]
  fetchedAt: string
}
export type GscResult = GscData | { ok: false; reason: string; clientEmail?: string }

const PROPERTIES = ['sc-domain:svalla.se', 'https://svalla.se/', 'https://www.svalla.se/']

async function accessToken(sa: { client_email: string; private_key: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const unsigned = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  const jwt = `${unsigned}.${signer.sign(sa.private_key).toString('base64url')}`
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Google gav ingen åtkomstnyckel (${res.status}).`)
  const data = await res.json() as { access_token?: string }
  if (!data.access_token) throw new Error('Google gav ingen åtkomstnyckel.')
  return data.access_token
}

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function query(token: string, property: string, body: object): Promise<Row[]> {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  )
  if (!res.ok) {
    const text = (await res.text()).slice(0, 300)
    const err = new Error(text) as Error & { status?: number }
    err.status = res.status
    throw err
  }
  const data = await res.json() as { rows?: Row[] }
  return data.rows ?? []
}

const ymd = (d: Date) => d.toISOString().slice(0, 10)

async function hamta(): Promise<GscData> {
  const raw = process.env.GOOGLE_INDEXING_SA_JSON
  if (!raw) throw new Error('GOOGLE_INDEXING_SA_JSON saknas i miljön.')
  const sa = JSON.parse(raw) as { client_email: string; private_key: string }
  const token = await accessToken(sa)

  const end = new Date()
  const start = new Date(end.getTime() - 486 * 24 * 3600 * 1000) // ~16 månader, Googles gräns
  const start28 = new Date(end.getTime() - 30 * 24 * 3600 * 1000)

  let lastError = ''
  for (const property of PROPERTIES) {
    try {
      const days = await query(token, property, {
        startDate: ymd(start), endDate: ymd(end), dimensions: ['date'], rowLimit: 25000, dataState: 'all',
      })
      const [q, p] = await Promise.all([
        query(token, property, { startDate: ymd(start28), endDate: ymd(end), dimensions: ['query'], rowLimit: 8, dataState: 'all' }),
        query(token, property, { startDate: ymd(start28), endDate: ymd(end), dimensions: ['page'], rowLimit: 6, dataState: 'all' }),
      ])
      return {
        ok: true,
        property,
        days: days
          .map(r => ({ date: r.keys[0] ?? '', clicks: r.clicks, impressions: r.impressions, position: r.position }))
          .sort((a, b) => a.date.localeCompare(b.date)),
        topQueries: q.map(r => ({ query: r.keys[0] ?? '', clicks: r.clicks, impressions: r.impressions, position: r.position })),
        topPages: p.map(r => ({ page: r.keys[0] ?? '', clicks: r.clicks, impressions: r.impressions })),
        fetchedAt: new Date().toISOString(),
      }
    } catch (e) {
      const status = (e as { status?: number }).status
      lastError = `${status ?? ''} ${(e as Error).message}`.trim()
      // 403 = kontot saknar behörighet på just den egendomen → prova nästa form.
      // Allt annat (API avstängt, nätverk) är samma för alla egendomar.
      if (status !== 403 && status !== 404) break
    }
  }
  throw new Error(lastError || 'Okänt fel från Search Console.')
}

const cachad = unstable_cache(hamta, ['gsc-team-v1'], { revalidate: 6 * 3600, tags: ['gsc'] })

export async function getGsc(): Promise<GscResult> {
  try {
    return await cachad()
  } catch (e) {
    let clientEmail: string | undefined
    try { clientEmail = JSON.parse(process.env.GOOGLE_INDEXING_SA_JSON ?? '{}').client_email } catch { /* ignoreras */ }
    const msg = (e as Error).message
    let reason = msg
    if (/SERVICE_DISABLED|has not been used|is disabled/i.test(msg)) {
      reason = 'Search Console API är inte påslaget i tjänstekontots Google Cloud-projekt.'
    } else if (/^403|permission|sufficient/i.test(msg)) {
      reason = 'Tjänstekontot har inte behörighet till svalla.se i Search Console.'
    }
    return { ok: false, reason, clientEmail }
  }
}

// ── Härledda siffror ─────────────────────────────────────────────────────────

export type GscSummary = {
  clicks28: number
  impressions28: number
  ctr28: number
  position28: number
  clicksPrev28: number
  impressionsPrev28: number
  /** Veckosummor, äldst först (senaste 26 veckorna med data). */
  weeks: { start: string; clicks: number; impressions: number }[]
  totalClicks: number
  totalImpressions: number
  bestDay: { date: string; clicks: number } | null
  firstDate: string | null
  lastDate: string | null
  /** Första dag ett rullande 28-dagarsfönster passerade tröskeln. */
  clickMilestones: { threshold: number; reachedAt: string | null }[]
  impressionMilestones: { threshold: number; reachedAt: string | null }[]
}

export const CLICK_THRESHOLDS = [10, 100, 500, 1_000, 5_000, 15_000, 60_000, 150_000]
export const IMPRESSION_THRESHOLDS = [1_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 5_000_000]

/** Google utelämnar dagar helt utan visningar. Fyll dem med nollor så att
 *  "senaste 28" betyder 28 kalenderdagar och rullande fönster blir rätt. */
export function fyllLuckor(raw: GscDay[]): GscDay[] {
  const first = raw[0]
  const last = raw[raw.length - 1]
  if (!first || !last) return []
  const byDate = new Map(raw.map(d => [d.date, d]))
  const out: GscDay[] = []
  const end = new Date(last.date + 'T00:00:00Z')
  for (let t = new Date(first.date + 'T00:00:00Z'); t <= end; t = new Date(t.getTime() + 86_400_000)) {
    const key = t.toISOString().slice(0, 10)
    out.push(byDate.get(key) ?? { date: key, clicks: 0, impressions: 0, position: 0 })
  }
  return out
}

export function summarize(raw: GscDay[]): GscSummary {
  const days = fyllLuckor(raw)
  const n = days.length
  const last = days.slice(-28)
  const prev = days.slice(-56, -28)
  const sum = (a: GscDay[], k: 'clicks' | 'impressions') => a.reduce((s, d) => s + d[k], 0)
  const impressions28 = sum(last, 'impressions')
  const clicks28 = sum(last, 'clicks')
  const position28 = impressions28 ? last.reduce((s, d) => s + d.position * d.impressions, 0) / impressions28 : 0

  const weeks: GscSummary['weeks'] = []
  for (let i = n; i > 0 && weeks.length < 26; i -= 7) {
    const chunk = days.slice(Math.max(0, i - 7), i)
    if (!chunk[0] || (chunk.length < 7 && weeks.length > 0)) break // ofullständig äldsta vecka
    weeks.unshift({ start: chunk[0].date, clicks: sum(chunk, 'clicks'), impressions: sum(chunk, 'impressions') })
  }

  const rolling = (k: 'clicks' | 'impressions', thresholds: number[]) => {
    const out = thresholds.map(t => ({ threshold: t, reachedAt: null as string | null }))
    let win = 0
    days.forEach((d, i) => {
      win += d[k]
      if (i >= 28) win -= days[i - 28]?.[k] ?? 0
      for (const m of out) if (!m.reachedAt && win >= m.threshold) m.reachedAt = d.date
    })
    return out
  }

  let bestDay: GscSummary['bestDay'] = null
  for (const d of days) if (!bestDay || d.clicks > bestDay.clicks) bestDay = { date: d.date, clicks: d.clicks }

  return {
    clicks28,
    impressions28,
    ctr28: impressions28 ? clicks28 / impressions28 : 0,
    position28,
    clicksPrev28: sum(prev, 'clicks'),
    impressionsPrev28: sum(prev, 'impressions'),
    weeks,
    totalClicks: sum(days, 'clicks'),
    totalImpressions: sum(days, 'impressions'),
    bestDay: bestDay && bestDay.clicks > 0 ? bestDay : null,
    firstDate: days[0]?.date ?? null,
    lastDate: days[n - 1]?.date ?? null,
    clickMilestones: rolling('clicks', CLICK_THRESHOLDS),
    impressionMilestones: rolling('impressions', IMPRESSION_THRESHOLDS),
  }
}
