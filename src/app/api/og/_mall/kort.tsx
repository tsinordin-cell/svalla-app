/**
 * Svallas gemensamma länkförhandsvisning (1200×630) för allt som delas:
 * turer, öar, platser, guider, tips, blogg, forum, rutter, planerade rutter,
 * Wrapped och sidor utan egen bild.
 *
 * Varför (2026-11-19, Tom: "så alla länkar har samma tema när de delas"):
 * åtta olika utseenden, några utan logga, några med systemtypsnitt. Nu en mall
 * i turkortets formspråk, som Tom godkände:
 * - Logga med seglet och ordmärket SVALLA i Playfair Display uppe till vänster
 * - Etikett (vad det är), rubrik i Playfair, en rad med fakta, kort ingress
 * - Talpanel med bärnstensfärgade enheter när det finns siffror
 * - Foto över hela ytan med mörk toning från vänster och nerifrån; utan foto
 *   havsgradienten och till höger en egen panel (rutt) eller seglet, svagt
 * - Sidfot: avsändare (@användare) och adressen i bärnsten
 *
 * Satori-regler: varje div med fler än ett barn behöver display: flex, ingen
 * fit-content, inga dangerouslySetInnerHTML. Typsnitten kräver nodejs-runtime.
 */
import { ImageResponse } from 'next/og'
import type { ReactElement } from 'react'
import { ogTypsnitt } from '../_typsnitt/typsnitt'
import { Logga } from '../share/tur/[id]/klistermarken'
import { ruttPath, ruttStartSlut, type Punkt } from '@/lib/dela-klistermarken'
import { Buffer } from 'buffer'
import sharp from 'sharp'

export const OG_W = 1200
export const OG_H = 630
export const OG_STORLEK = { width: OG_W, height: OG_H } as const

const MARG = 56
const HOGER_B = 520
const FONT = 'Inter, system-ui, sans-serif'
const SERIF = 'Playfair Display, Georgia, serif'
const ORANGE = '#ff5c2e'
const BARNSTEN = '#f6b26b'
const NATT = '#060e18'

export type OgTal = { val: string; enhet?: string; etikett: string }

export type OgKort = {
  rubrik: string
  /** Vad det är, t.ex. "Ö · Mellersta skärgården", "Guide", "Forum". Versaler sätts här. */
  etikett?: string | null
  /** Faktarad under rubriken, punkter emellan. Tomma värden hoppas över. */
  under?: (string | null | undefined | false)[]
  /** Text i bärnsten sist på faktaraden, t.ex. "Magisk tur". */
  markering?: string | null
  /** Kort beskrivning, kapas vid ca 150 tecken. */
  ingress?: string | null
  tal?: OgTal[]
  /** Användarnamn utan @. */
  avsandare?: string | null
  /** Data-URI eller https-adress till en bild som redan kontrollerats. */
  foto?: string | null
  /** Egen högerpanel utan foto (t.ex. rutten). Annars seglet. */
  hoger?: ReactElement | null
  /** Adressen i sidfoten. */
  adress?: string
}

/**
 * Hämtar en bild och gör den till en JPEG-data-URI i kortets storlek: roterad
 * enligt EXIF, beskuren, och i ett format som satori klarar (webp, heic m.fl.
 * sänker annars hela bilden). null om den inte går att hämta eller inte är en
 * bild, då ritas kortet utan foto. Bara https.
 */
export async function ogFoto(url: string | null | undefined): Promise<string | null> {
  if (!url) return null
  let u: URL
  try { u = new URL(url) } catch { return null }
  if (u.protocol !== 'https:') return null
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 6000)
    const res = await fetch(u, { signal: ctrl.signal, cache: 'no-store' })
    clearTimeout(t)
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null
    const ab = await res.arrayBuffer()
    if (ab.byteLength > 15 * 1024 * 1024) return null
    const buf = await sharp(Buffer.from(ab), { limitInputPixels: 50_000_000 })
      .rotate()
      .resize(OG_W, OG_H, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer()
    return `data:image/jpeg;base64,${buf.toString('base64')}`
  } catch { return null }
}

function kapa(s: string, max: number): string {
  const t = s.replace(/\s+/g, ' ').replace(/\*\*/g, '').trim()
  if (t.length <= max) return t
  const kort = t.slice(0, max)
  const sista = kort.lastIndexOf(' ')
  return `${(sista > max * 0.6 ? kort.slice(0, sista) : kort).replace(/[,.;:–-]+$/, '')}…`
}

function Prick() {
  return <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.45)', display: 'flex' }} />
}

