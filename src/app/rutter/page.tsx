import { createClient } from '@/lib/supabase'
import type { Tour } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'
import NotificationBell from '@/components/NotificationBell'

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
  if (cat.includes('mat'))      return { bg: '#fff3e6', text: '#b36000' }
  if (cat.includes('aktiv'))    return { bg: '#e6f7ef', text: '#0a7040' }
  if (cat.includes('premium'))  return { bg: '#f0e6ff', text: '#6b21a8' }
  if (cat.includes('klassisk')) return { bg: '#e6f0ff', text: '#1e4da0' }
  return { bg: 'rgba(10,123,140,0.08)', text: '#1e5c82' }
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

  const [{ data: tours, error }, { count: totalCount }] = await Promise.all([
    forFilter !== 'alla' ? baseQuery.contains('best_for', [forFilter]) : baseQuery,
    supabase.from('tours').select('*', { count: 'exact', head: true }),
  ])
  if (error) {
    console.error('[rutter]', error.message)
    return (
      <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 24px', background: 'var(--bg, #f7fbfc)' }}>
        <div style={{ fontSize: 52 }}>⛵</div>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Kunde inte ladda turer</h1>
        <p style={{ fontSize: 14, color: 'var(--txt3, #7a9dab)', textAlign: 'center', margin: 0 }}>Kontrollera din anslutning och försök igen.</p>
        <a href="/rutter" style={{ padding: '11px 24px', borderRadius: 14, background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
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
        background: 'rgba(250,254,255,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        boxShadow: '0 2px 12px rgba(0,45,60,0.05)',
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Turer</h1>
          <p style={{ fontSize: 11, color: 'var(--txt3, #7a9dab)', margin: '2px 0 0', fontWeight: 500 }}>
            {isFiltered
              ? `Visar ${filtered.length} av ${totalCount ?? '?'} turer`
              : `${filtered.length} turer · Stockholms skärgård`}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
        background: 'rgba(250,254,255,0.85)',
        borderBottom: '1px solid rgba(10,123,140,0.06)',
      }}>
        {FOR_FILTERS.map((f) => {
          const active = forFilter === f.value
          return (
            <Link key={f.value} href={href(f.value, tidFilter)} style={{
              flexShrink: 0, padding: '7px 13px', borderRadius: 20,
              border: `1.5px solid ${active ? '#1e5c82' : 'rgba(10,123,140,0.2)'}`,
              background: active ? '#1e5c82' : 'var(--white, #fff)',
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
        background: 'rgba(250,254,255,0.7)',
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
              color: active ? '#fff' : '#5a8090',
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
          <EmptyState />
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
              display: 'inline-block', fontSize: 10, fontWeight: 800,
              padding: '3px 8px', borderRadius: 20,
              background: cc.bg, color: cc.text,
              textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 5,
            }}>
              {icon} {categoryLabel}
            </span>
            <h2 style={{ fontSize: 15, fontWeight: 900, color: 'var(--txt, #162d3a)', margin: '0 0 2px', letterSpacing: '-0.2px' }}>
              {t.title}
            </h2>
            <div style={{ fontSize: 12, color: 'var(--txt3, #5a8090)', marginBottom: 8 }}>{t.usp}</div>
          </div>
          <div style={{
            flexShrink: 0, fontSize: 10, fontWeight: 700,
            padding: '4px 9px', borderRadius: 12,
            background: 'rgba(10,123,140,0.07)', color: '#1e5c82',
            textAlign: 'center', lineHeight: 1.3, maxWidth: 72,
          }}>
            {t.duration_label}
          </div>
        </div>

        {t.highlights.length > 0 && (
          <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {t.highlights.slice(0, 3).map((h) => (
              <span key={h} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 12, background: '#f0f7fa', color: '#3a6070' }}>
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
          <div style={{ fontSize: 11, color: 'var(--txt3, #5a8090)', display: 'flex', alignItems: 'center', gap: 4 }}>
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

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 52, marginBottom: 14 }}>⛵</div>
      <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e5c82', marginBottom: 8 }}>Inga turer matchar</h2>
      <p style={{ fontSize: 13, color: 'var(--txt3, #7a9dab)', marginBottom: 20 }}>Prova ett annat filter.</p>
      <Link href="/rutter" style={{
        display: 'inline-block', padding: '11px 24px', borderRadius: 14,
        background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none',
      }}>
        Visa alla turer
      </Link>
    </div>
  )
}
