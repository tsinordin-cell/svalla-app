'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { avatarGradient, initialsOf } from '@/lib/utils'

/**
 * Premiumförslag för meddelanden. Exempeldata, inga anrop mot databasen.
 *
 * Kartkälla: samma som resten av Svalla (src/lib/map-tiles.ts): OpenStreetMaps
 * standardtiles med OpenSeaMaps sjömärken ovanpå. Ingen ny tjänst, ingen nyckel.
 * Koordinaten är Grinda Södra bryggan ur Svallas egen restaurants-tabell.
 */

type Tema = 'ljust' | 'mork'
type Vy = 'inkorg' | 'samtal'
type Lage = 'normal' | 'tom' | 'laddar' | 'fel'

// ─── Exempeldata ─────────────────────────────────────────────────────────────

type Rad = {
  id: string
  namn: string
  forhands: string
  tid: string
  olasta: number
  grupp?: string[]
  avMig?: boolean
  typ?: 'pos' | 'tur' | 'bild'
  skriver?: boolean
  sett?: boolean
  bild?: string
}

const RADER: Rad[] = [
  { id: 'r1', namn: 'linnea.seglar', forhands: 'Vi lägger till vid Sandhamn runt tre. Kommer ni?', tid: '14.32', olasta: 2, skriver: true, bild: '/kreativ/scen-eka.webp' },
  { id: 'r2', namn: 'Seglargänget Möja', forhands: 'johan_b: Jag tar med grillen', tid: '13.05', olasta: 1, grupp: ['johan_b', 'maja.l', 'nils'] },
  { id: 'r3', namn: 'erik.berg', forhands: 'Delade en position', tid: 'Igår', olasta: 0, typ: 'pos' },
  { id: 'r4', namn: 'sara_n', forhands: 'Tack för tipset om krogen på Finnhamn!', tid: 'Igår', olasta: 0, avMig: true, sett: true },
  { id: 'r5', namn: 'mattias.k', forhands: 'Delade en tur', tid: 'mån', olasta: 0, typ: 'tur' },
  { id: 'r6', namn: 'fredrik_h', forhands: 'Skickade en bild', tid: 'sön', olasta: 0, avMig: true, typ: 'bild' },
]

type Medd = {
  id: string
  jag: boolean
  text?: string
  typ?: 'pos' | 'tur' | 'bild'
  tid: string
  svarPa?: string
  reaktioner?: { e: string; n: number; min?: boolean }[]
}

const START: Medd[] = [
  { id: 'm1', jag: false, text: 'Hej! Såg att du loggade Grinda i helgen. Hur var det i hamnen?', tid: '13.58' },
  { id: 'm2', jag: true, text: 'Fint! Gott om plats vid bryggan på fredagen, fullt på lördagskvällen.', tid: '14.10', reaktioner: [{ e: '👍', n: 1 }] },
  { id: 'm3', jag: true, typ: 'pos', tid: '14.10' },
  { id: 'm4', jag: false, text: 'Perfekt, tack. Då siktar vi på fredag nästa gång.', tid: '14.31', svarPa: 'm2' },
  { id: 'm5', jag: false, typ: 'bild', tid: '14.31' },
  { id: 'm6', jag: false, text: 'Vi lägger till vid Sandhamn runt tre. Kommer ni?', tid: '14.32' },
  { id: 'm7', jag: false, typ: 'tur', tid: '14.32' },
]

const MOTPART = 'linnea.seglar'
const MOTPART_BILD = '/kreativ/scen-eka.webp'
const UTKAST = 'Vi kommer! Lägger oss bredvid er om det finns plats vid bryggan.'
const POS = { namn: 'Grinda Södra bryggan', lat: 59.407287, lng: 18.553135 }
const TUR = { namn: 'Vaxholm till Grinda', nm: '9,4', bild: '/kreativ/scen-angbat.webp' }
const BILD = '/kreativ/scen-o-kvall.webp'
const REAKTIONER = ['👍', '❤️', '😂', '⛵', '🙌', '😮']

// ─── Ikoner ──────────────────────────────────────────────────────────────────

const P = {
  bak: 'M15 19l-7-7 7-7',
  plus: 'M12 5v14M5 12h14',
  upp: 'M12 19V5M5 12l7-7 7 7',
  sok: 'M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z',
  penna: 'M4 20h4L18.5 9.5a2.1 2.1 0 00-3-3L5 17v3zM13.5 6.5l3 3',
  nal: 'M12 21s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12zM12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  bild: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01',
  rutt: 'M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM8 17h7a3 3 0 000-6H9a3 3 0 010-6h7',
  mer: 'M5 12h.01M12 12h.01M19 12h.01',
  svar: 'M9 14L4 9l5-5M4 9h10a6 6 0 016 6v4',
  kopiera: 'M9 9h10v10H9zM5 15V5h10',
  smil: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 14.5s1.3 2 3.5 2 3.5-2 3.5-2M9 9.5h.01M15 9.5h.01',
  stang: 'M6 6l12 12M18 6L6 18',
  karta: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  bock: 'M5 12.5l4.5 4.5L19 7.5',
  bock2: 'M2 12.5l4.5 4.5L16 7.5M11 15l2 2 9.5-9.5',
  moln: 'M7 18h10a4 4 0 00.5-8 6 6 0 00-11.6 1.5A3.3 3.3 0 007 18zM4 4l16 16',
}

function Ikon({ d, s = 20, w = 2, fyll = 'none' }: { d: string; s?: number; w?: number; fyll?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill={fyll} stroke="currentColor" strokeWidth={w}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} />
    </svg>
  )
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

/** Riktig profilbild när den finns, annars en lugn mjuk platta med initialer. */
function Avatar({ namn, s, bild, online }: { namn: string; s: number; bild?: string; online?: boolean }) {
  return (
    <div style={{ position: 'relative', width: s, height: s, flexShrink: 0 }}>
      {bild ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bild} alt="" width={s} height={s} className="pm-av-bild" style={{ width: s, height: s }} />
      ) : (
        <div className="pm-av-fall" style={{ width: s, height: s, fontSize: Math.round(s * 0.38), ['--av' as string]: avatarGradient(namn) }}>
          <span>{initialsOf(namn).slice(0, 1)}</span>
        </div>
      )}
      {online && <span className="pm-online" style={{ width: Math.max(10, s * 0.26), height: Math.max(10, s * 0.26) }} />}
    </div>
  )
}

