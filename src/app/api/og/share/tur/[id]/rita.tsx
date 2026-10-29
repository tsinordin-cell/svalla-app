/**
 * Ritar delningsbilderna för en tur (storykorten Bild och Karta samt de fyra
 * klistermärkena). Ingen databas här: rutten (route.tsx) hämtar och cachar,
 * den här filen ritar. Därför kan scripts/dela-forhandsvisning.tsx rita samma
 * bilder lokalt med sparad data.
 *
 * Storykorten gjordes om 2026-10-26 efter Thomas första riktiga story
 * ("Detta kan du göra mycket snyggare och mer premium"):
 * - Kartan är OSM:s rutor tonade mörka (negativ + 180° färgton + navyton i
 *   sharp), så vattnet blir djupblått och land nästan svart; rutten glöder
 *   orange ovanpå. CARTO:s mörka kartor kräver nyckel (map-tiles.ts).
 * - Allt viktigt ligger inom Instagrams säkra zon (ca 270 px från toppen och
 *   380 px från botten täcks av deras eget gränssnitt): loggan vid y 290,
 *   panelen med plats, datum och tal slutar vid y 1520.
 * - Platsnamnet i Playfair Display (sajtens rubriktypsnitt), talen i en enda
 *   panel med avdelare som tursidans talkort, användarnamnet och svalla.se
 *   små längst ner.
 * - En tur utan användbar rutt (ruttArAnvandbar) får Bild-kortet i stället för
 *   en gatukarta med en prick; utan bild blir det Svallas mörka gradient.
 */
import { ImageResponse } from 'next/og'
import type { ReactElement } from 'react'
import { Buffer } from 'buffer'
import sharp from 'sharp'
import { stil, delstrackStaplar, talRutor, formatTid, ruttArAnvandbar, datumLang, turRubrik, BILD_VERSION, type StilId, type Punkt } from '@/lib/dela-klistermarken'
import { computeSplits } from '@/lib/tripSplits'
import { klisterRutt, klisterTal, klisterRuttTal, klisterDelstrackor, Logga, type KlisterData } from './klistermarken'
import type { GpsPoint } from '@/lib/gps'

export type TripRad = {
  user_id: string; location_name: string | null; start_location: string | null
  distance: number; duration: number; duration_seconds: number | null
  max_speed_knots: number | null; average_speed_knots: number | null; boat_type: string | null
  route_points: unknown; started_at: string | null; pinnar_rating: number | null
  image: string | null; images: unknown
}

type Typsnitt = { name: string; data: ArrayBuffer; weight: 500 | 700 | 800; style: 'normal' }

export const W = 1080
export const H = 1920
/** Versionen ligger i src/lib/dela-klistermarken.ts (delas med delningsrutan). */
export { BILD_VERSION }

// Instagrams säkra zon för en 1080×1920-story: deras eget gränssnitt ligger
// över de översta ca 270 och de nedersta ca 380 bildpunkterna.
const SAKER_TOPP = 290
const SAKER_BOTTEN = 400          // avstånd från nederkanten
const MARG = 72

const FONT = 'Inter, system-ui, sans-serif'
const SERIF = 'Playfair Display, Georgia, serif'
const ORANGE = '#ff5c2e'
const BARNSTEN = '#f6b26b'
const NATT = '#060e18'

// ── Mercator ─────────────────────────────────────────────────────────────────

const lngToTX = (lng: number, z: number) => ((lng + 180) / 360) * 2 ** z
const latToTY = (lat: number, z: number) => {
  const r = lat * Math.PI / 180
  return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * 2 ** z
}

async function hamtaRuta(tx: number, ty: number, z: number): Promise<Buffer | null> {
  const max = 2 ** z
  if (ty < 0 || ty >= max) return null
  const ntx = ((tx % max) + max) % max
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 4000)
    const res = await fetch(`https://tile.openstreetmap.org/${z}/${ntx}/${ty}.png`, {
      headers: { 'User-Agent': 'Svalla/1.0 (+https://svalla.se)' },
      next: { revalidate: 86400 },
      signal: ctrl.signal,
    })
    clearTimeout(t)
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch { return null }
}

