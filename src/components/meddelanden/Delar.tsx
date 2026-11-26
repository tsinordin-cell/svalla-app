'use client'

/**
 * Byggstenar för Meddelanden (premiumsteg 1, 2026-11-26).
 *
 * Bara utseende, ingen datahämtning: sidorna under /meddelanden skickar in
 * det som ska visas. Samma delar används av förhandsvisningen med påhittade
 * samtal, så att den visar exakt det som körs i appen.
 * Stilarna ligger i src/app/meddelanden/meddelanden.css (klasser md-*).
 */

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { decimal } from '@/lib/gps'
import { avatarGradient, initialsOf, absoluteDate } from '@/lib/utils'

// ─── Ikoner ──────────────────────────────────────────────────────────────────

export const IKON = {
  bak: 'M15 19l-7-7 7-7',
  mer: 'M5 12h.01M12 12h.01M19 12h.01',
  penna: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z',
  sok: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  bild: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01',
  nal: 'M12 21s-7-6.1-7-11.5a7 7 0 0114 0C19 14.9 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  skicka: 'M12 19V5M5 12l7-7 7 7',
  pratbubbla: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  sjokort: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  kopiera: 'M9 9h10v10H9zM5 15V5h10',
  soptunna: 'M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3',
  flagga: 'M5 21V4M5 4h11l-2 4 2 4H5',
  blockera: 'M12 21a9 9 0 100-18 9 9 0 000 18zM5.6 5.6l12.8 12.8',
  stang: 'M6 6l12 12M18 6L6 18',
  lamna: 'M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l-5-5 5-5M5 12h11',
  bat: 'M3 17l2 3h14l2-3M5 17V10l7-6 7 6v7M12 4v13',
  logga: 'M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3',
} as const

export function Ikon({ d, s = 20, w = 2 }: { d: string; s?: number; w?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth={w}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} />
    </svg>
  )
}