function GruppAvatar({ namn, s }: { namn: string[]; s: number }) {
  const liten = Math.round(s * 0.66)
  return (
    <div style={{ position: 'relative', width: s, height: s, flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><Avatar namn={namn[1] ?? 'b'} s={liten} /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, borderRadius: '50%', boxShadow: '0 0 0 2.5px var(--pm-yta)' }}><Avatar namn={namn[0] ?? 'a'} s={liten} /></div>
    </div>
  )
}

// ─── Sjökortskort ────────────────────────────────────────────────────────────

/** Statisk mosaik av riktiga tiles (OSM + OpenSeaMap) med nålen i mitten. */
function Sjokort({ lat, lng, hojd, z = 14 }: { lat: number; lng: number; hojd: number; z?: number }) {
  const n = 2 ** z
  const xf = ((lng + 180) / 360) * n
  const r = (lat * Math.PI) / 180
  const yf = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n
  const xi = Math.floor(xf)
  const yi = Math.floor(yf)
  // Nålens läge i en 3×3-mosaik (768×768) räknat från mosaikens hörn
  const px = 256 + (xf - xi) * 256
  const py = 256 + (yf - yi) * 256
  const tiles: { x: number; y: number; dx: number; dy: number }[] = []
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) tiles.push({ x: xi + dx, y: yi + dy, dx: dx + 1, dy: dy + 1 })
  return (
    <div className="pm-karta" style={{ height: hojd }}>
      <div className="pm-mosaik" style={{ left: `calc(50% - ${px}px)`, top: `calc(50% - ${py + 10}px)` }}>
        <div className="pm-bas">
          {tiles.map(t => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`b${t.x}-${t.y}`} src={`https://tile.openstreetmap.org/${z}/${t.x}/${t.y}.png`} alt="" width={256} height={256}
              style={{ left: t.dx * 256, top: t.dy * 256 }} />
          ))}
        </div>
        {tiles.map(t => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`s${t.x}-${t.y}`} src={`https://tiles.openseamap.org/seamark/${z}/${t.x}/${t.y}.png`} alt="" width={256} height={256}
            style={{ left: t.dx * 256, top: t.dy * 256 }} />
        ))}
      </div>
      <div className="pm-nal" aria-hidden="true">
        <span className="pm-nal-puls" />
        <svg viewBox="0 0 24 32" width="26" height="34"><path d="M12 31s10-10.2 10-18A10 10 0 002 13c0 7.8 10 18 10 18z" fill="var(--pm-acc)" stroke="#fff" strokeWidth="2" /><circle cx="12" cy="13" r="4" fill="#fff" /></svg>
      </div>
      <div className="pm-attr">© OpenStreetMap · OpenSeaMap</div>
    </div>
  )
}

// ─── Komponenten ─────────────────────────────────────────────────────────────

