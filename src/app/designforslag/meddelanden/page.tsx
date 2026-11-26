import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import { avatarGradient, initialsOf } from '@/lib/utils'

/**
 * Designförslag för meddelanden (Tom 2026-11-26: "Ta fram").
 *
 * Bara en förhandsvisning på en egen gren. Exempeldata, ingen inloggning, inga
 * anrop. Sidan ska INTE mergas till main: Tom väljer först en riktning, och
 * den byggs sedan in i de riktiga sidorna under /meddelanden.
 *
 * ?v=idag|hamn|sjokort|iphone   vilken riktning
 * ?vy=inkorg|samtal             vilken vy på mobil (dator visar båda)
 */
export const metadata: Metadata = {
  title: 'Designförslag: meddelanden',
  robots: { index: false, follow: false },
}

type Riktning = 'idag' | 'hamn' | 'sjokort' | 'iphone'
type Vy = 'inkorg' | 'samtal'

const RIKTNINGAR: { id: Riktning; namn: string; kort: string }[] = [
  { id: 'idag', namn: 'Idag', kort: 'Idag' },
  { id: 'hamn', namn: 'A · Hamn', kort: 'A Hamn' },
  { id: 'sjokort', namn: 'B · Sjökort', kort: 'B Sjökort' },
  { id: 'iphone', namn: 'C · Ren iPhone', kort: 'C iPhone' },
]

// ─── Exempeldata ─────────────────────────────────────────────────────────────

type Rad = {
  id: string
  namn: string
  forhands: string
  tid: string
  olasta: number
  grupp?: boolean
  avMig?: boolean
  typ?: 'pos' | 'tur'
  status?: 'forfragan' | 'vantar'
  dag: 'idag' | 'tidigare'
}

const RADER: Rad[] = [
  { id: 'r1', namn: 'linnea.seglar', forhands: 'Vi lägger till vid Sandhamn runt tre. Kommer ni?', tid: '14:32', olasta: 2, dag: 'idag' },
  { id: 'r2', namn: 'Seglargänget Möja', forhands: 'johan_b: Jag tar med grillen', tid: '13:05', olasta: 1, grupp: true, dag: 'idag' },
  { id: 'r3', namn: 'erik.berg', forhands: 'Grinda gästhamn', tid: 'Igår', olasta: 0, typ: 'pos', dag: 'tidigare' },
  { id: 'r4', namn: 'sara_n', forhands: 'Tack för tipset om krogen på Finnhamn!', tid: 'Igår', olasta: 0, avMig: true, dag: 'tidigare' },
  { id: 'r5', namn: 'mattias.k', forhands: 'Vaxholm till Grinda, 9,4 NM', tid: 'mån', olasta: 0, typ: 'tur', dag: 'tidigare' },
  { id: 'r6', namn: 'fredrik_h', forhands: 'Tja', tid: 'sön', olasta: 0, avMig: true, status: 'vantar', dag: 'tidigare' },
]

type Medd = {
  id: string
  jag: boolean
  text?: string
  typ?: 'pos' | 'tur'
  tid: string
  rubrik?: string // tidsrubrik före meddelandet
  sistIGrupp: boolean
  forstIGrupp: boolean
}

const SAMTAL: Medd[] = [
  { id: 'm1', jag: false, text: 'Hej! Såg att du loggade Grinda i helgen. Hur var det i hamnen?', tid: '13:58', rubrik: 'Idag 13:58', forstIGrupp: true, sistIGrupp: true },
  { id: 'm2', jag: true, text: 'Fint! Gott om plats vid bryggan på fredagen, fullt på lördagskvällen.', tid: '14:10', rubrik: 'Idag 14:10', forstIGrupp: true, sistIGrupp: false },
  { id: 'm3', jag: true, typ: 'pos', tid: '14:10', forstIGrupp: false, sistIGrupp: true },
  { id: 'm4', jag: false, text: 'Perfekt, tack.', tid: '14:31', rubrik: 'Idag 14:31', forstIGrupp: true, sistIGrupp: false },
  { id: 'm5', jag: false, text: 'Vi lägger till vid Sandhamn runt tre. Kommer ni?', tid: '14:32', forstIGrupp: false, sistIGrupp: false },
  { id: 'm6', jag: false, typ: 'tur', tid: '14:32', forstIGrupp: false, sistIGrupp: true },
]

const MOTPART = 'linnea.seglar'
const SKRIVER = 'Vi kommer! Lägger oss bredvid er om det finns plats vid bryggan.'

// ─── Ikoner ──────────────────────────────────────────────────────────────────

function Ikon({ d, storlek = 20, farg = 'currentColor', tjocklek = 2, fyll = 'none', children }: {
  d?: string; storlek?: number; farg?: string; tjocklek?: number; fyll?: string; children?: ReactNode
}) {
  return (
    <svg viewBox="0 0 24 24" width={storlek} height={storlek} fill={fyll} stroke={farg} strokeWidth={tjocklek}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      {d && <path d={d} />}
      {children}
    </svg>
  )
}
const P = {
  bak: 'M15 19l-7-7 7-7',
  hoger: 'M9 5l7 7-7 7',
  plus: 'M12 5v14M5 12h14',
  pil: 'M5 12h14M12 5l7 7-7 7',
  upp: 'M12 19V5M5 12l7-7 7 7',
  sok: 'M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z',
  penna: 'M4 20h4L18.5 9.5a2.1 2.1 0 00-3-3L5 17v3zM13.5 6.5l3 3',
  nal: 'M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z',
  bild: 'M4 16l4-4a3 3 0 014 0l4 4m-2-2l2-2a3 3 0 014 0l2 2M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z',
  rutt: 'M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM8 17h7a3 3 0 000-6H9a3 3 0 010-6h7',
  mer: 'M5 12h.01M12 12h.01M19 12h.01',
}

