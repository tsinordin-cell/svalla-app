'use client'
/**
 * Vyväxling och filter på /rutter.
 *
 * Varför klientkomponent (rester efter revisionen, 2026-10-07): ?vy=, ?for=
 * och ?tid= styr bara vad som SYNS, inte vilken resurs som visas. Så länge
 * servern läste dem renderades sidan om vid varje besök (uppmätt: MISS,
 * private/no-store, 0,5–2 s TTFB). Nu hämtar servern alla turer en gång och
 * renderar Öar- och Färjor-vyerna som slots; den här komponenten väljer vy
 * och filtrerar turerna. Samma mönster som ProfileTabs.tsx (CLAUDE.md p27):
 * utgångsläget ('rutter', inga filter) är detsamma på server och klient, så
 * HTML:en innehåller turlistan direkt; URL:en läses en gång efter montering
 * och hålls sedan i synk med history.replaceState så att /rutter?vy=oar och
 * /rutter?for=familj fortfarande fungerar som delbara länkar.
 *
 * Flikarna och filterknapparna är vanliga länkar med samma adresser som
 * förut (fungerar utan JavaScript och i ny flik); med JavaScript byter de vy
 * utan omladdning.
 */
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import Link from 'next/link'
import type { Tour } from '@/lib/supabase'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import EmptyState from '@/components/EmptyState'
import { categoryColor as categoryColorTokens } from '@/lib/tokens'

type Vy = 'rutter' | 'oar' | 'farjor'

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
  { value: 'båtfolk',    label: 'Båtfolk', icon: 'anchor' }]

const TIME_FILTERS = [
  { value: 'alla',    label: 'All tid' },
  { value: 'snabb',   label: '2–4h' },
  { value: 'halvdag', label: 'Halvdag' },
  { value: 'heldag',  label: 'Heldag' },
  { value: 'weekend', label: 'Weekend' }]

const FOR_VALUES = new Set(FOR_FILTERS.map(f => f.value))
const TIME_VALUES = new Set(TIME_FILTERS.map(f => f.value))

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

function href(f: string, t: string) {
  const p = new URLSearchParams()
  if (f !== 'alla') p.set('for', f)
  if (t !== 'alla') p.set('tid', t)
  const s = p.toString()
  return s ? `/rutter?${s}` : '/rutter'
}

function vyHref(vy: Vy) {
  return vy === 'rutter' ? '/rutter' : `/rutter?vy=${vy}`
}

/** Vy och filter ur query-strängen; okända värden faller tillbaka på standard. */
function lasUrl(search: string): { vy: Vy; forFilter: string; tidFilter: string } {
  const sp = new URLSearchParams(search)
  const vyParam = sp.get('vy')
  const forParam = sp.get('for') ?? 'alla'
  const tidParam = sp.get('tid') ?? 'alla'
  return {
    vy: vyParam === 'oar' ? 'oar' : vyParam === 'farjor' ? 'farjor' : 'rutter',
    forFilter: FOR_VALUES.has(forParam) ? forParam : 'alla',
    tidFilter: TIME_VALUES.has(tidParam) ? tidParam : 'alla',
  }
}

/** Vanligt klick (vänster, utan modifierare) → byt vy i stället för att navigera. */
function arVanligtKlick(e: MouseEvent<HTMLAnchorElement>): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