export default function Premium({ tema, vy, lage }: { tema: Tema; vy: Vy; lage: Lage }) {
  const [medd, setMedd] = useState<Medd[]>(START)
  const [text, setText] = useState(UTKAST)
  const [svarPa, setSvarPa] = useState<string | null>(null)
  const [meny, setMeny] = useState<string | null>(null)
  const [plus, setPlus] = useState(false)
  const [ljuslada, setLjuslada] = useState(false)
  const [kopierad, setKopierad] = useState(false)
  const [skriver, setSkriver] = useState(true)
  const lista = useRef<HTMLDivElement>(null)
  const falt = useRef<HTMLTextAreaElement>(null)
  const tryck = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { lista.current?.scrollTo({ top: lista.current.scrollHeight }) }, [medd.length])
  useEffect(() => {
    const f = falt.current
    if (!f) return
    f.style.height = 'auto'
    f.style.height = Math.min(f.scrollHeight, 132) + 'px'
  }, [text])
  useEffect(() => {
    const stang = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMeny(null); setPlus(false); setLjuslada(false) } }
    window.addEventListener('keydown', stang)
    return () => window.removeEventListener('keydown', stang)
  }, [])

  const hitta = (id: string | null | undefined) => medd.find(m => m.id === id)

  function skicka() {
    const t = text.trim()
    if (!t) return
    setMedd(m => [...m, { id: `n${m.length}`, jag: true, text: t, tid: '14.34', svarPa: svarPa ?? undefined }])
    setText('')
    setSvarPa(null)
    setSkriver(false)
  }

  function reagera(id: string, e: string) {
    setMedd(ms => ms.map(m => {
      if (m.id !== id) return m
      const r = [...(m.reaktioner ?? [])]
      const i = r.findIndex(x => x.e === e)
      if (i >= 0) {
        const x = r[i]!
        if (x.min) { if (x.n <= 1) r.splice(i, 1); else r[i] = { ...x, n: x.n - 1, min: false } }
        else r[i] = { ...x, n: x.n + 1, min: true }
      } else r.push({ e, n: 1, min: true })
      return { ...m, reaktioner: r }
    }))
    setMeny(null)
  }

  const starta = (id: string) => { tryck.current = setTimeout(() => setMeny(id), 420) }
  const slapp = () => { if (tryck.current) clearTimeout(tryck.current) }

  const sistaEgna = [...medd].reverse().find(m => m.jag)

  // ── Inkorg ──────────────────────────────────────────────────────────────
  const inkorg = (
    <section className="pm-inkorg" aria-label="Samtal">
      <header className="pm-ink-huvud">
        <h1>Meddelanden</h1>
        <button className="pm-rund" aria-label="Nytt meddelande"><Ikon d={P.penna} s={19} /></button>
      </header>
      <div className="pm-sok"><Ikon d={P.sok} s={17} /><span>Sök i meddelanden</span></div>

      {lage === 'laddar' && (
        <div className="pm-rader" aria-busy="true">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="pm-rad"><div className="pm-skel" style={{ width: 52, height: 52, borderRadius: '50%' }} />
              <div style={{ flex: 1, display: 'grid', gap: 8 }}><div className="pm-skel" style={{ width: `${48 + i * 7}%`, height: 13 }} /><div className="pm-skel" style={{ width: `${70 - i * 5}%`, height: 11 }} /></div>
            </div>
          ))}
        </div>
      )}

      {lage === 'fel' && (
        <div className="pm-tomt">
          <div className="pm-tomt-ikon"><Ikon d={P.moln} s={28} w={1.8} /></div>
          <h2>Kunde inte hämta dina samtal</h2>
          <p>Kontrollera uppkopplingen. Inget du skrivit har försvunnit.</p>
          <button className="pm-knapp">Försök igen</button>
        </div>
      )}

      {lage === 'tom' && (
        <div className="pm-tomt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kreativ/scen-fyr.webp" alt="" width={148} height={148} className="pm-tomt-bild" />
          <h2>Inga samtal än</h2>
          <p>Skriv till någon du följer, eller dela en position med ditt sällskap inför helgen.</p>
          <button className="pm-knapp"><Ikon d={P.penna} s={17} /> Skriv ett meddelande</button>
        </div>
      )}

      {lage === 'normal' && (
        <div className="pm-rader">
          <div className="pm-rubrik">Idag</div>
          {RADER.slice(0, 2).map(r => radVy(r))}
          <div className="pm-rubrik">Tidigare</div>
          {RADER.slice(2).map(r => radVy(r))}
        </div>
      )}
    </section>
  )

  function radVy(r: Rad) {
    const vald = r.id === 'r1'
    const typIkon = r.typ === 'pos' ? P.nal : r.typ === 'tur' ? P.rutt : r.typ === 'bild' ? P.bild : null
    return (
      <a key={r.id} href={`?tema=${tema}&vy=samtal`} className={`pm-rad${vald ? ' pm-vald' : ''}${r.olasta ? ' pm-oläst' : ''}`}>
        {r.grupp ? <GruppAvatar namn={r.grupp} s={52} /> : <Avatar namn={r.namn} s={52} bild={r.bild} online={r.id === 'r1'} />}
        <div className="pm-rad-mitt">
          <div className="pm-rad-topp">
            <span className="pm-rad-namn">{r.namn}</span>
            <span className={`pm-rad-tid${r.olasta ? ' pm-acc' : ''}`}>{r.tid}</span>
          </div>
          <div className="pm-rad-under">
            {r.skriver && skriver ? (
              <span className="pm-rad-skriver"><Prickar liten /> skriver…</span>
            ) : (
              <span className="pm-rad-text">
                {r.avMig && <span className="pm-rad-du">{r.sett ? <Ikon d={P.bock2} s={15} /> : null}Du: </span>}
                {typIkon && <span className="pm-rad-typ"><Ikon d={typIkon} s={14} /></span>}
                {r.forhands}
              </span>
            )}
            {r.olasta > 0 && <span className="pm-bricka">{r.olasta}</span>}
          </div>
        </div>
      </a>
    )
  }

  // ── Samtal ──────────────────────────────────────────────────────────────
  const svarMedd = hitta(svarPa)

  const samtal = (
    <section className="pm-samtal" aria-label={`Samtal med ${MOTPART}`}>
      <header className="pm-sam-huvud">
        <a href={`?tema=${tema}&vy=inkorg`} className="pm-rund pm-bara-mobil" aria-label="Tillbaka till inkorgen"><Ikon d={P.bak} s={22} /></a>
        <Avatar namn={MOTPART} s={38} bild={MOTPART_BILD} online />
        <div className="pm-sam-vem">
          <div className="pm-sam-namn">{MOTPART}</div>
          <div className={`pm-sam-status${skriver ? ' pm-acc' : ''}`}>{skriver ? 'skriver…' : 'Aktiv nu'}</div>
        </div>
        <button className="pm-rund" aria-label="Mer"><Ikon d={P.mer} s={22} w={3} /></button>
      </header>

      {lage === 'laddar' ? (
        <div className="pm-flode" aria-busy="true">
          {[62, 44, 70, 38, 56].map((w, i) => (
            <div key={i} className={`pm-rad-b ${i % 2 ? 'pm-hoger' : ''}`}><div className="pm-skel" style={{ width: `${w}%`, height: 42, borderRadius: 20 }} /></div>
          ))}
        </div>
      ) : lage === 'fel' ? (
        <div className="pm-flode"><div className="pm-tomt"><div className="pm-tomt-ikon"><Ikon d={P.moln} s={28} w={1.8} /></div><h2>Samtalet kunde inte laddas</h2><button className="pm-knapp">Försök igen</button></div></div>
      ) : lage === 'tom' ? (
        <div className="pm-flode"><div className="pm-tomt"><Avatar namn={MOTPART} s={72} bild={MOTPART_BILD} /><h2>{MOTPART}</h2><p>Säg hej. Ni följer varandra på Svalla.</p></div></div>
      ) : (
        <div className="pm-flode" ref={lista} onClick={() => setMeny(null)}>
          <div className="pm-dag"><span>Idag</span></div>
          {medd.map((m, i) => {
            const fore = medd[i - 1]
            const efter = medd[i + 1]
            const forst = !fore || fore.jag !== m.jag
            const sist = !efter || efter.jag !== m.jag
            const ref = hitta(m.svarPa)
            const kort = m.typ === 'pos' || m.typ === 'tur' || m.typ === 'bild'
            const tidsluck = fore && fore.tid !== m.tid && forst
            return (
              <div key={m.id}>
                {tidsluck && <div className="pm-tidsrad">{m.tid}</div>}
                <div className={`pm-rad-b ${m.jag ? 'pm-hoger' : ''} ${sist ? 'pm-sist' : ''} ${m.id.startsWith('n') ? 'pm-ny' : ''}`}>
                  {!m.jag && <div className="pm-av-plats">{sist && <Avatar namn={MOTPART} s={28} bild={MOTPART_BILD} />}</div>}
                  <div className="pm-bubbla-kol">
                    <div
                      className={`pm-bubbla ${m.jag ? 'pm-egen' : 'pm-deras'} ${kort ? 'pm-kort' : ''} ${forst ? 'pm-forst' : ''} ${sist ? 'pm-sistb' : ''} ${meny === m.id ? 'pm-aktiv' : ''}`}
                      onPointerDown={() => starta(m.id)} onPointerUp={slapp} onPointerLeave={slapp}
                      onContextMenu={e => { e.preventDefault(); setMeny(m.id) }}
                    >
                      {ref && (
                        <div className="pm-citat">
                          <div className="pm-citat-vem">{ref.jag ? 'Du' : MOTPART}</div>
                          <div className="pm-citat-text">{ref.text ?? (ref.typ === 'pos' ? 'Position' : ref.typ === 'tur' ? 'Tur' : 'Bild')}</div>
                        </div>
                      )}
                      {m.text && <span className="pm-text">{m.text}</span>}
                      {m.typ === 'pos' && (
                        <div className="pm-pos">
                          <Sjokort lat={POS.lat} lng={POS.lng} hojd={150} />
                          <div className="pm-kort-fot">
                            <div className="pm-kort-ikon"><Ikon d={P.nal} s={17} /></div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div className="pm-kort-titel">{POS.namn}</div>
                              <div className="pm-kort-under">{POS.lat.toFixed(4).replace('.', ',')}° N, {POS.lng.toFixed(4).replace('.', ',')}° O</div>
                            </div>
                          </div>
                          <div className="pm-kort-knappar">
                            <a href={`https://map.openseamap.org/?zoom=15&lat=${POS.lat}&lon=${POS.lng}&mlat=${POS.lat}&mlon=${POS.lng}`} target="_blank" rel="noreferrer"><Ikon d={P.karta} s={16} /> Öppna sjökort</a>
                            <button onClick={e => { e.stopPropagation(); setKopierad(true); setTimeout(() => setKopierad(false), 1600) }}><Ikon d={kopierad ? P.bock : P.kopiera} s={16} /> {kopierad ? 'Kopierat' : 'Kopiera'}</button>
                          </div>
                        </div>
                      )}
                      {m.typ === 'tur' && (
                        <div className="pm-tur">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={TUR.bild} alt="" className="pm-tur-bild" />
                          <div className="pm-kort-fot">
                            <div className="pm-kort-ikon"><Ikon d={P.rutt} s={17} /></div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div className="pm-kort-titel">{TUR.namn}</div>
                              <div className="pm-kort-under">{TUR.nm} NM · loggad tur</div>
                            </div>
                          </div>
                          <div className="pm-kort-knappar"><a href="#">Visa turen</a></div>
                        </div>
                      )}
                      {m.typ === 'bild' && (
                        <button className="pm-bild" onClick={e => { e.stopPropagation(); setLjuslada(true) }} aria-label="Visa bilden större">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={BILD} alt="Bild från linnea.seglar" />
                        </button>
                      )}
                    </div>

                    {m.reaktioner && m.reaktioner.length > 0 && (
                      <div className={`pm-reak ${m.jag ? 'pm-reak-h' : ''}`}>
                        {m.reaktioner.map(r => (
                          <button key={r.e} className={r.min ? 'pm-reak-min' : ''} onClick={() => reagera(m.id, r.e)} aria-label={`${r.e} ${r.n}`}>
                            <span>{r.e}</span>{r.n > 1 && <span className="pm-reak-n">{r.n}</span>}
                          </button>
                        ))}
                      </div>
                    )}

                    {meny === m.id && (
                      <div className={`pm-meny ${m.jag ? 'pm-meny-h' : ''}`} onClick={e => e.stopPropagation()} role="menu">
                        <div className="pm-meny-emoji">
                          {REAKTIONER.map(e => <button key={e} onClick={() => reagera(m.id, e)} aria-label={`Reagera ${e}`}>{e}</button>)}
                        </div>
                        <div className="pm-meny-val">
                          <button onClick={() => { setSvarPa(m.id); setMeny(null); falt.current?.focus() }}><Ikon d={P.svar} s={18} /> Svara</button>
                          {m.text && <button onClick={() => setMeny(null)}><Ikon d={P.kopiera} s={18} /> Kopiera text</button>}
                        </div>
                      </div>
                    )}

                    {m.id === sistaEgna?.id && (
                      <div className="pm-status">{m.id.startsWith('n') ? <>Skickat</> : <><Ikon d={P.bock2} s={14} /> Sett 14.31</>}</div>
                    )}
                  </div>

                  <div className="pm-hover">
                    <button onClick={e => { e.stopPropagation(); setMeny(m.id) }} aria-label="Reagera"><Ikon d={P.smil} s={17} /></button>
                    <button onClick={e => { e.stopPropagation(); setSvarPa(m.id); falt.current?.focus() }} aria-label="Svara"><Ikon d={P.svar} s={17} /></button>
                  </div>
                </div>
              </div>
            )
          })}
          {skriver && (
            <div className="pm-rad-b pm-sist">
              <div className="pm-av-plats"><Avatar namn={MOTPART} s={28} bild={MOTPART_BILD} /></div>
              <div className="pm-bubbla pm-deras pm-forst pm-sistb pm-skriv-bubbla" aria-label={`${MOTPART} skriver`}><Prickar /></div>
            </div>
          )}
        </div>
      )}

      <div className="pm-komp">
        {svarMedd && (
          <div className="pm-svarsrad">
            <Ikon d={P.svar} s={17} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="pm-citat-vem">Svarar {svarMedd.jag ? 'dig själv' : MOTPART}</div>
              <div className="pm-citat-text">{svarMedd.text ?? (svarMedd.typ === 'pos' ? 'Position' : svarMedd.typ === 'tur' ? 'Tur' : 'Bild')}</div>
            </div>
            <button className="pm-rund pm-liten" onClick={() => setSvarPa(null)} aria-label="Avbryt svar"><Ikon d={P.stang} s={16} /></button>
          </div>
        )}
        <div className="pm-komp-rad">
          <button className={`pm-rund pm-plus ${plus ? 'pm-plus-oppen' : ''}`} onClick={() => setPlus(p => !p)} aria-label="Bifoga" aria-expanded={plus}><Ikon d={P.plus} s={22} /></button>
          <div className="pm-falt">
            <textarea ref={falt} rows={1} value={text} onChange={e => setText(e.target.value)} placeholder="Skriv ett meddelande"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); skicka() } }} aria-label="Meddelande" />
          </div>
          <button className={`pm-skicka ${text.trim() ? 'pm-redo' : ''}`} onClick={skicka} disabled={!text.trim()} aria-label="Skicka"><Ikon d={P.upp} s={20} w={2.4} /></button>
        </div>
        {plus && (
          <div className="pm-plusark" role="menu">
            <button onClick={() => setPlus(false)}><span className="pm-pi" style={{ ['--pi' as string]: 'var(--pm-sea)' }}><Ikon d={P.bild} s={20} /></span>Bild</button>
            <button onClick={() => setPlus(false)}><span className="pm-pi" style={{ ['--pi' as string]: 'var(--pm-acc)' }}><Ikon d={P.nal} s={20} /></span>Position</button>
            <button onClick={() => setPlus(false)}><span className="pm-pi" style={{ ['--pi' as string]: 'var(--pm-thor)' }}><Ikon d={P.rutt} s={20} /></span>Tur</button>
          </div>
        )}
      </div>
    </section>
  )

  const lank = (t: Tema, l: Lage) => `?tema=${t}&vy=${vy}&lage=${l}`

  return (
    <div className={`pm-rot pm-vy-${vy}`} data-theme={tema === 'mork' ? 'dark' : 'light'}>
      <style>{CSS}</style>
      <Sidomeny />
      <div className="pm-ytor">
        {inkorg}
        {samtal}
      </div>

      <nav className="pm-kontroll" aria-label="Förhandsvisningens val">
        <span className="pm-kontroll-mark">Förhandsvisning · exempeldata</span>
        <a href={lank(tema === 'mork' ? 'ljust' : 'mork', lage)}>{tema === 'mork' ? 'Ljust' : 'Mörkt'}</a>
        {(['normal', 'tom', 'laddar', 'fel'] as Lage[]).map(l => (
          <a key={l} href={lank(tema, l)} className={l === lage ? 'pm-k-vald' : ''}>{l === 'normal' ? 'Samtal' : l === 'tom' ? 'Tomt' : l === 'laddar' ? 'Laddar' : 'Fel'}</a>
        ))}
        <button onClick={() => setSkriver(s => !s)}>{skriver ? 'Stoppa skriver' : 'Visa skriver'}</button>
      </nav>

      {ljuslada && (
        <div className="pm-ljus" onClick={() => setLjuslada(false)} role="dialog" aria-label="Bild">
          <button className="pm-ljus-stang" aria-label="Stäng"><Ikon d={P.stang} s={22} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BILD} alt="Bild från linnea.seglar" />
          <div className="pm-ljus-fot">{MOTPART} · idag 14.31</div>
        </div>
      )}
    </div>
  )
}

