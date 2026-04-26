import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ForumQueueActions from './ForumQueueActions'

export const dynamic = 'force-dynamic'

export default async function AdminForumPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>
}) {
  const supabase = await createServerSupabaseClient()

  // Auth guard
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/forum')
  const { data: userRow } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const sp = await searchParams
  const tab   = sp.tab === 'posts' ? 'posts' : 'threads'
  const page  = Math.max(0, parseInt(sp.page ?? '0', 10))
  const LIMIT = 25

  // Hämta spam-kö
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let items: Array<Record<string, any>> = []

  if (tab === 'threads') {
    const { data } = await supabase
      .from('forum_threads')
      .select('id, title, body, created_at, category_id, user_id')
      .eq('in_spam_queue', true)
      .order('created_at', { ascending: false })
      .range(page * LIMIT, (page + 1) * LIMIT - 1)
    items = data ?? []
  } else {
    const { data } = await supabase
      .from('forum_posts')
      .select('id, body, created_at, thread_id, user_id')
      .eq('in_spam_queue', true)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .range(page * LIMIT, (page + 1) * LIMIT - 1)
    items = data ?? []
  }

  // Enricha med användarinfo
  const userIds = [...new Set(items.map(i => i.user_id as string))]
  const { data: users } = userIds.length
    ? await supabase.from('users').select('id, username, email').in('id', userIds)
    : { data: [] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const umap = new Map((users ?? []).map((u: any) => [u.id, u]))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enriched = items.map(i => ({ ...i, author: umap.get(i.user_id) })) as Array<Record<string, any>>

  // Räkna totalt i kön
  const [{ count: threadCount }, { count: postCount }] = await Promise.all([
    supabase.from('forum_threads').select('*', { count: 'exact', head: true }).eq('in_spam_queue', true),
    supabase.from('forum_posts').select('*', { count: 'exact', head: true }).eq('in_spam_queue', true).eq('is_deleted', false),
  ])

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
              Forum — spam-kö
              {((threadCount ?? 0) + (postCount ?? 0)) > 0 && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginLeft: 10, minWidth: 22, height: 22, borderRadius: 11,
                  background: 'var(--acc)', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '0 6px',
                }}>
                  {(threadCount ?? 0) + (postCount ?? 0)}
                </span>
              )}
            </h1>
          </div>
          <a href="/admin" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>
            ← Admin
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>

        {/* Flikar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {([
            { key: 'threads', label: 'Trådar', count: threadCount ?? 0 },
            { key: 'posts',   label: 'Svar',   count: postCount ?? 0 },
          ] as const).map(({ key, label, count }) => (
            <a
              key={key}
              href={`/admin/forum?tab=${key}`}
              style={{
                padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
                background: tab === key ? 'var(--grad-sea)' : 'rgba(10,123,140,0.07)',
                color: tab === key ? '#fff' : 'var(--txt2)',
                border: tab === key ? 'none' : '1px solid rgba(10,123,140,0.15)',
              }}
            >
              {label} {count > 0 && `(${count})`}
            </a>
          ))}
        </div>

        {/* Tom kö */}
        {enriched.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: 'var(--white)', borderRadius: 18,
            border: '1px solid rgba(10,123,140,0.10)',
          }}>
            <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
              <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-6" />
              </svg>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
              Kön är tom
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt3)' }}>
              Inga {tab === 'threads' ? 'trådar' : 'svar'} väntar på granskning.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {enriched.map(item => (
              <div key={item.id} style={{
                background: 'var(--white)', borderRadius: 16,
                border: '1px solid rgba(10,123,140,0.10)',
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
              }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 8,
                    background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                  }}>
                    {tab === 'threads' ? 'TRÅD' : 'SVAR'}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)' }}>
                    @{item.author?.username ?? '?'}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--txt3)' }}>
                    {item.author?.email ?? ''}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--txt3)', marginLeft: 'auto' }}>
                    {new Date(item.created_at).toLocaleString('sv-SE', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Rubrik (om tråd) */}
                {tab === 'threads' && (
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>
                    {item.title}
                  </div>
                )}

                {/* Brödtext */}
                <div style={{
                  fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6,
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  maxHeight: 140, overflow: 'hidden',
                  position: 'relative',
                }}>
                  {item.body}
                </div>

                {/* Åtgärder */}
                <ForumQueueActions id={item.id} type={tab === 'threads' ? 'thread' : 'post'} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {enriched.length === LIMIT && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 10 }}>
            {page > 0 && (
              <a href={`/admin/forum?tab=${tab}&page=${page - 1}`} style={{
                padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                background: 'rgba(10,123,140,0.07)', color: 'var(--sea)', textDecoration: 'none',
              }}>
                ← Föregående
              </a>
            )}
            <a href={`/admin/forum?tab=${tab}&page=${page + 1}`} style={{
              padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              background: 'var(--grad-sea)', color: '#fff', textDecoration: 'none',
            }}>
              Nästa →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