/** Bock för läst/skickat. dubbel = motparten har läst. */
export function Bockar({ dubbel, s = 16 }: { dubbel: boolean; s?: number }) {
  return (
    <svg viewBox="0 0 22 12" width={s} height={Math.round(s * 0.55)} fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M1 6.5l3.2 3.5L10 2" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
      {dubbel && <path d="M8.5 9.4l.6.6L15 2" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

/** Riktig profilbild när den finns, annars en lugn platta med första bokstaven. */
export function Avatar({ namn, nyckel, bild, s }: { namn: string; nyckel?: string; bild?: string | null; s: number }) {
  return (
    <div className="md-av" style={{ width: s, height: s }}>
      {bild ? (
        <Image src={bild} alt="" fill sizes={`${s}px`} style={{ objectFit: 'cover' }} />
      ) : (
        <div className="md-av-fall" style={{ fontSize: Math.round(s * 0.4), ['--av' as string]: avatarGradient(nyckel ?? namn) }}>
          <span>{initialsOf(namn).slice(0, 1)}</span>
        </div>
      )}
    </div>
  )
}

// ─── Inkorgen ────────────────────────────────────────────────────────────────

/** Formatera tidsstämpel i inkorgen: nu / 5 min / 14:23 / Igår / mån / 15 apr */
export function inkorgTid(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const mins = Math.floor((Date.now() - d.getTime()) / 60_000)
  if (mins < 1) return 'nu'
  if (mins < 60) return `${mins} min`
  const idag = new Date(); idag.setHours(0, 0, 0, 0)
  const dag = new Date(d); dag.setHours(0, 0, 0, 0)
  const dagar = Math.round((idag.getTime() - dag.getTime()) / 86_400_000)
  if (dagar === 0) return d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
  if (dagar === 1) return 'Igår'
  if (dagar < 7) return d.toLocaleDateString('sv-SE', { weekday: 'short' }).replace('.', '')
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }).replace('.', '')
}

export type KonvRadData = {
  id: string
  namn: string
  nyckel: string
  bild: string | null
  tid: string | null
  text: string | null
  duSkrev: boolean
  /** Motparten har läst ditt senaste meddelande (bara 1-till-1). null = okänt. */
  last: boolean | null
  olasta: number
  forfragan: boolean
  vantar: boolean
}

export function KonvRad({ r, vald, href }: { r: KonvRadData; vald: boolean; href: string }) {
  const olasta = vald ? 0 : r.olasta
  const tom = !r.text
  return (
    <Link href={href} className={`md-konv${olasta > 0 ? ' md-konv--olast' : ''}`} aria-current={vald ? 'page' : undefined}>
      <Avatar namn={r.namn} nyckel={r.nyckel} bild={r.bild} s={52} />
      <div className="md-konv-mitt">
        <div className="md-konv-topp">
          <span className="md-konv-namn">{r.namn}</span>
          <span className="md-konv-tid">{inkorgTid(r.tid)}</span>
        </div>
        <div className="md-konv-under">
          {r.forfragan && <span className="md-etikett md-etikett--acc">Förfrågan</span>}
          {r.vantar && <span className="md-etikett md-etikett--neutral">Väntar</span>}
          {r.duSkrev && !tom && r.last !== null && (
            <span className={`md-konv-kvitto${r.last ? ' md-konv-kvitto--last' : ''}`}
              aria-label={r.last ? 'Läst' : 'Skickat'} title={r.last ? 'Läst' : 'Skickat'}>
              <Bockar dubbel={r.last} />
            </span>
          )}
          <span className={`md-konv-text${tom ? ' md-konv-text--tom' : ''}`}>
            {tom ? 'Skriv första meddelandet' : `${r.duSkrev ? 'Du: ' : ''}${r.text}`}
          </span>
          {olasta > 0 && <span className="md-bricka" aria-label={`${olasta} olästa`}>{olasta > 99 ? '99+' : olasta}</span>}
        </div>
      </div>
    </Link>
  )
}

export function SkelettRad() {
  return (
    <div className="md-konv" aria-hidden="true">
      <div className="md-skel" style={{ width: 52, height: 52, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'grid', gap: 8 }}>
        <div className="md-skel" style={{ width: '42%', height: 14 }} />
        <div className="md-skel" style={{ width: '72%', height: 12 }} />
      </div>
    </div>
  )
}

export function TomtLage({ ikon, rubrik, text, children }: { ikon: string; rubrik: string; text?: string; children?: ReactNode }) {
  return (
    <div className="md-tomt">
      <div className="md-tomt-ikon"><Ikon d={ikon} s={28} w={1.8} /></div>
      <h2>{rubrik}</h2>
      {text && <p>{text}</p>}
      {children}
    </div>
  )
}

// ─── Samtalet ────────────────────────────────────────────────────────────────

/** Tid under en meddelandegrupp: nu / 5 min / 14:23 / mån 14:23 / 15 apr 14:23 */
export function meddelandeTid(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const mins = Math.floor((Date.now() - d.getTime()) / 60_000)
  if (mins < 1) return 'nu'
  if (mins < 60) return `${mins} min`
  const hhmm = d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
  if (mins < 1440) return hhmm
  const dagar = Math.floor(mins / 1440)
  if (dagar < 7) return `${d.toLocaleDateString('sv-SE', { weekday: 'short' }).replace('.', '')} ${hhmm}`
  return `${d.getDate()} ${d.toLocaleDateString('sv-SE', { month: 'short' }).replace('.', '')} ${hhmm}`
}

export function dagEtikett(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const idag = new Date(); idag.setHours(0, 0, 0, 0)
  const dag = new Date(d); dag.setHours(0, 0, 0, 0)
  const diff = Math.round((idag.getTime() - dag.getTime()) / 86_400_000)
  if (diff === 0) return 'Idag'
  if (diff === 1) return 'Igår'
  if (diff < 7) return d.toLocaleDateString('sv-SE', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase())
  return `${d.getDate()} ${d.toLocaleDateString('sv-SE', { month: 'long' })}`
}

export function SamtalsHuvud({ namn, nyckel, bild, profilHref, under, onMer }: {
  namn: string; nyckel: string; bild: string | null; profilHref: string | null; under?: string; onMer: () => void
}) {
  const vem = (
    <>
      <Avatar namn={namn} nyckel={nyckel} bild={bild} s={40} />
      <div className="md-sam-text">
        <div className="md-sam-namn">{namn}</div>
        {under && <div className="md-sam-under">{under}</div>}
      </div>
    </>
  )
  return (
    <div className="md-sam-huvud">
      <Link href="/meddelanden" className="md-rund md-bara-mobil" aria-label="Tillbaka till meddelanden">
        <Ikon d={IKON.bak} s={22} w={2.4} />
      </Link>
      {profilHref
        ? <Link href={profilHref} className="md-sam-vem">{vem}</Link>
        : <div className="md-sam-vem">{vem}</div>}
      <button type="button" className="md-rund" aria-label="Fler val för samtalet" onClick={onMer}>
        <Ikon d={IKON.mer} s={24} w={3} />
      </button>
    </div>
  )
}

export function DagAvdelare({ iso }: { iso: string }) {
  return <div className="md-dag"><span>{dagEtikett(iso)}</span></div>
}

/** En rad i samtalet: avatar (för andras), innehåll, tid och läst. */
export function MeddelandeRad({ mine, nyGrupp, sist, skickar, avatar, tid, sett, handlers, children }: {
  mine: boolean
  nyGrupp: boolean
  sist: boolean
  skickar?: boolean
  avatar?: ReactNode
  tid: string
  sett?: boolean
  handlers?: React.HTMLAttributes<HTMLDivElement>
  children: ReactNode
}) {
  const klass = ['md-rad', mine && 'md-rad--egen', nyGrupp && 'md-rad--ny-grupp', sist && 'md-rad--sist', skickar && 'md-rad--skickar']
    .filter(Boolean).join(' ')
  return (
    <div className={klass}>
      {!mine && <div className="md-av-plats">{sist ? avatar : null}</div>}
      <div className="md-kol" {...handlers}>
        {children}
        {sist && (
          <span className="md-tid" title={absoluteDate(tid)}>{skickar ? 'Skickar…' : meddelandeTid(tid)}</span>
        )}
        {sett && (
          <span className="md-sett"><Bockar dubbel /> Läst</span>
        )}
      </div>
    </div>
  )
}

export function TextBubbla({ text }: { text: string }) {
  return <div className="md-bubbla">{text}</div>
}

export function BildBubbla({ src, onFel }: { src: string | undefined; onFel?: () => void }) {
  if (!src) return <div className="md-bild" aria-label="Bilden laddas" />
  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className="md-bild">
      {/* Privat hink: visas via tidsbegränsad länk, inte via Next bildtjänst (som annars kunde cacha den öppet). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Bild i samtalet" onError={onFel} />
    </a>
  )
}

// ─── Positionskort med sjökort ───────────────────────────────────────────────

export type GeoMeta = { lat?: number; lng?: number; accuracy?: number; location_name?: string }

/**
 * Statisk mosaik av riktiga kartrutor: OpenStreetMap som grund och OpenSeaMaps
 * sjömärken (fyrar, prickar, grynnor) ovanpå. Nålen hamnar i mitten oavsett bredd.
 * OpenStreetMaps licens kräver att källan anges, därav raden nere till höger.
 */
export function Sjokort({ meta, href, onKopiera }: { meta: GeoMeta; href: string | null; onKopiera: (text: string) => void }) {
  const lat = typeof meta.lat === 'number' ? meta.lat : null
  const lng = typeof meta.lng === 'number' ? meta.lng : null
  const boxRef = useRef<HTMLAnchorElement>(null)
  const [W, setW] = useState(300)
  const H = 156
  const Z = 14

  useEffect(() => {
    if (!boxRef.current || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) setW(Math.floor(w)) })
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [])

  if (lat === null || lng === null) {
    return (
      <div className="md-kort">
        <div className="md-karta"><div className="md-kort-tom"><Ikon d={IKON.nal} s={16} /> Delad position</div></div>
      </div>
    )
  }

  const n = 2 ** Z
  const xf = ((lng + 180) / 360) * n
  const r = (lat * Math.PI) / 180
  const yf = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n
  const xi = Math.floor(xf)
  const yi = Math.floor(yf)
  // Nålens läge i en 3×3-mosaik (768×768). Spetsen ska ligga strax under mitten.
  const vanster = W / 2 - (256 + (xf - xi) * 256)
  const topp = H / 2 + 10 - (256 + (yf - yi) * 256)
  const rutor: { x: number; y: number; dx: number; dy: number }[] = []
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) rutor.push({ x: xi + dx, y: yi + dy, dx: dx + 1, dy: dy + 1 })

  const sjokortHref = `https://map.openseamap.org/?zoom=14&mlat=${lat}&mlon=${lng}&lat=${lat}&lon=${lng}`
  const koord = `${lat.toFixed(5)}, ${lng.toFixed(5)}`

  return (
    <div className="md-kort">
      <a ref={boxRef} href={href ?? sjokortHref} target="_blank" rel="noopener noreferrer" className="md-karta"
        aria-label={`Karta över ${meta.location_name ?? 'delad position'}`}>
        <div className="md-mosaik" style={{ left: vanster, top: topp }}>
          <div className="md-bas">
            {rutor.map(t => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`b${t.x}-${t.y}`} src={`https://tile.openstreetmap.org/${Z}/${t.x}/${t.y}.png`} alt=""
                width={256} height={256} loading="lazy" decoding="async" style={{ left: t.dx * 256, top: t.dy * 256 }} />
            ))}
          </div>
          {rutor.map(t => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`s${t.x}-${t.y}`} src={`https://tiles.openseamap.org/seamark/${Z}/${t.x}/${t.y}.png`} alt=""
              width={256} height={256} loading="lazy" decoding="async" style={{ left: t.dx * 256, top: t.dy * 256 }} />
          ))}
        </div>
        <div className="md-nal" aria-hidden="true">
          <span className="md-nal-puls" />
          <svg viewBox="0 0 24 32" width="26" height="34">
            <path d="M12 31s10-10.2 10-18A10 10 0 002 13c0 7.8 10 18 10 18z" fill="var(--acc)" stroke="#fff" strokeWidth="2" />
            <circle cx="12" cy="13" r="4" fill="#fff" />
          </svg>
        </div>
        {typeof meta.accuracy === 'number' && meta.accuracy > 0 && (
          <span className="md-noggrannhet">±{Math.round(meta.accuracy)} m</span>
        )}
        <span className="md-attr">© OpenStreetMap · OpenSeaMap</span>
      </a>
      <div className="md-kort-fot">
        <div className="md-kort-ikon"><Ikon d={IKON.nal} s={18} /></div>
        <div style={{ minWidth: 0 }}>
          <div className="md-kort-titel">{meta.location_name ?? 'Delad position'}</div>
          <div className="md-kort-under">{lat.toFixed(4)}° N, {lng.toFixed(4)}° E</div>
        </div>
      </div>
      <div className="md-kort-knappar">
        <a href={sjokortHref} target="_blank" rel="noopener noreferrer"><Ikon d={IKON.sjokort} s={16} /> Sjökort</a>
        <button type="button" onClick={e => { e.stopPropagation(); onKopiera(koord) }}><Ikon d={IKON.kopiera} s={16} /> Kopiera</button>
      </div>
    </div>
  )
}

