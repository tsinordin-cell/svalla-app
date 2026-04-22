import { createClient } from '@/lib/supabase'
import type { Tour } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import EmptyState from '@/components/EmptyState'
import { categoryColor as categoryColorTokens } from '@/lib/tokens'
import { ISLANDS } from '@/app/o/island-data'
import { SEED_FERRY_ROUTES, fetchDepartures, type FerryDeparture, type FerryRoute } from '@/lib/ferries'

// ── Öar-sektioner (matchar /oar) ──────────────────────────────────────────
const ISLAND_SECTIONS = [
  {
    id: 'inner',
    label: 'Innerskärgården',
    color: 'var(--sea)',
    bg: 'rgba(30,92,130,0.07)',
    description: 'De närmaste öarna — lätta att nå, perfekta för en dag.',
    slugs: ['fjaderholmarna', 'vaxholm', 'grinda', 'finnhamn', 'rindo', 'resaro'],
  },
  {
    id: 'mellersta',
    label: 'Mellersta skärgården',
    color: 'var(--sea)',
    bg: 'rgba(10,123,140,0.07)',
    description: 'Det klassiska skärgårdslivet — Sandhamn, Möja och öarna däremellan.',
    slugs: [
      'sandhamn', 'moja', 'ljustero', 'gallno', 'ingmarso', 'namdo', 'svartso',
      'runmaro', 'husaro', 'kymmendo', 'bullero', 'vindo', 'ingaro', 'kanholmen',
      'svenska-hogarna', 'huvudskar', 'ramskar', 'ekno', 'ormsko', 'norrpada',
      'lindholmen', 'garnsjon', 'storholmen', 'ostanvik', 'korsholmen', 'storskar',
      'bjorko', 'adelsjo',
    ],
  },
  {
    id: 'södra',
    label: 'Södra skärgården',
    color: '#2a6e50',
    bg: 'rgba(42,110,80,0.07)',
    description: 'Vilda klippor, öppet hav och Utö — den dramatiska södra skärgården.',
    slugs: [
      'uto', 'dalaro', 'orno', 'landsort', 'nattaro', 'asko', 'galo', 'toro',
      'fjardlang', 'smaadalaro', 'morko', 'musko', 'hasselo', 'langviksskaret',
      'graskar-sodra', 'vastervik-uto', 'aspoja',
    ],
  },
  {
    id: 'norra',
    label: 'Norra skärgården',
    color: '#7a4e2d',
    bg: 'rgba(122,78,45,0.07)',
    description: 'Orörda öar, höga klippor och en av Europas ovanligaste mötesplatser.',
    slugs: [
      'arholma', 'furusund', 'blido', 'norrora', 'fejan', 'rodloga', 'singo',
      'lido', 'graddo', 'vaddo', 'yxlan', 'ljusnas', 'graskar', 'iggon',
      'toro-norra', 'langskar', 'ramskar-norra', 'vastana',
    ],
  },
]

const islandBySlug = Object.fromEntries(ISLANDS.map(i => [i.slug, i]))

export const metadata: Metadata = {
  title: 'Rutter',
  description: 'Utforska kurerade skärgårdsrutter för motorbåt, segelbåt, kajak och mer. Hitta rätt rutt för din tur.',
  openGraph: {
    title: 'Rutter – Svalla',
    description: 'Kurerade skärgårdsrutter med restauranger, tips och svårighetsgrad.',
    url: 'https://svalla.se/rutter',
  },
}

export const revalidate = 300

// ── SVG icon paths (matchar stil från /upptack) ─────────────────────────
const ICON_PATHS: Record<string, string> = {
  users:      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  heart:      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  map:        '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  zap:        '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  kayak:      '<path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M5 14l14-1"/><path d="M12 4v14"/><path d="M9 8l3-3 3 3"/>',
  sailboat:   '<path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/>',
  anchor:     '<circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 15a7 7 0 0 0 14 0"/><line x1="8" y1="11" x2="16" y2="11"/>',
  bike:       '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l2 4-3 6"/><path d="M6 17l3-6 3 6 3-11h-3"/>',
  boot:       '<path d="M4 4h6v11h10v4H4z"/><path d="M10 4v11"/>',
  utensils:   '<path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
}