function Prickar({ liten }: { liten?: boolean }) {
  return <span className={`pm-prickar ${liten ? 'pm-prickar-l' : ''}`} aria-hidden="true"><i /><i /><i /></span>
}

function Sidomeny() {
  const punkt = (t: string, aktiv = false) => <div key={t} className={`pm-sm-punkt${aktiv ? ' pm-sm-aktiv' : ''}`}>{t}</div>
  return (
    <aside className="pm-sidomeny" aria-hidden="true">
      <div className="pm-sm-logo">SVALLA</div>
      <div className="pm-sm-logga">+ Logga tur</div>
      {punkt('Utforska')}{punkt('Planera')}{punkt('Flöde')}{punkt('Sök')}{punkt('Meddelanden', true)}{punkt('Notiser')}
    </aside>
  )
}

// ─── Stil ────────────────────────────────────────────────────────────────────

const CSS = `
.pm-rot{
  --pm-sea:var(--sea);--pm-acc:var(--acc);--pm-thor:var(--thor);
  --pm-bg:var(--bg);--pm-yta:var(--white);--pm-txt:var(--txt);--pm-txt2:var(--txt2);--pm-txt3:var(--txt3);
  --pm-linje:rgba(25,40,48,.08);--pm-deras:#efe8dc;--pm-deras-txt:var(--txt);
  --pm-egen:#1e5c82;--pm-egen-txt:#fff;--pm-vald:rgba(30,92,130,.08);--pm-skugga:0 1px 2px rgba(20,40,60,.06),0 6px 20px rgba(20,40,60,.06);
  --pm-glas:rgba(255,253,248,.86);
  position:fixed;inset:0;display:flex;background:var(--pm-bg);color:var(--pm-txt);
  font-family:inherit;-webkit-font-smoothing:antialiased;z-index:50;
}
.pm-rot[data-theme="dark"]{
  --pm-linje:rgba(216,234,244,.08);--pm-deras:#16283a;--pm-deras-txt:var(--txt);
  --pm-egen:#1c7f98;--pm-vald:rgba(74,184,212,.1);--pm-skugga:0 1px 2px rgba(0,0,0,.3),0 8px 24px rgba(0,0,0,.25);
  --pm-glas:rgba(15,30,44,.86);
}
.pm-rot *{box-sizing:border-box}
.pm-rot button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}
.pm-rot a{color:inherit;text-decoration:none}
.pm-acc{color:var(--pm-acc)!important}

/* Sidomeny (ersätter appens riktiga meny i förhandsvisningen) */
.pm-sidomeny{display:none;width:212px;flex-shrink:0;background:var(--pm-yta);border-right:1px solid var(--pm-linje);padding:22px 10px;flex-direction:column;gap:2px}
.pm-sm-logo{font-weight:700;letter-spacing:3px;color:var(--pm-sea);font-size:13px;padding:0 14px 22px}
.pm-sm-logga{height:42px;border-radius:12px;background:var(--sea-knapp);color:#fff;font-weight:600;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.pm-sm-punkt{height:42px;display:flex;align-items:center;padding:0 14px;border-radius:12px;font-size:15px;font-weight:500;color:var(--pm-txt2)}
.pm-sm-aktiv{font-weight:600;color:var(--pm-sea);background:var(--pm-vald)}

.pm-ytor{flex:1;display:flex;min-width:0;min-height:0}

/* Inkorg */
.pm-inkorg{width:100%;display:flex;flex-direction:column;min-height:0;background:var(--pm-yta)}
.pm-ink-huvud{display:flex;align-items:center;justify-content:space-between;padding:calc(14px + env(safe-area-inset-top)) 16px 8px 20px}
.pm-ink-huvud h1{font-size:28px;font-weight:700;letter-spacing:-.5px;margin:0}
.pm-rund{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--pm-sea);transition:background .15s}
.pm-rund:hover{background:var(--pm-vald)}
.pm-liten{width:32px;height:32px;color:var(--pm-txt3)}
.pm-sok{margin:4px 16px 10px;height:40px;border-radius:12px;background:var(--pm-bg);display:flex;align-items:center;gap:8px;padding:0 12px;color:var(--pm-txt3);font-size:15px}
.pm-rader{flex:1;overflow-y:auto;padding:0 8px 24px}
.pm-rubrik{font-size:12px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;color:var(--pm-txt3);padding:14px 12px 6px}
.pm-rad{display:flex;align-items:center;gap:13px;padding:10px 12px;border-radius:16px;min-height:72px;transition:background .15s}
.pm-rad:hover{background:var(--pm-vald)}
.pm-rad-mitt{flex:1;min-width:0;display:grid;gap:3px}
.pm-rad-topp{display:flex;align-items:baseline;gap:8px}
.pm-rad-namn{flex:1;min-width:0;font-size:16px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pm-oläst .pm-rad-namn{font-weight:700}
.pm-rad-tid{font-size:13px;color:var(--pm-txt3);font-variant-numeric:tabular-nums}
.pm-rad-under{display:flex;align-items:center;gap:8px}
.pm-rad-text{flex:1;min-width:0;font-size:14.5px;color:var(--pm-txt3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:4px}
.pm-oläst .pm-rad-text{color:var(--pm-txt);font-weight:500}
.pm-rad-du{display:inline-flex;align-items:center;gap:3px;color:var(--pm-txt3);flex-shrink:0}
.pm-rad-du svg{color:var(--pm-sea)}
.pm-rad-typ{display:inline-flex;color:var(--pm-txt3);flex-shrink:0}
.pm-rad-skriver{flex:1;font-size:14.5px;color:var(--pm-acc);font-weight:500;display:flex;align-items:center;gap:6px}
.pm-bricka{min-width:22px;height:22px;padding:0 7px;border-radius:11px;background:var(--pm-acc);color:#fff;font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center}
.pm-rot[data-theme="dark"] .pm-bricka{color:#1a0e05}
.pm-vald{background:var(--pm-vald)}

/* Avatarer */
.pm-av-bild{border-radius:50%;object-fit:cover;display:block;background:var(--pm-deras)}
.pm-av-fall{border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;
  background:var(--pm-deras);color:var(--pm-txt);font-weight:600}
.pm-av-fall::before{content:"";position:absolute;inset:0;background:var(--av);opacity:.22}
.pm-av-fall span{position:relative}
.pm-online{position:absolute;right:0;bottom:0;border-radius:50%;background:#2e9e6a;box-shadow:0 0 0 2.5px var(--pm-yta)}

/* Samtal */
.pm-samtal{display:none;flex:1;min-width:0;flex-direction:column;min-height:0;background:var(--pm-bg);position:relative}
.pm-sam-huvud{display:flex;align-items:center;gap:10px;padding:calc(8px + env(safe-area-inset-top)) 10px 8px 8px;background:var(--pm-glas);
  backdrop-filter:saturate(1.6) blur(16px);-webkit-backdrop-filter:saturate(1.6) blur(16px);border-bottom:1px solid var(--pm-linje);position:relative;z-index:3}
.pm-sam-vem{flex:1;min-width:0}
.pm-sam-namn{font-size:16px;font-weight:600}
.pm-sam-status{font-size:13px;color:var(--pm-txt3);transition:color .2s}
.pm-flode{flex:1;overflow-y:auto;padding:12px 12px 8px;display:flex;flex-direction:column}
.pm-flode > div:first-child{margin-top:auto}
.pm-dag{display:flex;justify-content:center;margin:6px 0 14px}
.pm-dag span{font-size:12.5px;font-weight:600;color:var(--pm-txt3);padding:4px 12px;border-radius:999px;background:var(--pm-yta);box-shadow:var(--pm-skugga)}
.pm-tidsrad{text-align:center;font-size:12px;color:var(--pm-txt3);margin:14px 0 8px;font-variant-numeric:tabular-nums}

.pm-rad-b{display:flex;align-items:flex-end;gap:8px;margin-top:2px;position:relative}
.pm-rad-b.pm-sist{margin-bottom:10px}
.pm-hoger{flex-direction:row-reverse}
.pm-av-plats{width:28px;flex-shrink:0}
.pm-bubbla-kol{display:flex;flex-direction:column;max-width:min(78%,520px);position:relative}
.pm-hoger .pm-bubbla-kol{align-items:flex-end}

.pm-bubbla{position:relative;padding:9px 14px 10px;font-size:16px;line-height:1.38;border-radius:20px;word-wrap:break-word;
  transition:transform .18s cubic-bezier(.2,.8,.2,1),filter .18s;-webkit-touch-callout:none;user-select:text}
.pm-deras{background:var(--pm-deras);color:var(--pm-deras-txt)}
.pm-egen{background:var(--pm-egen);color:var(--pm-egen-txt)}
.pm-deras:not(.pm-forst){border-top-left-radius:6px}
.pm-deras:not(.pm-sistb){border-bottom-left-radius:6px}
.pm-egen:not(.pm-forst){border-top-right-radius:6px}
.pm-egen:not(.pm-sistb){border-bottom-right-radius:6px}
.pm-aktiv{transform:scale(1.02);filter:brightness(1.03)}
.pm-kort{padding:4px;overflow:hidden}
.pm-kort .pm-citat{margin:6px 8px 4px}

.pm-citat{border-left:3px solid currentColor;padding:4px 10px;margin:0 0 6px;border-radius:4px 10px 10px 4px;background:rgba(0,0,0,.06);opacity:.92}
.pm-egen .pm-citat{background:rgba(255,255,255,.14)}
.pm-rot[data-theme="dark"] .pm-deras .pm-citat{background:rgba(255,255,255,.06)}
.pm-citat-vem{font-size:12.5px;font-weight:700;opacity:.85}
.pm-citat-text{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:300px;opacity:.85}

/* Kort i bubblor */
.pm-pos,.pm-tur{width:min(300px,64vw);background:var(--pm-yta);color:var(--pm-txt);border-radius:16px;overflow:hidden}
.pm-karta{position:relative;overflow:hidden;background:#aad3df}
.pm-mosaik{position:absolute;width:768px;height:768px}
.pm-mosaik img,.pm-bas img{position:absolute;width:256px;height:256px;max-width:none;user-select:none;-webkit-user-drag:none}
.pm-bas{position:absolute;inset:0}
.pm-rot[data-theme="dark"] .pm-bas{filter:invert(1) hue-rotate(180deg) brightness(.92) contrast(.9)}
.pm-nal{position:absolute;left:50%;top:50%;transform:translate(-50%,-100%);filter:drop-shadow(0 3px 4px rgba(0,0,0,.25))}
.pm-nal svg{display:block;position:relative}
.pm-nal-puls{position:absolute;left:50%;bottom:-6px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:var(--pm-acc);opacity:.35;animation:pm-puls 2.4s ease-out infinite}
.pm-attr{position:absolute;right:6px;bottom:5px;font-size:10px;padding:1px 6px;border-radius:6px;background:rgba(255,255,255,.82);color:#3d5865}
.pm-rot[data-theme="dark"] .pm-attr{background:rgba(7,15,24,.75);color:#9abccc}
.pm-kort-fot{display:flex;align-items:center;gap:10px;padding:11px 12px 6px}
.pm-kort-ikon{width:34px;height:34px;border-radius:10px;background:var(--pm-vald);color:var(--pm-sea);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pm-kort-titel{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pm-kort-under{font-size:13px;color:var(--pm-txt3);font-variant-numeric:tabular-nums}
.pm-kort-knappar{display:flex;gap:6px;padding:6px 8px 8px}
.pm-kort-knappar a,.pm-kort-knappar button{flex:1;height:38px;border-radius:11px;background:var(--pm-bg);display:flex;align-items:center;justify-content:center;gap:6px;font-size:14px;font-weight:600;color:var(--pm-sea)!important;transition:background .15s}
.pm-kort-knappar a:hover,.pm-kort-knappar button:hover{background:var(--pm-vald)}
.pm-tur-bild{display:block;width:100%;height:150px;object-fit:cover;background:var(--pm-deras)}
.pm-bild{display:block;border-radius:16px;overflow:hidden;width:min(280px,60vw);aspect-ratio:4/5}
.pm-bild img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
.pm-bild:hover img{transform:scale(1.02)}

/* Reaktioner */
.pm-reak{display:flex;gap:4px;margin:-8px 10px 0;position:relative;z-index:1}
.pm-reak-h{justify-content:flex-end}
.pm-reak button{height:26px;min-width:30px;padding:0 7px;border-radius:13px;background:var(--pm-yta);box-shadow:0 0 0 2px var(--pm-bg),var(--pm-skugga);display:flex;align-items:center;gap:3px;font-size:14px;animation:pm-pop .22s cubic-bezier(.2,.9,.3,1.4)}
.pm-reak-min{background:var(--pm-vald)!important}
.pm-reak-n{font-size:12px;font-weight:600;color:var(--pm-txt2)}

/* Meny vid långtryck / hover */
.pm-meny{position:absolute;bottom:calc(100% + 8px);left:0;z-index:10;background:var(--pm-yta);border-radius:18px;box-shadow:0 10px 40px rgba(10,25,40,.22),0 0 0 1px var(--pm-linje);overflow:hidden;animation:pm-upp .18s cubic-bezier(.2,.8,.2,1);transform-origin:bottom left;min-width:240px}
.pm-meny-h{left:auto;right:0;transform-origin:bottom right}
.pm-meny-emoji{display:flex;gap:2px;padding:6px 8px;border-bottom:1px solid var(--pm-linje)}
.pm-meny-emoji button{width:40px;height:40px;border-radius:50%;font-size:22px;transition:transform .12s,background .12s}
.pm-meny-emoji button:hover{transform:scale(1.18);background:var(--pm-vald)}
.pm-meny-val button{display:flex;align-items:center;gap:10px;width:100%;height:46px;padding:0 16px;font-size:15px;color:var(--pm-txt)}
.pm-meny-val button:hover{background:var(--pm-vald)}
.pm-meny-val svg{color:var(--pm-txt3)}

.pm-hover{display:none;align-self:center;gap:2px;opacity:0;transition:opacity .15s}
.pm-hover button{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--pm-txt3)}
.pm-hover button:hover{background:var(--pm-vald);color:var(--pm-sea)}

.pm-status{font-size:12px;color:var(--pm-txt3);margin:4px 4px 0;display:flex;align-items:center;gap:3px;animation:pm-in .25s ease}
.pm-status svg{color:var(--pm-sea)}

/* Skriver */
.pm-skriv-bubbla{padding:13px 16px;animation:pm-in .25s ease}
.pm-prickar{display:inline-flex;gap:4px;align-items:center}
.pm-prickar i{width:7px;height:7px;border-radius:50%;background:var(--pm-txt3);animation:pm-prick 1.3s infinite ease-in-out}
.pm-prickar i:nth-child(2){animation-delay:.16s}.pm-prickar i:nth-child(3){animation-delay:.32s}
.pm-prickar-l i{width:5px;height:5px;background:var(--pm-acc)}
.pm-ny{animation:pm-in .28s cubic-bezier(.2,.8,.2,1)}

/* Skrivfält */
.pm-komp{padding:8px 10px calc(10px + env(safe-area-inset-bottom));background:var(--pm-glas);backdrop-filter:saturate(1.6) blur(16px);-webkit-backdrop-filter:saturate(1.6) blur(16px);border-top:1px solid var(--pm-linje);position:relative;z-index:3}
.pm-svarsrad{display:flex;align-items:center;gap:10px;padding:6px 6px 10px 10px;color:var(--pm-sea);animation:pm-in .2s ease}
.pm-svarsrad .pm-citat-vem{color:var(--pm-sea)}
.pm-svarsrad .pm-citat-text{color:var(--pm-txt2);max-width:none}
.pm-komp-rad{display:flex;align-items:flex-end;gap:6px}
.pm-plus{flex-shrink:0;transition:transform .2s cubic-bezier(.2,.8,.2,1),background .15s}
.pm-plus-oppen{transform:rotate(45deg);background:var(--pm-vald)}
.pm-falt{flex:1;min-width:0;background:var(--pm-yta);border-radius:22px;box-shadow:inset 0 0 0 1px var(--pm-linje);display:flex}
.pm-falt textarea{flex:1;border:0;outline:0;resize:none;background:transparent;color:var(--pm-txt);font:inherit;font-size:16px;line-height:1.38;padding:11px 16px;max-height:132px;min-height:44px}
.pm-falt:focus-within{box-shadow:inset 0 0 0 1.5px var(--pm-sea)}
.pm-skicka{width:44px;height:44px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--pm-linje);color:var(--pm-txt3);transition:background .18s,transform .18s,color .18s}
.pm-skicka.pm-redo{background:var(--sea-knapp);color:#fff}
.pm-skicka.pm-redo:active{transform:scale(.92)}
.pm-plusark{display:flex;gap:10px;padding:12px 4px 4px;animation:pm-in .2s ease}
.pm-plusark button{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--pm-txt2);padding:6px 0;border-radius:14px}
.pm-plusark button:hover{background:var(--pm-vald)}
.pm-pi{width:48px;height:48px;border-radius:15px;display:flex;align-items:center;justify-content:center;color:#fff;background:var(--pi)}

/* Tomt, fel, laddar */
.pm-tomt{margin:auto;max-width:320px;padding:40px 24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.pm-tomt h2{font-size:19px;font-weight:700;margin:12px 0 0}
.pm-tomt p{font-size:15px;line-height:1.45;color:var(--pm-txt2);margin:2px 0 10px}
.pm-tomt-bild{width:148px;height:148px;object-fit:contain}
.pm-tomt-ikon{width:64px;height:64px;border-radius:20px;background:var(--pm-vald);color:var(--pm-sea);display:flex;align-items:center;justify-content:center}
.pm-knapp{height:46px;padding:0 20px;border-radius:14px;background:var(--sea-knapp)!important;color:#fff!important;font-weight:600;display:inline-flex;align-items:center;gap:8px;margin-top:6px}
.pm-skel{border-radius:7px;background:linear-gradient(90deg,var(--pm-linje) 0%,rgba(127,150,170,.16) 50%,var(--pm-linje) 100%);background-size:200% 100%;animation:pm-skimmer 1.4s infinite linear}

/* Förhandsvisningens kontrollrad */
.pm-kontroll{position:fixed;left:50%;transform:translateX(-50%);top:10px;z-index:60;display:flex;align-items:center;gap:4px;flex-wrap:wrap;justify-content:center;max-width:calc(100% - 20px);
  padding:5px;border-radius:14px;background:rgba(20,32,44,.9);color:#fff;font-size:12.5px;box-shadow:0 6px 20px rgba(0,0,0,.2)}
.pm-kontroll a,.pm-kontroll button{color:#fff!important;padding:5px 9px;border-radius:9px;opacity:.85}
.pm-kontroll a:hover,.pm-kontroll button:hover,.pm-k-vald{background:rgba(255,255,255,.16);opacity:1!important}
.pm-kontroll-mark{padding:5px 9px;font-weight:600;color:#f2c79a}
.pm-rot:not(:hover) .pm-kontroll{opacity:.9}

/* Ljuslåda */
.pm-ljus{position:fixed;inset:0;z-index:80;background:rgba(5,10,16,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 16px 24px;animation:pm-tona .2s ease}
.pm-ljus img{max-width:100%;max-height:calc(100% - 40px);border-radius:12px;object-fit:contain;animation:pm-zoom .25s cubic-bezier(.2,.8,.2,1)}
.pm-ljus-stang{position:absolute;top:calc(12px + env(safe-area-inset-top));right:12px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.12)!important;color:#fff!important;display:flex;align-items:center;justify-content:center}
.pm-ljus-fot{color:rgba(255,255,255,.75);font-size:14px;margin-top:14px}

/* Mobil: en vy i taget */
.pm-vy-samtal .pm-inkorg{display:none}
.pm-vy-samtal .pm-samtal{display:flex}

/* Dator: delad vy, ingen bakåtpil, hovra fram åtgärder */
@media (min-width:900px){
  .pm-sidomeny{display:flex}
  .pm-inkorg{width:360px;flex-shrink:0;border-right:1px solid var(--pm-linje)}
  .pm-vy-samtal .pm-inkorg{display:flex}
  .pm-samtal{display:flex}
  .pm-bara-mobil{display:none!important}
  .pm-sam-huvud{padding-left:18px}
  .pm-flode{padding:16px 28px 8px}
  .pm-bubbla-kol{max-width:min(62%,520px)}
  .pm-komp{padding:10px 24px 16px}
  .pm-hover{display:flex}
  .pm-rad-b:hover .pm-hover{opacity:1}
}
@media (hover:none){.pm-bubbla{user-select:none}}

@keyframes pm-prick{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1}}
@keyframes pm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes pm-upp{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
@keyframes pm-pop{from{transform:scale(.4)}to{transform:none}}
@keyframes pm-puls{0%{transform:scale(.6);opacity:.5}100%{transform:scale(2.6);opacity:0}}
@keyframes pm-skimmer{from{background-position:200% 0}to{background-position:-200% 0}}
@keyframes pm-tona{from{opacity:0}to{opacity:1}}
@keyframes pm-zoom{from{transform:scale(.94);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){
  .pm-rot *,.pm-rot *::before{animation:none!important;transition:none!important}
  .pm-prickar i{opacity:.7}
}
`