// ─── Turkort ─────────────────────────────────────────────────────────────────

export type TripMeta = { trip_id?: string; location_name?: string; distance?: number; image?: string }

export function TurKort({ meta }: { meta: TripMeta }) {
  return (
    <a href={meta.trip_id ? `/tur/${meta.trip_id}` : '#'} className="md-kort" style={{ display: 'block' }}>
      {meta.image && (
        <div className="md-tur-bild"><Image src={meta.image} alt="" fill sizes="300px" style={{ objectFit: 'cover' }} /></div>
      )}
      <div className="md-kort-fot" style={{ paddingBottom: 12 }}>
        <div className="md-kort-ikon"><Ikon d={IKON.bat} s={18} /></div>
        <div style={{ minWidth: 0 }}>
          <div className="md-kort-titel">{meta.location_name ?? 'Tur'}</div>
          <div className="md-kort-under">
            {meta.distance != null && meta.distance > 0 ? `Tur · ${decimal(meta.distance)} NM` : 'Tur'}
          </div>
        </div>
      </div>
    </a>
  )
}

// ─── Skrivfältet ─────────────────────────────────────────────────────────────

export function Skrivfalt({ text, setText, onSkicka, placeholder, kanSkicka, onBild, onPosition, laddarBild, delarPosition, onFokus }: {
  text: string
  setText: (t: string) => void
  onSkicka: () => void
  placeholder: string
  kanSkicka: boolean
  onBild: () => void
  onPosition: () => void
  laddarBild: boolean
  delarPosition: boolean
  onFokus?: () => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  // Fältet växer med texten upp till sex rader, sedan skrollar det.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '44px'
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`
  }, [text])

  return (
    <form className="md-komp" onSubmit={e => { e.preventDefault(); onSkicka() }}>
      <div className="md-komp-rad">
        <button type="button" className="md-rund" onClick={onBild} disabled={laddarBild}
          aria-label={laddarBild ? 'Laddar upp bild' : 'Skicka en bild'} aria-busy={laddarBild}>
          <Ikon d={IKON.bild} s={22} w={1.8} />
        </button>
        <button type="button" className="md-rund" onClick={onPosition} disabled={delarPosition} aria-label="Dela din position">
          <Ikon d={IKON.nal} s={22} w={1.8} />
        </button>
        <div className="md-falt">
          <textarea ref={ref} rows={1} value={text} maxLength={2000} placeholder={placeholder} aria-label="Meddelande"
            enterKeyHint="send" autoComplete="off"
            onChange={e => setText(e.target.value)}
            onFocus={onFokus}
            onKeyDown={e => {
              // Enter skickar på dator. På telefon (pekskärm) ger Enter ny rad, skicka-knappen skickar.
              const pek = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
              if (e.key === 'Enter' && !e.shiftKey && !pek && !e.nativeEvent.isComposing) { e.preventDefault(); onSkicka() }
            }} />
        </div>
        <button type="submit" className={`md-skicka${kanSkicka ? ' md-skicka--redo' : ''}`} disabled={!kanSkicka} aria-label="Skicka">
          <Ikon d={IKON.skicka} s={20} w={2.4} />
        </button>
      </div>
    </form>
  )
}

// ─── Ark nedifrån ────────────────────────────────────────────────────────────

export function Ark({ onStang, children, etikett }: { onStang: () => void; children: ReactNode; etikett: string }) {
  useEffect(() => {
    const tangent = (e: KeyboardEvent) => { if (e.key === 'Escape') onStang() }
    window.addEventListener('keydown', tangent)
    return () => window.removeEventListener('keydown', tangent)
  }, [onStang])
  return (
    <>
      <div className="md-ark-bakgrund" onClick={onStang} />
      <div className="md-ark" role="dialog" aria-modal="true" aria-label={etikett}>
        <div className="md-ark-handtag" />
        {children}
      </div>
    </>
  )
}

export function ArkRad({ ikon, label, fara, onClick }: { ikon: string; label: string; fara?: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`md-ark-rad${fara ? ' md-ark-rad--fara' : ''}`} onClick={onClick}>
      <Ikon d={ikon} s={22} w={1.9} />
      <span>{label}</span>
    </button>
  )
}
