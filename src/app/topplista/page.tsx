import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'
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
  const supabase = await createServerSupabaseClient()

  const weekAgo  = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  // Hämta alla turer (utökad data för flera listor)
  const { data: allTrips } = await supabase
    .from('trips')
    .select('id, user_id, distance, created_at, average_speed_knots, max_speed_knots, pinnar_rating')
    .order('created_at', { ascending: false })
    .limit(1000)

  const trips = (allTrips ?? []) as {
    id: string
    user_id: string
    distance: number
    created_at: string
    average_speed_knots: number
    max_speed_knots: number
    pinnar_rating: number | null
  }[]

  // Hämta usernames + avatars separat
  const allUids = [...new Set(trips.map(t => t.user_id).filter(Boolean))]
  const { data: allUserRows } = allUids.length
    ? await supabase.from('users').select('id, username, avatar').in('id', allUids)
    : { data: [] }

  const globalUmap: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of allUserRows ?? []) globalUmap[u.id] = { username: u.username, avatar: u.avatar ?? null }

  function getUser(uid: string) {
    return globalUmap[uid] ?? { username: 'Seglare', avatar: null }
  }

  // ── Veckans topplista: NM ─────────────────────────────────────────────────
  const weekTrips = trips.filter(t => t.created_at >= weekAgo)
  const weekByNM: Record<string, { nm: number; count: number }> = {}
  for (const t of weekTrips) {
    if (!weekByNM[t.user_id]) weekByNM[t.user_id] = { nm: 0, count: 0 }
    weekByNM[t.user_id]!.nm += t.distance ?? 0
    weekByNM[t.user_id]!.count++
  }
  const weekTopNM = Object.entries(weekByNM)
    .map(([uid, v]) => ({ uid, ...getUser(uid), ...v }))
    .sort((a, b) => b.nm - a.nm)
    .slice(0, 10)

  // ── Månadens topplista: NM ────────────────────────────────────────────────
  const monthTrips = trips.filter(t => t.created_at >= monthAgo)
  const monthByNM: Record<string, { nm: number; count: number; magic: number }> = {}
  for (const t of monthTrips) {
    if (!monthByNM[t.user_id]) monthByNM[t.user_id] = { nm: 0, count: 0, magic: 0 }
    monthByNM[t.user_id]!.nm += t.distance ?? 0
    monthByNM[t.user_id]!.count++
    if (t.pinnar_rating === 3) monthByNM[t.user_id]!.magic++
  }
  const monthTopNM = Object.entries(monthByNM)
    .map(([uid, v]) => ({ uid, ...getUser(uid), ...v }))
    .sort((a, b) => b.nm - a.nm)
    .slice(0, 10)

  // ── Alltime topplista: NM ─────────────────────────────────────────────────
  const allByNM: Record<string, { nm: number; count: number; magic: number; maxSpeedKnots: number; avgSpeedSum: number; avgSpeedCount: number }> = {}
  for (const t of trips) {
    const uid = t.user_id
    if (!allByNM[uid]) allByNM[uid] = { nm: 0, count: 0, magic: 0, maxSpeedKnots: 0, avgSpeedSum: 0, avgSpeedCount: 0 }
    allByNM[uid].nm += t.distance ?? 0
    allByNM[uid].count++
    if (t.pinnar_rating === 3) allByNM[uid].magic++
    if ((t.max_speed_knots ?? 0) > allByNM[uid].maxSpeedKnots) allByNM[uid].maxSpeedKnots = t.max_speed_knots ?? 0
    if ((t.average_speed_knots ?? 0) > 0) {
      allByNM[uid].avgSpeedSum += t.average_speed_knots
      allByNM[uid].avgSpeedCount++
    }
  }

  const allUsers = Object.entries(allByNM).map(([uid, v]) => ({
    uid,
    ...getUser(uid),
    nm:           v.nm,
    count:        v.count,
    magic:        v.magic,
    maxSpeed:     v.maxSpeedKnots,
    avgSpeed:     v.avgSpeedCount > 0 ? v.avgSpeedSum / v.avgSpeedCount : 0,
  }))

  const allTopNM     = [...allUsers].sort((a, b) => b.nm - a.nm).slice(0, 10)
  const allTopCount  = [...allUsers].sort((a, b) => b.count - a.count).slice(0, 10)
  const allTopMagic  = [...allUsers].filter(u => u.magic > 0).sort((a, b) => b.magic - a.magic).slice(0, 10)
  const allTopSpeed  = [...allUsers].filter(u => u.maxSpeed > 0).sort((a, b) => b.maxSpeed - a.maxSpeed).slice(0, 10)

  // ── Stats banner ─────────────────────────────────────────────────────────
  const totalNM     = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const uniqueUsers = new Set(trips.map(t => t.user_id)).size
  const magicTotal  = trips.filter(t => t.pinnar_rating === 3).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)' }}>

      {/* ── Header ── */}
      <header style={{
        padding: '12px 16px',
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link href="/feed" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(10,123,140,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>Topplista</h1>
          <p style={{ fontSize: 11, color: 'var(--txt3)', margin: 0 }}>Veckans &amp; alltidens bästa seglare</p>
        </div>
      </header>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '14px 14px' }}>

        {/* ── Community stats ── */}
        <div style={{
          background: 'linear-gradient(135deg,var(--txt),var(--sea))',
          borderRadius: 20, padding: '18px 20px', marginBottom: 16,
          boxShadow: '0 6px 28px rgba(26,58,94,0.3)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
        }}>
          {[
            { val: trips.length, label: 'Turer',
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l3-8 3 4 3-6 3 10"/><path d="M3 17h18"/></svg> },
            { val: `${Math.round(totalNM)}`, label: 'NM totalt',
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="12" x2="15" y2="15"/></svg> },
            { val: uniqueUsers, label: 'Seglare',
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
            { val: magicTotal, label: 'Magiska',
              icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg> },
          ].map(({ val, label, icon }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>{icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Veckans topp: NM ── */}
        <LeaderboardSection
          title="Veckans topp — Nautiska mil"
          subtitle="Senaste 7 dagarna"
          rows={weekTopNM.map(r => ({ uid: r.uid, username: r.username, avatar: r.avatar, value: r.nm, secondaryLabel: `${r.count} ${r.count === 1 ? 'tur' : 'turer'}` }))}
          formatValue={v => `${v.toFixed(1)} NM`}
          emptyText="Ingen har loggat denna vecka än"
          accentColor="#c96e2a"
        />

        {/* ── Månadens topp: NM ── */}
        <LeaderboardSection
          title="Månadens topp — Nautiska mil"
          subtitle="Senaste 30 dagarna"
          rows={monthTopNM.map(r => ({ uid: r.uid, username: r.username, avatar: r.avatar, value: r.nm, secondaryLabel: `${r.count} ${r.count === 1 ? 'tur' : 'turer'}${r.magic > 0 ? ` · ${r.magic} magiska` : ''}` }))}
          formatValue={v => `${v.toFixed(1)} NM`}
          emptyText="Ingen har loggat denna månad än"
          accentColor="#2d7d8a"
        />

        {/* ── Alltime topp: NM ── */}
        <LeaderboardSection
          title="Alltime — Nautiska mil"
          subtitle="Totalt seglat"
          rows={allTopNM.map(r => ({ uid: r.uid, username: r.username, avatar: r.avatar, value: r.nm, secondaryLabel: `${r.count} ${r.count === 1 ? 'tur' : 'turer'}` }))}
          formatValue={v => `${v.toFixed(0)} NM`}
          emptyText="Inga turer loggade"
          accentColor="#1e5c82"
        />

        {/* ── Alltime topp: antal turer ── */}
        <LeaderboardSection
          title="Alltime — Flest turer"
          subtitle="Antal loggade turer"
          rows={allTopCount.map(r => ({ uid: r.uid, username: r.username, avatar: r.avatar, value: r.count, secondaryLabel: `${r.nm.toFixed(0)} NM` }))}
          formatValue={v => `${v} turer`}
          emptyText="Inga turer loggade"
          accentColor="#2a9d5c"
        />

        {/* ── Magic trips leaderboard ── */}
        {allTopMagic.length > 0 && (
          <LeaderboardSection
            title="Alltime — Magiska turer"
            subtitle="Flest magiska turer"
            rows={allTopMagic.map(r => ({ uid: r.uid, username: r.username, avatar: r.avatar, value: r.magic, secondaryLabel: `${r.nm.toFixed(0)} NM totalt` }))}
            formatValue={v => `×${v} magiska`}
            emptyText="Inga magiska turer loggade"
            accentColor="#c96e2a"
          />
        )}

        {/* ── Speed leaderboard ── */}
        {allTopSpeed.length > 0 && (
          <LeaderboardSection
            title="Alltime — Toppfart"
            subtitle="Högsta uppmätta hastighet"
            rows={allTopSpeed.map(r => ({ uid: r.uid, username: r.username, avatar: r.avatar, value: r.maxSpeed, secondaryLabel: `${r.count} ${r.count === 1 ? 'tur' : 'turer'}` }))}
            formatValue={v => `${v.toFixed(1)} kn`}
            emptyText="Inga hastighetsvärden tillgängliga"
            accentColor="#7a40c9"
          />
        )}

        {/* ── CTA ── */}
        <div style={{
          background: 'var(--white)', borderRadius: 20, padding: '20px',
          boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginTop: 8,
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.7}>
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>Klättra på listan</h3>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px' }}>Logga en tur och se dig själv bland de bästa</p>
          <Link href="/logga" style={{
            display: 'inline-block', padding: '12px 32px', borderRadius: 14,
            background: 'var(--grad-acc)',
            color: '#fff', fontWeight: 600, fontSize: 14,
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
type LeaderRow = {
  uid:            string
  username:       string
  avatar:         string | null
  value:          number
  secondaryLabel: string
}

function LeaderboardSection({
  title, subtitle, rows, formatValue, emptyText, accentColor,
}: {
  title:        string
  subtitle:     string
  rows:         LeaderRow[]
  formatValue:  (v: number) => string
  emptyText:    string
  accentColor:  string
}) {
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 20, padding: '18px 16px',
      boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 14,
    }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 2px' }}>{title}</h2>
        <p style={{ fontSize: 11, color: 'var(--txt3)', margin: 0 }}>{subtitle}</p>
      </div>

      {rows.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center', padding: '20px 0' }}>{emptyText}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rows.map((row, i) => {
            const isTop3 = i < 3
            return (
              <Link
                key={row.uid}
                href={`/u/${row.username}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 14,
                  background: isTop3 ? `${accentColor}0d` : 'rgba(10,123,140,0.03)',
                  border: isTop3 ? `1.5px solid ${accentColor}22` : '1px solid rgba(10,123,140,0.06)',
                  textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 28, height: 28, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i < 3 ? 20 : 12, fontWeight: 600,
                  color: i < 3 ? undefined : 'var(--txt3)',
                }}>
                  {medal(i + 1)}
                </div>

                {/* Avatar */}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: isTop3
                    ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
                    : 'var(--grad-sea)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: '#fff',
                  overflow: 'hidden',
                }}>
                  {row.avatar
                    ? <Image src={row.avatar} alt={row.username} width={36} height={36} style={{ objectFit: 'cover' }} />
                    : row.username[0]?.toUpperCase() ?? '?'
                  }
                </div>

                {/* Name + secondary */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 600, color: 'var(--txt)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {row.username}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
                    {row.secondaryLabel}
                  </div>
                </div>

                {/* Value */}
                <div style={{
                  fontSize: 13, fontWeight: 700, color: accentColor,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {formatValue(row.value)}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
