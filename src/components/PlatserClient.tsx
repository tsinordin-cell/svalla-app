'use client'
import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { Restaurant } from '@/lib/supabase'
import Icon from '@/components/Icon'

// Lokal type — TourLine bodde ursprungligen i den nu borttagna /platser/page.tsx.
// PlatserClient/PlatserMap är dead code (ingenting importerar dem) men vi
// behåller dem ifall de återanvänds — och då behöver typen finnas.
export type TourLine = {
  id: string
  title: string
  start_location: string
  destination: string
  duration_label: string
  waypoints: { lat: number; lng: number }[]
}

// ── Leaflet karta (lazy-load, SSR off) ──────────────────────────────────────
const PlatserMap = dynamic(() => import('./PlatserMap'), { ssr: false, loading: () => (
 <div style={{ width: '100%', height: '100%', background: 'var(--sea-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <span style={{ fontSize: 13, color: 'var(--txt3)' }}>Laddar karta…</span>
 </div>
)})

// ── Helpers ───────────────────────────────────────────────────────────────
function isStockPhoto(url: string | null | undefined): boolean {
 return !!url && url.includes('unsplash.com')
}

const _DAY: Record<string, number> = { sön: 0, mån: 1, tis: 2, ons: 3, tor: 4, fre: 5, lör: 6 }

function isOpenNow(hours: string | null | undefined): boolean | null {
 if (!hours) return null
 const s = hours.toLowerCase()
 if (/stängt|stängd|closed/.test(s)) return false
 const now = new Date()
 const today = now.getDay()
 const cur = now.getHours() * 60 + now.getMinutes()
 const daily = s.match(/(?:dagligen|alla\s*dagar)[^\d]*(\d{1,2})[.:–-]?(\d{0,2})\s*[-–]\s*(\d{1,2})[.:–-]?(\d{0,2})/)
 if (daily) {
  const o = parseInt(daily[1]!) * 60 + (parseInt(daily[2]!) || 0)
  const c = parseInt(daily[3]!) * 60 + (parseInt(daily[4]!) || 0)
  return cur >= o && cur < c
 }
 for (const seg of s.split(/[,;]/)) {
  const m = seg.trim().match(/([a-zå]{2,3})\s*[-–]\s*([a-zå]{2,3})[^\d]*(\d{1,2})[.:]?(\d{0,2})\s*[-–]\s*(\d{1,2})[.:]?(\d{0,2})/)
  if (m) {
   const d0 = _DAY[m[1]!], d1 = _DAY[m[2]!]
   if (d0 === undefined || d1 === undefined) continue
   const inDay = d0 <= d1 ? (today >= d0 && today <= d1) : (today >= d0 || today <= d1)
   if (!inDay) continue
   const o = parseInt(m[3]!) * 60 + (parseInt(m[4]!) || 0)
   const c = parseInt(m[5]!) * 60 + (parseInt(m[6]!) || 0)
   return cur >= o && cur < c
  }
  const sm = seg.trim().match(/^([a-zå]{2,3})[^\d]*(\d{1,2})[.:]?(\d{0,2})\s*[-–]\s*(\d{1,2})[.:]?(\d{0,2})/)
  if (sm) {
   if (_DAY[sm[1]!] !== today) continue
   const o = parseInt(sm[2]!) * 60 + (parseInt(sm[3]!) || 0)
   const c = parseInt(sm[4]!) * 60 + (parseInt(sm[5]!) || 0)
   return cur >= o && cur < c
  }
 }
 return null
}

function haversineNM(lat1: number, lng1: number, lat2: number, lng2: number): number {
 const R = 3440.065
 const dLat = (lat2 - lat1) * Math.PI / 180
 const dLng = (lng2 - lng1) * Math.PI / 180
 const a = Math.sin(dLat / 2) ** 2
  + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
 return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ── Kategorier ────────────────────────────────────────────────────────────
const FILTERS = [
 { value: 'alla', label: 'Alla' },
 { value: 'restaurang', label: 'Restaurang' },
 { value: 'kafe', label: '☕ Kafé' },
 { value: 'hamn', label: 'Hamn' },
 { value: 'bensin', label: '⛽ Bränsle' },
 { value: 'bokningsbar', label: '📅 Boka' },
]

function getCat(r: Restaurant): string {
 const t = (r.type ?? '').toLowerCase()
 if (t === 'cafe') return 'kafe'
 if (t === 'bar' || t === 'restaurant') return 'restaurang'
 if (t === 'fuel') return 'bensin'
 if (t === 'accommodation') return 'boende'
 const d = (r.description ?? '').toLowerCase() + (r.name ?? '').toLowerCase()
 if (d.includes('kafé') || d.includes('café') || d.includes('fika') || d.includes('bak')) return 'kafe'
 if (d.includes('bensin') || d.includes('diesel') || d.includes('bränsle')) return 'bensin'
 if (d.includes('hamn') || d.includes('brygga') || d.includes('gästhamn')) return 'hamn'
 return 'restaurang'
}

function catEmoji(cat: string): string {
 if (cat === 'kafe') return '☕'
 if (cat === 'bensin') return '⛽'
 if (cat === 'hamn') return '⚓'
 return '🍽'
}

function catBg(cat: string): string {
 if (cat === 'kafe') return 'linear-gradient(135deg,#7c4d1e,#a06b30)'
 if (cat === 'bensin') return 'linear-gradient(135deg,#1a4a1a,#2d7a2d)'
 if (cat === 'hamn') return 'var(--grad-acc)'
 return 'var(--grad-sea)'
}

const TRENDING = ['Sandhamn', 'Möja', 'Grinda', 'Utö', 'Vaxholm', 'Arholma']

// ── Main inner component ───────────────────────────────────────────────────
function PlatserInner({ restaurants, tours }: { restaurants: Restaurant[]; tours: TourLine[] }) {
 const searchParams = useSearchParams()
 const [query, setQuery] = useState(searchParams.get('q') ?? '')
 const [filter, setFilter] = useState('alla')
 // Deep link: ?id=xxx öppnar direkt den platsen
 const [activeId, setActiveId] = useState<string | null>(searchParams.get('id'))
 const [sidebarOpen, setSidebarOpen] = useState(true)
 const [isDesktop, setIsDesktop] = useState(false)
 const [openNowOnly, setOpenNowOnly] = useState(false)
 const [sortBy, setSortBy] = useState<'island' | 'nearest' | 'name'>('island')
 const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
 const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

 // Detect desktop
 useEffect(() => {
 function check() { setIsDesktop(window.innerWidth >= 768) }
 check()
 window.addEventListener('resize', check)
 return () => window.removeEventListener('resize', check)
 }, [])

 // Geolocation for nearest sort
 useEffect(() => {
 if (!('geolocation' in navigator)) return
 navigator.geolocation.getCurrentPosition(
  pos => {
   setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
   setSortBy('nearest')
  },
  () => {},
  { timeout: 5000 }
 )
 }, [])

 const filtered = useMemo(() => {
 const q = query.toLowerCase().trim()
 return restaurants.filter(r => {
  const matchF = filter === 'alla'
   || (filter === 'bokningsbar' ? !!r.booking_url : getCat(r) === filter)
  const matchQ = !q || r.name.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q) || (r.island ?? '').toLowerCase().includes(q)
  const matchOpen = !openNowOnly || isOpenNow(r.opening_hours) === true
  return matchF && matchQ && matchOpen
 })
 }, [restaurants, query, filter, openNowOnly])

 const sorted = useMemo(() => {
 if (sortBy === 'nearest' && userPos) {
  return [...filtered].sort((a, b) => {
   const ra = a as Restaurant & { latitude?: number; longitude?: number }
   const rb = b as Restaurant & { latitude?: number; longitude?: number }
   const da = (ra.latitude != null && ra.longitude != null) ? haversineNM(userPos.lat, userPos.lng, ra.latitude, ra.longitude) : Infinity
   const db = (rb.latitude != null && rb.longitude != null) ? haversineNM(userPos.lat, userPos.lng, rb.latitude, rb.longitude) : Infinity
   return da - db
  })
 }
 if (sortBy === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'sv'))
 return [...filtered].sort((a, b) => (a.island ?? '').localeCompare(b.island ?? '', 'sv'))
 }, [filtered, sortBy, userPos])

 const featured = restaurants[0] ?? null

 function handleMarkerClick(id: string) {
 setActiveId(id)
 const el = cardRefs.current[id]
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
 }

 // ── Desktop layout ──────────────────────────────────────────────────────
 if (isDesktop) {
 return (
  <div style={{ display: 'flex', height: 'calc(100dvh - 56px)', overflow: 'hidden', position: 'relative' }}>

   {/* MAP AREA */}
   <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
   <PlatserMap
    restaurants={filtered}
    tours={tours}
    activeId={activeId}
    onMarkerClick={handleMarkerClick}
   />

   {/* Legenda */}
   <div style={{
    position: 'absolute', bottom: 12, left: 12, zIndex: 500,
    background: 'var(--glass-92)', backdropFilter: 'blur(8px)',
    borderRadius: 12, padding: '5px 10px',
    display: 'flex', gap: 10, alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,45,60,0.12)',
    fontSize: 10, fontWeight: 700,
   }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sea)', display: 'inline-block' }} /> Restaurang
    </span>
    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--acc)', display: 'inline-block' }} /> Hamn/Kafé
    </span>
    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    <span style={{ width: 20, height: 3, background: 'var(--green)', display: 'inline-block', borderRadius: 2 }} /> Rutt
    </span>
   </div>

   {/* Sidebar-toggle (på kartkanten) */}
   <button
    onClick={() => setSidebarOpen(o => !o)}
    style={{
    position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
    zIndex: 600, width: 24, height: 56,
    background: 'var(--glass-96)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(10,123,140,0.15)',
    borderRight: 'none', borderRadius: '10px 0 0 10px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '-2px 0 10px rgba(0,45,60,0.10)',
    color: 'var(--sea)', fontSize: 12, fontWeight: 700,
    }}
    title={sidebarOpen ? 'Dölj lista' : 'Visa lista'}
   >
    {sidebarOpen ? '›' : '‹'}
   </button>
   </div>

   {/* SIDEBAR */}
   <div style={{
   width: sidebarOpen ? 380 : 0,
   flexShrink: 0,
   overflow: 'hidden',
   transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
   borderLeft: '1px solid rgba(10,123,140,0.10)',
   background: 'var(--bg)',
   display: 'flex', flexDirection: 'column',
   }}>
   <div style={{ width: 380, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    {/* Sidebar header */}
    <div style={{
    padding: '14px 16px 10px',
    background: 'var(--glass-96)',
    borderBottom: '1px solid rgba(10,123,140,0.09)',
    flexShrink: 0,
    }}>
    {/* Sökfält */}
    <div style={{ position: 'relative', marginBottom: 10 }}>
     <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2}
     style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, pointerEvents: 'none' }}>
     <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
     </svg>
     <input
     type="text"
     placeholder="Sök ö, krog eller matstil…"
     value={query}
     onChange={e => setQuery(e.target.value)}
     style={{
      width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
      borderRadius: 12, border: '1.5px solid rgba(10,123,140,0.15)',
      background: 'var(--bg)', fontSize: 16, color: 'var(--txt)', outline: 'none',
      boxSizing: 'border-box',
     }}
     />
    </div>
    {/* Filter-chips */}
    <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
     {FILTERS.map(f => (
     <button key={f.value} onClick={() => setFilter(f.value)} style={{
      flexShrink: 0, padding: '5px 12px', borderRadius: 18, border: 'none', cursor: 'pointer',
      fontWeight: 700, fontSize: 11,
      background: filter === f.value ? 'var(--sea)' : '#fff',
      color: filter === f.value ? '#fff' : '#3a6a80',
      boxShadow: filter === f.value ? '0 2px 8px rgba(30,92,130,0.3)' : '0 1px 4px rgba(0,45,60,0.08)',
     }}>
      {f.label}
     </button>
     ))}
     <button onClick={() => setOpenNowOnly(o => !o)} style={{
     flexShrink: 0, padding: '5px 12px', borderRadius: 18, border: 'none', cursor: 'pointer',
     fontWeight: 700, fontSize: 11,
     background: openNowOnly ? '#1a9a50' : 'rgba(26,154,80,0.10)',
     color: openNowOnly ? '#fff' : '#1a9a50',
     boxShadow: openNowOnly ? '0 2px 8px rgba(26,154,80,0.3)' : '0 1px 4px rgba(0,45,60,0.08)',
     display: 'flex', alignItems: 'center', gap: 4,
     }}>
     <span style={{ width: 6, height: 6, borderRadius: '50%', background: openNowOnly ? '#fff' : '#1a9a50', display: 'inline-block' }} />
     Öppet nu
     </button>
    </div>
    </div>

    {/* Scrollbar lista */}
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 24px' }}>

    {/* Veckans favorit */}
    {featured && filter === 'alla' && !query && (
     <Link href={`/upptack/${featured.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
     <div style={{
      borderRadius: 16, overflow: 'hidden',
      background: 'var(--grad-sea)',
      boxShadow: '0 3px 14px rgba(30,92,130,0.25)',
      position: 'relative',
     }}>
      {featured.images?.[0] && !isStockPhoto(featured.images[0]) && (
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: 110, opacity: 0.4 }}>
       <Image src={featured.images[0]} alt={featured.name} fill sizes="(max-width: 640px) 100vw, 400px" style={{ objectFit: 'cover' }} />
      </div>
      )}
      <div style={{
      position: (featured.images?.[0] && !isStockPhoto(featured.images[0])) ? 'absolute' : 'relative',
      inset: 0, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
      <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 3 }}>
       Veckans favorit
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{featured.name}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{featured.opening_hours ?? 'Öppettider varierar'}</div>
      </div>
     </div>
     </Link>
    )}

    {/* Trending */}
    {filter === 'alla' && !query && (
     <div style={{ marginBottom: 12 }}>
     <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
      Trending
     </div>
     <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {TRENDING.map(t => (
      <button key={t} onClick={() => setQuery(t)} style={{
       padding: '5px 11px', borderRadius: 18, border: 'none', cursor: 'pointer',
       background: 'var(--white)', fontSize: 11, fontWeight: 600, color: 'var(--sea)',
       boxShadow: '0 1px 4px rgba(0,45,60,0.10)',
      }}>
       {t}
      </button>
      ))}
     </div>
     </div>
    )}

    {/* Antal + sort */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
     <div style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
     PLATSER I SKÄRGÅRDEN · {sorted.length}
     </div>
     <select value={sortBy} onChange={e => setSortBy(e.target.value as 'island' | 'nearest' | 'name')} style={{
     fontSize: 10, color: 'var(--sea)', background: 'none', border: 'none',
     cursor: 'pointer', fontWeight: 600, outline: 'none', padding: '2px 0',
     }}>
     {userPos && <option value="nearest">Närmast</option>}
     <option value="island">Ö</option>
     <option value="name">A–Ö</option>
     </select>
    </div>

    {/* Restaurangkort */}
    {sorted.length === 0 ? (
     <div style={{ textAlign: 'center', padding: '40px 20px' }}>
     <Icon name="compass" size={40} style={{ color: 'var(--txt3)', marginBottom: 10, display: 'block' }} />
     <p style={{ color: 'var(--txt3)', fontSize: 13 }}>Inga platser matchar sökningen.</p>
     <button onClick={() => { setQuery(''); setFilter('alla'); setOpenNowOnly(false) }} style={{
      marginTop: 10, padding: '8px 18px', borderRadius: 12, border: 'none',
      background: 'var(--sea)', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer',
     }}>Rensa filter</button>
     </div>
    ) : (
     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
     {sorted.map(r => {
      const cat = getCat(r)
      const open = isOpenNow(r.opening_hours)
      const showImg = r.images?.[0] && !isStockPhoto(r.images[0])
      return (
      <div key={r.id} ref={el => { cardRefs.current[r.id] = el }}>
       <Link href={`/upptack/${r.id}`} style={{ textDecoration: 'none' }}>
       <article
        onMouseEnter={() => setActiveId(r.id)}
        onMouseLeave={() => setActiveId(null)}
        style={{
        background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
        boxShadow: activeId === r.id
         ? '0 0 0 2px #1e5c82, 0 4px 16px rgba(30,92,130,0.18)'
         : '0 1px 6px rgba(0,45,60,0.07)',
        border: activeId === r.id ? '1px solid #1e5c82' : '1px solid rgba(10,123,140,0.07)',
        display: 'flex', transition: 'box-shadow 0.15s',
        }}>
        <div style={{ width: 88, flexShrink: 0, background: 'var(--sea-l)', position: 'relative' }}>
         {showImg
         ? <Image src={r.images![0] as string} alt={r.name} fill sizes="88px" style={{ objectFit: 'cover' }} />
         : <div style={{ width: '100%', height: '100%', minHeight: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, background: catBg(cat) }}>
           <span style={{ fontSize: 20 }}>{catEmoji(cat)}</span>
           <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{r.name[0]}</span>
          </div>
         }
        </div>
        <div style={{ flex: 1, padding: '10px 12px', minWidth: 0 }}>
         <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
         <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.2 }}>{r.name}</div>
         <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {open === true && (
          <span style={{
           fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 10,
           background: 'rgba(26,154,80,0.12)', color: '#1a9a50',
          }}>Öppet</span>
          )}
          <span style={{
          fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 18,
          background: cat === 'kafe' ? 'rgba(201,110,42,0.1)' : 'rgba(30,92,130,0.08)',
          color: cat === 'kafe' ? '#c96e2a' : 'var(--sea)',
          }}>
          {catEmoji(cat)}
          </span>
         </div>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
         {r.opening_hours && (
          <div style={{ fontSize: 10, color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 3 }}>
           <Icon name="clock" size={12} /> {r.opening_hours}
          </div>
         )}
         {r.booking_url && (
          <span style={{
          fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 10,
          background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
          textTransform: 'uppercase', letterSpacing: '0.4px',
          }}>Bokning</span>
         )}
         </div>
         {r.description && (
         <div style={{
          fontSize: 11, color: 'var(--txt2)', marginTop: 4, lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
         }}>
          {r.description}
         </div>
         )}
        </div>
       </article>
       </Link>
      </div>
      )
     })}
     </div>
    )}
    </div>
   </div>
   </div>
  </div>
 )
 }

 // ── Mobile layout ──────────────────────────────────────────────────────
 // Kartans höjd: 56vw capped vid 300px — bra balans mellan karta och lista
 const mapHeight = 'clamp(200px, 56vw, 300px)'

 return (
 <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 56px)', overflow: 'hidden' }}>

  {/* ── Sticky sökfält ── */}
  <div style={{
  padding: '8px 16px 10px',
  background: 'var(--glass-98)',
  borderBottom: '1px solid rgba(10,123,140,0.08)',
  flexShrink: 0,
  position: 'sticky', top: 0, zIndex: 200,
  }}>
  <div style={{ position: 'relative' }}>
   <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2}
   style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, pointerEvents: 'none' }}>
   <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
   </svg>
   <input
   type="text"
   placeholder="Sök ö, krog eller matstil…"
   value={query}
   onChange={e => setQuery(e.target.value)}
   style={{
    width: '100%', paddingLeft: 38, paddingRight: query ? 36 : 16,
    height: 44,
    borderRadius: 22, border: '1.5px solid rgba(10,123,140,0.15)',
    background: 'var(--bg)', fontSize: 16, color: 'var(--txt)', outline: 'none',
    boxSizing: 'border-box',
   }}
   />
   {query && (
   <button onClick={() => setQuery('')} style={{
    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--txt3)', padding: '4px 4px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
   }}><Icon name="x" size={18} /></button>
   )}
  </div>
  </div>

  {/* ── Karta ── */}
  <div style={{ height: mapHeight, flexShrink: 0, position: 'relative' }}>
  <PlatserMap
   restaurants={filtered}
   tours={tours}
   activeId={activeId}
   onMarkerClick={handleMarkerClick}
  />
  </div>

  {/* ── Lista ── */}
  <div style={{
  flex: 1, overflowY: 'auto',
  paddingTop: 12, paddingLeft: 16, paddingRight: 16,
  paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 24px)',
  }}>
  {/* Filter-chips */}
  <div style={{
  display: 'flex', gap: 6, overflowX: 'auto',
  scrollbarWidth: 'none', marginBottom: 12,
  paddingBottom: 2,
  }}>
  {FILTERS.map(f => (
   <button key={f.value} onClick={() => setFilter(f.value)} style={{
   flexShrink: 0, padding: '0 16px', height: 36, borderRadius: 18,
   border: 'none', cursor: 'pointer',
   fontWeight: 700, fontSize: 12,
   background: filter === f.value ? 'var(--sea)' : '#fff',
   color: filter === f.value ? '#fff' : '#3a6a80',
   boxShadow: filter === f.value ? '0 2px 8px rgba(30,92,130,0.3)' : '0 1px 4px rgba(0,45,60,0.08)',
   display: 'flex', alignItems: 'center',
   }}>
   {f.label}
   </button>
  ))}
  <button onClick={() => setOpenNowOnly(o => !o)} style={{
  flexShrink: 0, padding: '0 14px', height: 36, borderRadius: 18,
  border: 'none', cursor: 'pointer',
  fontWeight: 700, fontSize: 12,
  background: openNowOnly ? '#1a9a50' : 'rgba(26,154,80,0.10)',
  color: openNowOnly ? '#fff' : '#1a9a50',
  boxShadow: openNowOnly ? '0 2px 8px rgba(26,154,80,0.3)' : '0 1px 4px rgba(0,45,60,0.08)',
  display: 'flex', alignItems: 'center', gap: 5,
  }}>
  <span style={{ width: 6, height: 6, borderRadius: '50%', background: openNowOnly ? '#fff' : '#1a9a50', display: 'inline-block' }} />
  Öppet nu
  </button>
  </div>

  {featured && filter === 'alla' && !query && (
  <Link href={`/upptack/${featured.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
   <div style={{
   borderRadius: 16, overflow: 'hidden',
   background: 'var(--grad-sea)',
   boxShadow: '0 3px 14px rgba(30,92,130,0.25)',
   position: 'relative',
   }}>
   {featured.images?.[0] && !isStockPhoto(featured.images[0]) && (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: 100, opacity: 0.4 }}>
    <Image src={featured.images[0]} alt={featured.name} fill sizes="(max-width: 640px) 100vw, 400px" style={{ objectFit: 'cover' }} />
    </div>
   )}
   <div style={{
    position: (featured.images?.[0] && !isStockPhoto(featured.images[0])) ? 'absolute' : 'relative',
    inset: 0, padding: '12px 14px',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
   }}>
    <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }}>
    Veckans favorit
    </div>
    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{featured.name}</div>
   </div>
   </div>
  </Link>
  )}

  {filter === 'alla' && !query && (
  <div style={{ marginBottom: 10 }}>
   <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Trending</div>
   <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
   {TRENDING.map(t => (
    <button key={t} onClick={() => setQuery(t)} style={{
    flexShrink: 0, padding: '5px 10px', borderRadius: 18, border: 'none', cursor: 'pointer',
    background: 'var(--white)', fontSize: 11, fontWeight: 600, color: 'var(--sea)',
    boxShadow: '0 1px 4px rgba(0,45,60,0.10)',
    }}>
    {t}
    </button>
   ))}
   </div>
  </div>
  )}

  {/* Antal + sort */}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
  <div style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 600 }}>
   {sorted.length} platser {query ? `för "${query}"` : 'i skärgården'}
  </div>
  <select value={sortBy} onChange={e => setSortBy(e.target.value as 'island' | 'nearest' | 'name')} style={{
   fontSize: 10, color: 'var(--sea)', background: 'none', border: 'none',
   cursor: 'pointer', fontWeight: 600, outline: 'none', padding: '2px 0',
  }}>
   {userPos && <option value="nearest">Närmast</option>}
   <option value="island">Ö</option>
   <option value="name">A–Ö</option>
  </select>
  </div>

  {sorted.length === 0 ? (
  <div style={{ textAlign: 'center', padding: '48px 20px' }}>
   <Icon name="compass" size={44} style={{ color: 'var(--txt3)', marginBottom: 12, display: 'block' }} />
   <p style={{ color: 'var(--txt3)', fontSize: 14, marginBottom: 0 }}>Inga platser matchar.</p>
   <button onClick={() => { setQuery(''); setFilter('alla'); setOpenNowOnly(false) }} style={{
   marginTop: 16, padding: '0 24px', height: 44, borderRadius: 22, border: 'none',
   background: 'var(--sea)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
   }}>Rensa filter</button>
  </div>
  ) : (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
   {sorted.map(r => {
   const cat = getCat(r)
   const open = isOpenNow(r.opening_hours)
   const showImg = r.images?.[0] && !isStockPhoto(r.images[0])
   return (
    <div key={r.id} ref={el => { cardRefs.current[r.id] = el }}>
    <Link href={`/upptack/${r.id}`} style={{ textDecoration: 'none' }}>
     <article style={{
     background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
     boxShadow: activeId === r.id
      ? '0 0 0 2px #1e5c82, 0 4px 16px rgba(30,92,130,0.12)'
      : '0 1px 6px rgba(0,45,60,0.07)',
     border: activeId === r.id ? '1px solid #1e5c82' : '1px solid rgba(10,123,140,0.07)',
     display: 'flex',
     minHeight: 80,
     transition: 'box-shadow 0.15s',
     }}>
     <div style={{ width: 88, flexShrink: 0, background: 'var(--sea-l)', position: 'relative' }}>
      {showImg
      ? <Image src={r.images![0] as string} alt={r.name} fill sizes="88px" style={{ objectFit: 'cover' }} />
      : <div style={{
       width: '100%', height: '100%', minHeight: 80,
       display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
       background: catBg(cat),
       }}>
       {catEmoji(cat)}
       </div>
      }
     </div>
     <div style={{ flex: 1, padding: '12px 14px', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.25 }}>{r.name}</div>
      {open === true && (
       <span style={{
       flexShrink: 0, fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 10,
       background: 'rgba(26,154,80,0.12)', color: '#1a9a50',
       }}>Öppet</span>
      )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
      {r.opening_hours && (
       <div style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Icon name="clock" size={12} /> {r.opening_hours}
       </div>
      )}
      {r.booking_url && (
       <span style={{
       fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 10,
       background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
       textTransform: 'uppercase', letterSpacing: '0.4px',
       }}>Bokning</span>
      )}
      </div>
      {r.description && (
      <div style={{
       fontSize: 11, color: 'var(--txt2)', marginTop: 5, lineHeight: 1.45,
       overflow: 'hidden', display: '-webkit-box',
       WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
      }}>
       {r.description}
      </div>
      )}
     </div>
     </article>
    </Link>
    </div>
   )
   })}
  </div>
  )}
  </div>
 </div>
 )
}

export default function PlatserClient({ restaurants, tours = [] }: { restaurants: Restaurant[]; tours?: TourLine[] }) {
 return (
 <Suspense>
  <PlatserInner restaurants={restaurants} tours={tours} />
 </Suspense>
 )
}
