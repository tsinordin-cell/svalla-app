import { createClient } from '@/lib/supabase'
import type { Tour } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import EmptyState from '@/components/EmptyState'
import { categoryColor as categoryColorTokens } from '@/lib/tokens'

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

const FOR_FILTERS = [
  { value: 'alla',        label: 'Alla' },
  { value: 'familj',     label: '👨‍👩‍👧 Familj' },
  { value: 'par',        label: '💛 Par' },
  { value: 'turist',     label: '🗺 Turist' },
  { value: 'äventyrare', label: '⚡ Äventyr' },
  { value: 'kajak',      label: '🛶 Kajak' },
  { value: 'seglare',    label: '⛵ Segling' },
  { value: 'båtfolk',    label: '⚓ Båtfolk' },
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

function transportIcon(types: string[]): string {
  if (types.includes('kajak'))      return '🛶'
  if (types.includes('segelbåt'))   return '⛵'
  if (types.includes('cykel'))      return '🚴'
  if (types.includes('till fots'))  return '🥾'
  return '⚓'
}

export default async function RutterPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string; tid?: string }>
}) {
  const { for: forFilter = 'alla', tid: tidFilter = 'alla' } = await searchParams
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
      <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 24px', background: 'var(--bg, #f7fbfc)' }}>
        <div style={{ fontSize: 52 }}>⛵</div>
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
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f7fbfc)' }}>
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
            {isFiltered
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
            🧭 Guide
          </Link>
        </div>
      </header>

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
              background: active ? 'var(--sea)' : 'var(--white, #fff)',
              fontSize: 12, fontWeight: 600,
              color: active ? '#fff' : '#3a6a80',
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: active ? '0 2px 8px rgba(30,92,130,0.3)' : 'none',
            }}>
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
              icon={transportIcon(t.transport_types)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function TourCard({ tour: t, categoryColor: cc, categoryLabel, icon }: {
  tour: Tour
  categoryColor: { bg: string; text: string }
  categoryLabel: string
  icon: string
}) {
  const foodStops = Array.isArray(t.food_stops) ? t.food_stops : []
  return (
    <Link href={`/rutter/${t.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
      <article style={{
        background: 'var(--white, #fff)', borderRadius: 16,
        border: '1.5px solid rgba(10,123,140,0.10)',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,45,60,0.06)',
      }}>
        <div style={{ padding: '13px 14px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-block', fontSize: 10, fontWeight: 600,
              padding: '3px 8px', borderRadius: 20,
              background: cc.bg, color: cc.text,
              textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 5,
            }}>
              {icon} {categoryLabel}
            </span>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt, #162d3a)', margin: '0 0 2px', letterSpacing: '-0.2px' }}>
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
              <span key={h} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 12, background: 'var(--glass-88, #f0f7fa)', color: 'var(--txt2, #3a6070)' }}>
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
            {foodStops[0] && <><span>🍽</span><span style={{ fontWeight: 600 }}>{foodStops[0].namn}</span></>}
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
