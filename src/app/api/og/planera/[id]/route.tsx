import { ImageResponse } from 'next/og'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import { haversineKm } from '@/lib/planner'

export const runtime = 'nodejs'
export const revalidate = 3600

const W = 1200, H = 630

const INTEREST_EMOJI: Record<string, string> = {
 krog: '', bastu: '', bad: '', brygga: '', natur: '', bensin: '⛽',
}

export async function GET(
 _req: Request,
 { params }: { params: Promise<{ id: string }> }
) {
 const { id } = await params
 const supabase = await createClient()

 const { data: route } = await supabase
 .from('planned_routes')
 .select('start_name, end_name, start_lat, start_lng, end_lat, end_lng, interests, suggested_stops')
 .eq('id', id)
 .single()

 const startName = route?.start_name ?? 'Start'
 const endName = route?.end_name ?? 'Mål'
 const km = route
 ? Math.round(haversineKm(route.start_lat, route.start_lng, route.end_lat, route.end_lng))
 : null
 const stopCount = Array.isArray(route?.suggested_stops) ? (route!.suggested_stops as unknown[]).length : 0
 const interests: string[] = Array.isArray(route?.interests) ? route!.interests : []

 const title = `${startName} → ${endName}`
 const titleSize = title.length > 30 ? 52 : title.length > 20 ? 62 : 72

 return new ImageResponse(
 (
 <div style={{
 width: W, height: H,
 display: 'flex', flexDirection: 'column',
 fontFamily: 'system-ui, -apple-system, sans-serif',
 background: 'linear-gradient(160deg, #060e18 0%, #0a2235 35%, #0c3d55 65%, #083048 100%)',
 position: 'relative', overflow: 'hidden',
 }}>
 {/* Ambient glow */}
 <div style={{
 position: 'absolute', inset: 0,
 background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(10,140,160,0.20) 0%, transparent 70%)',
 display: 'flex',
 }} />

 {/* Top bar */}
 <div style={{
 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
 padding: '52px 72px 0', position: 'relative', zIndex: 2,
 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
 <svg viewBox="0 0 20 22" width={28} height={28} style={{ display: 'flex' }}>
 <line x1="9" y1="20" x2="9" y2="2" stroke="rgba(255,255,255,0.50)" strokeWidth="1.6" strokeLinecap="round"/>
 <path d="M9,3 L18,18 L9,18 Z" fill="rgba(255,255,255,0.50)"/>
 <path d="M9,7 L1,17 L9,17 Z" fill="rgba(255,255,255,0.28)"/>
 <path d="M1,20 Q5,17.5 9,20 Q13,17.5 17,20" stroke="rgba(255,255,255,0.38)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
 </svg>
 <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '5px', color: 'rgba(255,255,255,0.45)' }}>SVALLA</div>
 </div>
 <div style={{
 background: 'rgba(10,123,140,0.30)', borderRadius: 40,
 border: '1px solid rgba(10,200,220,0.25)',
 padding: '7px 18px', fontSize: 15, fontWeight: 700,
 color: 'rgba(150,230,245,0.90)',
 }}>
 Planerad rutt
 </div>
 </div>

 {/* Route title */}
 <div style={{
 flex: 1, display: 'flex', flexDirection: 'column',
 justifyContent: 'center', padding: '0 72px',
 position: 'relative', zIndex: 2,
 }}>
 <div style={{
 fontSize: titleSize, fontWeight: 800, color: '#fff',
 letterSpacing: '-2px', lineHeight: 1.05,
 textShadow: '0 2px 24px rgba(0,0,0,0.6)',
 }}>
 {title}
 </div>

 {/* Stats row */}
 <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
 {km !== null && (
 <div style={{
 background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.10)',
 borderRadius: 18, padding: '14px 20px',
 display: 'flex', alignItems: 'baseline', gap: 5,
 }}>
 <span style={{ fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>~{km}</span>
 <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(120,210,255,0.80)' }}>km</span>
 </div>
 )}
 {stopCount > 0 && (
 <div style={{
 background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.10)',
 borderRadius: 18, padding: '14px 20px',
 display: 'flex', alignItems: 'baseline', gap: 5,
 }}>
 <span style={{ fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>{stopCount}</span>
 <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(120,210,255,0.80)' }}>stopp</span>
 </div>
 )}
 {interests.slice(0, 4).map(i => (
 <div key={i} style={{
 background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.10)',
 borderRadius: 18, padding: '14px 18px',
 fontSize: 28,
 }}>
 {INTEREST_EMOJI[i] ?? '📍'}
 </div>
 ))}
 </div>
 </div>

 {/* Footer */}
 <div style={{
 padding: '0 72px 48px',
 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
 position: 'relative', zIndex: 2,
 }}>
 <div style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.40)' }}>
 Planera din skärgårdstur på Svalla
 </div>
 <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(180,220,255,0.45)', letterSpacing: '0.3px' }}>
 svalla.se/planera
 </div>
 </div>
 </div>
 ),
 { width: W, height: H }
 )
}