/** Seglet ur loggan, stort och svagt, i högerpanelen när inget annat finns. */
function Segel() {
  return (
    <svg viewBox="0 0 20 22" width={360} height={360} style={{ position: 'absolute', left: OG_W - HOGER_B + 90, top: 150, opacity: 0.1 }}>
      <line x1="9" y1="20" x2="9" y2="3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9,4 L18,18 L9,18 Z" fill="#fff" opacity="0.95" />
      <path d="M9,8 L1,17 L9,17 Z" fill="#fff" opacity="0.55" />
      <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8" />
    </svg>
  )
}

/** Rutten i högerpanelen: orange glöd, vit start, orange mål. null om rutten inte går att rita. */
export function OgRutt({ pts }: { pts: Punkt[] }): ReactElement | null {
  const RW = HOGER_B - 2 * 40, RH = OG_H - 2 * 70
  const d = ruttPath(pts, RW, RH, 0.1)
  const ss = ruttStartSlut(pts, RW, RH, 0.1)
  if (!d) return null
  return (
    <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'absolute', left: OG_W - HOGER_B + 40, top: 70 }}>
      <path d={d} stroke="rgba(0,0,0,0.30)" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="rgba(255,92,46,0.35)" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={ORANGE} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {ss ? <circle cx={ss.start[0]} cy={ss.start[1]} r={9} fill="#fff" stroke="rgba(6,14,24,0.7)" strokeWidth={4} /> : null}
      {ss ? <circle cx={ss.slut[0]} cy={ss.slut[1]} r={11} fill={ORANGE} stroke="#fff" strokeWidth={4} /> : null}
    </svg>
  )
}

/** Flera rutter i samma skala (Wrapped: årets alla turer). null om inget går att rita. */
export function OgRutter({ grupper }: { grupper: Punkt[][] }): ReactElement | null {
  const RW = HOGER_B - 2 * 40, RH = OG_H - 2 * 70
  const alla = grupper.flat()
  if (alla.length < 2) return null
  const lat0 = alla.reduce((s, p) => s + p.lat, 0) / alla.length
  const kx = Math.cos(lat0 * Math.PI / 180)
  const xs = alla.map(p => p.lng * kx), ys = alla.map(p => p.lat)
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys)
  const spanX = maxX - minX || 1e-6, spanY = maxY - minY || 1e-6
  const skala = Math.min(RW * 0.84 / spanX, RH * 0.84 / spanY)
  const ox = (RW - spanX * skala) / 2, oy = (RH - spanY * skala) / 2
  const d = grupper.filter(g => g.length >= 2).map(g => {
    const steg = Math.max(1, Math.floor(g.length / 150))
    return g.filter((_, i) => i % steg === 0 || i === g.length - 1)
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(ox + (p.lng * kx - minX) * skala).toFixed(1)} ${(oy + (maxY - p.lat) * skala).toFixed(1)}`).join(' ')
  }).join(' ')
  if (!d) return null
  return (
    <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'absolute', left: OG_W - HOGER_B + 40, top: 70 }}>
      <path d={d} stroke="rgba(255,92,46,0.30)" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={ORANGE} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Två punkter (start och mål) som en rak, streckad linje, för planerade rutter. */
export function OgStartMal(): ReactElement {
  const x0 = OG_W - HOGER_B + 90, y0 = 430, x1 = OG_W - 90, y1 = 170
  return (
    <svg width={OG_W} height={OG_H} viewBox={`0 0 ${OG_W} ${OG_H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + 60} ${(y0 + y1) / 2 + 90} ${x1} ${y1}`} stroke="rgba(255,92,46,0.35)" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + 60} ${(y0 + y1) / 2 + 90} ${x1} ${y1}`} stroke={ORANGE} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="2 16" />
      <circle cx={x0} cy={y0} r={11} fill="#fff" stroke="rgba(6,14,24,0.7)" strokeWidth={4} />
      <circle cx={x1} cy={y1} r={13} fill={ORANGE} stroke="#fff" strokeWidth={4} />
    </svg>
  )
}

