/**
 * /admin/oar-trafik — besöksräknare per ö.
 *
 * Byggd 2026-08-21. Möjlig först nu: page_viewed-eventet som lades till samma
 * dag speglar varje sidbyte till analytics_events, så trafik per ö går att
 * räkna utan att gå via PostHogs API.
 *
 * Syftet är inte statistik för dess egen skull. Det här är underlaget till
 * anspråksmejlet i tillväxtplanen: "vi har en sida om er som fick 340 besök
 * förra månaden — ta över den gratis". Triggerbaserade utskick konverterar
 * fyra gånger bättre än kalla, och siffran per ö är triggern.
 *
 * Obs: analytics_events kräver cookie-consent, så siffrorna är ett GOLV.
 * Verklig trafik är högre — jämför med Search Console.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ALL_ISLANDS } from '@/app/o/island-data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const DAGAR = 30

export default async function OarTrafikPage() {
  const sb = await createServerSupabaseClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/oar-trafik')
  const { data: userRow } = await sb.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const since = new Date(Date.now() - DAGAR * 24 * 3600 * 1000).toISOString()
  const admin = getAdminClient()
  const { data: rows } = await admin
    .from('analytics_events')
    .select('event_name, path, props, session_id')
    .gte('created_at', since)
    .in('event_name', ['page_viewed', 'island_viewed'])
    .limit(50_000)

  // Räkna per ö-slug. Två källor: island_viewed-eventets props, och
  // page_viewed-eventets path (/o/<slug>).
  const besok = new Map<string, { visningar: number; sessioner: Set<string> }>()
  for (const r of rows ?? []) {
    let slug: string | null = null
    if (r.event_name === 'island_viewed') {
      slug = (r.props as { island_slug?: string })?.island_slug ?? null
    } else if (r.path) {
      slug = r.path.match(/^\/o\/([a-z0-9-]+)/i)?.[1] ?? null
    }
    if (!slug) continue
    const post = besok.get(slug) ?? { visningar: 0, sessioner: new Set<string>() }
    post.visningar++
    if (r.session_id) post.sessioner.add(r.session_id)
    besok.set(slug, post)
  }

  const namn = new Map(ALL_ISLANDS.map(i => [i.slug, i.name]))
  const rader = [...besok.entries()]
    .map(([slug, v]) => ({
      slug,
      namn: namn.get(slug) ?? slug,
      visningar: v.visningar,
      sessioner: v.sessioner.size,
      finnsIData: namn.has(slug),
    }))
    .sort((a, b) => b.visningar - a.visningar)

  const utanTrafik = ALL_ISLANDS.filter(i => !besok.has(i.slug))
  const totalt = rader.reduce((s, r) => s + r.visningar, 0)

  const kort = { background: 'var(--surface-1)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '16px 18px' }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/admin" style={{ fontSize: 13, color: 'var(--txt3)', textDecoration: 'none' }}>← Tillbaka till admin</Link>

        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--sea)', margin: '18px 0 4px' }}>
          Besök per ö
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 8px' }}>
          Senaste {DAGAR} dygnen · {totalt.toLocaleString('sv-SE')} sidvisningar fördelat på {rader.length} öar
        </p>
        <p style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic', margin: '0 0 24px', lineHeight: 1.6 }}>
          Kräver cookie-consent, så detta är ett golv — verklig trafik är högre.
          Använd siffrorna som underlag till anspråksmejl: &quot;er sida fick X besök förra månaden&quot;.
        </p>

        {rader.length === 0 ? (
          <div style={{ ...kort, textAlign: 'center' as const, color: 'var(--txt2)', fontSize: 14 }}>
            Ingen ö-trafik registrerad än. page_viewed-eventet driftsattes 2026-08-21 —
            ge det några dagar att samla data.
          </div>
        ) : (
          <div style={{ ...kort, padding: 0, overflow: 'hidden' }}>
            {rader.map((r, i) => (
              <div key={r.slug} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 18px',
                borderBottom: i < rader.length - 1 ? '1px solid var(--surface-3)' : 'none',
              }}>
                <span style={{ fontSize: 12, color: 'var(--txt3)', minWidth: 22 }}>{i + 1}</span>
                <Link href={`/o/${r.slug}`} style={{
                  flex: 1, fontSize: 14, fontWeight: 600,
                  color: r.finnsIData ? 'var(--txt)' : 'var(--red)', textDecoration: 'none',
                }}>
                  {r.namn}
                  {!r.finnsIData && (
                    <span style={{ fontSize: 11, color: 'var(--red)', marginLeft: 6 }}>
                      (saknas i ö-datan)
                    </span>
                  )}
                </Link>
                <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{r.sessioner} sess.</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', minWidth: 48, textAlign: 'right' as const }}>
                  {r.visningar.toLocaleString('sv-SE')}
                </span>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 1, margin: '32px 0 12px' }}>
          Öar utan registrerad trafik ({utanTrafik.length})
        </h2>
        <div style={{ ...kort, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.9 }}>
          {utanTrafik.length === 0
            ? 'Alla öar har fått besök.'
            : utanTrafik.map(i => i.name).join(' · ')}
        </div>
      </div>
    </div>
  )
}
