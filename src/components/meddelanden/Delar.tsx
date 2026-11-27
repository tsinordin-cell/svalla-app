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
import { rostTid, type RostInspelning } from '@/lib/useRostInspelning'

// ─── Ikoner ──────────────────────────────────────────────────────────────────

export const IKON = {
  bak: 'M15 19l-7-7 7-7',
  mer: 'M5 12h.01M12 12h.01M19 12h.01',
  penna: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z',
  sok: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  bild: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01',
  nal: 'M12 21s-7-6.1-7-11.5a7 7 0 0114 0C19 14.9 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  skicka: 'M12 19V5M5 12l7-7 7 7',
  flygplan: 'M21 3L3.5 10.3l7.2 3 3 7.2L21 3zM10.7 13.3L21 3',
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
  svar: 'M9 14L4 9l5-5M4 9h10a6 6 0 016 6v4',
  smil: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 14.5s1.3 1.8 3.5 1.8 3.5-1.8 3.5-1.8M9 9.5h.01M15 9.5h.01',
  plus: 'M12 5v14M5 12h14',
  kamera: 'M4 8h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zM12 17a4 4 0 100-8 4 4 0 000 8z',
  mikrofon: 'M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3',
  kuvert: 'M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zM3.5 7l8.5 6 8.5-6',
  kuvertOppet: 'M3 10l9-6 9 6v9a1 1 0 01-1 1H4a1 1 0 01-1-1zM3.5 10.5l8.5 5.5 8.5-5.5',
  klocka: 'M6 16V11a6 6 0 0112 0v5l1.5 2h-15zM10 20.5a2 2 0 004 0',
  klockaAv: 'M6 16V11a6 6 0 019.3-5M18 11v5l1.5 2H8M10 20.5a2 2 0 004 0M4 4l16 16',
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
  /** Tystat: inga aviseringar från samtalet */
  tyst?: boolean
}

