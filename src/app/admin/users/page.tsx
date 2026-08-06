/**
 * /admin/users — dedikerad users-vy.
 *
 * Visar:
 *   - Total registered users + delta 7d/30d
 *   - Signup-graf senaste 30 dagar (aggregerad från public.users)
 *   - Senaste 20 registreringar (header-lista)
 *   - Sökbar/filtrerbar/paginerad tabell (25/sida, nyast först)
 *
 * Källa: public.users (mirror av auth.users via trigger, se
 * 20260502000038_fix-missing-users-trigger.sql). Rollen är binär via
 * is_admin — ingen super/moderator-split finns idag, så e-post visas
 * för alla admins.
 *
 * Auth: cookie-gate i middleware.ts + per-page is_admin-check
 * (samma mönster som övriga admin-sidor).
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SIZE = 25
const RECENT_HEADER_LIMIT = 20

type UserRow = {
  id: string
  username: string | null
  email: string | null
  avatar: string | null
  created_at: string | null
  vessel_type: string | null
  boat_type: string | null
  home_port: string | null
  sailing_region: string | null
  onboarded_at: string | null
}

type SearchParams = {
  q?: string
  region?: string
  vt?: string
  onb?: string
  page?: string
}

interface PageProps {
  searchParams: Promise<SearchParams>
}

const SELECT_COLS =
  'id, username, email, avatar, created_at, vessel_type, boat_type, home_port, sailing_region, onboarded_at'

// ── Båttyps-etikett: vessel_type är primär (nyare onboarding), boat_type
// äldre fält. Vi normaliserar för filter till en kanonisk grupp.
type VesselCategory = 'own_boat' | 'charter' | 'paddle' | 'guest'
const CATEGORY_LABEL: Record<VesselCategory, string> = {
  own_boat: 'Egen båt',
  charter: 'Charter',
  paddle: 'Kajak/SUP',
  guest: 'Gäst / övrigt',
}
function categorize(vessel_type: string | null, boat_type: string | null): VesselCategory {
  const t = (vessel_type || boat_type || '').toLowerCase()
  if (!t) return 'guest'
  if (t.includes('charter')) return 'charter'
  if (t.includes('kajak') || t.includes('sup') || t.includes('paddle')) return 'paddle'
  if (t.includes('segel') || t.includes('motor') || t.includes('sail') || t.includes('motor'))
    return 'own_boat'
  return 'guest'
}

function relativeTime(iso: string | null): string {
  if (!iso) return '—'
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diff = Math.max(0, now - then) / 1000
  if (diff < 60) return 'nyss'
  if (diff < 3600) return `${Math.floor(diff / 60)} min`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h`
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} d`
  const months = Math.floor(diff / (86400 * 30))
  if (months < 12) return `${months} mån`
  return `${Math.floor(months / 12)} år`
}

function initialsFor(username: string | null, email: string | null): string {
  const base = (username || email || '?').trim()
  if (!base) return '?'
  const parts = base.split(/[\s._-]+/).filter(Boolean)
  const a = parts[0]?.[0]
  const b = parts[1]?.[0]
  if (a && b) return (a + b).toUpperCase()
  return base.slice(0, 2).toUpperCase()
}

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400_000).toISOString()
}

function buildQueryString(base: SearchParams, overrides: Partial<SearchParams>): string {
  const merged: Record<string, string> = {}
  for (const [k, v] of Object.entries({ ...base, ...overrides })) {
    if (v !== undefined && v !== '' && v !== null) merged[k] = String(v)
  }
  const s = new URLSearchParams(merged).toString()
  return s ? `?${s}` : ''
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  // ── Auth (samma mönster som /admin/page.tsx) ────────────────────────
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/users')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  const sp = await searchParams
  const q = (sp.q ?? '').trim()
  const region = (sp.region ?? '').trim()
  const vtFilter = (sp.vt ?? '').trim() as VesselCategory | ''
  const onbFilter = (sp.onb ?? '').trim() // 'ja' | 'nej' | ''
  const rawPage = parseInt(sp.page ?? '1', 10)
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1

  const service = getAdminClient()

  // ── 1. Totaler + delta ──────────────────────────────────────────────
  const iso7 = isoDaysAgo(7)
  const iso30 = isoDaysAgo(30)

  const [totalRes, last7Res, last30Res, prev7Res, prev30Res] = await Promise.all([
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('users').select('*', { count: 'exact', head: true }).gte('created_at', iso7),
    service.from('users').select('*', { count: 'exact', head: true }).gte('created_at', iso30),
    service
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', isoDaysAgo(14))
      .lt('created_at', iso7),
    service
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', isoDaysAgo(60))
      .lt('created_at', iso30),
  ])

  const total = totalRes.count ?? 0
  const last7 = last7Res.count ?? 0
  const last30 = last30Res.count ?? 0
  const prev7 = prev7Res.count ?? 0
  const prev30 = prev30Res.count ?? 0
  const delta7 = last7 - prev7
  const delta30 = last30 - prev30

  // ── 2. Signup-graf senaste 30 dagar ─────────────────────────────────
  // Vi hämtar bara created_at, aggregerar per dag i JS. Vid stor volym
  // (>10k/mån) byt till en RPC med date_trunc — inte behov idag.
  const { data: signupRows } = await service
    .from('users')
    .select('created_at')
    .gte('created_at', iso30)
    .order('created_at', { ascending: true })
    .limit(10000)

  const buckets = new Map<string, number>()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10)
    buckets.set(d, 0)
  }
  for (const r of signupRows ?? []) {
    if (!r.created_at) continue
    const day = String(r.created_at).slice(0, 10)
    if (buckets.has(day)) buckets.set(day, (buckets.get(day) ?? 0) + 1)
  }
  const series = [...buckets.entries()].map(([day, count]) => ({ day, count }))
  const maxCount = Math.max(1, ...series.map((s) => s.count))

  // ── 3. Senaste 20 registreringar (header-tape) ──────────────────────
  const { data: recentRaw } = await service
    .from('users')
    .select(SELECT_COLS)
    .order('created_at', { ascending: false })
    .limit(RECENT_HEADER_LIMIT)
  const recent = (recentRaw ?? []) as UserRow[]

  // ── 4. Filter-alternativ (distinct sailing_region) ──────────────────
  const { data: regionRows } = await service
    .from('users')
    .select('sailing_region')
    .not('sailing_region', 'is', null)
    .limit(2000)
  const regionOptions = [
    ...new Set(
      (regionRows ?? [])
        .map((r) => (r.sailing_region ?? '').trim())
        .filter((v) => v.length > 0),
    ),
  ].sort((a, b) => a.localeCompare(b, 'sv'))

  // ── 5. Sök + filter + paginering ────────────────────────────────────
  let query = service
    .from('users')
    .select(SELECT_COLS, { count: 'exact' })
    .order('created_at', { ascending: false })

  if (q) {
    // OR-sök på username eller email. Supabase .or() kräver kommaseparerad
    // sträng med kolumn.operator.värde. Escapa kommatecken/parens i q.
    const safe = q.replace(/[,()]/g, ' ')
    query = query.or(`username.ilike.%${safe}%,email.ilike.%${safe}%`)
  }
  if (region) query = query.eq('sailing_region', region)
  if (onbFilter === 'ja') query = query.not('onboarded_at', 'is', null)
  else if (onbFilter === 'nej') query = query.is('onboarded_at', null)

  // Båttypsfilter — vi kan inte enkelt matcha kategorin i DB (regex),
  // så för egen båt / charter / paddle mappar vi till OR-lista av
  // typiska värden. Kategorin "guest" = allt annat, det hämtar vi
  // som "null både vessel_type & boat_type".
  if (vtFilter === 'own_boat') {
    query = query.or(
      'vessel_type.ilike.%segel%,vessel_type.ilike.%motor%,vessel_type.ilike.%sail%,boat_type.ilike.%segel%,boat_type.ilike.%motor%',
    )
  } else if (vtFilter === 'charter') {
    query = query.or('vessel_type.ilike.%charter%,boat_type.ilike.%charter%')
  } else if (vtFilter === 'paddle') {
    query = query.or(
      'vessel_type.ilike.%kajak%,vessel_type.ilike.%sup%,vessel_type.ilike.%paddle%,boat_type.ilike.%kajak%,boat_type.ilike.%sup%',
    )
  } else if (vtFilter === 'guest') {
    query = query.is('vessel_type', null).is('boat_type', null)
  }

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const { data: pageRows, count: filteredCount } = await query.range(from, to)
  const list = ((pageRows ?? []) as UserRow[])

  const totalPages = Math.max(1, Math.ceil((filteredCount ?? 0) / PAGE_SIZE))

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Link
          href="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: 'var(--txt3)',
            textDecoration: 'none',
            marginBottom: 20,
          }}
        >
          ← Admin
        </Link>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>
          Användare
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 24px' }}>
          Registrerade seglare, signup-utveckling och sök.
        </p>

        {/* ── Header-stats ──────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 8,
            marginBottom: 16,
          }}
        >
          <StatCard label="Totalt registrerade" value={total} sub="alla tider" color="#1d4ed8" />
          <StatCard
            label="Senaste 7 dagar"
            value={last7}
            sub={<Delta value={delta7} />}
            color="#0a7b3c"
          />
          <StatCard
            label="Senaste 30 dagar"
            value={last30}
            sub={<Delta value={delta30} />}
            color="#7c3aed"
          />
        </div>

        {/* ── Signup-graf 30d ──────────────────────────────────── */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--surface-3)',
            borderRadius: 12,
            padding: '16px 18px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
              Signup senaste 30 dagar
            </h2>
            <span style={{ fontSize: 11, color: 'var(--txt3)' }}>Max/dag: {maxCount}</span>
          </div>
          <SignupBarChart series={series} max={maxCount} />
        </div>

        {/* ── Senaste 20 (header-tape) ─────────────────────────── */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--surface-3)',
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
              Senaste {RECENT_HEADER_LIMIT} registreringar
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recent.map((u) => (
              <RecentRow key={u.id} u={u} />
            ))}
            {recent.length === 0 && (
              <div style={{ fontSize: 13, color: 'var(--txt3)', padding: 12 }}>Inga registreringar än.</div>
            )}
          </div>
        </div>

        {/* ── Sök + filter ─────────────────────────────────────── */}
        <form
          method="GET"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 8,
            marginBottom: 14,
            padding: '12px 14px',
            background: 'var(--white)',
            border: '1px solid var(--surface-3)',
            borderRadius: 12,
          }}
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Sök username / email"
            style={{
              padding: '8px 10px',
              border: '1px solid var(--surface-3)',
              borderRadius: 8,
              background: 'var(--bg)',
              color: 'var(--txt)',
              fontSize: 13,
              gridColumn: '1 / -1',
            }}
          />
          <select
            name="region"
            defaultValue={region}
            style={{
              padding: '8px 10px',
              border: '1px solid var(--surface-3)',
              borderRadius: 8,
              background: 'var(--bg)',
              color: 'var(--txt)',
              fontSize: 13,
            }}
          >
            <option value="">Alla regioner</option>
            {regionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            name="vt"
            defaultValue={vtFilter}
            style={{
              padding: '8px 10px',
              border: '1px solid var(--surface-3)',
              borderRadius: 8,
              background: 'var(--bg)',
              color: 'var(--txt)',
              fontSize: 13,
            }}
          >
            <option value="">Alla båttyper</option>
            <option value="own_boat">Egen båt</option>
            <option value="charter">Charter</option>
            <option value="paddle">Kajak/SUP</option>
            <option value="guest">Gäst / övrigt</option>
          </select>
          <select
            name="onb"
            defaultValue={onbFilter}
            style={{
              padding: '8px 10px',
              border: '1px solid var(--surface-3)',
              borderRadius: 8,
              background: 'var(--bg)',
              color: 'var(--txt)',
              fontSize: 13,
            }}
          >
            <option value="">Onboardat: alla</option>
            <option value="ja">Onboardat: ja</option>
            <option value="nej">Onboardat: nej</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '8px 14px',
              border: 'none',
              borderRadius: 8,
              background: 'var(--sea)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Filtrera
          </button>
        </form>

        {/* ── Resultat-tabell ─────────────────────────────────── */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--surface-3)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '1px solid var(--surface-3)',
              fontSize: 12,
              color: 'var(--txt3)',
            }}
          >
            <span>
              {filteredCount ?? 0} träffar
              {(q || region || vtFilter || onbFilter) && ' (filtrerat)'}
            </span>
            <span>
              Sida {page} / {totalPages}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {list.map((u) => (
              <UserTableRow key={u.id} u={u} />
            ))}
            {list.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
                Inga träffar.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                padding: 12,
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
                borderTop: '1px solid var(--surface-3)',
              }}
            >
              <PageLink label="← Föreg" disabled={page <= 1} href={`/admin/users${buildQueryString(sp, { page: String(page - 1) })}`} />
              <span style={{ fontSize: 12, color: 'var(--txt3)', padding: '6px 8px' }}>
                {page} / {totalPages}
              </span>
              <PageLink label="Nästa →" disabled={page >= totalPages} href={`/admin/users${buildQueryString(sp, { page: String(page + 1) })}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Underkomponenter
// ─────────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: number
  sub: React.ReactNode
  color: string
}) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--surface-3)',
        borderTop: `3px solid ${color}`,
        borderRadius: 10,
        padding: '12px 14px',
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function Delta({ value }: { value: number }) {
  if (value === 0) return <span>±0 mot föreg. period</span>
  const positive = value > 0
  const color = positive ? '#0a7b3c' : '#7f1d1d'
  return (
    <span style={{ color, fontWeight: 600 }}>
      {positive ? '+' : ''}
      {value} mot föreg. period
    </span>
  )
}

function SignupBarChart({
  series,
  max,
}: {
  series: { day: string; count: number }[]
  max: number
}) {
  const W = 640
  const H = 120
  const PAD_LEFT = 24
  const PAD_BOTTOM = 18
  const chartW = W - PAD_LEFT
  const chartH = H - PAD_BOTTOM
  const barGap = 2
  const barW = Math.max(1, chartW / series.length - barGap)

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        role="img"
        aria-label="Signup senaste 30 dagar"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: 140, display: 'block' }}
      >
        {/* Y-axelticks: 0, max */}
        <line x1={PAD_LEFT} y1={chartH} x2={W} y2={chartH} stroke="var(--surface-3)" strokeWidth={1} />
        <text x={0} y={chartH} fontSize={9} fill="var(--txt3)" alignmentBaseline="middle">
          0
        </text>
        <text x={0} y={10} fontSize={9} fill="var(--txt3)" alignmentBaseline="middle">
          {max}
        </text>

        {series.map((s, i) => {
          const h = (s.count / max) * chartH
          const x = PAD_LEFT + i * (barW + barGap)
          const y = chartH - h
          return (
            <g key={s.day}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                fill="#0a7b8c"
                rx={1}
              >
                <title>
                  {s.day}: {s.count}
                </title>
              </rect>
            </g>
          )
        })}

        {/* X-axel: första / mitten / sista datum */}
        {(() => {
          const first = series[0]?.day
          const mid = series[Math.floor(series.length / 2)]?.day
          const last = series[series.length - 1]?.day
          if (!first || !last) return null
          return (
            <>
              <text x={PAD_LEFT} y={H - 4} fontSize={9} fill="var(--txt3)">
                {first.slice(5)}
              </text>
              {mid && (
                <text
                  x={PAD_LEFT + chartW / 2}
                  y={H - 4}
                  fontSize={9}
                  textAnchor="middle"
                  fill="var(--txt3)"
                >
                  {mid.slice(5)}
                </text>
              )}
              <text x={W} y={H - 4} fontSize={9} textAnchor="end" fill="var(--txt3)">
                {last.slice(5)}
              </text>
            </>
          )
        })()}
      </svg>
    </div>
  )
}

function Avatar({ u, size = 32 }: { u: UserRow; size?: number }) {
  const initials = initialsFor(u.username, u.email)
  if (u.avatar) {
    // Avatar-URLer kommer från externa källor (Supabase Storage, sociala profiler)
    // och kräver ingen next/image-optimering. Suppress varnar för <img>-taggen.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={u.avatar}
        alt={u.username ?? 'avatar'}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          background: 'var(--surface-2)',
          border: '1px solid var(--surface-3)',
          flexShrink: 0,
        }}
      />
    )
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--surface-2)',
        color: 'var(--txt2)',
        fontSize: size * 0.35,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--surface-3)',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

function RecentRow({ u }: { u: UserRow }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 4px',
        borderBottom: '1px solid var(--surface-2)',
      }}
    >
      <Avatar u={u} size={26} />
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', flex: '0 0 140px' }}>
        {u.username ?? '—'}
      </span>
      <span style={{ fontSize: 12, color: 'var(--txt3)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {u.home_port || u.sailing_region || u.email || ''}
      </span>
      <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{relativeTime(u.created_at)}</span>
    </div>
  )
}

function UserTableRow({ u }: { u: UserRow }) {
  const category = categorize(u.vessel_type, u.boat_type)
  const onboarded = !!u.onboarded_at
  const hemma = u.home_port || u.sailing_region || '—'
  const profileHref = u.username ? `/u/${u.username}` : null
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1.2fr 1.6fr 1.2fr 0.8fr 0.6fr 0.6fr',
        gap: 10,
        alignItems: 'center',
        padding: '10px 14px',
        borderBottom: '1px solid var(--surface-2)',
        fontSize: 13,
      }}
    >
      <Avatar u={u} size={32} />
      <div>
        {profileHref ? (
          <Link
            href={profileHref}
            style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}
          >
            {u.username}
          </Link>
        ) : (
          <span style={{ color: 'var(--txt3)' }}>—</span>
        )}
      </div>
      <div
        style={{
          color: 'var(--txt2)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={u.email ?? ''}
      >
        {u.email ?? '—'}
      </div>
      <div style={{ color: 'var(--txt2)' }}>{hemma}</div>
      <div style={{ color: 'var(--txt2)' }}>{CATEGORY_LABEL[category]}</div>
      <div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 999,
            background: onboarded ? '#0a7b3c' : 'var(--surface-2)',
            color: onboarded ? '#fff' : 'var(--txt2)',
          }}
        >
          {onboarded ? 'Onb.' : '—'}
        </span>
      </div>
      <div style={{ color: 'var(--txt3)', fontSize: 12, textAlign: 'right' }}>
        {relativeTime(u.created_at)}
      </div>
    </div>
  )
}

function PageLink({ label, href, disabled }: { label: string; href: string; disabled: boolean }) {
  if (disabled) {
    return (
      <span
        style={{
          padding: '6px 12px',
          border: '1px solid var(--surface-3)',
          borderRadius: 8,
          fontSize: 12,
          color: 'var(--txt3)',
          background: 'var(--surface-2)',
          cursor: 'not-allowed',
        }}
      >
        {label}
      </span>
    )
  }
  return (
    <Link
      href={href}
      style={{
        padding: '6px 12px',
        border: '1px solid var(--surface-3)',
        borderRadius: 8,
        fontSize: 12,
        color: 'var(--sea)',
        background: 'var(--white)',
        textDecoration: 'none',
      }}
    >
      {label}
    </Link>
  )
}