// ─── Gemensamma delar ────────────────────────────────────────────────────────

function Avatar({ namn, storlek, ring }: { namn: string; storlek: number; ring?: string }) {
  return (
    <div style={{
      width: storlek, height: storlek, borderRadius: '50%', flexShrink: 0,
      background: avatarGradient(namn), color: '#fff', fontWeight: 600,
      fontSize: Math.round(storlek * 0.36), display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
    }}>{initialsOf(namn)}</div>
  )
}

/** Stiliserat sjökort: vatten, djupkurvor, land och en nål. Ingen extern karta. */
function Karta({ hojd, stil }: { hojd: number; stil: 'enkel' | 'sjokort' }) {
  const vatten = stil === 'sjokort' ? '#d7e8f1' : '#dfeaf1'
  return (
    <svg viewBox="0 0 280 140" preserveAspectRatio="xMidYMid slice" width="100%" height={hojd} aria-hidden="true" style={{ display: 'block' }}>
      <rect width="280" height="140" fill={vatten} />
      {stil === 'sjokort' && (
        <g fill="none" stroke="#a9c9da" strokeWidth="1" strokeDasharray="3 3">
          <path d="M-10 30 C60 10 120 50 200 30 S300 40 300 40" />
          <path d="M-10 115 C50 95 130 130 210 110 S300 120 300 120" />
          <path d="M20 70 C70 55 110 85 160 72" />
        </g>
      )}
      <path d="M150 20 C175 10 215 18 228 40 C240 62 214 82 188 78 C165 74 140 52 150 20z" fill="#efe6d2" stroke="#d6c7a6" />
      <path d="M40 92 C55 80 88 84 96 100 C104 118 78 130 58 124 C40 118 30 104 40 92z" fill="#efe6d2" stroke="#d6c7a6" />
      <path d="M236 98 C246 92 262 96 262 108 C262 120 246 124 238 118 C230 112 228 104 236 98z" fill="#efe6d2" stroke="#d6c7a6" />
      <g transform="translate(176 46)">
        <circle r="13" fill="rgba(201,110,42,0.18)" />
        <path d="M0 -12 C-6 -12 -9 -8 -9 -4 C-9 3 0 10 0 10 C0 10 9 3 9 -4 C9 -8 6 -12 0 -12z" fill="#c96e2a" stroke="#fff" strokeWidth="1.5" />
        <circle cy="-4" r="3" fill="#fff" />
      </g>
    </svg>
  )
}