export function KonvRad({ r, vald, href, tryck }: {
  r: KonvRadData; vald: boolean; href: string
  /** Långt tryck / högerklick öppnar samtalsmenyn (KonvMeny.tsx) */
  tryck?: React.HTMLAttributes<HTMLAnchorElement>
}) {
  const olasta = vald ? 0 : r.olasta
  const tom = !r.text
  return (
    <Link href={href} className={`md-konv${olasta > 0 ? ' md-konv--olast' : ''}`} aria-current={vald ? 'page' : undefined} {...tryck}>
      <Avatar namn={r.namn} nyckel={r.nyckel} bild={r.bild} s={52} />
      <div className="md-konv-mitt">
        <div className="md-konv-topp">
          <span className="md-konv-namn">{r.namn}</span>
          {r.tyst && <span className="md-konv-tyst" aria-label="Tystat" title="Tystat"><Ikon d={IKON.klockaAv} s={14} w={2} /></span>}
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

export function SamtalsHuvud({ namn, nyckel, bild, profilHref, under, onMer, laddar }: {
  namn: string; nyckel: string; bild: string | null; profilHref: string | null; under?: string; onMer: () => void
  /** Namnet är inte hämtat än: visa en neutral platshållare i stället för "?" (2026-11-27) */
  laddar?: boolean
}) {
  const vem = laddar ? (
    <>
      <div className="md-skel" style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} aria-hidden="true" />
      <div className="md-sam-text" style={{ flex: 1 }}>
        <div className="md-skel" style={{ width: 120, maxWidth: '60%', height: 14 }} aria-label="Laddar" />
      </div>
    </>
  ) : (
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
      {profilHref && !laddar
        ? <Link href={profilHref} className="md-sam-vem">{vem}</Link>
        : <div className="md-sam-vem">{vem}</div>}
      <button type="button" className="md-rund" aria-label="Fler val" onClick={onMer}>
        <Ikon d={IKON.mer} s={24} w={3} />
      </button>
    </div>
  )
}

export function DagAvdelare({ iso }: { iso: string }) {
  return <div className="md-dag"><span>{dagEtikett(iso)}</span></div>
}

/** En rad i samtalet: avatar (för andras), innehåll, tid och läst. */
export function MeddelandeRad({ mine, nyGrupp, sist, skickar, avatar, tid, sett, handlers, under, atgarder, markerad, radId, children }: {
  mine: boolean
  nyGrupp: boolean
  sist: boolean
  skickar?: boolean
  avatar?: ReactNode
  tid: string
  sett?: boolean
  handlers?: React.HTMLAttributes<HTMLDivElement>
  /** Reaktionerna under bubblan */
  under?: ReactNode
  /** Knappar bredvid bubblan på dator (visas vid hovring och fokus) */
  atgarder?: ReactNode
  /** Kort markering när man hoppat hit från ett citat */
  markerad?: boolean
  radId?: string
  children: ReactNode
}) {
  const klass = ['md-rad', mine && 'md-rad--egen', nyGrupp && 'md-rad--ny-grupp', sist && 'md-rad--sist', skickar && 'md-rad--skickar', markerad && 'md-rad--markerad']
    .filter(Boolean).join(' ')
  return (
    <div className={klass} id={radId}>
      {!mine && <div className="md-av-plats">{sist ? avatar : null}</div>}
      <div className="md-kol" {...handlers}>
        {children}
        {under}
        {sist && (
          <span className="md-tid" title={absoluteDate(tid)}>{skickar ? 'Skickar…' : meddelandeTid(tid)}</span>
        )}
        {sett && (
          <span className="md-sett"><Bockar dubbel /> Läst</span>
        )}
      </div>
      {atgarder && <div className="md-hover">{atgarder}</div>}
    </div>
  )
}

export function TextBubbla({ text }: { text: string }) {
  return <div className="md-bubbla">{text}</div>
}

/**
 * Bild i ett meddelande. Med onTryck öppnas bilden stort inne i Svalla (Tom 2026-11-27:
 * tidigare var bilden en länk till själva lagringsadressen, så man lämnade sajten och
 * fick en nedladdningsrad i webbläsaren). Utan onTryck, t.ex. i den upplyfta menyn, går
 * den inte att trycka på.
 */
export function BildBubbla({ src, onFel, onTryck }: { src: string | undefined; onFel?: () => void; onTryck?: () => void }) {
  if (!src) return <div className="md-bild" aria-label="Bilden laddas" />
  /* Privat hink: visas via tidsbegränsad länk, inte via Next bildtjänst (som annars kunde cacha den öppet). */
  // eslint-disable-next-line @next/next/no-img-element
  const bild = <img src={src} alt="Skickad bild" onError={onFel} />
  if (!onTryck) return <div className="md-bild">{bild}</div>
  return (
    <button type="button" className="md-bild" onClick={onTryck} aria-label="Visa bilden stort">
      {bild}
    </button>
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

export function Skrivfalt({ text, setText, onSkicka, placeholder, kanSkicka, onBild, onPosition, onTur, delarPosition, onKamera, laddarBild, onFokus, ovanfor, fokusSignal, rost }: {
  text: string
  setText: (t: string) => void
  onSkicka: () => void
  placeholder: string
  kanSkicka: boolean
  /** Bild, Position och Tur ligger som egna knappar i rutan (förr i plusmenyn). De döljs medan man skriver. */
  onBild: () => void
  onPosition: () => void
  onTur: () => void
  delarPosition?: boolean
  /** Öppnar kameran direkt. Knappen visas bara på pekskärm. */
  onKamera: () => void
  laddarBild: boolean
  onFokus?: () => void
  /** Visas ovanför fältet, t.ex. vilket meddelande man svarar på */
  ovanfor?: ReactNode
  /** Ändras värdet får fältet fokus (t.ex. efter Svara i menyn) */
  fokusSignal?: number
  /** Röstmeddelanden. Mikrofonen visas i skicka-knappens plats när fältet är tomt. */
  rost?: RostInspelning
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (fokusSignal) ref.current?.focus()
  }, [fokusSignal])
  // Fältet växer med texten upp till sex rader, sedan skrollar det.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '44px'
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`
  }, [text])

  const spelarIn = !!rost && rost.lage !== 'av'
  const skriver = !!text.trim()
  const visaMikrofon = !!rost?.kan && !skriver

  return (
    <form className="md-komp" onSubmit={e => { e.preventDefault(); onSkicka() }}>
      {ovanfor}
      {spelarIn ? <Inspelningsrad rost={rost!} /> : (
      <div className="md-komp-rad">
        {/* En enda rundad ruta, som Instagram: kameran först, sedan texten. Till höger Bild, Position, Tur och mikrofon.
            När man skriver döljs de och bara skicka-knappen syns längst till höger. */}
        <div className="md-falt">
          <button type="button" className="md-falt-kamera md-rund--kamera" onClick={onKamera} disabled={laddarBild}
            aria-label={laddarBild ? 'Laddar upp bild' : 'Ta en bild'} aria-busy={laddarBild}>
            <Ikon d={IKON.kamera} s={20} w={1.9} />
          </button>
          <textarea ref={ref} rows={1} value={text} maxLength={2000} placeholder={placeholder} aria-label="Meddelande"
            enterKeyHint="send" autoComplete="off"
            onChange={e => setText(e.target.value)}
            onFocus={onFokus}
            onKeyDown={e => {
              // Enter skickar på dator. På telefon (pekskärm) ger Enter ny rad, skicka-knappen skickar.
              const pek = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
              if (e.key === 'Enter' && !e.shiftKey && !pek && !e.nativeEvent.isComposing) { e.preventDefault(); onSkicka() }
            }} />
          {skriver ? (
            <button type="submit" className="md-falt-skicka" disabled={!kanSkicka} aria-label="Skicka">
              <Ikon d={IKON.flygplan} s={19} w={2.3} />
            </button>
          ) : (
            <>
              <button type="button" className="md-falt-knapp" onClick={onBild} disabled={laddarBild}
                aria-label={laddarBild ? 'Laddar upp bild' : 'Skicka en bild'} aria-busy={laddarBild}>
                <Ikon d={IKON.bild} s={22} w={1.8} />
              </button>
              <button type="button" className="md-falt-knapp" onClick={onPosition} disabled={delarPosition}
                aria-label={delarPosition ? 'Hämtar position' : 'Dela position'} aria-busy={delarPosition}>
                <Ikon d={IKON.nal} s={22} w={1.8} />
              </button>
              <button type="button" className="md-falt-knapp" onClick={onTur} aria-label="Dela en tur">
                <Ikon d={IKON.bat} s={22} w={1.8} />
              </button>
              {visaMikrofon && (
                <button type="button" className="md-falt-knapp" onClick={rost!.starta} aria-label="Spela in röstmeddelande">
                  <Ikon d={IKON.mikrofon} s={22} w={1.8} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      )}
    </form>
  )
}

/** Raden som ersätter skrivfältet medan ett röstmeddelande spelas in. */
function Inspelningsrad({ rost }: { rost: RostInspelning }) {
  const { lage, sekunder, nivaer } = rost
  const skickar = lage === 'skickar'
  const klar = lage === 'klar'
  return (
    <div className="md-komp-rad md-insp" role="group" aria-label="Röstmeddelande">
      <button type="button" className="md-rund md-insp-kasta" onClick={rost.avbryt} disabled={skickar} aria-label="Kasta inspelningen">
        <Ikon d={IKON.soptunna} s={21} w={1.8} />
      </button>
      <div className={`md-insp-falt${klar ? ' md-insp-falt--klar' : ''}`}>
        <span className={`md-insp-prick${lage === 'spelar' ? ' md-insp-prick--pa' : ''}`} aria-hidden="true" />
        <span className="md-insp-tid" aria-live="off">{rostTid(sekunder)}</span>
        <span className="md-insp-vag" aria-hidden="true">
          {nivaer.map((n, i) => <i key={i} style={{ transform: `scaleY(${0.14 + n * 0.86})` }} />)}
        </span>
        <span className="md-insp-text">
          {skickar ? 'Skickar…' : klar ? 'Max 2 minuter' : lage === 'startar' ? 'Startar…' : 'Spelar in'}
        </span>
      </div>
      <button type="button" className="md-skicka md-skicka--redo" onClick={rost.skicka}
        disabled={skickar || lage === 'startar'} aria-label="Skicka röstmeddelandet" aria-busy={skickar}>
        <Ikon d={IKON.flygplan} s={20} w={2.3} />
      </button>
    </div>
  )
}

// ─── Röstmeddelande i en bubbla ──────────────────────────────────────────────

export type RostMeta = { duration?: number | null; size?: number | null }

/** Bara ett klipp spelar åt gången i hela sidan. */
let spelarNu: HTMLAudioElement | null = null

export function RostBubbla({ src, meta, onFel }: { src: string | undefined; meta: RostMeta | null; onFel?: () => void }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [spelar, setSpelar] = useState(false)
  const [laddar, setLaddar] = useState(false)
  const [tid, setTid] = useState(0)
  const [langd, setLangd] = useState<number>(() => (meta?.duration && meta.duration > 0 ? meta.duration : 0))

  useEffect(() => () => { if (spelarNu === ref.current) spelarNu = null }, [])

  function vaxla() {
    const a = ref.current
    if (!a || !src) return
    if (!a.paused) { a.pause(); return }
    if (spelarNu && spelarNu !== a) spelarNu.pause()
    spelarNu = a
    setLaddar(true)
    a.play().catch(() => { setLaddar(false); setSpelar(false) })
  }

  function hoppa(e: React.ChangeEvent<HTMLInputElement>) {
    const a = ref.current
    if (!a || !langd) return
    const t = (Number(e.target.value) / 1000) * langd
    a.currentTime = t
    setTid(t)
  }

  const andel = langd > 0 ? Math.min(1, tid / langd) : 0
  return (
    <div className="md-bubbla md-rost">
      <button type="button" className="md-rost-knapp" onClick={vaxla} disabled={!src}
        aria-label={spelar ? 'Pausa röstmeddelandet' : 'Spela röstmeddelandet'}>
        {spelar
          ? <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" /></svg>
          : <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path d="M8 5.5v13a1 1 0 001.5.86l10.4-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" fill="currentColor" /></svg>}
      </button>
      <div className="md-rost-spar">
        <div className="md-rost-linje" aria-hidden="true"><div style={{ width: `${andel * 100}%` }} /></div>
        <input type="range" min={0} max={1000} step={1} value={Math.round(andel * 1000)} onChange={hoppa}
          disabled={!langd || !src} aria-label="Spola i röstmeddelandet" aria-valuetext={`${rostTid(tid)} av ${rostTid(langd)}`} />
      </div>
      <span className="md-rost-tid">{laddar && !spelar ? '…' : rostTid(spelar || tid > 0 ? tid : langd)}</span>
      {src && (
        <audio ref={ref} src={src} preload="metadata"
          onLoadedMetadata={e => { const d = e.currentTarget.duration; if (Number.isFinite(d) && d > 0) setLangd(d) }}
          onPlaying={() => { setLaddar(false); setSpelar(true) }}
          onPause={() => setSpelar(false)}
          onTimeUpdate={e => setTid(e.currentTarget.currentTime)}
          onEnded={e => { setSpelar(false); setTid(0); e.currentTarget.currentTime = 0 }}
          onError={() => { setLaddar(false); setSpelar(false); onFel?.() }} />
      )}
    </div>
  )
}

// ─── Turväljaren ───────────────────────────────────────────────

export type TurVal = {
  id: string; location_name: string | null; distance: number | null; image: string | null
  started_at: string | null; created_at: string | null; visibility: string | null
}

function turDatum(t: TurVal): string {
  const d = t.started_at ?? t.created_at
  if (!d) return ''
  return new Date(d).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Listar ens egna turer. turer = null betyder att de laddas. */
export function TurValjare({ turer, fel, onValj, onStang }: {
  turer: TurVal[] | null; fel: boolean; onValj: (t: TurVal) => void; onStang: () => void
}) {
  return (
    <Ark onStang={onStang} etikett="Dela en tur">
      <div className="md-ark-text"><h2>Dela en tur</h2></div>
      <div className="md-tur-lista">
        {fel ? (
          <p className="md-tur-tom">Turerna gick inte att hämta. Försök igen.</p>
        ) : turer === null ? (
          <div className="md-snurra" aria-label="Laddar turer" />
        ) : turer.length === 0 ? (
          <p className="md-tur-tom">Du har inga sparade turer än. Logga en tur så kan du dela den här.</p>
        ) : turer.map(t => (
          <button key={t.id} type="button" className="md-tur-rad" onClick={() => onValj(t)}>
            <span className="md-tur-tumme">
              {t.image
                ? <Image src={t.image} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
                : <Ikon d={IKON.bat} s={20} />}
            </span>
            <span className="md-tur-text">
              <span className="md-kort-titel">{t.location_name ?? 'Tur'}</span>
              <span className="md-kort-under">
                {[turDatum(t), t.distance != null && t.distance > 0 ? `${decimal(t.distance)} NM` : null, t.visibility === 'private' ? 'Privat' : null]
                  .filter(Boolean).join(' · ')}
              </span>
            </span>
          </button>
        ))}
      </div>
      <ArkRad ikon={IKON.stang} label="Avbryt" onClick={onStang} />
    </Ark>
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
