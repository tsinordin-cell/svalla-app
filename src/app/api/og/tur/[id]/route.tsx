import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase'
import { platsRubrik, datumLang, formatTid, ruttPath, ruttStartSlut, ruttArAnvandbar, type Punkt } from '@/lib/dela-klistermarken'
import { ogTypsnitt } from '../../_typsnitt/typsnitt'
import { hamtaFoto } from '../../share/tur/[id]/rita'
import { Logga } from '../../share/tur/[id]/klistermarken'

export const runtime = 'nodejs'
export const revalidate = 3600 // 1 h: sociala medier cachar OG-bilder länge ändå

/**
 * Länkförhandsvisningen för en tur (1200×630, WhatsApp, iMessage, Facebook, X).
 *
 * Gjord om 2026-11-19 (Tom: "Ser inte alls ut som något som tillhör Svalla").
 * Samma formspråk som storykorten i /api/og/share: Svallas logga med seglet,
 * platsen i Playfair Display, talen i en panel med bärnstensfärgade enheter,
 * rutten i orange, svalla.se i sidfoten. Turens foto ligger som en panel till
 * höger (roterad enligt EXIF via hamtaFoto; satori struntar i EXIF), rutten
 * ritas där när foto saknas, och utan båda får panelen bara havsgradienten.
 */

const W = 1200
const H = 630
const MARG = 56
const FOTO_B = 520
const FONT = 'Inter, system-ui, sans-serif'
const SERIF = 'Playfair Display, Georgia, serif'
const ORANGE = '#ff5c2e'
const BARNSTEN = '#f6b26b'
const NATT = '#060e18'