function Icon({ path, size = 14, stroke = 1.8, style }: { path: string; size?: number; stroke?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }} />
  )
}

const FOR_FILTERS = [
  { value: 'alla',       label: 'Alla',    icon: null },
  { value: 'familj',     label: 'Familj',  icon: 'users' },
  { value: 'par',        label: 'Par',     icon: 'heart' },
  { value: 'turist',     label: 'Turist',  icon: 'map' },
  { value: 'äventyrare', label: 'Äventyr', icon: 'zap' },
  { value: 'kajak',      label: 'Kajak',   icon: 'kayak' },
  { value: 'seglare',    label: 'Segling', icon: 'sailboat' },
  { value: 'båtfolk',    label: 'Båtfolk', icon: 'anchor' },
]

const TIME_FILTERS = [
  { value: 'alla',    label: 'All tid' },
  { value: 'snabb',   label: '2–4h' },
  { value: 'halvdag', label: 'Halvdag' },
  { value: 'heldag',  label: 'Heldag' },
  { value: 'weekend', label: 'Weekend' },
]

function durationMatch(label: string, filter: string): boolean {
  const l = label.toLowerCase()
  if (filter === 'snabb')   return l.includes('2–4') || l.includes('timmar') || l.includes('kvällstur')
  if (filter === 'halvdag') return l.includes('halvdag')
  if (filter === 'heldag')  return l.includes('heldag') && !l.includes('dagar')
  if (filter === 'weekend') return l.includes('dagar') || l.includes('weekend')
  return true
}

function categoryColor(cat: string[]): { bg: string; text: string } {
  if (cat.includes('mat'))      return categoryColorTokens.mat
  if (cat.includes('aktiv'))    return categoryColorTokens.aktiv
  if (cat.includes('premium'))  return categoryColorTokens.premium
  if (cat.includes('klassisk')) return categoryColorTokens.klassisk
  return { bg: 'rgba(10,123,140,0.08)', text: 'var(--sea)' }
}

function primaryCategory(cat: string[]): string {
  if (cat.includes('klassisk'))    return 'Klassisk'
  if (cat.includes('aktiv'))       return 'Aktiv'
  if (cat.includes('mat'))         return 'Mat & upplevelse'
  if (cat.includes('weekend'))     return 'Weekend'
  if (cat.includes('premium'))     return 'Premium'
  if (cat.includes('mindre känd'))  return 'Guldkorn'
  return cat[0] ?? 'Tur'
}

function transportIconKey(types: string[]): keyof typeof ICON_PATHS {
  if (types.includes('kajak'))      return 'kayak'
  if (types.includes('segelbåt'))   return 'sailboat'
  if (types.includes('cykel'))      return 'bike'
  if (types.includes('till fots'))  return 'boot'
  return 'anchor'
}