/** Var på kortet rutten ska ligga: bandet mellan loggan och panelen. */
const RUTT_TOPP = 440
const RUTT_BOTTEN = 1120

export type MorkKarta = {
  /** JPEG som data-URI, hela kortets storlek */
  bild: string
  /** lat/lng → bildpunkt på kortet */
  punkt: (p: Punkt) => [number, number]
}

/**
 * Hämtar OSM-rutor runt rutten, lägger ihop dem till en enda bild i kortets
 * storlek och tonar den mörk. Zoomen väljs så att rutten fyller bandet
 * RUTT_TOPP–RUTT_BOTTEN, högst zoom 15 (kvartersnivå ser aldrig bra ut).
 */
export async function morkKarta(pts: Punkt[]): Promise<MorkKarta> {
  const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const bandH = RUTT_BOTTEN - RUTT_TOPP
  let Z = 15
  for (; Z > 6; Z--) {
    const spanX = (lngToTX(maxLng, Z) - lngToTX(minLng, Z)) * 256
    const spanY = (latToTY(minLat, Z) - latToTY(maxLat, Z)) * 256
    if (spanX <= W * 0.74 && spanY <= bandH * 0.80) break
  }
  const cx = (lngToTX(minLng, Z) + lngToTX(maxLng, Z)) / 2
  const cy = (latToTY(minLat, Z) + latToTY(maxLat, Z)) / 2
  const px0 = Math.round(cx * 256 - W / 2)
  const py0 = Math.round(cy * 256 - (RUTT_TOPP + RUTT_BOTTEN) / 2)
  const txStart = Math.floor(px0 / 256), tyStart = Math.floor(py0 / 256)
  const cols = Math.ceil((px0 + W) / 256) - txStart
  const rows = Math.ceil((py0 + H) / 256) - tyStart

  const jobb: Promise<{ dx: number; dy: number; buf: Buffer | null }>[] = []
  for (let dy = 0; dy < rows; dy++) for (let dx = 0; dx < cols; dx++) {
    jobb.push(hamtaRuta(txStart + dx, tyStart + dy, Z).then(buf => ({ dx, dy, buf })))
  }
  const rutor = await Promise.all(jobb)

  // Tre steg med buffert emellan: sharp kör composite sist i en kedja oavsett
  // anropsordning, och ett andra composite() ersätter det första.
  const lagda = await sharp({ create: { width: cols * 256, height: rows * 256, channels: 3, background: '#aad3df' } })
    .composite(rutor.filter(r => r.buf).map(r => ({ input: r.buf!, left: r.dx * 256, top: r.dy * 256 })))
    .png().toBuffer()
  const tonad = await sharp(lagda)
    .extract({ left: px0 - txStart * 256, top: py0 - tyStart * 256, width: W, height: H })
    .negate({ alpha: false })
    // Dämpad ton (vald 2026-10-26 av tre varianter): lite mättnad så att OSM:s
    // röda vägar inte blir rosa, lätt kontrast, navyton över alltihop.
    .modulate({ hue: 180, saturation: 0.32, brightness: 0.95 })
    .linear(1.12, -8)
    .png().toBuffer()
  const navy = Buffer.from(`<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="rgb(9,21,34)" fill-opacity="0.40"/></svg>`)
  const bild = await sharp(tonad)
    .composite([{ input: navy }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer()

  return {
    bild: `data:image/jpeg;base64,${bild.toString('base64')}`,
    punkt: (p) => [lngToTX(p.lng, Z) * 256 - px0, latToTY(p.lat, Z) * 256 - py0],
  }
}

/**
 * Turens bild som data-URI i kortets storlek: roterad enligt EXIF (satori
 * struntar i EXIF, så stående mobilbilder låg på sidan, sett 2026-10-26) och
 * beskuren till 9:16. null om bilden inte går att hämta → gradienten i stället.
 */
export async function hamtaFoto(url: string): Promise<string | null> {
  // Bara bilder ur Svallas egen lagring. trips.image kan ägaren skriva fritt
  // (RLS trips_update_own), och servern ska inte hämta godtyckliga adresser
  // eller avkoda hur stora filer som helst (granskning 2026-10-29).
  let u: URL
  try { u = new URL(url) } catch { return null }
  if (u.protocol !== 'https:' || u.hostname !== 'oiklttwylndesewauytj.supabase.co' || !u.pathname.startsWith('/storage/v1/object/public/')) return null
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(url, { signal: ctrl.signal, next: { revalidate: 86400 } })
    clearTimeout(t)
    if (!res.ok) return null
    const ab = await res.arrayBuffer()
    if (ab.byteLength > 15 * 1024 * 1024) return null
    const buf = await sharp(Buffer.from(ab), { limitInputPixels: 50_000_000 })
      .rotate()
      .resize(W, H, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 86, mozjpeg: true })
      .toBuffer()
    return `data:image/jpeg;base64,${buf.toString('base64')}`
  } catch { return null }
}