function Ruttkarta({ hojd }: { hojd: number }) {
  return (
    <svg viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" width="100%" height={hojd} aria-hidden="true" style={{ display: 'block' }}>
      <rect width="280" height="120" fill="#d7e8f1" />
      <path d="M10 20 C40 10 70 30 60 50 C50 70 20 60 10 80z" fill="#efe6d2" stroke="#d6c7a6" />
      <path d="M200 70 C230 60 270 70 272 95 C274 120 220 125 205 108 C195 96 190 78 200 70z" fill="#efe6d2" stroke="#d6c7a6" />
      <path d="M58 40 C110 30 120 90 170 70 S215 88 222 86" fill="none" stroke="#1e5c82" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 6" />
      <circle cx="58" cy="40" r="5" fill="#fff" stroke="#1e5c82" strokeWidth="2.5" />
      <circle cx="222" cy="86" r="5" fill="#1e5c82" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

function forhandsText(r: Rad): string {
  if (r.typ === 'pos') return `Delad position: ${r.forhands}`
  if (r.typ === 'tur') return `Delad tur: ${r.forhands}`
  return (r.avMig ? 'Du: ' : '') + r.forhands
}

// ═══ IDAG — återskapad från koden i src/app/meddelanden (main, f5db02d) ══════

const TEAL_BUBBLA = 'linear-gradient(135deg, #0a7b8c 0%, #085f6e 100%)'

function IdagInkorg() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%' }}>
      <div style={{ background: 'var(--glass-96)', borderBottom: '1px solid rgba(10,123,140,0.10)', padding: '10px 16px 12px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40 }}>
            <Ikon d={P.bak} farg="var(--sea)" storlek={20} tjocklek={2.5} />
            <span style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700, fontSize: 20, color: 'var(--txt)', flex: 1 }}>Meddelanden</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 34, padding: '0 12px', borderRadius: 12, background: 'var(--sea-knapp)', color: '#fff', fontSize: 13, fontWeight: 600 }}>
              <Ikon d={P.plus} storlek={14} tjocklek={2.5} /> Nytt
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 38, marginTop: 8, padding: '0 12px', borderRadius: 12, background: 'rgba(10,123,140,0.06)', border: '1px solid rgba(10,123,140,0.15)', color: 'var(--txt3)', fontSize: 14 }}>
            <Ikon d={P.sok} storlek={15} /> Sök i meddelanden
          </div>
          <div style={{ display: 'flex', height: 34, marginTop: 10, padding: 3, borderRadius: 10, background: 'rgba(10,123,140,0.07)' }}>
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 6, background: 'var(--bg)', fontSize: 13, fontWeight: 600, color: 'var(--txt)', boxShadow: '0 1px 2px rgba(0,0,0,.04)' }}>
              Aktiva <span style={{ fontSize: 10, background: 'var(--sea-l)', borderRadius: 999, padding: '1px 6px' }}>6</span>
            </span>
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: 'var(--txt3)' }}>Förfrågningar</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {RADER.map((r, i) => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', height: 72, padding: '0 16px', position: 'relative', background: r.olasta ? 'rgba(30,92,130,0.04)' : 'transparent' }}>
            {r.olasta > 0 && <span style={{ position: 'absolute', left: 5, width: 8, height: 8, borderRadius: '50%', background: 'var(--sea)' }} />}
            <div style={{ marginRight: 12 }}><Avatar namn={r.namn} storlek={44} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: r.olasta ? 600 : 500, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.namn}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--txt3)' }}>{r.tid}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                {r.status === 'vantar' && <span style={{ fontSize: 10, color: 'var(--txt3)', background: 'rgba(10,123,140,0.06)', borderRadius: 6, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: 0.3 }}>Väntar</span>}
                <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: r.olasta ? 'var(--txt)' : 'var(--txt3)', fontWeight: r.olasta ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {r.typ === 'pos' ? 'Position' : r.typ === 'tur' ? 'Tur' : forhandsText(r)}
                </span>
                {r.olasta > 0 && <span style={{ fontSize: 10, fontWeight: 600, background: 'var(--acc-knapp)', color: '#fff', borderRadius: 999, padding: '2px 7px' }}>{r.olasta}</span>}
              </div>
            </div>
            {i < RADER.length - 1 && <span style={{ position: 'absolute', bottom: 0, left: 72, right: 0, height: 1, background: 'rgba(10,123,140,0.08)' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function IdagSamtal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--glass-96)', borderBottom: '1px solid rgba(10,123,140,0.10)', padding: '6px 8px 10px', flexShrink: 0 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative', minHeight: 74 }}>
          <span style={{ position: 'absolute', left: 0, top: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ikon d={P.bak} farg="var(--sea)" tjocklek={2.5} /></span>
          <span style={{ position: 'absolute', right: 0, top: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ikon d={P.mer} farg="var(--sea)" tjocklek={4} /></span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, paddingTop: 4 }}>
            <div style={{ border: '2px solid var(--white)', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,45,60,0.18)' }}><Avatar namn={MOTPART} storlek={44} /></div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>{MOTPART} ›</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px 12px', maxWidth: 520, width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 12px' }}>
          <span style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.10)' }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--txt3)' }}>Idag</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.10)' }} />
        </div>
        {SAMTAL.map(m => {
          const r = m.jag ? (m.sistIGrupp ? '20px 20px 6px 20px' : '20px') : (m.sistIGrupp ? '20px 20px 20px 6px' : '20px')
          return (
            <div key={m.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: m.jag ? 'row-reverse' : 'row', marginTop: m.forstIGrupp ? 12 : 2 }}>
              {!m.jag && <div style={{ visibility: m.sistIGrupp ? 'visible' : 'hidden' }}><Avatar namn={MOTPART} storlek={28} /></div>}
              <div style={{ maxWidth: m.typ === 'pos' ? '88%' : '75%', width: m.typ === 'pos' ? '88%' : 'auto', display: 'flex', flexDirection: 'column', alignItems: m.jag ? 'flex-end' : 'flex-start', gap: 3 }}>
                {m.text && (
                  <div style={{ padding: '10px 15px', borderRadius: r, fontSize: 14, lineHeight: 1.45, background: m.jag ? TEAL_BUBBLA : 'rgba(10,123,140,0.09)', border: m.jag ? 'none' : '1px solid rgba(10,123,140,0.12)', color: m.jag ? '#fff' : 'var(--txt)', boxShadow: m.jag ? '0 2px 10px rgba(10,123,140,0.30)' : 'none' }}>{m.text}</div>
                )}
                {m.typ === 'pos' && (
                  <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(10,123,140,0.15)', background: 'var(--white)' }}>
                    <Karta hojd={120} stil="enkel" />
                    <div style={{ padding: '8px 12px', fontSize: 13, color: 'var(--txt)' }}>📍 Delad position</div>
                    <div style={{ display: 'flex', borderTop: '1px solid rgba(10,123,140,0.10)', fontSize: 12, color: 'var(--sea)', fontWeight: 600 }}>
                      <span style={{ flex: 1, padding: 9, textAlign: 'center' }}>Öppna sjökort</span>
                      <span style={{ flex: 1, padding: 9, textAlign: 'center', borderLeft: '1px solid rgba(10,123,140,0.10)' }}>Kopiera koordinater</span>
                    </div>
                  </div>
                )}
                {m.typ === 'tur' && (
                  <div style={{ width: 220, borderRadius: 12, border: '1px solid rgba(10,123,140,0.15)', background: 'var(--white)', padding: '8px 12px 10px' }}>
                    <div style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 600 }}>Tur</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>Vaxholm till Sandhamn</div>
                    <div style={{ fontSize: 11, color: 'var(--sea)', fontWeight: 500, marginTop: 3 }}>18,6 NM</div>
                  </div>
                )}
                {m.sistIGrupp && <span style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 500, padding: '0 4px' }}>{m.tid}</span>}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ background: 'var(--glass-96)', borderTop: '1px solid rgba(10,123,140,0.10)', flexShrink: 0 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px' }}>
          <span style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(10,40,80,0.06)', color: 'var(--txt3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ikon d={P.bild} storlek={18} tjocklek={1.8} /></span>
          <span style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(10,40,80,0.06)', color: 'var(--txt3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ikon d={P.nal} storlek={18} tjocklek={1.8} /></span>
          <span style={{ flex: 1, minWidth: 0, border: '1.5px solid rgba(10,123,140,0.15)', borderRadius: 999, padding: '9px 16px', fontSize: 14, color: 'var(--txt)', background: 'rgba(10,123,140,0.03)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKRIVER}</span>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--sea-knapp)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ikon d={P.pil} storlek={15} tjocklek={2.5} /></span>
        </div>
      </div>
    </div>
  )
}

// ═══ A · HAMN — Svallas eget formspråk, finslipat ═══════════════════════════

const HAIR = '1px solid rgba(25,40,48,0.09)'

function HamnInkorg() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%' }}>
      <div style={{ padding: '14px 16px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44 }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display), serif', fontWeight: 700, fontSize: 28, color: 'var(--txt)' }}>Meddelanden</h1>
          <span aria-label="Nytt meddelande" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--sea-knapp)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}><Ikon d={P.penna} storlek={19} /></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, marginTop: 12, padding: '0 14px', borderRadius: 14, background: 'var(--white)', border: HAIR, color: 'var(--txt3)', fontSize: 16 }}>
          <Ikon d={P.sok} storlek={17} /> Sök namn eller meddelande
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 14, borderBottom: HAIR }}>
          <span style={{ padding: '0 0 10px', fontSize: 15, fontWeight: 600, color: 'var(--txt)', borderBottom: '2px solid var(--sea)', marginBottom: -1 }}>Samtal</span>
          <span style={{ padding: '0 0 10px', fontSize: 15, fontWeight: 500, color: 'var(--txt3)' }}>Förfrågningar <span style={{ fontSize: 12, color: 'var(--acc-text)', fontWeight: 600 }}>1</span></span>
        </div>
      </div>
      <div>
        {RADER.map(r => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, minHeight: 76, padding: '10px 16px' }}>
            <Avatar namn={r.namn} storlek={52} />
            <div style={{ flex: 1, minWidth: 0, borderBottom: HAIR, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 2 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ flex: 1, minWidth: 0, fontSize: 16, fontWeight: r.olasta ? 700 : 600, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.namn}</span>
                <span style={{ fontSize: 13, color: r.olasta ? 'var(--sea)' : 'var(--txt3)', fontWeight: r.olasta ? 600 : 400 }}>{r.tid}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                {r.typ && <span style={{ color: 'var(--sea)' }}><Ikon d={r.typ === 'pos' ? P.nal : P.rutt} storlek={14} /></span>}
                {r.status === 'vantar' && <span style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>Väntar på svar ·</span>}
                <span style={{ flex: 1, minWidth: 0, fontSize: 15, color: r.olasta ? 'var(--txt)' : 'var(--txt3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{forhandsText(r)}</span>
                {r.olasta > 0 && <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: 'var(--sea-knapp)', color: '#fff', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{r.olasta}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HamnSamtal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 60, padding: '0 6px', background: 'var(--glass-96)', borderBottom: HAIR, flexShrink: 0 }}>
        <span style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sea)' }}><Ikon d={P.bak} storlek={24} tjocklek={2.25} /></span>
        <Avatar namn={MOTPART} storlek={38} />
        <div style={{ flex: 1, minWidth: 0, marginLeft: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)' }}>{MOTPART}</div>
          <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Visa profil</div>
        </div>
        <span style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sea)' }}><Ikon d={P.mer} storlek={24} tjocklek={3.5} /></span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px 14px 14px' }}>
        {SAMTAL.map(m => {
          const r = m.jag ? (m.sistIGrupp ? '20px 20px 6px 20px' : '20px 20px 20px 20px') : (m.sistIGrupp ? '20px 20px 20px 6px' : '20px')
          return (
            <div key={m.id}>
              {m.rubrik && <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--txt3)', fontWeight: 500, margin: '14px 0 8px' }}>{m.rubrik}</div>}
              <div style={{ display: 'flex', justifyContent: m.jag ? 'flex-end' : 'flex-start', marginTop: m.forstIGrupp ? 0 : 3 }}>
                {m.text && (
                  <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: r, fontSize: 16, lineHeight: 1.4, background: m.jag ? 'var(--sea-knapp)' : 'var(--white)', color: m.jag ? '#fff' : 'var(--txt)', border: m.jag ? 'none' : HAIR, boxShadow: m.jag ? 'none' : 'var(--shadow-xs)' }}>{m.text}</div>
                )}
                {m.typ === 'pos' && (
                  <div style={{ width: '78%', maxWidth: 300, borderRadius: r, overflow: 'hidden', background: 'var(--white)', border: HAIR, boxShadow: 'var(--shadow-xs)' }}>
                    <Karta hojd={130} stil="enkel" />
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>Grinda gästhamn</div>
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 1 }}>Delad position · Öppna sjökort</div>
                    </div>
                  </div>
                )}
                {m.typ === 'tur' && (
                  <div style={{ width: '78%', maxWidth: 300, borderRadius: r, overflow: 'hidden', background: 'var(--white)', border: HAIR, boxShadow: 'var(--shadow-xs)' }}>
                    <Ruttkarta hojd={96} />
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>Vaxholm till Sandhamn</div>
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 1 }}>Tur · 18,6 NM</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ background: 'var(--glass-96)', borderTop: HAIR, padding: '8px 10px calc(8px + env(safe-area-inset-bottom, 0px))', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <span aria-label="Bifoga bild, position eller tur" style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(30,92,130,0.10)', color: 'var(--sea)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ikon d={P.plus} storlek={22} tjocklek={2.25} /></span>
          <div style={{ flex: 1, minWidth: 0, minHeight: 44, borderRadius: 22, background: 'var(--white)', border: HAIR, padding: '11px 16px', fontSize: 16, lineHeight: 1.35, color: 'var(--txt)' }}>{SKRIVER}</div>
          <span aria-label="Skicka" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--sea-knapp)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ikon d={P.upp} storlek={20} tjocklek={2.5} /></span>
        </div>
      </div>
    </div>
  )
}

