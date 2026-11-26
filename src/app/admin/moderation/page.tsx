import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { getModerationQueue } from '@/lib/moderation'
import { REASON_LABELS, TARGET_TYPE_LABELS, STATUS_LABELS } from '@/lib/moderation'
import type { ReportStatus } from '@/lib/moderation'
import ModerationActions from './ModerationActions'
import { adminRad } from '@/lib/adminRad'

export const revalidate = 0
export const dynamic = 'force-dynamic'

type StatusFilter = ReportStatus | 'all'

const STATUS_COLORS: Record<string, string> = {
  open:      '#c96e2a',
  reviewed:  '#1e5c82',
  actioned:  '#16a34a',
  dismissed: '#6b7280',
}

export default async function ModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  const supabase = await createServerSupabaseClient()

  // Auth guard — måste vara admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/moderation')

  const { data: userRow } = await adminRad(supabase)

  if (!userRow?.is_admin) redirect('/feed')

  const sp = await searchParams
  const statusFilter = (sp.status ?? 'open') as StatusFilter
  const page = Math.max(0, parseInt(sp.page ?? '0', 10))
  const limit = 25

  const queue = await getModerationQueue(supabase, statusFilter, limit, page * limit)

  // Underlag för anmälda meddelanden och trådar. Bara admin kan läsa tabellen.
  // Finns den inte ännu (migrationen ej körd) blir listan tom.
  type Underlag = {
    report_id: string; message_id: string; avsandare_id: string | null
    innehall: string | null; bilaga_typ: string | null; bilaga_sokvag: string | null
    bilaga_meta: { lat?: number; lng?: number } | null; skickat_at: string; ar_anmalt: boolean
  }
  const underlagIds = queue.filter(q => q.target_type === 'message' || q.target_type === 'user').map(q => q.id)
  let underlag: Underlag[] = []
  if (underlagIds.length > 0) {
    const { data } = await supabase
      .from('anmalan_underlag')
      .select('report_id, message_id, avsandare_id, innehall, bilaga_typ, bilaga_sokvag, bilaga_meta, skickat_at, ar_anmalt')
      .in('report_id', underlagIds)
      .order('skickat_at', { ascending: true })
    underlag = (data ?? []) as Underlag[]
  }
  const underlagPerAnmalan = new Map<string, Underlag[]>()
  for (const u of underlag) {
    const lista = underlagPerAnmalan.get(u.report_id) ?? []
    lista.push(u)
    underlagPerAnmalan.set(u.report_id, lista)
  }

  // Användarnamn för avsändare i underlaget och för anmälda användare.
  const anvandarIds = [...new Set([
    ...underlag.map(u => u.avsandare_id).filter((x): x is string => !!x),
    ...queue.filter(q => q.target_type === 'user').map(q => q.target_id),
  ])]
  const anvandarnamn = new Map<string, string>()
  if (anvandarIds.length > 0) {
    const { data } = await supabase.from('users').select('id, username').in('id', anvandarIds)
    for (const u of (data ?? []) as { id: string; username: string }[]) anvandarnamn.set(u.id, u.username)
  }

  // Tidsbegränsade länkar till anmälda chattbilder (privat hink).
  const bildLankar = new Map<string, string>()
  for (const u of underlag) {
    if (!u.bilaga_sokvag) continue
    const { data } = await supabase.storage.from('dm-bilder').createSignedUrl(u.bilaga_sokvag, 3600)
    if (data?.signedUrl) bildLankar.set(u.bilaga_sokvag, data.signedUrl)
  }

  // Räkna öppna
  const { count: openCount } = await supabase
    .from('reports')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--glass-96, rgba(242,248,250,0.96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 20px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Admin
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
              Moderation
              {(openCount ?? 0) > 0 && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginLeft: 10, minWidth: 22, height: 22, borderRadius: 11,
                  background: 'var(--acc-knapp)', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '0 6px',
                }}>
                  {openCount}
                </span>
              )}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/admin/platser" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>
              Platser
            </a>
            <a href="/feed" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>
              ← Tillbaka
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 16px' }}>

        {/* Status-filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {(['open', 'reviewed', 'actioned', 'dismissed', 'all'] as const).map(s => (
            <a
              key={s}
              href={`/admin/moderation?status=${s}`}
              style={{
                padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
                background: statusFilter === s ? 'var(--grad-sea)' : 'rgba(10,123,140,0.07)',
                color: statusFilter === s ? '#fff' : 'var(--txt2)',
                border: statusFilter === s ? 'none' : '1px solid rgba(10,123,140,0.15)',
              }}
            >
              {s === 'all' ? 'Alla' : STATUS_LABELS[s as ReportStatus]}
            </a>
          ))}
        </div>

        {/* Kö */}
        {queue.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: 'var(--white)', borderRadius: 18,
            border: '1px solid rgba(10,123,140,0.10)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
              Kön är tom
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt3)' }}>
              Inga rapporter med status &quot;{statusFilter === 'all' ? 'alla' : STATUS_LABELS[statusFilter as ReportStatus]}&quot;.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {queue.map(item => (
              <div key={item.id} style={{
                background: 'var(--white)', borderRadius: 16,
                border: item.auto_flagged
                  ? '1.5px solid rgba(200,30,30,0.25)'
                  : '1px solid rgba(10,123,140,0.10)',
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
              }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      {/* Auto-flaggad badge */}
                      {item.auto_flagged && (
                        <span style={{
                          padding: '2px 8px', borderRadius: 8,
                          background: 'rgba(200,30,30,0.1)', color: 'var(--red)',
                          fontSize: 10, fontWeight: 700,
                        }}>
                          🤖 AUTO
                        </span>
                      )}
                      {/* Target type */}
                      <span style={{
                        padding: '2px 8px', borderRadius: 8,
                        background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      }}>
                        {TARGET_TYPE_LABELS[item.target_type]}
                      </span>
                      {/* Reason */}
                      <span style={{
                        padding: '2px 8px', borderRadius: 8,
                        background: 'rgba(201,110,42,0.08)', color: 'var(--acc)',
                        fontSize: 10, fontWeight: 700,
                      }}>
                        {REASON_LABELS[item.reason]}
                      </span>
                      {/* Status */}
                      <span style={{
                        padding: '2px 8px', borderRadius: 8,
                        background: `${STATUS_COLORS[item.status]}18`,
                        color: STATUS_COLORS[item.status],
                        fontSize: 10, fontWeight: 700,
                      }}>
                        {STATUS_LABELS[item.status]}
                      </span>
                      {/* Report count */}
                      {item.report_count > 1 && (
                        <span style={{
                          padding: '2px 8px', borderRadius: 8,
                          background: 'rgba(200,30,30,0.08)', color: 'var(--red)',
                          fontSize: 10, fontWeight: 700,
                        }}>
                          {item.report_count}× rapporterat
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
                      Anmält av <strong>@{item.reporter_username ?? '?'}</strong>
                      {' · '}
                      {new Date(item.created_at).toLocaleDateString('sv-SE', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                      })}
                      {item.reviewer_username && (
                        <> · Granskad av <strong>@{item.reviewer_username}</strong></>
                      )}
                    </div>

                    {/* Note */}
                    {item.note && (
                      <div style={{
                        marginTop: 8, padding: '8px 12px', borderRadius: 10,
                        background: 'rgba(10,123,140,0.04)',
                        border: '1px solid rgba(10,123,140,0.10)',
                        fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5,
                      }}>
                        &ldquo;{item.note}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Quick content link */}
                  <div style={{ flexShrink: 0 }}>
                    {item.target_type === 'trip' && (
                      <a
                        href={`/tur/${item.target_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                          background: 'rgba(10,123,140,0.07)', color: 'var(--sea)',
                          textDecoration: 'none', display: 'block', whiteSpace: 'nowrap',
                        }}
                      >
                        Visa tur ↗
                      </a>
                    )}
                    {item.target_type === 'user' && anvandarnamn.get(item.target_id) && (
                      <a
                        href={`/u/${encodeURIComponent(anvandarnamn.get(item.target_id)!)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                          background: 'rgba(10,123,140,0.07)', color: 'var(--sea)',
                          textDecoration: 'none', display: 'block', whiteSpace: 'nowrap',
                        }}
                      >
                        Visa @{anvandarnamn.get(item.target_id)} ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Underlag från meddelanden */}
                {(underlagPerAnmalan.get(item.id)?.length ?? 0) > 0 && (
                  <div style={{
                    marginBottom: 12, padding: '10px 12px', borderRadius: 12,
                    background: 'rgba(10,123,140,0.04)', border: '1px solid rgba(10,123,140,0.10)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                      Underlag ur meddelanden
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {underlagPerAnmalan.get(item.id)!.map(u => {
                        const namn = u.avsandare_id ? anvandarnamn.get(u.avsandare_id) : null
                        const bild = u.bilaga_sokvag ? bildLankar.get(u.bilaga_sokvag) : null
                        const pos = u.bilaga_meta && typeof u.bilaga_meta.lat === 'number' && typeof u.bilaga_meta.lng === 'number'
                          ? `${u.bilaga_meta.lat.toFixed(4)}, ${u.bilaga_meta.lng.toFixed(4)}` : null
                        return (
                          <div key={u.message_id} style={{
                            padding: '6px 10px', borderRadius: 8,
                            background: u.ar_anmalt ? 'rgba(200,30,30,0.07)' : 'transparent',
                            border: u.ar_anmalt ? '1px solid rgba(200,30,30,0.25)' : '1px solid transparent',
                          }}>
                            <div style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 2 }}>
                              <strong>@{namn ?? 'raderat konto'}</strong>
                              {' · '}
                              {new Date(u.skickat_at).toLocaleString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              {u.ar_anmalt && <span style={{ color: 'var(--red)', fontWeight: 700 }}> · Anmält</span>}
                            </div>
                            {u.innehall && (
                              <div style={{ fontSize: 13, color: 'var(--txt)', lineHeight: 1.45, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {u.innehall}
                              </div>
                            )}
                            {u.bilaga_typ === 'image' && (bild
                              ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={bild} alt="Anmäld bild" style={{ maxWidth: 220, maxHeight: 220, borderRadius: 8, marginTop: 4, display: 'block' }} />
                              )
                              : <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>[bild]</div>
                            )}
                            {u.bilaga_typ === 'audio' && (bild
                              ? <audio src={bild} controls preload="none" style={{ marginTop: 4, display: 'block', maxWidth: 260 }} />
                              : <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>[röstmeddelande]</div>
                            )}
                            {u.bilaga_typ === 'geo' && (
                              <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>
                                [delad position{pos ? `: ${pos}` : ''}]
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Actions — client component */}
                {item.status === 'open' && (
                  <ModerationActions reportId={item.id} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {queue.length === limit && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 10 }}>
            {page > 0 && (
              <a
                href={`/admin/moderation?status=${statusFilter}&page=${page - 1}`}
                style={{
                  padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                  background: 'rgba(10,123,140,0.07)', color: 'var(--sea)', textDecoration: 'none',
                }}
              >
                ← Föregående
              </a>
            )}
            <a
              href={`/admin/moderation?status=${statusFilter}&page=${page + 1}`}
              style={{
                padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                background: 'var(--grad-sea)', color: '#fff', textDecoration: 'none',
              }}
            >
              Nästa →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