/** SVG-path genom rutten med kortets projektion. */
function ruttPathPa(pts: Punkt[], punkt: (p: Punkt) => [number, number], maxPunkter = 300): string {
  const steg = Math.max(1, Math.floor(pts.length / maxPunkter))
  const urval = pts.filter((_, i) => i % steg === 0 || i === pts.length - 1)
  return urval.map((p, i) => { const [x, y] = punkt(p); return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}` }).join(' ')
}

// ── Byggstenar ───────────────────────────────────────────────────────────────

type Tal = { val: string; enhet: string; etikett: string }

function talFor(trip: TripRad): Tal[] {
  const sek = trip.duration_seconds ?? (trip.duration > 0 ? trip.duration * 60 : null)
  const ut: Tal[] = []
  if (trip.distance >= 0.1) ut.push({ val: trip.distance.toFixed(1).replace('.', ','), enhet: 'NM', etikett: 'DISTANS' })
  if (sek !== null && sek >= 60) ut.push({ val: formatTid(sek), enhet: '', etikett: 'TID' })
  if ((trip.average_speed_knots ?? 0) >= 0.1) ut.push({ val: (trip.average_speed_knots ?? 0).toFixed(1).replace('.', ','), enhet: 'kn', etikett: 'SNITTFART' })
  if ((trip.max_speed_knots ?? 0) >= 0.1) ut.push({ val: (trip.max_speed_knots ?? 0).toFixed(1).replace('.', ','), enhet: 'kn', etikett: 'TOPPFART' })
  return ut.slice(0, 4)
}

/** Panelen med plats, datum, tal och sidfot. Sitter alltid inom den säkra zonen. */
function Panel({ trip, username }: { trip: TripRad; username: string }) {
  const plats = trip.start_location && trip.location_name
    ? `${trip.start_location} → ${trip.location_name}`
    : (trip.location_name ?? trip.start_location ?? turRubrik(trip.boat_type))
  const storlek = plats.length > 26 ? 52 : plats.length > 16 ? 64 : 78
  const datum = datumLang(trip.started_at)
  const under = [trip.boat_type ?? null, datum].filter(Boolean) as string[]
  const tal = talFor(trip)
  const magisk = trip.pinnar_rating === 3

  return (
    <div style={{
      position: 'absolute', left: MARG, right: MARG, bottom: SAKER_BOTTEN,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    }}>
      {/* Plats */}
      <div style={{
        fontFamily: SERIF, fontSize: storlek, fontWeight: 700, color: '#fff',
        lineHeight: 1.08, letterSpacing: -1, display: 'flex',
        textShadow: '0 2px 24px rgba(0,0,0,0.55)',
      }}>{plats}</div>

      {/* Båttyp · datum · magisk */}
      {(under.length > 0 || magisk) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
          {under.map((u, i) => (
            <div key={u} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {i > 0 ? <div style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.45)', display: 'flex' }} /> : null}
              <div style={{ fontFamily: FONT, fontSize: 27, fontWeight: 500, color: 'rgba(255,255,255,0.74)', display: 'flex' }}>{u}</div>
            </div>
          ))}
          {magisk ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {under.length > 0 ? <div style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.45)', display: 'flex' }} /> : null}
              <div style={{ fontFamily: FONT, fontSize: 27, fontWeight: 700, color: BARNSTEN, display: 'flex' }}>Magisk tur</div>
            </div>
          ) : null}
        </div>
      )}

      {/* Tal */}
      {tal.length > 0 && (
        <div style={{
          display: 'flex', width: W - 2 * MARG, marginTop: 34,
          background: 'rgba(6,14,24,0.58)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 28,
          paddingTop: 28, paddingBottom: 26,
        }}>
          {tal.map((t, i) => (
            <div key={t.etikett} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <div style={{ fontFamily: FONT, fontSize: tal.length >= 4 ? 50 : 58, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -2, display: 'flex' }}>{t.val}</div>
                {t.enhet ? <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: BARNSTEN, display: 'flex' }}>{t.enhet}</div> : null}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,0.58)', display: 'flex' }}>{t.etikett}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sidfot */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: W - 2 * MARG, marginTop: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 17, fontWeight: 800, color: '#fff',
          }}>{(username[0] ?? 'S').toUpperCase()}</div>
          <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.78)', display: 'flex' }}>{`@${username}`}</div>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, letterSpacing: 1, color: 'rgba(246,178,107,0.85)', display: 'flex' }}>svalla.se</div>
      </div>
    </div>
  )
}

/** Mörk gradient upptill och nedtill så att Instagrams gränssnitt och panelen får lugn bakgrund. */
function Toningar({ starkare }: { starkare: boolean }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 420, width: W, display: 'flex', background: 'linear-gradient(to bottom, rgba(6,14,24,0.82) 0%, rgba(6,14,24,0.30) 60%, rgba(6,14,24,0) 100%)' }} />
      <div style={{ flex: 1, display: 'flex' }} />
      <div style={{ height: 900, width: W, display: 'flex', background: `linear-gradient(to bottom, rgba(6,14,24,0) 0%, rgba(6,14,24,${starkare ? 0.80 : 0.70}) 34%, rgba(6,14,24,0.96) 62%, ${NATT} 100%)` }} />
    </div>
  )
}

function Topp() {
  return (
    <div style={{ position: 'absolute', left: MARG, top: SAKER_TOPP, display: 'flex' }}>
      <Logga storlek={32} pill />
    </div>
  )
}

// ── Korten ───────────────────────────────────────────────────────────────────

async function kartkort(trip: TripRad, username: string, rutt: Punkt[], fonts: Typsnitt[]): Promise<ImageResponse> {
  const karta = await morkKarta(rutt)
  const d = ruttPathPa(rutt, karta.punkt)
  const [sx, sy] = karta.punkt(rutt[0]!)
  const [ex, ey] = karta.punkt(rutt[rutt.length - 1]!)
  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', position: 'relative', background: NATT, fontFamily: FONT, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={karta.bild} alt="" width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H }} />
        <Toningar starkare={false} />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d={d} stroke="rgba(255,92,46,0.16)" strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} stroke="rgba(255,92,46,0.42)" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} stroke={ORANGE} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={sx} cy={sy} r={11} fill="#fff" stroke="rgba(6,14,24,0.7)" strokeWidth={4} />
          <circle cx={ex} cy={ey} r={13} fill={ORANGE} stroke="#fff" strokeWidth={4} />
        </svg>
        <Topp />
        <Panel trip={trip} username={username} />
      </div>
    ),
    { width: W, height: H, fonts },
  )
}

function bildkort(trip: TripRad, username: string, rutt: Punkt[] | null, fotoUrl: string | null, fonts: Typsnitt[]): ImageResponse {
  // fotoUrl är här en data-URI från hamtaFoto (rätt vänd, 1080×1920) eller null.
  // Rutten ritas fritt (utan karta) i bandet mellan loggan och panelen.
  const RW = W - 2 * MARG, RH = RUTT_BOTTEN - RUTT_TOPP
  const d = rutt ? ruttPathFri(rutt, RW, RH) : ''
  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', position: 'relative', background: NATT, fontFamily: FONT, overflow: 'hidden' }}>
        {fotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fotoUrl} alt="" width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, display: 'flex', background: 'linear-gradient(165deg, #091522 0%, #0d2038 45%, #0b2a3d 70%, #060e18 100%)' }} />
        )}
        {!fotoUrl ? (
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, display: 'flex', background: 'radial-gradient(ellipse 70% 45% at 50% 42%, rgba(30,110,150,0.22) 0%, rgba(30,110,150,0) 70%)' }} />
        ) : null}
        <Toningar starkare={!!fotoUrl} />
        {d ? (
          <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'absolute', left: MARG, top: RUTT_TOPP }}>
            <path d={d} stroke="rgba(0,0,0,0.30)" strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} stroke="rgba(255,92,46,0.35)" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} stroke={ORANGE} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
        <Topp />
        <Panel trip={trip} username={username} />
      </div>
    ),
    { width: W, height: H, fonts },
  )
}

/** Rutten i en ruta utan karta, med behållna proportioner (samma som klistermärkena). */
function ruttPathFri(pts: Punkt[], RW: number, RH: number): string {
  const lat0 = pts.reduce((s, p) => s + p.lat, 0) / pts.length
  const kx = Math.cos(lat0 * Math.PI / 180)
  const xs = pts.map(p => p.lng * kx), ys = pts.map(p => p.lat)
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys)
  const spanX = maxX - minX || 1e-6, spanY = maxY - minY || 1e-6
  const pad = 0.10
  const skala = Math.min(RW * (1 - 2 * pad) / spanX, RH * (1 - 2 * pad) / spanY)
  const ox = (RW - spanX * skala) / 2, oy = (RH - spanY * skala) / 2
  const steg = Math.max(1, Math.floor(pts.length / 300))
  return pts.filter((_, i) => i % steg === 0 || i === pts.length - 1).map((p, i) => {
    const x = ox + (p.lng * kx - minX) * skala
    const y = RH - (oy + (p.lat - minY) * skala)
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

// ── Ingång ───────────────────────────────────────────────────────────────────

export async function ritaBild({ trip, username, punkter, style, fonts }: {
  trip: TripRad; username: string; punkter: GpsPoint[]; style: StilId; fonts: Typsnitt[]
}): Promise<ImageResponse | Response> {
  const rutt = ruttArAnvandbar(trip.route_points as Punkt[] | null) ? (trip.route_points as Punkt[]) : null
  const fotoUrl = trip.image ?? (Array.isArray(trip.images) ? ((trip.images as string[])[0] ?? null) : null)

  // Klistermärken: genomskinliga, utan bakgrund, ovanpå användarens egen bild.
  if (style === 'rutt' || style === 'tal' || style === 'rutt-tal' || style === 'delstrackor') {
    if (style !== 'tal' && !rutt) return new Response('Turen har ingen rutt', { status: 404 })
    const sekunder = trip.duration_seconds ?? (trip.duration > 0 ? trip.duration * 60 : null)
    const loc = trip.location_name, from = trip.start_location
    const data: KlisterData = {
      plats: from && loc ? `${from} → ${loc}` : (loc ?? from ?? ''),
      tal: talRutor({ distanceNM: trip.distance ?? null, sekunder, toppKn: trip.max_speed_knots ?? null, snittKn: trip.average_speed_knots ?? null }),
      rutt,
      staplar: [],
    }
    if (style === 'delstrackor') {
      const splits = computeSplits(punkter)
      if (splits.length === 0) return new Response('Turen har inga delsträckor', { status: 404 })
      data.staplar = delstrackStaplar(splits)
    }
    const mall = stil(style)
    const el: ReactElement = style === 'rutt' ? klisterRutt(data, mall.bredd, mall.hojd)
      : style === 'tal' ? klisterTal(data, mall.bredd, mall.hojd)
      : style === 'rutt-tal' ? klisterRuttTal(data, mall.bredd, mall.hojd)
      : klisterDelstrackor(data, mall.bredd, mall.hojd)
    return new ImageResponse(el, { width: mall.bredd, height: mall.hojd, fonts })
  }

  // Kartkortet kräver en rutt som duger; annars Bild-kortet (bild eller gradient).
  if (style === 'map' && rutt) return kartkort(trip, username, rutt, fonts)
  const foto = fotoUrl ? await hamtaFoto(fotoUrl) : null
  return bildkort(trip, username, rutt, foto, fonts)
}