type Tal = { val: string; enhet: string; etikett: string }

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()

  const { data: trip } = await supabase
    .from('trips')
    .select('user_id, location_name, start_location, distance, duration, duration_seconds, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating, image')
    .eq('id', id)
    .single()

  const { data: userRow } = trip
    ? await supabase.from('users').select('username').eq('id', trip.user_id).single()
    : { data: null }
  const username = userRow?.username ?? 'Seglare'

  // Korta platsnamn: "Sollenkroka → Möja", inte "Sollenkroka ö, Stockholms län, Sverige → …"
  const plats = trip
    ? platsRubrik({ start_location: trip.start_location, location_name: trip.location_name, boat_type: trip.boat_type })
    : 'Svalla'
  const datum = datumLang(trip?.started_at)
  // "Annat" är förvalet när ingen båttyp valts och ser ut som ett formulärsvar.
  const bat = trip?.boat_type && trip.boat_type !== 'Annat' ? trip.boat_type : null
  const magisk = trip?.pinnar_rating === 3

  const sek = trip ? (trip.duration_seconds ?? (trip.duration > 0 ? trip.duration * 60 : null)) : null
  const tal: Tal[] = []
  if (trip && trip.distance >= 0.1) tal.push({ val: trip.distance.toFixed(1).replace('.', ','), enhet: 'NM', etikett: 'DISTANS' })
  if (sek !== null && sek >= 60) tal.push({ val: formatTid(sek), enhet: '', etikett: 'TID' })
  if ((trip?.average_speed_knots ?? 0) >= 0.1) tal.push({ val: (trip!.average_speed_knots ?? 0).toFixed(1).replace('.', ','), enhet: 'kn', etikett: 'SNITTFART' })
  if ((trip?.max_speed_knots ?? 0) >= 0.1) tal.push({ val: (trip!.max_speed_knots ?? 0).toFixed(1).replace('.', ','), enhet: 'kn', etikett: 'TOPPFART' })
  const talVisade = tal.slice(0, 3)

  const rutt = trip && ruttArAnvandbar(trip.route_points as Punkt[] | null) ? (trip.route_points as Punkt[]) : null
  const fotoUrl = typeof trip?.image === 'string' ? trip.image : null
  const [fonts, foto] = await Promise.all([
    ogTypsnitt(),
    fotoUrl ? hamtaFoto(fotoUrl, FOTO_B, H) : Promise.resolve(null),
  ])

  // Rubrikstorlek efter längd; Playfair är bred.
  const rubrikStorlek = plats.length > 30 ? 40 : plats.length > 20 ? 48 : 58
  const under = [bat, datum].filter(Boolean) as string[]

  // Rutten i högerpanelen när foto saknas.
  const RW = FOTO_B - 2 * 40, RH = H - 2 * 70
  const d = !foto && rutt ? ruttPath(rutt, RW, RH, 0.1) : ''
  const ss = !foto && rutt ? ruttStartSlut(rutt, RW, RH, 0.1) : null

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', position: 'relative', background: NATT, fontFamily: FONT, overflow: 'hidden' }}>
        {/* Havsgradienten, samma som storykortet utan foto */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, display: 'flex', background: 'linear-gradient(165deg, #091522 0%, #0d2038 45%, #0b2a3d 70%, #060e18 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, display: 'flex', background: 'radial-gradient(ellipse 60% 70% at 78% 45%, rgba(30,110,150,0.26) 0%, rgba(30,110,150,0) 70%)' }} />

        {/* Högerpanel: foto, annars rutt */}
        {foto ? (
          <div style={{ position: 'absolute', left: W - FOTO_B, top: 0, width: FOTO_B, height: H, display: 'flex' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- satori renderar bara <img> */}
            <img src={foto} alt="" width={FOTO_B} height={H} style={{ width: FOTO_B, height: H, objectFit: 'cover' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: 260, height: H, display: 'flex', background: `linear-gradient(to right, ${NATT} 0%, rgba(6,14,24,0.85) 30%, rgba(6,14,24,0) 100%)` }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: FOTO_B, height: H, display: 'flex', background: 'linear-gradient(to bottom, rgba(6,14,24,0.35) 0%, rgba(6,14,24,0) 30%, rgba(6,14,24,0) 60%, rgba(6,14,24,0.55) 100%)' }} />
          </div>
        ) : d ? (
          <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'absolute', left: W - FOTO_B + 40, top: 70 }}>
            <path d={d} stroke="rgba(0,0,0,0.30)" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} stroke="rgba(255,92,46,0.35)" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} stroke={ORANGE} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {ss ? <circle cx={ss.start[0]} cy={ss.start[1]} r={9} fill="#fff" stroke="rgba(6,14,24,0.7)" strokeWidth={4} /> : null}
            {ss ? <circle cx={ss.slut[0]} cy={ss.slut[1]} r={11} fill={ORANGE} stroke="#fff" strokeWidth={4} /> : null}
          </svg>
        ) : (
          /* Varken foto eller rutt: seglet ur loggan, stort och svagt */
          <svg viewBox="0 0 20 22" width={360} height={360} style={{ position: 'absolute', left: W - FOTO_B + 90, top: 150, opacity: 0.1 }}>
            <line x1="9" y1="20" x2="9" y2="3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M9,4 L18,18 L9,18 Z" fill="#fff" opacity="0.95" />
            <path d="M9,8 L1,17 L9,17 Z" fill="#fff" opacity="0.55" />
            <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8" />
          </svg>
        )}

        {/* Vänsterpanel */}
        <div style={{ position: 'absolute', left: MARG, top: 48, display: 'flex' }}>
          <Logga storlek={26} />
        </div>

        <div style={{ position: 'absolute', left: MARG, bottom: 52, width: foto ? W - FOTO_B - MARG + 60 : W - FOTO_B - MARG + 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{
            fontFamily: SERIF, fontSize: rubrikStorlek, fontWeight: 700, color: '#fff',
            lineHeight: 1.08, letterSpacing: -1, display: 'flex',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>{plats}</div>

          {(under.length > 0 || magisk) ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
              {under.map((u, i) => (
                <div key={u} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {i > 0 ? <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.45)', display: 'flex' }} /> : null}
                  <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 500, color: 'rgba(255,255,255,0.74)', display: 'flex' }}>{u}</div>
                </div>
              ))}
              {magisk ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {under.length > 0 ? <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.45)', display: 'flex' }} /> : null}
                  <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: BARNSTEN, display: 'flex' }}>Magisk tur</div>
                </div>
              ) : null}
            </div>
          ) : null}

          {talVisade.length > 0 ? (
            <div style={{
              display: 'flex', marginTop: 26,
              background: 'rgba(6,14,24,0.58)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20,
              paddingTop: 18, paddingBottom: 16,
            }}>
              {talVisade.map((t, i) => (
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
            <div style={{
              width: 30, height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 14, fontWeight: 800, color: '#fff',
            }}>{(username[0] ?? 'S').toUpperCase()}</div>
            <div style={{ fontFamily: FONT, fontSize: 19, fontWeight: 600, color: 'rgba(255,255,255,0.78)', display: 'flex' }}>{`@${username}`}</div>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.35)', display: 'flex', marginLeft: 4 }} />
            <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, letterSpacing: 1, color: 'rgba(246,178,107,0.9)', display: 'flex', marginLeft: 4 }}>svalla.se</div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H, fonts },
  )
}
