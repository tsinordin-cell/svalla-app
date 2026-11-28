/**
 * Svallas gemensamma länkförhandsvisning (1200×630) för allt som delas:
 * turer, öar, platser, guider, tips, blogg, forum, rutter, planerade rutter,
 * Wrapped, profiler och sidor utan egen bild.
 *
 * 2026-11-28 (Tom: "Behöver ha samma tema på samtliga delningssidor, men
 * behålla innebörden för vad det är för länk"): samma ljusa tema som
 * svalla.se:s egen delningsbild (src/app/opengraph-image.tsx), i stället för
 * den mörka mallen från 2026-11-19.
 * - Sandfärgad bakgrund, blått hav med vågig kant längst ner, loggan i marinblått
 * - Till vänster: etikett (vad det är), rubrik i Playfair, faktarad, ingress, tal
 * - Till höger: fotot som ett vykort med fotografen under, annars rutten på ett
 *   papperskort, annars startscenens ö, flaggstång och fyr på havet
 * - I havet: avsändaren (@användare) och adressen i vitt
 *
 * Bilden skickas som JPEG. Som PNG blev ett kort med foto runt 1 MB (mätt på
 * en tur 2026-11-28), och turlänkar visades då utan bild i chattapparna.
 *
 * Satori-regler: varje div med fler än ett barn behöver display: flex, ingen
 * fit-content, inga dangerouslySetInnerHTML. Typsnitten kräver nodejs-runtime.
 */
import { ImageResponse } from 'next/og'
import type { ReactElement } from 'react'
import { ogTypsnitt } from '../_typsnitt/typsnitt'
import { ORDBILD_LITEN } from '@/components/svallaOrdbild'
import { ruttPath, ruttStartSlut, type Punkt } from '@/lib/dela-klistermarken'
import { SCEN_B64 } from './scen.generated'
import { Buffer } from 'buffer'
import sharp from 'sharp'

export const OG_W = 1200
export const OG_H = 630
export const OG_STORLEK = { width: OG_W, height: OG_H } as const

const MARG = 64
const FONT = 'Inter, system-ui, sans-serif'
const SERIF = 'Playfair Display, Georgia, serif'
// Startsidans färger (samma som src/app/opengraph-image.tsx)
const SAND = '#efe7d6'
const PAPPER = '#fbf8f1'
const LINJE = '#ddd3bf'
const BLA = '#1b57a0'
const MARIN = '#0a2540'
const TEXT = '#3a4d5c'
const ORANGE = '#b5591a'
const ORANGE_LJUS = '#e8924a'
/** Havets överkant. */
const HAV = 560
/** Högerpanelen: vykortet med foto eller papperskortet med rutten. */
export const PANEL = { x: 684, y: 44, w: 468, h: 440 } as const

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
  /** Eget innehåll i högerpanelen utan foto (t.ex. rutten, ritad i PANEL-mått). Annars startscenen. */
  hoger?: ReactElement | null
  /** Adressen i sidfoten. */
  adress?: string
  /**
   * Fotografens namn och licens, t.ex. "Foto: Rosser1954 · CC BY-SA 3.0 · Wikimedia Commons".
   * Krävs för Commons-bilder (licensvillkor, inte artighet). Visas under fotot.
   */
  fotokredit?: string | null
}

/**
 * Hämtar en bild och gör den till en JPEG-data-URI i kortets storlek: roterad
 * enligt EXIF, beskuren, och i ett format som satori klarar (webp, heic m.fl.
 * sänker annars hela bilden). null om den inte går att hämta eller inte är en
 * bild, då ritas kortet utan foto. Beskärs till vykortets mått (dubbel upplösning). Bara https.
 */
export async function ogFoto(url: string | null | undefined): Promise<string | null> {
  if (!url) return null
  let u: URL
  try { u = new URL(url) } catch { return null }
  if (u.protocol !== 'https:') return null
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 6000)
    // Wikimedia vill ha ett eget User-Agent; övriga värdar bryr sig inte.
    const res = await fetch(u, { signal: ctrl.signal, cache: 'no-store', headers: { 'User-Agent': 'Svalla/1.0 (+https://svalla.se)' } })
    clearTimeout(t)
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null
    const ab = await res.arrayBuffer()
    if (ab.byteLength > 15 * 1024 * 1024) return null
    const buf = await sharp(Buffer.from(ab), { limitInputPixels: 50_000_000 })
      .rotate()
      .resize(PANEL.w * 2, PANEL.h * 2, { fit: 'cover', position: 'attention' })
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
  return <div style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(58,77,92,0.45)', display: 'flex' }} />
}

function scen(namn: keyof typeof SCEN_B64 | string) {
  const b = SCEN_B64[namn]
  return b ? { src: `data:image/png;base64,${b.png}`, b: b.b, h: b.h } : null
}