export default function RutterVyer({
  tours,
  antalOar,
  antalFarjelinjer,
  oar,
  farjor,
}: {
  tours: Tour[]
  antalOar: number
  antalFarjelinjer: number
  /** Öar-vyn, renderad på servern (öarnas data ska inte skickas till klienten). */
  oar: ReactNode
  /** Färjor-vyn, renderad på servern vid sidans generering. */
  farjor: ReactNode
}) {
  // Utgångsläget måste vara samma på server och klient (hydrering), därför
  // alltid turlistan utan filter först. URL:en läses efter montering.
  const [vy, setVy] = useState<Vy>('rutter')
  const [forFilter, setFor] = useState('alla')
  const [tidFilter, setTid] = useState('alla')

  useEffect(() => {
    const las = () => {
      const u = lasUrl(window.location.search)
      setVy(u.vy); setFor(u.forFilter); setTid(u.tidFilter)
    }
    las()
    // Bakåt/framåt i webbläsaren och appens egna länkar till /rutter?… medan
    // sidan redan är öppen ändrar URL:en utan att komponenten monteras om.
    window.addEventListener('popstate', las)
    return () => window.removeEventListener('popstate', las)
  }, [])

  function synkaUrl(url: string) {
    window.history.replaceState(null, '', url)
  }

  function bytVy(e: MouseEvent<HTMLAnchorElement>, ny: Vy) {
    if (!arVanligtKlick(e)) return
    e.preventDefault()
    setVy(ny)
    synkaUrl(vyHref(ny))
    window.scrollTo({ top: 0 })
  }

  function bytFilter(e: MouseEvent<HTMLAnchorElement>, f: string, t: string) {
    if (!arVanligtKlick(e)) return
    e.preventDefault()
    setFor(f); setTid(t)
    synkaUrl(href(f, t))
  }

  const filtered = tours.filter(t =>
    (forFilter === 'alla' || (Array.isArray(t.best_for) && t.best_for.includes(forFilter)))
    && (tidFilter === 'alla' || durationMatch(t.duration_label, tidFilter)),
  )
  const isFiltered = forFilter !== 'alla' || tidFilter !== 'alla'

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
              ? `${antalOar} öar · Stockholms skärgård`
              : vy === 'farjor'
                ? `${antalFarjelinjer} linjer · Waxholmsbolaget & Cinderella`
              : isFiltered
                ? `Visar ${filtered.length} av ${tours.length} turer`
                : `${filtered.length} turer · Sverige`}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageBell />
          <NotificationBell />
          <Link href="/guide" prefetch={false} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '8px 14px', borderRadius: 20,
            background: 'var(--grad-sea)',
            color: '#fff', fontSize: 12, fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(30,92,130,0.3)',
          }}>
            Thorkel
          </Link>
        </div>
      </header>

      {/* Vy-toggle: Planera / Rutter / Öar / Färjor */}
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
          { key: 'planera' as const, label: 'Planera' },
          { key: 'rutter' as const,  label: 'Rutter' },
          { key: 'oar' as const,     label: 'Öar' },
          { key: 'farjor' as const,  label: 'Färjor' }]).map(t => {
          const active = vy === t.key
          const style: React.CSSProperties = {
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
          }
          if (t.key === 'planera') {
            return (
              <Link key={t.key} href="/planera" prefetch={false} role="tab" aria-selected={false} style={style}>
                {t.label}
              </Link>
            )
          }
          return (
            <a
              key={t.key}
              href={vyHref(t.key)}
              onClick={(e) => bytVy(e, t.key)}
              role="tab"
              aria-selected={active}
              style={style}
            >
              {t.label}
            </a>
          )
        })}
      </div>

      {vy === 'oar' ? (
        oar
      ) : vy === 'farjor' ? (
        farjor
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
            <a key={f.value} href={href(f.value, tidFilter)} onClick={(e) => bytFilter(e, f.value, tidFilter)}
              aria-current={active ? 'true' : undefined}
              style={{
              flexShrink: 0, padding: '7px 13px', borderRadius: 20,
              border: `1.5px solid ${active ? 'var(--sea-knapp)' : 'rgba(10,123,140,0.2)'}`,
              background: active ? 'var(--sea-knapp)' : 'var(--white)',
              fontSize: 12, fontWeight: 600,
              color: active ? '#fff' : 'var(--txt3)',
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: active ? '0 2px 8px rgba(30,92,130,0.3)' : 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {f.icon && <Icon path={ICON_PATHS[f.icon]!} size={13} stroke={1.9} />}
              {f.label}
            </a>
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
            <a key={f.value} href={href(forFilter, f.value)} onClick={(e) => bytFilter(e, forFilter, f.value)}
              aria-current={active ? 'true' : undefined}
              style={{
              flexShrink: 0, padding: '5px 11px', borderRadius: 16,
              border: `1px solid ${active ? 'var(--acc-knapp)' : 'rgba(10,123,140,0.15)'}`,
              background: active ? 'var(--acc-knapp)' : 'transparent',
              fontSize: 11, fontWeight: 600,
              color: active ? '#fff' : 'var(--txt2)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              {f.label}
            </a>
          )
        })}
      </div>

      {/* Tour list */}
      <div style={{ padding: '10px 12px 100px', maxWidth: 640, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <RutterEmptyState onReset={() => { setFor('alla'); setTid('alla'); synkaUrl('/rutter') }} />
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
              <Icon path={ICON_PATHS[iconKey]!} size={11} stroke={2} />
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
              <Icon path={ICON_PATHS.utensils!} size={12} stroke={1.9} style={{ color: 'var(--txt3)' }} />
              <span style={{ fontWeight: 600 }}>{foodStops[0].namn}</span>
            </>}
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {t.best_for.slice(0, 3).map((b) => (
              <span key={b} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 10, background: 'rgba(10,123,140,0.07)', color: 'var(--sea)' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

function RutterEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <EmptyState
      icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
      title="Inga turer matchar"
      body="Prova ett annat filter."
      cta={{ label: 'Visa alla turer', onClick: onReset }}
      marginTop={0}
    />
  )
}
