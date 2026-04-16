import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 300   // uppdatera var 5:e minut

export const metadata: Metadata = {
  title: 'Topplista – Svalla',
  description: 'Veckans och alltidens bästa skärgårdsseglare. Se vem som seglat mest nautiska mil på Svalla.',
  openGraph: {
    title: 'Topplista – Svalla',
    description: 'Veckans bästa skärgårdsseglare',
    url: 'https://svalla.se/topplista',
  },
}

function medal(rank: number) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `${rank}`
}

export default async function ToplistaPage() {
  const supabase = createClient()

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  // Hämta alla turer utan users-join (FK pekar på auth.users)
  const { data: allTrips } = await supabase
    .from('trips')
    .select('id, user_id, distance, created_at')
    .order('created_at', { ascending: false })
    .limit(1000)

  const trips = (allTrips ?? []) as {
    id: string
    user_id: string
    distance: number
    created_at: string
  }[]

  // Hämta usernames separat
  const allUids = [...new Set(trips.map(t => t.user_id).filter(Boolean))]
  const { data: allUserRows } = allUids.length
    ? await supabase.from('users').select('id, username').in('id', allUids)
    : { data: [] }
  const globalUmap: Record<string, string> = {}
  for (const u of allUserRows ?? []) globalUmap[u.id] = u.username

  function getUsername(uid: string): string {
    return globalUmap[uid] ?? 'Seglare'
  }

  // ── Veckans topplista: NM ───────────────────────────────────────────────────
  const weekTrips = trips.filter(t => t.created_at >= weekAgo)
  const weekByNM: Record<string, { nm: number; count: number; username: string }> = {}
  for (const t of weekTrips) {
    const uid = t.user_id
    const name = getUsername(t.user_id)
    if (!weekByNM[uid]) weekByNM[uid] = { nm: 0, count: 0, username: name }
    weekByNM[uid].nm += t.distance ?? 0
    weekByNM[uid].count++
  }
  const weekTopNM = Object.entries(weekByNM)
    .map(([uid, v]) => ({ uid, ...v }))
    .sort((a, b) => b.nm - a.nm)
    .slice(0, 10)

  // ── Alltime topplista: NM ───────────────────────────────────────────────────
  const allByNM: Record<string, { nm: number; count: number; username: string }> = {}
  for (const t of trips) {
    const uid = t.user_id
    const name = getUsername(t.user_id)
    if (!allByNM[uid]) allByNM[uid] = { nm: 0, count: 0, username: name }
    allByNM[uid].nm += t.distance ?? 0
    allByNM[uid].count++
  }
  const allTopNM = Object.entries(allByNM)
    .map(([uid, v]) => ({ uid, ...v }))
    .sort((a, b) => b.nm - a.nm)
    .slice(0, 10)

  // ── Alltime topplista: antal turer ──────────────────────────────────────────
  const allTopCount = [...Object.entries(allByNM)]
    .map(([uid, v]) => ({ uid, ...v }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // ── Stats banner ────────────────────────────────────────────────────────────
  const totalNM = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const uniqueUsers = new Set(trips.map(t => t.user_id)).size

  return (
    <div style={{ minHeight: '100vh', background: '#f2f8fa', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '12px 16px',
        background: 'rgba(250,254,255,0.96)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link href="/feed" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(10,123,140,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Topplista</h1>
          <p style={{ fontSize: 11, color: '#7a9dab', margin: 0 }}>Veckans &amp; alltidens bästa seglare</p>
        </div>
      </header>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '14px 14px' }}>

        {/* ── Community stats ── */}
        <div style={{
          background: 'linear-gradient(135deg,#1a3a5e,#1e5c82)',
          borderRadius: 20, padding: '18px 20px', marginBottom: 16,
          boxShadow: '0 6px 28px rgba(26,58,94,0.3)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        }}>
          {[
            { val: trips.length, label: 'Turer totalt', emoji: '⛵' },
            { val: `${Math.round(totalNM)}`, label: 'NM seglat', emoji: '🧭' },
            { val: uniqueUsers, label: 'Seglare', emoji: '👥' },
          ].map(({ val, label, emoji }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 2 }}>{emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Veckans topp: NM ── */}
        <LeaderboardSection
          title="🔥 Veckans topp — Nautiska mil"
          subtitle="Senaste 7 dagarna"
          rows={weekTopNM}
          valueKey="nm"
          unit="NM"
          emptyText="Ingen har loggat denna vecka än"
          accentColor="#c96e2a"
        />

        {/* ── Alltime topp: NM ── */}
        <LeaderboardSection
          title="⛵ Alltime — Nautiska mil"
          subtitle="Totalt seglat"
          rows={allTopNM}
          valueKey="nm"
          unit="NM"
          emptyText="Inga turer loggade"
          accentColor="#1e5c82"
        />

        {/* ── Alltime topp: Antal turer ── */}
        <LeaderboardSection
          title="🗺️ Alltime — Flest turer"
          subtitle="Antal loggade turer"
          rows={allTopCount}
          valueKey="count"
          unit="turer"
          emptyText="Inga turer loggade"
          accentColor="#2a9d5c"
        />

        {/* ── CTA ── */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '20px',
          boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginTop: 8,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🚀</div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1a3a5e', margin: '0 0 6px' }}>Klättra på listan</h3>
          <p style={{ fontSize: 13, color: '#7a9dab', margin: '0 0 16px' }}>Logga en tur och se dig själv bland de bästa</p>
          <Link href="/logga" style={{
            display: 'inline-block', padding: '12px 32px', borderRadius: 14,
            background: 'linear-gradient(135deg,#c96e2a,#e07828)',
            color: '#fff', fontWeight: 800, fontSize: 14,
            boxShadow: '0 4px 16px rgba(201,110,42,0.4)', textDecoration: 'none',
          }}>
            Logga en tur →
          </Link>
        </div>

      </div>
    </div>
  )
}

// ── Reusable leaderboard section ─────────────────────────────────────────────
function LeaderboardSection({
  title, subtitle, rows, valueKey, unit, emptyText, accentColor,
}: {
  title: string
  subtitle: string
  rows: { uid: string; username: string; nm?: number; count?: number }[]
  valueKey: 'nm' | 'count'
  unit: string
  emptyText: string
  accentColor: string
}) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: '18px 16px',
      boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 14,
    }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 14, fontWeight: 900, color: '#162d3a', margin: '0 0 2px' }}>{title}</h2>
        <p style={{ fontSize: 11, color: '#7a9dab', margin: 0 }}>{subtitle}</p>
      </div>

      {rows.length === 0 ? (
        <p style={{ fontSize: 13, color: '#a0bec8', textAlign: 'center', padding: '20px 0' }}>{emptyText}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rows.map((row, i) => {
            const val = valueKey === 'nm'
              ? `${(row.nm ?? 0).toFixed(1)} ${unit}`
              : `${row.count ?? 0} ${unit}`
            const isTop3 = i < 3
            return (
              <div
                key={row.uid}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 14,
                  background: isTop3 ? `${accentColor}0d` : 'rgba(10,123,140,0.03)',
                  border: isTop3 ? `1.5px solid ${accentColor}22` : '1px solid rgba(10,123,140,0.06)',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i < 3 ? 22 : 13, fontWeight: 800,
                  color: i < 3 ? undefined : '#7a9dab',
                }}>
                  {medal(i + 1)}
                </div>

                {/* Avatar initials */}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: isTop3
                    ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
                    : 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 900, color: '#fff',
                }}>
                  {row.username[0]?.toUpperCase() ?? '?'}
                </div>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: '#162d3a',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {row.username}
                  </div>
                </div>

                {/* Value */}
                <div style={{
                  fontSize: 14, fontWeight: 900, color: accentColor,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {val}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
