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
import AppTopBar from '@/components/AppTopBar'
import EmptyState from '@/components/EmptyState'
import { categoryColor as categoryColorTokens } from '@/lib/tokens'
import type { TurBild } from './page'

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
  { value: 'snabb',   label: '2 till 4h' },
  { value: 'halvdag', label: 'Halvdag' },
  { value: 'heldag',  label: 'Heldag' },
  { value: 'weekend', label: 'Weekend' }]

const FOR_VALUES = new Set(FOR_FILTERS.map(f => f.value))
const TIME_VALUES = new Set(TIME_FILTERS.map(f => f.value))

function durationMatch(label: string, filter: string): boolean {
  const l = label.toLowerCase()
  if (filter === 'snabb')   return l.includes('2 till 4') || l.includes('timmar') || l.includes('kvällstur')
  if (filter === 'halvdag') return l.includes('halvdag')
  if (filter === 'heldag')  return l.includes('heldag') && !l.includes('dagar')
  if (filter === 'weekend') return l.includes('dagar') || l.includes('weekend')
  return true
}

// 2026-11-24 (fixlistan nr 11): etikett och färg kommer nu ur samma
// kategori. Förut valdes färgen i ordningen mat, aktiv, premium, klassisk men
// texten i ordningen klassisk, aktiv, mat, så två "Klassisk" fick olika färg
// (grön för klassisk+aktiv, blå för klassisk). Ikonen visade färdsättet och
// varierade också; färdsättet står nu i klartext på kortet i stället.
const NEUTRAL_FARG = { bg: 'rgba(10,123,140,0.08)', text: 'var(--sea)' }
const KATEGORIER: { varde: string; etikett: string; farg: { bg: string; text: string } }[] = [
  { varde: 'klassisk',    etikett: 'Klassisk',         farg: categoryColorTokens.klassisk },
  { varde: 'aktiv',       etikett: 'Aktiv',            farg: categoryColorTokens.aktiv },
  { varde: 'mat',         etikett: 'Mat & upplevelse', farg: categoryColorTokens.mat },
  { varde: 'weekend',     etikett: 'Weekend',          farg: NEUTRAL_FARG },
  { varde: 'premium',     etikett: 'Premium',          farg: categoryColorTokens.premium },
  { varde: 'mindre känd', etikett: 'Guldkorn',         farg: NEUTRAL_FARG },
]

function huvudkategori(cat: string[]): { etikett: string; farg: { bg: string; text: string } } {
  const k = KATEGORIER.find(k => cat.includes(k.varde))
  if (k) return { etikett: k.etikett, farg: k.farg }
  const forsta = cat[0]
  return { etikett: forsta ? forsta.charAt(0).toUpperCase() + forsta.slice(1) : 'Tur', farg: NEUTRAL_FARG }
}

function transportIconKey(types: string[]): keyof typeof ICON_PATHS {
  if (types.includes('kajak'))      return 'kayak'
  if (types.includes('segelbåt'))   return 'sailboat'
  if (types.includes('cykel'))      return 'bike'
  if (types.includes('till fots'))  return 'boot'
  return 'anchor'
}

