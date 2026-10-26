/**
 * /admin/veckans-o: granska och godkänn Veckans ö innan det går ut.
 *
 * Regel (Max 2026-10-08): utskicket går bara efter faktagranskning och ett
 * uttryckligt godkännande. Här syns de kommande utskicken, exakt som de
 * renderas (samma kod som skickar), med öns källor bredvid. Godkänn sparar
 * ett godkännande för just den veckan och ön i app_kv; cronen skickar inget
 * utan det. Se lib/veckans-o.ts.
 *
 * Flödet måste dessutom stå i EMAIL_AUTOMATIK för att något ska gå ut alls.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { renderEmail } from '@/lib/email'
import { flodePa } from '@/lib/mailfloden'
import { kommandeUtskick, veckansOFor, veckansNyckel, hamtaGodkannande } from '@/lib/veckans-o'
import { oVariabler } from '@/app/api/email/cron/floden'
import { KALLOR_PER_O } from '@/app/o/kallor.generated'

export const dynamic = 'force-dynamic'

async function kravAdmin(): Promise<{ id: string; namn: string }> {
  const sb = await createServerSupabaseClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/veckans-o')
  const { data: row } = await sb.from('users').select('is_admin, username').eq('id', user.id).single()
  if (!row?.is_admin) redirect('/feed')
  return { id: user.id, namn: (row.username as string) || user.email || user.id }
}

async function godkann(formData: FormData) {
  'use server'
  const admin = await kravAdmin()
  const datum = String(formData.get('datum') ?? '')
  const slug = String(formData.get('slug') ?? '')
  const d = new Date(`${datum}T12:00:00Z`)
  // Godkänn bara den ö som faktiskt går den veckan.
  if (Number.isNaN(d.getTime()) || veckansOFor(d)?.slug !== slug) return
  await getAdminClient().from('app_kv').upsert({
    key: veckansNyckel(d),
    value: { slug, av: admin.namn, tid: new Date().toISOString() },
    updated_at: new Date().toISOString(),
  })
  revalidatePath('/admin/veckans-o')
}

async function aterkalla(formData: FormData) {
  'use server'
  await kravAdmin()
  const datum = String(formData.get('datum') ?? '')
  const d = new Date(`${datum}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return
  await getAdminClient().from('app_kv').delete().eq('key', veckansNyckel(d))
  revalidatePath('/admin/veckans-o')
}

export default async function VeckansOPage() {
  await kravAdmin()
  const service = getAdminClient()
  const datum = kommandeUtskick(new Date(), 4)

  const rader = await Promise.all(datum.map(async d => {
    const o = veckansOFor(d)
    const g = await hamtaGodkannande(service, d)
    const vars = o ? oVariabler(o) : null
    const r = o && vars ? renderEmail('weekly_island', { email: 'exempel@svalla.se', ...vars }) : null
    return { d, o, g, vars, r, kallor: o ? (KALLOR_PER_O[o.slug] ?? []) : [] }
  }))

  const pa = flodePa('weekly_island')
  const knapp: React.CSSProperties = { padding: '9px 16px', borderRadius: 999, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px 96px' }}>
      <Link href="/admin" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none' }}>← Admin</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: '8px 0 6px' }}>Veckans ö</h1>
      <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 6px' }}>
        Går tisdagar april till september, en ö per vecka, bara till bekräftade prenumeranter. Inget skickas
        utan ett godkännande här för just den veckan och ön.
      </p>
      <p style={{ fontSize: 13, margin: '0 0 28px', color: pa ? 'var(--green, #2a6e50)' : 'var(--txt3)' }}>
        Flödet är {pa ? 'påslaget' : 'avstängt (står inte i EMAIL_AUTOMATIK), så inget går ut även om veckan är godkänd'}.
      </p>

      {rader.map(({ d, o, g, vars, r, kallor }) => {
        const dagStr = d.toISOString().slice(0, 10)
        const godkand = !!(o && g && g.slug === o.slug)
        return (
          <section key={dagStr} style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 16, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Tisdag {dagStr}</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{o ? o.name : 'Ingen ö med källbelagd restid'}</div>
                {godkand && <div style={{ fontSize: 13, color: 'var(--green, #2a6e50)' }}>Godkänd av {g!.av} {g!.tid.slice(0, 16).replace('T', ' ')}</div>}
                {!godkand && <div style={{ fontSize: 13, color: '#b5591a' }}>Inte godkänd. Går inte ut.</div>}
              </div>
              {o && (godkand ? (
                <form action={aterkalla}>
                  <input type="hidden" name="datum" value={dagStr} />
                  <button type="submit" style={{ ...knapp, background: 'var(--surface-3)', color: 'var(--txt)' }}>Återkalla</button>
                </form>
              ) : (
                <form action={godkann}>
                  <input type="hidden" name="datum" value={dagStr} />
                  <input type="hidden" name="slug" value={o.slug} />
                  <button type="submit" style={{ ...knapp, background: 'var(--sea)', color: '#fff' }}>Faktagranskat, godkänn</button>
                </form>
              ))}
            </div>

            {o && vars && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 8px' }}>Kontrollera</h2>
                  <ul style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, paddingLeft: 18, margin: '0 0 12px' }}>
                    <li><strong>Tagline:</strong> {vars.island_tagline}</li>
                    <li><strong>Restid:</strong> {vars.restid_rad}</li>
                    {vars.fakta_rad && <li><strong>Fakta:</strong> {vars.fakta_rad}</li>}
                    {vars.guide_rad && <li><strong>Guider:</strong> {vars.guide_rad}</li>}
                    <li><a href={vars.island_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>Öppna ösidan</a></li>
                  </ul>
                  <details>
                    <summary style={{ fontSize: 13, cursor: 'pointer' }}>Öns källor ({kallor.length})</summary>
                    <ul style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5, paddingLeft: 18 }}>
                      {kallor.map((k, i) => (
                        <li key={i} style={{ marginBottom: 6 }}>
                          <a href={k.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>{k.org}</a>
                          {k.last ? ` (läst ${k.last})` : ''}: {k.vad.slice(0, 220)}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 8px' }}>
                    Så ser mejlet ut{r?.ok ? `: ${r.subject}` : ''}
                  </h2>
                  {r?.ok
                    ? <iframe title={`veckans-o-${dagStr}`} srcDoc={r.html} style={{ width: '100%', height: 560, border: '1px solid var(--surface-3)', borderRadius: 12, background: '#fff' }} />
                    : <p style={{ fontSize: 13, color: 'var(--red, #d44d4d)' }}>Mallen gick inte att rendera: {r?.ok === false ? r.error : 'okänt fel'}</p>}
                </div>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
