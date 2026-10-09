/**
 * /admin/nyckeltal: månadsrapporten (exitplanen, Drift & rutiner, 2026-10-02).
 *
 * VARFÖR: en köpare frågar efter samma fyra siffror varje gång: besök,
 * vidareklick, e-postlista och intäkt, månad för månad. De fanns utspridda på
 * /admin/insikter, /admin/subscribers och i Stripe. Här står de för en hel
 * kalendermånad bredvid månaden före, räknade på samma sätt varje gång.
 *
 * Hur varje siffra räknas:
 *  - Besök: unika session_id med minst en sidvisning (page_viewed) i
 *    analytics_events, efter att agentsessioner tagits bort med baraManniskor
 *    (se src/lib/analytics-filter.ts och docs/BASLINJE-2026-09.md).
 *  - Sidvisningar: antal page_viewed, samma filter.
 *  - Vidareklick: outbound_clicked utom kategori 'kalla' (källänkar är inte
 *    klick till någon som säljer något). Mäts sedan 2026-09-30.
 *  - E-postlista: nya adresser under månaden, och aktiva vid månadens slut
 *    (skapade före slutet och inte avregistrerade före slutet).
 *  - Partnerförfrågningar: rader i partner_inquiries skapade under månaden.
 *  - Intäkt: finns inte i databasen. Står som "fylls i" tills den hämtas ur
 *    Stripe eller bokföringen. Vi visar ingen siffra vi inte kan räkna.
 *
 * ?manad=2026-09 väljer månad. Utan parameter: förra hela månaden.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { baraManniskor } from '@/lib/analytics-filter'

export const dynamic = 'force-dynamic'

type Rad = {
  event_name: string
  session_id: string | null
  country_code: string | null
  user_agent: string | null
  props: Record<string, unknown> | null
}

type Nyckeltal = {
  besok: number
  sidvisningar: number
  vidareklick: number
  vidareklickPerKategori: [string, number][]
  nyaAdresser: number
  aktivaAdresser: number
  partnerforfragningar: number
  avkapad: boolean
}

const SIDA = 1000
const MAX_RADER = 200_000

function delar(manad: string): [number, number] {
  const [ar = 1970, m = 1] = manad.split('-').map(Number)
  return [ar, m]
}

function manadsgranser(manad: string): { start: Date; slut: Date } {
  const [ar, m] = delar(manad)
  // Svensk tid: månaden börjar vid midnatt i Stockholm. UTC-gränser räcker
  // för en månadsrapport, felet är högst två timmar i kanten.
  return { start: new Date(Date.UTC(ar, m - 1, 1)), slut: new Date(Date.UTC(ar, m, 1)) }
}

function forraManad(manad: string): string {
  const [ar, m] = delar(manad)
  const d = new Date(Date.UTC(ar, m - 2, 1))
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

function standardManad(): string {
  const nu = new Date()
  const d = new Date(Date.UTC(nu.getUTCFullYear(), nu.getUTCMonth() - 1, 1))
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

async function rakna(manad: string): Promise<Nyckeltal> {
  const admin = getAdminClient()
  const { start, slut } = manadsgranser(manad)
  const fran = start.toISOString()
  const till = slut.toISOString()

  // Händelser sidvis. PostgREST ger högst ett visst antal rader per anrop,
  // så vi hämtar 1 000 åt gången tills det tar slut.
  const rader: Rad[] = []
  let avkapad = false
  for (let fr = 0; ; fr += SIDA) {
    const { data, error } = await admin
      .from('analytics_events')
      .select('event_name, session_id, country_code, user_agent, props')
      .in('event_name', ['page_viewed', 'outbound_clicked'])
      .gte('created_at', fran)
      .lt('created_at', till)
      .order('id', { ascending: true })
      .range(fr, fr + SIDA - 1)
    if (error || !data || data.length === 0) break
    rader.push(...(data as Rad[]))
    if (data.length < SIDA) break
    if (rader.length >= MAX_RADER) { avkapad = true; break }
  }

  const manniskor = baraManniskor(rader)
  const sessioner = new Set<string>()
  let sidvisningar = 0
  let vidareklick = 0
  const perKategori = new Map<string, number>()
  for (const r of manniskor) {
    if (r.event_name === 'page_viewed') {
      sidvisningar++
      if (r.session_id) sessioner.add(r.session_id)
    } else if (r.event_name === 'outbound_clicked') {
      const k = String(r.props?.['kategori'] ?? 'ovrigt')
      perKategori.set(k, (perKategori.get(k) ?? 0) + 1)
      if (k !== 'kalla') vidareklick++
    }
  }

  const [nya, aktivaSkapade, avregFore, partner] = await Promise.all([
    admin.from('email_subscribers').select('id', { count: 'exact', head: true })
      .gte('created_at', fran).lt('created_at', till),
    admin.from('email_subscribers').select('id', { count: 'exact', head: true })
      .lt('created_at', till),
    admin.from('email_subscribers').select('id', { count: 'exact', head: true })
      .lt('created_at', till).eq('unsubscribed', true).lt('unsubscribed_at', till),
    admin.from('partner_inquiries').select('id', { count: 'exact', head: true })
      .gte('created_at', fran).lt('created_at', till),
  ])

  return {
    besok: sessioner.size,
    sidvisningar,
    vidareklick,
    vidareklickPerKategori: [...perKategori.entries()].sort((a, b) => b[1] - a[1]),
    nyaAdresser: nya.count ?? 0,
    aktivaAdresser: (aktivaSkapade.count ?? 0) - (avregFore.count ?? 0),
    partnerforfragningar: partner.count ?? 0,
    avkapad,
  }
}

function forandring(nu: number, fore: number): string {
  if (fore === 0) return nu === 0 ? 'oförändrat' : 'ny'
  const p = Math.round(((nu - fore) / fore) * 100)
  return `${p > 0 ? '+' : ''}${p} %`
}

const MANADSNAMN = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']
function manadsnamn(manad: string): string {
  const [ar, m] = delar(manad)
  return `${MANADSNAMN[m - 1] ?? ''} ${ar}`
}

export default async function NyckeltalPage({ searchParams }: { searchParams: Promise<{ manad?: string }> }) {
  const sb = await createServerSupabaseClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/nyckeltal')
  const { data: userRow } = await sb.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const sp = await searchParams
  const manad = sp.manad && /^\d{4}-(0[1-9]|1[0-2])$/.test(sp.manad) ? sp.manad : standardManad()
  const fore = forraManad(manad)
  const [nu, da] = await Promise.all([rakna(manad), rakna(fore)])

  const rader: { namn: string; nu: number; da: number; not?: string }[] = [
    { namn: 'Besök (unika sessioner)', nu: nu.besok, da: da.besok },
    { namn: 'Sidvisningar', nu: nu.sidvisningar, da: da.sidvisningar },
    { namn: 'Vidareklick till verksamheter', nu: nu.vidareklick, da: da.vidareklick, not: 'Mäts sedan 30 september 2026.' },
    { namn: 'Nya e-postadresser', nu: nu.nyaAdresser, da: da.nyaAdresser },
    { namn: 'Aktiva e-postadresser vid månadens slut', nu: nu.aktivaAdresser, da: da.aktivaAdresser },
    { namn: 'Partnerförfrågningar', nu: nu.partnerforfragningar, da: da.partnerforfragningar },
  ]

  const cell = { padding: '10px 12px', borderBottom: '1px solid var(--surface-3)', fontSize: 14 } as const

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Link href="/admin" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none' }}>Till admin</Link>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--txt)', margin: '12px 0 4px' }}>Nyckeltal {manadsnamn(manad)}</h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px' }}>
          Jämfört med {manadsnamn(fore)}. Agentsessioner är bortfiltrerade. Byt månad med ?manad=ÅÅÅÅ-MM.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <Link href={`/admin/nyckeltal?manad=${fore}`} style={{ fontSize: 13, color: 'var(--sea)' }}>Föregående månad</Link>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: 12, overflow: 'hidden' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--txt3)', fontSize: 12 }}>
              <th style={cell}>Nyckeltal</th>
              <th style={cell}>{manadsnamn(manad)}</th>
              <th style={cell}>{manadsnamn(fore)}</th>
              <th style={cell}>Förändring</th>
            </tr>
          </thead>
          <tbody>
            {rader.map((r) => (
              <tr key={r.namn}>
                <td style={cell}>
                  <div style={{ fontWeight: 600, color: 'var(--txt)' }}>{r.namn}</div>
                  {r.not && <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{r.not}</div>}
                </td>
                <td style={{ ...cell, fontWeight: 700 }}>{r.nu.toLocaleString('sv-SE')}</td>
                <td style={cell}>{r.da.toLocaleString('sv-SE')}</td>
                <td style={cell}>{forandring(r.nu, r.da)}</td>
              </tr>
            ))}
            <tr>
              <td style={cell}>
                <div style={{ fontWeight: 600, color: 'var(--txt)' }}>Intäkt</div>
                <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Finns inte i databasen. Fylls i från Stripe och bokföringen.</div>
              </td>
              <td style={cell}>fylls i</td>
              <td style={cell}>fylls i</td>
              <td style={cell} />
            </tr>
          </tbody>
        </table>

        {nu.vidareklickPerKategori.length > 0 && (
          <p style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 14 }}>
            Vidareklick per kategori: {nu.vidareklickPerKategori.map(([k, n]) => `${k} ${n}`).join(', ')}. Kategorin kalla räknas inte in i summan.
          </p>
        )}
        {(nu.avkapad || da.avkapad) && (
          <p style={{ fontSize: 13, color: '#b42318', marginTop: 8 }}>
            Fler än {MAX_RADER.toLocaleString('sv-SE')} händelser under månaden. Siffrorna är räknade på de första och därför för låga.
          </p>
        )}
      </div>
    </div>
  )
}