/** Färdsätt i klartext: "Motorbåt, segelbåt, RIB". */
function fardsatt(types: string[]): string {
  const s = types.join(', ')
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

// Taggarna "passar för" visades som databasens råa värden (par, seglare,
// äventyrare). Samma ord som filterknapparna ovanför kortet.
const FOR_ETIKETT: Record<string, string> = Object.fromEntries(
  FOR_FILTERS.filter(f => f.value !== 'alla').map(f => [f.value, f.label]),
)
function forEtikett(v: string): string {
  return FOR_ETIKETT[v] ?? (v.charAt(0).toUpperCase() + v.slice(1))
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
  oar,
  farjor,
  bilder,
  bildkallor,
}: {
  tours: Tour[]
  /** Foto av turens mål (Commons), per tur-id. Saknas för turer utan ö-mål. */
  bilder: Record<string, TurBild>
  /** Fotograf och licens för bilderna, renderad på servern. */
  bildkallor: ReactNode
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
      {/* 2026-11-25 (Tom): samma topprad som Planera (loggan, sök, meddelanden,
          notiser). Före: egen rad med sidnamn, antal och Thorkel-knapp. Thorkel
          nås från Planera-fliken och menyn. Sidnamnet är kvar som h1 för
          skärmläsare och sökmotorer; antalet vid filtrering står ovanför listan. */}
      <AppTopBar doljPaDesktop />
      <h1 className="sr-only">{vy === 'oar' ? 'Öar' : vy === 'farjor' ? 'Färjor' : 'Rutter'}</h1>

      {/* Vy-toggle: Planera / Rutter / Öar / Färjor.
          Granskningen 2026-11-22: raden var märkt som flikar (tablist) men
          gick inte att styra med piltangenter, och Planera är en länk till en
          annan sida. Varje val har en egen adress, så det är länkar: en nav
          med aria-current på den aktiva, som Tab och skärmläsare förstår. */}
      <nav
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
              <Link key={t.key} href="/planera" prefetch={false} style={style}>
                {t.label}
              </Link>
            )
          }
          return (
            <a
              key={t.key}
              href={vyHref(t.key)}
              onClick={(e) => bytVy(e, t.key)}
              aria-current={active ? 'page' : undefined}
              style={style}
            >
              {t.label}
            </a>
          )
        })}
      </nav>

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
        {isFiltered && filtered.length > 0 && (
          <p role="status" style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 4px 8px', fontWeight: 500 }}>
            Visar {filtered.length} av {tours.length} turer
          </p>
        )}
        {filtered.length === 0 ? (
          <RutterEmptyState onReset={() => { setFor('alla'); setTid('alla'); synkaUrl('/rutter') }} />
        ) : (
          filtered.map((t) => (
            <TourCard key={t.id} tour={t}
              kategori={huvudkategori(t.category)}
              iconKey={transportIconKey(t.transport_types)}
              bild={bilder[t.id]}
            />
          ))
        )}
        {filtered.length > 0 && bildkallor}
      </div>
        </>
      )}
    </div>
  )
}

function TourCard({ tour: t, kategori, iconKey, bild }: {
  tour: Tour
  kategori: { etikett: string; farg: { bg: string; text: string } }
  iconKey: keyof typeof ICON_PATHS
  bild?: TurBild
}) {
  const foodStops = Array.isArray(t.food_stops) ? t.food_stops : []
  const cc = kategori.farg
  const transport = fardsatt(t.transport_types)
  return (
    <Link href={`/rutter/${t.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
      <article style={{
        background: 'var(--white)', borderRadius: 16,
        border: '1.5px solid rgba(10,123,140,0.10)',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,45,60,0.07)',
      }}>
        {bild && (
          <div style={{ position: 'relative', aspectRatio: '16 / 7', maxWidth: '100%', background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bild.url}
              srcSet={`${bild.url} 500w, ${bild.url2x} 960w`}
              sizes="(max-width: 640px) 100vw, 616px"
              alt={bild.ort}
              loading="lazy"
              decoding="async"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <span style={{
              position: 'absolute', right: 6, bottom: 6,
              fontSize: 10, lineHeight: 1.3, padding: '2px 7px', borderRadius: 8,
              background: 'rgba(0,0,0,0.55)', color: '#fff',
              maxWidth: 'calc(100% - 12px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {bild.ort} · Foto: {bild.fotograf}, {bild.licens}
            </span>
          </div>
        )}

        <div style={{ padding: '12px 14px 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              fontSize: 10, fontWeight: 700,
              padding: '3px 8px', borderRadius: 20,
              background: cc.bg, color: cc.text,
              textTransform: 'uppercase', letterSpacing: '0.4px',
            }}>
              {kategori.etikett}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, fontWeight: 700,
              padding: '3px 9px', borderRadius: 20,
              background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
              whiteSpace: 'nowrap',
            }}>
              <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              {t.duration_label}
            </span>
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 2px', letterSpacing: '-0.2px' }}>
            {t.title}
          </h2>
          <div style={{ fontSize: 12.5, color: 'var(--txt2)', marginBottom: 6 }}>{t.usp}</div>
          {transport && (
            <div style={{ fontSize: 11.5, color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <Icon path={ICON_PATHS[iconKey]!} size={13} stroke={1.9} />
              {transport}
            </div>
          )}
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
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: 11, color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            {foodStops[0] && <>
              <Icon path={ICON_PATHS.utensils!} size={12} stroke={1.9} style={{ color: 'var(--txt3)' }} />
              <span style={{ fontWeight: 600 }}>{foodStops[0].namn}</span>
            </>}
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {t.best_for.slice(0, 3).map((b) => (
              <span key={b} style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 7px', borderRadius: 10, background: 'rgba(10,123,140,0.07)', color: 'var(--sea)' }}>
                {forEtikett(b)}
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