/** Svallas logga (samma former som SvallaLogo), i marinblått som i startsidans meny. */
function Logga({ hojd }: { hojd: number }) {
  return (
    <svg viewBox="0 0 90 28" width={hojd * 90 / 28} height={hojd} style={{ display: 'flex' }}>
      <g transform="translate(0,2)">
        <line x1="9" y1="20" x2="9" y2="3" stroke={MARIN} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9,4 L18,18 L9,18 Z" fill={MARIN} opacity="0.9" />
        <path d="M9,8 L1,17 L9,17 Z" fill={MARIN} opacity="0.5" />
        <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke={MARIN} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>
      <path transform="translate(23 20) scale(0.0155) translate(-55 0)" fill={MARIN} d={ORDBILD_LITEN} />
    </svg>
  )
}

/** Havet med mjukt vågig kant, som i startsidans scen. */
function Hav() {
  let d = `M0 ${HAV}`
  for (let x = 0; x < OG_W; x += 60) d += ` Q ${x + 30} ${HAV - 7} ${x + 60} ${HAV}`
  d += ` L ${OG_W} ${OG_H} L 0 ${OG_H} Z`
  return (
    <svg width={OG_W} height={OG_H} viewBox={`0 0 ${OG_W} ${OG_H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d={d} fill={BLA} />
    </svg>
  )
}

/** Startscenens sol, ö med flaggstång och fyr, när kortet inte har något eget till höger. */
function Scen() {
  const sol = scen('sol'), o = scen('o'), flagga = scen('flagga'), fyr = scen('fyr')
  const ox = 720
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: OG_W, height: OG_H, display: 'flex' }}>
      {/* eslint-disable @next/next/no-img-element -- satori renderar bara <img> */}
      {sol ? <img src={sol.src} alt="" width={sol.b} height={sol.h} style={{ position: 'absolute', left: 1060, top: 56, opacity: 0.92 }} /> : null}
      {o ? <img src={o.src} alt="" width={o.b} height={o.h} style={{ position: 'absolute', left: ox, top: HAV - o.h + 5 }} /> : null}
      {flagga ? <img src={flagga.src} alt="" width={flagga.b} height={flagga.h} style={{ position: 'absolute', left: ox + 263, top: HAV - 140 }} /> : null}
      {fyr ? <img src={fyr.src} alt="" width={fyr.b} height={fyr.h} style={{ position: 'absolute', left: ox + 396, top: HAV - fyr.h + 3 }} /> : null}
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  )
}

/** Rutten på papperskortet: blå linje, vit start, orange mål. null om rutten inte går att rita. */
export function OgRutt({ pts }: { pts: Punkt[] }): ReactElement | null {
  const RW = PANEL.w - 2 * 36, RH = PANEL.h - 2 * 36
  const d = ruttPath(pts, RW, RH, 0.1)
  const ss = ruttStartSlut(pts, RW, RH, 0.1)
  if (!d) return null
  return (
    <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'absolute', left: 36, top: 36 }}>
      <path d={d} stroke="rgba(27,87,160,0.16)" strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={BLA} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {ss ? <circle cx={ss.start[0]} cy={ss.start[1]} r={9} fill="#fff" stroke={MARIN} strokeWidth={4} /> : null}
      {ss ? <circle cx={ss.slut[0]} cy={ss.slut[1]} r={11} fill={ORANGE_LJUS} stroke="#fff" strokeWidth={4} /> : null}
    </svg>
  )
}

/** Flera rutter i samma skala (Wrapped: årets alla turer). null om inget går att rita. */
export function OgRutter({ grupper }: { grupper: Punkt[][] }): ReactElement | null {
  const RW = PANEL.w - 2 * 36, RH = PANEL.h - 2 * 36
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
    <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'absolute', left: 36, top: 36 }}>
      <path d={d} stroke="rgba(27,87,160,0.16)" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={BLA} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Två punkter (start och mål) som en streckad båge, för planerade rutter. */
export function OgStartMal(): ReactElement {
  const x0 = 80, y0 = PANEL.h - 100, x1 = PANEL.w - 80, y1 = 100
  const d = `M ${x0} ${y0} Q ${(x0 + x1) / 2 + 60} ${(y0 + y1) / 2 + 90} ${x1} ${y1}`
  return (
    <svg width={PANEL.w} height={PANEL.h} viewBox={`0 0 ${PANEL.w} ${PANEL.h}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d={d} stroke="rgba(27,87,160,0.16)" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d={d} stroke={BLA} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="2 16" />
      <circle cx={x0} cy={y0} r={11} fill="#fff" stroke={MARIN} strokeWidth={4} />
      <circle cx={x1} cy={y1} r={13} fill={ORANGE_LJUS} stroke="#fff" strokeWidth={4} />
    </svg>
  )
}

/** Ritar kortet och skickar det som JPEG (en bråkdel av PNG:ens storlek med foto). */
export async function ritaOgKort(k: OgKort, init?: { status?: number; headers?: Record<string, string> }): Promise<Response> {
  const fonts = await ogTypsnitt()
  const foto = k.foto ?? null
  const rubrik = kapa(k.rubrik || 'Svalla', 70)
  const rubrikStorlek = rubrik.length > 44 ? 42 : rubrik.length > 28 ? 50 : rubrik.length > 16 ? 58 : 66
  const under = (k.under ?? []).filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
  const tal = (k.tal ?? []).slice(0, 3)
  const ingress = k.ingress ? kapa(k.ingress, tal.length > 0 ? 90 : 140) : null
  const bred = PANEL.x - MARG - 40
  const adress = k.adress ?? 'svalla.se'
  const panel = foto || k.hoger
  const fisk = scen('fisk')

  const svar = new ImageResponse(
    (
      <div style={{ width: OG_W, height: OG_H, display: 'flex', position: 'relative', background: SAND, fontFamily: FONT, overflow: 'hidden' }}>
        {panel ? null : <Scen />}
        <Hav />
        {fisk ? (
          // eslint-disable-next-line @next/next/no-img-element -- satori renderar bara <img>
          <img src={fisk.src} alt="" width={fisk.b} height={fisk.h} style={{ position: 'absolute', left: 980, top: HAV + 30, opacity: 0.45 }} />
        ) : null}

        {foto ? (
          <div style={{ position: 'absolute', left: PANEL.x, top: PANEL.y, width: PANEL.w, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{
              width: PANEL.w, height: PANEL.h, display: 'flex', background: '#fff', padding: 10, borderRadius: 22,
              boxShadow: '0 10px 30px rgba(10,37,64,0.18)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- satori renderar bara <img> */}
              <img src={foto} alt="" width={PANEL.w - 20} height={PANEL.h - 20} style={{ width: PANEL.w - 20, height: PANEL.h - 20, objectFit: 'cover', borderRadius: 14 }} />
            </div>
            {k.fotokredit ? (
              <div style={{ display: 'flex', marginTop: 10, fontFamily: FONT, fontSize: 13, fontWeight: 500, color: TEXT }}>{kapa(k.fotokredit, 70)}</div>
            ) : null}
          </div>
        ) : k.hoger ? (
          <div style={{
            position: 'absolute', left: PANEL.x, top: PANEL.y, width: PANEL.w, height: PANEL.h, display: 'flex',
            background: PAPPER, border: `1px solid ${LINJE}`, borderRadius: 22, overflow: 'hidden',
          }}>
            {k.hoger}
          </div>
        ) : null}

        <div style={{ position: 'absolute', left: MARG, top: 52, display: 'flex' }}>
          <Logga hojd={38} />
        </div>

        <div style={{ position: 'absolute', left: MARG, bottom: OG_H - HAV + 34, width: bred, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {k.etikett ? (
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, letterSpacing: 2.5, color: ORANGE, display: 'flex', marginBottom: 12 }}>
              {k.etikett.toUpperCase()}
            </div>
          ) : null}

          <div style={{ fontFamily: SERIF, fontSize: rubrikStorlek, fontWeight: 700, color: MARIN, lineHeight: 1.06, letterSpacing: -1, display: 'flex' }}>{rubrik}</div>

          {(under.length > 0 || k.markering) ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
              {under.map((u, i) => (
                <div key={`${i}-${u}`} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {i > 0 ? <Prick /> : null}
                  <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 500, color: TEXT, display: 'flex' }}>{u}</div>
                </div>
              ))}
              {k.markering ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {under.length > 0 ? <Prick /> : null}
                  <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: ORANGE, display: 'flex' }}>{k.markering}</div>
                </div>
              ) : null}
            </div>
          ) : null}

          {ingress ? (
            <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 500, lineHeight: 1.4, color: TEXT, display: 'flex', marginTop: 14 }}>
              {ingress}
            </div>
          ) : null}

          {tal.length > 0 ? (
            <div style={{
              display: 'flex', marginTop: 24,
              background: PAPPER, border: `1px solid ${LINJE}`, borderRadius: 18,
              paddingTop: 16, paddingBottom: 14,
            }}>
              {tal.map((t, i) => (
                <div key={t.etikett} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  paddingLeft: 22, paddingRight: 22,
                  borderLeft: i > 0 ? `1px solid ${LINJE}` : '1px solid rgba(0,0,0,0)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 800, color: MARIN, lineHeight: 1, letterSpacing: -1, display: 'flex' }}>{t.val}</div>
                    {t.enhet ? <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: ORANGE, display: 'flex' }}>{t.enhet}</div> : null}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: TEXT, display: 'flex' }}>{t.etikett}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div style={{ position: 'absolute', left: MARG, top: HAV + 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          {k.avsandare ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 700, color: '#fff', display: 'flex' }}>{`@${k.avsandare}`}</div>
              <div style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.6)', display: 'flex' }} />
            </div>
          ) : null}
          <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 700, letterSpacing: 1, color: '#fff', display: 'flex' }}>{adress}</div>
        </div>
      </div>
    ),
    { ...OG_STORLEK, fonts },
  )

  const png = Buffer.from(await svar.arrayBuffer())
  const jpg = await sharp(png).flatten({ background: SAND }).jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true }).toBuffer()
  const headers = new Headers({ 'Cache-Control': svar.headers.get('cache-control') ?? 'public, max-age=3600' })
  for (const [n, v] of Object.entries(init?.headers ?? {})) headers.set(n, v)
  headers.set('Content-Type', 'image/jpeg')
  headers.set('Content-Length', String(jpg.length))
  return new Response(new Uint8Array(jpg), { status: init?.status ?? 200, headers })
}
