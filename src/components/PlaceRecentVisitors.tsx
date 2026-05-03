import Link from 'next/link'
import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { timeAgo } from '@/lib/utils'

/**
 * "Senast här" — visar de senaste personerna som markerat platsen som höjdpunkt
 * på sin GPS-tur. Server component, hämtar från `trip_highlights`.
 *
 * Visas på /plats/[slug]. Tom-sektion om ingen besökt än.
 */

export default async function PlaceRecentVisitors({
  placeSlug,
  placeName,
}: {
  placeSlug: string
  placeName: string
}) {
  const supabase = await createServerSupabaseClient()

  const { data: rows } = await supabase
    .from('trip_highlights')
    .select(`
      id, created_at, note, trip_id, user_id
    `)
    .eq('place_slug', placeSlug)
    .order('created_at', { ascending: false })
    .limit(5)

  // Hämta användardata separat (RLS kan blockera join i select-syntax)
  const userIds = [...new Set((rows ?? []).map(r => r.user_id))]
  const { data: users } = userIds.length > 0
    ? await supabase.from('users').select('id, username, avatar').in('id', userIds)
    : { data: [] as Array<{ id: string; username: string | null; avatar: string | null }> }

  const userMap = new Map((users ?? []).map(u => [u.id, u]))

  if (!rows || rows.length === 0) {
    return (
      <section style={{ marginTop: 24 }}>
        <h2 style={{
          fontSize: 14, fontWeight: 700, color: 'var(--txt3)',
          textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px',
        }}>
          Senast här
        </h2>
        <div style={{
          background: 'var(--white)',
          borderRadius: 14,
          padding: '20px 18px',
          fontSize: 14, color: 'var(--txt3)', lineHeight: 1.55,
          textAlign: 'center',
        }}>
          Ingen har gjort {placeName} till höjdpunkt på en tur än.
          <br />
          <span style={{ fontSize: 12, color: 'var(--txt3)', opacity: 0.8 }}>
            Bli första — logga din nästa tur här.
          </span>
        </div>
      </section>
    )
  }

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{
        fontSize: 14, fontWeight: 700, color: 'var(--txt3)',
        textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px',
      }}>
        Senast här
      </h2>
      <div style={{
        background: 'var(--white)',
        borderRadius: 14,
        boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
        overflow: 'hidden',
      }}>
        {rows.map((r, idx) => {
          const u = userMap.get(r.user_id)
          const name = u?.username ?? 'Någon'
          return (
            <Link
              key={r.id}
              href={`/tur/${r.trip_id}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: idx < rows.length - 1 ? '1px solid rgba(10,123,140,0.08)' : 'none',
                textDecoration: 'none',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(10,123,140,0.10)',
                color: 'var(--sea)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                flexShrink: 0, overflow: 'hidden',
              }}>
                {u?.avatar ? (
                  <Image src={u.avatar} alt="" width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  name.slice(0, 1).toUpperCase()
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>
                  {u?.username ? (
                    <Link href={`/u/${u.username}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {name}
                    </Link>
                  ) : name}
                  <span style={{ color: 'var(--txt3)', fontWeight: 400 }}> var här</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
                  {timeAgo(r.created_at)}
                  {r.note ? ` · "${r.note}"` : ''}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