export default async function RutterPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string; tid?: string; vy?: string }>
}) {
  const { for: forFilter = 'alla', tid: tidFilter = 'alla', vy: vyParam } = await searchParams
  const vy: 'rutter' | 'oar' | 'farjor' =
    vyParam === 'oar' ? 'oar'
    : vyParam === 'farjor' ? 'farjor'
    : 'rutter'
  const supabase = createClient()

  const baseQuery = supabase
    .from('tours')
    .select('id, slug, title, start_location, destination, transport_types, duration_label, best_for, highlights, usp, category, food_stops, tone_tags, hamn_profil, bad_profil')
    .order('title', { ascending: true })
    .limit(200)

  const [{ data: tours, error }, { count: totalCount }] = await Promise.all([
    forFilter !== 'alla' ? baseQuery.contains('best_for', [forFilter]) : baseQuery,
    supabase.from('tours').select('*', { count: 'exact', head: true }),
  ])
  if (error) {
    return (
      <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 24px', background: 'var(--bg)' }}>
        <svg viewBox="0 0 24 24" width={52} height={52} fill="none" stroke="var(--sea)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/>
        </svg>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>Kunde inte ladda turer</h1>
        <p style={{ fontSize: 14, color: 'var(--txt3)', textAlign: 'center', margin: 0 }}>Kontrollera din anslutning och försök igen.</p>
        <a href="/rutter" style={{ padding: '11px 24px', borderRadius: 14, background: 'var(--sea)', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
          Försök igen
        </a>
      </div>
    )
  }

  const filtered = ((tours ?? []) as Tour[]).filter((t) =>
    tidFilter === 'alla' ? true : durationMatch(t.duration_label, tidFilter)
  )

  const isFiltered = forFilter !== 'alla' || tidFilter !== 'alla'

  function href(f: string, t: string) {
    const p = new URLSearchParams()
    if (f !== 'alla') p.set('for', f)
    if (t !== 'alla') p.set('tid', t)
    const s = p.toString()
    return s ? `/rutter?${s}` : '/rutter'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        padding: '14px 16px 10px',
        background: 'var(--glass-96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        boxShadow: '0 2px 12px rgba(0,45,60,0.05)',
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>Turer</h1>
          <p style={{ fontSize: 11, color: 'var(--txt3)', margin: '2px 0 0', fontWeight: 500 }}>
            {vy === 'oar'
              ? `${ISLANDS.length} öar · Stockholms skärgård`
              : vy === 'farjor'
                ? `${SEED_FERRY_ROUTES.length} linjer · Waxholmsbolaget & Cinderella`
              : isFiltered
                ? `Visar ${filtered.length} av ${totalCount ?? '?'} turer`
                : `${filtered.length} turer · Sverige`}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageBell />
          <NotificationBell />
          <Link href="/guide" style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '8px 14px', borderRadius: 20,
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            color: '#fff', fontSize: 12, fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(30,92,130,0.3)',
          }}>
            Guide
          </Link>
        </div>
      </header>

      {/* Vy-toggle: Rutter / Öar */}
      <div
        role="tablist"
        aria-label="Vy"
        style={{
          display: 'flex',
          gap: 0,
          padding: '0 16px',
          background: 'var(--glass-96)',
          borderBottom: '1px solid rgba(10,123,140,0.10)',
        }}
      >
        {([
          { key: 'rutter' as const, label: 'Rutter', href: '/rutter' },
          { key: 'oar' as const,    label: 'Öar',    href: '/rutter?vy=oar' },
          { key: 'farjor' as const, label: 'Färjor', href: '/rutter?vy=farjor' },
        ]).map(t => {
          const active = vy === t.key
          return (
            <Link
              key={t.key}
              href={t.href}
              role="tab"
              aria-selected={active}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '12px 0 10px',
                fontSize: 14,
                fontWeight: active ? 700 : 600,
                color: active ? 'var(--sea)' : 'var(--txt3)',
                textDecoration: 'none',
                borderBottom: active ? '2.5px solid var(--sea)' : '2.5px solid transparent',
                transition: 'color 160ms ease, border-color 160ms ease',
                marginBottom: -1,
              }}
            >
              {t.label}
            </Link>
          )
        })}
      </div>

      {vy === 'oar' ? (
        <IslandsView />
      ) : vy === 'farjor' ? (
        <FerriesView />
      ) : (
        <>

      {/* For-filter */}
      <div style={{
        padding: '10px 14px 6px',
        display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none',
        background: 'var(--glass-85)',
        borderBottom: '1px solid rgba(10,123,140,0.06)',
      }}>
        {FOR_FILTERS.map((f) => {
          const active = forFilter === f.value
          return (
            <Link key={f.value} href={href(f.value, tidFilter)} style={{
              flexShrink: 0, padding: '7px 13px', borderRadius: 20,
              border: `1.5px solid ${active ? 'var(--sea)' : 'rgba(10,123,140,0.2)'}`,
              background: active ? 'var(--sea)' : 'var(--white)',
              fontSize: 12, fontWeight: 600,
              color: active ? '#fff' : '#3a6a80',
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: active ? '0 2px 8px rgba(30,92,130,0.3)' : 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {f.icon && <Icon path={ICON_PATHS[f.icon]} size={13} stroke={1.9} />}
              {f.label}
            </Link>
          )
        })}
      </div>

      {/* Time-filter */}
      <div style={{
        padding: '6px 14px 8px',
        display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none',
        background: 'var(--glass-70)',
        borderBottom: '1px solid rgba(10,123,140,0.04)',
      }}>
        {TIME_FILTERS.map((f) => {
          const active = tidFilter === f.value
          return (
            <Link key={f.value} href={href(forFilter, f.value)} style={{
              flexShrink: 0, padding: '5px 11px', borderRadius: 16,
              border: `1px solid ${active ? '#c96e2a' : 'rgba(10,123,140,0.15)'}`,
              background: active ? '#c96e2a' : 'transparent',
              fontSize: 11, fontWeight: 600,
              color: active ? '#fff' : 'var(--txt2)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              {f.label}
            </Link>
          )
        })}
      </div>

      {/* Tour list */}
      <div style={{ padding: '10px 12px 100px', maxWidth: 640, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <RutterEmptyState />
        ) : (
          filtered.map((t) => (
            <TourCard key={t.id} tour={t}
              categoryColor={categoryColor(t.category)}
              categoryLabel={primaryCategory(t.category)}
              iconKey={transportIconKey(t.transport_types)}
            />
          ))
        )}
      </div>
        </>
      )}
    </div>
  )
}

async function FerriesView() {
  const routesWithDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async (r: FerryRoute) => ({
      route: r,
      deps: await fetchDepartures(r, 3) as FerryDeparture[],
    })),
  )
  const anyLive = routesWithDeps.some(r => r.deps.some(d => d.source === 'live'))

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 16px 100px' }}>
      {anyLive ? (
        <div style={{
          background: 'rgba(30,92,130,0.08)',
          border: '1px solid rgba(30,92,130,0.22)',
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 12.5,
          color: 'var(--txt2)',
          lineHeight: 1.5,
          marginBottom: 14,
        }}>
          <strong style={{ color: 'var(--txt)' }}>Live.</strong> Avgångar hämtas från Trafiklab. Dubbelkolla alltid mot operatören inför avgång.
        </div>
      ) : (
        <div style={{
          background: 'rgba(201,110,42,0.08)',
          border: '1px solid rgba(201,110,42,0.25)',
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 12.5,
          color: 'var(--txt2)',
          lineHeight: 1.5,
          marginBottom: 14,
        }}>
          <strong style={{ color: 'var(--txt)' }}>Förhandsvisning.</strong> Live-tidtabell är under konfiguration — följ länken till operatören för aktuella tider.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {routesWithDeps.map(({ route: r, deps }) => {
          const isLive = deps.some(d => d.source === 'live')
          const opColor = r.operator === 'Waxholmsbolaget' ? '#1e5c82' : r.operator === 'Cinderella' ? '#c96e2a' : '#2e7d32'
          const opBg = r.operator === 'Waxholmsbolaget' ? 'rgba(30,92,130,0.08)' : r.operator === 'Cinderella' ? 'rgba(201,110,42,0.1)' : 'rgba(46,125,50,0.08)'
          return (
            <article key={r.id} style={{
              background: 'var(--white)', borderRadius: 14,
              padding: '16px 18px',
              border: '1.5px solid rgba(10,123,140,0.10)',
              boxShadow: '0 1px 4px rgba(0,45,60,0.06)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: opColor, background: opBg,
                  padding: '3px 9px', borderRadius: 20,
                  textTransform: 'uppercase', letterSpacing: 0.4,
                }}>{r.operator}</span>
                <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{r.season}</span>
                {isLive && (
                  <span style={{
                    marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: '#fff',
                    background: '#2e7d32', padding: '2px 8px', borderRadius: 20,
                    letterSpacing: 0.3, display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                    LIVE
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>{r.name}</h2>
              <p style={{ fontSize: 12, color: 'var(--txt2)', margin: '0 0 12px', lineHeight: 1.5 }}>
                {r.stops.join(' → ')}
              </p>
              <div style={{ borderTop: '1px solid rgba(10,123,140,0.10)', paddingTop: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  Kommande avgångar
                </div>
                {deps.map((d, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: i === deps.length - 1 ? 'none' : '1px solid rgba(10,123,140,0.08)',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>
                      {new Date(d.time).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--txt2)' }}>
                      {d.from} → {d.to}
                    </div>
                  </div>
                ))}
              </div>
              <a href={r.infoUrl} target="_blank" rel="noopener noreferrer" style={{
                marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: 36, borderRadius: 10,
                background: 'var(--sea)', color: '#fff',
                fontSize: 12, fontWeight: 600, textDecoration: 'none',
              }}>
                Öppna tidtabell hos {r.operator} →
              </a>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function IslandsView() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '12px 16px 100px' }}>
      {ISLAND_SECTIONS.map(section => {
        const islands = section.slugs.map(s => islandBySlug[s]).filter(Boolean)
        if (!islands.length) return null
        return (
          <section key={section.id} style={{ paddingTop: 20 }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 12, marginBottom: 14,
              paddingBottom: 10,
              borderBottom: `1.5px solid ${section.color}22`,
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: section.color, margin: 0 }}>
                    {section.label}
                  </h2>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10,
                    background: section.bg, color: section.color,
                  }}>
                    {islands.length} öar
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--txt2)', margin: 0, lineHeight: 1.4 }}>
                  {section.description}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 10,
            }}>
              {islands.map(island => (
                <Link key={island.slug} href={`/o/${island.slug}`}
                  className="rutter-island-card"
                  style={{
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    background: 'var(--white)',
                    borderRadius: 14,
                    border: '1px solid rgba(10,123,140,0.08)',
                    boxShadow: '0 1px 3px rgba(0,45,60,0.05)',
                  }}>
                  <div style={{
                    flexShrink: 0, width: 40, height: 40,
                    background: section.bg, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: section.color,
                  }}>
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="none"
                      stroke="currentColor" strokeWidth={1.8}
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--txt)',
                      marginBottom: 2, whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {island.name}
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--txt2)', lineHeight: 1.35,
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {island.tagline}
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none"
                    stroke="var(--txt3)" strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    style={{ flexShrink: 0 }}>
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function TourCard({ tour: t, categoryColor: cc, categoryLabel, iconKey }: {
  tour: Tour
  categoryColor: { bg: string; text: string }
  categoryLabel: string
  iconKey: keyof typeof ICON_PATHS
}) {
  const foodStops = Array.isArray(t.food_stops) ? t.food_stops : []
  return (
    <Link href={`/rutter/${t.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
      <article style={{
        background: 'var(--white)', borderRadius: 16,
        border: '1.5px solid rgba(10,123,140,0.10)',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,45,60,0.06)',
      }}>
        <div style={{ padding: '13px 14px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 10, fontWeight: 600,
              padding: '3px 8px', borderRadius: 20,
              background: cc.bg, color: cc.text,
              textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 5,
            }}>
              <Icon path={ICON_PATHS[iconKey]} size={11} stroke={2} />
              {categoryLabel}
            </span>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 2px', letterSpacing: '-0.2px' }}>
              {t.title}
            </h2>
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 8 }}>{t.usp}</div>
          </div>
          <div style={{
            flexShrink: 0, fontSize: 10, fontWeight: 700,
            padding: '4px 9px', borderRadius: 12,
            background: 'rgba(10,123,140,0.07)', color: 'var(--sea)',
            textAlign: 'center', lineHeight: 1.3, maxWidth: 72,
          }}>
            {t.duration_label}
          </div>
        </div>

        {t.highlights.length > 0 && (
          <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {t.highlights.slice(0, 3).map((h) => (
              <span key={h} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 12, background: 'var(--glass-88)', color: 'var(--txt2)' }}>
                {h}
              </span>
            ))}
          </div>
        )}

        <div style={{
          padding: '9px 14px 11px',
          borderTop: '1px solid rgba(10,123,140,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 11, color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {foodStops[0] && <>
              <Icon path={ICON_PATHS.utensils} size={12} stroke={1.9} style={{ color: 'var(--txt3)' }} />
              <span style={{ fontWeight: 600 }}>{foodStops[0].namn}</span>
            </>}
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {t.best_for.slice(0, 3).map((b) => (
              <span key={b} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 10, background: 'rgba(30,92,130,0.07)', color: '#2a6a8a' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

function RutterEmptyState() {
  return (
    <EmptyState
      icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
      title="Inga turer matchar"
      body="Prova ett annat filter."
      cta={{ label: 'Visa alla turer', href: '/rutter' }}
      marginTop={0}
    />
  )
}