// ═══ B · SJÖKORT — skärgårdskaraktär, rika kort ═════════════════════════════

const NAVY = 'var(--thor)'

function SjokortInkorg() {
  const grupp = (dag: Rad['dag'], rubrik: string) => (
    <div style={{ padding: '0 14px' }}>
      <div style={{ fontFamily: 'var(--font-display), serif', fontSize: 15, fontWeight: 600, color: 'var(--txt2)', margin: '18px 4px 8px' }}>{rubrik}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {RADER.filter(r => r.dag === dag).map(r => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 18, background: 'var(--white)', boxShadow: 'var(--shadow-sm)', borderLeft: r.olasta ? '4px solid var(--acc)' : '4px solid transparent' }}>
            <Avatar namn={r.namn} storlek={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ flex: 1, minWidth: 0, fontSize: 16, fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.namn}</span>
                <span style={{ fontSize: 12, color: r.olasta ? 'var(--acc-text)' : 'var(--txt3)', fontWeight: 600 }}>{r.tid}</span>
              </div>
              {r.typ ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--sea-xl)', color: 'var(--sea)', fontSize: 13, fontWeight: 600 }}>
                  <Ikon d={r.typ === 'pos' ? P.nal : P.rutt} storlek={14} /> {r.forhands}
                </div>
              ) : (
                <div style={{ fontSize: 14, color: r.olasta ? 'var(--txt)' : 'var(--txt3)', marginTop: 3, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {r.status === 'vantar' ? 'Väntar på svar · ' : ''}{forhandsText(r)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 20 }}>
      <div style={{ padding: '16px 18px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display), serif', fontWeight: 700, fontSize: 30, color: 'var(--txt)', lineHeight: 1.1 }}>Meddelanden</h1>
            <div style={{ fontSize: 14, color: 'var(--txt3)', marginTop: 4 }}>3 olästa i 2 samtal</div>
          </div>
          <span aria-label="Nytt meddelande" style={{ width: 44, height: 44, borderRadius: 14, background: NAVY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ikon d={P.penna} storlek={19} /></span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {['Alla', 'Olästa', 'Grupper', 'Förfrågningar 1'].map((c, i) => (
            <span key={c} style={{ height: 36, padding: '0 14px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 600, background: i === 0 ? NAVY : 'var(--white)', color: i === 0 ? '#fff' : 'var(--txt2)', border: i === 0 ? 'none' : HAIR }}>{c}</span>
          ))}
        </div>
      </div>
      {grupp('idag', 'Idag')}
      {grupp('tidigare', 'Tidigare')}
    </div>
  )
}

function SjokortSamtal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--white)', borderBottom: HAIR, padding: '8px 8px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt)' }}><Ikon d={P.bak} storlek={24} tjocklek={2.25} /></span>
          <Avatar namn={MOTPART} storlek={42} ring="var(--acc-l)" />
          <div style={{ flex: 1, minWidth: 0, marginLeft: 8 }}>
            <div style={{ fontFamily: 'var(--font-display), serif', fontSize: 19, fontWeight: 700, color: 'var(--txt)' }}>{MOTPART}</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Profil · 12 loggade turer</div>
          </div>
          <span style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt)' }}><Ikon d={P.mer} storlek={24} tjocklek={3.5} /></span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px 14px 12px' }}>
        {SAMTAL.map(m => {
          const r = m.jag ? (m.sistIGrupp ? '18px 18px 4px 18px' : '18px') : (m.sistIGrupp ? '18px 18px 18px 4px' : '18px')
          return (
            <div key={m.id}>
              {m.rubrik && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0 8px' }}>
                  <span style={{ flex: 1, height: 1, background: 'rgba(25,40,48,0.10)' }} />
                  <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>{m.rubrik}</span>
                  <span style={{ flex: 1, height: 1, background: 'rgba(25,40,48,0.10)' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: m.jag ? 'flex-end' : 'flex-start', marginTop: m.forstIGrupp ? 0 : 4 }}>
                {m.text && (
                  <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: r, fontSize: 16, lineHeight: 1.4, background: m.jag ? NAVY : 'var(--white)', color: m.jag ? '#fff' : 'var(--txt)', border: m.jag ? 'none' : HAIR }}>{m.text}</div>
                )}
                {m.typ === 'pos' && (
                  <div style={{ width: '86%', maxWidth: 340, borderRadius: 20, overflow: 'hidden', background: 'var(--white)', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ position: 'relative' }}>
                      <Karta hojd={150} stil="sjokort" />
                      <span style={{ position: 'absolute', left: 10, top: 10, padding: '3px 9px', borderRadius: 999, background: 'rgba(255,253,248,0.92)', fontSize: 11, fontWeight: 700, color: 'var(--txt2)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Position</span>
                    </div>
                    <div style={{ padding: '12px 14px 4px' }}>
                      <div style={{ fontFamily: 'var(--font-display), serif', fontSize: 18, fontWeight: 700, color: 'var(--txt)' }}>Grinda gästhamn</div>
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 2 }}>59°24,6′ N 18°33,9′ E</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, padding: '10px 14px 14px' }}>
                      <span style={{ flex: 1, height: 40, borderRadius: 12, background: NAVY, color: '#fff', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Öppna sjökort</span>
                      <span style={{ flex: 1, height: 40, borderRadius: 12, border: HAIR, color: 'var(--txt)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Kopiera</span>
                    </div>
                  </div>
                )}
                {m.typ === 'tur' && (
                  <div style={{ width: '86%', maxWidth: 340, borderRadius: 20, overflow: 'hidden', background: 'var(--white)', boxShadow: 'var(--shadow-md)' }}>
                    <Ruttkarta hojd={110} />
                    <div style={{ padding: '12px 14px 14px' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--acc-text)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Tur</div>
                      <div style={{ fontFamily: 'var(--font-display), serif', fontSize: 18, fontWeight: 700, color: 'var(--txt)', marginTop: 2 }}>Vaxholm till Sandhamn</div>
                      <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13, color: 'var(--txt2)' }}>
                        <span><b style={{ color: 'var(--txt)' }}>18,6</b> NM</span>
                        <span><b style={{ color: 'var(--txt)' }}>3 h 10 min</b></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ background: 'var(--white)', borderTop: HAIR, padding: '8px 10px calc(8px + env(safe-area-inset-bottom, 0px))', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {[{ d: P.bild, t: 'Bild' }, { d: P.nal, t: 'Position' }, { d: P.rutt, t: 'Tur' }].map(k => (
            <span key={k.t} style={{ height: 36, padding: '0 12px', borderRadius: 999, background: 'var(--sea-xl)', color: 'var(--sea)', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}><Ikon d={k.d} storlek={16} /> {k.t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: 44, borderRadius: 14, background: 'var(--bg)', border: HAIR, padding: '11px 14px', fontSize: 16, lineHeight: 1.35, color: 'var(--txt)' }}>{SKRIVER}</div>
          <span aria-label="Skicka" style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--acc-knapp)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ikon d={P.pil} storlek={20} tjocklek={2.5} /></span>
        </div>
      </div>
    </div>
  )
}

// ═══ C · REN IPHONE — Apples mönster, Svallas färg ══════════════════════════

const IOS_GRA = 'rgba(118,118,128,0.12)'

function IphoneInkorg() {
  return (
    <div style={{ background: 'var(--white)', minHeight: '100%' }}>
      <div style={{ padding: '6px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', height: 44, alignItems: 'center', color: 'var(--sea)' }}><Ikon d={P.penna} storlek={22} /></div>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: -0.4, color: 'var(--txt)' }}>Meddelanden</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, marginTop: 8, padding: '0 10px', borderRadius: 10, background: IOS_GRA, color: 'rgba(60,60,67,0.6)', fontSize: 17 }}>
          <Ikon d={P.sok} storlek={16} /> Sök
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 16px', color: 'var(--sea)', fontSize: 16, fontWeight: 500, borderBottom: '0.5px solid rgba(60,60,67,0.2)' }}>
        <span style={{ flex: 1 }}>Förfrågningar</span>
        <span style={{ color: 'var(--txt3)', fontSize: 15 }}>1</span>
        <span style={{ color: 'rgba(60,60,67,0.3)' }}><Ikon d={P.hoger} storlek={14} tjocklek={2.5} /></span>
      </div>
      {RADER.map((r, i) => {
        const svept = i === 3
        return (
          <div key={r.id} style={{ position: 'relative', overflow: 'hidden' }}>
            {svept && (
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 88, background: '#d92d20', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 600 }}>Radera</div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 16px 0 6px', background: 'var(--white)', transform: svept ? 'translateX(-88px)' : undefined }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: r.olasta ? 'var(--sea)' : 'transparent', marginTop: 21, flexShrink: 0 }} />
              <Avatar namn={r.namn} storlek={48} />
              <div style={{ flex: 1, minWidth: 0, paddingBottom: 10, borderBottom: '0.5px solid rgba(60,60,67,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 17, fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.namn}</span>
                  <span style={{ fontSize: 15, color: 'rgba(60,60,67,0.6)' }}>{r.tid}</span>
                  <span style={{ color: 'rgba(60,60,67,0.3)' }}><Ikon d={P.hoger} storlek={13} tjocklek={2.5} /></span>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.3, color: 'rgba(60,60,67,0.6)', marginTop: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {r.status === 'vantar' ? 'Väntar på svar · ' : ''}{forhandsText(r)}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function IphoneSamtal() {
  const gra = 'rgba(118,118,128,0.14)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--white)' }}>
      <div style={{ position: 'relative', height: 76, background: 'rgba(249,249,249,0.94)', borderBottom: '0.5px solid rgba(60,60,67,0.2)', flexShrink: 0 }}>
        <span style={{ position: 'absolute', left: 4, top: 12, height: 44, display: 'flex', alignItems: 'center', gap: 2, color: 'var(--sea)', fontSize: 17 }}>
          <Ikon d={P.bak} storlek={26} tjocklek={2.5} />
          <span style={{ minWidth: 22, height: 22, borderRadius: 11, background: 'var(--sea-knapp)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>3</span>
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 3 }}>
          <Avatar namn={MOTPART} storlek={42} />
          <span style={{ fontSize: 12, color: 'var(--txt)' }}>{MOTPART} ›</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px 12px 10px' }}>
        {SAMTAL.map(m => {
          const r = m.sistIGrupp ? (m.jag ? '18px 18px 4px 18px' : '18px 18px 18px 4px') : '18px'
          return (
            <div key={m.id}>
              {m.rubrik && <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(60,60,67,0.6)', margin: '14px 0 8px' }}><b style={{ fontWeight: 600 }}>{m.rubrik.split(' ')[0]}</b> {m.rubrik.split(' ')[1]}</div>}
              <div style={{ display: 'flex', justifyContent: m.jag ? 'flex-end' : 'flex-start', marginTop: m.forstIGrupp ? 0 : 2 }}>
                {m.text && <div style={{ maxWidth: '75%', padding: '8px 13px', borderRadius: r, fontSize: 17, lineHeight: 1.3, background: m.jag ? 'var(--sea-knapp)' : gra, color: m.jag ? '#fff' : 'var(--txt)' }}>{m.text}</div>}
                {m.typ === 'pos' && (
                  <div style={{ width: '70%', maxWidth: 260, borderRadius: r, overflow: 'hidden', background: gra }}>
                    <Karta hojd={120} stil="enkel" />
                    <div style={{ padding: '8px 12px 10px' }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>Grinda gästhamn</div>
                      <div style={{ fontSize: 13, color: 'rgba(60,60,67,0.6)' }}>Position</div>
                    </div>
                  </div>
                )}
                {m.typ === 'tur' && (
                  <div style={{ width: '70%', maxWidth: 260, borderRadius: r, overflow: 'hidden', background: gra }}>
                    <Ruttkarta hojd={90} />
                    <div style={{ padding: '8px 12px 10px' }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>Vaxholm till Sandhamn</div>
                      <div style={{ fontSize: 13, color: 'rgba(60,60,67,0.6)' }}>Tur · 18,6 NM</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ padding: '6px 10px calc(6px + env(safe-area-inset-bottom, 0px))', background: 'var(--white)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <span aria-label="Bifoga" style={{ width: 40, height: 40, borderRadius: '50%', background: gra, color: 'rgba(60,60,67,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ikon d={P.plus} storlek={22} tjocklek={2.25} /></span>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-end', gap: 6, minHeight: 40, borderRadius: 20, border: '1px solid rgba(60,60,67,0.25)', padding: '4px 4px 4px 14px' }}>
            <span style={{ flex: 1, minWidth: 0, fontSize: 17, lineHeight: 1.3, color: 'var(--txt)', padding: '4px 0' }}>{SKRIVER}</span>
            <span aria-label="Skicka" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sea-knapp)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ikon d={P.upp} storlek={18} tjocklek={2.75} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Skal: dator-sidomeny (som appens) och väljarlist ────────────────────────

function Sidomeny() {
  const punkt = (t: string, aktiv = false) => (
    <div key={t} style={{ height: 42, display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: 12, fontSize: 15, fontWeight: aktiv ? 600 : 500, color: aktiv ? 'var(--sea)' : 'var(--txt2)', background: aktiv ? 'var(--sea-xl)' : 'transparent' }}>{t}</div>
  )
  return (
    <div className="df-sidomeny" style={{ width: 210, flexShrink: 0, background: 'var(--white)', borderRight: HAIR, padding: '22px 10px', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontWeight: 700, letterSpacing: 3, color: 'var(--sea)', fontSize: 13, padding: '0 14px 22px' }}>SVALLA</div>
      <div style={{ height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #0fa0b4, #0a7b8c)', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>+ Logga tur</div>
      {punkt('Utforska')}{punkt('Planera')}{punkt('Flöde')}{punkt('Sök')}{punkt('Meddelanden', true)}{punkt('Notiser')}
    </div>
  )
}

function Valjare({ v, vy }: { v: Riktning; vy: Vy }) {
  const lank = (aktiv: boolean): CSSProperties => ({
    padding: '4px 9px', borderRadius: 999, fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
    color: aktiv ? 'var(--sea-d)' : 'rgba(255,255,255,0.85)', background: aktiv ? '#fff' : 'transparent',
  })
  return (
    <div className="df-valjare" style={{ background: 'var(--sea-d)', color: '#fff', padding: '6px 10px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
      <a href="/designforslag/meddelanden" style={{ ...lank(false), color: '#fff', opacity: 0.75, fontWeight: 500 }}>Förslag, inte live</a>
      {RIKTNINGAR.map(r => <a key={r.id} href={`?v=${r.id}&vy=${vy}`} style={lank(r.id === v)}>{r.kort}</a>)}
      <span className="df-vybyte" style={{ display: 'inline-flex', gap: 4, marginLeft: 'auto' }}>
        <a href={`?v=${v}&vy=inkorg`} style={lank(vy === 'inkorg')}>Inkorg</a>
        <a href={`?v=${v}&vy=samtal`} style={lank(vy === 'samtal')}>Samtal</a>
      </span>
    </div>
  )
}

const VYER: Record<Riktning, { inkorg: () => ReactNode; samtal: () => ReactNode }> = {
  idag: { inkorg: IdagInkorg, samtal: IdagSamtal },
  hamn: { inkorg: HamnInkorg, samtal: HamnSamtal },
  sjokort: { inkorg: SjokortInkorg, samtal: SjokortSamtal },
  iphone: { inkorg: IphoneInkorg, samtal: IphoneSamtal },
}

const CSS = `
  .df-rot { display: flex; flex-direction: column; height: 100dvh; overflow: hidden; }
  .df-yta { flex: 1; min-height: 0; display: flex; }
  .df-sidomeny { display: none; }
  .df-mobil { flex: 1; min-width: 0; overflow: hidden; }
  .df-mobil > div { height: 100%; overflow: hidden; }
  .df-dator { display: none; }
  @media (min-width: 900px) {
    .df-sidomeny { display: flex; }
    .df-mobil { display: none; }
    .df-dator { display: flex; flex: 1; min-width: 0; }
    .df-vybyte { display: none !important; }
  }
`

function Oversikt() {
  const kort: { v: Riktning; text: string }[] = [
    { v: 'idag', text: 'Så ser meddelanden ut i dag, återskapat från koden.' },
    { v: 'hamn', text: 'Svallas eget formspråk, finslipat. Samma upplägg som i dag, men lugnare och tydligare.' },
    { v: 'sjokort', text: 'Mer skärgård: kort i inkorgen, stora sjökortskort för positioner och turer.' },
    { v: 'iphone', text: 'Byggt som Apples egen Meddelanden-app, i Svallas blå.' },
  ]
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 16px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: 30, margin: 0, color: 'var(--txt)' }}>Designförslag: meddelanden</h1>
      <p style={{ color: 'var(--txt3)', fontSize: 16, lineHeight: 1.5 }}>Exempeldata. Inget här är live, och inget sparas.</p>
      {kort.map(k => (
        <div key={k.v} style={{ background: 'var(--white)', border: HAIR, borderRadius: 18, padding: 16, marginTop: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)' }}>{RIKTNINGAR.find(r => r.id === k.v)?.namn}</div>
          <div style={{ fontSize: 15, color: 'var(--txt2)', margin: '4px 0 10px', lineHeight: 1.45 }}>{k.text}</div>
          <a href={`?v=${k.v}&vy=inkorg`} style={{ color: 'var(--sea)', fontWeight: 600, marginRight: 16 }}>Inkorg</a>
          <a href={`?v=${k.v}&vy=samtal`} style={{ color: 'var(--sea)', fontWeight: 600 }}>Samtal</a>
        </div>
      ))}
    </div>
  )
}

export default async function Designforslag({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const vRa = typeof sp.v === 'string' ? sp.v : ''
  const v = (RIKTNINGAR.some(r => r.id === vRa) ? vRa : null) as Riktning | null
  const vy: Vy = sp.vy === 'samtal' ? 'samtal' : 'inkorg'
  if (!v) return <Oversikt />

  const { inkorg: Inkorg, samtal: Samtal } = VYER[v]
  return (
    <div className="df-rot">
      <style>{CSS}</style>
      <Valjare v={v} vy={vy} />
      <div className="df-yta">
        <Sidomeny />
        <div className="df-mobil">{vy === 'inkorg' ? Inkorg() : Samtal()}</div>
        <div className="df-dator">
          {v === 'idag' ? (
            // I dag på dator: en smal kolumn mitt på, samtalet öppnas som egen sida.
            <div style={{ flex: 1, overflow: 'hidden', background: 'var(--bg)' }}>{vy === 'inkorg' ? Inkorg() : Samtal()}</div>
          ) : (
            <>
              <div style={{ width: 380, flexShrink: 0, borderRight: HAIR, overflow: 'hidden', background: 'var(--bg)' }}>{Inkorg()}</div>
              <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>{Samtal()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