export async function ritaOgKort(k: OgKort, init?: { status?: number; headers?: Record<string, string> }): Promise<ImageResponse> {
  const fonts = await ogTypsnitt()
  const foto = k.foto ?? null
  const rubrik = kapa(k.rubrik || 'Svalla', 70)
  const rubrikStorlek = rubrik.length > 48 ? 40 : rubrik.length > 30 ? 46 : rubrik.length > 20 ? 56 : 68
  const under = (k.under ?? []).filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
  const tal = (k.tal ?? []).slice(0, 3)
  const ingress = k.ingress ? kapa(k.ingress, tal.length > 0 ? 110 : 150) : null
  const bred = foto ? OG_W - 2 * MARG : OG_W - HOGER_B - MARG + 20
  const adress = k.adress ?? 'svalla.se'

  return new ImageResponse(
    (
      <div style={{ width: OG_W, height: OG_H, display: 'flex', position: 'relative', background: NATT, fontFamily: FONT, overflow: 'hidden' }}>
        {/* Havsgradienten, samma som storykortet utan foto */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: OG_W, height: OG_H, display: 'flex', background: 'linear-gradient(165deg, #091522 0%, #0d2038 45%, #0b2a3d 70%, #060e18 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: OG_W, height: OG_H, display: 'flex', background: 'radial-gradient(ellipse 60% 70% at 78% 45%, rgba(30,110,150,0.26) 0%, rgba(30,110,150,0) 70%)' }} />

        {foto ? (
          <div style={{ position: 'absolute', left: 0, top: 0, width: OG_W, height: OG_H, display: 'flex' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- satori renderar bara <img> */}
            <img src={foto} alt="" width={OG_W} height={OG_H} style={{ width: OG_W, height: OG_H, objectFit: 'cover' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: OG_W, height: OG_H, display: 'flex', background: 'linear-gradient(90deg, rgba(6,14,24,0.86) 0%, rgba(6,14,24,0.62) 34%, rgba(6,14,24,0.18) 64%, rgba(6,14,24,0.04) 100%)' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: OG_W, height: OG_H, display: 'flex', background: 'linear-gradient(to bottom, rgba(6,14,24,0.45) 0%, rgba(6,14,24,0) 28%, rgba(6,14,24,0) 48%, rgba(6,14,24,0.86) 100%)' }} />
          </div>
        ) : (k.hoger ?? <Segel />)}

        <div style={{ position: 'absolute', left: MARG, top: 48, display: 'flex' }}>
          <Logga storlek={26} pill={!!foto} />
        </div>

        <div style={{ position: 'absolute', left: MARG, bottom: 52, width: bred, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {k.etikett ? (
            <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, letterSpacing: 2.5, color: BARNSTEN, display: 'flex', marginBottom: 12 }}>
              {k.etikett.toUpperCase()}
            </div>
          ) : null}

          <div style={{
            fontFamily: SERIF, fontSize: rubrikStorlek, fontWeight: 700, color: '#fff',
            lineHeight: 1.08, letterSpacing: -1, display: 'flex',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>{rubrik}</div>

          {(under.length > 0 || k.markering) ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
              {under.map((u, i) => (
                <div key={`${i}-${u}`} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {i > 0 ? <Prick /> : null}
                  <div style={{ fontFamily: FONT, fontSize: 23, fontWeight: 500, color: 'rgba(255,255,255,0.80)', display: 'flex' }}>{u}</div>
                </div>
              ))}
              {k.markering ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {under.length > 0 ? <Prick /> : null}
                  <div style={{ fontFamily: FONT, fontSize: 23, fontWeight: 700, color: BARNSTEN, display: 'flex' }}>{k.markering}</div>
                </div>
              ) : null}
            </div>
          ) : null}

          {ingress ? (
            <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 500, lineHeight: 1.4, color: 'rgba(255,255,255,0.72)', display: 'flex', marginTop: 14, maxWidth: Math.min(bred, 760) }}>
              {ingress}
            </div>
          ) : null}

          {tal.length > 0 ? (
            <div style={{
              display: 'flex', marginTop: 26,
              background: 'rgba(6,14,24,0.58)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20,
              paddingTop: 18, paddingBottom: 16,
            }}>
              {tal.map((t, i) => (
                <div key={t.etikett} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  paddingLeft: 26, paddingRight: 26,
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -1, display: 'flex' }}>{t.val}</div>
                    {t.enhet ? <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: BARNSTEN, display: 'flex' }}>{t.enhet}</div> : null}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.58)', display: 'flex' }}>{t.etikett}</div>
                </div>
              ))}
            </div>
          ) : null}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26 }}>
            {k.avsandare ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 14, fontWeight: 800, color: '#fff',
                }}>{(k.avsandare[0] ?? 'S').toUpperCase()}</div>
                <div style={{ fontFamily: FONT, fontSize: 19, fontWeight: 600, color: 'rgba(255,255,255,0.78)', display: 'flex' }}>{`@${k.avsandare}`}</div>
                <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.35)', display: 'flex', marginLeft: 4, marginRight: 4 }} />
              </div>
            ) : null}
            <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, letterSpacing: 1, color: 'rgba(246,178,107,0.9)', display: 'flex' }}>{adress}</div>
          </div>
        </div>
      </div>
    ),
    { ...OG_STORLEK, fonts, ...(init ?? {}) },
  )
}
